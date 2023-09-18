import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import TransactionTable from "../components/datatable/TransactionTable";
import { RootState } from "../redux/store";
import { expenseCategories, incomeCategories } from "../utils/constants";
import { Transaction } from "../utils/types";

import "../assets/css/filterpage.css";
import TransactionsPopup from "../components/datatable/TransactionsPopup";

const FilterPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>("byDate");
  const [fromDate, setFromDate] = useState<string>("2023-08-01");
  const [toDate, setToDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  const [expenseFrom, setExpenseFrom] = useState<number>(0);
  const [expenseTo, setExpenseTo] = useState<number | undefined>(undefined); 
  const [transactionType, setTransactionType] = useState<string>("income");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const allTransactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  const handleFilter = () => {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);

    const filtered = allTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      const dateCondition =
        filterType === "byDate"
          ? transactionDate >= fromDateObj && transactionDate <= toDateObj
          : true;

      const amountCondition =
        filterType === "byAmount"
          ? transaction.amount >= expenseFrom && (expenseTo === undefined || transaction.amount <= expenseTo)
          : true;

      return (
        dateCondition &&
        amountCondition &&
        (selectedCategory === "All" ||
          transaction.category === selectedCategory) &&
        transaction.type === transactionType
      );
    });

    setFilteredTransactions(filtered);
  };

  return (
    <form className="filter-form">
      {/* Filter Type Dropdown */}
      <FormControl fullWidth className="formControlStyle">
        <InputLabel id="filter-type-label" className="input-labelstyle">Filter Type</InputLabel>
        <Select
          labelId="filter-type-label"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as string)}
          variant="outlined"
        >
          <MenuItem value="byDate">By Date</MenuItem>
          <MenuItem value="byAmount">By Amount</MenuItem>
        </Select>
      </FormControl>

      {/* Date Range Fields */}
      {filterType === "byDate" && (
        <div className="date-range">
          <div className="date-field">
            <TextField
              type="date"
              label="From Date"
              variant="outlined"
              size="small"
              fullWidth
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="date-field custom-textfield">
            <TextField
              type="date"
              label="To Date"
              variant="outlined"
              size="small"
              fullWidth
              value={toDate}
              className="custom-input"
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Expense Range Fields */}
      {filterType === "byAmount" && (
        <div className="expense-range">
          <div className="expense-field">
            <TextField
              type="number"
              label="From Amount"
              variant="outlined"
              size="small"
              fullWidth
              value={expenseFrom}
              onChange={(e) => setExpenseFrom(parseFloat(e.target.value))}
            />
          </div>
          <div className="expense-field">
            <TextField
              type="number"
              label="To Amount"
              variant="outlined"
              size="small"
              fullWidth
              value={expenseTo !== undefined ? expenseTo : ""}
              onChange={(e) =>
                setExpenseTo(e.target.value !== "" ? parseFloat(e.target.value) : undefined)
              }
            />
          </div>
        </div>
      )}

      {/* Transaction Type Dropdown */}
      <FormControl fullWidth className="formControlStyle">
        <InputLabel id="transaction-type-label" className="input-labelstyle">Transaction Type</InputLabel>
        <Select
          labelId="transaction-type-label"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value as string)}
          variant="outlined"
        >
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </Select>
      </FormControl>

      {/* Category Dropdown */}
      <FormControl fullWidth className="formControlStyle">
        <InputLabel id="category-label" className="input-labelstyle" >Category</InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as string)}
          variant="outlined"
        >
          <MenuItem value="All">All</MenuItem>
          {transactionType === "income"
            ? incomeCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))
            : expenseCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
        </Select>
      </FormControl>

      <Button
        className="submit-button1"
        variant="contained"
        color="primary"
        onClick={handleFilter}
      >
        Filter Transactions
      </Button>
      <div>
          <TransactionTable transactions={filteredTransactions} />
          <TransactionsPopup Title="+" />
        </div>
      
    </form>
    
  );
};

export default FilterPage;
