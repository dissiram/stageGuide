import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';

const MenteesList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const mentees = [
    { id: 1, name: 'Marie Dupont', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face', school: 'Université Paris-Saclay', level: 'Master 2', progress: 75, status: 'active', goals: 4, sessions: 8 },
    { id: 2, name: 'Thomas Bernard', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face', school: 'EPITECH', level: 'Bac+4', progress: 60, status: 'active', goals: 3, sessions: 6 },
    { id: 3, name: 'Léa Petit', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', school: 'HEC Paris', level: 'Master 1', progress: 45, status: 'active', goals: 5, sessions: 4 },
    { id: 4, name: 'Lucas Moreau', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', school: 'ENSIMAG', level: 'Bac+5', progress: 90, status: 'active', goals: 6, sessions: 12 },
    { id: 5, name: 'Emma Leroy', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face', school: 'Centrale Lyon', level: 'Bac+4', progress: 30, status: 'new', goals: 2, sessions: 1 },
  ];

  const filtered = mentees.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.school.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0A2463]">Mes Mentorés</h1>
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un mentoré..." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] outline-none text-sm bg-white" />
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(m => (
          <div key={m.id} onClick={() => navigate(`/mentor/mentores/${m.id}`)} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-center gap-3 mb-4">
              <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-[#0A2463] group-hover:text-[#3E7BFA] transition-colors">{m.name}</p>
                <p className="text-xs text-gray-500">{m.level} - {m.school}</p>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">Progression</span>
                <span className="font-medium text-[#3E7BFA]">{m.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#3E7BFA] rounded-full" style={{ width: `${m.progress}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{m.goals} objectifs</span>
              <span>{m.sessions} sessions</span>
              <span className={`px-2 py-0.5 rounded-full font-medium ${m.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                {m.status === 'new' ? 'Nouveau' : 'Actif'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenteesList;
