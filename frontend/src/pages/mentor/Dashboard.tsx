import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import { Users, BookOpen, MessageSquare, Award, TrendingUp, ChevronRight, Calendar, Clock } from 'lucide-react';

const MentorDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Mentorés actifs', value: '5', icon: <Users size={20} />, color: 'bg-blue-500', trend: '+1' },
    { label: 'Sessions ce mois', value: '12', icon: <Calendar size={20} />, color: 'bg-green-500', trend: '+3' },
    { label: 'Formations suivies', value: '8', icon: <BookOpen size={20} />, color: 'bg-purple-500', trend: '+2' },
    { label: 'Évaluations', value: '15', icon: <Award size={20} />, color: 'bg-amber-500', trend: '+4' },
  ];

  const mentees = [
    { id: 1, name: 'Marie Dupont', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face', school: 'Université Paris-Saclay', progress: 75, status: 'active', lastActivity: 'Il y a 2h' },
    { id: 2, name: 'Thomas Bernard', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face', school: 'EPITECH', progress: 60, status: 'active', lastActivity: 'Il y a 5h' },
    { id: 3, name: 'Léa Petit', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', school: 'HEC Paris', progress: 45, status: 'active', lastActivity: 'Hier' },
    { id: 4, name: 'Lucas Moreau', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', school: 'ENSIMAG', progress: 90, status: 'active', lastActivity: 'Il y a 1h' },
    { id: 5, name: 'Emma Leroy', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face', school: 'Centrale Lyon', progress: 30, status: 'new', lastActivity: 'Il y a 3 jours' },
  ];

  const upcomingSessions = [
    { id: 1, mentee: 'Marie Dupont', date: '25 Mars', time: '14:00', topic: 'Revue de code React' },
    { id: 2, mentee: 'Thomas Bernard', date: '25 Mars', time: '16:00', topic: 'Architecture projet' },
    { id: 3, mentee: 'Lucas Moreau', date: '26 Mars', time: '10:00', topic: 'Préparation soutenance' },
  ];

  const recentMessages = [
    { id: 1, from: 'Marie Dupont', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face', text: 'J\'ai terminé le module sur les hooks !', time: '14:30', unread: true },
    { id: 2, from: 'Lucas Moreau', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', text: 'Merci pour vos retours sur mon projet.', time: '12:15', unread: false },
    { id: 3, from: 'Léa Petit', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', text: 'Pouvons-nous décaler la session de jeudi ?', time: 'Hier', unread: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2463]">Bonjour, {user?.first_name} !</h1>
        <p className="text-gray-500 text-sm mt-1">Voici un aperçu de vos activités de mentorat</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-white`}>{s.icon}</div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">{s.trend}</span>
            </div>
            <p className="text-2xl font-bold text-[#0A2463]">{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mentees List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0A2463]">Mes Mentorés</h2>
              <button onClick={() => navigate('/mentor/mentores')} className="text-sm text-[#3E7BFA] hover:underline flex items-center gap-1">
                Voir tout <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {mentees.map(m => (
                <div key={m.id} onClick={() => navigate(`/mentor/mentores/${m.id}`)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                      {m.status === 'new' && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Nouveau</span>}
                    </div>
                    <p className="text-xs text-gray-500">{m.school}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#3E7BFA] rounded-full" style={{ width: `${m.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{m.progress}%</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{m.lastActivity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-[#0A2463] mb-4">Prochaines sessions</h2>
            <div className="space-y-3">
              {upcomingSessions.map(s => (
                <div key={s.id} className="p-3 bg-blue-50/50 rounded-xl">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <Calendar size={12} /> {s.date} <Clock size={12} className="ml-2" /> {s.time}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{s.topic}</p>
                  <p className="text-xs text-gray-500">avec {s.mentee}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0A2463]">Messages</h2>
              <button onClick={() => navigate('/mentor/messages')} className="text-sm text-[#3E7BFA] hover:underline">Voir tout</button>
            </div>
            <div className="space-y-3">
              {recentMessages.map(m => (
                <div key={m.id} onClick={() => navigate('/mentor/messages')} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <img src={m.avatar} alt={m.from} className="w-8 h-8 rounded-full object-cover" />
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

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-[#0A2463] mb-4">Actions rapides</h2>
            <div className="space-y-2">
              <button onClick={() => navigate('/mentor/mentores')} className="w-full text-left px-4 py-3 rounded-xl bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors">
                Planifier une session
              </button>
              <button onClick={() => navigate('/mentor/ressources')} className="w-full text-left px-4 py-3 rounded-xl bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors">
                Partager une ressource
              </button>
              <button onClick={() => navigate('/mentor/rapports')} className="w-full text-left px-4 py-3 rounded-xl bg-purple-50 text-purple-700 text-sm font-medium hover:bg-purple-100 transition-colors">
                Générer un rapport
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
