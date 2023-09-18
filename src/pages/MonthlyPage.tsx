import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import moment from "moment";
import { RootState } from "../redux/store";
import "../assets/css/monthlypage.css";
import TransactionTable from "../components/datatable/TransactionTable";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TransactionsPopup from "../components/datatable/TransactionsPopup";

const MyBox = styled(Box)({
  background: "#f0fdfa",
  padding: "10px",
});

const MonthlyPage: React.FC = () => {
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Filter transactions for the selected month
  const firstDayOfMonth = moment(selectedDate).startOf("month");
  const lastDayOfMonth = moment(selectedDate).endOf("month");

  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  // Extract unique dates from the transactions
  const uniqueTransactionDates = [
    ...new Set(
      filteredTransactions.map((transaction) =>
        moment(transaction.date).format("YYYY-MM-DD")
      )
    ),
  ];

  // Update filtered transactions when the selectedDate or transactions change
  useEffect(() => {
    const updatedFilteredTransactions = transactions.filter((transaction) => {
      const transactionDate = moment(transaction.date);
      return transactionDate.isBetween(
        firstDayOfMonth,
        lastDayOfMonth,
        null,
        "[]"
      );
    });

    setFilteredTransactions(updatedFilteredTransactions);
  }, [selectedDate, transactions]);

  return (
    <div>
      <div className="my-box">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            {/* Calendar */}
          
              <Calendar
                onChange={(date) => setSelectedDate(date as Date)}
                value={selectedDate}
                onActiveStartDateChange={({ activeStartDate }) =>
                  setSelectedDate(activeStartDate as Date)
                }
                tileClassName={({ date }) =>
                  uniqueTransactionDates.includes(
                    moment(date).format("YYYY-MM-DD")
                  )
                    ? "calendar-tile"
                    : ""
                }
              />
         
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            {/* Data Table */}
            <TransactionsPopup Title="+" />
            <TransactionTable transactions={filteredTransactions} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MonthlyPage;
