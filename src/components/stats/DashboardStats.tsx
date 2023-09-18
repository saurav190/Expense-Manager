import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import InfoCard from "./InfoCard";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { calculateData } from "../../redux/features/statsdata/dataSlice";
import moment from "moment";

const DashboardStats: React.FC = () => {
  const dispatch = useAppDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const {
    incomeData,
    expenseData,
    dayWiseData,
    weekWiseData,
    monthWiseData,
    yearWiseData,
    mostSpentDay,
    mostSpentCategory,
  } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(calculateData(transactions));
  }, [dispatch, transactions]);

  const currentDay = moment().format("DD/MM/YYYY");
  const getCurrentWeek = moment().startOf("week");
  const startOfWeek = getCurrentWeek.format("DD/MM/YYYY");
  const endOfWeek = getCurrentWeek.clone().add(6, "days").format("DD/MM/YYYY");
  const currentWeek = `${startOfWeek}-${endOfWeek}`;
  const currentMonth = moment().format("MM/YYYY");
  const currentYear = moment().format("YYYY");

  const overallIncome = incomeData;
  const overallExpense = expenseData;
  const thisDay = dayWiseData.find(
    (dayWiseData) => dayWiseData.range === currentDay
  );
  const thisWeek = weekWiseData.find(
    (weekWiseData) => weekWiseData.range === currentWeek
  );
  const thisMonth = monthWiseData.find(
    (monthWiseData) => monthWiseData.range === currentMonth
  );
  const thisYear = yearWiseData.find(
    (yearWiseData) => yearWiseData.range === currentYear
  );

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InfoCard
            title="Overall Income"
            data={`₹ ${overallIncome}`}
            backgroundcolor={0}
            icon={0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InfoCard
            title="Overall Expense"
            data={`₹ ${overallExpense}`}
            backgroundcolor={1}
            icon={1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InfoCard
            title="Most Spent Category"
            data={mostSpentCategory}
            backgroundcolor={0}
            icon={2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InfoCard
            title="Most Spent Day"
            data={mostSpentDay}
            backgroundcolor={0}
            icon={3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InfoCard
            title="Today"
            data={thisDay?.total || 0}
            backgroundcolor={0}
            icon={4}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InfoCard
            title="This Week"
            data={thisWeek?.total || 0}
            backgroundcolor={0}
            icon={5}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InfoCard
            title="This Month"
            data={thisMonth?.total || 0}
            backgroundcolor={0}
            icon={6}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <InfoCard
            title="This Year"
            data={thisYear?.total || 0}
            backgroundcolor={0}
            icon={7}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardStats;
