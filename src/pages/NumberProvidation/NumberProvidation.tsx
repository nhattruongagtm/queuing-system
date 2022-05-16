import React, { useEffect, useState } from "react";
import { DatePicker, Layout } from "antd";
import { Select } from "antd";
import { Input } from "antd";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import NumberList from "./NumberList";
import NumberPopup from "./NumberPopup";
import { useDispatch, useSelector } from "react-redux";
import { filterNumber } from "../../slice/numberSlice";
import { RootState } from "../../store";
import { Service } from "../../models/services";
import { loadServiceList } from "../../api/service";
import { Device } from "../../models/device";
import { loadDeviceList } from "../../api/device";
interface Props {}
const { Content, Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

export interface FilterNumber {
  serviceID: string;
  status: number;
  deviceID: string;
  dateFrom: string;
  dateTo: string;
  search: string;
}

const NumberProvidation = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.numbers.fitler);
  const [service, setService] = useState<Service[]>([]);
  const [device, setDevice] = useState<Device[]>([]);

  useEffect(() => {
    loadServiceList()
      .then((res) => {
        setService(res.slice(0, 5));
      })
      .catch((e) => {
        console.log(e);
      });
    loadDeviceList()
      .then((res) => {
        setDevice(res.slice(0, 5));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
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
                <p>Tên dịch vụ</p>
                <Select
                  defaultValue={"-1"}
                  className="numbers__content__item"
                  onChange={(value) =>
                    dispatch(
                      filterNumber({
                        ...filter,
                        serviceID: value,
                      })
                    )
                  }
                >
                  <Option value="-1">Tất cả</Option>

                  {service.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="devices__content__item provide__selects__item select__active">
                <p>Tình trạng</p>
                <Select
                  defaultValue={"-1"}
                  className="numbers__content__item"
                  onChange={(value) =>
                    dispatch(
                      filterNumber({
                        ...filter,
                        status: Number(value),
                      })
                    )
                  }
                >
                  <Option value="-1">Tất cả</Option>
                  <Option value="0">Đang chờ</Option>
                  <Option value="1">Đã sử dụng</Option>
                  <Option value="2">Bỏ qua</Option>
                </Select>
              </div>
              <div className="devices__content__item provide__selects__item select__active">
                <p>Nguồn cấp</p>
                <Select
                  defaultValue={"-1"}
                  className="numbers__content__item"
                  onChange={(value) =>
                    dispatch(
                      filterNumber({
                        ...filter,
                        deviceID: value,
                      })
                    )
                  }
                >
                  <Option value="-1">Tất cả</Option>

                  {device.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="devices__content__item provide__selects__item">
                <p>Chọn thời gian</p>
                <div className="services__datepickers">
                  <DatePicker
                    onChange={(dates, date) =>
                      dispatch(
                        filterNumber({
                          ...filter,
                          dateFrom: date,
                        })
                      )
                    }
                  />
                  <CaretRightOutlined />
                  <DatePicker
                    onChange={(dates, date) =>
                      dispatch(
                        filterNumber({
                          ...filter,
                          dateTo: date,
                        })
                      )
                    }
                  />
                </div>
              </div>
              <div className="devices__content__item devices__search provide__selects__item">
                <div className="devices__search__child">
                  <p className="devices__search__title">Từ khóa</p>
                  <div className="devices__search__input number__search__input">
                    <Input
                      value={filter.search}
                      onChange={(e) =>
                        dispatch(
                          filterNumber({
                            ...filter,
                            search: e.target.value,
                          })
                        )
                      }
                    />
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
