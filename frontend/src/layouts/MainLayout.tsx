import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/store/AuthContext';
import {
  LayoutDashboard, Users, MessageSquare, BookOpen, Search, Briefcase,
  FileText, FolderOpen, LogOut, Bell, Menu, X, ChevronDown,
  GraduationCap, ClipboardList, BarChart3, Library
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const isMentor = user?.role === 'mentor';
  const basePath = isMentor ? '/mentor' : '/stagiaire';

  const stagiaireMenu = [
    { icon: <LayoutDashboard size={20} />, label: 'Tableau de bord', path: '/stagiaire' },
    { icon: <Users size={20} />, label: 'Mon Mentor', path: '/stagiaire/mentor' },
    { icon: <MessageSquare size={20} />, label: 'Messages', path: '/stagiaire/messages' },
    { icon: <BookOpen size={20} />, label: 'Formations', path: '/stagiaire/formations' },
    { icon: <Search size={20} />, label: 'Stages', path: '/stagiaire/stages' },
    { icon: <Briefcase size={20} />, label: 'Emplois', path: '/stagiaire/emplois' },
    { icon: <FileText size={20} />, label: 'Portfolio', path: '/stagiaire/portfolio' },
    { icon: <FolderOpen size={20} />, label: 'Documents', path: '/stagiaire/documents' },
  ];

  const mentorMenu = [
    { icon: <LayoutDashboard size={20} />, label: 'Tableau de bord', path: '/mentor' },
    { icon: <GraduationCap size={20} />, label: 'Mes Mentorés', path: '/mentor/mentores' },
    { icon: <MessageSquare size={20} />, label: 'Messages', path: '/mentor/messages' },
    { icon: <Library size={20} />, label: 'Ressources', path: '/mentor/ressources' },
    { icon: <ClipboardList size={20} />, label: 'Rapports', path: '/mentor/rapports' },
  ];

  const menuItems = isMentor ? mentorMenu : stagiaireMenu;

  const notifications = [
    { id: 1, title: 'Nouvelle session planifiée', content: 'Votre mentor a planifié une session pour demain à 14h', time: 'Il y a 5 min', read: false },
    { id: 2, title: 'Formation complétée', content: 'Félicitations ! Vous avez terminé "React Avancé"', time: 'Il y a 1h', read: false },
    { id: 3, title: 'Nouveau message', content: 'Jean Martin vous a envoyé un message', time: 'Il y a 2h', read: true },
  ];

  const isActive = (path: string) => {
    if (path === basePath) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0A2463] transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2 px-6 h-16 border-b border-white/10">
          <svg width="32" height="20" viewBox="0 0 40 24" fill="none">
            <circle cx="10" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
            <circle cx="24" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
            <line x1="18" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2"/>
          </svg>
          <span className="text-white font-bold text-lg">stage<span className="text-blue-300">guide</span></span>
        </div>

        <nav className="px-3 py-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => { navigate(item.path); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(item.path)
                  ? 'bg-[#3E7BFA] text-white shadow-lg shadow-blue-500/20'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={async () => { await logout(); navigate('/'); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} /> Déconnexion
          </button>
        </div>

      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-600 hover:text-gray-900" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-[#0A2463] hidden sm:block">
              {isMentor ? 'Espace Mentor' : 'Espace Stagiaire'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                className="relative w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#0A2463]">Notifications</span>
                    <button className="text-xs text-[#3E7BFA] hover:underline">Tout marquer lu</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                        <p className="text-sm font-medium text-gray-900">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.content}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 hover:bg-gray-50 rounded-xl px-2 py-1.5 transition-colors"
              >
                <img
                  src={user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.first_name}+${user?.last_name}&background=3E7BFA&color=fff`}
                  alt="Avatar"
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.first_name} {user?.last_name}
                </span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user?.first_name} {user?.last_name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
                  </div>
                  <div className="py-1">
                    <button onClick={() => { navigate(basePath); setProfileOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Mon profil</button>
                    <button onClick={() => { logout(); navigate('/'); setProfileOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Déconnexion</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
