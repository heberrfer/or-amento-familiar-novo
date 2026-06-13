/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CategoryConfig, Transaction, CategoryBudget } from './types';

export const CATEGORIES: CategoryConfig[] = [
  // Receitas (Income)
  {
    id: 'salario',
    name: 'Salário',
    color: '#059669', // Emerald 600
    textColor: 'text-emerald-700 dark:text-emerald-300',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    type: 'income',
    iconName: 'DollarSign'
  },
  {
    id: 'freelance',
    name: 'Freelance / Extra',
    color: '#10b981', // Emerald 500
    textColor: 'text-teal-700 dark:text-teal-300',
    bgColor: 'bg-teal-50 dark:bg-teal-950/30',
    type: 'income',
    iconName: 'Wrench'
  },
  {
    id: 'investimentos_receita',
    name: 'Rendimentos',
    color: '#06b6d4', // Cyan 500
    textColor: 'text-cyan-700 dark:text-cyan-300',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/30',
    type: 'income',
    iconName: 'TrendingUp'
  },

  // Despesas (Expense)
  {
    id: 'alimentacao',
    name: 'Alimentação',
    color: '#f97316', // Orange 500
    textColor: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    type: 'expense',
    iconName: 'Utensils'
  },
  {
    id: 'moradia',
    name: 'Moradia / Aluguel',
    color: '#3b82f6', // Blue 500
    textColor: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    type: 'expense',
    iconName: 'Home'
  },
  {
    id: 'transporte',
    name: 'Transporte',
    color: '#8b5cf6', // Violet 500
    textColor: 'text-violet-700 dark:text-violet-300',
    bgColor: 'bg-violet-50 dark:bg-violet-950/30',
    type: 'expense',
    iconName: 'Car'
  },
  {
    id: 'saude',
    name: 'Saúde / Farmácia',
    color: '#ef4444', // Red 500
    textColor: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    type: 'expense',
    iconName: 'HeartPulse'
  },
  {
    id: 'lazer',
    name: 'Lazer / Viagem',
    color: '#ec4899', // Pink 500
    textColor: 'text-pink-700 dark:text-pink-300',
    bgColor: 'bg-pink-50 dark:bg-pink-950/30',
    type: 'expense',
    iconName: 'Palmtree'
  },
  {
    id: 'educacao',
    name: 'Educação',
    color: '#eab308', // Yellow 500
    textColor: 'text-yellow-700 dark:text-yellow-300',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
    type: 'expense',
    iconName: 'GraduationCap'
  },
  {
    id: 'servicos',
    name: 'Serviços / Assinaturas',
    color: '#6366f1', // Indigo 500
    textColor: 'text-indigo-700 dark:text-indigo-300',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
    type: 'expense',
    iconName: 'Tv2'
  },
  {
    id: 'outros',
    name: 'Outros / Diversos',
    color: '#64748b', // Slate 500
    textColor: 'text-slate-700 dark:text-slate-300',
    bgColor: 'bg-slate-50 dark:bg-slate-950/30',
    type: 'both',
    iconName: 'HelpCircle'
  }
];

export const PAYMENT_METHODS = [
  'Pix',
  'Dinheiro',
  'Cartão de Crédito',
  'Cartão de Débito',
  'Boleto Bancário',
  'Transferência (TED/DOC)'
];

export const INITIAL_BUDGETS: CategoryBudget[] = [
  { category: 'alimentacao', limit: 1200 },
  { category: 'moradia', limit: 2500 },
  { category: 'transporte', limit: 500 },
  { category: 'saude', limit: 400 },
  { category: 'lazer', limit: 600 },
  { category: 'servicos', limit: 300 },
  { category: 'outros', limit: 400 }
];

