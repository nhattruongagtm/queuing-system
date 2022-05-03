import { CaretRightOutlined } from "@ant-design/icons";
import { DatePicker, Input, Layout, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import ReportList from "./ReportList";
interface Props {}
const { Content, Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

const Report = (props: Props) => {
  const navigate = useNavigate();
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
                  <DatePicker />
                  <CaretRightOutlined />
                  <DatePicker />
                </div>
              </div>
            </div>
            <ReportList />
          </div>
          <div className="devices__tags">
            <div className="devices__tags__add report__add">
              <img src="./imgs/download.svg" alt="" />
              Tải về
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Report;
