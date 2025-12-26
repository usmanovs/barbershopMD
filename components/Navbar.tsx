import React, { useState, useEffect } from 'react';
import { Menu, X, Scissors, Globe } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface NavbarProps {
  onBookClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    const elementId = id.replace('#', '');
    const element = document.getElementById(elementId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const content = {
    en: {
      services: 'Services',
      ai: 'AI Stylist',
      virtual: 'Virtual Styler',
      team: 'The Team',
      visit: 'Visit Us',
      book: 'Book Now',
      bookFull: 'Book Appointment'
    },
    es: {
      services: 'Servicios',
      ai: 'Estilista IA',
      virtual: 'Estilista Virtual',
      team: 'Equipo',
      visit: 'Visítanos',
      book: 'Reservar',
      bookFull: 'Reservar Cita'
    },
    ru: {
      services: 'Услуги',
      ai: 'ИИ Стилист',
      virtual: 'Вирт. Стилист',
      team: 'Команда',
      visit: 'Контакты',
      book: 'Запись',
      bookFull: 'Записаться'
    }
  }[language];

  const navLinks = [
    { name: content.services, href: '#services' },
    { name: content.ai, href: '#ai-stylist' },
    { name: content.virtual, href: '#virtual-styler' },
    { name: content.team, href: '#team' },
    { name: content.visit, href: '#location' },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/95 backdrop-blur-sm shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#" 
          onClick={handleLogoClick}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="bg-brand-gold p-2 rounded-sm group-hover:bg-brand-dark transition-colors duration-300">
             <Scissors className="w-6 h-6 text-brand-dark group-hover:text-brand-gold transition-colors duration-300" />
          </div>
          <span className="text-2xl font-serif font-bold tracking-wide text-white">GENTRY & CO.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-brand-gold transition-colors duration-300 font-medium cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="text-gray-300 hover:text-brand-gold flex items-center gap-1 p-2"
            >
              <Globe size={20} />
              <span className="text-xs uppercase font-bold">{language}</span>
            </button>
            
            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-brand-dark border border-gray-800 rounded shadow-xl py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 flex items-center gap-2 ${language === lang.code ? 'text-brand-gold' : 'text-gray-300'}`}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={onBookClick}
            className="px-6 py-2 bg-brand-gold text-brand-dark font-bold uppercase text-xs tracking-widest hover:bg-white transition-all duration-300"
          >
            {content.book}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
           <button 
              onClick={() => {
                const nextLang = language === 'en' ? 'es' : language === 'es' ? 'ru' : 'en';
                setLanguage(nextLang);
              }}
              className="text-white flex items-center gap-1"
            >
              <Globe size={20} />
              <span className="text-xs uppercase font-bold">{language}</span>
            </button>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-t border-gray-800 py-8 flex flex-col items-center gap-6 shadow-xl h-screen">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-lg font-serif text-white hover:text-brand-gold cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsOpen(false);
              onBookClick();
            }}
            className="px-8 py-3 bg-brand-gold text-brand-dark font-bold uppercase text-sm tracking-widest mt-4"
          >
            {content.bookFull}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;