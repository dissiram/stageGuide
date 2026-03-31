import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import { ArrowLeft, UserPlus, GraduationCap, Users, AlertCircle, CheckCircle2, Mail } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, user } = useAuth();
  const [role, setRole] = useState<'stagiaire' | 'mentor'>('stagiaire');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  // Stagiaire-specific fields
  const [school, setSchool] = useState('');
  const [levelOfStudy, setLevelOfStudy] = useState('');
  // Mentor-specific fields
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [bio, setBio] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated && user && !showVerification) {
      if (user.role === 'admin') navigate('/admin', { replace: true });
      else if (user.role === 'mentor') navigate('/mentor', { replace: true });
      else navigate('/stagiaire', { replace: true });
    }
  }, [isAuthenticated, user, showVerification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setError('Le prénom et le nom sont requis.');
      return;
    }

    setLoading(true);

    const result = await register({
      email,
      password,
      role,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone: phone.trim() || undefined,
      school: role === 'stagiaire' ? school.trim() || undefined : undefined,
      level_of_study: role === 'stagiaire' ? levelOfStudy || undefined : undefined,
      company: role === 'mentor' ? company.trim() || undefined : undefined,
      job_title: role === 'mentor' ? jobTitle.trim() || undefined : undefined,
      bio: role === 'mentor' ? bio.trim() || undefined : undefined,
    });

    if (result.success) {
      if (result.needsVerification) {
        // Show email verification screen
        setRegisteredEmail(email);
        setShowVerification(true);
      } else {
        // Direct login (no email verification required)
        if (role === 'mentor') navigate('/mentor', { replace: true });
        else navigate('/stagiaire', { replace: true });
      }
    } else {
      setError(result.error || 'Une erreur est survenue lors de l\'inscription.');
    }

    setLoading(false);
  };

  // Email verification screen
  if (showVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A2463] via-[#1B3A8C] to-[#3E7BFA] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#0A2463] mb-2">Vérifiez votre email</h1>
            <p className="text-gray-500 text-sm mb-6">
              Un email de confirmation a été envoyé à{' '}
              <span className="font-semibold text-[#0A2463]">{registeredEmail}</span>.
              Cliquez sur le lien dans l'email pour activer votre compte.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-2 text-sm text-blue-700">
                <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium">Compte créé avec succès !</p>
                  <p className="text-blue-600 mt-1">
                    Vérifiez votre boîte de réception et votre dossier spam. Le lien est valide pendant 24 heures.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-[#3E7BFA] hover:bg-[#2D6AE0] text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Aller à la connexion
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2463] via-[#1B3A8C] to-[#3E7BFA] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
            <h1 className="text-2xl font-bold text-[#0A2463]">Créer un compte</h1>
            <p className="text-gray-500 text-sm mt-1">Rejoignez la communauté StageGuide</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('stagiaire')}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                role === 'stagiaire'
                  ? 'border-[#3E7BFA] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <GraduationCap size={28} className={`mx-auto mb-2 ${role === 'stagiaire' ? 'text-[#3E7BFA]' : 'text-gray-400'}`} />
              <span className={`text-sm font-semibold ${role === 'stagiaire' ? 'text-[#3E7BFA]' : 'text-gray-600'}`}>Stagiaire</span>
              <p className="text-xs text-gray-400 mt-1">Cherche un stage</p>
            </button>
            <button
              type="button"
              onClick={() => setRole('mentor')}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                role === 'mentor'
                  ? 'border-[#3E7BFA] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Users size={28} className={`mx-auto mb-2 ${role === 'mentor' ? 'text-[#3E7BFA]' : 'text-gray-400'}`} />
              <span className={`text-sm font-semibold ${role === 'mentor' ? 'text-[#3E7BFA]' : 'text-gray-600'}`}>Mentor</span>
              <p className="text-xs text-gray-400 mt-1">Guide des stagiaires</p>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Votre prénom"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm"
                  required
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm"
                  required
                  autoComplete="family-name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone <span className="text-gray-400">(optionnel)</span></label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33 6 12 34 56 78"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm"
                autoComplete="tel"
              />
            </div>

            {/* Role-specific fields */}
            {role === 'stagiaire' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">École <span className="text-gray-400">(optionnel)</span></label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Votre école"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Niveau d'études</label>
                  <select
                    value={levelOfStudy}
                    onChange={(e) => setLevelOfStudy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Bac+1">Bac+1</option>
                    <option value="Bac+2">Bac+2</option>
                    <option value="Bac+3">Bac+3 (Licence)</option>
                    <option value="Bac+4">Bac+4 (Master 1)</option>
                    <option value="Bac+5">Bac+5 (Master 2)</option>
                    <option value="Doctorat">Doctorat</option>
                  </select>
                </div>
              </div>
            )}

            {role === 'mentor' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise <span className="text-gray-400">(optionnel)</span></label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Votre entreprise"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Poste <span className="text-gray-400">(optionnel)</span></label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="Votre poste"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio <span className="text-gray-400">(optionnel)</span></label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Présentez-vous brièvement..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm resize-none"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 caractères"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm"
                required
                autoComplete="new-password"
                minLength={6}
              />
              {password.length > 0 && password.length < 6 && (
                <p className="text-xs text-amber-600 mt-1">Le mot de passe doit contenir au moins 6 caractères</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez votre mot de passe"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm"
                required
                autoComplete="new-password"
              />
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <p className="text-xs text-red-600 mt-1">Les mots de passe ne correspondent pas</p>
              )}
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 rounded border-gray-300 text-[#3E7BFA] focus:ring-[#3E7BFA]" />
              <span className="text-xs text-gray-500">
                J'accepte les <button type="button" className="text-[#3E7BFA] hover:underline">conditions d'utilisation</button> et la <button type="button" className="text-[#3E7BFA] hover:underline">politique de confidentialité</button>
              </span>
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
                  <UserPlus size={18} /> Créer mon compte
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-[#3E7BFA] font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
