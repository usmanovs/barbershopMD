import React, { useState } from 'react';
import { getStyleRecommendations } from '../services/geminiService';
import { FaceShape, HairType, StyleRecommendation } from '../types';
import { Sparkles, Loader2, User, Scissors } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AIStyleConsultant: React.FC = () => {
  const [faceShape, setFaceShape] = useState<FaceShape>(FaceShape.OVAL);
  const [hairType, setHairType] = useState<HairType>(HairType.STRAIGHT);
  const [preferences, setPreferences] = useState<string>('');
  const [recommendations, setRecommendations] = useState<StyleRecommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const handleConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const results = await getStyleRecommendations(faceShape, hairType, preferences, language);
      setRecommendations(results);
    } catch (err) {
      setError("Sorry, our AI stylist is currently busy trimming logic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const content = {
    en: {
      subtitle: 'Gemini AI Integration',
      titlePart1: 'Find Your Perfect',
      titlePart2: 'Signature Look',
      description: 'Not sure what cut suits you best? Our AI-powered Style Consultant analyzes your face shape and hair texture to recommend the perfect style before you even sit in the chair.',
      labels: {
        faceShape: 'Face Shape',
        hairType: 'Hair Type',
        preferences: 'Style Preferences / Lifestyle',
        button: 'Generate Recommendations',
        loading: 'Analyzing...'
      },
      placeholders: {
        prefs: 'e.g., Low maintenance, corporate professional, trendy...'
      },
      results: {
        empty: 'Fill out the form to get tailored grooming advice powered by Google Gemini.',
        header: 'Recommended Styles',
        option: 'Option',
        why: 'Why it works:',
        tip: 'Styling Tip:'
      }
    },
    es: {
      subtitle: 'Integración con Gemini IA',
      titlePart1: 'Encuentra Tu',
      titlePart2: 'Look Insignia',
      description: '¿No estás seguro de qué corte te queda mejor? Nuestro consultor de estilo con IA analiza la forma de tu rostro y textura de cabello para recomendar el estilo perfecto.',
      labels: {
        faceShape: 'Forma de Rostro',
        hairType: 'Tipo de Cabello',
        preferences: 'Preferencias / Estilo de Vida',
        button: 'Generar Recomendaciones',
        loading: 'Analizando...'
      },
      placeholders: {
        prefs: 'ej., Bajo mantenimiento, profesional corporativo, moda...'
      },
      results: {
        empty: 'Complete el formulario para recibir consejos de aseo personalizados con Google Gemini.',
        header: 'Estilos Recomendados',
        option: 'Opción',
        why: 'Por qué funciona:',
        tip: 'Consejo de estilo:'
      }
    },
    ru: {
      subtitle: 'Интеграция с Gemini AI',
      titlePart1: 'Найдите Свой',
      titlePart2: 'Фирменный Стиль',
      description: 'Не уверены, какая стрижка вам подходит? Наш ИИ-консультант анализирует форму вашего лица и структуру волос, чтобы порекомендовать идеальный стиль.',
      labels: {
        faceShape: 'Форма Лица',
        hairType: 'Тип Волос',
        preferences: 'Предпочтения / Образ Жизни',
        button: 'Получить Рекомендации',
        loading: 'Анализ...'
      },
      placeholders: {
        prefs: 'например, не требует ухода, деловой стиль, модно...'
      },
      results: {
        empty: 'Заполните форму, чтобы получить советы по уходу от Google Gemini.',
        header: 'Рекомендуемые Стили',
        option: 'Вариант',
        why: 'Почему это подходит:',
        tip: 'Совет по укладке:'
      }
    }
  }[language];

  return (
    <section id="ai-stylist" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-gold/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Description */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-brand-gold">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-[0.2em]">{content.subtitle}</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              {content.titlePart1} <br />
              <span className="text-brand-gold italic">{content.titlePart2}</span>
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {content.description}
            </p>
            
            <div className="bg-brand-gray/50 border border-white/10 p-6 rounded-lg">
              <form onSubmit={handleConsultation} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">{content.labels.faceShape}</label>
                    <div className="relative">
                      <select 
                        value={faceShape}
                        onChange={(e) => setFaceShape(e.target.value as FaceShape)}
                        className="w-full bg-brand-dark border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-brand-gold focus:outline-none appearance-none"
                      >
                        {Object.values(FaceShape).map(shape => (
                          <option key={shape} value={shape}>{shape}</option>
                        ))}
                      </select>
                      <User className="absolute right-3 top-3.5 text-gray-500 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">{content.labels.hairType}</label>
                    <div className="relative">
                      <select 
                        value={hairType}
                        onChange={(e) => setHairType(e.target.value as HairType)}
                        className="w-full bg-brand-dark border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-brand-gold focus:outline-none appearance-none"
                      >
                        {Object.values(HairType).map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <Scissors className="absolute right-3 top-3.5 text-gray-500 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">{content.labels.preferences}</label>
                  <input 
                    type="text"
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    placeholder={content.placeholders.prefs}
                    className="w-full bg-brand-dark border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-brand-gold focus:outline-none placeholder-gray-600"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-white text-brand-dark font-bold uppercase tracking-widest py-4 hover:bg-brand-gold transition-colors duration-300 flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" /> {content.labels.loading}
                    </>
                  ) : (
                    content.labels.button
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Results */}
          <div className="min-h-[400px]">
             {error && (
               <div className="p-4 bg-red-900/20 border border-red-900 text-red-200 rounded text-sm">
                 {error}
               </div>
             )}
             
             {!loading && recommendations.length === 0 && !error && (
               <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-800 rounded-lg">
                 <Sparkles className="w-12 h-12 text-brand-gold/20 mb-4" />
                 <p className="text-gray-500">{content.results.empty}</p>
               </div>
             )}

             {recommendations.length > 0 && (
               <div className="space-y-4 animate-fade-in">
                 <h4 className="text-white font-serif text-2xl mb-6 border-b border-gray-800 pb-2">{content.results.header}</h4>
                 {recommendations.map((rec, idx) => (
                   <div key={idx} className="bg-brand-gray p-6 border-l-2 border-brand-gold shadow-lg">
                     <div className="flex justify-between items-start mb-2">
                       <h5 className="text-xl text-brand-gold font-bold font-serif">{rec.name}</h5>
                       <span className="text-xs bg-brand-dark px-2 py-1 rounded text-gray-400 border border-gray-700">{content.results.option} {idx + 1}</span>
                     </div>
                     <p className="text-gray-300 text-sm mb-3">{rec.description}</p>
                     <div className="space-y-2">
                        <div className="text-xs text-gray-500">
                          <span className="uppercase tracking-wider font-bold text-gray-400">{content.results.why}</span> {rec.suitability}
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="uppercase tracking-wider font-bold text-gray-400">{content.results.tip}</span> {rec.stylingTips}
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIStyleConsultant;