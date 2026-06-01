/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServicePackage, Locksmith } from './types';

export const servicePackages: ServicePackage[] = [
  {
    id: 'residential',
    title: 'Abertura Residencial',
    description: 'Abertura técnica de portas sem danificar a fechadura, troca de segredos e instalação de travas de segurança.',
    basePrice: 120,
    features: [
      'Abertura de chaves simples (Yale)',
      'Abertura de chaves Tetra e Multiponto',
      'Configuração de fechaduras digitais e biométricas',
      'Atendimento imediato e sem arrombamento de portas de madeira ou metal'
    ],
    subTypes: [
      'Porta de Entrada Simples (Chave Yale)',
      'Porta com Fechadura Tetra',
      'Porta com Chave Multiponto / Alta Segurança',
      'Fechadura Eletrônica / Digital',
      'Gavetas, Cadeados e Portas Internas'
    ],
    iconName: 'Home'
  },
  {
    id: 'automotive',
    title: 'Abertura Automotiva',
    description: 'Especialistas em abertura de veículos nacionais e importados de todas as marcas com pantógrafos de última geração.',
    basePrice: 150,
    features: [
      'Abertura técnica (sem danificar a lataria ou borrachas)',
      'Atendimento de carros com travas elétricas e alarmes ativos',
      'Extração de chave quebrada na ignição',
      'Suporte para veículos nacionais e importados de luxo'
    ],
    subTypes: [
      'Carro Nacional Modelo Comum',
      'Carro Importado / Carro de Luxo (Chave Pantográfica)',
      'Caminhão / Veículo de Carga',
      'Abertura de Porta-Malas Travado',
      'Extração de Chave Quebrada na Ignição'
    ],
    iconName: 'Car'
  },
  {
    id: 'corporate',
    title: 'Abertura Comercial',
    description: 'Segurança corporativa para escritórios, depósitos e lojas. Instalação de barras antipânico e controle de acesso.',
    basePrice: 180,
    features: [
      'Abertura de portas de vidro com fechadura blindex',
      'Manutenção de portas corta-fogo e barras antipânico',
      'Sistemas de chave mestra (uma chave abre múltiplas portas)',
      'Troca técnica de fechaduras comerciais pesadas'
    ],
    subTypes: [
      'Porta de Vidro Temperado (Blindex)',
      'Porta de Aço de Enrolar (Lojas de Rua)',
      'Porta Corta-Fogo com Barra Antipânico',
      'Fechadura Eletromagnética / Solenóide',
      'Gaveteiros e Arquivos de Escritório'
    ],
    iconName: 'Building2'
  },
  {
    id: 'safe',
    title: 'Abertura de Cofres',
    description: 'Serviço altamente confidencial e especializado para cofres mecânicos e digitais de alta segurança.',
    basePrice: 350,
    features: [
      'Abertura não-destrutiva de segredo mecânico de disco',
      'Abertura e reset de cofres digitais sem bateria',
      'Confidencialidade absoluta e termos de segurança preenchidos',
      'Recuperação de senhas e chaves tetra de segurança'
    ],
    subTypes: [
      'Cofre Digital Residencial (Pequeno/Médio)',
      'Cofre Mecânico Antigo (Segredo Giratório)',
      'Cofre Comercial de Alta Segurança',
      'Portas de Caixa Forte / Paredes Blindadas',
      'Cofre Digital Bloqueado ou Sem Bateria'
    ],
    iconName: 'ShieldAlert'
  }
];

export const mockLocksmiths: Locksmith[] = [
  {
    id: 'lock-01',
    name: 'Carlos Alberto Silva',
    rating: 4.9,
    completedJobs: 1342,
    specialty: ['Residencial', 'Automotivo', 'Cofres'],
    distance: 1.8,
    eta: 12,
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200&h=200',
    vehicle: 'Moto Honda CG 160 Cargo - Prata (Rápido Deslocamento)',
    plate: 'ABC-7G91',
    phone: '+55 (11) 98493-7529'
  },
  {
    id: 'lock-02',
    name: 'Marcelo Santos Souza',
    rating: 4.8,
    completedJobs: 954,
    specialty: ['Residencial', 'Comercial', 'Automotivo'],
    distance: 3.2,
    eta: 18,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200',
    vehicle: 'Fiat Fiorino Chaveiro Móvel - Branca (Equipada com Pantógrafos)',
    plate: 'XYZ-3H44',
    phone: '+55 (11) 98888-5678'
  },
  {
    id: 'lock-03',
    name: 'Roberto Fernando Oliveira',
    rating: 5.0,
    completedJobs: 1843,
    specialty: ['Cofres', 'Comercial', 'Alta Segurança'],
    distance: 4.5,
    eta: 22,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    vehicle: 'Moto Yamaha Fazer 250 - Azul (Equipamentos de Precisão)',
    plate: 'KJL-1Y23',
    phone: '+55 (11) 97777-1122'
  },
  {
    id: 'lock-04',
    name: 'Thiago Nogueira Ramos',
    rating: 4.7,
    completedJobs: 712,
    specialty: ['Automotivo', 'Residencial'],
    distance: 5.1,
    eta: 25,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    vehicle: 'Renault Kangoo Oficina - Cinza (Ideal para Codificação Automotiva)',
    plate: 'QWE-5U98',
    phone: '+55 (11) 96666-4433'
  }
];

export const emergencyTips = [
  {
    title: 'Seja calmo e verifique alternativas',
    description: 'Antes de tentar forçar a fechadura, verifique se há outra porta ou janela que possa estar acessível e segura.'
  },
  {
    title: 'Não tente forçar com grampos',
    description: 'Isso pode quebrar os pinos internos e travar de vez os segredos, elevando muito o custo de abertura posterior.'
  },
  {
    title: 'Mantenha-se em local seguro e iluminado',
    description: 'Enquanto aguarda nosso chaveiro, permaneça em uma área iluminada ou próximo a vizinhos ou estabelecimentos abertos.'
  },
  {
    title: 'Documento em mãos',
    description: 'Por motivos de segurança e lei, nossos profissionais exigem comprovação de residência ou propriedade do veículo antes de realizar o serviço.'
  }
];

export const faqList = [
  {
    question: 'Vocês atendem de madrugada e finais de semana?',
    answer: 'Sim, nosso atendimento de emergência é 100% real, disponível 24 horas por dia, 7 dias por semana, incluindo feriados e madrugadas.'
  },
  {
    question: 'É cobrado taxa de deslocamento?',
    answer: 'A taxa de deslocamento é calculada e já inclusa no orçamento final que você aprova no aplicativo antes da saída do chaveiro, sem surpresas.'
  },
  {
    question: 'Quanto tempo leva para o profissional chegar?',
    answer: 'Nosso sistema de inteligência de rotas prioriza sempre o profissional disponível mais próximo de você. O tempo médio de chegada em áreas urbanas é de 15 a 25 minutos.'
  },
  {
    question: 'Quais as formas de pagamento aceitas?',
    answer: 'Aceitamos PIX, cartões de crédito e débito (nossos chaveiros levam maquininha) e dinheiro diretamente ao profissional após a conclusão do serviço.'
  },
  {
    question: 'O serviço de abertura danifica a porta ou portão?',
    answer: 'Nossos técnicos utilizam ferramentas de precisão como gazuas e michas pantográficas para restabelecer o acesso de forma cirúrgica e limpa, preservando a fechadura original em 95% dos casos.'
  }
];
