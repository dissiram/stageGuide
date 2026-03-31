import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Calendar, Target, Star, Clock, ChevronRight, Plus, Check, X } from 'lucide-react';

const MentorSpace: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'goals' | 'sessions' | 'evaluation'>('goals');
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);

  const mentor = {
    name: 'Jean Martin',
    title: 'Senior Developer',
    company: 'TechCorp',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
    expertise: ['React', 'Node.js', 'DevOps', 'Architecture'],
    bio: 'Développeur senior avec 10 ans d\'expérience. Passionné par le mentorat et le partage de connaissances.',
    matchScore: 92,
  };

  const timeline = [
    { label: 'Demande envoyée', date: '10 Jan 2026', done: true },
    { label: 'Apparié', date: '12 Jan 2026', done: true },
    { label: 'Actif', date: '15 Jan 2026', done: true },
    { label: 'Évaluation finale', date: 'En cours', done: false },
  ];

  const [goals, setGoals] = useState([
    { id: 1, title: 'Maîtriser React Hooks', status: 'completed' as const, createdBy: 'mentor' },
    { id: 2, title: 'Créer un projet portfolio', status: 'in_progress' as const, createdBy: 'stagiaire' },
    { id: 3, title: 'Apprendre les tests unitaires', status: 'in_progress' as const, createdBy: 'mentor' },
    { id: 4, title: 'Préparer les entretiens techniques', status: 'pending' as const, createdBy: 'stagiaire' },
    { id: 5, title: 'Contribuer à un projet open source', status: 'pending' as const, createdBy: 'mentor' },
  ]);

  const sessions = [
    { id: 1, date: '25 Mars 2026', time: '14:00 - 15:00', topic: 'Revue de code React', status: 'upcoming' },
    { id: 2, date: '27 Mars 2026', time: '10:00 - 11:00', topic: 'Préparation entretien', status: 'upcoming' },
    { id: 3, date: '20 Mars 2026', time: '14:00 - 15:00', topic: 'Architecture de projet', status: 'completed' },
    { id: 4, date: '15 Mars 2026', time: '10:00 - 11:00', topic: 'Introduction aux tests', status: 'completed' },
  ];

  const [evaluation, setEvaluation] = useState({
    communication: 4,
    problem_solving: 3,
    adaptability: 4,
    teamwork: 5,
    comments: '',
  });

  const addGoal = () => {
    if (!newGoalTitle.trim()) return;
    setGoals(prev => [...prev, { id: Date.now(), title: newGoalTitle, status: 'pending' as const, createdBy: 'stagiaire' }]);
    setNewGoalTitle('');
    setShowAddGoal(false);
  };

  const updateGoalStatus = (id: number, status: 'pending' | 'in_progress' | 'completed') => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, status } : g));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0A2463]">Mon Mentor</h1>

      {/* Mentor Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <img src={mentor.avatar} alt={mentor.name} className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-100" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#0A2463]">{mentor.name}</h2>
            <p className="text-sm text-gray-500">{mentor.title} - {mentor.company}</p>
            <p className="text-sm text-gray-600 mt-2">{mentor.bio}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {mentor.expertise.map(e => (
                <span key={e} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{e}</span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-[#3E7BFA]">{mentor.matchScore}%</span>
                <span className="text-xs text-gray-500">matching</span>
              </div>
              <button onClick={() => navigate('/stagiaire/messages')} className="inline-flex items-center gap-2 bg-[#3E7BFA] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#2D6AE0] transition-colors">
                <MessageSquare size={16} /> Envoyer un message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="font-bold text-[#0A2463] mb-4">Parcours de mentorat</h3>
        <div className="flex items-center justify-between">
          {timeline.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center relative">
              {i > 0 && (
                <div className={`absolute top-3 right-1/2 w-full h-0.5 ${step.done ? 'bg-[#3E7BFA]' : 'bg-gray-200'}`} />
              )}
              <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${step.done ? 'bg-[#3E7BFA]' : 'bg-gray-200'}`}>
                {step.done && <Check size={14} className="text-white" />}
              </div>
              <p className={`text-xs mt-2 text-center ${step.done ? 'text-[#0A2463] font-medium' : 'text-gray-400'}`}>{step.label}</p>
              <p className="text-xs text-gray-400">{step.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {[
          { key: 'goals', label: 'Objectifs', icon: <Target size={16} /> },
          { key: 'sessions', label: 'Sessions', icon: <Calendar size={16} /> },
          { key: 'evaluation', label: 'Évaluation', icon: <Star size={16} /> },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key ? 'bg-white text-[#0A2463] shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#0A2463]">Objectifs partagés</h3>
            <button onClick={() => setShowAddGoal(true)} className="inline-flex items-center gap-1 text-sm text-[#3E7BFA] hover:underline">
              <Plus size={16} /> Ajouter
            </button>
          </div>
          {showAddGoal && (
            <div className="flex gap-2 mb-4">
              <input type="text" value={newGoalTitle} onChange={(e) => setNewGoalTitle(e.target.value)} placeholder="Nouvel objectif..." className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" onKeyDown={(e) => e.key === 'Enter' && addGoal()} />
              <button onClick={addGoal} className="px-4 py-2 bg-[#3E7BFA] text-white rounded-xl text-sm font-medium">Ajouter</button>
              <button onClick={() => setShowAddGoal(false)} className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-xl"><X size={16} /></button>
            </div>
          )}
          <div className="space-y-2">
            {goals.map(g => (
              <div key={g.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                <select
                  value={g.status}
                  onChange={(e) => updateGoalStatus(g.id, e.target.value as any)}
                  className={`text-xs px-2 py-1 rounded-full border-0 font-medium cursor-pointer ${
                    g.status === 'completed' ? 'bg-green-100 text-green-700' :
                    g.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <option value="pending">En attente</option>
                  <option value="in_progress">En cours</option>
                  <option value="completed">Terminé</option>
                </select>
                <span className={`text-sm flex-1 ${g.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-700'}`}>{g.title}</span>
                <span className="text-xs text-gray-400">{g.createdBy === 'mentor' ? 'Mentor' : 'Vous'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#0A2463] mb-4">Sessions de mentorat</h3>
          <div className="space-y-3">
            {sessions.map(s => (
              <div key={s.id} className={`p-4 rounded-xl border ${s.status === 'upcoming' ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#0A2463]">{s.topic}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {s.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {s.time}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {s.status === 'upcoming' ? 'À venir' : 'Terminée'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evaluation Tab */}
      {activeTab === 'evaluation' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#0A2463] mb-4">Auto-évaluation</h3>
          <div className="space-y-4">
            {[
              { key: 'communication', label: 'Communication' },
              { key: 'problem_solving', label: 'Résolution de problèmes' },
              { key: 'adaptability', label: 'Adaptabilité' },
              { key: 'teamwork', label: 'Travail d\'équipe' },
            ].map(skill => (
              <div key={skill.key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{skill.label}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(v => (
                    <button
                      key={v}
                      onClick={() => setEvaluation(prev => ({ ...prev, [skill.key]: v }))}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        v <= (evaluation as any)[skill.key] ? 'bg-[#3E7BFA] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Commentaires</label>
              <textarea
                value={evaluation.comments}
                onChange={(e) => setEvaluation(prev => ({ ...prev, comments: e.target.value }))}
                rows={3}
                placeholder="Vos commentaires sur votre progression..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none resize-none"
              />
            </div>
            <button className="bg-[#3E7BFA] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2D6AE0] transition-colors">
              Enregistrer l'évaluation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSpace;
