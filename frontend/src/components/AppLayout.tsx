import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, GraduationCap, Target, BarChart3, FileCheck, Menu, X } from 'lucide-react';

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const testimonials = [
    { text: "StageGuide m'a permis de trouver un stage parfaitement adapté à mes compétences. Le système de matching intelligent m'a connecté avec un mentor exceptionnel qui m'a guidé tout au long de mon parcours.", name: 'Mark Jones', role: 'Founder & CEO', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
    { text: "En tant que mentor, la plateforme me permet de suivre efficacement mes stagiaires. Les outils d'évaluation et de suivi sont remarquables et facilitent grandement l'accompagnement.", name: 'Sophie Laurent', role: 'Directrice RH', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
    { text: "La gestion des conventions et le suivi analytique nous ont fait gagner un temps considérable. StageGuide est devenu un outil indispensable pour notre établissement.", name: 'Pierre Moreau', role: 'Responsable Partenariats', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
  ];

  const partners = ['TechCorp', 'InnovateLab', 'DataSphere', 'CloudNine', 'NextGen'];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A2463]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <circle cx="10" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
                <circle cx="24" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
                <line x1="18" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2"/>
              </svg>
              <span className="text-white font-bold text-lg ml-1">stage<span className="text-blue-300">guide</span></span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <button className="px-4 py-2 text-white bg-white/20 rounded-full text-sm font-medium">Accueil</button>
              <button onClick={() => navigate('/stagiaire/mentor')} className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors">Mentorat</button>
              <button onClick={() => navigate('/stagiaire/stages')} className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors">Stages</button>
              <button onClick={() => navigate('/admin/partenaires')} className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors">Entreprises</button>
              <button className="px-4 py-2 text-white/80 hover:text-white text-sm font-medium transition-colors">Nous contacter</button>
            </div>
            <div className="hidden md:block">
              <button onClick={() => navigate('/login')} className="text-blue-300 hover:text-white font-semibold text-sm transition-colors">Connexion</button>
            </div>
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A2463] border-t border-white/10 px-4 py-4 space-y-2">
            <button className="block w-full text-left px-4 py-2 text-white rounded-lg bg-white/10">Accueil</button>
            <button onClick={() => { navigate('/stagiaire/mentor'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-white/80 rounded-lg">Mentorat</button>
            <button onClick={() => { navigate('/stagiaire/stages'); setMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-white/80 rounded-lg">Stages</button>
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
          <button onClick={() => navigate('/register')} className="inline-flex items-center gap-2 bg-[#3E7BFA] hover:bg-[#2D6AE0] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
            Commencer <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463] italic">Processus</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { icon: <GraduationCap size={28} />, title: 'Crée ton profil', desc: 'Renseigne tes informations académiques, tes compétences, tes objectifs de carrière et tes préférences pour un matching optimal.' },
              { icon: <Target size={28} />, title: 'Trouve ton stage et ton mentor', desc: 'Accède à un système de matching intelligent qui analyse ton profil pour te connecter automatiquement aux meilleurs mentors et stages.' },
              { icon: <BarChart3 size={28} />, title: 'Suis ton parcours en temps réel', desc: 'Visualise ton évolution à chaque étape de ton parcours avec une vision claire, structurée et accompagnée de tes progrès.' },
              { icon: <FileCheck size={28} />, title: 'Recevez vos attestations', desc: 'À la fin de tes modules et de ton stage, reçois automatiquement tes attestations, certificats validés et intègre-les dans ton portfolio.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-2xl hover:bg-blue-50/50 transition-colors group">
                <div className="flex-shrink-0 w-14 h-14 bg-[#0A2463] rounded-xl flex items-center justify-center text-white group-hover:bg-[#3E7BFA] transition-colors">{item.icon}</div>
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
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0A2463] mb-16">Pourquoi Stage Guide ?</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop', label: 'Trouve ton stage en ligne', color: 'bg-[#3E7BFA]' },
              { img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop', label: 'Des formations certifiantes accessibles', color: 'bg-green-500' },
              { img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop', label: 'Une plateforme complète et centralisée', color: 'bg-[#0A2463]' },
              { img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop', label: 'Un suivi clair et motivant', color: 'bg-[#3E7BFA]' },
              { img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop', label: 'Un matching intelligent et personnalisé', color: 'bg-[#0A2463]' },
              { img: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop', label: 'Soyez en stage depuis chez vous', color: 'bg-green-500' },
            ].map((item, i) => (
              <div key={i} className="relative group overflow-hidden rounded-2xl aspect-[4/3]">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className={`inline-block ${item.color} text-white text-xs md:text-sm font-medium px-3 py-1.5 rounded-full`}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Matching Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=500&fit=crop" alt="Smart matching" className="w-full h-[400px] object-cover" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-6">Notre système d'appariement intelligent</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">StageGuide utilise un système avancé qui analyse ton profil en profondeur en tenant compte de tes compétences, de ton domaine d'étude, de tes objectifs, de la localisation, de la disponibilité et même de ton style d'apprentissage.</p>
              <p className="text-gray-600 leading-relaxed">Grâce à cette analyse complète, la plateforme identifie automatiquement les stages les plus pertinents et les mentors offrant un accompagnement réellement adapté à ton parcours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#0A2463] to-[#1B3A8C] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">Rejoignez notre team de stagiaires, gagnez en compétences et en expériences.</h2>
          <p className="text-5xl md:text-6xl font-bold text-[#3E7BFA] mb-8">100K <span className="text-xl text-blue-300 font-normal">Utilisateurs</span></p>
          <button onClick={() => navigate('/register')} className="bg-white text-[#0A2463] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">Créer un compte</button>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-[#0A2463] mb-12">Nos partenaires</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
                <div className="w-3 h-3 rounded-full bg-current"></div>
                <span className="text-lg font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Partner Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0A2463] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <img src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=500&h=350&fit=crop" alt="Partner" className="w-full h-64 object-cover rounded-2xl" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Devenez notre prochain partenaire</h3>
                <p className="text-blue-200 mb-6">Ensemble, construisons des parcours plus fluides, plus transparents et plus performants.</p>
                <div className="mb-8">
                  <h4 className="text-white font-bold mb-3">Avantages</h4>
                  <ul className="space-y-2">
                    {['Recrutez plus facilement les meilleurs talents', 'Gagnez du temps dans la gestion des stages', 'Valorisez votre entreprise ou établissement'].map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-blue-200 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3E7BFA] mt-2 flex-shrink-0"></div>{a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => navigate('/register')} className="bg-white text-[#0A2463] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm">Devenir notre prochain partenaire</button>
                  <button className="border border-[#3E7BFA] text-[#3E7BFA] px-6 py-3 rounded-lg font-semibold hover:bg-[#3E7BFA] hover:text-white transition-colors text-sm">En savoir plus</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A2463] mb-12">Ils nous font confiance</h2>
          <div className="relative">
            <img src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} className="w-16 h-16 rounded-full mx-auto mb-6 object-cover ring-4 ring-blue-100" />
            <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto">{testimonials[testimonialIdx].text}</p>
            <p className="text-[#3E7BFA] font-bold">{testimonials[testimonialIdx].name}</p>
            <p className="text-gray-500 text-sm">{testimonials[testimonialIdx].role}</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={() => setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"><ChevronLeft size={18} /></button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (<button key={i} onClick={() => setTestimonialIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === testimonialIdx ? 'bg-[#3E7BFA]' : 'bg-gray-300'}`} />))}
              </div>
              <button onClick={() => setTestimonialIdx((prev) => (prev + 1) % testimonials.length)} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"><ChevronRight size={18} /></button>
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
                <svg width="32" height="20" viewBox="0 0 40 24" fill="none"><circle cx="10" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/><circle cx="24" cy="12" r="8" stroke="white" strokeWidth="2.5" fill="none"/><line x1="18" y1="6" x2="18" y2="18" stroke="white" strokeWidth="2"/></svg>
                <span className="font-bold">stage<span className="text-blue-300">guide</span></span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">La plateforme qui connecte stages, mentors et opportunités professionnelles.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><button onClick={() => navigate('/stagiaire/mentor')} className="hover:text-white transition-colors">Mentorat</button></li>
                <li><button onClick={() => navigate('/stagiaire/stages')} className="hover:text-white transition-colors">Stages</button></li>
                <li><button onClick={() => navigate('/admin/partenaires')} className="hover:text-white transition-colors">Entreprises</button></li>
                <li><button className="hover:text-white transition-colors">Nous contacter</button></li>
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
                <button className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors">App Store</button>
                <button className="w-full bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors">Google Play</button>
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

export default AppLayout;
