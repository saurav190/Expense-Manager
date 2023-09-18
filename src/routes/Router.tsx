import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MasterLayout from "../layouts/MasterLayout";
import ErrorPage from "../components/common/ErrorPage";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProtectedPages from "../components/ProtectedPages";
import DashBoard from "../pages/DashBoard";
import DailyPage from "../pages/DailyPage";
import StatsPage from "../pages/StatsPage";
import UserProfile from "../pages/Profile";
import MonthlyPage from "../pages/MonthlyPage";
import FilterPage from "../pages/FilterPage";
import TransactionPage from "../pages/TransactionPage";

const Router: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MasterLayout />}>
              <Route index element={<Homepage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedPages />}>
                <Route path="/dashboard" element={<DashBoard />}  />
                <Route path="/transaction" element={<TransactionPage />} />
                <Route path="/daily" element={<DailyPage/>}/>
                <Route path="/monthly" element={<MonthlyPage />} />
                <Route path="/filterlist" element={<FilterPage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="/profile" element={<UserProfile />} />
              </Route>
              <Route path="/*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default Router;
