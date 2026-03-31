import React, { useState } from 'react';
import { FileText, Plus, Edit3, Download, ExternalLink, X, Code, Palette, Database } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [cvData, setCvData] = useState({
    title: 'Développeuse Full Stack',
    summary: 'Étudiante en informatique passionnée par le développement web et les nouvelles technologies. Recherche un stage de 6 mois pour mettre en pratique mes compétences.',
    education: 'Master Informatique - Université Paris-Saclay (2024-2026)',
    experience: 'Stage développeur frontend - StartupXYZ (3 mois, 2025)',
  });

  const [skills] = useState([
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'TypeScript', level: 80, category: 'Frontend' },
    { name: 'Node.js', level: 70, category: 'Backend' },
    { name: 'Python', level: 65, category: 'Backend' },
    { name: 'PostgreSQL', level: 60, category: 'Database' },
    { name: 'Docker', level: 50, category: 'DevOps' },
    { name: 'Figma', level: 75, category: 'Design' },
    { name: 'Git', level: 85, category: 'Tools' },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, title: 'E-commerce React', description: 'Application de commerce en ligne avec panier et paiement Stripe.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop', tags: ['React', 'Node.js', 'Stripe'], link: '#' },
    { id: 2, title: 'Dashboard Analytics', description: 'Tableau de bord interactif avec visualisation de données en temps réel.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop', tags: ['React', 'D3.js', 'API'], link: '#' },
    { id: 3, title: 'App Mobile Fitness', description: 'Application mobile de suivi d\'entraînement avec Flutter.', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=250&fit=crop', tags: ['Flutter', 'Firebase'], link: '#' },
    { id: 4, title: 'API REST Blog', description: 'Backend complet pour un blog avec authentification JWT.', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop', tags: ['Node.js', 'Express', 'MongoDB'], link: '#' },
    { id: 5, title: 'Portfolio Personnel', description: 'Site portfolio avec animations et design responsive.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop', tags: ['Next.js', 'Tailwind'], link: '#' },
    { id: 6, title: 'Chatbot IA', description: 'Chatbot intelligent utilisant l\'API OpenAI pour le support client.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop', tags: ['Python', 'OpenAI', 'Flask'], link: '#' },
  ]);

  const [newProject, setNewProject] = useState({ title: '', description: '', tags: '' });

  const addProject = () => {
    if (!newProject.title.trim()) return;
    setProjects(prev => [...prev, {
      id: Date.now(),
      title: newProject.title,
      description: newProject.description,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      tags: newProject.tags.split(',').map(t => t.trim()).filter(Boolean),
      link: '#',
    }]);
    setNewProject({ title: '', description: '', tags: '' });
    setShowAddProject(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2463]">Portfolio</h1>
          <p className="text-gray-500 text-sm mt-1">Votre CV dynamique et vos projets</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#0A2463] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0A2463]/90 transition-colors">
          <Download size={16} /> Exporter PDF
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* CV Preview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#0A2463]">Mon CV</h2>
              <button onClick={() => setEditMode(!editMode)} className="text-[#3E7BFA] hover:underline text-sm flex items-center gap-1">
                <Edit3 size={14} /> {editMode ? 'Aperçu' : 'Modifier'}
              </button>
            </div>
            <div className="text-center mb-4">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="Profile" className="w-16 h-16 rounded-full mx-auto mb-2 object-cover ring-4 ring-blue-100" />
              <h3 className="font-bold text-[#0A2463]">Marie Dupont</h3>
              {editMode ? (
                <input type="text" value={cvData.title} onChange={(e) => setCvData(prev => ({ ...prev, title: e.target.value }))} className="w-full mt-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
              ) : (
                <p className="text-sm text-gray-500">{cvData.title}</p>
              )}
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-[#0A2463] mb-1">Résumé</h4>
                {editMode ? (
                  <textarea value={cvData.summary} onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none resize-none" />
                ) : (
                  <p className="text-gray-600">{cvData.summary}</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-[#0A2463] mb-1">Formation</h4>
                {editMode ? (
                  <input type="text" value={cvData.education} onChange={(e) => setCvData(prev => ({ ...prev, education: e.target.value }))} className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
                ) : (
                  <p className="text-gray-600">{cvData.education}</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-[#0A2463] mb-1">Expérience</h4>
                {editMode ? (
                  <input type="text" value={cvData.experience} onChange={(e) => setCvData(prev => ({ ...prev, experience: e.target.value }))} className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
                ) : (
                  <p className="text-gray-600">{cvData.experience}</p>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="font-bold text-[#0A2463] mb-4">Compétences</h2>
            <div className="space-y-3">
              {skills.map(s => (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{s.name}</span>
                    <span className="text-gray-400 text-xs">{s.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#3E7BFA] to-[#0A2463] rounded-full transition-all" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Gallery */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#0A2463]">Mes Projets</h2>
            <button onClick={() => setShowAddProject(true)} className="inline-flex items-center gap-1 text-sm text-[#3E7BFA] hover:underline">
              <Plus size={16} /> Ajouter un projet
            </button>
          </div>

          {showAddProject && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-4">
              <h3 className="font-semibold text-[#0A2463] mb-3">Nouveau projet</h3>
              <div className="space-y-3">
                <input type="text" value={newProject.title} onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))} placeholder="Titre du projet" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
                <textarea value={newProject.description} onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))} placeholder="Description" rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none resize-none" />
                <input type="text" value={newProject.tags} onChange={(e) => setNewProject(prev => ({ ...prev, tags: e.target.value }))} placeholder="Tags (séparés par des virgules)" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
                <div className="flex gap-2">
                  <button onClick={addProject} className="px-4 py-2 bg-[#3E7BFA] text-white rounded-xl text-sm font-medium hover:bg-[#2D6AE0]">Ajouter</button>
                  <button onClick={() => setShowAddProject(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl text-sm">Annuler</button>
                </div>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map(p => (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative">
                  <img src={p.image} alt={p.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <ExternalLink size={16} className="text-[#3E7BFA]" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#0A2463] text-sm">{p.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
