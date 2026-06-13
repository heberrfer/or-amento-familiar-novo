/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string; // YYYY-MM-DD
  paymentMethod?: string;
  notes?: string;
}

export interface CategoryBudget {
  category: string;
  limit: number;
}

export interface CategoryConfig {
  id: string;
  name: string;
  color: string; // Tailwind class color or Hex
  textColor: string;
  bgColor: string;
  type: 'income' | 'expense' | 'both';
  iconName: string; // Used to reference Lucide icons
}
