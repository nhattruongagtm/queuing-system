import React from "react";
import { DatePicker, Layout } from "antd";
import { Select } from "antd";
import { Input } from "antd";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import ServiceList from "./ServiceList";
import { IRoute } from "../../constant/routes";
interface Props {}
const { Content, Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

const Services = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Layout className="dashbad services">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">
          Danh sách thiết bị
        </h3>
        <div className="devices__main">
          <div className="devices__list">
            <div className="devices__content__selects">
              <div className="devices__content__item select__active">
                <p>Trạng thái hoạt động</p>
                <Select
                  defaultValue={"all"}
                  className="devices__content__item "
                >
                  <Option value="all">Tất cả</Option>
                  <Option value="active">Hoạt động</Option>
                  <Option value="inactive">Ngưng hoạt động</Option>
                </Select>
              </div>
              <div className="devices__content__item">
                <p>Chọn thời gian</p>
                <div className="services__datepickers">
                  <DatePicker />
                  <CaretRightOutlined />
                  <DatePicker />
                </div>
              </div>
              <div className="devices__content__item devices__search">
                <div className="devices__search__child">
                  <p className="devices__search__title">Từ khóa</p>
                  <div className="devices__search__input">
                    <Input />
                    {/* <SearchOutlined /> */}
                  </div>
                </div>
              </div>
            </div>
            <ServiceList />
          </div>
          <div className="devices__tags">
            <div
              className="devices__tags__add"
              onClick={() => navigate(IRoute.ADD_SERVICE)}
            >
              <img src="./imgs/add.svg" alt="" />
              Thêm dịch vụ
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Services;
