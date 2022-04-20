import React, { useState } from "react";
import { Route, Routes } from "react-router";
import "antd/dist/antd.css";
import "./scss/app.scss";
import { IRoute } from "./constant/routes";
import UtilPage from "./pages";
import Auth from "./pages/Auth/Login/Auth";
import ChangePassword from "./pages/Auth/Login/ChangePassword";

function App() {
  
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