// Seed initial transactions reflecting realistic family amounts for June 2026.
export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 't-1',
    description: 'Salário Cláudia (Empresa Tech)',
    amount: 5800,
    type: 'income',
    category: 'salario',
    date: '2026-06-01',
    paymentMethod: 'Transferência (TED/DOC)',
    notes: 'Salário regular mensal líquido'
  },
  {
    id: 't-2',
    description: 'Salário Roberto (Indústria)',
    amount: 4500,
    type: 'income',
    category: 'salario',
    date: '2026-06-05',
    paymentMethod: 'Transferência (TED/DOC)',
    notes: 'Salário Roberto'
  },
  {
    id: 't-3',
    description: 'Freelance Design de Site',
    amount: 1200,
    type: 'income',
    category: 'freelance',
    date: '2026-06-10',
    paymentMethod: 'Pix',
    notes: 'Projeto landing page cliente'
  },
  {
    id: 't-4',
    description: 'Rendimento Poupança & CDB',
    amount: 145.50,
    type: 'income',
    category: 'investimentos_receita',
    date: '2026-06-12',
    paymentMethod: 'Transferência (TED/DOC)',
    notes: 'Rendimento mensal automático'
  },
  {
    id: 't-5',
    description: 'Aluguel do Apartamento',
    amount: 2200,
    type: 'expense',
    category: 'moradia',
    date: '2026-06-05',
    paymentMethod: 'Pix',
    notes: 'Incluso taxa condominial básica'
  },
  {
    id: 't-6',
    description: 'Supermercado Mensal (Carrefour)',
    amount: 840.35,
    type: 'expense',
    category: 'alimentacao',
    date: '2026-06-06',
    paymentMethod: 'Cartão de Crédito',
    notes: 'Compra do mês com produtos de limpeza'
  },
  {
    id: 't-7',
    description: 'Conta de Energia (Enel)',
    amount: 215.40,
    type: 'expense',
    category: 'moradia',
    date: '2026-06-10',
    paymentMethod: 'Boleto Bancário',
    notes: 'Consumo do mês de Maio'
  },
  {
    id: 't-8',
    description: 'Combustível Carro Família',
    amount: 180,
    type: 'expense',
    category: 'transporte',
    date: '2026-06-04',
    paymentMethod: 'Cartão de Débito',
    notes: 'Gasolina aditivada Posto Ipiranga'
  },
  {
    id: 't-9',
    description: 'Plano de Saúde Familiar',
    amount: 350,
    type: 'expense',
    category: 'saude',
    date: '2026-06-02',
    paymentMethod: 'Boleto Bancário',
    notes: 'Mensalidade Unimed coparticipativo'
  },
  {
    id: 't-10',
    description: 'Jantar de Casal (Pizzaria Di Bari)',
    amount: 145,
    type: 'expense',
    category: 'lazer',
    date: '2026-06-08',
    paymentMethod: 'Pix',
    notes: 'Comemoração de aniversário'
  },
  {
    id: 't-11',
    description: 'Streaming Netflix',
    amount: 55.90,
    type: 'expense',
    category: 'servicos',
    date: '2026-06-05',
    paymentMethod: 'Cartão de Crédito',
    notes: 'Assinatura mensal Premium 4K'
  },
  {
    id: 't-12',
    description: 'Streaming Spotify Family',
    amount: 34.90,
    type: 'expense',
    category: 'servicos',
    date: '2026-06-05',
    paymentMethod: 'Cartão de Crédito',
    notes: 'Assinatura Spotify Premium'
  },
  {
    id: 't-13',
    description: 'Padaria e Feira Semanal',
    amount: 95.20,
    type: 'expense',
    category: 'alimentacao',
    date: '2026-06-11',
    paymentMethod: 'Dinheiro',
    notes: 'Frutas, legumes e pãezinhos'
  },
  {
    id: 't-14',
    description: 'Consulta Odonto Roberto',
    amount: 120,
    type: 'expense',
    category: 'saude',
    date: '2026-06-09',
    paymentMethod: 'Pix',
    notes: 'Limpeza de rotina'
  },
  {
    id: 't-15',
    description: 'Uber (Ida e Volta ao Shopping)',
    amount: 45.80,
    type: 'expense',
    category: 'transporte',
    date: '2026-06-07',
    paymentMethod: 'Cartão de Crédito',
    notes: 'UberX de fim de semana'
  }
];
