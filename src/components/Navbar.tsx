/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { KeyRound, Phone, ShieldCheck, Clock, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOrderEmergency: () => void;
  onViewServices: () => void;
  onViewPricing: () => void;
  onViewFAQ: () => void;
}

export default function Navbar({ onOrderEmergency, onViewServices, onViewPricing, onViewFAQ }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 pointer-events-auto flex flex-col">
      {/* 24H Emergency Hot Alert Bar */}
      <div className="w-full bg-red-600 text-white py-2 px-4 text-center font-sans text-[10px] sm:text-xs font-black tracking-widest uppercase flex items-center justify-center gap-3 animate-[pulse_3s_infinite] relative z-50 border-b border-red-700/50">
        <span className="flex h-2 w-2 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span className="hidden sm:inline">PLANTÃO DE EMERGÊNCIA ATIVO NO MOMENTO — WHATSAPP: (11) 98493-7529 — ATENDIMENTO RÁPIDO EM SÃO PAULO</span>
        <span className="inline sm:hidden">CONTATO WHATSAPP: (11) 98493-7529 — PLANTÃO DE EMERGÊNCIA 24H</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-900 shadow-lg shadow-amber-500/20">
              <KeyRound className="w-6 h-6 animate-[pulse_3s_infinite]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-neutral-900" />
            </div>
            <div>
              <span className="block font-sans font-black tracking-wider text-xl text-white">
                CHAVEIRO<span className="text-amber-400">24H</span>
              </span>
              <span className="block font-mono text-[10px] text-neutral-400 tracking-widest uppercase">
                Serviços Exclusivos
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={onViewServices}
              className="font-sans font-medium text-sm text-neutral-300 hover:text-amber-400 transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={onViewPricing}
              className="font-sans font-medium text-sm text-neutral-300 hover:text-amber-400 transition-colors"
            >
              Simulador de Preço
            </button>
            <button
              onClick={onViewFAQ}
              className="font-sans font-medium text-sm text-neutral-300 hover:text-amber-400 transition-colors"
            >
              Dúvidas Frequentes
            </button>

            {/* Info Badges */}
            <div className="flex items-center gap-4 border-l border-neutral-800 pl-8">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <Clock className="w-3.5 h-3.5 text-emerald-400 animate-[spin_12s_linear_infinite]" />
                <span>ONLINE 24H</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-mono">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Atendimento Seguro</span>
              </div>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/5511984937529"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>(11) 98493-7529</span>
            </a>
            <button
              onClick={onOrderEmergency}
              className="relative px-6 py-3 rounded-xl font-sans font-bold text-sm text-neutral-900 bg-amber-400 hover:bg-amber-300 active:scale-95 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-900 animate-bounce" />
                Chamar Emergência 24h
              </span>
              <span className="absolute inset-0 block bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOrderEmergency}
              className="p-2.5 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-all animate-[pulse_2s_infinite]"
              title="Emergência 24h"
            >
              <Phone className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-850 rounded-lg transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-neutral-950/95 border-b border-neutral-850 block px-4 pt-4 pb-6 space-y-4">
          <button
            onClick={() => {
              onViewServices();
              setIsOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-neutral-300 hover:bg-neutral-900 hover:text-amber-400 transition-colors"
          >
            Nossos Serviços
          </button>
          <button
            onClick={() => {
              onViewPricing();
              setIsOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-neutral-300 hover:bg-neutral-900 hover:text-amber-400 transition-colors"
          >
            Simulador de Orçamento
          </button>
          <button
            onClick={() => {
              onViewFAQ();
              setIsOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-neutral-300 hover:bg-neutral-900 hover:text-amber-400 transition-colors"
          >
            Dúvidas Frequentes
          </button>

          <div className="border-t border-neutral-850 pt-4 space-y-3">
            <div className="flex items-center justify-between text-xs px-3">
              <span className="text-neutral-400 font-mono">SUPORTE WHATSAPP:</span>
              <a href="https://wa.me/5511984937529" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-bold hover:underline">
                (11) 98493-7529
              </a>
            </div>

            <button
              onClick={() => {
                onOrderEmergency();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold bg-amber-400 text-neutral-950 font-sans shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition-all text-sm"
            >
              <Phone className="w-4 h-4 cursor-pointer" />
              Solicitação Emergencial 24h
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
