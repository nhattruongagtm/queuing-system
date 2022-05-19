import { CaretRightOutlined } from "@ant-design/icons";
import { DatePicker, Input, Layout, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import RoleList from "./RoleList";
import { RootState } from "../../store";
import { filterRole } from "../../slice/roleSlice";
interface Props {}
const { Content, Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

const Role = (props: Props) => {
  const navigate = useNavigate();
  const filter = useSelector((state: RootState) => state.role.filter);
  const dispatch = useDispatch();
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
                    <Input
                      placeholder="Tìm kiếm theo tên"
                      value={filter.search}
                      onChange={(e) =>
                        dispatch(filterRole({ search: e.target.value }))
                      }
                    />
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
