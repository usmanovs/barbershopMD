import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      subtitle: 'Our Menu',
      title: 'Premium Services',
      items: [
        { id: '1', name: 'The Executive Cut', description: 'Precision haircut, hot towel finish, straight razor neck shave, and style consultation.', price: '$45', duration: '45 min' },
        { id: '2', name: 'Signature Shave', description: 'Traditional hot lather shave with essential oils, hot towels, and post-shave balm.', price: '$50', duration: '30 min' },
        { id: '3', name: 'Beard Sculpting', description: 'Detailed beard trimming, shaping, and conditioning treatment.', price: '$35', duration: '30 min' },
        { id: '4', name: 'The Gentry Experience', description: 'Our full service package: Executive Cut combined with the Signature Shave.', price: '$85', duration: '75 min' },
        { id: '5', name: 'Scalp Treatment', description: 'Exfoliating scalp massage and revitalizing treatment for healthy hair growth.', price: '$25', duration: '20 min' },
        { id: '6', name: 'Father & Son', description: 'Combined appointment for a classic bonding experience.', price: '$75', duration: '60 min' }
      ]
    },
    es: {
      subtitle: 'Nuestro Menú',
      title: 'Servicios Premium',
      items: [
        { id: '1', name: 'El Corte Ejecutivo', description: 'Corte de precisión, toalla caliente, afeitado de cuello con navaja y consulta de estilo.', price: '$45', duration: '45 min' },
        { id: '2', name: 'Afeitado Clásico', description: 'Afeitado tradicional con espuma caliente, aceites esenciales y bálsamo post-afeitado.', price: '$50', duration: '30 min' },
        { id: '3', name: 'Esculpido de Barba', description: 'Recorte detallado de barba, perfilado y tratamiento acondicionador.', price: '$35', duration: '30 min' },
        { id: '4', name: 'Experiencia Gentry', description: 'Nuestro paquete completo: Corte Ejecutivo combinado con el Afeitado Clásico.', price: '$85', duration: '75 min' },
        { id: '5', name: 'Tratamiento Capilar', description: 'Masaje exfoliante del cuero cabelludo y tratamiento revitalizante.', price: '$25', duration: '20 min' },
        { id: '6', name: 'Padre e Hijo', description: 'Cita combinada para una experiencia clásica de unión familiar.', price: '$75', duration: '60 min' }
      ]
    },
    ru: {
      subtitle: 'Наше Меню',
      title: 'Премиум Услуги',
      items: [
        { id: '1', name: 'Представительская Стрижка', description: 'Точная стрижка, горячее полотенце, бритье шеи опасной бритвой и консультация.', price: '$45', duration: '45 мин' },
        { id: '2', name: 'Фирменное Бритье', description: 'Традиционное бритье с горячей пеной, эфирными маслами и бальзамом.', price: '$50', duration: '30 мин' },
        { id: '3', name: 'Моделирование Бороды', description: 'Детальная стрижка бороды, придание формы и уход.', price: '$35', duration: '30 мин' },
        { id: '4', name: 'Опыт Джентри', description: 'Полный пакет услуг: Представительская стрижка + Фирменное бритье.', price: '$85', duration: '75 мин' },
        { id: '5', name: 'Уход за Кожей Головы', description: 'Отшелушивающий массаж и восстанавливающий уход для роста волос.', price: '$25', duration: '20 мин' },
        { id: '6', name: 'Отец и Сын', description: 'Совместная запись для классического семейного опыта.', price: '$75', duration: '60 мин' }
      ]
    }
  }[language];

  return (
    <section id="services" className="py-24 bg-brand-gray relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold text-sm font-bold uppercase tracking-[0.2em] mb-3">{content.subtitle}</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">{content.title}</h3>
          <div className="w-20 h-1 bg-brand-gold mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
          {content.items.map((service) => (
            <div key={service.id} className="group relative p-6 border border-white/5 hover:border-brand-gold/30 bg-brand-dark/50 transition-all duration-300">
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-xl font-serif font-semibold text-white group-hover:text-brand-gold transition-colors">
                  {service.name}
                </h4>
                <span className="text-brand-gold font-bold text-lg">{service.price}</span>
              </div>
              <div className="flex justify-between items-start">
                <p className="text-gray-400 text-sm leading-relaxed pr-8">{service.description}</p>
                <span className="text-xs text-gray-500 whitespace-nowrap">{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;