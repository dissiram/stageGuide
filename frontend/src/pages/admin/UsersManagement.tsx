import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit3, Trash2, UserCheck, UserX, X, Filter } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'stagiaire' | 'mentor' | 'admin';
  status: 'active' | 'suspended';
  avatar: string;
  createdAt: string;
}

const UsersManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'stagiaire' as const });

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Marie Dupont', email: 'marie@email.com', role: 'stagiaire', status: 'active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face', createdAt: '15/01/2026' },
    { id: 2, name: 'Jean Martin', email: 'jean@email.com', role: 'mentor', status: 'active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', createdAt: '10/01/2026' },
    { id: 3, name: 'Sophie Laurent', email: 'sophie@email.com', role: 'stagiaire', status: 'active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', createdAt: '20/01/2026' },
    { id: 4, name: 'Thomas Bernard', email: 'thomas@email.com', role: 'stagiaire', status: 'suspended', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face', createdAt: '25/01/2026' },
    { id: 5, name: 'Lucas Moreau', email: 'lucas@email.com', role: 'mentor', status: 'active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', createdAt: '01/02/2026' },
    { id: 6, name: 'Emma Leroy', email: 'emma@email.com', role: 'stagiaire', status: 'active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face', createdAt: '05/02/2026' },
    { id: 7, name: 'Pierre Durand', email: 'pierre@email.com', role: 'admin', status: 'active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', createdAt: '01/01/2026' },
    { id: 8, name: 'Léa Petit', email: 'lea@email.com', role: 'stagiaire', status: 'active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', createdAt: '10/02/2026' },
  ]);

  const filtered = useMemo(() => {
    return users.filter(u => {
      const matchSearch = search === '' || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      const matchStatus = statusFilter === 'all' || u.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const toggleStatus = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' as const : 'active' as const } : u));
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowModal(true);
  };

  const openCreate = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'stagiaire' });
    setShowModal(true);
  };

  const saveUser = () => {
    if (!formData.name.trim() || !formData.email.trim()) return;
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, name: formData.name, email: formData.email, role: formData.role } : u));
    } else {
      setUsers(prev => [...prev, { id: Date.now(), name: formData.name, email: formData.email, role: formData.role, status: 'active', avatar: `https://ui-avatars.com/api/?name=${formData.name}&background=3E7BFA&color=fff&size=40`, createdAt: 'Aujourd\'hui' }]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0A2463]">Gestion des utilisateurs</h1>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-[#3E7BFA] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#2D6AE0] transition-colors">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#3E7BFA] outline-none">
          <option value="all">Tous les rôles</option>
          <option value="stagiaire">Stagiaire</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#3E7BFA] outline-none">
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="suspended">Suspendu</option>
        </select>
      </div>

      <p className="text-sm text-gray-500">{filtered.length} utilisateur{filtered.length > 1 ? 's' : ''}</p>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-3 font-medium">Utilisateur</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Rôle</th>
                <th className="px-6 py-3 font-medium">Statut</th>
                <th className="px-6 py-3 font-medium">Inscription</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-sm font-medium text-gray-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${u.role === 'stagiaire' ? 'bg-blue-100 text-blue-700' : u.role === 'mentor' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {u.status === 'active' ? 'Actif' : 'Suspendu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{u.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(u)} className="w-8 h-8 rounded-lg hover:bg-blue-50 flex items-center justify-center text-blue-500" title="Modifier"><Edit3 size={14} /></button>
                      <button onClick={() => toggleStatus(u.id)} className="w-8 h-8 rounded-lg hover:bg-amber-50 flex items-center justify-center" title={u.status === 'active' ? 'Suspendre' : 'Activer'}>
                        {u.status === 'active' ? <UserX size={14} className="text-amber-500" /> : <UserCheck size={14} className="text-green-500" />}
                      </button>
                      <button onClick={() => deleteUser(u.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-red-500" title="Supprimer"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0A2463]">{editingUser ? 'Modifier' : 'Ajouter'} un utilisateur</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                <select value={formData.role} onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as any }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] outline-none">
                  <option value="stagiaire">Stagiaire</option>
                  <option value="mentor">Mentor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">Annuler</button>
                <button onClick={saveUser} className="flex-1 py-2.5 bg-[#3E7BFA] text-white rounded-xl text-sm font-semibold hover:bg-[#2D6AE0]">Enregistrer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
