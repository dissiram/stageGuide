import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Calendar, Target, FileText, TrendingUp } from 'lucide-react';

const MenteeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'evaluation' | 'audit'>('overview');

  const mentee = {
    id: Number(id) || 1,
    name: 'Marie Dupont',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face',
    school: 'Université Paris-Saclay',
    level: 'Master 2 Informatique',
    email: 'marie.dupont@email.com',
    progress: 75,
    startDate: '15 Jan 2026',
    skills: { communication: 4, problem_solving: 3, adaptability: 4, teamwork: 5 },
  };

  const goals = [
    { id: 1, title: 'Maîtriser React Hooks', status: 'completed' },
    { id: 2, title: 'Créer un projet portfolio', status: 'in_progress' },
    { id: 3, title: 'Apprendre les tests unitaires', status: 'in_progress' },
    { id: 4, title: 'Préparer les entretiens', status: 'pending' },
  ];

  const auditLog = [
    { id: 1, action: 'Session de mentorat terminée', date: '20 Mars 2026', details: 'Architecture de projet - 1h' },
    { id: 2, action: 'Objectif complété', date: '18 Mars 2026', details: 'Maîtriser React Hooks' },
    { id: 3, action: 'Formation terminée', date: '15 Mars 2026', details: 'React Avancé - Module 3' },
    { id: 4, action: 'Évaluation soumise', date: '10 Mars 2026', details: 'Auto-évaluation soft skills' },
    { id: 5, action: 'Session de mentorat terminée', date: '05 Mars 2026', details: 'Introduction aux tests - 1h' },
    { id: 6, action: 'Candidature envoyée', date: '01 Mars 2026', details: 'TechCorp - Développeur Frontend' },
  ];

  const [evaluation, setEvaluation] = useState({
    communication: 4, problem_solving: 3, adaptability: 4, teamwork: 5, comments: '',
  });

  const skillLabels = [
    { key: 'communication', label: 'Communication' },
    { key: 'problem_solving', label: 'Résolution de problèmes' },
    { key: 'adaptability', label: 'Adaptabilité' },
    { key: 'teamwork', label: 'Travail d\'équipe' },
  ];

  // Simple radar chart using SVG
  const radarSize = 200;
  const center = radarSize / 2;
  const maxRadius = 80;
  const skillValues = [mentee.skills.communication, mentee.skills.problem_solving, mentee.skills.adaptability, mentee.skills.teamwork];
  const angles = skillValues.map((_, i) => (Math.PI * 2 * i) / skillValues.length - Math.PI / 2);
  const points = skillValues.map((v, i) => {
    const r = (v / 5) * maxRadius;
    return `${center + r * Math.cos(angles[i])},${center + r * Math.sin(angles[i])}`;
  }).join(' ');

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/mentor/mentores')} className="flex items-center gap-2 text-gray-500 hover:text-[#0A2463] transition-colors text-sm">
        <ArrowLeft size={16} /> Retour aux mentorés
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <img src={mentee.avatar} alt={mentee.name} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-100" />
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#0A2463]">{mentee.name}</h1>
            <p className="text-sm text-gray-500">{mentee.level} - {mentee.school}</p>
            <p className="text-xs text-gray-400 mt-1">Mentorat depuis le {mentee.startDate}</p>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3E7BFA] rounded-full" style={{ width: `${mentee.progress}%` }} />
                </div>
                <span className="text-sm font-medium text-[#3E7BFA]">{mentee.progress}%</span>
              </div>
              <button onClick={() => navigate('/mentor/messages')} className="inline-flex items-center gap-1 text-sm text-[#3E7BFA] hover:underline">
                <MessageSquare size={14} /> Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {[
          { key: 'overview', label: 'Aperçu', icon: <TrendingUp size={16} /> },
          { key: 'goals', label: 'Objectifs', icon: <Target size={16} /> },
          { key: 'evaluation', label: 'Évaluation', icon: <FileText size={16} /> },
          { key: 'audit', label: 'Journal', icon: <Calendar size={16} /> },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key ? 'bg-white text-[#0A2463] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Soft Skills Radar */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-[#0A2463] mb-4">Soft Skills</h3>
            <div className="flex justify-center">
              <svg width={radarSize} height={radarSize} viewBox={`0 0 ${radarSize} ${radarSize}`}>
                {/* Grid */}
                {[1, 2, 3, 4, 5].map(level => {
                  const r = (level / 5) * maxRadius;
                  const gridPoints = angles.map(a => `${center + r * Math.cos(a)},${center + r * Math.sin(a)}`).join(' ');
                  return <polygon key={level} points={gridPoints} fill="none" stroke="#E5E7EB" strokeWidth="1" />;
                })}
                {/* Axes */}
                {angles.map((a, i) => (
                  <line key={i} x1={center} y1={center} x2={center + maxRadius * Math.cos(a)} y2={center + maxRadius * Math.sin(a)} stroke="#E5E7EB" strokeWidth="1" />
                ))}
                {/* Data */}
                <polygon points={points} fill="rgba(62, 123, 250, 0.2)" stroke="#3E7BFA" strokeWidth="2" />
                {/* Labels */}
                {['Communication', 'Résolution', 'Adaptabilité', 'Équipe'].map((label, i) => {
                  const labelR = maxRadius + 20;
                  return (
                    <text key={i} x={center + labelR * Math.cos(angles[i])} y={center + labelR * Math.sin(angles[i])} textAnchor="middle" dominantBaseline="middle" className="text-xs fill-gray-500">
                      {label}
                    </text>
                  );
                })}
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {skillLabels.map(s => (
                <div key={s.key} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{s.label}</span>
                  <span className="font-bold text-[#3E7BFA]">{(mentee.skills as any)[s.key]}/5</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-[#0A2463] mb-4">Progression</h3>
            <div className="space-y-4">
              {[
                { label: 'Profil', value: 90 },
                { label: 'Formations', value: 65 },
                { label: 'Objectifs', value: 50 },
                { label: 'Candidatures', value: 40 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium text-[#0A2463]">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#3E7BFA] to-[#0A2463] rounded-full" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Goals */}
      {activeTab === 'goals' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#0A2463] mb-4">Objectifs partagés</h3>
          <div className="space-y-2">
            {goals.map(g => (
              <div key={g.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
                <div className={`w-3 h-3 rounded-full ${g.status === 'completed' ? 'bg-green-500' : g.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                <span className={`text-sm flex-1 ${g.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-700'}`}>{g.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${g.status === 'completed' ? 'bg-green-100 text-green-700' : g.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                  {g.status === 'completed' ? 'Terminé' : g.status === 'in_progress' ? 'En cours' : 'En attente'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evaluation */}
      {activeTab === 'evaluation' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#0A2463] mb-4">Évaluation du mentoré</h3>
          <div className="space-y-4">
            {skillLabels.map(skill => (
              <div key={skill.key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{skill.label}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(v => (
                    <button key={v} onClick={() => setEvaluation(prev => ({ ...prev, [skill.key]: v }))} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${v <= (evaluation as any)[skill.key] ? 'bg-[#3E7BFA] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <textarea value={evaluation.comments} onChange={(e) => setEvaluation(prev => ({ ...prev, comments: e.target.value }))} rows={3} placeholder="Commentaires..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none resize-none" />
            <button className="bg-[#3E7BFA] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2D6AE0] transition-colors">
              Enregistrer l'évaluation
            </button>
          </div>
        </div>
      )}

      {/* Audit Log */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#0A2463] mb-4">Journal d'activité</h3>
          <div className="space-y-4">
            {auditLog.map((log, i) => (
              <div key={log.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-[#3E7BFA]" />
                  {i < auditLog.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-1" />}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium text-gray-900">{log.action}</p>
                  <p className="text-xs text-gray-500">{log.details}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{log.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenteeDetail;
