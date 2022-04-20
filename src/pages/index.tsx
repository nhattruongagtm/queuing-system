import { Layout } from "antd";
import React from "react";
import { Route, Routes } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";
import { IRoute } from "../constant/routes";
import Dashboard from "./Dashboard/Dashboard";
import Devices from "./Devices/Devices";
import NumberProvidation from "./NumberProvidation/NumberProvidation";
import Report from "./Report/Report";
import Settings from "./Settings/Settings";
import UserInfo from "./UserInfo/UserInfo";
import Head from "../components/Header/Header";
import Services from "./Services/Services";

type Props = {};

const UtilPage = (props: Props) => {
  const { Header, Footer, Sider, Content } = Layout;
  return (
    <Layout className="admin">
      <Sider className="sidebar">
        <Sidebar />
      </Sider>
      <Content className="content">
        <Header className="content__header">
          <Head />
        </Header>
        <div className="content__main">
          <Routes>
            <Route path={IRoute.DASHBOARD} element={<Dashboard />} />
            <Route path={IRoute.DEVICES} element={<Devices />} />
            <Route path={IRoute.SERVICES} element={<Services />} />
            <Route path={IRoute.SETTINGS} element={<Settings />} />
            <Route
              path={IRoute.NUMBER_PROVIDATION}
              element={<NumberProvidation />}
            />
            <Route path={IRoute.REPORT} element={<Report />} />
            <Route path={IRoute.INFO} element={<UserInfo />} />
            <Route path="*" element={<>Not found</>} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};

export default UtilPage;
