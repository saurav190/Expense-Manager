import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "../../assets/css/navlist.css";

const Navlist: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const user: any = useSelector((state: RootState) => state.userAuth.login) 
  // const user = JSON.parse(localStorage.getItem("loginuser") || "null");

const handleCloseNavMenu = () => {
  setAnchorElNav(null);
};

return (
  <>
    <Box
      sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
      className="navbar-links"
    >
      {user && (
        <>
          <NavLink to="/dashboard" className="navbar-link">
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Dashboard
            </Button>
          </NavLink>
           <NavLink to="/transaction" className="navbar-link">
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Transactions
            </Button>
          </NavLink>

          <NavLink to="/monthly" className="navbar-link">
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Monthly
            </Button>
          </NavLink>


          <NavLink to="/daily" className="navbar-link">
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Daily
            </Button>
          </NavLink>

          <NavLink to="/filterlist" className="navbar-link">
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Filter
            </Button>
          </NavLink>

         
        </>
      )}
      <div className="spacer" />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {!user && (
          <>
            <NavLink to="/login" className="navbar-link">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 1, color: "white", display: "block" }}
              >
                Login
              </Button>
            </NavLink>

            <NavLink to="/signup" className="navbar-link">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, mx: 1, color: "white", display: "block" }}
              >
                SignUp
              </Button>
            </NavLink>
          </>
        )}
      </Box>
    </Box>
    <Box
      sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
      className="navbar-links"
    >
      <div className="spacer" />
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
        className="navbar-links"
      >
        {user
          ? [
              <NavLink
                key="dashboard"
                to="/dashboard"
                className="navbar-link"
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography>DashBoard</Typography>
                </MenuItem>
              </NavLink>,
             
             <NavLink key="daily" to="/monthly" className="navbar-link">
             <MenuItem onClick={handleCloseNavMenu}>
               <Typography>Monthly</Typography>
             </MenuItem>
             </NavLink>,

              <NavLink key="daily" to="/daily" className="navbar-link">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography>Daily</Typography>
                </MenuItem>
              </NavLink>,
              <NavLink key="daily" to="/transaction" className="navbar-link">
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography>Transactions</Typography>
              </MenuItem>
            </NavLink>,
              <NavLink key="filter" to="/filterlist" className="navbar-link">
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography>Filter</Typography>
                </MenuItem>
              </NavLink>,
            
            ]
          : [
              <MenuItem key="login">
                <NavLink to="/login" className="navbar-link">
                  <Typography textAlign="center">Login</Typography>
                </NavLink>
              </MenuItem>,
              <MenuItem key="signUp">
                <NavLink to="/signup" className="navbar-link">
                  <Typography textAlign="center">SignUp</Typography>
                </NavLink>
              </MenuItem>,
            ]}
      </Menu>
    </Box>
  </>
);
};

export default Navlist;
