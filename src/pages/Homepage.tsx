import React from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Image from "../assets/images/homepageImg.jpg";
import "../assets/css/homepage.css";

const Homepage: React.FC = () => {
  return (
   
    <div className="home-page">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} className="left-side">
          <div className="text-content">
            <Typography variant="h4" align="center" className="animated-text">
              Welcome to Expense Manager
            </Typography>
            <Typography align="center" className="animated-text">
              Keep track of your expenses and manage your finances efficiently.
            </Typography>
          </div>
          <Link to="/login">
            <Button
              type="submit"
              variant="contained"
              className="submit-button"
              fullWidth={false}
            >
              Log In
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} className="right-side">
          <img src={Image} alt="Expense Manager" className="center-image" />
        </Grid>
      </Grid>
    </div>
   
  );
};

export default Homepage