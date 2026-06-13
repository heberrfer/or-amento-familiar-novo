/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DollarSign,
  Wrench,
  TrendingUp,
  TrendingDown,
  Utensils,
  Home,
  Car,
  HeartPulse,
  Palmtree,
  GraduationCap,
  Tv2,
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  Download,
  Upload,
  RefreshCw,
  X,
  CreditCard,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  PiggyBank,
  Check,
  Search,
  Filter,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Grid,
  Info
} from 'lucide-react';

import { Transaction, CategoryBudget, CategoryConfig } from './types';
import { CATEGORIES, PAYMENT_METHODS, INITIAL_BUDGETS, INITIAL_TRANSACTIONS } from './constants';

// Helper to render dynamic category icons
function getCategoryIcon(iconName: string, className = "w-5 h-5") {
  const IconProps = { className };
  switch (iconName) {
    case 'DollarSign': return <DollarSign {...IconProps} />;
    case 'Wrench': return <Wrench {...IconProps} />;
    case 'TrendingUp': return <TrendingUp {...IconProps} />;
    case 'Utensils': return <Utensils {...IconProps} />;
    case 'Home': return <Home {...IconProps} />;
    case 'Car': return <Car {...IconProps} />;
    case 'HeartPulse': return <HeartPulse {...IconProps} />;
    case 'Palmtree': return <Palmtree {...IconProps} />;
    case 'GraduationCap': return <GraduationCap {...IconProps} />;
    case 'Tv2': return <Tv2 {...IconProps} />;
    default: return <HelpCircle {...IconProps} />;
  }
}

const THEME_STYLES = {
  branco: {
    bg: 'bg-slate-50/70',
    textMain: 'text-slate-800',
    textMuted: 'text-slate-400',
    textMutedLighter: 'text-slate-500',
    headerBg: 'bg-white/90 border-slate-200/80',
    card: 'bg-white border-slate-200/60 shadow-xs hover:shadow-md transition-shadow duration-200',
    border: 'border-slate-100',
    borderInput: 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500',
    textHeading: 'text-slate-900',
    textSub: 'text-slate-500',
    inputBg: 'bg-slate-50/50',
    inputText: 'text-slate-900',
    accentButton: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/10 hover:shadow-lg',
    accentSecButton: 'bg-slate-100 hover:bg-slate-200 text-slate-800',
    navWrapper: 'bg-slate-100 border-slate-200/50 text-slate-800',
    pillWrapper: 'bg-slate-50 border-slate-200',
    pillActive: 'bg-white text-indigo-600 shadow-xs',
    pillInactive: 'text-slate-400 hover:text-slate-700',
    tableHeaderRow: 'text-slate-400 border-slate-100',
    tableRowBorder: 'border-slate-100/50',
    tableRowHover: 'hover:bg-slate-50/50',
    badge: 'bg-slate-100 text-slate-700',
    themeTabActive: 'bg-indigo-600 text-white shadow-xs font-semibold',
    themeTabInactive: 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
  },
  preto: {
    bg: 'bg-neutral-950',
    textMain: 'text-neutral-250',
    textMuted: 'text-neutral-500',
    textMutedLighter: 'text-neutral-400',
    headerBg: 'bg-neutral-900/95 border-neutral-800',
    card: 'bg-neutral-900 border-neutral-800 shadow-xs hover:bg-neutral-900/95 transition-all duration-200',
    border: 'border-neutral-800',
    borderInput: 'border-neutral-800 focus:border-neutral-700 focus:ring-neutral-700',
    textHeading: 'text-white',
    textSub: 'text-neutral-450',
    inputBg: 'bg-neutral-950',
    inputText: 'text-neutral-100',
    accentButton: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/10 hover:shadow-lg',
    accentSecButton: 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300',
    navWrapper: 'bg-neutral-850 border-neutral-800 text-neutral-100',
    pillWrapper: 'bg-neutral-950 border-neutral-800',
    pillActive: 'bg-neutral-800 text-indigo-450 shadow-xs',
    pillInactive: 'text-neutral-450 hover:text-neutral-250',
    tableHeaderRow: 'text-neutral-500 border-neutral-800',
    tableRowBorder: 'border-neutral-850/60',
    tableRowHover: 'hover:bg-neutral-900/55',
    badge: 'bg-neutral-850 text-neutral-300',
    themeTabActive: 'bg-neutral-100 text-neutral-900 font-bold',
    themeTabInactive: 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850'
  },
  copa: {
    bg: 'bg-emerald-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(234,179,8,0.18),rgba(0,0,0,0))]',
    textMain: 'text-lime-50',
    textMuted: 'text-yellow-400/80',
    textMutedLighter: 'text-yellow-300',
    headerBg: 'bg-emerald-900/95 border-b border-amber-500/50 shadow-md',
    card: 'bg-emerald-900/90 border-amber-500/35 shadow-xl shadow-emerald-950/20 hover:border-amber-400 transition-all duration-200',
    border: 'border-emerald-800/60',
    borderInput: 'border-amber-500/40 focus:border-yellow-400 focus:ring-yellow-400',
    textHeading: 'text-amber-300 font-display',
    textSub: 'text-yellow-400 font-semibold',
    inputBg: 'bg-emerald-950/70',
    inputText: 'text-yellow-50',
    accentButton: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 border border-blue-500/40',
    accentSecButton: 'bg-yellow-500 hover:bg-yellow-400 text-emerald-950 font-bold',
    navWrapper: 'bg-emerald-950/90 border-emerald-800/80 text-yellow-300',
    pillWrapper: 'bg-emerald-950/80 border border-amber-500/30',
    pillActive: 'bg-yellow-500 text-emerald-950 font-bold',
    pillInactive: 'text-lime-300 hover:text-white',
    tableHeaderRow: 'text-yellow-400/90 border-emerald-800/80',
    tableRowBorder: 'border-emerald-850',
    tableRowHover: 'hover:bg-emerald-900/40',
    badge: 'bg-blue-950/60 text-blue-300 border border-blue-500/30',
    themeTabActive: 'bg-yellow-500 text-emerald-950 font-extrabold shadow-md',
    themeTabInactive: 'text-lime-100 hover:bg-emerald-800 hover:text-white'
  }
};

