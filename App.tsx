import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import AIStyleConsultant from './components/AIStyleConsultant';
import VirtualHairStyler from './components/VirtualHairStyler';
import Team from './components/Team';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ChatWidget from './components/ChatWidget';
import { LanguageProvider } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="bg-brand-dark min-h-screen text-white selection:bg-brand-gold selection:text-brand-dark">
      <Navbar onBookClick={openBooking} />
      <main>
        <Hero onBookClick={openBooking} />
        <Services />
        <AIStyleConsultant />
        <VirtualHairStyler />
        <Team />
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      <ChatWidget />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;