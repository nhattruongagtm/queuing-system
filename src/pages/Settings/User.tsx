import { CaretRightOutlined } from "@ant-design/icons";
import { DatePicker, Input, Layout, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import { filterLog } from "../../slice/logSlice";
import { RootState } from "../../store";
import UserList from "./UserList";
interface Props {}
const { Content, Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

const User = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.log.fitler);
  return (
    <Layout className="dashbad services number__provide">
      <Content className="dasbard__content">
        <div className="devices__main">
          <div className="devices__list">
            <div className="devices__content__selects provide__selects user__list">
              <div className="devices__content__item">
                <p>Chọn thời gian</p>
                <div className="services__datepickers">
                  <DatePicker
                    onChange={(a, b) =>
                      dispatch(
                        filterLog({
                          ...filter,
                          dateFrom: b,
                        })
                      )
                    }
                  />
                  <CaretRightOutlined />
                  <DatePicker
                    onChange={(a, b) =>
                      dispatch(
                        filterLog({
                          ...filter,
                          dateTo: b,
                        })
                      )
                    }
                  />
                </div>
              </div>
              <div className="devices__content__item">
                <div className="devices__search__child">
                  <p className="devices__search__title">Từ khóa</p>
                  <div className="devices__search__input">
                    <Input
                      value={filter.search}
                      onChange={(e) =>
                        dispatch(
                          filterLog({
                            ...filter,
                            search: e.target.value,
                          })
                        )
                      }
                    />
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
