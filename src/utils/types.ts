export interface Expense {
  id: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  label: string;
  }
  export interface Income {
    id: string;
    type: string;
    category: string;
    amount: number;
    date: string;
    label: string;
  }

  export interface Transaction {
    id: string; 
    type: string;
    category: string;
    amount: number;
    date: string;
    label: string;
  }