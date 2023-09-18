import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
interface CategoryData {
  [category: string]: number;
}
interface WiseData {
  range: string;
  expense: number;
  income: number;
  total: number;
}
interface Transaction {
  date: string;
  type: string;
  category: string | undefined;
  amount: number;
  label: string;
}
interface DataState {
  incomeData: number;
  expenseData: number;
  incomeCategoryData: CategoryData;
  expenseCategoryData: CategoryData;
  dayWiseData: WiseData[];
  weekWiseData: WiseData[];
  monthWiseData: WiseData[];
  yearWiseData: WiseData[];
  mostSpentDay: string;
  mostSpentCategory: string;
  categoryTotals: CategoryData;
}

const initialState: DataState = {
  incomeData: 0,
  expenseData: 0,
  incomeCategoryData: {},
  expenseCategoryData: {},
  dayWiseData: [],
  weekWiseData: [],
  monthWiseData: [],
  yearWiseData: [],
  mostSpentDay: "",
  mostSpentCategory: "",
  categoryTotals: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    calculateData: (state, action) => {
      const transectionData: Transaction[] = action.payload;

          const calculatedIncomeData = transectionData
        .filter((item) => item.type === "income")
        .reduce((total, item) => total + item.amount, 0);

      const calculatedExpenseData = transectionData
        .filter((item) => item.type === "expense")
        .reduce((total: number, item) => total + item.amount, 0);

      // Calculate income and expense by category
      const calculatedIncomeCategoryData: CategoryData = {};
      const calculatedExpenseCategoryData: CategoryData = {};

      transectionData.forEach((item) => {
        const category = item.category || "Uncategorized";
        if (item.type === "income") {
          calculatedIncomeCategoryData[category] =
            (calculatedIncomeCategoryData[category] || 0) + item.amount;
        } else if (item.type === "expense") {
          calculatedExpenseCategoryData[category] =
            (calculatedExpenseCategoryData[category] || 0) + item.amount;
        }
      });

      const calculatedDayWiseData: WiseData[] = [];
      const calculatedWeekWiseData: WiseData[] = [];
      const calculatedMonthWiseData: WiseData[] = [];
      const calculatedYearWiseData: WiseData[] = [];

      const findOrCreateEntry = (array: WiseData[], range: string) => {
        let entry = array.find((item) => item.range === range);
        if (!entry) {
          entry = { range, expense: 0, income: 0, total: 0 };
          array.push(entry);
        }
        return entry;
      };
      const calculateAndAssignTotal = (
        entry: WiseData,
        income: number,
        expense: number
      ) => {
        entry.income += income;
        entry.expense += expense;
        entry.total = entry.income - entry.expense;
      };
      transectionData.forEach((item) => {
        const date = moment(item.date);
        const dayKey = date.format("DD/MM/YYYY");
        const weekStart = moment(date).startOf("week");
        const weekEnd = moment(date).endOf("week");
        const weekKey = `${weekStart.format("DD/MM/YYYY")}-${weekEnd.format(
          "DD/MM/YYYY"
        )}`;
        const monthKey = date.format("MM/YYYY");
        const yearKey = date.format("YYYY");
        const dayEntry = findOrCreateEntry(calculatedDayWiseData, dayKey);
        const weekEntry = findOrCreateEntry(calculatedWeekWiseData, weekKey);
        const monthEntry = findOrCreateEntry(calculatedMonthWiseData, monthKey);
        const yearEntry = findOrCreateEntry(calculatedYearWiseData, yearKey);

        if (item.type === "income") {
          calculateAndAssignTotal(dayEntry, item.amount, 0);
          calculateAndAssignTotal(weekEntry, item.amount, 0);
          calculateAndAssignTotal(monthEntry, item.amount, 0);
          calculateAndAssignTotal(yearEntry, item.amount, 0);
        } else if (item.type === "expense") {
          calculateAndAssignTotal(dayEntry, 0, item.amount);
          calculateAndAssignTotal(weekEntry, 0, item.amount);
          calculateAndAssignTotal(monthEntry, 0, item.amount);
          calculateAndAssignTotal(yearEntry, 0, item.amount);
        }
      });

      // Find the day with the most spending
      const mostSpentDay = calculatedDayWiseData.reduce(

        (maxExpenseDay, currentDay) => {
          if (!maxExpenseDay || currentDay.expense > maxExpenseDay.expense) {
            return currentDay;
          } else {
            return maxExpenseDay;
          }
        },
        calculatedDayWiseData[1]       
        );
      // const mostSpentDay = (spentDay?.expense===0?(spentDay.range="No Expense") : spentDay?.range)
      const categoryTotals: CategoryData = {};

      transectionData.forEach((item) => {
        const category = item.category || "Uncategorized";
        if (item.type === "expense") {
          categoryTotals[category] =
            (categoryTotals[category] || 0) + item.amount;
        }
      });
      const sortedCategories = Object.keys(categoryTotals).sort(
        (a, b) => categoryTotals[b]! - categoryTotals[a]!
      );
      const mostSpentCategory = sortedCategories[0];

      state.incomeData = calculatedIncomeData;
      state.expenseData = calculatedExpenseData;
      state.incomeCategoryData = calculatedIncomeCategoryData;
      state.expenseCategoryData = calculatedExpenseCategoryData;
      state.dayWiseData = calculatedDayWiseData;
      state.weekWiseData = calculatedWeekWiseData;
      state.monthWiseData = calculatedMonthWiseData;
      state.yearWiseData = calculatedYearWiseData;
      state.mostSpentDay = mostSpentDay?.range||"No Expense";
      console.log(mostSpentDay);
      
      state.mostSpentCategory = mostSpentCategory || "No Expense";
    },
  },
});

export const { calculateData } = dataSlice.actions;

export default dataSlice.reducer;
