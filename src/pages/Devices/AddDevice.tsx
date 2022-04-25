import { Input, Layout, Select, Tag, TagProps } from "antd";
import React from "react";
const { Content } = Layout;
const { Option } = Select;

type Props = {};

interface tagProps {
  label: string;
  value: string;
  closable: boolean;
  onClose: () => void;
}

function tagRender(props: any) {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={"#FFAC6A"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}
const options = [
  { value: "Khám tim mạch" },
  { value: "Khám sản phụ khoa" },
  { value: "Khám răng hàm mặt" },
  { value: "Khám tai mũi họng" },
  { value: "Khám tổng quát" },
];

const AddDevice = (props: Props) => {
  return (
    <Layout className="add__device">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">Quản lý thiết bị</h3>
        <div className="add__device__form">
          <div className="add__device__main">
            <div className="device__title title">Thông tin thiết bị</div>
            <div className="device__inputs">
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Mã thiết bị: <span>*</span>
                </h4>
                <Input placeholder="Nhập mã thiết bị" />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Loại thiết bị: <span>*</span>
                </h4>
                <Select
                  placeholder="Chọn loại thiết bị"
                  className="add__device__select"
                >
                  <Option value="kio"> Kiosk</Option>
                  <Option value="counter"> Display counter</Option>
                </Select>
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Tên thiết bị: <span>*</span>
                </h4>
                <Input placeholder="Nhập tên thiết bị" />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Tên đăng nhập: <span>*</span>
                </h4>
                <Input placeholder="Nhập tài khoản" />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Địa chỉ IP: <span>*</span>
                </h4>
                <Input placeholder="Nhập địa chỉ IP" />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Mật khẩu: <span>*</span>
                </h4>
                <Input placeholder="Nhập mật khẩu" />
              </div>
            </div>
            <div className="device__input__which">
              <h4 className="device__input__title">
                Dịch vụ sử dụng: <span>*</span>
              </h4>
              {/* <Input placeholder="Nhập dịch vụ sử dụng" /> */}
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                // defaultValue={["gold", "cyan"]}
                style={{ width: "100%" }}
                options={options}
              />
            </div>
            <p className="device__notify">
              <span>*</span> Là trường thông tin bắc buộc
            </p>
          </div>
          <div className="add__device__actions">
            <button className="button button--outline">Hủy bỏ</button>
            <button className="button">Thêm thiết bị</button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default AddDevice;
