import { Checkbox, Input, Layout, Select, Tag, TagProps } from "antd";
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

const AddService = (props: Props) => {
  return (
    <Layout className="add__device">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">Quản lý dịch vụ</h3>
        <div className="add__device__form">
          <div className="add__device__main add__service__main">
            <div className="device__title title">Thông tin dịch vụ</div>
            <div className="device__inputs service__inputs">
              <div className="service__input__left">
                <div className="device__inputs__item service__input__item">
                  <h4 className="device__input__title">
                    Mã dịch vụ: <span>*</span>
                  </h4>
                  <Input placeholder="Nhập mã thiết bị" />
                </div>
                <div className="device__inputs__item service__input__item">
                  <h4 className="device__input__title">
                    Mã dịch vụ: <span>*</span>
                  </h4>
                  <Input placeholder="Nhập mã thiết bị" />
                </div>
              </div>
              <div className="service__input__right">
                <div className="device__inputs__item service__input__item">
                  <h4 className="device__input__title">
                    Mô tả: <span>*</span>
                  </h4>
                  <Input placeholder="Mô tả dịch vụ" />
                </div>
              </div>
              <div className="service__principles">
                <h3 className="service__principles__title title">
                  Quy tắc cấp số
                </h3>
                <div className="service__principles__main">
                  <div className="service__principles__item">
                    <Checkbox>
                      <span className="check__label">Tăng tự động từ:</span>{" "}
                    </Checkbox>{" "}
                    <Input placeholder="0001" /> <span>đến</span>{" "}
                    <Input placeholder="9999" />
                  </div>
                  <div className="service__principles__item">
                    <Checkbox>
                      <span className="check__label">Prefix:</span>{" "}
                    </Checkbox>{" "}
                    <Input placeholder="0001" />
                  </div>
                  <div className="service__principles__item">
                    <Checkbox>
                      <span className="check__label">Surfix:</span>{" "}
                    </Checkbox>{" "}
                    <Input placeholder="0001" />
                  </div>
                  <div className="service__principles__item">
                    <Checkbox>
                      <span className="check__label">Reset mỗi ngày:</span>{" "}
                    </Checkbox>{" "}
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <p className="device__notify">
              <span>*</span> Là trường thông tin bắc buộc
            </p>
          </div>
          <div className="add__device__actions add__service__actions">
            <button className="button button--outline">Hủy bỏ</button>
            <button className="button">Thêm thiết bị</button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default AddService;
