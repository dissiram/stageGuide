import React, { useState } from 'react';
import { Download, TrendingUp, Users, BookOpen, Briefcase, FileText, Calendar } from 'lucide-react';

const Analytics: React.FC = () => {
  const [period, setPeriod] = useState('month');

  const kpiTrends = [
    { label: 'Nouveaux utilisateurs', value: '342', trend: '+18%', up: true, icon: <Users size={18} />, data: [20, 35, 28, 45, 38, 52, 48, 60, 55, 70, 65, 80] },
    { label: 'Formations complétées', value: '156', trend: '+24%', up: true, icon: <BookOpen size={18} />, data: [10, 15, 12, 20, 18, 25, 22, 30, 28, 35, 32, 40] },
    { label: 'Stages pourvus', value: '89', trend: '+12%', up: true, icon: <Briefcase size={18} />, data: [5, 8, 6, 10, 9, 12, 11, 15, 13, 18, 16, 20] },
    { label: 'Conventions signées', value: '67', trend: '+8%', up: true, icon: <FileText size={18} />, data: [3, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15] },
  ];

  const userDistribution = [
    { role: 'Stagiaires', count: 2100, percentage: 74, color: 'bg-[#3E7BFA]' },
    { role: 'Mentors', count: 520, percentage: 18, color: 'bg-green-500' },
    { role: 'Admins', count: 27, percentage: 1, color: 'bg-purple-500' },
    { role: 'Partenaires', count: 200, percentage: 7, color: 'bg-amber-500' },
  ];

  const topFormations = [
    { title: 'React Avancé', enrollments: 342, completionRate: 78 },
    { title: 'Python Data Science', enrollments: 289, completionRate: 65 },
    { title: 'UX Design', enrollments: 256, completionRate: 82 },
    { title: 'Node.js & Express', enrollments: 198, completionRate: 71 },
    { title: 'DevOps Docker', enrollments: 167, completionRate: 58 },
  ];

  const topCompanies = [
    { name: 'TechCorp', stages: 45, satisfaction: 96 },
    { name: 'CloudNine', stages: 38, satisfaction: 94 },
    { name: 'DataSphere', stages: 32, satisfaction: 91 },
    { name: 'InnovateLab', stages: 28, satisfaction: 89 },
    { name: 'NextGen', stages: 24, satisfaction: 92 },
  ];

  // Mini sparkline component
  const Sparkline = ({ data, color = '#3E7BFA' }: { data: number[]; color?: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 120;
    const height = 40;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2463]">Analytique</h1>
          <p className="text-gray-500 text-sm mt-1">Tableaux de bord et indicateurs de performance</p>
        </div>
        <div className="flex gap-3">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#3E7BFA] outline-none">
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="inline-flex items-center gap-2 bg-[#0A2463] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#0A2463]/90 transition-colors">
            <Download size={16} /> Exporter
          </button>
        </div>
      </div>

      {/* KPI Trends */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiTrends.map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-[#3E7BFA]">{kpi.icon}</div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">{kpi.trend}</span>
            </div>
            <p className="text-2xl font-bold text-[#0A2463]">{kpi.value}</p>
            <p className="text-xs text-gray-500 mb-3">{kpi.label}</p>
            <Sparkline data={kpi.data} />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#0A2463] mb-4">Répartition des utilisateurs</h2>
          <div className="space-y-4">
            {userDistribution.map(u => (
              <div key={u.role}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700 font-medium">{u.role}</span>
                  <span className="text-gray-500">{u.count} ({u.percentage}%)</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${u.color} rounded-full transition-all`} style={{ width: `${u.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <p className="text-2xl font-bold text-[#0A2463]">2,847</p>
            <p className="text-xs text-gray-500">Total utilisateurs</p>
          </div>
        </div>

        {/* Top Formations */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#0A2463] mb-4">Top Formations</h2>
          <div className="space-y-3">
            {topFormations.map((f, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-lg font-bold text-gray-300 w-6 text-right">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{f.title}</p>
                  <p className="text-xs text-gray-500">{f.enrollments} inscrits</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#3E7BFA]">{f.completionRate}%</p>
                  <p className="text-xs text-gray-400">complétion</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Companies */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#0A2463] mb-4">Top Entreprises</h2>
          <div className="space-y-3">
            {topCompanies.map((c, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-lg font-bold text-gray-300 w-6 text-right">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.stages} stages proposés</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">{c.satisfaction}%</p>
                  <p className="text-xs text-gray-400">satisfaction</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#0A2463] mb-4">Métriques d'engagement</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Taux de connexion quotidien', value: '68%' },
              { label: 'Durée moyenne de session', value: '24 min' },
              { label: 'Messages échangés / jour', value: '1,240' },
              { label: 'Taux de matching réussi', value: '87%' },
              { label: 'NPS Score', value: '72' },
              { label: 'Taux de rétention', value: '91%' },
            ].map((m, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-xl">
                <p className="text-lg font-bold text-[#0A2463]">{m.value}</p>
                <p className="text-xs text-gray-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
