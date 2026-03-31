import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Users, BookOpen, Award, ChevronLeft, ChevronRight, ArrowRight, GraduationCap, Target, BarChart3, FileCheck, Menu, X } from 'lucide-react';
import WhyStageGuide from "./WhyStageGuide/WhyStageGuide";
import Stagiaire from "./StagiaireHomePage/Stagiaire";
import Partenaire from "./Partenaire/Partenaire";
import '@/styles/Style.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const testimonials = [
    {
      text: "StageGuide m'a permis de trouver un stage parfaitement adapté à mes compétences. Le système de matching intelligent m'a connecté avec un mentor exceptionnel qui m'a guidé tout au long de mon parcours.",
      name: 'Mark Jones',
      role: 'Founder & CEO',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    },
    {
      text: "En tant que mentor, la plateforme me permet de suivre efficacement mes stagiaires. Les outils d'évaluation et de suivi sont remarquables et facilitent grandement l'accompagnement.",
      name: 'Sophie Laurent',
      role: 'Directrice RH',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    },
    {
      text: "La gestion des conventions et le suivi analytique nous ont fait gagner un temps considérable. StageGuide est devenu un outil indispensable pour notre établissement.",
      name: 'Pierre Moreau',
      role: 'Responsable Partenariats',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    },
  ];

  const partners = ['TechCorp', 'InnovateLab', 'DataSphere', 'CloudNine', 'NextGen'];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A2463]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                  <circle cx="10" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
                  <circle cx="24" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
                  <line x1="18" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2"/>
                </svg>
                <span className="text-white font-bold text-lg ml-1">stage<br className="leading-none"/><span className="text-blue-300">guide</span></span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <button onClick={() => {}} className="px-4 py-2 text-white bg-white/20 rounded-full text-sm font-medium">Accueil</button>
              <button onClick={() => navigate('/stagiaire/mentor')} className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors">Mentorat</button>
              <button onClick={() => navigate('/stagiaire/stages')} className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors">Stages</button>
              <button onClick={() => navigate('/admin/partenaires')} className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors">Entreprises</button>
              <button onClick={() => {}} className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors">Nous contacter</button>
            </div>

            <div className="hidden md:block">
              <button onClick={() => navigate('/login')} className="text-blue-300 hover:text-white font-semibold text-sm transition-colors">
                Connexion
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A2463] border-t border-white/10 px-4 py-4 space-y-2">
            <button onClick={() => { setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-white rounded-lg bg-white/10">Accueil</button>
            <button onClick={() => { navigate('/stagiaire/mentor'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-white/80 hover:text-white rounded-lg">Mentorat</button>
            <button onClick={() => { navigate('/stagiaire/stages'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-white/80 hover:text-white rounded-lg">Stages</button>
            <button onClick={() => { navigate('/admin/partenaires'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-white/80 hover:text-white rounded-lg">Entreprises</button>
            <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-blue-300 font-semibold rounded-lg">Connexion</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 bg-gradient-to-br from-[#0A2463] via-[#1B3A8C] to-[#3E7BFA] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full border-2 border-white/30"></div>
          <div className="absolute top-40 right-40 w-48 h-48 rounded-full border-2 border-white/20"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full border border-white/20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Trouve ton stage<br />en ligne<span className="text-blue-300">.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-10">
            Le mentorat qui t'oriente... pour devenir meilleur, guidé par les meilleurs...
          </p>
          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-2 bg-[#3E7BFA] hover:bg-[#2D6AE0] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
          >
            Commencer <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* ===== TITLE ===== */}
        <h2 className='title' data-aos="fade-right">
          <span className='line'></span>
          Processus
        </h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { icon: <GraduationCap size={28} />, title: 'Crée ton profil', desc: 'Renseigne tes informations académiques, tes compétences, tes objectifs de carrière et tes préférences pour un matching optimal.' },
              { icon: <Target size={28} />, title: 'Trouve ton stage et ton mentor', desc: 'Accède à un système de matching intelligent qui analyse ton profil pour te connecter automatiquement aux meilleurs mentors et stages.' },
              { icon: <BarChart3 size={28} />, title: 'Suis ton parcours en temps réel', desc: 'Visualise ton évolution à chaque étape de ton parcours. Tu accéderas à une vision claire, structurée et accompagnée de tes progrès.' },
              { icon: <FileCheck size={28} />, title: 'Recevez vos attestations', desc: 'À la fin de tes modules et de ton stage, reçois automatiquement tes attestations, certificats validés et intègre-les dans ton portfolio.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-2xl hover:bg-blue-50/50 transition-colors group">
                <div className="flex-shrink-0 w-14 h-14 bg-[#0A2463] rounded-xl flex items-center justify-center text-white group-hover:bg-[#3E7BFA] transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A2463] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why StageGuide Section */}
      <WhyStageGuide />

      {/* Smart Matching Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=500&fit=crop"
                  alt="Smart matching"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#3E7BFA]/10 rounded-full blur-2xl"></div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-6">
                Notre système d'appariement intelligent
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                StageGuide utilise un système avancé qui analyse ton profil en profondeur en tenant compte de tes compétences, de ton domaine d'étude, de tes objectifs, de la localisation, de la disponibilité et même de ton style d'apprentissage.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Grâce à cette analyse complète, la plateforme identifie automatiquement les stages les plus pertinents et les mentors offrant un accompagnement réellement adapté à ton parcours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
     <Stagiaire/>

      {/* Partners Section */}
           <Partenaire/>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2463] mb-12">
            Ils nous font confiance
          </h2>
          <div className="relative">
            <div className="mb-8">
              <img
                src={testimonials[testimonialIdx].avatar}
                alt={testimonials[testimonialIdx].name}
                className="w-16 h-16 rounded-full mx-auto mb-6 object-cover ring-4 ring-blue-100"
              />
              <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto">
                {testimonials[testimonialIdx].text}
              </p>
              <p className="text-[#3E7BFA] font-bold">{testimonials[testimonialIdx].name}</p>
              <p className="text-gray-500 text-sm">{testimonials[testimonialIdx].role}</p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${i === testimonialIdx ? 'bg-[#3E7BFA]' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIdx((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2463] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg width="32" height="20" viewBox="0 0 40 24" fill="none">
                  <circle cx="10" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
                  <circle cx="24" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
                  <line x1="18" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2"/>
                </svg>
                <span className="font-bold">stage<span className="text-blue-300">guide</span></span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                La plateforme qui connecte stages, mentors et opportunités professionnelles.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><button onClick={() => navigate('/stagiaire/mentor')} className="hover:text-white transition-colors">Mentorat</button></li>
                <li><button onClick={() => navigate('/stagiaire/stages')} className="hover:text-white transition-colors">Stages</button></li>
                <li><button onClick={() => navigate('/admin/partenaires')} className="hover:text-white transition-colors">Entreprises</button></li>
                <li><button onClick={() => {}} className="hover:text-white transition-colors">Nous contacter</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><button className="hover:text-white transition-colors">FAQ</button></li>
                <li><button className="hover:text-white transition-colors">Assistance</button></li>
                <li><button className="hover:text-white transition-colors">Documentation</button></li>
                <li><button className="hover:text-white transition-colors">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Install App</h4>
              <div className="space-y-3">
                <button className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  App Store
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                  Google Play
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-blue-200 text-sm">&copy; 2026 StageGuide. Tous droits réservés.</p>
            <div className="flex gap-4">
              {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
                <button key={social} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <div className="w-3.5 h-3.5 rounded-full bg-white/60"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
