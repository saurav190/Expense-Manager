import "../assets/css/form.css";
import React from "react";
import {useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TransactionTable from "./datatable/TransactionTable";
import TransactionsPopup from "./datatable/TransactionsPopup";

const IncomeExpenseForm: React.FC = () => {
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );

  return (
    <div className="container">
      <TransactionsPopup Title="+"/>
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default IncomeExpenseForm;
