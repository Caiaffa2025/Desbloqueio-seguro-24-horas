/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { KeyRound, Phone, MapPin, ShieldCheck, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-white pt-16 pb-8 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Logo Brand statement column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollToTop}>
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-neutral-900 shadow-md shadow-amber-500/10">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-sans font-black tracking-wider text-lg text-white">
                  CHAVEIRO<span className="text-amber-400">24H</span>
                </span>
                <span className="block font-mono text-[9px] text-neutral-500 tracking-widest uppercase">
                  Serviços Exclusivos
                </span>
              </div>
            </div>
            
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Serviços de precisão e segurança máxima. Atendimento com técnicos especializados em aberturas de fechaduras de alta segurança, veículos nacionais e importados, fechaduras corporativas e cofres mecânicos ou digitais.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Plantão Homologado SCCA/SP</span>
            </div>
          </div>

          {/* Contact Column card representation */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">Fale Conosco</h4>
            
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <span className="block text-neutral-400 text-[10px] font-mono">PLANTÃO 24H (WHATSAPP)</span>
                  <a href="https://wa.me/5511984937529" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 font-bold transition-colors">
                    (11) 98493-7529
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="block text-neutral-400 text-[10px] font-mono">SUPORTE E COMERCIAL</span>
                  <a href="mailto:contato@chaveiro24hexclusive.com.br" className="text-white hover:text-amber-400 transition-colors">
                    contato@chaveiro24h.com.br
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="block text-neutral-400 text-[10px] font-mono">SEDE OPERACIONAL (ENTREVISTAS E DOCUMENTOS)</span>
                  <span className="text-white">
                    Av. Paulista, 1000 - Bela Vista, São Paulo - SP
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Fast Navigation Shortcut Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">Atendimento Rápido</h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Calculamos preços transparentes em nosso simulador virtual. Faça uma simulação rápida de quanto fica a sua abertura e peça online com desconto de 10% exclusivo do portal.
            </p>
            
            <div className="pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('booking-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-amber-400/30 text-amber-400 hover:text-white rounded-lg font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                📊 Simular Orçamento Agora
              </button>
            </div>
          </div>

        </div>



        {/* Operational Safety Certifications Seals */}
        <div className="border-t border-neutral-900 pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <span>Selo de Qualidade DETRAN</span>
            <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
            <span>Chaveiro Credenciado Pol. Civil nº 294</span>
            <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
            <span>Garantia de 90 dias com NFE</span>
          </div>
          
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1 hover:text-white font-mono text-[10px] uppercase font-bold tracking-wide transition-colors cursor-pointer"
          >
            Voltar ao topo
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Legal copyright details */}
        <div className="border-t border-neutral-900/40 pt-6 text-center text-[10px] font-mono text-neutral-600">
          <p>© {new Date().getFullYear()} Chaveiro 24h Emergência Ltda. CNPJ: 12.345.678/0001-90. Todos os direitos reservados.</p>
          <p className="mt-1">Desenvolvido com foco em segurança, criptografia lógica e acionamento célere de serviços residenciais, empresariais e cofres.</p>
        </div>

      </div>
    </footer>
  );
}
