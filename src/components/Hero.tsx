/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, MapPin, ShieldCheck, Clock, Key, Compass, ChevronRight, User } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onStartBooking: () => void;
  onViewServices: () => void;
}

export default function Hero({ onStartBooking, onViewServices }: HeroProps) {
  return (
    <header className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-neutral-950 text-white overflow-hidden">
      {/* Absolute ambient lights background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-neutral-800/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text branding content */}
          <div className="lg:col-span-7 select-none">
            {/* Live active operational badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 uppercase mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Plantão Ativo: 8 Chaveiros na sua região</span>
            </div>

            {/* Main Catchy Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-sans font-black tracking-tight leading-none mb-6">
              Abertura de Portas e Cofres <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Sem Qualquer Dano
              </span>
            </h1>

            <p className="text-neutral-400 font-sans text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Portal homologado de chaveiros premium para aberturas emergenciais de <strong className="text-white font-bold">residências, veículos, empresas e cofres</strong>. Atendimento técnico especializado 24 horas por dia com deslocamento ultra-rápido.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={onStartBooking}
                className="group relative px-8 py-4.5 rounded-xl font-sans font-extrabold text-neutral-950 bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-500/10 transition-all text-base text-center cursor-pointer active:scale-95 flex items-center justify-center gap-2.5"
              >
                <Compass className="w-5 h-5 text-neutral-950 animate-spin-[linear_infinite_10s]" />
                Acionar Geolocalização Rápida
                <ChevronRight className="w-5 h-5 text-neutral-950 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onViewServices}
                className="px-8 py-4.5 rounded-xl font-sans font-bold text-white bg-neutral-900 hover:bg-neutral-850 transition-colors border border-neutral-800 text-center cursor-pointer text-base"
              >
                Ver Serviços Exclusivos
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-900 text-neutral-400">
              <div>
                <span className="block text-2xl md:text-3xl font-black text-white font-sans">15 Min</span>
                <span className="block text-xs font-mono font-bold text-neutral-500 uppercase mt-1">Tempo Médio de Chegada</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-black text-white font-sans">100%</span>
                <span className="block text-xs font-mono font-bold text-neutral-500 uppercase mt-1">Técnicos Certificados</span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-black text-white font-sans">R$ 120</span>
                <span className="block text-xs font-mono font-bold text-neutral-500 uppercase mt-1">Preço Inicial Garantido</span>
              </div>
            </div>
          </div>

          {/* Right Column visual preview display card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[380px] lg:max-w-none">
              
              {/* Outer decorative ambient glows */}
              <div className="absolute inset-0 bg-amber-500/10 rounded-3xl blur-2xl transform rotate-6 scale-95 pointer-events-none" />

              {/* Central Premium Mock Up Display */}
              <div className="relative bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-tr-3xl" />
                
                {/* Visual Lock Picker Title header */}
                <div className="flex items-center justify-between mb-6 border-b border-neutral-850 pb-4">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-amber-400 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-neutral-400">CENTRAL OPERACIONAL</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded text-[10px] font-mono font-bold text-amber-400 animate-pulse">
                    <span>24 HORAS ATIVO</span>
                  </div>
                </div>

                {/* Simulated lock options lists in premium style */}
                <span className="block text-xs font-mono text-neutral-500 mb-4 uppercase tracking-wider font-bold">Aberturas em menos de 20 min</span>
                
                <div className="space-y-3.5 mb-8">
                  {[
                    { label: 'Abertura Residencial Técnica', desc: 'Fechaduras simples, triplas, tetra ou multiponto sem danos.', type: 'Residência' },
                    { label: 'Veículos Nacionais & Importados', desc: 'Abertura limpa pelo trinco, codificação de chaves pantográficas.', type: 'Automático' },
                    { label: 'Empresas & Controle de Acesso', desc: 'Fechaduras biométricas, eletromagnéticas e blindex.', type: 'Corporativo' },
                    { label: 'Cofres Digitais & Mecânicos', desc: 'Abertura técnica com discagem precisa e leitura lógica.', type: 'Cofres' }
                  ].map((srv, index) => (
                    <div 
                      key={index}
                      onClick={onStartBooking} 
                      className="group/item flex items-start gap-3 p-3 bg-neutral-950/50 border border-neutral-850 rounded-xl hover:border-amber-400/30 hover:bg-neutral-950 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-7 h-7 bg-neutral-900 group-hover/item:bg-amber-400 text-neutral-400 group-hover/item:text-neutral-950 rounded-lg shrink-0 transition-colors">
                        <span className="text-xs font-mono font-black">{index + 1}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-white group-hover/item:text-amber-400 transition-colors">{srv.label}</h4>
                          <span className="text-[9px] font-mono text-neutral-500 uppercase bg-neutral-900 border border-neutral-850 px-1.5 py-0.5 rounded shrink-0">{srv.type}</span>
                        </div>
                        <p className="text-neutral-400 text-xs mt-0.5 font-light font-sans truncate">{srv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rapid Dial Quick Call Link */}
                <div className="bg-neutral-950 border border-neutral-850 p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors duration-300 animate-pulse">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-neutral-500 uppercase">Falar pelo WhatsApp</span>
                      <a href="https://wa.me/5511984937529" target="_blank" rel="noopener noreferrer" className="block text-base font-bold text-white hover:text-amber-400 transition-colors">
                        (11) 98493-7529
                      </a>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/5511984937529"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-neutral-900 border border-neutral-800 text-amber-400 hover:bg-amber-400 hover:text-neutral-950 rounded-xl transition-all font-sans text-xs font-bold uppercase tracking-wider"
                  >
                    Chamar no WhatsApp
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
