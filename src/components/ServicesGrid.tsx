/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { servicePackages } from '../data';
import { ServiceType } from '../types';
import { Home, Car, Building2, ShieldAlert, CheckCircle2, ChevronRight, Key } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesGridProps {
  onSelectService: (serviceType: ServiceType) => void;
}

export default function ServicesGrid({ onSelectService }: ServicesGridProps) {
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-6 h-6 text-amber-400" />;
      case 'Car':
        return <Car className="w-6 h-6 text-amber-400" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-amber-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-amber-400" />;
      default:
        return <Key className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="servicos-section" className="py-20 bg-neutral-950 text-white relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-neutral-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 uppercase mb-4">
            <Key className="w-3.5 h-3.5" />
            Especialistas em Abertura Técnica
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight mb-4 text-white">
            Serviços Exclusivos e de <span className="text-amber-400">Alta Precisão</span>
          </h2>
          <p className="text-neutral-400 font-sans text-lg">
            Nossa equipe técnica é equipada com ferramentas de ponta para restabelecer seus acessos com agilidade, discrição e sem causar qualquer tipo de dano na sua propriedade.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicePackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative flex flex-col justify-between bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 hover:border-amber-400/30 shadow-xl transition-all h-full"
            >
              {/* Highlight background corner glow */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div>
                {/* Header card indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-neutral-800 rounded-xl group-hover:bg-amber-400/10 transition-colors">
                    {getIcon(pkg.iconName)}
                  </div>
                  <span className="font-mono text-xs text-neutral-500 group-hover:text-amber-400 transition-colors">
                    A partir de <strong className="text-white group-hover:text-amber-400 font-sans text-base ml-1">R$ {pkg.basePrice}</strong>
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-sans font-extrabold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                  {pkg.description}
                </p>

                {/* Sub-specialties tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pkg.subTypes.slice(0, 3).map((sub, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="text-[11px] font-medium font-mono text-neutral-400 bg-neutral-950 px-2.5 py-1.5 rounded-md border border-neutral-800"
                    >
                      {sub}
                    </span>
                  ))}
                  {pkg.subTypes.length > 3 && (
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-400/5 px-2.5 py-1.5 rounded-md border border-amber-400/10">
                      +{pkg.subTypes.length - 3} mais
                    </span>
                  )}
                </div>

                {/* Bullet list of advantages */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-neutral-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <span className="font-sans font-light">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectService(pkg.id)}
                className="w-full mt-auto py-3 px-4 rounded-xl border border-neutral-700 font-sans text-sm font-bold text-white bg-neutral-950 hover:bg-amber-400 hover:text-neutral-950 hover:border-amber-400 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
              >
                Solicitar Abertura de {pkg.id === 'residential' ? 'Residência' : pkg.id === 'automotive' ? 'Veículo' : pkg.id === 'corporate' ? 'Empresa' : 'Cofre'}
                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Highlight Trust Bar */}
        <div className="mt-16 bg-gradient-to-r from-neutral-900 to-neutral-850 border border-neutral-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-400/10 rounded-xl text-amber-400 shrink-0">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-sans text-white">Segurança Integral Comprovada em Primeiro Lugar</h4>
              <p className="text-neutral-400 text-sm max-w-2xl font-sans mt-1">
                Todas as solicitações passam por uma rigorosa validação cadastral e exigimos presença de responsável legal e documento idôneo no ato da abertura por conformidade com as leis de segurança pública.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-start md:items-end text-left md:text-right">
            <span className="text-[11px] font-mono text-neutral-500">HOMOLOGAÇÃO OFICIAL</span>
            <span className="text-sm font-bold text-white font-sans bg-neutral-950 px-4 py-2 rounded-lg border border-neutral-800 mt-1">
              🔐 Chaveiros Certificados Detran/Sindicato
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
