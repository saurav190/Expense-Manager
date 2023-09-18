import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import InfoCard from "../components/stats/InfoCard";
import SelectStats from "../components/stats/SelectStats";
import PieChartSection from "../components/stats/PieChartSection";
import SelectDataRange from "../components/stats/SelectDataRange";
import BarChartSection from "../components/stats/BarChartSection";
import { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { calculateData } from "../redux/features/statsdata/dataSlice";
import moment from "moment";
import { Typography, styled } from "@material-ui/core";
import Box from "@mui/material/Box";

interface RangeData {
  range: string;
  income: number;
  expense: number;
}

const MyBox = styled(Box)({
  background: "#f0fdfa",
  padding: "10px",
});

const StatsPage: React.FC = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const {
    incomeData,
    expenseData,
    incomeCategoryData,
    expenseCategoryData,
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

  const getCurrentWeekDays = () => {
    const today = moment();
    const startOfWeek = today.clone().startOf("week");
    const daysArray = [];
    let currentDate = startOfWeek.clone();

    for (let i = 0; i < 7; i++) {
      daysArray.push(currentDate.format("DD/MM/YYYY"));
      currentDate.add(1, "day");
    }

    return daysArray;
  };

  const daysArray = getCurrentWeekDays();

  const thisDayData: RangeData[] = daysArray.map((range) => {
    const match = dayWiseData.find((item) => item.range === range);

    return {
      range: moment(range, "DD/MM/YYYY").format("DD/MM"),
      income: match ? match?.income : 0,
      expense: match ? match?.expense : 0,
    };
  });

  const getWeeksInCurrentMonth = () => {
    const today = moment();
    const startOfMonth = today.clone().startOf("month");
    const endOfMonth = today.clone().endOf("month");
    const weeksArray = [];
    const currentWeekStart = startOfMonth.clone().startOf("week");

    while (currentWeekStart.isBefore(endOfMonth)) {
      const weekStart = currentWeekStart.format("DD/MM/YYYY");
      const weekEnd = currentWeekStart
        .clone()
        .endOf("week")
        .format("DD/MM/YYYY");
      weeksArray.push(`${weekStart}-${weekEnd}`);
      currentWeekStart.add(1, "week");
    }

    return weeksArray;
  };

  const weeksArray = getWeeksInCurrentMonth();

  const thisWeekData: RangeData[] = weeksArray.map((range) => {
    const match = weekWiseData.find((item) => item.range === range);
    return {
      range: range
        .split("-")
        .map((date) => moment(date, "DD/MM/YYYY").format("DD/MM"))
        .join("-"),
      income: match ? match?.income : 0,
      expense: match ? match?.expense : 0,
    };
  });

  const getCurrentYearMonths = () => {
    const today = moment();
    const startOfYear = today.clone().startOf("year");

    const monthsArray = [];
    let currentMonth = startOfYear.clone();

    while (currentMonth.isSameOrBefore(today, "month")) {
      monthsArray.push(currentMonth.format("MM/YYYY"));
      currentMonth.add(1, "month");
    }

    return monthsArray;
  };

  const monthsArray = getCurrentYearMonths();
  const thisMonthData: RangeData[] = monthsArray.map((range) => {
    const match = monthWiseData.find((item) => item.range === range);
    return {
      range: moment(range, "MM/YYYY").format("MMM"),
      income: match ? match?.income : 0,
      expense: match ? match?.expense : 0,
    };
  });

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

  const [dataRange, setDataRange] = React.useState("day");
  const [barChartData, setBarChartData] = React.useState(thisDayData);
  const [selectedValue, setSelectedValue] = React.useState("Income");

  const handleSelectedValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleDataRangeChange = (value: string) => {
    if (value !== null) {
      setDataRange(value);
    }
    if (value === "week") {
      setBarChartData(thisWeekData);
    } else if (value === "month") {
      setBarChartData(thisMonthData);
    } else if (value === "day") {
      setBarChartData(thisDayData);
    }
  };
  return (
    <div className="stats-page">
      <MyBox>
        <Grid container spacing={2} justifyContent="center">
          <Grid container paddingLeft={3} marginBottom={-2} marginTop={1}>
            <Typography variant={"h6"}>Overall Statistics</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <InfoCard
              title="Overall Income"
              data={`₹ ${overallIncome}`}
              backgroundcolor={0}
              icon={0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <InfoCard
              title="Overall Expense"
              data={`₹ ${overallExpense}`}
              backgroundcolor={0}
              icon={1}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <InfoCard
              title="Most Spent Category"
              data={mostSpentCategory}
              backgroundcolor={0}
              icon={2}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <InfoCard
              title="Most Spent Day"
              data={mostSpentDay}
              backgroundcolor={0}
              icon={3}
            />
          </Grid>
        </Grid>
        <Grid container paddingLeft={1}>
          <Typography variant={"h6"}>Current Balance </Typography>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <InfoCard
              title="Today"
              data={`₹ ${thisDay?.total || 0}`}
              backgroundcolor={0}
              icon={4}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <InfoCard
              title="This Week"
              data={`₹ ${thisWeek?.total || 0}`}
              backgroundcolor={0}
              icon={5}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <InfoCard
              title="This Month"
              data={`₹ ${thisMonth?.total || 0}`}
              backgroundcolor={0}
              icon={6}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <InfoCard
              title="This Year"
              data={`₹ ${thisYear?.total || 0}`}
              backgroundcolor={0}
              icon={7}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <SelectStats
              handleSelectedValueChange={handleSelectedValueChange}
            />
              <PieChartSection
                selectedValue={selectedValue}
                incomeCategoryData={incomeCategoryData}
                expenseCategoryData={expenseCategoryData}
                />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectDataRange
              value={dataRange}
              handleDataRangeChange={handleDataRangeChange}
            />
          <BarChartSection barChartData={barChartData} />
          </Grid>
        </Grid>
      </MyBox>
    </div>
  );
};

export default StatsPage;
