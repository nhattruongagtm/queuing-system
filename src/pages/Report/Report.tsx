import { CaretRightOutlined } from "@ant-design/icons";
import { DatePicker, Input, Layout, Select } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import ReportList from "./ReportList";
interface Props {}
const { Content } = Layout;

export interface FilterReport {
  dateFrom: string;
  dateTo: string;
}

const Report = (props: Props) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterReport>({
    dateFrom: "",
    dateTo: "",
  });
  // const handleExportCSV = () => {
  //   const mapKey: FormatKey<Numbers> = {
  //     bookingCode: "Booking code",
  //     checkInPort: "Cổng check-in",
  //     checkStatus: "Trạng thái đối soát",
  //     exportDate: "Ngày hết hạn",
  //     name: "Tên sự kiện",
  //     status: "Tình trạng sử dụng",
  //     ticketNumber: "Số vé",
  //     typeName: "Tên loại vé",
  //     usingDate: "Ngày sử dụng",
  //   };
  //   exportCSV(
  //     {
  //       mapKey,
  //       list: [],
  //     },
  //     "bao-cao.csv",
  //     "report"
  //   );
  // };
  return (
    <Layout className="dashbad services number__provide">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">
          Danh sách thiết bị
        </h3>
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
            <a id="report">
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
