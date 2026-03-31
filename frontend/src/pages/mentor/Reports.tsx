import React, { useState } from 'react';
import { FileText, Download, Calendar, Users, BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedMentee, setSelectedMentee] = useState('all');
  const [period, setPeriod] = useState('month');
  const [generated, setGenerated] = useState(false);

  const mentees = [
    { id: 'all', name: 'Tous les mentorés' },
    { id: '1', name: 'Marie Dupont' },
    { id: '2', name: 'Thomas Bernard' },
    { id: '3', name: 'Léa Petit' },
    { id: '4', name: 'Lucas Moreau' },
    { id: '5', name: 'Emma Leroy' },
  ];

  const recentReports = [
    { id: 1, title: 'Rapport mensuel - Mars 2026', date: '01/03/2026', mentee: 'Tous', type: 'Mensuel' },
    { id: 2, title: 'Évaluation - Marie Dupont', date: '15/02/2026', mentee: 'Marie Dupont', type: 'Évaluation' },
    { id: 3, title: 'Rapport mensuel - Février 2026', date: '01/02/2026', mentee: 'Tous', type: 'Mensuel' },
    { id: 4, title: 'Bilan trimestriel Q4 2025', date: '01/01/2026', mentee: 'Tous', type: 'Trimestriel' },
  ];

  const handleGenerate = () => {
    setGenerated(true);
    setTimeout(() => setGenerated(false), 3000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0A2463]">Rapports</h1>

      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="font-bold text-[#0A2463] mb-4">Générer un rapport</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mentoré</label>
            <select value={selectedMentee} onChange={(e) => setSelectedMentee(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none">
              {mentees.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none">
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleGenerate} className="w-full bg-[#3E7BFA] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2D6AE0] transition-colors flex items-center justify-center gap-2">
              <BarChart3 size={16} /> Générer
            </button>
          </div>
        </div>
        {generated && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            Rapport généré avec succès ! Le téléchargement va commencer.
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="font-bold text-[#0A2463] mb-4">Rapports récents</h2>
        <div className="space-y-2">
          {recentReports.map(r => (
            <div key={r.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText size={18} className="text-[#3E7BFA]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{r.title}</p>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>{r.date}</span>
                  <span>{r.mentee}</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">{r.type}</span>
                </div>
              </div>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500">
                <Download size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