export default function App() {
  // --- THEME STATE ---
  const [themeKey, setThemeKey] = useState<'branco' | 'preto' | 'copa'>(() => {
    const saved = localStorage.getItem('fam_budget_theme');
    return (saved as 'branco' | 'preto' | 'copa') || 'branco';
  });

  const currentTheme = THEME_STYLES[themeKey] || THEME_STYLES.branco;

  // Sync state to LocalStorage and root class for dark utilities
  useEffect(() => {
    localStorage.setItem('fam_budget_theme', themeKey);
    if (themeKey === 'preto') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeKey]);

  // --- STATE ---
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('fam_budget_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState<CategoryBudget[]>(() => {
    const saved = localStorage.getItem('fam_budget_limits');
    return saved ? JSON.parse(saved) : INITIAL_BUDGETS;
  });

  // Default to June 2026 to showcase the gorgeous initial data
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<number>(6); // 1-indexed (June)

  // Transaction form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [desc, setDesc] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('alimentacao');
  const [date, setDate] = useState('2026-06-13');
  const [paymentMethod, setPaymentMethod] = useState('Pix');
  const [notes, setNotes] = useState('');

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'>('date-desc');

  // Interactive budget setup state
  const [newBudgetCategory, setNewBudgetCategory] = useState('alimentacao');
  const [newBudgetLimit, setNewBudgetLimit] = useState('');

  // Modals / Toast Notification helper
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  
  // File import ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('fam_budget_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('fam_budget_limits', JSON.stringify(budgets));
  }, [budgets]);

  // Dynamic set of available years in current transactions for dropdown
  const yearOptions = useMemo(() => {
    const years = transactions.map(t => new Date(t.date).getFullYear());
    const uniqueYears: number[] = Array.from(new Set(years));
    if (!uniqueYears.includes(2026)) uniqueYears.push(2026);
    return uniqueYears.sort((a, b) => b - a);
  }, [transactions]);

  // Months name array
  const monthsList = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Show status toasts
  const triggerFeedback = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  // Switch month navigation helper
  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  // --- DERIVED MEMOIZED VALUES ---
  
  // Filtered transactions for the currently selected Month & Year
  const currentMonthTransactions = useMemo(() => {
    return transactions.filter(t => {
      const tDate = new Date(t.date + 'T00:00:00'); // Prevent timezone offset shift
      return tDate.getFullYear() === selectedYear && (tDate.getMonth() + 1) === selectedMonth;
    });
  }, [transactions, selectedYear, selectedMonth]);

  // Aggregate monthly values
  const monthlyMetrics = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    currentMonthTransactions.forEach(t => {
      if (t.type === 'income') {
        totalIncome += t.amount;
      } else {
        totalExpense += t.amount;
      }
    });

    const balance = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    return {
      totalIncome,
      totalExpense,
      balance,
      savingsRate
    };
  }, [currentMonthTransactions]);

  // Expense distribution by category
  const expenseByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    const categoriesDetails = CATEGORIES.reduce((acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    }, {} as Record<string, CategoryConfig>);

    // Initialize all expense categories to 0
    CATEGORIES.filter(c => c.type === 'expense' || c.type === 'both').forEach(c => {
      map[c.id] = 0;
    });

    currentMonthTransactions.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

    // Format for easy listing/charts
    const result = Object.entries(map)
      .map(([catId, amount]) => {
        const config = categoriesDetails[catId] || {
          name: catId,
          color: '#64748b',
          textColor: 'text-slate-700',
          bgColor: 'bg-slate-50',
          iconName: 'HelpCircle'
        };
        return {
          id: catId,
          name: config.name,
          amount,
          color: config.color,
          textColor: config.textColor,
          bgColor: config.bgColor,
          iconName: config.iconName
        };
      })
      .filter(item => item.amount > 0)
      .sort((a, b) => b.amount - a.amount);

    return result;
  }, [currentMonthTransactions]);

  // Total expenses with limits progress checks
  const categoryBudgetStatus = useMemo(() => {
    const expenseMap: Record<string, number> = {};
    currentMonthTransactions.filter(t => t.type === 'expense').forEach(t => {
      expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
    });

    return budgets.map(b => {
      const spent = expenseMap[b.category] || 0;
      const pct = b.limit > 0 ? (spent / b.limit) * 100 : 0;
      const config = CATEGORIES.find(c => c.id === b.category) || {
        name: b.category,
        color: '#64748b',
        textColor: 'text-slate-700',
        bgColor: 'bg-slate-50',
        iconName: 'HelpCircle'
      };

      return {
        category: b.category,
        name: config.name,
        limit: b.limit,
        spent,
        pct,
        remaining: b.limit - spent,
        config
      };
    }).sort((a, b) => b.pct - a.pct); // Highlight those closest to limit first
  }, [currentMonthTransactions, budgets]);

  // Filter & sort for the visual ledger list
  const filteredTransactionsList = useMemo(() => {
    let result = [...currentMonthTransactions];

    // Apply category filter
    if (filterCategory !== 'all') {
      result = result.filter(t => t.category === filterCategory);
    }

    // Apply type filter
    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }

    // Apply text search filter (matches description or tags/notes)
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(q) || 
        (t.notes && t.notes.toLowerCase().includes(q)) ||
        (t.paymentMethod && t.paymentMethod.toLowerCase().includes(q))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime() || b.id.localeCompare(a.id);
      }
      if (sortBy === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime() || a.id.localeCompare(b.id);
      }
      if (sortBy === 'amount-desc') {
        return b.amount - a.amount;
      }
      if (sortBy === 'amount-asc') {
        return a.amount - b.amount;
      }
      return 0;
    });

    return result;
  }, [currentMonthTransactions, filterCategory, filterType, searchTerm, sortBy]);

  // Set initial category when transaction type toggle changes
  useEffect(() => {
    const filteredCats = CATEGORIES.filter(c => c.type === type || c.type === 'both');
    if (filteredCats.length > 0 && !filteredCats.some(c => c.id === category)) {
      setCategory(filteredCats[0].id);
    }
  }, [type]);

  // Sync default date with month selector changes
  useEffect(() => {
    const pad = (num: number) => num.toString().padStart(2, '0');
    // Ensure date reflects selected month and year
    setDate(`${selectedYear}-${pad(selectedMonth)}-15`);
  }, [selectedYear, selectedMonth]);

  // --- ACTIONS ---

  // Handle transaction save (create or update)
  const handleSaveTransaction = (e: FormEvent) => {
    e.preventDefault();

    if (!desc.trim()) {
      triggerFeedback('Por favor, preencha a descrição.', 'error');
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      triggerFeedback('Por favor, insira um valor monetário válido maior que zero.', 'error');
      return;
    }

    if (!date) {
      triggerFeedback('Por favor, selecione uma data.', 'error');
      return;
    }

    // Auto update selected month view to match transaction date to avoid confusion
    const transDate = new Date(date + 'T00:00:00');
    const transYr = transDate.getFullYear();
    const transMth = transDate.getMonth() + 1;

    if (editingId) {
      // Update
      setTransactions(prev => prev.map(t => t.id === editingId ? {
        id: editingId,
        description: desc,
        amount: numValue,
        type,
        category,
        date,
        paymentMethod,
        notes: notes.trim() || undefined
      } : t));
      triggerFeedback('Lançamento atualizado com sucesso!', 'success');
      setEditingId(null);
    } else {
      // Create new
      const newTrans: Transaction = {
        id: `t-${Date.now()}`,
        description: desc,
        amount: numValue,
        type,
        category,
        date,
        paymentMethod,
        notes: notes.trim() || undefined
      };
      setTransactions(prev => [newTrans, ...prev]);
      triggerFeedback('Lançamento adicionado com sucesso!', 'success');
    }

    // Reset inputs
    setDesc('');
    setValue('');
    setNotes('');
    
    // Switch client calendar views if they added a transaction in another month
    if (transYr !== selectedYear || transMth !== selectedMonth) {
      setSelectedYear(transYr);
      setSelectedMonth(transMth);
    }
  };

  // Load a transaction into form fields for editing
  const handleStartEdit = (tx: Transaction) => {
    setEditingId(tx.id);
    setDesc(tx.description);
    setValue(tx.amount.toString());
    setType(tx.type);
    setCategory(tx.category);
    setDate(tx.date);
    setPaymentMethod(tx.paymentMethod || 'Pix');
    setNotes(tx.notes || '');
    
    // Smooth scroll to form element on mobile sizes
    const formEl = document.getElementById('transaction-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDesc('');
    setValue('');
    setNotes('');
    triggerFeedback('Edição cancelada.', 'info');
  };

  // Delete transaction
  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    triggerFeedback('Lançamento excluído permanentemente.', 'info');
    if (editingId === id) {
      cancelEdit();
    }
  };

  // Update or set category spending budget limit
  const handleSetBudgetLimit = (e: FormEvent) => {
    e.preventDefault();
    const lmt = parseFloat(newBudgetLimit);
    if (isNaN(lmt) || lmt < 0) {
      triggerFeedback('Insira um limite válido maior ou igual a zero.', 'error');
      return;
    }

    setBudgets(prev => {
      const idx = prev.findIndex(b => b.category === newBudgetCategory);
      if (idx > -1) {
        // update
        return prev.map(b => b.category === newBudgetCategory ? { ...b, limit: lmt } : b);
      } else {
        // insert
        return [...prev, { category: newBudgetCategory, limit: lmt }];
      }
    });

    triggerFeedback(`Limite para ${CATEGORIES.find(c => c.id === newBudgetCategory)?.name} atualizado!`, 'success');
    setNewBudgetLimit('');
  };

  // Remove individual category budget limit override
  const handleRemoveBudgetLimit = (categoryKey: string) => {
    setBudgets(prev => prev.filter(b => b.category !== categoryKey));
    triggerFeedback('Limite de categoria removido.', 'info');
  };

  // Entire Database reset options
  const handleResetToSeeds = () => {
    if (window.confirm('Deseja mesmo redefinir todos os lançamentos para os valores exemplo de Junho de 2026? Seus dados atuais serão apagados.')) {
      setTransactions(INITIAL_TRANSACTIONS);
      setBudgets(INITIAL_BUDGETS);
      setSelectedYear(2026);
      setSelectedMonth(6);
      triggerFeedback('Exemplos de orçamento restaurados!', 'success');
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('Tem certeza absoluta de que deseja limpar TODOS os dados? Esta ação é irreversível.')) {
      setTransactions([]);
      setBudgets([]);
      triggerFeedback('Todos os dados foram eliminados.', 'info');
    }
  };

  // Backup System: JSON export download
  const handleExportJSON = () => {
    const dataStr = JSON.stringify({ transactions, budgets }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orcamento-familiar-${selectedYear}-${selectedMonth}.json`;
    link.click();
    URL.revokeObjectURL(url);
    triggerFeedback('Planilha JSON baixada com sucesso!', 'success');
  };

  // Backup System: JSON import upload file
  const handleImportJSON = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed.transactions)) {
          setTransactions(parsed.transactions);
          if (Array.isArray(parsed.budgets)) {
            setBudgets(parsed.budgets);
          }
          triggerFeedback('Dados importados e salvos localmente!', 'success');
        } else {
          triggerFeedback('Formato de arquivo JSON inválido.', 'error');
        }
      } catch (err) {
        triggerFeedback('Erro ao ler ou processar o JSON.', 'error');
      }
    };
    reader.readAsText(file);
    // Clear input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Safe category color background mapping for the doughnut/progress pie
  const getCategoryColor = (catId: string) => {
    return CATEGORIES.find(c => c.id === catId)?.color || '#64748b';
  };

  // Pie chart sector calculations for 100% distribution circle path
  const pieChartElements = useMemo(() => {
    const totalExp = expenseByCategory.reduce((sum, item) => sum + item.amount, 0);
    if (totalExp === 0) return null;

    let accumulatedPercentage = 0;
    return expenseByCategory.map((item, idx) => {
      const percentage = (item.amount / totalExp) * 100;
      const startAngle = (accumulatedPercentage / 100) * 360;
      accumulatedPercentage += percentage;
      const endAngle = (accumulatedPercentage / 100) * 360;

      // Coordinate helper functions
      const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
        return {
          x: centerX + radius * Math.cos(angleInRadians),
          y: centerY + radius * Math.sin(angleInRadians),
        };
      };

      const x = 100, y = 100, r = 70;
      const start = polarToCartesian(x, y, r, endAngle);
      const end = polarToCartesian(x, y, r, startAngle);
      const largeArcFlag = percentage > 50 ? "1" : "0";

      // Path template for SVG Pie ring/stroke sector
      const d = [
        "M", start.x, start.y,
        "A", r, r, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");

      return {
        ...item,
        percentage,
        pathD: d,
        color: item.color
      };
    });
  }, [expenseByCategory]);

  return (
    <div className={`min-h-screen font-sans antialiased pb-24 transition-colors duration-200 ${currentTheme.bg} ${currentTheme.textMain}`}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 shadow-xl rounded-xl border max-w-md w-11/12"
            style={{
              backgroundColor: feedback.type === 'success' ? '#f0fdf4' : feedback.type === 'error' ? '#fef2f2' : '#f0f9ff',
              borderColor: feedback.type === 'success' ? '#bbf7d0' : feedback.type === 'error' ? '#fecaca' : '#bae6fd',
              color: feedback.type === 'success' ? '#14532d' : feedback.type === 'error' ? '#7f1d1d' : '#0c4a6e',
            }}
          >
            {feedback.type === 'success' && <Check className="w-5 h-5 flex-shrink-0 text-emerald-600" />}
            {feedback.type === 'error' && <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600" />}
            {feedback.type === 'info' && <Info className="w-5 h-5 flex-shrink-0 text-cyan-600" />}
            <span className="text-sm font-medium leading-tight">{feedback.message}</span>
            <button 
              onClick={() => setFeedback(null)} 
              className="ml-auto p-1 rounded-lg hover:bg-black/5 flex-shrink-0 transition-colors"
              aria-label="Dispensar"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Control Bar/Navbar */}
      <header className={`sticky top-0 backdrop-blur-md z-10 py-4 px-4 sm:px-8 border-b transition-colors duration-200 ${currentTheme.headerBg}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Title */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${themeKey === 'copa' ? 'bg-yellow-500 text-emerald-950 shadow-yellow-500/15' : 'bg-emerald-600 shadow-emerald-600/15'}`}>
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h1 className={`text-xl font-bold tracking-tight font-display ${currentTheme.textHeading}`}>
                Controle de Orçamento Familiar {themeKey === 'copa' && '🏆⚽'}
              </h1>
              <p className={`text-xs ${currentTheme.textSub}`}>
                Lançamentos de Despesas, Receitas e Metas Ativas
              </p>
            </div>
          </div>

          {/* Month/Year Selection Navigation & Theme Selector */}
          <div className="flex flex-col sm:flex-row gap-2.5 items-center self-center md:self-auto">
            <div className={`flex items-center justify-center sm:justify-start gap-1 rounded-xl p-1 shadow-xs border transition-colors duration-200 ${currentTheme.navWrapper}`}>
              <button
                onClick={handlePrevMonth}
                className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-white/10 dark:hover:bg-slate-700/50 rounded-lg transition-all"
                title="Mês anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1.5 px-3 min-w-[170px] text-center justify-center">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer border-none"
                >
                  {monthsList.map((m, idx) => (
                    <option key={m} value={idx + 1} className={themeKey === 'copa' ? 'bg-emerald-900 text-yellow-50' : 'dark:bg-slate-800 text-slate-800 dark:text-white'}>{m}</option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer border-none"
                >
                  {yearOptions.map(y => (
                    <option key={y} value={y} className={themeKey === 'copa' ? 'bg-emerald-900 text-yellow-50' : 'dark:bg-slate-800 text-slate-800 dark:text-white'}>{y}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleNextMonth}
                className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-white/10 dark:hover:bg-slate-700/50 rounded-lg transition-all"
                title="Próximo mês"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Selector de Temas */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border transition-all duration-200 ${currentTheme.pillWrapper}`}>
              <button
                type="button"
                onClick={() => setThemeKey('branco')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  themeKey === 'branco'
                    ? currentTheme.themeTabActive
                    : currentTheme.themeTabInactive
                }`}
                title="Tema Branco (Clássico)"
              >
                <span>⚪</span>
                <span className="hidden sm:inline">Branco</span>
              </button>
              <button
                type="button"
                onClick={() => setThemeKey('preto')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  themeKey === 'preto'
                    ? currentTheme.themeTabActive
                    : currentTheme.themeTabInactive
                }`}
                title="Tema Preto (Escuro)"
              >
                <span>⚫</span>
                <span className="hidden sm:inline">Preto</span>
              </button>
              <button
                type="button"
                onClick={() => setThemeKey('copa')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  themeKey === 'copa'
                    ? currentTheme.themeTabActive
                    : currentTheme.themeTabInactive
                }`}
                title="Tema Copa do Mundo (Brasil GP)"
              >
                <span>🇧🇷</span>
                <span className="hidden sm:inline">Copa</span>
              </button>
            </div>
          </div>

          {/* Backup Database Actions */}
          <div className="flex items-center justify-center sm:justify-end gap-2 text-xs flex-wrap">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-all cursor-pointer shadow-xs"
              title="Exportar todos os dados em arquivo"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-all cursor-pointer shadow-xs"
              title="Importar dados de um arquivo backup"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Importar</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJSON}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={handleResetToSeeds}
              className="flex items-center gap-1.5 px-3 py-2 border border-cyan-200 hover:border-cyan-300 bg-cyan-50/50 hover:bg-cyan-50 text-cyan-800 dark:border-cyan-950/50 dark:bg-cyan-950/20 dark:text-cyan-300 dark:hover:bg-cyan-950/40 rounded-lg font-medium transition-all cursor-pointer shadow-xs"
              title="Restaurar dados de demonstração padrão"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restaurar Demonstrativo</span>
            </button>

            <button
              onClick={handleClearAllData}
              className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-950/50"
              title="Apagar dados"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-6 grid grid-cols-1 gap-6">

        {/* SECTION 1: MONTHLY KPIs BANNER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card: Current Balance */}
          <motion.div
            whileHover={{ y: -2 }}
            className={`p-5 rounded-2xl border flex items-center justify-between shadow-xs transition-shadow hover:shadow-md ${currentTheme.card}`}
          >
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textMuted}`}>
                Saldo Mensal
              </span>
              <h3 className={`text-2xl font-bold mt-1 font-display tracking-tight ${monthlyMetrics.balance >= 0 ? 'text-emerald-500' : 'text-rose-600 dark:text-rose-400'}`}>
                {monthlyMetrics.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </h3>
              <p className={`text-xs mt-1 ${currentTheme.textMutedLighter}`}>
                Ganhos menos Gastos no mês
              </p>
            </div>
            <div className={`p-3.5 rounded-xl ${monthlyMetrics.balance >= 0 ? (themeKey === 'copa' ? 'bg-yellow-400/20 text-yellow-300' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400') : 'bg-rose-0/20 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'}`}>
              <PiggyBank className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Card: Total Earnings */}
          <motion.div
            whileHover={{ y: -2 }}
            className={`p-5 rounded-2xl border flex items-center justify-between ${currentTheme.card}`}
          >
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textMuted}`}>
                Receitas (Ganhos)
              </span>
              <h3 className="text-2xl font-bold mt-1 font-display tracking-tight text-emerald-500">
                {monthlyMetrics.totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </h3>
              <p className="text-xs text-emerald-500/80 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Entradas este mês</span>
              </p>
            </div>
            <div className={`p-3.5 rounded-xl ${themeKey === 'copa' ? 'bg-yellow-400/20 text-yellow-300' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400'}`}>
              <TrendingUp className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Card: Total Expenses */}
          <motion.div
            whileHover={{ y: -2 }}
            className={`p-5 rounded-2xl border flex items-center justify-between ${currentTheme.card}`}
          >
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textMuted}`}>
                Despesas (Gastos)
              </span>
              <h3 className="text-2xl font-bold mt-1 font-display tracking-tight text-rose-500">
                {monthlyMetrics.totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </h3>
              <p className="text-xs text-rose-500/80 mt-1 flex items-center gap-1">
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>Saídas este mês</span>
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-500/10 text-rose-500">
              <TrendingDown className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Card: Savings Rate / Safety Margin */}
          <motion.div
            whileHover={{ y: -2 }}
            className={`p-5 rounded-2xl border flex items-center justify-between ${currentTheme.card}`}
          >
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.textMuted}`}>
                Margem de Poupança
              </span>
              <h3 className={`text-2xl font-bold mt-1 font-display tracking-tight ${monthlyMetrics.savingsRate >= 15 ? 'text-emerald-500' : monthlyMetrics.savingsRate >= 0 ? 'text-amber-500' : 'text-red-500'}`}>
                {monthlyMetrics.totalIncome > 0 ? `${monthlyMetrics.savingsRate.toFixed(1)}%` : '0%'}
              </h3>
              <p className={`text-xs mt-1 ${currentTheme.textMutedLighter}`}>
                {monthlyMetrics.savingsRate > 0 
                  ? 'Sobrou das receitas do mês' 
                  : monthlyMetrics.totalIncome === 0 
                    ? 'Sem receitas registradas' 
                    : 'Gasto superior ao ganho'}
              </p>
            </div>
            <div className={`p-3.5 rounded-xl ${monthlyMetrics.savingsRate >= 15 ? (themeKey === 'copa' ? 'bg-yellow-400/20 text-yellow-300' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400') : 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400'}`}>
              <DollarSign className="w-6 h-6" />
            </div>
          </motion.div>

        </div>

        {/* SECTION 2: GRID FOR FORMS, LIMITS, AND CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* A: NOVO LANÇAMENTO (TRANSACTION FORM) - Takes 1 column */}
          <div id="transaction-form" className={`p-6 rounded-2xl border transition-all duration-200 ${currentTheme.card}`}>
            <div className={`flex items-center justify-between border-b pb-3 mb-4 ${currentTheme.border}`}>
              <h2 className={`text-md font-bold tracking-tight flex items-center gap-2 ${currentTheme.textHeading}`}>
                <span className={`w-2.5 h-2.5 rounded-full ${themeKey === 'copa' ? 'bg-yellow-400' : 'bg-emerald-500'}`}></span>
                {editingId ? 'Editar Lançamento' : 'Novo Lançamento'}
              </h2>
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className={`text-xs flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${currentTheme.tabInactive || 'text-slate-400 hover:text-slate-600'}`}
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancelar</span>
                </button>
              )}
            </div>

            <form onSubmit={handleSaveTransaction} className="space-y-4">
              
              {/* Toggle Gasto vs Ganho */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${currentTheme.textMuted}`}>
                  Tipo de Transação
                </label>
                <div className={`grid grid-cols-2 gap-2 p-1 rounded-xl border transition-all duration-200 ${currentTheme.pillWrapper}`}>
                  <button
                    type="button"
                    onClick={() => setType('expense')}
                    className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                      type === 'expense'
                        ? (themeKey === 'copa' ? 'bg-yellow-400 text-emerald-950 shadow-xs' : 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs')
                        : (themeKey === 'copa' ? 'text-emerald-100 hover:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200')
                    }`}
                  >
                    Despesa (Gasto)
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('income')}
                    className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                      type === 'income'
                        ? (themeKey === 'copa' ? 'bg-yellow-500 text-emerald-950 shadow-xs' : 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs')
                        : (themeKey === 'copa' ? 'text-emerald-100 hover:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200')
                    }`}
                  >
                    Receita (Ganho)
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description-input" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${currentTheme.textMuted}`}>
                  Descrição / Detalhe
                </label>
                <input
                  id="description-input"
                  type="text"
                  placeholder="Ex: Compra de supermercado, Salário, etc."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2.5 text-sm font-medium focus:outline-none transition-all ${currentTheme.inputBg} ${currentTheme.inputText} ${currentTheme.inputBorder}`}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Value */}
                <div>
                  <label htmlFor="value-input" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${currentTheme.textMuted}`}>
                    Valor (R$)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">R$</span>
                    <input
                      id="value-input"
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0,00"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className={`w-full border rounded-xl pl-8 pr-3 py-2.5 text-sm font-semibold focus:outline-none transition-all ${currentTheme.inputBg} ${currentTheme.inputText} ${currentTheme.inputBorder}`}
                      required
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date-input" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${currentTheme.textMuted}`}>
                    Data
                  </label>
                  <input
                    id="date-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full border rounded-xl px-2.5 py-2.5 text-sm font-semibold focus:outline-none transition-all ${currentTheme.inputBg} ${currentTheme.inputText} ${currentTheme.inputBorder}`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Category */}
                <div>
                  <label htmlFor="category-select" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${currentTheme.textMuted}`}>
                    Categoria
                  </label>
                  <select
                    id="category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full border rounded-xl px-2.5 py-2.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer ${currentTheme.inputBg} ${currentTheme.inputText} ${currentTheme.inputBorder}`}
                  >
                    {CATEGORIES.filter(c => c.type === type || c.type === 'both').map(c => (
                      <option key={c.id} value={c.id} className={themeKey === 'copa' ? 'bg-emerald-950 text-yellow-50' : 'dark:bg-slate-800 text-slate-900 dark:text-white'}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment Method */}
                <div>
                  <label htmlFor="paymentMethod-select" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${currentTheme.textMuted}`}>
                    Forma de Pagto
                  </label>
                  <select
                    id="paymentMethod-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={`w-full border rounded-xl px-2.5 py-2.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer ${currentTheme.inputBg} ${currentTheme.inputText} ${currentTheme.inputBorder}`}
                  >
                    {PAYMENT_METHODS.map(m => (
                      <option key={m} value={m} className={themeKey === 'copa' ? 'bg-emerald-950 text-yellow-50' : 'dark:bg-slate-800 text-slate-900 dark:text-white'}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes-area" className={`block text-xs font-bold uppercase tracking-wider mb-1 ${currentTheme.textMuted}`}>
                  Notas / Tags (Opcional)
                </label>
                <textarea
                  id="notes-area"
                  rows={2}
                  placeholder="Ex: Detalhes, parcelamento, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none transition-all resize-none ${currentTheme.inputBg} ${currentTheme.inputText} ${currentTheme.inputBorder}`}
                />
              </div>

              {/* Submit trigger */}
              <button
                type="submit"
                className={`w-full h-11 font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2 ${currentTheme.btnAction}`}
              >
                {editingId ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Salvar Alterações</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Lançar no Orçamento</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* B: RELATÓRIO DE DISTRIBUIÇÃO E GRÁFICOS - Takes 1 column */}
          <div className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between min-h-[465px] ${currentTheme.card}`}>
            
            <div>
              <div className={`border-b pb-3 mb-4 ${currentTheme.border}`}>
                <h2 className={`text-md font-bold tracking-tight ${currentTheme.textHeading}`}>
                  Distribuição de Despesas
                </h2>
                <p className={`text-xs ${currentTheme.textSub}`}>
                  Participação por categoria estipulada
                </p>
              </div>

              {/* SVG Ring/Donut Custom Chart */}
              {expenseByCategory.length > 0 ? (
                <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
                  <div className="relative w-[150px] h-[150px] flex-shrink-0">
                    <svg width="100%" height="100%" viewBox="0 0 200 200" className="transform -rotate-90">
                      {/* Empty background circle */}
                      <circle cx="100" cy="100" r="70" fill="transparent" strokeWidth="22" className={themeKey === 'copa' ? 'stroke-emerald-850' : 'stroke-slate-100 dark:stroke-slate-700'} />
                      
                      {/* Donut arcs mapping */}
                      {pieChartElements?.map((item, idx) => (
                        <path
                          key={item.id}
                          d={item.pathD || ''}
                          fill="transparent"
                          stroke={item.color}
                          strokeWidth="24"
                          className="transition-all duration-300 hover:stroke-[28px] cursor-pointer"
                          title={`${item.name}: ${item.percentage.toFixed(1)}%`}
                        />
                      ))}
                    </svg>
                    
                    {/* Centered Total label inside Ring */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className={`text-[10px] font-bold uppercase tracking-widest leading-none ${currentTheme.textMuted}`}>
                        GASTOS
                      </span>
                      <span className={`text-sm font-extrabold mt-0.5 ${currentTheme.textHeading}`}>
                        R$ {monthlyMetrics.totalExpense > 1000 
                          ? `${(monthlyMetrics.totalExpense / 1000).toFixed(1)}k` 
                          : monthlyMetrics.totalExpense.toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {/* List of categories percentages */}
                  <div className="flex-1 space-y-2.5 w-full">
                    {expenseByCategory.slice(0, 5).map((item) => {
                      const pct = monthlyMetrics.totalExpense > 0 ? (item.amount / monthlyMetrics.totalExpense) * 100 : 0;
                      return (
                        <div key={item.id} className="flex items-center justify-between text-xs font-semibold">
                          <div className="flex items-center gap-2 overflow-hidden mr-2">
                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                            <span className={`truncate ${currentTheme.textSub}`}>{item.name}</span>
                          </div>
                          <span className={`flex-shrink-0 font-mono ${currentTheme.textMuted}`}>
                            {pct.toFixed(0)}%
                          </span>
                        </div>
                      );
                    })}
                    {expenseByCategory.length > 5 && (
                      <div className={`text-[10px] text-right font-medium italic ${currentTheme.textMuted}`}>
                        + {expenseByCategory.length - 5} outras categorias
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className={`flex flex-col items-center justify-center py-12 text-center ${currentTheme.textMuted}`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${themeKey === 'copa' ? 'bg-emerald-950/60' : 'bg-slate-50 dark:bg-slate-900'}`}>
                    <Grid className="w-6 h-6 stroke-1 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium">Nenhum gasto lançado para este mês</p>
                  <p className="text-xs max-w-[200px] mt-1">Lançamentos de despesa preencherão os gráficos de pizza automaticamente.</p>
                </div>
              )}
            </div>

            {/* Micro visual: Comparing Earnings vs Expenses bar */}
            <div className={`mt-4 pt-4 border-t ${currentTheme.border}`}>
              <span className={`text-xs font-bold uppercase tracking-wider block mb-2 ${currentTheme.textMuted}`}>
                Comparativo Geral de Fluxo decrescente
              </span>
              <div className={`flex justify-between text-xs font-bold mb-1 font-mono ${currentTheme.textMuted}`}>
                <span>Receitas: {monthlyMetrics.totalIncome.toLocaleString('pt-BR')}</span>
                <span>Despesas: {monthlyMetrics.totalExpense.toLocaleString('pt-BR')}</span>
              </div>
              <div className={`w-full h-4 rounded-full overflow-hidden flex ${themeKey === 'copa' ? 'bg-emerald-950' : 'bg-slate-100 dark:bg-slate-900'}`}>
                <div 
                  className="bg-emerald-500 transition-all duration-300"
                  style={{ 
                    width: monthlyMetrics.totalIncome + monthlyMetrics.totalExpense > 0 
                      ? `${(monthlyMetrics.totalIncome / (monthlyMetrics.totalIncome + monthlyMetrics.totalExpense)) * 100}%` 
                      : '50%' 
                  }}
                  title="Gráfico Receita%"
                />
                <div 
                  className="bg-rose-500 transition-all duration-300"
                  style={{ 
                    width: monthlyMetrics.totalIncome + monthlyMetrics.totalExpense > 0 
                      ? `${(monthlyMetrics.totalExpense / (monthlyMetrics.totalIncome + monthlyMetrics.totalExpense)) * 100}%` 
                      : '50%' 
                  }}
                  title="Gráfico Despesa%"
                />
              </div>
            </div>

          </div>

          {/* C: METAS & LIMITES DE ORÇAMENTO - Takes 1 column */}
          <div className={`p-6 rounded-2xl border transition-all duration-200 min-h-[465px] ${currentTheme.card}`}>
            <div className={`border-b pb-3 mb-4 ${currentTheme.border}`}>
              <h2 className={`text-md font-bold tracking-tight ${currentTheme.textHeading}`}>
                Limites por Categoria (Metas)
              </h2>
              <p className={`text-xs ${currentTheme.textSub}`}>
                Acompanhe o teto de gastos familiar mensal
              </p>
            </div>

            {/* Quick adjust target form */}
            <form onSubmit={handleSetBudgetLimit} className="flex gap-2 mb-4">
              <select
                value={newBudgetCategory}
                onChange={(e) => setNewBudgetCategory(e.target.value)}
                className={`flex-1 border rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none cursor-pointer ${currentTheme.inputBg} ${currentTheme.inputText} ${currentTheme.inputBorder}`}
              >
                {CATEGORIES.filter(c => c.type === 'expense').map(c => (
                  <option key={c.id} value={c.id} className={themeKey === 'copa' ? 'bg-emerald-950 text-yellow-50' : 'dark:bg-slate-800 text-slate-900 dark:text-white'}>{c.name}</option>
                ))}
              </select>

              <div className="relative w-24">
                <span className="absolute left-2 top-2 text-[10px] font-bold text-slate-400">R$</span>
                <input
                  type="number"
                  placeholder="Meta"
                  value={newBudgetLimit}
                  onChange={(e) => setNewBudgetLimit(e.target.value)}
                  className={`w-full border rounded-lg pl-6 pr-1.5 py-1.5 text-xs font-semibold focus:outline-none ${currentTheme.inputBg} ${currentTheme.inputText} ${currentTheme.inputBorder}`}
                  required
                />
              </div>

              <button
                type="submit"
                className={`px-3 border rounded-lg text-xs font-bold transition-all cursor-pointer ${currentTheme.btnSecondary}`}
                title="Estipular teto de estipulado"
              >
                Definir
              </button>
            </form>

            {/* Budgets Progress List */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {categoryBudgetStatus.length > 0 ? (
                categoryBudgetStatus.map((b) => {
                  const isOver = b.spent > b.limit;
                  const isWarning90 = !isOver && b.pct >= 90;
                  const isNear80 = !isOver && b.pct >= 80 && b.pct < 90;
                  
                  return (
                    <div 
                      key={b.category} 
                      className={`group text-xs p-3 rounded-xl transition-all border ${
                        isOver 
                          ? 'bg-red-50/50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50 shadow-xs' 
                          : isWarning90 
                            ? 'bg-orange-50/50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900/40 shadow-xs' 
                            : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      
                      <div className="flex items-center justify-between font-semibold mb-1.5">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                          {getCategoryIcon(b.config.iconName, `w-4 h-4 flex-shrink-0 ${
                            isOver ? 'text-red-600 dark:text-red-400' : isWarning90 ? 'text-orange-500' : 'text-slate-500'
                          }`)}
                          <span className={`truncate font-semibold ${
                            isOver 
                              ? 'text-red-700 dark:text-red-300 font-bold' 
                              : isWarning90 
                                ? 'text-orange-700 dark:text-orange-300 font-bold' 
                                : 'text-slate-700 dark:text-slate-300'
                          }`}>
                            {b.name}
                          </span>
                          {isOver && <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 animate-pulse" />}
                          {isWarning90 && <AlertTriangle className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />}
                        </div>
                        <div className="flex items-center gap-2 font-mono flex-shrink-0 text-slate-500 dark:text-slate-400">
                          <span className={`font-semibold ${
                            isOver 
                              ? 'text-red-600 dark:text-red-400' 
                              : isWarning90 
                                ? 'text-orange-600 dark:text-orange-400' 
                                : isNear80
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : 'text-slate-900 dark:text-slate-100'
                          }`}>
                            R$ {b.spent.toFixed(0)}
                          </span>
                          <span className="text-slate-400 font-normal">/</span>
                          <span className="font-medium text-slate-500 dark:text-slate-450">
                            R$ {b.limit.toFixed(0)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveBudgetLimit(b.category)}
                            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 ml-1 select-none"
                            title="Remover limite"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Percentage progress bar */}
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-900/60 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isOver 
                              ? 'bg-rose-500' 
                              : isWarning90 
                                ? 'bg-orange-500' 
                                : isNear80 
                                  ? 'bg-amber-400' 
                                  : 'bg-indigo-500'
                          }`}
                          style={{ width: `${Math.min(b.pct, 100)}%` }}
                        />
                      </div>

                      {/* Remaining message helper line */}
                      <div className="flex justify-between items-center mt-1.5 font-medium">
                        <span className={`text-[10px] uppercase tracking-wider ${
                          isOver 
                            ? 'text-red-600 dark:text-red-400 font-bold' 
                            : isWarning90 
                              ? 'text-orange-600 dark:text-orange-400 font-bold'
                              : isNear80
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-slate-400'
                        }`}>
                          {isOver ? 'Teto estourado!' : isWarning90 ? 'Meta Crítica (90%+ )' : isNear80 ? 'Atenção ao limite' : 'Estável'}
                        </span>
                        <span className={`text-[10px] font-mono ${
                          isOver 
                            ? 'text-red-600 dark:text-red-400 font-medium' 
                            : isWarning90 
                              ? 'text-orange-600 dark:text-orange-400 font-medium' 
                              : 'text-slate-400'
                        }`}>
                          {isOver 
                            ? `Excedeu R$ ${Math.abs(b.remaining).toFixed(1)}` 
                            : `R$ ${b.remaining.toFixed(1)} restantes`}
                        </span>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="text-center text-slate-400 py-10">
                  <p className="text-xs">Nenhum teto de despesa definido por categoria.</p>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-[180px] mx-auto">Insira limites acima para mapear riscos de endividamento da família.</p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* SECTION 3: TRANSACTIONS LIST LEDGER TABLE (FULL WIDTH) */}
        <div className={`p-6 rounded-2xl border transition-all duration-200 ${currentTheme.card}`}>
          
          {/* Header & filters menu */}
          <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b pb-5 mb-5 md:h-12 lg:h-auto ${currentTheme.border}`}>
            <div>
              <h2 className={`text-md font-bold tracking-tight flex items-center gap-2 ${currentTheme.textHeading}`}>
                Histórico de Lançamentos
                <span className={`px-2 py-0.5 text-xs font-mono rounded-full font-bold ${themeKey === 'copa' ? 'bg-emerald-950 text-yellow-300' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400'}`}>
                  {currentMonthTransactions.length}
                </span>
              </h2>
              <p className={`text-xs ${currentTheme.textSub}`}>
                Seus lançamentos listados para {monthsList[selectedMonth - 1]} de {selectedYear}
              </p>
            </div>

            {/* Search/Filters layout controller */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto text-xs font-semibold">
              
              {/* Full Text Query search box */}
              <div className="relative w-full sm:w-48">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full border rounded-lg pl-8 pr-3 py-2 text-xs font-semibold focus:outline-none transition-all ${currentTheme.inputBg} ${currentTheme.inputText} ${currentTheme.inputBorder}`}
                />
              </div>

              {/* Type toggle */}
              <div className={`flex items-center gap-1 p-1 border rounded-lg w-full sm:w-auto ${currentTheme.pillWrapper}`}>
                <button
                  type="button"
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-bold transition-all whitespace-nowrap cursor-pointer ${
                    filterType === 'all'
                      ? (themeKey === 'copa' ? 'bg-yellow-400 text-emerald-950 shadow-xs' : 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs')
                      : (themeKey === 'copa' ? 'text-emerald-100 hover:text-white' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200')
                  }`}
                >
                  Todos
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('income')}
                  className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-bold transition-all whitespace-nowrap cursor-pointer ${
                    filterType === 'income'
                      ? (themeKey === 'copa' ? 'bg-yellow-500 text-emerald-950 shadow-xs' : 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs')
                      : (themeKey === 'copa' ? 'text-emerald-100 hover:text-white' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200')
                  }`}
                >
                  Receitas
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('expense')}
                  className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-bold transition-all whitespace-nowrap cursor-pointer ${
                    filterType === 'expense'
                      ? (themeKey === 'copa' ? 'bg-yellow-400/80 text-emerald-950 shadow-xs' : 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs')
                      : (themeKey === 'copa' ? 'text-emerald-100 hover:text-white' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200')
                  }`}
                >
                  Despesas
                </button>
              </div>

              {/* Category dropdown selector */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={`w-full sm:w-auto border rounded-lg px-2 py-2 text-xs focus:outline-none cursor-pointer ${currentTheme.inputBg} ${currentTheme.inputText} ${currentTheme.inputBorder}`}
              >
                <option value="all" className={themeKey === 'copa' ? 'bg-emerald-950 text-yellow-50' : 'dark:bg-slate-800 text-slate-900 dark:text-white'}>Todas Categorias</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id} className={themeKey === 'copa' ? 'bg-emerald-950 text-yellow-50' : 'dark:bg-slate-800 text-slate-900 dark:text-white'}>{c.name}</option>
                ))}
              </select>

              {/* Sorters */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`w-full sm:w-auto border rounded-lg px-2 py-2 text-xs focus:outline-none cursor-pointer ${currentTheme.inputBg} ${currentTheme.inputText} ${currentTheme.inputBorder}`}
              >
                <option value="date-desc" className={themeKey === 'copa' ? 'bg-emerald-950 text-yellow-50' : 'dark:bg-slate-800 text-slate-900 dark:text-white'}>Recentes primeiro</option>
                <option value="date-asc" className={themeKey === 'copa' ? 'bg-emerald-950 text-yellow-50' : 'dark:bg-slate-800 text-slate-900 dark:text-white'}>Antigos primeiro</option>
                <option value="amount-desc" className={themeKey === 'copa' ? 'bg-emerald-950 text-yellow-50' : 'dark:bg-slate-850 text-slate-900 dark:text-white'}>Maior valor R$</option>
                <option value="amount-asc" className={themeKey === 'copa' ? 'bg-emerald-950 text-yellow-50' : 'dark:bg-slate-850 text-slate-900 dark:text-white'}>Menor valor R$</option>
              </select>

            </div>
          </div>

          {/* Table list view */}
          <div className="overflow-x-auto">
            {filteredTransactionsList.length > 0 ? (
              <table className="w-full border-collapse text-left text-xs min-w-[700px]">
                <thead>
                  <tr className={`border-b text-slate-400 font-bold uppercase tracking-wider text-[10px] ${currentTheme.border}`}>
                    <th className="py-3 px-4 w-28">Data</th>
                    <th className="py-3 px-4">Descrição / Notas</th>
                    <th className="py-3 px-4">Categoria</th>
                    <th className="py-3 px-4">Forma de Pagamento</th>
                    <th className="py-4 px-4 text-right w-36">Valor</th>
                    <th className="py-3 px-4 text-center w-24">Ações</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${themeKey === 'copa' ? 'divide-emerald-900/50' : 'divide-slate-100/50 dark:divide-slate-700/50'}`}>
                  <AnimatePresence initial={false}>
                    {filteredTransactionsList.map((tx) => {
                      const catConfig = CATEGORIES.find(c => c.id === tx.category) || {
                        name: tx.category,
                        textColor: 'text-slate-700',
                        bgColor: 'bg-slate-100',
                        iconName: 'HelpCircle'
                      };

                      // Format date beautifully from YYYY-MM-DD to DD/MM/YYYY
                      const [yr, mo, dy] = tx.date.split('-');
                      const formattedDate = `${dy}/${mo}/${yr}`;

                      return (
                        <motion.tr
                          key={tx.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`transition-colors ${currentTheme.listHoverBg}`}
                        >
                          {/* Date */}
                          <td className={`py-3.5 px-4 font-semibold whitespace-nowrap ${currentTheme.textSub}`}>
                            {formattedDate}
                          </td>

                          {/* Description & Notes */}
                          <td className="py-3.5 px-4 max-w-sm">
                            <div className={`font-semibold ${currentTheme.textHeading}`}>{tx.description}</div>
                            {tx.notes && (
                              <div className="text-[10px] text-slate-400 mt-0.5 italic font-normal line-clamp-1">
                                {tx.notes}
                              </div>
                            )}
                          </td>

                          {/* Category Badge */}
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full font-semibold text-[10px] border border-transparent ${
                              themeKey === 'copa' 
                                ? 'bg-emerald-950 text-yellow-300 border-emerald-800' 
                                : `${catConfig.bgColor} ${catConfig.textColor}`
                            }`}>
                              {getCategoryIcon(catConfig.iconName, "w-3 h-3 flex-shrink-0")}
                              <span>{catConfig.name}</span>
                            </span>
                          </td>

                          {/* Payment Method */}
                          <td className={`py-3.5 px-4 font-semibold ${currentTheme.textSub}`}>
                            <div className="flex items-center gap-1.5">
                              <CreditCard className="w-3.5 h-3.5 stroke-1 text-slate-400" />
                              <span>{tx.paymentMethod || 'Não definido'}</span>
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="py-3.5 px-4 text-right font-bold whitespace-nowrap text-sm">
                            <span className={
                              tx.type === 'income' 
                                ? (themeKey === 'copa' ? 'text-yellow-300 font-bold' : 'text-emerald-600 dark:text-emerald-400 font-bold') 
                                : (themeKey === 'copa' ? 'text-rose-400 font-bold' : 'text-rose-600 dark:text-rose-400 font-bold')
                            }>
                              {tx.type === 'income' ? '+' : '-'} {tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleStartEdit(tx)}
                                className={`p-1 px-2 border rounded-md transition-all cursor-pointer flex items-center justify-center ${
                                  themeKey === 'copa'
                                    ? 'border-emerald-800 hover:border-yellow-400 text-yellow-300 hover:text-yellow-100 bg-emerald-950/45 hover:bg-emerald-900/40'
                                    : 'border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 dark:border-slate-700 dark:hover:border-indigo-950 dark:hover:bg-indigo-950/20'
                                }`}
                                title="Editar lançamento"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteTransaction(tx.id)}
                                className={`p-1 px-2 border rounded-md transition-all cursor-pointer flex items-center justify-center ${
                                  themeKey === 'copa'
                                    ? 'border-emerald-800 hover:border-red-400 text-yellow-300 hover:text-red-400 bg-emerald-950/45 hover:bg-emerald-900/40'
                                    : 'border-slate-200 hover:border-red-200 hover:bg-rose-50 text-slate-500 hover:text-red-500 dark:border-slate-700 dark:hover:border-red-950 dark:hover:bg-rose-950/20'
                                }`}
                                title="Deletar lançamento"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16 text-slate-400 dark:text-slate-500 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-3">
                  <Filter className="w-6 h-6 stroke-1 text-slate-300" />
                </div>
                <h3 className="font-semibold text-sm">Nenhum lançamento corresponde à busca</h3>
                <p className="text-xs max-w-[280px] mx-auto mt-1">
                  Não encontramos nada neste mês para categoria / busca informada. Redefina os filtros ou cadastre transações acima.
                </p>
                {(searchTerm || filterCategory !== 'all' || filterType !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterCategory('all');
                      setFilterType('all');
                    }}
                    className="mt-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Redefinir Filtros
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

      </main>

    </div>
  );
}
