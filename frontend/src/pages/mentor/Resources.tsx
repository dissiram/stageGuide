import React, { useState } from 'react';
import { Search, Plus, FileText, Video, Link as LinkIcon, Download, ExternalLink, X } from 'lucide-react';

const Resources: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', type: 'article', url: '', description: '' });

  const [resources, setResources] = useState([
    { id: 1, title: 'Guide React Hooks', type: 'article', url: '#', description: 'Guide complet sur les hooks React avec exemples pratiques.', date: '20 Mars 2026', shared: ['Marie Dupont', 'Thomas Bernard'] },
    { id: 2, title: 'Architecture Clean Code', type: 'video', url: '#', description: 'Vidéo sur les principes de clean architecture en JavaScript.', date: '18 Mars 2026', shared: ['Léa Petit'] },
    { id: 3, title: 'Préparer un entretien technique', type: 'article', url: '#', description: 'Conseils et exercices pour réussir les entretiens techniques.', date: '15 Mars 2026', shared: ['Marie Dupont', 'Lucas Moreau'] },
    { id: 4, title: 'Design Patterns en TypeScript', type: 'link', url: '#', description: 'Ressource externe sur les design patterns avec TypeScript.', date: '10 Mars 2026', shared: ['Thomas Bernard'] },
    { id: 5, title: 'Introduction à Docker', type: 'video', url: '#', description: 'Tutoriel vidéo pour débuter avec Docker et les conteneurs.', date: '05 Mars 2026', shared: ['Emma Leroy'] },
    { id: 6, title: 'Git Flow Best Practices', type: 'article', url: '#', description: 'Meilleures pratiques pour gérer les branches Git en équipe.', date: '01 Mars 2026', shared: ['Marie Dupont', 'Thomas Bernard', 'Léa Petit'] },
  ]);

  const filtered = resources.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()));

  const addResource = () => {
    if (!newResource.title.trim()) return;
    setResources(prev => [{ id: Date.now(), ...newResource, date: 'Aujourd\'hui', shared: [] }, ...prev]);
    setNewResource({ title: '', type: 'article', url: '', description: '' });
    setShowAdd(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} className="text-red-500" />;
      case 'link': return <LinkIcon size={16} className="text-green-500" />;
      default: return <FileText size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0A2463]">Ressources</h1>
        <button onClick={() => setShowAdd(true)} className="inline-flex items-center gap-2 bg-[#3E7BFA] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2D6AE0] transition-colors">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] outline-none text-sm bg-white" />
      </div>

      {showAdd && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-[#0A2463] mb-4">Nouvelle ressource</h3>
          <div className="space-y-3">
            <input type="text" value={newResource.title} onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))} placeholder="Titre" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
            <select value={newResource.type} onChange={(e) => setNewResource(prev => ({ ...prev, type: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none">
              <option value="article">Article</option>
              <option value="video">Vidéo</option>
              <option value="link">Lien externe</option>
            </select>
            <input type="url" value={newResource.url} onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))} placeholder="URL" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
            <textarea value={newResource.description} onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))} placeholder="Description" rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none resize-none" />
            <div className="flex gap-2">
              <button onClick={addResource} className="px-4 py-2 bg-[#3E7BFA] text-white rounded-xl text-sm font-medium">Ajouter</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl text-sm">Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getTypeIcon(r.type)}
                <span className="text-xs text-gray-400 capitalize">{r.type}</span>
              </div>
              <span className="text-xs text-gray-400">{r.date}</span>
            </div>
            <h3 className="font-bold text-[#0A2463] text-sm mb-1">{r.title}</h3>
            <p className="text-xs text-gray-500 mb-3">{r.description}</p>
            {r.shared.length > 0 && (
              <p className="text-xs text-gray-400 mb-3">Partagé avec: {r.shared.join(', ')}</p>
            )}
            <div className="flex gap-2">
              <button className="text-xs text-[#3E7BFA] hover:underline flex items-center gap-1"><ExternalLink size={12} /> Ouvrir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
