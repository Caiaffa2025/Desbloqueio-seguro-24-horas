/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ServiceType } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import QuickBooking from './components/QuickBooking';
import PricingCalculator from './components/PricingCalculator';
import FAQManual from './components/FAQManual';
import Footer from './components/Footer';
import { KeyRound, ShieldCheck, MapPin, Phone, HelpCircle } from 'lucide-react';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType>('residential');

  // Unified scroll managers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Pre-select service and scroll straight to booking
  const handlePreSelectService = (serviceType: ServiceType) => {
    setSelectedService(serviceType);
    setTimeout(() => {
      scrollToSection('booking-section');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans overflow-x-hidden selection:bg-amber-400 selection:text-neutral-950">
      
      {/* Navigation Header */}
      <Navbar 
        onOrderEmergency={() => scrollToSection('booking-section')}
        onViewServices={() => scrollToSection('servicos-section')}
        onViewPricing={() => scrollToSection('pricing-section')}
        onViewFAQ={() => scrollToSection('faq-section')}
      />

      {/* Main Core Landing Presentation */}
      <main className="relative pointer-events-auto">
        <Hero 
          onStartBooking={() => scrollToSection('booking-section')}
          onViewServices={() => scrollToSection('servicos-section')}
        />

        {/* Dynamic Interactive Booking / Live Tracker module */}
        <QuickBooking 
          selectedServiceType={selectedService}
          onChangeService={(type) => setSelectedService(type)}
        />

        {/* Bento features grid of categories */}
        <ServicesGrid 
          onSelectService={handlePreSelectService}
        />

        {/* Dynamic Calculator & Checkout Invoice simulator */}
        <PricingCalculator 
          onQuoteApproved={handlePreSelectService}
        />

        {/* Accordion FAQ & emergency safety logs */}
        <FAQManual />
      </main>

      {/* High-End Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button (Brazilian Landing Page Best Practice) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
        {/* Hover Label */}
        <div className="bg-neutral-900 text-white text-xs font-bold font-sans px-3.5 py-1.5 rounded-xl border border-neutral-800 shadow-xl opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
          💬 Falar com Chaveiro 24h
        </div>
        
        {/* Iconic Green Pulsing Link */}
        <a
          href="https://wa.me/5511984937529"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-450 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-emerald-500/20"
          title="Falar no WhatsApp"
        >
          {/* Pulsing ring behind button */}
          <span className="absolute -inset-1.5 rounded-full bg-emerald-500/30 animate-[ping_2.5s_infinite]" />
          <Phone className="w-6 h-6 text-white relative z-10 fill-white" />
        </a>
      </div>

    </div>
  );
}
