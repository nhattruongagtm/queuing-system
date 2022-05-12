import React, { useState } from "react";
import { Layout } from "antd";
import { Select } from "antd";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DeviceList from "./DeviceList";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import { useDispatch } from "react-redux";
import { filterDevice, resetEdit } from "../../slice/deviceSlice";
import { FilterParams } from "../../api/device";
interface Props {}
const { Content, Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

const Devices = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params, setParams] = useState<FilterParams>({
    activeStatus: -1,
    connectStatus: -1,
    search: "",
  });

  const handleCreateDevice = () => {
    dispatch(resetEdit());
    navigate(IRoute.ADD_DEVICE);
  };

  return (
    <Layout className="dashbad">
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
                  className="devices__content__item "
                  defaultValue={"-1"}
                  onChange={(value) => {
                    setParams({
                      ...params,
                      activeStatus: Number(value),
                    });
                    dispatch(
                      filterDevice({
                        ...params,
                        activeStatus: Number(value),
                      })
                    );
                  }}
                >
                  <Option value="-1">Tất cả</Option>
                  <Option value="0">Hoạt động</Option>
                  <Option value="1">Ngưng hoạt động</Option>
                </Select>
              </div>
              <div className="devices__content__item">
                <p>Trạng thái kết nối</p>
                <Select
                  defaultValue={"-1"}
                  className="devices__content__item"
                  onChange={(value) => {
                    setParams({
                      ...params,
                      connectStatus: Number(value),
                    });
                    dispatch(
                      filterDevice({
                        ...params,
                        connectStatus: Number(value),
                      })
                    );
                  }}
                >
                  <Option value="-1">Tất cả</Option>
                  <Option value="0">Kết nối</Option>
                  <Option value="1">Mất kết nối</Option>
                </Select>
              </div>
              <div className="devices__content__item devices__search">
                <div className="devices__search__child">
                  <p className="devices__search__title">Từ khóa</p>
                  <div className="devices__search__input">
                    <Input
                      
                      onChange={(e) =>
                        dispatch(
                          filterDevice({
                            ...params,
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
            <DeviceList />
          </div>
          <div className="devices__tags">
            <div className="devices__tags__add" onClick={handleCreateDevice}>
              <img src="./imgs/add.svg" alt="" />
              Thêm thiết bị
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Devices;
