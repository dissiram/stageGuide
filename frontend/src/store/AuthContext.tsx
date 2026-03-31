import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, User as SupabaseUser, AuthError } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  role: 'stagiaire' | 'mentor' | 'admin';
  first_name: string;
  last_name: string;
  avatar_url?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  refreshProfile: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  role: 'stagiaire' | 'mentor';
  first_name: string;
  last_name: string;
  phone?: string;
  school?: string;
  level_of_study?: string;
  company?: string;
  job_title?: string;
  expertise_areas?: string[];
  bio?: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  authError: null,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => {},
  setUser: () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// Demo users for quick testing (fallback when Supabase auth is unavailable)
const DEMO_USERS: Record<string, User & { password: string }> = {
  'stagiaire@stageguide.com': {
    id: 'demo-stagiaire-001',
    email: 'stagiaire@stageguide.com',
    role: 'stagiaire',
    first_name: 'Marie',
    last_name: 'Dupont',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    password: 'password',
  },
  'mentor@stageguide.com': {
    id: 'demo-mentor-001',
    email: 'mentor@stageguide.com',
    role: 'mentor',
    first_name: 'Jean',
    last_name: 'Martin',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    password: 'password',
  },
  'admin@stageguide.com': {
    id: 'demo-admin-001',
    email: 'admin@stageguide.com',
    role: 'admin',
    first_name: 'Admin',
    last_name: 'StageGuide',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    password: 'password',
  },
};

/**
 * Fetch the user profile from the profiles table
 */
async function fetchProfile(userId: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      console.warn('Profile not found for user:', userId, error?.message);
      return null;
    }

    return {
      id: data.id,
      email: data.email,
      role: data.role,
      first_name: data.first_name,
      last_name: data.last_name,
      avatar_url: data.avatar_url,
      phone: data.phone,
    };
  } catch (err) {
    console.error('Error fetching profile:', err);
    return null;
  }
}

/**
 * Build a User object from Supabase auth user metadata (fallback when profile doesn't exist yet)
 */
