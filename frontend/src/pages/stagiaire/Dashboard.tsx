import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import {
  TrendingUp, BookOpen, Calendar, MessageSquare, ArrowRight,
  Clock, Target, Award, Briefcase, ChevronRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Profil complété', value: '75%', icon: <Target size={20} />, color: 'bg-blue-500', trend: '+5%' },
    { label: 'Formations en cours', value: '3', icon: <BookOpen size={20} />, color: 'bg-green-500', trend: '+1' },
    { label: 'Candidatures', value: '8', icon: <Briefcase size={20} />, color: 'bg-purple-500', trend: '+2' },
    { label: 'Certificats', value: '2', icon: <Award size={20} />, color: 'bg-amber-500', trend: '+1' },
  ];

  const suggestedMentor = {
    name: 'Jean Martin',
    title: 'Senior Developer chez TechCorp',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    expertise: ['React', 'Node.js', 'DevOps'],
    matchScore: 92,
  };

  const formations = [
    { id: 1, title: 'React Avancé', progress: 65, domain: 'Développement Web', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=120&fit=crop' },
    { id: 2, title: 'UX Design Fondamentaux', progress: 30, domain: 'Design', thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=120&fit=crop' },
    { id: 3, title: 'Python pour Data Science', progress: 10, domain: 'Data', thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=200&h=120&fit=crop' },
  ];

  const upcomingSessions = [
    { id: 1, mentor: 'Jean Martin', date: '25 Mars 2026', time: '14:00', topic: 'Revue de code React' },
    { id: 2, mentor: 'Sophie Laurent', date: '27 Mars 2026', time: '10:00', topic: 'Préparation entretien' },
  ];

  const recentActivity = [
    { id: 1, text: 'Vous avez complété le module "Hooks avancés"', time: 'Il y a 2h', type: 'formation' },
    { id: 2, text: 'Candidature envoyée à TechCorp', time: 'Il y a 5h', type: 'candidature' },
    { id: 3, text: 'Nouveau message de Jean Martin', time: 'Hier', type: 'message' },
    { id: 4, text: 'Session de mentorat terminée', time: 'Hier', type: 'session' },
    { id: 5, text: 'Certificat "JavaScript ES6+" obtenu', time: 'Il y a 3 jours', type: 'certificat' },
  ];

  const messages = [
    { id: 1, from: 'Jean Martin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', text: 'Bonjour ! N\'oubliez pas notre session demain.', time: '14:30', unread: true },
    { id: 2, from: 'Sophie Laurent', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face', text: 'Votre CV a été mis à jour avec succès.', time: '10:15', unread: false },
    { id: 3, from: 'Système', avatar: '', text: 'Nouvelle offre de stage correspondant à votre profil.', time: 'Hier', unread: true },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2463]">
            Bonjour, {user?.first_name} !
          </h1>
          <p className="text-gray-500 text-sm mt-1">Voici un résumé de votre parcours</p>
        </div>
        <button
          onClick={() => navigate('/stagiaire/stages')}
          className="inline-flex items-center gap-2 bg-[#3E7BFA] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2D6AE0] transition-colors"
        >
          Rechercher un stage <ArrowRight size={16} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-white`}>
                {s.icon}
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">{s.trend}</span>
            </div>
            <p className="text-2xl font-bold text-[#0A2463]">{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Progress */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-[#0A2463] mb-4">Progression du profil</h2>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3E7BFA" strokeWidth="8" strokeDasharray={`${75 * 2.51} ${100 * 2.51}`} strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#0A2463]">75%</span>
              </div>
              <div className="flex-1 space-y-2">
                {[
                  { label: 'Informations personnelles', done: true },
                  { label: 'CV et compétences', done: true },
                  { label: 'Préférences de stage', done: true },
                  { label: 'Photo de profil', done: false },
                  { label: 'Portfolio et projets', done: false },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${step.done ? 'bg-green-500' : 'bg-gray-200'}`}>
                      {step.done && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className={step.done ? 'text-gray-700' : 'text-gray-400'}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formations in progress */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0A2463]">Formations en cours</h2>
              <button onClick={() => navigate('/stagiaire/formations')} className="text-sm text-[#3E7BFA] hover:underline flex items-center gap-1">
                Voir tout <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-4">
              {formations.map((f) => (
                <div key={f.id} onClick={() => navigate('/stagiaire/formations')} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <img src={f.thumbnail} alt={f.title} className="w-16 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{f.title}</p>
                    <p className="text-xs text-gray-500">{f.domain}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#3E7BFA] rounded-full" style={{ width: `${f.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{f.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-[#0A2463] mb-4">Activité récente</h2>
            <div className="space-y-3">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex items-start gap-3 p-2">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    a.type === 'formation' ? 'bg-blue-500' :
                    a.type === 'candidature' ? 'bg-purple-500' :
                    a.type === 'message' ? 'bg-green-500' :
                    a.type === 'certificat' ? 'bg-amber-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Suggested Mentor */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-[#0A2463] mb-4">Mentor suggéré</h2>
            <div className="text-center">
              <img src={suggestedMentor.avatar} alt={suggestedMentor.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover ring-4 ring-blue-100" />
              <p className="font-semibold text-gray-900">{suggestedMentor.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{suggestedMentor.title}</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {suggestedMentor.expertise.map((e) => (
                  <span key={e} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{e}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="text-2xl font-bold text-[#3E7BFA]">{suggestedMentor.matchScore}%</div>
                <span className="text-xs text-gray-500">matching</span>
              </div>
              <button
                onClick={() => navigate('/stagiaire/mentor')}
                className="w-full mt-4 bg-[#3E7BFA] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2D6AE0] transition-colors"
              >
                Voir le profil
              </button>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-[#0A2463] mb-4">Prochaines sessions</h2>
            <div className="space-y-3">
              {upcomingSessions.map((s) => (
                <div key={s.id} className="p-3 bg-blue-50/50 rounded-xl">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <Calendar size={12} /> {s.date}
                    <Clock size={12} className="ml-2" /> {s.time}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{s.topic}</p>
                  <p className="text-xs text-gray-500">avec {s.mentor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Preview */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0A2463]">Messages</h2>
              <button onClick={() => navigate('/stagiaire/messages')} className="text-sm text-[#3E7BFA] hover:underline">
                Voir tout
              </button>
            </div>
            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m.id} onClick={() => navigate('/stagiaire/messages')} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  {m.avatar ? (
                    <img src={m.avatar} alt={m.from} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#3E7BFA] flex items-center justify-center">
                      <MessageSquare size={14} className="text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm ${m.unread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>{m.from}</p>
                      <span className="text-xs text-gray-400">{m.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{m.text}</p>
                  </div>
                  {m.unread && <div className="w-2 h-2 rounded-full bg-[#3E7BFA] mt-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
