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

const AddAccount = (props: Props) => {
  return (
    <Layout className="add__device add__account">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">Quản lý tài khoản</h3>
        <div className="add__device__form add__account__form">
          <div className="add__device__main">
            <div className="device__title title">Thông tin tài khoản</div>
            <div className="device__inputs">
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Họ tên: <span>*</span>
                </h4>
                <Input placeholder="Nhập họ tên" />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Tên đăng nhập: <span>*</span>
                </h4>
                <Select
                  placeholder="Nhập tên đăng nhập"
                  className="add__device__select"
                >
                  <Option value="kio"> Kiosk</Option>
                  <Option value="counter"> Display counter</Option>
                </Select>
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Số điện thoại: <span>*</span>
                </h4>
                <Input placeholder="Nhập số điện thoại" />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Mật khẩu: <span>*</span>
                </h4>
                <Input.Password placeholder="Nhập mật khẩu" />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Email: <span>*</span>
                </h4>
                <Input placeholder="Nhập email" />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Nhập lại mật khẩu: <span>*</span>
                </h4>
                <Input.Password placeholder="Nhập mật khẩu" />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Vai trò: <span>*</span>
                </h4>
                <Select
                  placeholder="Nhập tên đăng nhập"
                  className="add__device__select"
                >
                  <Option value="accountant"> Kế toán</Option>
                  <Option value="manager"> Quản lý</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Tình trạng: <span>*</span>
                </h4>
                <Select
                  placeholder="Nhập tên đăng nhập"
                  className="add__device__select"
                >
                  <Option value="kio"> Hoạt động</Option>
                  <Option value="counter"> Ngưng hoạt động</Option>
                </Select>
              </div>
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

export default AddAccount;
