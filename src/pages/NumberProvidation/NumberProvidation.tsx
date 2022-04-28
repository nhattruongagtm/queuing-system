import React from "react";
import { DatePicker, Layout } from "antd";
import { Select } from "antd";
import { Input } from "antd";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import NumberList from "./NumberList";
interface Props {}
const { Content, Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

const NumberProvidation = (props: Props) => {
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
              <div className="devices__content__item provide__selects__item select__active">
                <p>Trạng thái hoạt động</p>
                <Select defaultValue={"all"} className="numbers__content__item">
                  <Option value="all">Tất cả</Option>
                  <Option value="active">Kiosk</Option>
                  <Option value="inactive">Hệ thống</Option>
                </Select>
              </div>
              <div className="devices__content__item provide__selects__item select__active">
                <p>Tình trạng</p>
                <Select defaultValue={"all"} className="numbers__content__item">
                  <Option value="all">Tất cả</Option>
                  <Option value="active">Dang chờ</Option>
                  <Option value="waiting">Đã sử dụng</Option>
                  <Option value="skip">Bỏ qua</Option>
                </Select>
              </div>
              <div className="devices__content__item provide__selects__item select__active">
                <p>Nguồn cấp</p>
                <Select defaultValue={"all"} className="numbers__content__item">
                  <Option value="all">Tất cả</Option>
                  <Option value="active">Khám sản - Phụ khoa</Option>
                  <Option value="inactive">Khám răng hàm mặt</Option>
                </Select>
              </div>

              <div className="devices__content__item provide__selects__item">
                <p>Chọn thời gian</p>
                <div className="services__datepickers">
                  <DatePicker />
                  <CaretRightOutlined />
                  <DatePicker />
                </div>
              </div>
              <div className="devices__content__item devices__search provide__selects__item">
                <div className="devices__search__child">
                  <p className="devices__search__title">Từ khóa</p>
                  <div className="devices__search__input number__search__input">
                    <Input />
                  </div>
                </div>
              </div>
            </div>
            <NumberList />
          </div>
          <div className="devices__tags">
            <div
              className="devices__tags__add"
              onClick={() => navigate(IRoute.NUMBER_PROVIDATION_CREATE)}
            >
              <img src="./imgs/add.svg" alt="" />
              Cấp số mới
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default NumberProvidation;
