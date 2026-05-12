/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AgendaItem {
  id: string;
  time: string;
  timestamp: string; // ISO format for comparison
  title: string;
  speaker?: string;
  location: string;
  category: 'Workshop' | 'Palestra' | 'Lazer' | 'Refeição';
  description?: string;
  track?: 'GESTÃO' | 'VENDAS' | 'OUTROS TEMAS' | 'CONAEC';
}

export interface Reminder {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface TravelTip {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export const AGENDA: AgendaItem[] = [
  // Quarta-feira, 13 de Maio
  {
    id: '13-1',
    time: '19:00',
    timestamp: '2026-05-13T19:00:00',
    title: 'Coquetel de Abertura da 31ª ExpoCONAC',
    location: 'ExpoCONAC - Piso Monumental',
    category: 'Lazer',
    description: 'Traje Passeio. Bebidas alcoólicas inclusas.'
  },
  {
    id: '13-2',
    time: '21:00',
    timestamp: '2026-05-13T21:00:00',
    title: 'Jantar de Abertura & Show de Humor (Nelson Freitas)',
    location: 'Piso Monumental',
    category: 'Refeição',
    description: 'Traje Passeio. Bebidas alcoólicas inclusas.'
  },
  
  // Quinta-feira, 14 de Maio
  {
    id: '14-1',
    time: '09:00',
    timestamp: '2026-05-14T09:00:00',
    title: 'Cerimônia de Abertura',
    location: 'Plenária - Piso Monumental',
    category: 'Lazer',
  },
  {
    id: '14-2',
    time: '09:30',
    timestamp: '2026-05-14T09:30:00',
    title: 'Palestra de Abertura: "A Vida que Vale a Pena ser Vivida"',
    speaker: 'Prof. Clóvis de Barros Filho',
    location: 'Plenária - Piso Monumental',
    category: 'Palestra',
  },
  {
    id: '14-3',
    time: '10:45',
    timestamp: '2026-05-14T10:45:00',
    title: 'Coffee-break e visitação à 31ª ExpoCONAC',
    location: 'ExpoCONAC - Piso Monumental',
    category: 'Refeição',
  },
  {
    id: '14-4',
    time: '11:15',
    timestamp: '2026-05-14T11:15:00',
    title: '"O Cenário Político e Econômico do Brasil. Suas Oportunidades e Desafios"',
    speaker: 'Adolfo Sachsida',
    location: 'Salão Campinas (Piso Inferior)',
    category: 'Palestra',
    track: 'GESTÃO'
  },
  {
    id: '14-5',
    time: '11:15',
    timestamp: '2026-05-14T11:15:00',
    title: 'Painel – Comitê Inovação: "Inovação na Prática: Como equilibrar erros e aprendizados?"',
    location: 'Sala Anhanguera (Hotel Tower)',
    category: 'Workshop',
    track: 'OUTROS TEMAS'
  },
  {
    id: '14-6',
    time: '11:15',
    timestamp: '2026-05-14T11:15:00',
    title: '"Aspectos Jurídicos da Recuperação Extrajudicial: O que Muda e Como Atuamos"',
    speaker: 'Dr. Ian Cavalcante',
    location: 'Sala Jatobá (Piso Inferior)',
    category: 'Palestra',
    track: 'CONAEC'
  },
  {
    id: '14-7',
    time: '12:45',
    timestamp: '2026-05-14T12:45:00',
    title: 'Almoço',
    location: 'Espaço Exposições (Piso Campinas)',
    description: 'Bebidas não alcoólicas inclusas.',
    category: 'Refeição',
  },
  {
    id: '14-8',
    time: '14:15',
    timestamp: '2026-05-14T14:15:00',
    title: 'Prêmio Compartilhar',
    speaker: 'Pedro Furquim',
    location: 'Vendas - Piso Monumental',
    category: 'Palestra',
  },
  {
    id: '14-9',
    time: '14:15',
    timestamp: '2026-05-14T14:15:00',
    title: '"Pejotização e Responsabilidade Solidária / Subsidiária em Cadeias de Consórcio"',
    speaker: 'Dr. Alberto Magno e Dra. Vanessa Cavalcanti',
    location: 'Sala Jatobá',
    category: 'Palestra',
    track: 'CONAEC'
  },
  {
    id: '14-10',
    time: '15:45',
    timestamp: '2026-05-14T15:45:00',
    title: 'Coffee-break e visitação à 31ª ExpoCONAC',
    location: 'ExpoCONAC',
    category: 'Refeição',
  },
  {
    id: '14-11',
    time: '16:15',
    timestamp: '2026-05-14T16:15:00',
    title: '"IA 2026-2030: Tendências e Oportunidades"',
    speaker: 'Arthur Igreja',
    location: 'Salão Campinas',
    category: 'Palestra',
    track: 'GESTÃO'
  },
  {
    id: '14-12',
    time: '16:15',
    timestamp: '2026-05-14T16:15:00',
    title: '"Como Desenvolver uma Mentalidade mais Vendedora"',
    speaker: 'Gustavo Malavota',
    location: 'Vendas - Piso Monumental',
    category: 'Palestra',
    track: 'VENDAS'
  },
  {
    id: '14-13',
    time: '16:15',
    timestamp: '2026-05-14T16:15:00',
    title: '"Seu Fornecedor é Seu Risco: Como vazamentos alimentam fraudes no consórcio"',
    location: 'Sala Anhanguera',
    category: 'Workshop',
    track: 'OUTROS TEMAS'
  },
  {
    id: '14-14',
    time: '16:15',
    timestamp: '2026-05-14T16:15:00',
    title: '"O Consórcio e o Judiciário: Temas Atuais e Como Abordá-los de Forma Vencedora"',
    speaker: 'Dra. Alessandra Mourão e Dra. Silvia Valéria Scapin',
    location: 'Sala Jatobá',
    category: 'Palestra',
    track: 'CONAEC'
  },
  {
    id: '14-15',
    time: '17:30',
    timestamp: '2026-05-14T17:30:00',
    title: 'Encerramento das atividades do dia',
    location: 'Geral',
    category: 'Lazer',
  },
  
  // Sexta-feira, 15 de Maio
  {
    id: '15-1',
    time: '09:00',
    timestamp: '2026-05-15T09:00:00',
    title: '"IA no Sistema de Consórcios. Demonstrações ao vivo de Inteligência Artificial"',
    speaker: 'Tony Ventura - IA',
    location: 'Salão Campinas',
    category: 'Palestra',
    track: 'GESTÃO'
  },
  {
    id: '15-2',
    time: '09:00',
    timestamp: '2026-05-15T09:00:00',
    title: '"Impacto da Reforma Tributária no Ambiente das Administradoras de Consórcio"',
    speaker: 'Dra. Ana Carolina Monguilod e Dr. Weslen Sousa Silva',
    location: 'Sala Jatobá',
    category: 'Palestra',
    track: 'CONAEC'
  },
  {
    id: '15-3',
    time: '10:30',
    timestamp: '2026-05-15T10:30:00',
    title: 'Coffee-break e visitação à 31ª ExpoCONAC',
    location: 'ExpoCONAC',
    category: 'Refeição',
  },
  {
    id: '15-4',
    time: '11:00',
    timestamp: '2026-05-15T11:00:00',
    title: '"Brasil que Faz: Liderança eficaz com ênfase em vendas"',
    speaker: 'Elvis Cezar',
    location: 'Vendas - Piso Monumental',
    category: 'Palestra',
    track: 'VENDAS'
  },
  {
    id: '15-5',
    time: '11:00',
    timestamp: '2026-05-15T11:00:00',
    title: '"O Jogo das 3 Pontas: Como equilibrar Administradora, Representantes e Clientes"',
    location: 'Sala Anhanguera',
    category: 'Workshop',
    track: 'OUTROS TEMAS'
  },
  {
    id: '15-6',
    time: '11:00',
    timestamp: '2026-05-15T11:00:00',
    title: '"Inteligência Artificial no Consórcio: Evolução, Segurança e Novas Possibilidades"',
    speaker: 'Dr. José Milagre',
    location: 'Sala Jatobá',
    category: 'Palestra',
    track: 'CONAEC'
  },
  {
    id: '15-7',
    time: '12:30',
    timestamp: '2026-05-15T12:30:00',
    title: 'Almoço',
    location: 'Espaço Exposições',
    description: 'Bebidas não alcoólicas inclusas.',
    category: 'Refeição',
  },
  {
    id: '15-8',
    time: '14:00',
    timestamp: '2026-05-15T14:00:00',
    title: '"Conflito de Gerações: Como interagir e vender consórcio para jovens"',
    speaker: 'Dado Schneider',
    location: 'Salão Campinas',
    category: 'Palestra',
    track: 'GESTÃO'
  },
  {
    id: '15-9',
    time: '14:00',
    timestamp: '2026-05-15T14:00:00',
    title: '"Estratégias e Processos de Vendas de Consórcios"',
    speaker: 'Thiago Concer',
    location: 'Vendas - Piso Monumental',
    category: 'Palestra',
    track: 'VENDAS'
  },
  {
    id: '15-10',
    time: '14:00',
    timestamp: '2026-05-15T14:00:00',
    title: '"Projeto ESG – Matriz de Materialidade do Sistema de Consórcios"',
    location: 'Sala Anhanguera',
    category: 'Workshop',
    track: 'OUTROS TEMAS'
  },
  {
    id: '15-11',
    time: '14:00',
    timestamp: '2026-05-15T14:00:00',
    title: '"ESG na Prática Jurídica das Administradoras de Consórcio"',
    speaker: 'Dra. Clau Camargo',
    location: 'Sala Jatobá',
    category: 'Palestra',
    track: 'CONAEC'
  },
  {
    id: '15-12',
    time: '15:30',
    timestamp: '2026-05-15T15:30:00',
    title: 'Coffee-break e visitação à 31ª ExpoCONAC',
    location: 'ExpoCONAC',
    category: 'Refeição',
  },
  {
    id: '15-13',
    time: '16:00',
    timestamp: '2026-05-15T16:00:00',
    title: 'Prêmio Participação / Prêmio Compartilhar',
    location: 'Plenária',
    category: 'Lazer',
  },
  {
    id: '15-14',
    time: '16:30',
    timestamp: '2026-05-15T16:30:00',
    title: 'Palestra de Encerramento: "Uma História de Superação"',
    speaker: 'Serginho do Vôlei',
    location: 'Plenária - Piso Monumental',
    category: 'Palestra',
  },
  {
    id: '15-15',
    time: '18:00',
    timestamp: '2026-05-15T18:00:00',
    title: 'Encerramento da Programação Temática',
    location: 'Geral',
    category: 'Lazer',
  },
  {
    id: '15-16',
    time: '21:30',
    timestamp: '2026-05-15T21:30:00',
    title: 'Jantar de Confraternização',
    location: 'Piso Monumental',
    category: 'Refeição',
    description: 'Bebidas alcoólicas inclusas. Traje Informal.'
  },
  {
    id: '15-17',
    time: '22:30',
    timestamp: '2026-05-15T22:30:00',
    title: 'Show e Festa de Encerramento: Bia Barros & Banda',
    location: 'Piso Monumental',
    category: 'Lazer',
  },
];

export const REMINDERS: Reminder[] = [
  { id: 'r1', icon: 'IdCard', title: 'Identidade', description: 'Obrigatório para o credenciamento.' },
  { id: 'r2', icon: 'Sun', title: 'Protetor Solar', description: 'Recomendado para áreas externas do resort.' },
  { id: 'r3', icon: 'Droplets', title: 'Hidratação', description: 'Beba água regularmente nos pontos climatizados.' },
];

export const TRAVEL_TIPS: TravelTip[] = [
  {
    id: 't1',
    title: 'Salas do Congresso',
    content: 'Gestão: Salão Campinas (Inferior). Plenária: Térreo Monumental. CONAEC: Sala Jatobá (Inferior). Outros: Sala Anhanguera (Hotel Tower).',
    icon: 'MapPin'
  },
  {
    id: 't2',
    title: 'Trajes',
    content: 'Quarta: Passeio. Quinta/Sexta: Casual (manga longa sugerida). Sexta Noite: Informal.',
    icon: 'Shirt'
  },
  {
    id: 't3',
    title: 'Alimentação',
    content: 'Café da manhã no hotel. Almoço e Jantares no Hall. Ver detalhes em Viagem.',
    icon: 'Utensils'
  },
  {
    id: 't4',
    title: 'Acesso Restrito',
    content: 'O resort Royal Palm Plaza é restrito a hóspedes. Crachá é obrigatório em todas as áreas.',
    icon: 'Lock'
  },
];

export const HOTEL_GUESTS = [
  {
    hotel: 'Royal Palm Plaza',
    guests: ['Ivana', 'Lorena Costa', 'Ana Cristina'],
    room: '01 Triplo'
  },
  {
    hotel: 'Hotel Tower Anhanguera',
    guests: ['Eduardo Fontana', 'Nathália'],
    room: '01 Double Casal'
  },
  {
    hotel: 'Hotel Contemporâneo',
    guests: ['George'],
    room: '01 Single Superior'
  }
];

export const INCLUSIONS = [
  'Coquetel e jantar de Abertura ( bebidas alcoólicas) no dia 13.05',
  'Almoços (bebidas não alcoólicas) nos dias 14 e 15.05',
  'Jantar (bebidas alcoólicas) no dia 15.05',
  '04 coffee breaks na área da ExpoCONAC',
  'AVISO: Nenhuma inscrição tem almoço no dia 13 nem jantar no dia 14.'
];

export interface FlightInfo {
  type: 'Ida' | 'Volta';
  airline: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  flightNumber: string;
  locator: string;
  details: string;
  boardingTime: string;
  arrivalRecommendation: string;
}

export const FLIGHTS: FlightInfo[] = [
  {
    type: 'Ida',
    airline: 'Azul',
    origin: 'Curitiba',
    originCode: 'CWB',
    destination: 'Campinas',
    destinationCode: 'VCP',
    date: '13 Mai 2026',
    departureTime: '20:55',
    arrivalTime: '21:55',
    flightNumber: 'AD 2966',
    locator: 'WKZJVC',
    details: 'Avião 295, Família Azul',
    boardingTime: '20:15',
    arrivalRecommendation: 'Chegar ao aeroporto até às 19:30',
  },
  {
    type: 'Volta',
    airline: 'Azul',
    origin: 'Campinas',
    originCode: 'VCP',
    destination: 'Curitiba',
    destinationCode: 'CWB',
    date: '15 Mai 2026',
    departureTime: '19:15',
    arrivalTime: '20:15',
    flightNumber: 'AD 4546',
    locator: 'HR2W3E',
    details: 'Avião 295, Família Azul',
    boardingTime: '18:35',
    arrivalRecommendation: 'Chegar ao aeroporto até às 17:45',
  }
];
