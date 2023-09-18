import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedPages: React.FC = () => {
  const currentUser: any = useSelector((state: RootState) => state.userAuth.login);
  console.log(currentUser);

  if (currentUser === '') {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedPages;
