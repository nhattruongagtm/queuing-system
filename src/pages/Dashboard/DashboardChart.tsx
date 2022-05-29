import { Area } from "@ant-design/plots";
import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getNumberByDay,
  getNumberByWeek,
  getNumberByYear,
} from "../../api/statistic";
import { ChartData } from "../../models/statistic";
import { RootState } from "../../store";

type Props = {};

const { Option } = Select;

const DashboardChart = (props: Props) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [type, setType] = useState<number>(0);
  const date = useSelector((state: RootState) => state.dashboard.date);

  useEffect(() => {
    const loadChartData = async () => {
      if (type === 0) {
        const data = await getNumberByDay(date.year, date.month);
        setData(data);
      } else if (type === 1) {
        const data = await getNumberByWeek(date.year, date.month);
        console.log(data)
        setData(data);
      } else {
        const data = await getNumberByYear(date.year);
        console.log(data.length)
        setData(data);
      }
    };
    loadChartData()
  }, [type,date]);

  const config = {
    data,
    xField: "date",
    yField: "value",
    xAxis: {
      range: [0, 1],
      // tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
    smooth: true,
  };
  const handleChange = (value: string) => {
    setType(Number(value));
  };
  return (
    <div className="dashboard__chart">
      <div className="dashboard__chart__header">
        <div className="chart__header__title">
          <p>Bảng thống kê theo ngày</p>
          <p>
            Tháng {date.month}/{date.year}
          </p>
        </div>
        <div className="chart__header__date">
          <span>Xem theo</span>
          <div className="chart__date__select">
            {/* <select name="" id="">
              <option value="">Ngày</option>
              <option value="">Tuần</option>
              <option value="">Tháng</option>
            </select> */}
            <Select
              defaultValue="0"
              style={{
                width: 100,
              }}
              onChange={handleChange}
            >
              <Option value="0">Ngày</Option>
              <Option value="1">Tuần</Option>
              <Option value="2">Tháng</Option>
            </Select>
            {/* <i className="bx bxs-down-arrow"></i> */}
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
