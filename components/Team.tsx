import React from 'react';
import { Barber } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Team: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      subtitle: 'The Talent',
      title: 'Master Barbers',
      desc: 'Combined 30+ years of experience serving the gentlemen of Montgomery County.',
      specialtyLabel: 'Specialty',
      barbers: [
        { name: 'James Sterling', specialty: 'Master Barber' },
        { name: 'Marcus Thorne', specialty: 'Beard Specialist' },
        { name: 'David Chen', specialty: 'Precision Fades' }
      ]
    },
    es: {
      subtitle: 'El Talento',
      title: 'Maestros Barberos',
      desc: 'Más de 30 años de experiencia combinada sirviendo a los caballeros del condado de Montgomery.',
      specialtyLabel: 'Especialidad',
      barbers: [
        { name: 'James Sterling', specialty: 'Maestro Barbero' },
        { name: 'Marcus Thorne', specialty: 'Especialista en Barba' },
        { name: 'David Chen', specialty: 'Degradados de Precisión' }
      ]
    },
    ru: {
      subtitle: 'Команда',
      title: 'Мастера Барберы',
      desc: 'Более 30 лет совместного опыта обслуживания джентльменов округа Монтгомери.',
      specialtyLabel: 'Специализация',
      barbers: [
        { name: 'Джеймс Стерлинг', specialty: 'Мастер-барбер' },
        { name: 'Маркус Торн', specialty: 'Специалист по Бородам' },
        { name: 'Дэвид Чен', specialty: 'Точные Фейды' }
      ]
    }
  }[language];

  const barbers: Barber[] = [
    {
      id: '1',
      name: content.barbers[0].name,
      specialty: content.barbers[0].specialty,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop'
    },
    {
      id: '2',
      name: content.barbers[1].name,
      specialty: content.barbers[1].specialty,
      image: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?q=80&w=1776&auto=format&fit=crop'
    },
    {
      id: '3',
      name: content.barbers[2].name,
      specialty: content.barbers[2].specialty,
      image: 'https://images.unsplash.com/photo-1605497788044-5a90406410d7?q=80&w=1887&auto=format&fit=crop'
    }
  ];

  return (
    <section id="team" className="py-24 bg-brand-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em] mb-3">{content.subtitle}</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">{content.title}</h3>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">{content.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber) => (
            <div key={barber.id} className="group">
              <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                <img 
                  src={barber.image} 
                  alt={barber.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <p className="text-brand-gold uppercase text-xs font-bold tracking-widest mb-2">{content.specialtyLabel}</p>
                  <p className="text-white text-sm">{barber.specialty}</p>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-serif font-bold text-white">{barber.name}</h4>
                <p className="text-brand-gold text-sm uppercase tracking-widest mt-1">{barber.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;