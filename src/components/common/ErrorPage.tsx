import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "../../assets/css/errorpage.css"; 

const ErrorPage: React.FC = () => {
  return (
    <section className="error-page">
      <div className="error-cont">
        <div className="error-row">
          <div className="error-col">
            <div className="error-col-content text-center">
              <div className="error-bg">
              </div>
              <div className="error-contant-box error-large">
                <Typography variant="h3" className="error-subtitle">
                 404 - Look like you're lost
                </Typography>
                <Typography variant="body1" className="error-margin">
                  The page you are looking for is not available!
                </Typography>
                <Link
                  to="/"
                  className="error-link"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
