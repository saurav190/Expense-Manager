import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import "../../assets/css/navbar.css";
import icon from "../../assets/images/logo.png";
import { RootState } from "../../redux/store";
import Navlist from "./Navlist";
import SettingProfile from "./SettingProfile";

const Navbar = () => {
  const user: any = useSelector((state: RootState) => state.userAuth.login) 
    // const user = JSON.parse(localStorage.getItem("loginuser") || "null");
  
return (
  <AppBar position="sticky" className="header">
    <Container maxWidth="xl" className="">
      <Toolbar disableGutters className="toolbar">
        <Box className="navbar-title">
          <RouterLink to="/dashboard" className="navbar-link">
            <img alt="logo" src={icon} className="logo" />
          </RouterLink>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/dashboard"
            className="navbar-link navbar-link-h6"
          >
            Expense Manager
          </Typography>
        </Box>
        <div className="spacer" />
        <Navlist />
        {user && <SettingProfile />}
      </Toolbar>
    </Container>
  </AppBar>
);
};

export default Navbar;
