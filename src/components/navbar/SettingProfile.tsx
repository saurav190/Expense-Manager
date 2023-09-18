import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/features/useAuth/userSlice";
import { emptyTransaction } from "../../redux/features/usertransaction/userTransactionSlice";
import { RootState } from "../../redux/store";

const SettingProfile: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const user: any = useSelector((state: RootState) => state.userAuth.login) ;
  // const user = JSON.parse(localStorage.getItem("loginuser") || "null");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("loginuser");
    dispatch(logOut());
    dispatch(emptyTransaction());
  };

return (
  <Box>
    <Tooltip title="Open settings">
      <IconButton sx={{color: 'white'}} onClick={handleOpenUserMenu}>
        Hello! <Box className="userName" ml={1}>{user?.name}</Box>
      </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      <NavLink to="/profile" className="navbar-link">
        <MenuItem>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
      </NavLink>
      <MenuItem className="navbar-link" onClick={handleLogOut}>
        <Typography textAlign="center">LogOut</Typography>
      </MenuItem>
    </Menu>
  </Box>
);
};

export default SettingProfile;
