import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, FileText, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const kpis = [
    { label: 'Utilisateurs', value: '2,847', icon: <Users size={20} />, color: 'bg-blue-500', trend: '+12%', up: true },
    { label: 'Conventions signées', value: '342', icon: <FileText size={20} />, color: 'bg-green-500', trend: '+8%', up: true },
    { label: 'Entreprises partenaires', value: '156', icon: <Building2 size={20} />, color: 'bg-purple-500', trend: '+5%', up: true },
    { label: 'Taux de satisfaction', value: '94%', icon: <TrendingUp size={20} />, color: 'bg-amber-500', trend: '-1%', up: false },
  ];

  const alerts = [
    { id: 1, type: 'warning', title: '5 conventions en attente de signature', description: 'Conventions non signées depuis plus de 7 jours', action: 'Voir les conventions' },
    { id: 2, type: 'info', title: '12 nouveaux utilisateurs cette semaine', description: '8 stagiaires et 4 mentors se sont inscrits', action: 'Voir les utilisateurs' },
    { id: 3, type: 'warning', title: '3 signalements en attente', description: 'Signalements de contenu inapproprié à modérer', action: 'Modérer' },
  ];

  const recentUsers = [
    { id: 1, name: 'Alice Martin', email: 'alice@email.com', role: 'stagiaire', date: 'Il y a 2h', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face' },
    { id: 2, name: 'Pierre Durand', email: 'pierre@email.com', role: 'mentor', date: 'Il y a 5h', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { id: 3, name: 'Sophie Lefebvre', email: 'sophie@email.com', role: 'stagiaire', date: 'Hier', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
    { id: 4, name: 'Marc Petit', email: 'marc@email.com', role: 'stagiaire', date: 'Hier', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' },
    { id: 5, name: 'Julie Moreau', email: 'julie@email.com', role: 'mentor', date: 'Il y a 2 jours', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face' },
  ];

  // Simple bar chart data
  const monthlyData = [
    { month: 'Oct', users: 180, conventions: 25 },
    { month: 'Nov', users: 220, conventions: 30 },
    { month: 'Déc', users: 195, conventions: 28 },
    { month: 'Jan', users: 280, conventions: 42 },
    { month: 'Fév', users: 310, conventions: 48 },
    { month: 'Mars', users: 350, conventions: 55 },
  ];
  const maxUsers = Math.max(...monthlyData.map(d => d.users));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2463]">Tableau de bord</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d'ensemble de la plateforme</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${kpi.color} rounded-xl flex items-center justify-center text-white`}>{kpi.icon}</div>
              <span className={`text-xs flex items-center gap-0.5 px-2 py-0.5 rounded-full font-medium ${kpi.up ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#0A2463]">{kpi.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#0A2463]">Évolution mensuelle</h2>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#3E7BFA] rounded" /> Utilisateurs</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded" /> Conventions</span>
            </div>
          </div>
          <div className="flex items-end gap-4 h-48">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end justify-center" style={{ height: '160px' }}>
                  <div className="w-5 bg-[#3E7BFA] rounded-t transition-all hover:opacity-80" style={{ height: `${(d.users / maxUsers) * 100}%` }} title={`${d.users} utilisateurs`} />
                  <div className="w-5 bg-green-500 rounded-t transition-all hover:opacity-80" style={{ height: `${(d.conventions / maxUsers) * 100}%` }} title={`${d.conventions} conventions`} />
                </div>
                <span className="text-xs text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-[#0A2463] mb-4">Alertes</h2>
          <div className="space-y-3">
            {alerts.map(a => (
              <div key={a.id} className={`p-3 rounded-xl border ${a.type === 'warning' ? 'border-amber-200 bg-amber-50/50' : 'border-blue-200 bg-blue-50/50'}`}>
                <div className="flex items-start gap-2">
                  <AlertTriangle size={16} className={a.type === 'warning' ? 'text-amber-500 mt-0.5' : 'text-blue-500 mt-0.5'} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.description}</p>
                    <button onClick={() => navigate(a.title.includes('convention') ? '/admin/conventions' : '/admin/utilisateurs')} className="text-xs text-[#3E7BFA] hover:underline mt-1">
                      {a.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0A2463]">Derniers inscrits</h2>
          <button onClick={() => navigate('/admin/utilisateurs')} className="text-sm text-[#3E7BFA] hover:underline">Voir tout</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Utilisateur</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Rôle</th>
                <th className="pb-3 font-medium">Inscription</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(u => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => navigate('/admin/utilisateurs')}>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-sm font-medium text-gray-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-500">{u.email}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${u.role === 'stagiaire' ? 'bg-blue-100 text-blue-700' : u.role === 'mentor' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-400">{u.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
