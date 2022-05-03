import { CaretRightOutlined } from "@ant-design/icons";
import { DatePicker, Input, Layout, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import UserList from "./UserList";
interface Props {}
const { Content, Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

const User = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Layout className="dashbad services number__provide">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">
          Danh sách thiết bị
        </h3>
        <div className="devices__main">
          <div className="devices__list">
            <div className="devices__content__selects provide__selects user__list">
              <div className="devices__content__item">
                <p>Chọn thời gian</p>
                <div className="services__datepickers">
                  <DatePicker />
                  <CaretRightOutlined />
                  <DatePicker />
                </div>
              </div>
              <div className="devices__content__item">
                <div className="devices__search__child">
                  <p className="devices__search__title">Từ khóa</p>
                  <div className="devices__search__input">
                    <Input />
                    {/* <SearchOutlined /> */}
                  </div>
                </div>
              </div>
            </div>
            <UserList />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default User;
