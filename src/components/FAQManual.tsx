/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { faqList, emergencyTips } from '../data';
import { 
  ChevronDown, ChevronUp, HelpCircle, ShieldCheck, 
  MapPin, AlertTriangle, Key, Clock, Landmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQManual() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 bg-neutral-900 border-t border-neutral-800 text-white relative">
      <div className="absolute top-0 right-10 w-44 h-44 bg-amber-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Central de Dúvidas
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-white mb-3">
            Perguntas <span className="text-amber-400">Frequentes</span>
          </h2>
          <p className="text-neutral-400 font-sans text-base max-w-xl mx-auto">
            Resolva suas principais dúvidas sobre o plantão 24h, prazos de chagada, metodologias de abertura e conformidades legais.
          </p>
        </div>

        {/* Workspace split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* FAQ Accordion Side */}
          <div className="lg:col-span-7 space-y-4">
            <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest font-black mb-1">Tópicos Operacionais</span>
            
            {faqList.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-neutral-950 border border-neutral-850 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                  >
                    <span className="font-sans font-bold text-sm md:text-base text-neutral-200 group-hover:text-amber-400 transition-colors">
                      {faq.question}
                    </span>
                    <span className="text-neutral-500 shrink-0 ml-4 group-hover:text-amber-400 transition-colors">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm md:text-base text-neutral-400 font-sans border-t border-neutral-900 leading-relaxed font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Emergency Manual Sidebox Checklist */}
          <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 p-6 md:p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-tr-3xl" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-red-500/10 text-red-500 rounded-xl">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-black font-sans text-white">Manual do Trancado</h3>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">O que fazer agora?</span>
              </div>
            </div>

            {/* Step checklist details */}
            <div className="space-y-6">
              {emergencyTips.map((tip, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-neutral-200">{tip.title}</h4>
                    <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed mt-1">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Document safety details segment */}
            <div className="mt-8 pt-6 border-t border-neutral-900 space-y-4">
              <div className="flex items-start gap-3 text-xs font-sans text-amber-500/90 bg-amber-500/5 p-4 rounded-xl border border-amber-500/10">
                <ShieldCheck className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                <div>
                  <h5 className="font-bold">Validação de Segurança Exigida</h5>
                  <p className="mt-1 leading-relaxed font-light text-neutral-400 text-[11px]">
                    Para sua segurança e conformidade criminal, nosso chaveiro necessita comprovar que você tem permissão legal de estar no local. Tenha em mãos RG/CNH ou contracheque/comprovante de endereço. Em carros, o documento CRLV correspondente.
                  </p>
                </div>
              </div>

              {/* Police regulation marker */}
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                <span className="flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5" />
                  Regulado pelo Sincach-SP
                </span>
                <span>Certificado Nº 4920/12</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
