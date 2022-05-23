import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import DashboardData from "./DashboardData";
import DashboardChart from "./DashboardChart";
import DatePicker from "../../components/DatePicker/DatePicker";
import { Statistic } from "../../models/statistic";
import { getStatisticsByNumbers } from "../../api/statistic";
interface Props {}

const { Content, Sider } = Layout;

const Dashboard = (props: Props) => {
  
  return (
    <Layout className="dashboard">
      <Content className="dashboard__content">
        <h3 className="dashboard__content__title title-1">Biểu đồ cấp số</h3>
        <DashboardData />
        <DashboardChart />
      </Content>
      <Sider className="dashboard__sider">
        <h3 className="dashboard__sider__title title-1">Tổng quan</h3>
        <div className="dashboard__sider__status">
          <div className="sider__status__item devices shadow">
            <div className="sider__status__chart">
              <span>90%</span>
            </div>
            <div className="sider__status__numbers">
              <h3>4.221</h3>
              <h3>
                <img src="./imgs/monitor.svg" alt="" />
                <span>Thiết bị</span>
              </h3>
            </div>
            <div className="sider__status__content">
              <div className="status__content__item">
                <p>
                  <span className="dot"></span>
                  <span>Đang hoạt động</span>
                </p>
                <span>3.799</span>
              </div>
              <div className="status__content__item">
                <p>
                  <span className="dot"></span>
                  <span>Ngưng hoạt động</span>
                </p>
                <span>21</span>
              </div>
            </div>
          </div>
          <div className="sider__status__item services shadow">
            <div className="sider__status__chart">
              <span>90%</span>
            </div>
            <div className="sider__status__numbers">
              <h3>4.221</h3>
              <h3>
                <img src="./imgs/monitor.svg" alt="" />
                <span>Thiết bị</span>
              </h3>
            </div>
            <div className="sider__status__content">
              <div className="status__content__item">
                <p>
                  <span className="dot"></span>
                  <span>Đang hoạt động</span>
                </p>
                <span>3.799</span>
              </div>
              <div className="status__content__item">
                <p>
                  <span className="dot"></span>
                  <span>Ngưng hoạt động</span>
                </p>
                <span>21</span>
              </div>
            </div>
          </div>
          <div className="sider__status__item numbers shadow">
            <div className="sider__status__chart">
              <span>90%</span>
            </div>
            <div className="sider__status__numbers">
              <h3>4.221</h3>
              <h3>
                <img src="./imgs/monitor.svg" alt="" />
                <span>Thiết bị</span>
              </h3>
            </div>
            <div className="sider__status__content">
              <div className="status__content__item">
                <p>
                  <span className="dot"></span>
                  <span>Đang hoạt động</span>
                </p>
                <span>3.799</span>
              </div>
              <div className="status__content__item">
                <p>
                  <span className="dot"></span>
                  <span>Ngưng hoạt động</span>
                </p>
                <span>21</span>
              </div>
            </div>
          </div>
          <DatePicker />
        </div>
      </Sider>
    </Layout>
  );
};

export default Dashboard;
