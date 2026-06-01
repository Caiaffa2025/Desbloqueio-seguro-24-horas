/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapPin, ShieldCheck, Phone, CheckCircle, 
  Sparkles, Upload, ChevronRight, Check,
  Star, X, Award, Car, Navigation, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceType, BookingStatus } from '../types';
import { servicePackages, mockLocksmiths } from '../data';

interface QuickBookingProps {
  selectedServiceType: ServiceType;
  onChangeService: (serviceType: ServiceType) => void;
}

export default function QuickBooking({ selectedServiceType, onChangeService }: QuickBookingProps) {
  // Booking state
  const [status, setStatus] = useState<BookingStatus>('idle');
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [subType, setSubType] = useState('');
  const [address, setAddress] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [securityLevel, setSecurityLevel] = useState<'standard' | 'high' | 'ultra'>('standard');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isNightRate, setIsNightRate] = useState(false);

  // Find locksmith assigned to the selected service type
  const assignedLocksmith = useMemo(() => {
    const specialtyMap: Record<ServiceType, string> = {
      residential: 'Residencial',
      automotive: 'Automotivo',
      corporate: 'Comercial',
      safe: 'Cofres'
    };
    const targetSpec = specialtyMap[selectedServiceType];
    const found = mockLocksmiths.find(l => l.specialty.includes(targetSpec));
    return found || mockLocksmiths[0];
  }, [selectedServiceType]);

  // Initialize helper default selections when service type changes
  useEffect(() => {
    const pkg = servicePackages.find(p => p.id === selectedServiceType);
    if (pkg && pkg.subTypes.length > 0) {
      setSubType(pkg.subTypes[0]);
    }
  }, [selectedServiceType]);

  // Alert if night rate should be active (Current hour is past 20:00 or before 06:00)
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 20 || currentHour < 6) {
      setIsNightRate(true);
    } else {
      setIsNightRate(false);
    }
  }, []);

  // Drag and Drop files handling
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate budget based on options
  const calculateTotalEstimate = () => {
    const pkg = servicePackages.find(p => p.id === selectedServiceType);
    if (!pkg) return 0;
    
    let total = pkg.basePrice;
    
    // Security coefficient
    if (securityLevel === 'high') total += 50;
    if (securityLevel === 'ultra') total += 120;
    
    // Night rate addition
    if (isNightRate) total += 60; // 24h Night-time emergency tariff

    return total;
  };

  // Compile memoized WhatsApp URL
  const whatsappUrl = useMemo(() => {
    const finalPriceEstimate = calculateTotalEstimate();
    const serviceName = selectedServiceType === 'residential' ? 'Residencial' : selectedServiceType === 'automotive' ? 'Automotivo' : selectedServiceType === 'corporate' ? 'Corporativo' : 'Cofres';
    const complexityText = securityLevel === 'standard' ? 'Comum / Yale' : securityLevel === 'high' ? 'Multiponto / Tetra' : 'Fechadura Digital ou Cofre de Alta Segurança';

    const message = `Olá! Gostaria de solicitar um *Chaveiro de Emergência 24h*.

*Detalhes do Atendimento:*
• *Nome do Cliente:* ${contactName || 'Não especificado'}
• *Telefone de Contato:* ${contactPhone || 'Não especificado'}
• *Serviço:* Abertura ${serviceName} (${subType})
• *Nível de Complexidade:* ${complexityText}
• *Endereço Completo:* ${address || 'Não especificado'}
${customNotes ? `• *Notas Adicionais:* ${customNotes}` : ''}

*Orçamento Estimado:* R$ ${finalPriceEstimate.toFixed(2)}${isNightRate ? ' (Inclui Adicional Noturno)' : ''}

_Estou enviando esta solicitação pré-configurada para atendimento prioritário imediato!_`;

    return `https://wa.me/5511984937529?text=${encodeURIComponent(message)}`;
  }, [selectedServiceType, subType, address, customNotes, securityLevel, contactName, contactPhone, isNightRate]);

  // Handle click on first screen form submit anchor
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If the user hasn't filled fields, we still let them proceed to WhatsApp with partial info.
    // We delay of setting 'completed' state by 200ms to guarantee Chrome / browser handles
    // target="_blank" window opening safely before unmounting the anchor element.
    setTimeout(() => {
      setStatus('completed');
      setIsTechModalOpen(true);
    }, 200);
  };

  return (
    <section id="booking-section" className="py-20 bg-neutral-900 border-t border-b border-neutral-800 text-white relative">
      <div className="absolute top-0 left-10 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-400 uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Rápido e 24 Horas no WhatsApp
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight">
              Solicitação de <span className="text-amber-400">Atendimento</span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg font-sans mt-2 max-w-xl">
              Consulte seu orçamento online abaixo e envie os dados em 1 clique para agilizar seu chamado técnico via WhatsApp.
            </p>
          </div>

          {/* Quick categories navigation trigger */}
          <div className="flex overflow-x-auto max-w-full bg-neutral-950 p-1 rounded-xl border border-neutral-800 self-start md:self-end whitespace-nowrap scrollbar-none sm:overflow-visible">
            {(['residential', 'automotive', 'corporate', 'safe'] as ServiceType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  if (status === 'idle') {
                    onChangeService(tab);
                  }
                }}
                disabled={status !== 'idle'}
                className={`px-3.5 py-2 rounded-lg font-sans text-xs font-black transition-all uppercase cursor-pointer shrink-0 ${
                  selectedServiceType === tab 
                    ? 'bg-amber-400 text-neutral-900 shadow-md' 
                    : 'text-neutral-400 hover:text-white disabled:opacity-50'
                }`}
              >
                {tab === 'residential' ? 'Casa' : tab === 'automotive' ? 'Carro' : tab === 'corporate' ? 'Empresa' : 'Cofre'}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Booking Screen Console */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative min-h-[500px]">
          
          <AnimatePresence mode="wait">
            
            {/* Step 1: Request Details Configurator */}
            {status === 'idle' && (
              <motion.div
                key="idle-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* Form fields */}
                <div className="lg:col-span-7 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-neutral-800">
                  <h3 className="text-xl md:text-2xl font-sans font-extrabold text-white mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 text-sm font-mono font-bold">1</span>
                    Detalhes do Atendimento
                  </h3>

                  <div className="space-y-6">
                    {/* Specific Lock Type */}
                    <div>
                      <label className="block text-sm sm:text-base font-sans font-bold text-neutral-300 mb-2">Comportamento / Tipo de Fechadura</label>
                      <select 
                        value={subType}
                        onChange={(e) => setSubType(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400 font-sans cursor-pointer"
                      >
                        {servicePackages.find(p => p.id === selectedServiceType)?.subTypes.map((sub, i) => (
                          <option key={i} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>

                    {/* Address Input */}
                    <div>
                      <label className="block text-sm sm:text-base font-sans font-bold text-neutral-300 mb-2">
                        Endereço de Atendimento
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Digite o endereço completo com número e ponto de referência"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-11 pr-4 py-3.5 text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-sans"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                          <MapPin className="w-5 h-5 text-amber-400" />
                        </div>
                      </div>
                    </div>

                    {/* Client info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm sm:text-base font-sans font-bold text-neutral-300 mb-2">Seu Nome para Identificação</label>
                        <input
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Ex: João da Silva"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-sm sm:text-base font-sans font-bold text-neutral-300 mb-2">Telefone de Contato (WhatsApp)</label>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="Ex: (11) 98765-4321"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3.5 text-base sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 font-sans"
                        />
                      </div>
                    </div>

                    {/* Security level selection */}
                    <div>
                      <label className="block text-sm sm:text-base font-sans font-bold text-neutral-300 mb-2.5">Complexidade de Segurança da Fechadura</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {[
                          { key: 'standard', name: 'Comum (Yale)', coeff: 'Preço Comum' },
                          { key: 'high', name: 'Multiponto / Tetra', coeff: 'Adicional +R$ 50' },
                          { key: 'ultra', name: 'Digital ou Cofre', coeff: 'Adicional +R$ 120' }
                        ].map((lvl) => (
                          <button
                            key={lvl.key}
                            type="button"
                            onClick={() => setSecurityLevel(lvl.key as any)}
                            className={`p-4 rounded-xl border text-left flex flex-row sm:flex-col justify-between items-center sm:items-start transition-all cursor-pointer ${
                              securityLevel === lvl.key 
                                ? 'bg-amber-400/10 border-amber-400 text-amber-400' 
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                          >
                            <span className="font-sans font-extrabold text-sm sm:text-xs text-white">{lvl.name}</span>
                            <span className="font-mono text-[11px] sm:text-[10px] uppercase tracking-wider font-bold text-amber-400/90">{lvl.coeff}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Notes text area */}
                    <div>
                      <label className="block text-sm sm:text-base font-sans font-bold text-neutral-300 mb-1.5">Informações Adicionais (Escreva detalhes do ocorrido)</label>
                      <textarea
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                        placeholder="Ex: Chave travou girada ao meio / Trinco quebrou por dentro"
                        rows={3}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-amber-400 font-sans resize-none"
                      />
                    </div>
                  </div>

                  {/* Selo de Segurança e Confiança */}
                  <div className="mt-8 pt-6 border-t border-neutral-900">
                    <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="p-3 bg-amber-400/10 rounded-xl border border-amber-400/20 text-amber-500 shrink-0 self-start sm:self-center">
                        <ShieldCheck className="w-6 h-6 animate-[pulse_2s_infinite]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-sans font-extrabold text-white flex items-center gap-2">
                          Selo de Segurança & Confiança
                          <span className="bg-emerald-500/15 border border-emerald-500/30 text-[9px] font-mono uppercase text-emerald-400 px-2 py-0.5 rounded font-bold tracking-wider">Homologado</span>
                        </h4>
                        <p className="text-xs text-neutral-400 font-sans mt-1.5 leading-relaxed">
                          Todos os nossos técnicos possuem <strong className="text-neutral-250">certificação profissional credenciada</strong>, com consulta rigorosa de antecedentes criminais ativa e histórico certificado de aberturas limpas (sem danos à fechadura).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left Upload and dynamic pricing summary panel */}
                <div className="lg:col-span-5 p-6 md:p-10 bg-neutral-950 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-sans font-extrabold text-white mb-6 flex items-center gap-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 text-sm font-mono font-bold">2</span>
                      Foto e Orçamento
                    </h3>

                    {/* Drag and Drop */}
                    <div className="mb-6">
                      <label className="block text-sm font-sans font-bold text-neutral-300 mb-2">Enviar Foto da Fechadura (Opcional)</label>
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all relative flex flex-col items-center justify-center min-h-[140px] cursor-pointer ${
                          dragActive ? 'border-amber-400 bg-amber-400/5' : 'border-neutral-800 hover:border-neutral-750'
                        }`}
                      >
                        {imagePreview ? (
                          <div className="relative w-full h-32 rounded-lg overflow-hidden group">
-                            <img src={imagePreview} alt="Lock preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setImagePreview(null);
                                }}
                                className="px-3 py-1.5 bg-red-500 rounded-lg text-xs font-bold font-sans text-white hover:bg-red-650"
                              >
                                Remover Foto
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-neutral-500 mb-2" />
                            <span className="block font-sans font-medium text-xs text-neutral-400 mb-1">
                              Arraste por aqui ou clique para selecionar foto
                            </span>
                            <span className="block font-mono text-[10px] text-neutral-600">
                              Aceita PNG, JPEG de até 4MB
                            </span>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            />
                          </>
                        )}
                      </div>
                    </div>

                    {/* Simulated Pricing Breakdown Box */}
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mb-6">
                      <h4 className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold mb-3 flex items-center justify-between">
                        <span>Detalhamento Técnico</span>
                        <span>Plantão 24h</span>
                      </h4>

                      <div className="space-y-2.5 font-sans text-sm">
                        <div className="flex justify-between text-neutral-400">
                          <span>Abertura base ({selectedServiceType === 'residential' ? 'Residência' : selectedServiceType === 'automotive' ? 'Carro' : selectedServiceType === 'corporate' ? 'Empresa' : 'Cofre'}):</span>
                          <span className="text-white font-medium">R$ {servicePackages.find(p => p.id === selectedServiceType)?.basePrice.toFixed(2)}</span>
                        </div>
                        {securityLevel !== 'standard' && (
                          <div className="flex justify-between text-neutral-400">
                            <span>Adicional de complexidade técnica:</span>
                            <span className="text-white font-medium">R$ {securityLevel === 'high' ? '50.00' : '120.00'}</span>
                          </div>
                        )}
                        {isNightRate && (
                          <div className="flex justify-between text-neutral-400 animate-[pulse_2s_infinite]">
                            <span className="text-yellow-500 flex items-center gap-1">Adicional Noturno (20h às 06h):</span>
                            <span className="text-yellow-500 font-bold">R$ 60.00</span>
                          </div>
                        )}
                        <div className="flex justify-between text-neutral-400">
                          <span>Deslocamento (Rota Rápida):</span>
                          <span className="text-emerald-400 font-bold font-mono text-xs">GRÁTIS (INCLUSO)</span>
                        </div>

                        <div className="border-t border-neutral-800 pt-3 flex justify-between items-end">
                          <span className="text-base font-bold text-white">Orçamento Estimado</span>
                          <span className="text-2xl md:text-3xl font-black text-amber-400 font-sans tracking-tight">
                            R$ {calculateTotalEstimate().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission CTA */}
                  <div className="mt-4">
                    <a
                      href={whatsappUrl}
                      onClick={handleAnchorClick}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4.5 px-6 rounded-2xl bg-amber-400 text-neutral-950 font-sans font-black tracking-wide shadow-xl shadow-amber-500/10 hover:bg-amber-300 hover:shadow-amber-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-3 text-base"
                    >
                      <span>Confirmar e Chamar no WhatsApp</span>
                      <ChevronRight className="w-5 h-5 text-neutral-950" />
                    </a>
                    <span className="block text-center text-neutral-500 text-[11px] font-mono mt-3 uppercase tracking-wider">
                      🔒 Confirmação Sem Compromisso e Atendimento Humano Imediato
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Confirmation / Beautiful Direct WhatsApp Redirection HUD */}
            {status === 'completed' && (
              <motion.div
                key="completed-redirect-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="flex flex-col items-center justify-center bg-neutral-950 text-center px-6 py-12 md:py-20 min-h-[500px]"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full bg-emerald-600/10 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Check className="w-10 h-10 animate-[bounce_1.5s_infinite]" />
                  </div>
                </div>

                <h3 className="text-2xl md:text-4xl font-sans font-black text-white">
                  Orçamento Calculado com <span className="text-emerald-400 animate-pulse">Sucesso!</span>
                </h3>
                <p className="text-neutral-400 font-sans mt-3 max-w-lg text-sm md:text-base leading-relaxed">
                  Geramos uma proposta pré-configurada baseada nas suas especificações de fechadura para garantir agilidade total sem enrolações. 
                </p>

                {/* Pre-formatted data summary box inside success screen */}
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl max-w-md w-full my-8 text-left space-y-3 font-sans">
                  <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest font-bold mb-2 border-b border-neutral-800 pb-2">Resumo do Chamado Técnico</span>
                  
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Cliente Autorizado:</span>
                    <span className="text-white font-bold">{contactName}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Contato (WhatsApp):</span>
                    <span className="text-white font-mono">{contactPhone}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Tipo de Fechadura:</span>
                    <span className="text-amber-400 font-bold">{subType}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Endereço de Apoio:</span>
                    <span className="text-white font-medium truncate max-w-[200px]" title={address}>{address}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-2 border-t border-neutral-800">
                    <span className="text-neutral-400 text-sm font-bold">Valor Estimado Garantido:</span>
                    <span className="text-emerald-400 font-mono font-black text-base">R$ {calculateTotalEstimate().toFixed(2)}</span>
                  </div>

                  {/* Assigned Technician Quick Card preview */}
                  <div className="pt-3 border-t border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setIsTechModalOpen(true)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-850 hover:border-amber-400/40 hover:bg-neutral-900 group transition-all text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img 
                            src={assignedLocksmith.avatar} 
                            alt={assignedLocksmith.name} 
                            className="w-10 h-10 rounded-full border border-neutral-800 object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-neutral-950 bg-emerald-500 shrink-0" />
                        </div>
                        <div>
                          <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Técnico Designado</span>
                          <span className="block text-xs font-bold text-white group-hover:text-amber-400 transition-colors">{assignedLocksmith.name}</span>
                          <span className="block text-[10px] text-neutral-400 font-sans mt-0.5">⭐ {assignedLocksmith.rating.toFixed(1)} • {assignedLocksmith.eta} min ETA</span>
                        </div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-850 group-hover:border-amber-400/30 text-amber-500 transition-all shrink-0">
                        <span className="text-[10px] font-bold font-sans px-1 uppercase tracking-wider">Ver Perfil</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Direct Big Pulsing Action Button */}
                <div className="max-w-md w-full space-y-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4.5 px-6 rounded-2xl bg-emerald-500 text-neutral-950 hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer font-sans font-black flex items-center justify-center gap-2.5 text-base shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/25 animate-bounce"
                  >
                    <Phone className="w-5 h-5 text-neutral-950 fill-neutral-950" />
                    <span>Iniciar Atendimento no WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setStatus('idle')}
                    className="w-full py-3.5 px-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-850 text-neutral-400 hover:text-white transition-all cursor-pointer font-sans font-bold text-xs uppercase tracking-wider"
                  >
                    Voltar e Editar Detalhes
                  </button>
                </div>

                <div className="text-[10px] font-mono text-neutral-600 mt-6 uppercase tracking-widest animate-pulse">
                  Unidades de pronto-atendimento prontas para deslocamento imediato
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Technician Profile Modal */}
          <AnimatePresence>
            {isTechModalOpen && status === 'completed' && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                {/* Backdrop overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsTechModalOpen(false)}
                  className="absolute inset-0 bg-black/85 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl text-left overflow-hidden z-10 font-sans"
                >
                  {/* Neon top highlight */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

                  {/* Close button */}
                  <button
                    onClick={() => setIsTechModalOpen(false)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-850 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Header Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-6">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Técnico Homologado & Credenciado
                  </div>

                  {/* Tech Profile Hero Grid */}
                  <div className="flex gap-4 items-start mb-6 border-b border-neutral-800/60 pb-5">
                    {/* Avatar with dynamic indicator */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-400 relative">
                        <img 
                          src={assignedLocksmith.avatar} 
                          alt={assignedLocksmith.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="absolute bottom-1 right-1 flex h-4 w-4 rounded-full border-2 border-neutral-900 bg-emerald-500">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      </span>
                    </div>

                    {/* Meta info */}
                    <div>
                      <h4 className="text-lg sm:text-xl font-sans font-black text-white leading-tight">
                        {assignedLocksmith.name}
                      </h4>
                      
                      {/* Rating block */}
                      <div className="flex items-center gap-1 mt-1.5">
                        <div className="flex items-center text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                        </div>
                        <span className="text-sm font-bold text-white">{assignedLocksmith.rating.toFixed(1)}</span>
                        <span className="text-xs text-neutral-500 font-mono">({assignedLocksmith.completedJobs} atendimentos)</span>
                      </div>

                      {/* Specialties tags */}
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {assignedLocksmith.specialty.map((spec: string, i: number) => (
                          <span 
                            key={i} 
                            className="text-[9px] font-sans font-bold uppercase tracking-wider bg-neutral-850 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded-md"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Operational details card */}
                  <div className="space-y-4">
                    
                    {/* Vehicle info */}
                    <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-4 space-y-3">
                      <div>
                        <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Veículo do Profissional</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Car className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="text-xs sm:text-sm text-neutral-350 font-medium">{assignedLocksmith.vehicle}</span>
                        </div>
                      </div>

                      {/* Placa Mercosul */}
                      <div className="flex items-center justify-between border-t border-neutral-900 pt-2.5">
                        <div>
                          <span className="block text-[8px] font-mono text-neutral-500 uppercase tracking-wider">Identificação Placa</span>
                          <div className="inline-flex items-center bg-white border border-neutral-300 rounded px-2.5 py-0.5 mt-0.5 select-none font-sans font-black text-neutral-900 tracking-wider text-xs">
                            <span className="text-blue-600 font-bold mr-1.5 text-[8px] uppercase tracking-tighter">BR</span>
                            {assignedLocksmith.plate}
                          </div>
                        </div>
                        <div className="border-l border-neutral-900 pl-3">
                          <span className="block text-[8px] font-mono text-neutral-500 uppercase tracking-wider">STATUS ROTA</span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-emerald-400 mt-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            A caminho de você
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Countdown ETA bar */}
                    <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-sans font-bold text-neutral-400 flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                          Tempo de Chegada Estimado:
                        </span>
                        <span className="text-sm font-black font-sans text-amber-400 animate-pulse">
                          {assignedLocksmith.eta} min
                        </span>
                      </div>
                      
                      {/* Simulated Progress tracker bar */}
                      <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-2.5 border border-neutral-850">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                          initial={{ width: "15%" }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </div>
                      <p className="text-[10px] text-neutral-500 mt-2 font-mono flex items-center gap-1">
                        📍 Distância atual estimativa de rota rápida: <strong>{assignedLocksmith.distance} km</strong>
                      </p>
                    </div>

                  </div>

                  {/* Modal Action CTA */}
                  <div className="mt-6 pt-5 border-t border-neutral-800/60 grid grid-cols-1 gap-2.5">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-450 active:scale-98 transition-all cursor-pointer font-sans font-black text-xs uppercase tracking-wider text-neutral-950 text-center flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 fill-neutral-950 text-neutral-950" />
                      Pedir Prioridade para {assignedLocksmith.name.split(' ')[0]} no WhatsApp
                    </a>

                    <a
                      href={`tel:${assignedLocksmith.phone}`}
                      className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-98 transition-all cursor-pointer font-sans font-black text-xs uppercase tracking-wider text-neutral-950 text-center flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Ligar para {assignedLocksmith.name.split(' ')[0]} ({assignedLocksmith.phone})
                    </a>
                    
                    <button
                      onClick={() => setIsTechModalOpen(false)}
                      className="w-full py-3 rounded-xl bg-neutral-850 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer font-sans font-bold text-xs uppercase tracking-wider text-center"
                    >
                      Ok, Fechar Perfil
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
