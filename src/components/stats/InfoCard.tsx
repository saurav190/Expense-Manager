import { Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

interface CardProps {
  title: string;
  data: number | string ;
  backgroundcolor: number;
  icon: number;
}
const cardIcon = [
  <TrendingUpIcon style={{ fontSize: "60px", color: "#0f766e" }} />,
  <TrendingDownRoundedIcon style={{ fontSize: "60px", color: "#0f766e" }} />,
  <CategoryRoundedIcon style={{ fontSize: "60px", color: "#0f766e" }} />,
  <TodayRoundedIcon style={{ fontSize: "60px", color: "#0f766e" }} />,
  <EventAvailableRoundedIcon style={{ fontSize: "60px", color: "#0f766e" }} />,
  <DateRangeRoundedIcon style={{ fontSize: "60px", color: "#0f766e" }} />,
  <CalendarMonthRoundedIcon style={{ fontSize: "60px", color: "#0f766e" }} />,
  <AccountBalanceWalletRoundedIcon
    style={{ fontSize: "60px", color: "#0f766e" }}
  />,
];

const cardColors = ["#ccfbf1", "#99f6e4", "#2dd4bf", "#14b8a6", "#0d9488"];

const InfoCard: React.FC<CardProps> = ({
  title,
  data,
  backgroundcolor,
  icon,
}) => {
  return (
    <Card
      style={{
        background: cardColors[backgroundcolor],
        padding: "10px",
        margin: "8px",
        border: " 1px solid #ccfbf1",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="h5" component="h2">
              {data}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            {cardIcon[icon]}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default InfoCard;
