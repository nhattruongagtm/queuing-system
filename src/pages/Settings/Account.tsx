import { CaretRightOutlined } from "@ant-design/icons";
import { DatePicker, Input, Layout, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import AccountList from "./AccountList";
import RoleList from "./RoleList";
import { useDispatch, useSelector } from "react-redux";
import { filterAccount, resetEditAccount } from "../../slice/accountSlice";
import { RootState } from "../../store";
interface Props {}
const { Content, Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

const Account = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filter = useSelector((state: RootState)=>state.account.fitler);
  return (
    <Layout className="dashbad services number__provide">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">
          Danh sách tài khoản
        </h3>
        <div className="devices__main account">
          <div className="devices__list">
            <div className="devices__content__selects provide__selects account__options">
              <div className="devices__content__item select__active account__select">
                <p>Trạng thái hoạt động</p>
                <Select
                  defaultValue={"-1"}
                  className="devices__content__item "
                  onChange={value=>dispatch(filterAccount({
                    ...filter,
                    status: Number(value)
                  }))}
                >
                  <Option value="-1">Tất cả</Option>
                  <Option value="0">Hoạt động</Option>
                  <Option value="1">Ngưng hoạt động</Option>
                </Select>
              </div>
              <div className="devices__content__item">
                <div className="devices__search__child">
                  <p className="devices__search__title">Từ khóa</p>
                  <div className="devices__search__input">
                    <Input value={filter.search}  onChange={e=>dispatch(filterAccount({
                    ...filter,
                    search: e.target.value
                  }))}/>
                    {/* <SearchOutlined /> */}
                  </div>
                </div>
              </div>
            </div>
            <AccountList />
          </div>
          <div className="devices__tags">
            <div
              className="devices__tags__add account__tags"
              onClick={() => {
                navigate(IRoute.SETTINGS_ADD_ACCOUNT);
                dispatch(resetEditAccount())
              }}
            >
              <img src="./imgs/add.svg" alt="" />
              Thêm tài khoản
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Account;
