import { Area } from "@ant-design/plots";
import React, { useEffect, useState } from "react";

type Props = {};

const DashboardChart = (props: Props) => {
    const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData((json as []).slice(0,10)))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
    smooth: true,
  };
  return (
    <div className="dashboard__chart">
      <div className="dashboard__chart__header">
        <div className="chart__header__title">
          <p>Bảng thống kê theo ngày</p>
          <p>Tháng 11/2021</p>
        </div>
        <div className="chart__header__date">
          <span>Xem theo</span>
          <div className="chart__date__select">
            <select name="" id="">
              <option value="">Ngày</option>
              <option value="">Tuần</option>
              <option value="">Tháng</option>
            </select>
            <i className='bx bxs-down-arrow'></i>
          </div>
        </div>
      </div>
      <div className="dashboard__chart__main">
      <Area {...config} />
      </div>
    </div>
  );
};

export default DashboardChart;
