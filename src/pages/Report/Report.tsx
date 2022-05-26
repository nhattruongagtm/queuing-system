import { CaretRightOutlined } from "@ant-design/icons";
import { DatePicker, Input, Layout, Select } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Numbers } from "../../models/numbers";
import { RootState } from "../../store";
import { exportCSV, FormatKey } from "../../utils/exportCSV";
import ReportList from "./ReportList";
interface Props {}
const { Content } = Layout;

export interface FilterReport {
  dateFrom: string;
  dateTo: string;
}

const Report = (props: Props) => {
  const navigate = useNavigate();
  const numberList = useSelector((state: RootState) => state.report.reportList);
  const [filter, setFilter] = useState<FilterReport>({
    dateFrom: "",
    dateTo: "",
  });
  const handleExportCSV = () => {
    const mapKey: FormatKey<Numbers> = {
      id: "Số thứ tự",
      serviceName: "Tên dịch vụ",
      createdDate: "Thời gian cấp",
      status: "Tình trạng",
      deviceName: "Nguồn cấp",
      expireDate: "Hạn sử dụng",
      customerID: "Mã khách hàng",
      customerName: "Tên khách hàng",
      deviceID: "Mã thiết bị",
      serviceID: "Tên dịch bụ",
    };
    exportCSV(
      {
        mapKey,
        list: numberList,
      },
      "bao-cao.csv",
      "report"
    );
  };
  return (
    <Layout className="dashbad services number__provide">
      <Content className="dasbard__content">
        <div className="devices__main">
          <div className="devices__list">
            <div className="devices__content__selects provide__selects">
              <div className="devices__content__item provide__selects__item">
                <p>Chọn thời gian</p>
                <div className="services__datepickers">
                  <DatePicker
                    onChange={(d1, d2) =>
                      setFilter({
                        ...filter,
                        dateFrom: d2,
                      })
                    }
                  />
                  <CaretRightOutlined />
                  <DatePicker
                    onChange={(d1, d2) =>
                      setFilter({
                        ...filter,
                        dateTo: d2,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <ReportList filter={filter} />
          </div>
          <div className="devices__tags">
            <a id="report" onClick={handleExportCSV}>
              <div className="devices__tags__add report__add">
                <img src="./imgs/download.svg" alt="" />
                Tải về
              </div>
            </a>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Report;
