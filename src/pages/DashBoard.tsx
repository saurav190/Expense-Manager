import React from "react";
import IncomeExpenseForm from "../components/IncomeExpenseForm";
import StatsPage from "./StatsPage";
const DashBoard: React.FC = () => {
  return (
    <>
      <StatsPage />
      <IncomeExpenseForm />
    </>
  );
};

export default DashBoard;
