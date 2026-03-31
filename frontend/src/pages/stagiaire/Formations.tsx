import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, Award, Play, Filter, ChevronRight, X } from 'lucide-react';

const Formations: React.FC = () => {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [selectedFormation, setSelectedFormation] = useState<any>(null);
  const [completedModules, setCompletedModules] = useState<Record<number, number[]>>({});
  const [showCertificate, setShowCertificate] = useState(false);

  const formations = [
    { id: 1, title: 'React Avancé', description: 'Maîtrisez les hooks, le context API, et les patterns avancés de React.', domain: 'Développement Web', level: 'Avancé', duration: 24, thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop', modules: [{ id: 1, title: 'Hooks personnalisés' }, { id: 2, title: 'Context API avancé' }, { id: 3, title: 'Patterns de composition' }, { id: 4, title: 'Performance et mémoisation' }] },
    { id: 2, title: 'UX Design Fondamentaux', description: 'Apprenez les bases du design centré utilisateur et créez des interfaces intuitives.', domain: 'Design', level: 'Débutant', duration: 16, thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop', modules: [{ id: 5, title: 'Principes UX' }, { id: 6, title: 'Recherche utilisateur' }, { id: 7, title: 'Wireframing' }, { id: 8, title: 'Prototypage' }] },
    { id: 3, title: 'Python pour Data Science', description: 'Initiez-vous à l\'analyse de données avec Python, Pandas et Matplotlib.', domain: 'Data Science', level: 'Intermédiaire', duration: 30, thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop', modules: [{ id: 9, title: 'Python basics' }, { id: 10, title: 'Pandas & NumPy' }, { id: 11, title: 'Visualisation' }, { id: 12, title: 'Machine Learning intro' }] },
    { id: 4, title: 'DevOps avec Docker & Kubernetes', description: 'Conteneurisez vos applications et orchestrez-les avec Kubernetes.', domain: 'Infrastructure', level: 'Avancé', duration: 20, thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop', modules: [{ id: 13, title: 'Docker fondamentaux' }, { id: 14, title: 'Docker Compose' }, { id: 15, title: 'Kubernetes basics' }, { id: 16, title: 'CI/CD Pipeline' }] },
    { id: 5, title: 'Marketing Digital', description: 'Stratégies de marketing en ligne, SEO, réseaux sociaux et analytics.', domain: 'Marketing', level: 'Débutant', duration: 12, thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop', modules: [{ id: 17, title: 'SEO Fondamentaux' }, { id: 18, title: 'Social Media' }, { id: 19, title: 'Analytics' }] },
    { id: 6, title: 'Node.js & Express', description: 'Construisez des APIs RESTful robustes avec Node.js et Express.', domain: 'Développement Web', level: 'Intermédiaire', duration: 18, thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop', modules: [{ id: 20, title: 'Node.js basics' }, { id: 21, title: 'Express & Routing' }, { id: 22, title: 'Base de données' }, { id: 23, title: 'Auth & Sécurité' }] },
    { id: 7, title: 'Figma pour Designers', description: 'Maîtrisez Figma pour créer des maquettes et des systèmes de design.', domain: 'Design', level: 'Intermédiaire', duration: 14, thumbnail: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=250&fit=crop', modules: [{ id: 24, title: 'Interface Figma' }, { id: 25, title: 'Composants' }, { id: 26, title: 'Auto Layout' }, { id: 27, title: 'Design System' }] },
    { id: 8, title: 'Gestion de Projet Agile', description: 'Apprenez Scrum, Kanban et les méthodologies agiles pour vos projets.', domain: 'Management', level: 'Débutant', duration: 10, thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop', modules: [{ id: 28, title: 'Introduction Agile' }, { id: 29, title: 'Scrum Framework' }, { id: 30, title: 'Kanban' }] },
    { id: 9, title: 'Cybersécurité Fondamentaux', description: 'Comprenez les menaces et apprenez à sécuriser les systèmes informatiques.', domain: 'Sécurité', level: 'Intermédiaire', duration: 22, thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop', modules: [{ id: 31, title: 'Menaces & Vulnérabilités' }, { id: 32, title: 'Cryptographie' }, { id: 33, title: 'Sécurité réseau' }, { id: 34, title: 'Audit de sécurité' }] },
  ];

  const domains = ['all', ...new Set(formations.map(f => f.domain))];
  const levels = ['all', 'Débutant', 'Intermédiaire', 'Avancé'];

  const filtered = useMemo(() => {
    return formations.filter(f => {
      const matchSearch = search === '' || f.title.toLowerCase().includes(search.toLowerCase()) || f.domain.toLowerCase().includes(search.toLowerCase());
      const matchLevel = levelFilter === 'all' || f.level === levelFilter;
      const matchDomain = domainFilter === 'all' || f.domain === domainFilter;
      return matchSearch && matchLevel && matchDomain;
    });
  }, [search, levelFilter, domainFilter]);

  const getProgress = (formation: any) => {
    const completed = completedModules[formation.id] || [];
    return Math.round((completed.length / formation.modules.length) * 100);
  };

  const toggleModule = (formationId: number, moduleId: number) => {
    setCompletedModules(prev => {
      const current = prev[formationId] || [];
      if (current.includes(moduleId)) {
        return { ...prev, [formationId]: current.filter(id => id !== moduleId) };
      }
      return { ...prev, [formationId]: [...current, moduleId] };
    });
  };

  const isFormationComplete = (formation: any) => {
    const completed = completedModules[formation.id] || [];
    return completed.length === formation.modules.length;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2463]">Formations</h1>
        <p className="text-gray-500 text-sm mt-1">Développez vos compétences avec nos formations certifiantes</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une formation..." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm bg-white" />
        </div>
        <select value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#3E7BFA] outline-none">
          <option value="all">Tous les domaines</option>
          {domains.filter(d => d !== 'all').map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#3E7BFA] outline-none">
          <option value="all">Tous les niveaux</option>
          {levels.filter(l => l !== 'all').map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((f) => {
          const progress = getProgress(f);
          return (
            <div key={f.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group cursor-pointer" onClick={() => setSelectedFormation(f)}>
              <div className="relative">
                <img src={f.thumbnail} alt={f.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play size={20} className="text-[#3E7BFA] ml-0.5" />
                  </div>
                </div>
                <span className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${
                  f.level === 'Débutant' ? 'bg-green-500 text-white' :
                  f.level === 'Intermédiaire' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                }`}>{f.level}</span>
              </div>
              <div className="p-5">
                <span className="text-xs text-[#3E7BFA] font-medium">{f.domain}</span>
                <h3 className="text-base font-bold text-[#0A2463] mt-1">{f.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{f.description}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={12} /> {f.duration}h</span>
                  <span className="flex items-center gap-1"><BookOpen size={12} /> {f.modules.length} modules</span>
                </div>
                {progress > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">Progression</span>
                      <span className="font-medium text-[#3E7BFA]">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3E7BFA] rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Formation Detail Modal */}
      {selectedFormation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedFormation(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedFormation.thumbnail} alt={selectedFormation.title} className="w-full h-48 object-cover" />
              <button onClick={() => setSelectedFormation(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white">
                <X size={16} />
              </button>
            </div>
            <div className="p-6">
              <span className="text-xs text-[#3E7BFA] font-medium">{selectedFormation.domain}</span>
              <h2 className="text-xl font-bold text-[#0A2463] mt-1">{selectedFormation.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{selectedFormation.description}</p>
              <div className="flex gap-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Clock size={14} /> {selectedFormation.duration}h</span>
                <span className="flex items-center gap-1"><BookOpen size={14} /> {selectedFormation.modules.length} modules</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  selectedFormation.level === 'Débutant' ? 'bg-green-100 text-green-700' :
                  selectedFormation.level === 'Intermédiaire' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>{selectedFormation.level}</span>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-[#0A2463] mb-3">Modules</h3>
                <div className="space-y-2">
                  {selectedFormation.modules.map((m: any, i: number) => {
                    const isCompleted = (completedModules[selectedFormation.id] || []).includes(m.id);
                    return (
                      <div key={m.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${isCompleted ? 'bg-green-50 border-green-200' : 'border-gray-100 hover:bg-gray-50'}`} onClick={() => toggleModule(selectedFormation.id, m.id)}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}>
                          {isCompleted ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          ) : (
                            <span className="text-xs text-gray-500 font-medium">{i + 1}</span>
                          )}
                        </div>
                        <span className={`text-sm ${isCompleted ? 'text-green-700 line-through' : 'text-gray-700'}`}>{m.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {isFormationComplete(selectedFormation) && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
                  <Award size={32} className="mx-auto text-amber-500 mb-2" />
                  <p className="font-bold text-amber-800">Formation terminée !</p>
                  <button onClick={() => setShowCertificate(true)} className="mt-2 bg-amber-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors">
                    Obtenir le certificat
                  </button>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Progression: <span className="font-bold text-[#3E7BFA]">{getProgress(selectedFormation)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowCertificate(false)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={40} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-[#0A2463]">Félicitations !</h3>
            <p className="text-gray-500 text-sm mt-2">Vous avez obtenu le certificat pour la formation "{selectedFormation?.title}"</p>
            <div className="mt-6 p-4 border-2 border-dashed border-amber-300 rounded-xl bg-amber-50/50">
              <p className="text-xs text-gray-500">Certificat ID</p>
              <p className="font-mono text-sm text-[#0A2463] font-bold mt-1">SG-CERT-{Date.now().toString(36).toUpperCase()}</p>
            </div>
            <button onClick={() => setShowCertificate(false)} className="mt-6 bg-[#3E7BFA] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2D6AE0] transition-colors">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formations;
