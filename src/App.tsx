import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router";
import { createDummyData } from "./api/device";
import { createDummyNumber } from "./api/numbers";
import { getRoleGroup, loadRoleList } from "./api/role";
import { createDummyService } from "./api/service";
import {
  getNumberProvidationByMonth,
  getStatisticsByNumbers,
} from "./api/statistic";
import { IRoute } from "./constant/routes";
import UtilPage from "./pages";
import Auth from "./pages/Auth/Login/Auth";
import ForgotPassword from "./pages/Auth/Login/ForgotPassword";
import "./scss/app.scss";
function App() {
  const location = useLocation().pathname;
  const dispatch = useDispatch();

  useEffect(() => {
    // createDummyData(12);
    // createDummyService(10);
    // createDummyNumber(10)
    // hxrclluzftsczlym
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path={IRoute.HOME} element={<Auth />} />
        <Route path={`${IRoute.FORGOT_PASSWORD}`} element={<ForgotPassword />} />
        <Route path="*" element={<UtilPage />} />
      </Routes>
    </div>
  );
}

export default App;
