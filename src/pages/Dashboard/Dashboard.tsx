import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import DashboardData from "./DashboardData";
import DashboardChart from "./DashboardChart";
import DatePicker, { DateTime } from "../../components/DatePicker/DatePicker";
import { StatisticDevice } from "../../models/statistic";
import {
  getStatisticsByNumbers,
  getDevicesByMonth,
  getNumberByMonth,
  getServiceByMonth,
} from "../../api/statistic";
import { useDispatch } from "react-redux";
import { updateDate } from "../../slice/dashboardSlice";
interface Props {}

const { Content, Sider } = Layout;

const Dashboard = (props: Props) => {
  const dispatch = useDispatch();
  const [deviceStatistic, setDeviceStatistic] = useState<StatisticDevice>();
  const [seriviceStatistic, setServiceStatistic] = useState<StatisticDevice>();
  const [numberStatistic, setNumberStatistic] = useState<StatisticDevice>();
  const [dateTime,setDateTime] = useState<DateTime>({
    day: new Date().getDate(),
    month: new Date().getMonth()+1,
    year: new Date().getFullYear()
  });
  useEffect(() => {
    getDevicesByMonth(new Date().getMonth() + 1)
      .then((res) => {
        console.log(res);
        setDeviceStatistic(res);
      })
      .catch((e) => {
        console.log(e);
      });
    getServiceByMonth(new Date().getMonth() + 1)
      .then((res) => {
        console.log(res);
        setServiceStatistic(res);
      })
      .catch((e) => {
        console.log(e);
      });
    getNumberByMonth(new Date().getMonth() + 1)
      .then((res) => {
        console.log(res);
        setNumberStatistic(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleGetDate = (date: DateTime) =>{
    setDateTime(date);
    
  }
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
            {deviceStatistic && (
              <>
                <div className="sider__status__chart">
                  <span>90%</span>
                </div>
                <div className="sider__status__numbers">
                  <h3>{deviceStatistic?.total}</h3>
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
                    <span>{deviceStatistic?.active}</span>
                  </div>
                  <div className="status__content__item">
                    <p>
                      <span className="dot"></span>
                      <span>Ngưng hoạt động</span>
                    </p>
                    <span>{deviceStatistic?.inactive}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="sider__status__item services shadow">
            {seriviceStatistic && (
              <>
                <div className="sider__status__chart">
                  <span>90%</span>
                </div>
                <div className="sider__status__numbers">
                  <h3>{seriviceStatistic.total}</h3>
                  <h3>
                    <img src="./imgs/services.svg" alt="" />
                    <span>Dịch vụ</span>
                  </h3>
                </div>
                <div className="sider__status__content">
                  <div className="status__content__item">
                    <p>
                      <span className="dot"></span>
                      <span>Đang hoạt động</span>
                    </p>
                    <span>{seriviceStatistic.active}</span>
                  </div>
                  <div className="status__content__item">
                    <p>
                      <span className="dot"></span>
                      <span>Ngưng hoạt động</span>
                    </p>
                    <span>{seriviceStatistic.inactive}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="sider__status__item numbers shadow">
            {numberStatistic && (
              <>
                <div className="sider__status__chart">
                  <span>90%</span>
                </div>
                <div className="sider__status__numbers">
                  <h3>{numberStatistic.total}</h3>
                  <h3>
                    <img src="./imgs/number.svg" alt="" />
                    <span>Cấp số</span>
                  </h3>
                </div>
                <div className="sider__status__content number">
                  <div className="status__content__item">
                    <p>
                      <span className="dot"></span>
                      <span>Đã sử dụng</span>
                    </p>
                    <span>{numberStatistic.active}</span>
                  </div>
                  <div className="status__content__item">
                    <p>
                      <span className="dot"></span>
                      <span>Đang chờ</span>
                    </p>
                    <span>{numberStatistic.inactive}</span>
                  </div>
                  <div className="status__content__item">
                    <p>
                      <span className="dot"></span>
                      <span>Bỏ qua</span>
                    </p>
                    <span>{numberStatistic.skip}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <DatePicker onGetDate={handleGetDate}/>
        </div>
      </Sider>
    </Layout>
  );
};

export default Dashboard;
