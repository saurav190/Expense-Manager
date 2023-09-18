

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Typography, Paper } from "@mui/material";
import "../assets/css/profile.css"; 

const ProfilePage: React.FC = () => {
    const user: any = useSelector((state: RootState) => state.userAuth.login);

    return (
        <div className="profile-container">
            <Paper elevation={3} className="profile-paper">
                <Typography variant="h4" className="profile-title">User Profile</Typography>
                <Typography className="profile-info">
                    <strong>Email:</strong> {user?.email}
                </Typography>
                <Typography className="profile-info">
                    <strong>Username:</strong> {user?.name}
                </Typography>
            </Paper>
        </div>
    );
};

export default ProfilePage;


