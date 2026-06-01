/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { servicePackages } from '../data';
import { ServiceType } from '../types';
import { Info, Calculator, FileText, Check, ShieldAlert } from 'lucide-react';

interface PricingCalculatorProps {
  onQuoteApproved: (serviceType: ServiceType) => void;
}

export default function PricingCalculator({ onQuoteApproved }: PricingCalculatorProps) {
  const [selectedType, setSelectedType] = useState<ServiceType>('residential');
  const [distance, setDistance] = useState<number>(5); // in km
  const [isNightTime, setIsNightTime] = useState<boolean>(false);
  const [lockIssue, setLockIssue] = useState<string>('locked_out'); // locked_out, key_broken, cylinder_damaged, code_lost

  const activePackage = servicePackages.find(p => p.id === selectedType) || servicePackages[0];

  // Logic calculation
  const getBasePrice = () => activePackage.basePrice;
  
  const getDistanceCost = () => {
    // 0 to 5km is free, then 3 per km
    if (distance <= 5) return 0;
    return (distance - 5) * 3.5;
  };

  const getIssueMarkup = () => {
    switch (lockIssue) {
      case 'key_broken':
        return 40; // broken key extraction requires extra labor
      case 'cylinder_damaged':
        return 80; // damaged lock needs cylinder reconstruction/replacement
      case 'code_lost':
        return 120; // safe code lost or automotive transponder coding
      default:
        return 0; // standard lock-picking
    }
  };

  const getNightMarkup = () => (isNightTime ? 60 : 0);

  const calculateSubtotal = () => {
    return getBasePrice() + getDistanceCost() + getIssueMarkup() + getNightMarkup();
  };

  const calculateDiscount = () => {
    // Give a small 10% discount for online quotes
    return calculateSubtotal() * 0.10;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleApproveQuote = () => {
    onQuoteApproved(selectedType);
  };

  return (
    <section id="pricing-section" className="py-20 bg-neutral-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 uppercase mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Simulador Transparente
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-white mb-4">
            Tabela de Preços e <span className="text-amber-400">Orçamento Rápido</span>
          </h2>
          <p className="text-neutral-400 font-sans text-base md:text-lg">
            Sem taxas escondidas. Planeje seu orçamento em tempo real com base no tipo de fechadura, nível de complicação e distância de deslocamento do especialista.
          </p>
        </div>

        {/* Workspace interactive box split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Controls column */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Category Picker */}
              <div>
                <label className="block text-sm font-sans font-bold text-neutral-300 mb-3">1. Selecione a Categoria de Abertura</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {servicePackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedType(pkg.id)}
                      className={`p-3.5 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                        selectedType === pkg.id 
                          ? 'border-amber-400 bg-amber-400/10 text-amber-450 font-bold' 
                          : 'border-neutral-800 bg-neutral-950/50 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-sans tracking-wide">{pkg.title.split(' ')[1]}</span>
                      <span className="text-[10px] font-mono text-neutral-500 group-hover:text-amber-400 mt-1">
                        R$ {pkg.basePrice}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for service distance */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-sans font-bold text-neutral-300">2. Distância Estimada (do centro ou sua rota)</label>
                  <span className="text-sm font-mono font-bold text-amber-400">{distance} km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-amber-400 border border-neutral-800"
                />
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 mt-2">
                  <span>Até 5km (Deslocamento Grátis)</span>
                  <span>Acima de 5km (+R$ 3.50/km)</span>
                  <span>Até 40km</span>
                </div>
              </div>

              {/* Horário check picker */}
              <div>
                <label className="block text-sm font-sans font-bold text-neutral-300 mb-2">3. Horário do Atendimento</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsNightTime(false)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      !isNightTime 
                        ? 'border-amber-400 bg-amber-400/5 text-white font-bold' 
                        : 'border-neutral-800 bg-neutral-950/50 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-sans font-bold">🌞 Horário Comercial (08h às 18h)</span>
                    {!isNightTime && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                  <button
                    onClick={() => setIsNightTime(true)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isNightTime 
                        ? 'border-amber-400 bg-amber-400/5 text-white font-bold' 
                        : 'border-neutral-800 bg-neutral-950/50 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-sans font-bold">🌙 Plantão Noturno/Finais de Semana</span>
                    {isNightTime && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                </div>
              </div>

              {/* Complication option select buttons */}
              <div>
                <label className="block text-sm font-sans font-bold text-neutral-300 mb-2">4. Complexidade do Ocorrido</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'locked_out', name: 'Apenas Esquecimento (Trancado)', price: 'Base' },
                    { key: 'key_broken', name: 'Chave Quebrada na Fechadura', price: '+R$ 40' },
                    { key: 'cylinder_damaged', name: 'Segredo Travado/Miolo Danificado', price: '+R$ 80' },
                    { key: 'code_lost', name: 'Senhas / Perda Total de Segredo', price: '+R$ 120' }
                  ].map((issue) => (
                    <button
                      key={issue.key}
                      onClick={() => setLockIssue(issue.key)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        lockIssue === issue.key 
                          ? 'border-amber-400 bg-amber-400/5 text-white font-bold' 
                          : 'border-neutral-800 bg-neutral-950/50 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div>
                        <span className="block text-xs font-sans">{issue.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-500 font-bold ml-2 shrink-0">{issue.price}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick warning context disclaimer */}
            <div className="mt-8 flex gap-3 text-neutral-400 text-xs bg-neutral-950 p-4 rounded-xl border border-neutral-850">
              <Info className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="font-sans leading-relaxed">
                Este simulador calcula uma estimativa altamente precisa baseada nos dados descritos. O valor definitivo é fixado e garantido na central antes da saída da unidade móvel para conferir segurança absoluta ao cliente.
              </p>
            </div>
          </div>

          {/* Dynamic Invoice column */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-850 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-tr-2xl" />
            
            {/* Invoice Design wrapper styled as a modern receipt tickets */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-md relative">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-neutral-900 rounded-full border-r border-neutral-800" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-neutral-900 rounded-full border-l border-neutral-800" />

              {/* Invoice header */}
              <div className="text-center pb-6 border-b border-dashed border-neutral-800">
                <FileText className="w-8 h-8 text-amber-400 mx-auto mb-2 animate-[pulse_3s_infinite]" />
                <h4 className="text-base font-bold font-sans text-white">ORÇAMENTO DIGITAL</h4>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mt-1">CHAVEIRO DE PRECISÃO EXCLUSIVO</span>
              </div>

              {/* Items listing table */}
              <div className="space-y-4 py-6 text-sm font-sans">
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block text-white font-bold">{activePackage.title}</span>
                    <span className="block text-[11px] text-neutral-500">Mão de obra e ferramenta especializada</span>
                  </div>
                  <span className="text-white font-mono font-medium">R$ {getBasePrice().toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <span className="block text-white font-bold">Deslocamento Técnico</span>
                    <span className="block text-[11px] text-neutral-500">Percurso de {distance} km</span>
                  </div>
                  <span className={`${getDistanceCost() === 0 ? 'text-emerald-400 text-xs font-bold font-mono' : 'text-white font-mono'}`}>
                    {getDistanceCost() === 0 ? 'GRÁTIS (ATÉ 5KM)' : `R$ ${getDistanceCost().toFixed(2)}`}
                  </span>
                </div>

                {getIssueMarkup() > 0 && (
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-white font-bold">Adicional de Dificuldade</span>
                      <span className="block text-[11px] text-neutral-500">Gravidade: {lockIssue === 'key_broken' ? 'Extração' : lockIssue === 'cylinder_damaged' ? 'Miolo' : 'Lógica de Código'}</span>
                    </div>
                    <span className="text-white font-mono font-medium">R$ {getIssueMarkup().toFixed(2)}</span>
                  </div>
                )}

                {isNightTime && (
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="block text-amber-400 font-bold">Adicional de Emergência Noturna</span>
                      <span className="block text-[11px] text-neutral-500">Plantão 24 horas habilitado</span>
                    </div>
                    <span className="text-amber-400 font-mono font-bold">R$ 60.00</span>
                  </div>
                )}

                {/* Totals sections */}
                <div className="border-t border-neutral-850 pt-4 space-y-2.5">
                  <div className="flex justify-between text-neutral-400 font-medium">
                    <span>Subtotal estimado:</span>
                    <span className="text-white font-mono">R$ {calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold text-xs">
                    <span>Desconto Web Portal (-10%):</span>
                    <span className="font-mono">- R$ {calculateDiscount().toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-neutral-850 pt-3 flex justify-between items-end">
                    <span className="text-base font-black text-white uppercase font-sans">VALOR TOTAL:</span>
                    <span className="text-2xl md:text-3xl font-black text-amber-400 font-sans tracking-tight">
                      R$ {calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

              </div>
              
              {/* Security confirmation footer of receipt */}
              <div className="pt-4 border-t border-dashed border-neutral-800 text-center text-[10px] font-mono text-neutral-500 leading-relaxed uppercase tracking-tight">
                ⚠️ Valores válidos para atendimento imediato. Inclui garantia técnica certificada de 90 dias após a abertura.
              </div>
            </div>

            {/* Quick approval action */}
            <div className="mt-6">
              <button
                onClick={handleApproveQuote}
                className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-sans font-black text-sm tracking-widest uppercase transition-all shadow-lg shadow-amber-500/10 cursor-pointer text-center block"
              >
                Aprovar Orçamento e Contatar
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
