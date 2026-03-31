import React, { useState } from 'react';
import { FileText, Send, ChevronRight, Clock, Check, AlertCircle } from 'lucide-react';

interface Convention {
  id: number;
  student: string;
  company: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'pending' | 'signed' | 'archived';
}

const Conventions: React.FC = () => {
  const [conventions, setConventions] = useState<Convention[]>([
    { id: 1, student: 'Marie Dupont', company: 'TechCorp', startDate: '01/04/2026', endDate: '30/09/2026', status: 'pending' },
    { id: 2, student: 'Thomas Bernard', company: 'DataSphere', startDate: '15/03/2026', endDate: '15/09/2026', status: 'signed' },
    { id: 3, student: 'Léa Petit', company: 'CreativeStudio', startDate: '01/05/2026', endDate: '31/10/2026', status: 'draft' },
    { id: 4, student: 'Lucas Moreau', company: 'CloudNine', startDate: '01/03/2026', endDate: '31/08/2026', status: 'signed' },
    { id: 5, student: 'Emma Leroy', company: 'InnovateLab', startDate: '15/04/2026', endDate: '15/07/2026', status: 'pending' },
    { id: 6, student: 'Alice Martin', company: 'NextGen', startDate: '01/02/2026', endDate: '31/07/2026', status: 'archived' },
    { id: 7, student: 'Pierre Durand', company: 'TechCorp', startDate: '01/06/2026', endDate: '30/11/2026', status: 'draft' },
    { id: 8, student: 'Julie Moreau', company: 'DataSphere', startDate: '15/05/2026', endDate: '15/11/2026', status: 'pending' },
  ]);

  const [relanceSent, setRelanceSent] = useState<number[]>([]);

  const columns = [
    { key: 'draft' as const, label: 'Brouillon', color: 'border-gray-300', bgColor: 'bg-gray-50', icon: <FileText size={16} className="text-gray-500" /> },
    { key: 'pending' as const, label: 'En attente', color: 'border-amber-300', bgColor: 'bg-amber-50', icon: <Clock size={16} className="text-amber-500" /> },
    { key: 'signed' as const, label: 'Signée', color: 'border-green-300', bgColor: 'bg-green-50', icon: <Check size={16} className="text-green-500" /> },
    { key: 'archived' as const, label: 'Archivée', color: 'border-blue-300', bgColor: 'bg-blue-50', icon: <AlertCircle size={16} className="text-blue-500" /> },
  ];

  const moveConvention = (id: number, newStatus: Convention['status']) => {
    setConventions(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const sendRelance = (id: number) => {
    setRelanceSent(prev => [...prev, id]);
  };

  const getNextStatus = (status: Convention['status']): Convention['status'] | null => {
    switch (status) {
      case 'draft': return 'pending';
      case 'pending': return 'signed';
      case 'signed': return 'archived';
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2463]">Conventions</h1>
        <p className="text-gray-500 text-sm mt-1">Gérez le cycle de vie des conventions de stage</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {columns.map(col => (
          <div key={col.key} className={`${col.bgColor} rounded-xl p-3 text-center`}>
            <p className="text-2xl font-bold text-[#0A2463]">{conventions.filter(c => c.status === col.key).length}</p>
            <p className="text-xs text-gray-500">{col.label}</p>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map(col => (
          <div key={col.key} className="space-y-3">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${col.bgColor} border ${col.color}`}>
              {col.icon}
              <span className="text-sm font-semibold text-[#0A2463]">{col.label}</span>
              <span className="ml-auto text-xs bg-white px-2 py-0.5 rounded-full text-gray-500 font-medium">
                {conventions.filter(c => c.status === col.key).length}
              </span>
            </div>
            <div className="space-y-2 min-h-[200px]">
              {conventions.filter(c => c.status === col.key).map(conv => {
                const nextStatus = getNextStatus(conv.status);
                return (
                  <div key={conv.id} className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all">
                    <p className="text-sm font-semibold text-[#0A2463]">{conv.student}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{conv.company}</p>
                    <p className="text-xs text-gray-400 mt-1">{conv.startDate} - {conv.endDate}</p>
                    <div className="flex items-center gap-2 mt-3">
                      {nextStatus && (
                        <button
                          onClick={() => moveConvention(conv.id, nextStatus)}
                          className="flex-1 text-xs bg-[#3E7BFA] text-white py-1.5 rounded-lg font-medium hover:bg-[#2D6AE0] transition-colors flex items-center justify-center gap-1"
                        >
                          <ChevronRight size={12} /> Avancer
                        </button>
                      )}
                      {conv.status === 'pending' && (
                        <button
                          onClick={() => sendRelance(conv.id)}
                          disabled={relanceSent.includes(conv.id)}
                          className={`text-xs py-1.5 px-3 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                            relanceSent.includes(conv.id) ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                          }`}
                        >
                          <Send size={12} /> {relanceSent.includes(conv.id) ? 'Envoyée' : 'Relancer'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conventions;
