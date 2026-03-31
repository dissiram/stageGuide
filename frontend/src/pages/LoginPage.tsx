import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import { Eye, EyeOff, LogIn, ArrowLeft, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated && user) {
      redirectByRole(user.role);
    }
  }, [isAuthenticated, user]);

  const redirectByRole = (role: string) => {
    if (role === 'admin') navigate('/admin', { replace: true });
    else if (role === 'mentor') navigate('/mentor', { replace: true });
    else navigate('/stagiaire', { replace: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      // The auth state change listener will update the user
      // But for demo accounts, we need to redirect manually
      const demoEmails = ['stagiaire@stageguide.com', 'mentor@stageguide.com', 'admin@stageguide.com'];
      if (demoEmails.includes(email)) {
        if (email.startsWith('admin')) navigate('/admin', { replace: true });
        else if (email.startsWith('mentor')) navigate('/mentor', { replace: true });
        else navigate('/stagiaire', { replace: true });
      }
      // For real Supabase auth, the onAuthStateChange will handle setting user
      // and the useEffect above will redirect
    } else {
      setError(result.error || 'Email ou mot de passe incorrect.');
    }
    
    setLoading(false);
  };

  const demoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
    setError('');
    setLoading(true);
    
    const result = await login(demoEmail, 'password');
    
    if (result.success) {
      if (demoEmail.startsWith('admin')) navigate('/admin', { replace: true });
      else if (demoEmail.startsWith('mentor')) navigate('/mentor', { replace: true });
      else navigate('/stagiaire', { replace: true });
    } else {
      setError(result.error || 'Erreur de connexion.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2463] via-[#1B3A8C] to-[#3E7BFA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={18} /> Retour à l'accueil
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <circle cx="10" cy="12" r="8" stroke="#0A2463" strokeWidth="2.5" fill="none"/>
                <circle cx="24" cy="12" r="8" stroke="#0A2463" strokeWidth="2.5" fill="none"/>
                <line x1="18" y1="6" x2="18" y2="18" stroke="#0A2463" strokeWidth="2"/>
              </svg>
              <span className="text-[#0A2463] font-bold text-xl">stage<span className="text-[#3E7BFA]">guide</span></span>
            </div>
            <h1 className="text-2xl font-bold text-[#0A2463]">Connexion</h1>
            <p className="text-gray-500 text-sm mt-1">Accédez à votre espace personnel</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none transition-all text-sm"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none transition-all text-sm pr-12"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-[#3E7BFA] focus:ring-[#3E7BFA]" />
                <span className="text-gray-600">Se souvenir de moi</span>
              </label>
              <button type="button" className="text-[#3E7BFA] hover:underline">Mot de passe oublié ?</button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3E7BFA] hover:bg-[#2D6AE0] text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} /> Se connecter
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-[#3E7BFA] font-semibold hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3">Comptes de démonstration</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Stagiaire', email: 'stagiaire@stageguide.com', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
                { label: 'Mentor', email: 'mentor@stageguide.com', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
                { label: 'Admin', email: 'admin@stageguide.com', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
              ].map((demo) => (
                <button
                  key={demo.email}
                  onClick={() => demoLogin(demo.email)}
                  disabled={loading}
                  className={`${demo.color} px-3 py-2 rounded-lg text-xs font-medium transition-colors disabled:opacity-50`}
                >
                  {demo.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
