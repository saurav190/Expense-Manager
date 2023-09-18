import React from "react";
import "../../assets/css/charts.css"
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/material";

interface CategoryData {
  [category: string]: number;
}
interface PieChartSectionProps {
  selectedValue: string;
  incomeCategoryData: CategoryData;
  expenseCategoryData: CategoryData;
}

const COLORS = ["#14b8a6", "#0d9488", "#0f766e", "#115e59","#134e4a","#042f2e"];

const PieChartSection: React.FC<PieChartSectionProps> = ({ selectedValue, incomeCategoryData, expenseCategoryData}) => {
  const data = selectedValue === "Income" ? incomeCategoryData : expenseCategoryData;
  const categoryEntries = Object.entries(data);
  return (
    // <div style={{backgroundColor:"white"}}>

    <ResponsiveContainer height={350}>
      <PieChart className="chart-box">
        <text
          fontSize={"30px"}
          x={"50%"}
          y={"50%"}
          textAnchor="middle"
          dominantBaseline="middle"
        >
         {data === undefined ? "No Data" : selectedValue === "Income" ?"Income" : "Expense"}
        </text>
        <Pie
          data={categoryEntries}
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={120}
          paddingAngle={5}
          dataKey="1"
          nameKey="0" 
          label={({  percent }) =>`${(percent * 100).toFixed(2)}%`}
        >
        {categoryEntries.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PieChartSection;
