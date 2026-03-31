import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A2463] via-[#1B3A8C] to-[#3E7BFA]">
      <div className="text-center p-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
            <circle cx="10" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
            <circle cx="24" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
            <line x1="18" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2"/>
          </svg>
          <span className="text-white font-bold text-xl">stage<span className="text-blue-300">guide</span></span>
        </div>
        <h1 className="text-8xl font-bold text-white/20 mb-4">404</h1>
        <p className="text-xl text-blue-200 mb-2">Page introuvable</p>
        <p className="text-blue-300/60 text-sm mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={16} /> Retour
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0A2463] rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            <Home size={16} /> Accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
