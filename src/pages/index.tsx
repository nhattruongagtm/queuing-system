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
import AddDevice from "./Devices/AddDevice";
import DeviceDetail from "./Devices/DeviceDetail";
import AddService from "./Services/AddService";
import ServiceDetail from "./Services/ServiceDetail";
import NumberProvicerForm from "./NumberProvidation/NumberProvicerForm";
import NumberPopup from "./NumberProvidation/NumberPopup";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ModalState } from "../slice/modalSlice";
import NumberDetail from "./NumberProvidation/NumberDetail";
import AddRole from "./Settings/AddRole";
import AddAccount from "./Settings/AddAccount";
import Role from "./Settings/Role";
import Account from "./Settings/Account";
import User from "./Settings/User";

type Props = {};

const UtilPage = (props: Props) => {
  const { Header, Footer, Sider, Content } = Layout;
  const modalState = useSelector((state: RootState) => state.modal.status);
  const Layer = () => (
    <div
      className={`layer ${modalState !== ModalState.HIDDEN ? "display" : ""}`}
    ></div>
  );
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
            <Route
              path={IRoute.NUMBER_PROVIDATION_CREATE}
              element={<NumberProvicerForm />}
            />
            <Route
              path={`${IRoute.NUMBER_PROVIDATION_DETAIL}/:id`}
              element={<NumberDetail />}
            />
            <Route path={IRoute.REPORT} element={<Report />} />
            <Route path={IRoute.INFO} element={<UserInfo />} />
            <Route path={`${IRoute.ADD_DEVICE}`} element={<AddDevice />} />
            <Route
              path={`${IRoute.DEVICE_DETAIL}/:id`}
              element={<DeviceDetail />}
            />
            <Route path={IRoute.ADD_SERVICE} element={<AddService />} />
            <Route
              path={`${IRoute.SERVICE_DETAIL}/:id`}
              element={<ServiceDetail />}
            />
            <Route path={IRoute.SETTINGS_ROLE} element={<Role />} />
            <Route path={IRoute.SETTINGS_ADD_ROLE} element={<AddRole />} />
            <Route path={IRoute.SETTINGS_ACCOUNT} element={<Account />} />
            <Route path={IRoute.SETTINGS_USER} element={<User />} />
            <Route
              path={IRoute.SETTINGS_ADD_ACCOUNT}
              element={<AddAccount />}
            />
            <Route path="*" element={<>Not found</>} />
          </Routes>
        </div>
      </Content>
      <Layer />
      <NumberPopup />
    </Layout>
  );
};

export default UtilPage;
