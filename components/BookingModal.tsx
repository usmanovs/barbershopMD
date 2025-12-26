import React, { useState } from 'react';
import { X, Clock, Check, Scissors, Loader2, Mail, Calendar, MapPin } from 'lucide-react';
import { BookingFormData } from '../types';
import { sendBookingConfirmation } from '../services/emailService';
import { useLanguage } from '../contexts/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    service: 'The Executive Cut',
    date: '',
    time: ''
  });
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Book Appointment',
      subtitle: 'Select your preferred time and service.',
      labels: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone',
        date: 'Date',
        time: 'Time',
        service: 'Service',
        selectTime: 'Select Time'
      },
      buttons: {
        confirm: 'Confirm Booking',
        processing: 'Processing...',
        close: 'Close & Return to Site'
      },
      success: {
        title: 'Appointment Confirmed',
        sentTo: 'We have sent a confirmation to',
        dear: 'Dear',
        pleased: 'We are pleased to confirm your appointment for'
      },
      services: {
        exec: 'The Executive Cut',
        shave: 'Signature Shave',
        beard: 'Beard Sculpting',
        gentry: 'The Gentry Experience',
        scalp: 'Scalp Treatment',
        father: 'Father & Son'
      }
    },
    es: {
      title: 'Reservar Cita',
      subtitle: 'Seleccione su hora y servicio preferido.',
      labels: {
        name: 'Nombre Completo',
        email: 'Correo Electrónico',
        phone: 'Teléfono',
        date: 'Fecha',
        time: 'Hora',
        service: 'Servicio',
        selectTime: 'Seleccionar Hora'
      },
      buttons: {
        confirm: 'Confirmar Reserva',
        processing: 'Procesando...',
        close: 'Cerrar y Volver'
      },
      success: {
        title: 'Cita Confirmada',
        sentTo: 'Hemos enviado una confirmación a',
        dear: 'Estimado/a',
        pleased: 'Nos complace confirmar su cita para'
      },
      services: {
        exec: 'El Corte Ejecutivo',
        shave: 'Afeitado Clásico',
        beard: 'Esculpido de Barba',
        gentry: 'Experiencia Gentry',
        scalp: 'Tratamiento Capilar',
        father: 'Padre e Hijo'
      }
    },
    ru: {
      title: 'Записаться на прием',
      subtitle: 'Выберите удобное время и услугу.',
      labels: {
        name: 'Полное Имя',
        email: 'Email',
        phone: 'Телефон',
        date: 'Дата',
        time: 'Время',
        service: 'Услуга',
        selectTime: 'Выберите время'
      },
      buttons: {
        confirm: 'Подтвердить Бронирование',
        processing: 'Обработка...',
        close: 'Закрыть и Вернуться'
      },
      success: {
        title: 'Запись Подтверждена',
        sentTo: 'Мы отправили подтверждение на',
        dear: 'Уважаемый(ая)',
        pleased: 'Мы рады подтвердить вашу запись на'
      },
      services: {
        exec: 'Представительская Стрижка',
        shave: 'Фирменное Бритье',
        beard: 'Моделирование Бороды',
        gentry: 'Опыт Джентри',
        scalp: 'Уход за Кожей Головы',
        father: 'Отец и Сын'
      }
    }
  }[language];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use the Resend email service
      await sendBookingConfirmation(formData);
      setStep(2);
    } catch (error) {
      console.error("Booking failed", error);
      // Optionally handle error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setFormData({ name: '', email: '', phone: '', service: 'The Executive Cut', date: '', time: '' });
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={handleClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-brand-dark border border-brand-gold/20 w-full max-w-lg p-8 rounded-lg shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {step === 1 ? (
          <>
            <div className="text-center mb-6">
              <div className="inline-block p-3 rounded-full bg-brand-gold/10 mb-4">
                <Scissors className="w-6 h-6 text-brand-gold" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">{content.title}</h2>
              <p className="text-gray-400 text-sm mt-2">{content.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">{content.labels.name}</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-brand-gray border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-brand-gold focus:outline-none placeholder-gray-600"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">{content.labels.email}</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-brand-gray border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-brand-gold focus:outline-none placeholder-gray-600"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">{content.labels.phone}</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full bg-brand-gray border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-brand-gold focus:outline-none placeholder-gray-600"
                    placeholder="(301) 555-0123"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">{content.labels.date}</label>
                  <input 
                    required
                    type="date" 
                    className="w-full bg-brand-gray border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-brand-gold focus:outline-none appearance-none"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">{content.labels.time}</label>
                  <div className="relative">
                    <select 
                      required
                      className="w-full bg-brand-gray border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-brand-gold focus:outline-none appearance-none"
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                    >
                      <option value="">{content.labels.selectTime}</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                    <Clock className="absolute right-3 top-3.5 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">{content.labels.service}</label>
                <select 
                  className="w-full bg-brand-gray border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-brand-gold focus:outline-none"
                  value={formData.service}
                  onChange={e => setFormData({...formData, service: e.target.value})}
                >
                  {Object.values(content.services).map((svc) => (
                    <option key={svc} value={svc}>{svc}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-gold text-brand-dark font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors rounded-sm disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      {content.buttons.processing}
                    </>
                  ) : (
                    content.buttons.confirm
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500 animate-bounce">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">{content.success.title}</h3>
              <p className="text-gray-400 text-sm mt-2">
                {content.success.sentTo} <strong>{formData.email}</strong>
              </p>
            </div>

            <div className="bg-white text-brand-dark p-6 rounded-sm shadow-lg relative overflow-hidden mb-6">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold"></div>
              <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-4">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Sent via Resend</span>
              </div>
              
              <div className="text-sm leading-relaxed text-gray-800 font-serif">
                <p className="mb-4">{content.success.dear} {formData.name.split(' ')[0]},</p>
                <p className="mb-4">{content.success.pleased} <strong>{formData.service}</strong>.</p>
                
                <div className="bg-gray-50 p-4 border border-gray-200 rounded mb-4">
                   <ul className="space-y-1 text-sm">
                     <li className="flex items-center gap-2"><Calendar size={14}/> {formData.date}</li>
                     <li className="flex items-center gap-2"><Clock size={14}/> {formData.time}</li>
                     <li className="flex items-center gap-2"><MapPin size={14}/> Rio Lakefront, Gaithersburg</li>
                   </ul>
                </div>
                <p>Best regards,<br/>The Gentry & Co. Team</p>
              </div>
            </div>

            <button 
              onClick={handleClose}
              className="w-full bg-brand-dark border border-brand-gold/30 text-brand-gold font-bold uppercase tracking-widest py-3 hover:bg-brand-gold hover:text-brand-dark transition-colors rounded-sm"
            >
              {content.buttons.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;