import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onBookClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const { language } = useLanguage();

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      const headerOffset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const content = {
    en: {
      est: 'Est. 2024 • Gaithersburg, MD',
      titlePart1: 'The Art of',
      titlePart2: 'Grooming',
      description: 'Experience the pinnacle of masculine care in the heart of Rio Lakefront. Precision cuts, hot towel shaves, and executive service.',
      bookBtn: 'Book Appointment',
      servicesBtn: 'View Services'
    },
    es: {
      est: 'Est. 2024 • Gaithersburg, MD',
      titlePart1: 'El Arte del',
      titlePart2: 'Estilo',
      description: 'Experimente la cima del cuidado masculino en el corazón de Rio Lakefront. Cortes de precisión, afeitados con toalla caliente y servicio ejecutivo.',
      bookBtn: 'Reservar Cita',
      servicesBtn: 'Ver Servicios'
    },
    ru: {
      est: 'Осн. 2024 • Гейтерсберг, Мэриленд',
      titlePart1: 'Искусство',
      titlePart2: 'Груминга',
      description: 'Испытайте вершину мужского ухода в центре Rio Lakefront. Точные стрижки, бритье с горячим полотенцем и сервис представительского класса.',
      bookBtn: 'Записаться',
      servicesBtn: 'Смотреть Услуги'
    }
  }[language];

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
          alt="Barbershop Interior" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div 
          className="inline-block mb-4 px-4 py-1 border border-brand-gold/30 rounded-full bg-brand-dark/50 backdrop-blur-sm animate-slide-up opacity-0"
          style={{ animationDelay: '0ms' }}
        >
          <span className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold">{content.est}</span>
        </div>
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight animate-slide-up opacity-0"
          style={{ animationDelay: '200ms' }}
        >
          {content.titlePart1} <br />
          <span className="text-brand-gold italic">{content.titlePart2}</span>
        </h1>
        <p 
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-slide-up opacity-0"
          style={{ animationDelay: '400ms' }}
        >
          {content.description}
        </p>
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up opacity-0"
          style={{ animationDelay: '600ms' }}
        >
          <button 
            onClick={onBookClick}
            className="px-8 py-4 bg-brand-gold text-brand-dark font-bold uppercase text-sm tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            {content.bookBtn}
          </button>
          <a 
            href="#services"
            onClick={scrollToServices}
            className="px-8 py-4 border border-white/20 text-white font-bold uppercase text-sm tracking-widest hover:border-brand-gold hover:text-brand-gold transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            {content.servicesBtn}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;