function buildUserFromAuthMeta(authUser: SupabaseUser): User {
  const meta = authUser.user_metadata || {};
  return {
    id: authUser.id,
    email: authUser.email || '',
    role: meta.role || 'stagiaire',
    first_name: meta.first_name || '',
    last_name: meta.last_name || '',
    avatar_url: meta.avatar_url || undefined,
    phone: meta.phone || undefined,
  };
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  /**
   * Load user profile from Supabase or fallback to auth metadata
   */
  const loadUserProfile = useCallback(async (authUser: SupabaseUser) => {
    // Try to fetch from profiles table first
    const profile = await fetchProfile(authUser.id);
    if (profile) {
      setUser(profile);
      return;
    }
    // Fallback to auth metadata
    const metaUser = buildUserFromAuthMeta(authUser);
    setUser(metaUser);
  }, []);

  /**
   * Refresh the current user's profile from the database
   */
  const refreshProfile = useCallback(async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser) {
      await loadUserProfile(authUser);
    }
  }, [loadUserProfile]);

  /**
   * Initialize auth state and listen for changes
   */
  useEffect(() => {
    let mounted = true;

    // Check for demo user in localStorage first
    const storedDemo = localStorage.getItem('stageguide_demo_user');
    if (storedDemo) {
      try {
        const demoUser = JSON.parse(storedDemo);
        if (mounted) {
          setUser(demoUser);
          setIsLoading(false);
        }
        return;
      } catch {
        localStorage.removeItem('stageguide_demo_user');
      }
    }

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      if (!mounted) return;
      
      setSession(currentSession);
      
      if (currentSession?.user) {
        await loadUserProfile(currentSession.user);
      }
      
      setIsLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        if (!mounted) return;

        console.log('Auth state changed:', event);
        setSession(newSession);

        if (event === 'SIGNED_IN' && newSession?.user) {
          await loadUserProfile(newSession.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          localStorage.removeItem('stageguide_demo_user');
        } else if (event === 'TOKEN_REFRESHED' && newSession?.user) {
          // Session was refreshed, update profile if needed
          await loadUserProfile(newSession.user);
        } else if (event === 'USER_UPDATED' && newSession?.user) {
          await loadUserProfile(newSession.user);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserProfile]);

  /**
   * Login with email and password via Supabase Auth
   * Falls back to demo accounts if the email matches a demo user
   */
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setAuthError(null);

    // Check demo accounts first
    const demoUser = DEMO_USERS[email];
    if (demoUser && demoUser.password === password) {
      const { password: _, ...userData } = demoUser;
      setUser(userData);
      localStorage.setItem('stageguide_demo_user', JSON.stringify(userData));
      return { success: true };
    }

    // Attempt Supabase Auth login
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const errorMsg = translateAuthError(error);
        setAuthError(errorMsg);
        return { success: false, error: errorMsg };
      }

      if (data.user) {
        await loadUserProfile(data.user);
        return { success: true };
      }

      return { success: false, error: 'Connexion échouée.' };
    } catch (err: any) {
      const errorMsg = 'Une erreur inattendue est survenue.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  /**
   * Register a new user via Supabase Auth, then create profile via edge function
   */
  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string; needsVerification?: boolean }> => {
    setAuthError(null);

    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            role: data.role,
            first_name: data.first_name,
            last_name: data.last_name,
          },
        },
      });

      if (signUpError) {
        const errorMsg = translateAuthError(signUpError);
        setAuthError(errorMsg);
        return { success: false, error: errorMsg };
      }

      if (!authData.user) {
        return { success: false, error: 'Inscription échouée.' };
      }

      // Check if email confirmation is required
      // If session is null but user exists, email confirmation is needed
      const needsVerification = !authData.session;

      // 2. Create the profile via edge function (if we have a session)
      if (authData.session) {
        try {
          const { data: profileData, error: profileError } = await supabase.functions.invoke('create-user-profile', {
            body: {
              role: data.role,
              first_name: data.first_name,
              last_name: data.last_name,
              phone: data.phone || null,
              school: data.school || null,
              level_of_study: data.level_of_study || null,
              company: data.company || null,
              job_title: data.job_title || null,
              expertise_areas: data.expertise_areas || [],
              bio: data.bio || '',
            },
          });

          if (profileError) {
            console.error('Profile creation error:', profileError);
            // Don't fail registration, the profile can be created later
          } else {
            console.log('Profile created successfully:', profileData);
          }
        } catch (fnErr) {
          console.error('Edge function error:', fnErr);
          // Don't fail registration
        }

        // Load the user profile
        await loadUserProfile(authData.user);
      } else {
        // No session = email confirmation required
        // Set a temporary user from the registration data
        const tempUser: User = {
          id: authData.user.id,
          email: data.email,
          role: data.role,
          first_name: data.first_name,
          last_name: data.last_name,
        };
        setUser(tempUser);
      }

      return { success: true, needsVerification };
    } catch (err: any) {
      console.error('Registration error:', err);
      const errorMsg = 'Une erreur inattendue est survenue lors de l\'inscription.';
      setAuthError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  /**
   * Logout the user
   */
  const logout = async () => {
    // Clear demo user
    localStorage.removeItem('stageguide_demo_user');
    
    // Sign out from Supabase
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Logout error:', err);
    }
    
    setUser(null);
    setSession(null);
    setAuthError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user,
        isLoading,
        authError,
        login,
        register,
        logout,
        setUser,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Translate Supabase auth errors to French user-friendly messages
 */
function translateAuthError(error: AuthError): string {
  const message = error.message?.toLowerCase() || '';
  
  if (message.includes('invalid login credentials') || message.includes('invalid_credentials')) {
    return 'Email ou mot de passe incorrect.';
  }
  if (message.includes('email not confirmed')) {
    return 'Veuillez confirmer votre email avant de vous connecter.';
  }
  if (message.includes('user already registered') || message.includes('already been registered')) {
    return 'Un compte avec cet email existe déjà.';
  }
  if (message.includes('password') && message.includes('least')) {
    return 'Le mot de passe doit contenir au moins 6 caractères.';
  }
  if (message.includes('rate limit') || message.includes('too many requests')) {
    return 'Trop de tentatives. Veuillez réessayer dans quelques minutes.';
  }
  if (message.includes('email')) {
    return 'Adresse email invalide.';
  }
  if (message.includes('network') || message.includes('fetch')) {
    return 'Erreur de connexion. Vérifiez votre connexion internet.';
  }
  
  return error.message || 'Une erreur est survenue.';
}
