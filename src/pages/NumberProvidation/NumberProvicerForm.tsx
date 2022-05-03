import { Input, Select } from "antd";
import React from "react";

import { Layout } from "antd";
import { useDispatch } from "react-redux";
import { displayNumberPopup } from "../../slice/modalSlice";
const { Content } = Layout;
const { Option } = Select;
type Props = {};

const NumberProvicerForm = (props: Props) => {
  const dispatch = useDispatch();
  return (
    <Layout className="dashbad services">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">Quản lí cấp số</h3>
        <div className="devices__main ">
          <div className="numbers__main">
            <div className="form">
              <h2 className="form__title">Cấp số mới</h2>
              <h2 className="form__intro">Dịch vụ khách hàng lựa chọn</h2>
              <Select
                defaultValue={"all"}
                className="numbers__content__item form__selects"
                placeholder="Chọn dịch vụ"
              >
                <Option value="all">Khám tim mạch</Option>
                <Option value="active">Khám sản - Phụ khoa</Option>
                <Option value="inactive">Khám răng hàm mặt</Option>
                <Option value="inactive">Khám tai mũi họng</Option>
              </Select>
              <div className="form__actions">
                <button className=" button button--outline">Hủy bỏ</button>
                <button
                  className=" button button--fill"
                  onClick={() => dispatch(displayNumberPopup())}
                >
                  In số
                </button>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default NumberProvicerForm;
