import { CaretRightOutlined } from "@ant-design/icons";
import { DatePicker, Input, Layout, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import RoleList from "./RoleList";
interface Props {}
const { Content, Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

const Role = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Layout className="dashbad services number__provide">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">
          Danh sách thiết bị
        </h3>
        <div className="devices__main">
          <div className="devices__list">
            <div className="devices__content__selects provide__selects roles__list">
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
            <RoleList />
          </div>
          <div className="devices__tags">
            <div
              className="devices__tags__add"
              onClick={() => navigate(IRoute.SETTINGS_ADD_ROLE)}
            >
              <img src="./imgs/add.svg" alt="" />
              Thêm vai trò
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Role;
