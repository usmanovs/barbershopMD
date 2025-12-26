import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Wand2, Download, RefreshCcw, Camera, Loader2, Film, Play } from 'lucide-react';
import { generateEditedImage, generateVideoFromImage } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

const VirtualHairStyler: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();

  const content = {
    en: {
      subtitle: 'Beta Feature',
      title: 'Virtual Hair Styler',
      desc: 'Upload a photo to preview different haircuts or effects instantly using our AI visualization tool.',
      uploadBtn: 'Upload Photo',
      generateBtn: 'Generate Look',
      animateBtn: 'Animate with Veo',
      customPlaceholder: 'Describe desired look (e.g., "Give me a buzz cut" or "Add a retro filter")...',
      presetsTitle: 'Quick Styles:',
      presets: ['Buzz Cut', 'Pompadour', 'Undercut', 'Mullet', 'Slicked Back', 'Bald'],
      loading: 'Sculpting your new look...',
      videoLoading: 'Generating cinematic video (this may take a moment)...',
      error: 'Failed to generate image. Please try again.',
      videoError: 'Failed to generate video.',
      noImage: 'Upload a clear selfie for best results.',
      download: 'Download',
      reset: 'Reset'
    },
    es: {
      subtitle: 'Función Beta',
      title: 'Estilista Virtual',
      desc: 'Sube una foto para previsualizar diferentes cortes o efectos al instante usando nuestra herramienta de IA.',
      uploadBtn: 'Subir Foto',
      generateBtn: 'Generar Look',
      animateBtn: 'Animar con Veo',
      customPlaceholder: 'Describe el look (ej., "Dame un corte militar" o "Añade un filtro retro")...',
      presetsTitle: 'Estilos Rápidos:',
      presets: ['Corte Militar', 'Pompadour', 'Undercut', 'Mullet', 'Hacia Atrás', 'Calvo'],
      loading: 'Esculpiendo tu nuevo look...',
      videoLoading: 'Generando video cinematográfico...',
      error: 'Fallo al generar la imagen. Intente de nuevo.',
      videoError: 'Fallo al generar video.',
      noImage: 'Sube una selfie clara para mejores resultados.',
      download: 'Descargar',
      reset: 'Reiniciar'
    },
    ru: {
      subtitle: 'Бета-версия',
      title: 'Виртуальный Стилист',
      desc: 'Загрузите фото, чтобы мгновенно примерить стрижки или эффекты с помощью нашего ИИ.',
      uploadBtn: 'Загрузить Фото',
      generateBtn: 'Создать Образ',
      animateBtn: 'Анимировать (Veo)',
      customPlaceholder: 'Опишите желаемый вид (напр., "Сделай стрижку бокс" или "Добавь ретро фильтр")...',
      presetsTitle: 'Быстрые Стили:',
      presets: ['Бокс', 'Помпадур', 'Андеркат', 'Маллет', 'Зачес Назад', 'Налысо'],
      loading: 'Создаем ваш новый образ...',
      videoLoading: 'Создаем видео (это может занять время)...',
      error: 'Не удалось создать изображение. Попробуйте снова.',
      videoError: 'Не удалось создать видео.',
      noImage: 'Загрузите четкое селфи для лучших результатов.',
      download: 'Скачать',
      reset: 'Сброс'
    }
  }[language];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
        setGeneratedVideo(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetClick = (style: string) => {
    setPrompt(`Change the hair style of the person in the image to a ${style}. Maintain realistic lighting and facial features.`);
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setLoading(true);
    setGeneratedVideo(null);
    setError(null);

    try {
      const mimeType = selectedImage.substring(selectedImage.indexOf(':') + 1, selectedImage.indexOf(';'));
      const result = await generateEditedImage(selectedImage, mimeType, prompt);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError(content.error);
      }
    } catch (err) {
      setError(content.error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnimate = async () => {
    if (!generatedImage) return;
    
    setVideoLoading(true);
    setError(null);

    try {
      const videoUrl = await generateVideoFromImage(generatedImage, prompt);
      if (videoUrl) {
        setGeneratedVideo(videoUrl);
      } else {
        setError(content.videoError);
      }
    } catch (err: any) {
      // If the error provides a specific message (like checking project access), show it.
      if (err.message) {
        setError(err.message);
      } else {
        setError(content.videoError);
      }
    } finally {
      setVideoLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setGeneratedImage(null);
    setGeneratedVideo(null);
    setPrompt('');
    setError(null);
  };

  return (
    <section id="virtual-styler" className="py-24 bg-brand-gray relative border-t border-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
           <div className="flex items-center justify-center gap-2 mb-2 text-brand-gold">
              <Camera className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{content.subtitle}</span>
           </div>
          <h3 className="text-4xl font-serif font-bold text-white mb-4">{content.title}</h3>
          <p className="text-gray-400 max-w-xl mx-auto">{content.desc}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 bg-brand-dark p-6 md:p-8 rounded-lg border border-white/5 shadow-2xl">
          
          {/* Left Column: Controls & Upload */}
          <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
            
            {!selectedImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 min-h-[300px] border-2 border-dashed border-gray-700 hover:border-brand-gold/50 rounded-lg flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors bg-gray-900/50 group"
              >
                <div className="p-4 bg-brand-dark rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-brand-gold" />
                </div>
                <p className="text-gray-400 font-medium">{content.uploadBtn}</p>
                <p className="text-xs text-gray-600">{content.noImage}</p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            ) : (
               <div className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3">{content.presetsTitle}</label>
                    <div className="flex flex-wrap gap-2">
                      {content.presets.map((style) => (
                        <button
                          key={style}
                          onClick={() => handlePresetClick(style)}
                          className="px-3 py-2 bg-brand-gray border border-gray-700 rounded text-xs text-gray-300 hover:border-brand-gold hover:text-brand-gold transition-all"
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Custom Prompt</label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={content.customPlaceholder}
                      className="w-full bg-brand-gray border border-gray-700 text-white p-3 rounded-sm focus:border-brand-gold focus:outline-none text-sm min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={handleGenerate}
                      disabled={loading || videoLoading || !prompt}
                      className="flex-1 bg-brand-gold text-brand-dark font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                      {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
                      {loading ? 'Processing' : content.generateBtn}
                    </button>
                    <button 
                      onClick={handleReset}
                      className="px-4 py-3 bg-gray-800 text-gray-400 rounded-sm hover:bg-gray-700"
                      title={content.reset}
                    >
                      <RefreshCcw className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Veo Animation Button */}
                  {generatedImage && !loading && (
                    <div className="border-t border-gray-800 pt-6">
                      <p className="text-xs text-gray-500 mb-3 text-center">Want to see it in motion?</p>
                      <button 
                        onClick={handleAnimate}
                        disabled={videoLoading}
                        className="w-full bg-gray-800 border border-gray-700 text-white hover:border-brand-gold hover:text-brand-gold font-medium uppercase tracking-wider text-xs py-3 transition-all rounded-sm disabled:opacity-50 flex justify-center items-center gap-2 group"
                      >
                        {videoLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Film className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                        {videoLoading ? 'Generating Video...' : content.animateBtn}
                      </button>
                    </div>
                  )}

                  {error && <p className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded border border-red-900/50 animate-fade-in">{error}</p>}
               </div>
            )}
          </div>

          {/* Right Column: Preview Area */}
          <div className="lg:col-span-8 bg-black/40 rounded-lg p-4 min-h-[400px] flex items-center justify-center relative order-1 lg:order-2">
            {!selectedImage ? (
              <div className="text-center text-gray-600">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Image preview will appear here</p>
              </div>
            ) : (
              <div className={`grid gap-4 w-full h-full transition-all duration-500 ${(videoLoading || generatedVideo) ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {/* Original / Generated Image Column */}
                <div className="flex flex-col gap-4 h-full">
                  <div className="relative rounded-lg overflow-hidden border border-gray-800 group h-1/2 min-h-[200px]">
                     <span className="absolute top-2 left-2 bg-black/60 px-2 py-1 text-[10px] text-white rounded backdrop-blur-md z-10">ORIGINAL</span>
                     <img src={selectedImage} alt="Original" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="relative rounded-lg overflow-hidden border border-brand-gold/30 group bg-brand-dark/50 flex items-center justify-center h-1/2 min-h-[200px]">
                     <span className="absolute top-2 left-2 bg-brand-gold/90 px-2 py-1 text-[10px] text-brand-dark font-bold rounded backdrop-blur-md z-10">GENERATED</span>
                     
                     {loading ? (
                        <div className="flex flex-col items-center text-brand-gold animate-pulse">
                          <Loader2 className="w-10 h-10 animate-spin mb-2" />
                          <span className="text-xs uppercase tracking-widest">{content.loading}</span>
                        </div>
                     ) : generatedImage ? (
                        <>
                          <img src={generatedImage} alt="Generated" className="w-full h-full object-cover animate-fade-in" />
                          <a 
                            href={generatedImage} 
                            download="gentry-style.png"
                            className="absolute bottom-4 right-4 bg-white text-brand-dark p-2 rounded-full shadow-lg hover:bg-brand-gold transition-colors opacity-0 group-hover:opacity-100 z-20"
                          >
                            <Download className="w-5 h-5" />
                          </a>
                        </>
                     ) : (
                        <div className="text-center p-4">
                          <p className="text-gray-500 text-sm">Waiting for generation...</p>
                        </div>
                     )}
                  </div>
                </div>

                {/* Video Result Column (Only shows if video requested) */}
                {(videoLoading || generatedVideo) && (
                  <div className="relative rounded-lg overflow-hidden border border-purple-500/30 group bg-brand-dark/50 flex items-center justify-center h-full min-h-[400px] animate-fade-in">
                     <span className="absolute top-2 left-2 bg-purple-500/90 px-2 py-1 text-[10px] text-white font-bold rounded backdrop-blur-md z-10 flex items-center gap-1">
                       <Film size={10} /> VEO AI VIDEO
                     </span>

                     {videoLoading ? (
                        <div className="flex flex-col items-center text-purple-400 animate-pulse p-6 text-center">
                          <Loader2 className="w-10 h-10 animate-spin mb-2" />
                          <span className="text-xs uppercase tracking-widest mb-2">{content.videoLoading}</span>
                          <span className="text-[10px] text-gray-500">This takes longer than images.</span>
                        </div>
                     ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black">
                          <video 
                            src={generatedVideo!} 
                            controls 
                            autoPlay 
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        </div>
                     )}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default VirtualHairStyler;