import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  label: string;
}

interface TransactionsState {
  transactions: Transaction[];
  openPopup: boolean;
}

const initialState: TransactionsState = {
  transactions: [],
  openPopup: false,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (el) => el.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (el) => el.id !== action.payload
      );
    },
    setOpenPopup: (state, action: PayloadAction<boolean>) => {
      state.openPopup = action.payload;
    },
    emptyTransaction: (state)=>{
      state.transactions = [];
    }
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setOpenPopup,
  emptyTransaction,
} = transactionSlice.actions;
export default transactionSlice.reducer;
