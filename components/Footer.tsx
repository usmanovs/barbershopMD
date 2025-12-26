import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      desc: "Gaithersburg's premier destination for gentleman's grooming. We combine traditional techniques with modern style in a relaxed, upscale environment.",
      contact: 'Contact Us',
      hours: 'Opening Hours',
      days: {
        monfri: 'Mon - Fri',
        sat: 'Saturday',
        sun: 'Sunday'
      },
      club: 'The Gentry Club',
      clubDesc: 'Join for exclusive offers and grooming tips.',
      emailPlaceholder: 'Email Address',
      subscribe: 'Subscribe',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    es: {
      desc: "El destino principal de Gaithersburg para el cuidado del caballero. Combinamos técnicas tradicionales con estilo moderno en un ambiente relajado y exclusivo.",
      contact: 'Contáctanos',
      hours: 'Horario de Apertura',
      days: {
        monfri: 'Lun - Vie',
        sat: 'Sábado',
        sun: 'Domingo'
      },
      club: 'El Club Gentry',
      clubDesc: 'Únete para ofertas exclusivas y consejos.',
      emailPlaceholder: 'Correo Electrónico',
      subscribe: 'Suscribirse',
      rights: 'Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio'
    },
    ru: {
      desc: "Главное место в Гейтерсберге для мужского ухода. Мы сочетаем традиционные техники с современным стилем в расслабленной, престижной обстановке.",
      contact: 'Контакты',
      hours: 'Часы Работы',
      days: {
        monfri: 'Пн - Пт',
        sat: 'Суббота',
        sun: 'Воскресенье'
      },
      club: 'Клуб Gentry',
      clubDesc: 'Присоединяйтесь для получения эксклюзивных предложений.',
      emailPlaceholder: 'Email Адрес',
      subscribe: 'Подписаться',
      rights: 'Все права защищены.',
      privacy: 'Конфиденциальность',
      terms: 'Условия использования'
    }
  }[language];

  return (
    <footer id="location" className="bg-black text-white pt-20 border-t border-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-6">GENTRY & CO.</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {content.desc}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">{content.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                <span className="text-gray-400 text-sm">
                  9811 Washingtonian Blvd<br />
                  Gaithersburg, MD 20878<br />
                  (Rio Lakefront)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-gray-400 text-sm">(301) 555-0123</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">{content.hours}</h4>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">{content.days.monfri}</span>
                <span className="text-gray-300">10:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">{content.days.sat}</span>
                <span className="text-gray-300">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">{content.days.sun}</span>
                <span className="text-gray-300">10:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
             <h4 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">{content.club}</h4>
             <p className="text-gray-500 text-xs mb-4">{content.clubDesc}</p>
             <div className="flex flex-col gap-2">
               <input 
                 type="email" 
                 placeholder={content.emailPlaceholder}
                 className="bg-gray-900 border border-gray-800 text-white px-4 py-2 text-sm focus:border-brand-gold focus:outline-none"
               />
               <button className="bg-brand-gold text-brand-dark uppercase font-bold text-xs tracking-widest py-2 hover:bg-white transition-colors">
                 {content.subscribe}
               </button>
             </div>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="w-full h-64 md:h-80 mb-10 grayscale hover:grayscale-0 transition-all duration-500 rounded-sm overflow-hidden border border-gray-800">
          <iframe 
            src="https://maps.google.com/maps?q=9811+Washingtonian+Blvd,+Gaithersburg,+MD+20878&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{border:0}} 
            allowFullScreen={false} 
            aria-hidden="false" 
            tabIndex={0}
            title="Gentry & Co. Location"
          ></iframe>
        </div>

        <div className="border-t border-gray-900 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© 2024 Gentry & Co. Barbershop. {content.rights}</p>
          <div className="flex gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-brand-gold">{content.privacy}</a>
            <a href="#" className="hover:text-brand-gold">{content.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;