import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import "antd/dist/antd.css";
import "./scss/app.scss";
import { IRoute } from "./constant/routes";
import UtilPage from "./pages";
import Auth from "./pages/Auth/Login/Auth";
import ChangePassword from "./pages/Auth/Login/ChangePassword";
import { createDevice, createDummyData, loadDeviceList } from "./api/device";
import { useDispatch } from "react-redux";
import { resetEdit } from "./slice/deviceSlice";
function App() {
  const location = useLocation().pathname;
  const dispatch = useDispatch();

  useEffect(() => {
    // createDummyData(10);
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path={IRoute.HOME} element={<Auth />} />
        <Route path="*" element={<UtilPage />} />
      </Routes>
    </div>
  );
}

export default App;
