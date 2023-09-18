import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { Chart } from "react-google-charts";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { Card, CardContent, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TransactionTable from "../components/datatable/TransactionTable";
import { TextField } from "@mui/material";
import { Transaction } from "../utils/types";
import TransactionsPopup from "../components/datatable/TransactionsPopup";


interface CategorySpending {
  [category: string]: number;
}

const MyBox = styled(Box)({
  background: "#f0fdfa",
  padding: "10px",
  width: "auto",
});

const options = {
  title: "Category Analysis",
  pieHole: 0.5,
  is3D: false,
  colors: ["#99f6e4", "#2dd4bf", "#115e59", "#042f2e"],
};

const DailyPage: React.FC = () => {
  const transactions: Transaction[] = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredTransactions = selectedDate
    ? transactions.filter((transaction) => transaction.date === selectedDate)
    : [];

  const totalSpent = filteredTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  const categorySpending: CategorySpending = {};

  filteredTransactions.forEach((transaction) => {
    if (!categorySpending[transaction.category]) {
      categorySpending[transaction.category] = 0;
    }
    categorySpending[transaction.category] += transaction.amount;
  });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;

    console.log("handleDateChange");

    if (newDate) {
      setSelectedDate(newDate);
    } else {
      setSelectedDate("");
    }
  };
  console.log("filteredTransactions", filteredTransactions, selectedDate);

  return (
    <div>
      <MyBox>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3} spacing={2}>
            <Stack spacing={4}>
              <TextField
                label="Date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: new Date().toISOString().split("T")[0],
                }}
              ></TextField>

              <Card
                sx={{ minWidth: "49%", height: "auto" }}
                style={{ background: "#14b8a6", color: "#f0fdfa" }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total Money Spent <LocalAtmIcon />
                  </Typography>

                  <Typography gutterBottom variant="h5" component="div">
                    <span>
                      <CurrencyRupeeIcon />
                    </span>
                    {totalSpent}
                  </Typography>
                </CardContent>
              </Card>

              <Card
                sx={{ minWidth: "49%", height: "auto" }}
                style={{ background: "#14b8a6", color: "#f0fdfa" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    Each Category Spent
                  </Typography>
                  {Object.entries(categorySpending).map(
                    ([category, amount]) => (
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        key={category}
                      >
                        {category}:{" "}
                        <span>
                          <CurrencyRupeeIcon />
                        </span>
                        {amount}
                      </Typography>
                    )
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={12} md={9}>
            <Paper elevation={3} style={{ padding: "16px", margin: "8px" }}>
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={[
                  ["Category", "Amount"],
                  ...Object.entries(categorySpending).map(
                    ([category, amount]) => [category, amount]
                  ),
                ]}
                options={options}
              />
            </Paper>
          </Grid>
          <TransactionsPopup Title="+" />
          <TransactionTable transactions={filteredTransactions} />
        </Grid>
      </MyBox>
    </div>
  );
};

export default DailyPage;


