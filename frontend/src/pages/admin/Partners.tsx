import React, { useState } from 'react';
import { Search, Plus, Edit3, Building2, MapPin, Globe, X } from 'lucide-react';

const Partners: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', city: '', website: '', email: '' });

  const [partners, setPartners] = useState([
    { id: 1, name: 'TechCorp', city: 'Paris', website: 'techcorp.fr', email: 'contact@techcorp.fr', stages: 12, embauches: 5, logo: 'https://ui-avatars.com/api/?name=TC&background=3E7BFA&color=fff&size=48' },
    { id: 2, name: 'DataSphere', city: 'Lyon', website: 'datasphere.io', email: 'rh@datasphere.io', stages: 8, embauches: 3, logo: 'https://ui-avatars.com/api/?name=DS&background=10B981&color=fff&size=48' },
    { id: 3, name: 'CreativeStudio', city: 'Bordeaux', website: 'creativestudio.fr', email: 'hello@creativestudio.fr', stages: 6, embauches: 2, logo: 'https://ui-avatars.com/api/?name=CS&background=F59E0B&color=fff&size=48' },
    { id: 4, name: 'CloudNine', city: 'Paris', website: 'cloudnine.tech', email: 'jobs@cloudnine.tech', stages: 15, embauches: 7, logo: 'https://ui-avatars.com/api/?name=CN&background=8B5CF6&color=fff&size=48' },
    { id: 5, name: 'InnovateLab', city: 'Toulouse', website: 'innovatelab.com', email: 'contact@innovatelab.com', stages: 10, embauches: 4, logo: 'https://ui-avatars.com/api/?name=IL&background=EF4444&color=fff&size=48' },
    { id: 6, name: 'NextGen', city: 'Nantes', website: 'nextgen.fr', email: 'rh@nextgen.fr', stages: 9, embauches: 3, logo: 'https://ui-avatars.com/api/?name=NG&background=0A2463&color=fff&size=48' },
  ]);

  const filtered = partners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase()));

  const addPartner = () => {
    if (!formData.name.trim()) return;
    setPartners(prev => [...prev, { id: Date.now(), ...formData, stages: 0, embauches: 0, logo: `https://ui-avatars.com/api/?name=${formData.name.split(' ').map(w => w[0]).join('')}&background=3E7BFA&color=fff&size=48` }]);
    setFormData({ name: '', city: '', website: '', email: '' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0A2463]">Partenaires</h1>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 bg-[#3E7BFA] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2D6AE0] transition-colors">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <img src={p.logo} alt={p.name} className="w-12 h-12 rounded-xl" />
              <div>
                <h3 className="font-bold text-[#0A2463]">{p.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12} /> {p.city}</p>
              </div>
            </div>
            <div className="space-y-1 text-xs text-gray-500 mb-4">
              <p className="flex items-center gap-1"><Globe size={12} /> {p.website}</p>
              <p>{p.email}</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="text-center">
                <p className="text-lg font-bold text-[#3E7BFA]">{p.stages}</p>
                <p className="text-xs text-gray-500">Stages</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{p.embauches}</p>
                <p className="text-xs text-gray-500">Embauches</p>
              </div>
              <button className="w-8 h-8 rounded-lg hover:bg-blue-50 flex items-center justify-center text-blue-500"><Edit3 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0A2463]">Ajouter un partenaire</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Nom de l'entreprise" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
              <input type="text" value={formData.city} onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))} placeholder="Ville" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
              <input type="text" value={formData.website} onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))} placeholder="Site web" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
              <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="Email de contact" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">Annuler</button>
                <button onClick={addPartner} className="flex-1 py-2.5 bg-[#3E7BFA] text-white rounded-xl text-sm font-semibold hover:bg-[#2D6AE0]">Ajouter</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;
