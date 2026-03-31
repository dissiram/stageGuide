import React, { useState, useMemo } from 'react';
import { Search, MapPin, Briefcase, Building2, Bookmark, BookmarkCheck, X } from 'lucide-react';

const Emplois: React.FC = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [appliedIds, setAppliedIds] = useState<number[]>([]);

  const [offers, setOffers] = useState([
    { id: 1, title: 'Développeur Full Stack', company: 'TechCorp', location: 'Paris', type: 'CDI', experience: 'Junior', remote: true, description: 'Développez des applications web complètes avec React et Node.js.', logo: 'https://ui-avatars.com/api/?name=TC&background=3E7BFA&color=fff&size=48', saved: false },
    { id: 2, title: 'Data Engineer', company: 'DataSphere', location: 'Lyon', type: 'CDI', experience: 'Junior', remote: false, description: 'Construisez des pipelines de données avec Python et Spark.', logo: 'https://ui-avatars.com/api/?name=DS&background=10B981&color=fff&size=48', saved: false },
    { id: 3, title: 'UX Designer', company: 'CreativeStudio', location: 'Bordeaux', type: 'CDD', experience: 'Junior', remote: true, description: 'Concevez des interfaces utilisateur innovantes.', logo: 'https://ui-avatars.com/api/?name=CS&background=F59E0B&color=fff&size=48', saved: false },
    { id: 4, title: 'DevOps Engineer', company: 'CloudNine', location: 'Paris', type: 'CDI', experience: 'Confirmé', remote: true, description: 'Gérez l\'infrastructure cloud et les déploiements CI/CD.', logo: 'https://ui-avatars.com/api/?name=CN&background=8B5CF6&color=fff&size=48', saved: false },
    { id: 5, title: 'Product Manager', company: 'InnovateLab', location: 'Toulouse', type: 'CDI', experience: 'Junior', remote: false, description: 'Pilotez la stratégie produit et coordonnez les équipes.', logo: 'https://ui-avatars.com/api/?name=IL&background=EF4444&color=fff&size=48', saved: false },
    { id: 6, title: 'Consultant IT', company: 'NextGen', location: 'Nantes', type: 'CDD', experience: 'Junior', remote: false, description: 'Accompagnez les entreprises dans leur transformation digitale.', logo: 'https://ui-avatars.com/api/?name=NG&background=0A2463&color=fff&size=48', saved: false },
  ]);

  const filtered = useMemo(() => {
    return offers.filter(o => {
      const matchSearch = search === '' || o.title.toLowerCase().includes(search.toLowerCase()) || o.company.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'all' || o.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [offers, search, typeFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2463]">Recherche d'emploi</h1>
        <p className="text-gray-500 text-sm mt-1">Trouvez votre premier emploi</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm bg-white" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#3E7BFA] outline-none">
          <option value="all">Tous les contrats</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(offer => (
          <div key={offer.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={offer.logo} alt={offer.company} className="w-10 h-10 rounded-xl" />
                <div>
                  <p className="text-xs text-gray-500">{offer.company}</p>
                  <p className="text-sm font-bold text-[#0A2463]">{offer.title}</p>
                </div>
              </div>
              <button onClick={() => setOffers(prev => prev.map(o => o.id === offer.id ? { ...o, saved: !o.saved } : o))} className="text-gray-400 hover:text-[#3E7BFA]">
                {offer.saved ? <BookmarkCheck size={20} className="text-[#3E7BFA]" /> : <Bookmark size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">{offer.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"><MapPin size={12} /> {offer.location}</span>
              <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full"><Briefcase size={12} /> {offer.type}</span>
              {offer.remote && <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full">Remote</span>}
            </div>
            {appliedIds.includes(offer.id) ? (
              <span className="text-xs text-green-600 font-medium">Candidature envoyée</span>
            ) : (
              <button onClick={() => setAppliedIds(prev => [...prev, offer.id])} className="text-sm font-semibold text-[#3E7BFA] hover:text-[#2D6AE0]">
                Postuler
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Emplois;
