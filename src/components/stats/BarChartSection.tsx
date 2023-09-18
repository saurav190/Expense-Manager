import React from "react";
import "../../assets/css/charts.css";
import {
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

interface WiseData {
  range: string;
  income: number;
  expense: number;
}
interface BarChartSectionProps {
  barChartData: WiseData[];
}
const BarChartSection: React.FC<BarChartSectionProps> = ({barChartData }) => {
  console.log(barChartData);
  return (
    <ResponsiveContainer height={350}>
      <BarChart data={barChartData} className="chart-box">
        <XAxis dataKey="range" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar dataKey="income" fill="#2dd4bf" />
        <Bar dataKey="expense" fill="#042f2e" />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartSection;
