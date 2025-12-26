import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Minus, Loader2, User, Scissors, MapPin } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { Chat, GenerateContentResponse } from "@google/genai";
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  role: 'user' | 'model';
  text: string;
  groundingMetadata?: any;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const { language } = useLanguage();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      initial: "Good day. I am the Gentry & Co. concierge. How may I assist you with your grooming needs today?",
      placeholder: "Ask about services, hours, location...",
      title: "Gentry Concierge",
      online: "Online",
      offline: "I apologize, but I am currently operating in offline mode.",
      error: "I apologize, but I seem to be having trouble connecting at the moment. Please try again shortly.",
      sources: "Sources"
    },
    es: {
      initial: "Buen día. Soy el conserje de Gentry & Co. ¿Cómo puedo ayudarle con sus necesidades de aseo hoy?",
      placeholder: "Pregunte sobre servicios, horarios...",
      title: "Conserje Gentry",
      online: "En línea",
      offline: "Me disculpo, pero actualmente estoy operando en modo fuera de línea.",
      error: "Me disculpo, parece que tengo problemas para conectarme en este momento.",
      sources: "Fuentes"
    },
    ru: {
      initial: "Добрый день. Я консьерж Gentry & Co. Чем могу помочь вам с вашими потребностями в уходе сегодня?",
      placeholder: "Спросите об услугах, часах работы...",
      title: "Консьерж Gentry",
      online: "Онлайн",
      offline: "Прошу прощения, но в данный момент я работаю в автономном режиме.",
      error: "Прошу прощения, но, похоже, у меня проблемы с подключением в данный момент.",
      sources: "Источники"
    }
  }[language];

  // Initialize or Reset Chat when language changes
  useEffect(() => {
    chatSessionRef.current = createChatSession(language);
    setMessages([
      { role: 'model', text: content.initial }
    ]);
  }, [language]);

  useEffect(() => {
    // Auto-scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      if (chatSessionRef.current) {
        // Real API Call with Streaming
        const result = await chatSessionRef.current.sendMessageStream({ message: userMessage });
        
        let fullResponse = '';
        let groundingMetadata = null;

        setMessages(prev => [...prev, { role: 'model', text: '' }]); // Add placeholder

        for await (const chunk of result) {
          const c = chunk as GenerateContentResponse;
          
          // Collect text
          if (c.text) {
            fullResponse += c.text;
          }
          
          // Collect grounding metadata (usually in one of the chunks)
          if (c.candidates?.[0]?.groundingMetadata) {
            groundingMetadata = c.candidates[0].groundingMetadata;
          }

          // Update message state
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            lastMsg.text = fullResponse;
            if (groundingMetadata) {
              lastMsg.groundingMetadata = groundingMetadata;
            }
            return newMessages;
          });
        }
      } else {
        // Mock Response if API Key is missing
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: content.offline 
        }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: content.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-40 bg-brand-gold text-brand-dark p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-white hover:scale-110 transition-all duration-300 group"
        aria-label="Open Chat Concierge"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 bg-red-500 w-4 h-4 rounded-full animate-pulse"></span>
      </button>
    );
  }

  return (
    <div 
      className={`fixed right-4 md:right-8 z-50 transition-all duration-300 shadow-2xl rounded-t-lg md:rounded-lg overflow-hidden border border-brand-gold/20 bg-brand-dark flex flex-col
        ${isMinimized ? 'bottom-0 h-14 w-72' : 'bottom-0 md:bottom-8 w-full md:w-96 h-[80vh] md:h-[600px]'}
      `}
    >
      {/* Header */}
      <div 
        className="bg-brand-gray p-4 flex justify-between items-center border-b border-gray-800 cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-3">
          <div className="bg-brand-gold/20 p-1.5 rounded-full">
            <Scissors className="w-4 h-4 text-brand-gold" />
          </div>
          <div>
            <h3 className="text-white font-serif font-bold text-sm">{content.title}</h3>
            {!isMinimized && <span className="flex items-center gap-1 text-[10px] text-green-400"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> {content.online}</span>}
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
            className="hover:text-white p-1"
          >
            <Minus size={18} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="hover:text-white p-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-brand-dark/95 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-gold text-brand-dark rounded-2xl rounded-tr-none' 
                      : 'bg-gray-800 text-gray-200 rounded-2xl rounded-tl-none border border-gray-700'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Maps Grounding Sources */}
                {msg.groundingMetadata?.groundingChunks && (
                  <div className="mt-2 max-w-[85%] bg-gray-900/80 rounded p-2 border border-gray-800">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-1">
                      <MapPin size={10} /> {content.sources}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {msg.groundingMetadata.groundingChunks.map((chunk: any, i: number) => {
                        if (chunk.web?.uri) {
                           return (
                             <a 
                               key={i} 
                               href={chunk.web.uri} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-[10px] text-brand-gold hover:underline truncate max-w-[150px]"
                             >
                               {chunk.web.title || 'Source'}
                             </a>
                           );
                        }
                        if (chunk.maps?.placeId || chunk.maps?.uri) {
                           // Construct a generic maps link if uri is missing but we have other data, or just use title
                           // Usually maps chunk has uri
                           return (
                             <div key={i} className="text-[10px] text-brand-gold flex flex-col gap-0.5">
                               {chunk.maps.title && <span className="font-medium">{chunk.maps.title}</span>}
                               {chunk.maps.uri && (
                                  <a href={chunk.maps.uri} target="_blank" rel="noreferrer" className="hover:underline opacity-80">
                                    View on Maps
                                  </a>
                               )}
                             </div>
                           );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 p-4 rounded-2xl rounded-tl-none border border-gray-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-brand-gray border-t border-gray-800">
            <form onSubmit={handleSendMessage} className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={content.placeholder}
                className="flex-1 bg-brand-dark text-white text-sm px-4 py-3 rounded-full border border-gray-700 focus:border-brand-gold focus:outline-none placeholder-gray-600 pr-10"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1.5 p-1.5 bg-brand-gold text-brand-dark rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWidget;