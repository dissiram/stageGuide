import React, { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Building2, Filter, Bookmark, BookmarkCheck, ChevronDown, X } from 'lucide-react';

interface Offer {
  id: number;
  title: string;
  company: string;
  location: string;
  duration: string;
  domain: string;
  remote: boolean;
  description: string;
  publishedAt: string;
  logo: string;
  saved: boolean;
}

const StagesSearch: React.FC = () => {
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [remoteFilter, setRemoteFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [applyModal, setApplyModal] = useState(false);
  const [applyMessage, setApplyMessage] = useState('');
  const [appliedIds, setAppliedIds] = useState<number[]>([]);

  const [offers, setOffers] = useState<Offer[]>([
    { id: 1, title: 'Développeur Frontend React', company: 'TechCorp', location: 'Paris', duration: '6 mois', domain: 'Développement Web', remote: true, description: 'Rejoignez notre équipe pour développer des interfaces modernes avec React et TypeScript.', publishedAt: 'Il y a 2 jours', logo: 'https://ui-avatars.com/api/?name=TC&background=3E7BFA&color=fff&size=48', saved: false },
    { id: 2, title: 'Data Analyst Junior', company: 'DataSphere', location: 'Lyon', duration: '4 mois', domain: 'Data Science', remote: false, description: 'Analysez des données clients et créez des dashboards pour l\'équipe marketing.', publishedAt: 'Il y a 3 jours', logo: 'https://ui-avatars.com/api/?name=DS&background=10B981&color=fff&size=48', saved: false },
    { id: 3, title: 'UX/UI Designer', company: 'CreativeStudio', location: 'Bordeaux', duration: '5 mois', domain: 'Design', remote: true, description: 'Concevez des expériences utilisateur innovantes pour nos applications mobiles.', publishedAt: 'Il y a 1 jour', logo: 'https://ui-avatars.com/api/?name=CS&background=F59E0B&color=fff&size=48', saved: true },
    { id: 4, title: 'Développeur Backend Node.js', company: 'CloudNine', location: 'Paris', duration: '6 mois', domain: 'Développement Web', remote: true, description: 'Développez des APIs REST performantes avec Node.js et PostgreSQL.', publishedAt: 'Il y a 5 jours', logo: 'https://ui-avatars.com/api/?name=CN&background=8B5CF6&color=fff&size=48', saved: false },
    { id: 5, title: 'Chef de Projet Digital', company: 'InnovateLab', location: 'Toulouse', duration: '4 mois', domain: 'Management', remote: false, description: 'Coordonnez les projets digitaux et assurez le suivi des équipes techniques.', publishedAt: 'Il y a 1 semaine', logo: 'https://ui-avatars.com/api/?name=IL&background=EF4444&color=fff&size=48', saved: false },
    { id: 6, title: 'Ingénieur DevOps', company: 'NextGen', location: 'Nantes', duration: '6 mois', domain: 'Infrastructure', remote: true, description: 'Automatisez les déploiements et gérez l\'infrastructure cloud AWS.', publishedAt: 'Il y a 4 jours', logo: 'https://ui-avatars.com/api/?name=NG&background=0A2463&color=fff&size=48', saved: false },
    { id: 7, title: 'Community Manager', company: 'SocialBuzz', location: 'Paris', duration: '3 mois', domain: 'Marketing', remote: false, description: 'Gérez les réseaux sociaux et créez du contenu engageant pour nos marques.', publishedAt: 'Il y a 6 jours', logo: 'https://ui-avatars.com/api/?name=SB&background=EC4899&color=fff&size=48', saved: false },
    { id: 8, title: 'Développeur Mobile Flutter', company: 'AppFactory', location: 'Lyon', duration: '5 mois', domain: 'Développement Mobile', remote: true, description: 'Créez des applications mobiles cross-platform avec Flutter et Dart.', publishedAt: 'Aujourd\'hui', logo: 'https://ui-avatars.com/api/?name=AF&background=06B6D4&color=fff&size=48', saved: false },
    { id: 9, title: 'Analyste Cybersécurité', company: 'SecureNet', location: 'Marseille', duration: '6 mois', domain: 'Sécurité', remote: false, description: 'Participez à l\'audit de sécurité et à la mise en place de solutions de protection.', publishedAt: 'Il y a 2 jours', logo: 'https://ui-avatars.com/api/?name=SN&background=DC2626&color=fff&size=48', saved: false },
    { id: 10, title: 'Product Owner Junior', company: 'AgileTech', location: 'Paris', duration: '4 mois', domain: 'Management', remote: true, description: 'Définissez la roadmap produit et priorisez le backlog avec l\'équipe Scrum.', publishedAt: 'Il y a 3 jours', logo: 'https://ui-avatars.com/api/?name=AT&background=7C3AED&color=fff&size=48', saved: false },
    { id: 11, title: 'Ingénieur Machine Learning', company: 'AILab', location: 'Grenoble', duration: '6 mois', domain: 'Data Science', remote: true, description: 'Développez des modèles de machine learning pour la reconnaissance d\'images.', publishedAt: 'Il y a 1 jour', logo: 'https://ui-avatars.com/api/?name=AI&background=059669&color=fff&size=48', saved: false },
    { id: 12, title: 'Graphiste / Motion Designer', company: 'PixelPerfect', location: 'Bordeaux', duration: '3 mois', domain: 'Design', remote: false, description: 'Créez des animations et des visuels pour les campagnes marketing.', publishedAt: 'Il y a 5 jours', logo: 'https://ui-avatars.com/api/?name=PP&background=D97706&color=fff&size=48', saved: false },
  ]);

  const domains = ['all', ...new Set(offers.map(o => o.domain))];
  const locations = ['all', ...new Set(offers.map(o => o.location))];

  const filtered = useMemo(() => {
    return offers.filter(o => {
      const matchSearch = search === '' || o.title.toLowerCase().includes(search.toLowerCase()) || o.company.toLowerCase().includes(search.toLowerCase()) || o.domain.toLowerCase().includes(search.toLowerCase());
      const matchDomain = domainFilter === 'all' || o.domain === domainFilter;
      const matchLocation = locationFilter === 'all' || o.location === locationFilter;
      const matchRemote = !remoteFilter || o.remote;
      return matchSearch && matchDomain && matchLocation && matchRemote;
    });
  }, [offers, search, domainFilter, locationFilter, remoteFilter]);

  const toggleSave = (id: number) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, saved: !o.saved } : o));
  };

  const handleApply = (offer: Offer) => {
    setSelectedOffer(offer);
    setApplyModal(true);
    setApplyMessage('');
  };

  const submitApplication = () => {
    if (selectedOffer) {
      setAppliedIds(prev => [...prev, selectedOffer.id]);
      setApplyModal(false);
      setSelectedOffer(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2463]">Recherche de stage</h1>
        <p className="text-gray-500 text-sm mt-1">Trouvez le stage idéal parmi {offers.length} offres</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par titre, entreprise, domaine..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${showFilters ? 'bg-[#3E7BFA] text-white border-[#3E7BFA]' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            <Filter size={16} /> Filtres
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
            <select value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none">
              <option value="all">Tous les domaines</option>
              {domains.filter(d => d !== 'all').map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none">
              <option value="all">Toutes les villes</option>
              {locations.filter(l => l !== 'all').map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <label className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm cursor-pointer hover:bg-gray-50">
              <input type="checkbox" checked={remoteFilter} onChange={(e) => setRemoteFilter(e.target.checked)} className="rounded border-gray-300 text-[#3E7BFA] focus:ring-[#3E7BFA]" />
              Télétravail possible
            </label>
            {(domainFilter !== 'all' || locationFilter !== 'all' || remoteFilter) && (
              <button onClick={() => { setDomainFilter('all'); setLocationFilter('all'); setRemoteFilter(false); }} className="text-sm text-red-500 hover:underline flex items-center gap-1">
                <X size={14} /> Réinitialiser
              </button>
            )}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500">{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</p>

      {/* Offers Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((offer) => (
          <div key={offer.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={offer.logo} alt={offer.company} className="w-10 h-10 rounded-xl" />
                <div>
                  <p className="text-xs text-gray-500">{offer.company}</p>
                  <p className="text-sm font-bold text-[#0A2463] group-hover:text-[#3E7BFA] transition-colors">{offer.title}</p>
                </div>
              </div>
              <button onClick={() => toggleSave(offer.id)} className="text-gray-400 hover:text-[#3E7BFA] transition-colors">
                {offer.saved ? <BookmarkCheck size={20} className="text-[#3E7BFA]" /> : <Bookmark size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{offer.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                <MapPin size={12} /> {offer.location}
              </span>
              <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                <Clock size={12} /> {offer.duration}
              </span>
              {offer.remote && (
                <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full">Remote</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{offer.domain}</span>
              {appliedIds.includes(offer.id) ? (
                <span className="text-xs text-green-600 font-medium">Candidature envoyée</span>
              ) : (
                <button
                  onClick={() => handleApply(offer)}
                  className="text-sm font-semibold text-[#3E7BFA] hover:text-[#2D6AE0] transition-colors"
                >
                  Postuler
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Aucune offre ne correspond à vos critères</p>
          <button onClick={() => { setSearch(''); setDomainFilter('all'); setLocationFilter('all'); setRemoteFilter(false); }} className="text-[#3E7BFA] text-sm mt-2 hover:underline">
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Apply Modal */}
      {applyModal && selectedOffer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setApplyModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-[#0A2463] mb-1">Postuler</h3>
            <p className="text-sm text-gray-500 mb-4">{selectedOffer.title} - {selectedOffer.company}</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message de motivation</label>
              <textarea
                value={applyMessage}
                onChange={(e) => setApplyMessage(e.target.value)}
                rows={4}
                placeholder="Expliquez pourquoi ce stage vous intéresse..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none text-sm resize-none"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setApplyModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Annuler
              </button>
              <button onClick={submitApplication} className="flex-1 py-2.5 bg-[#3E7BFA] text-white rounded-xl text-sm font-semibold hover:bg-[#2D6AE0] transition-colors">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StagesSearch;
