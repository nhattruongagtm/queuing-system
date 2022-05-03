import { Input, Layout, Select, Tag, TagProps, Checkbox } from "antd";
import React from "react";
const { Content } = Layout;
const { Option } = Select;

const { TextArea } = Input;

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

const AddRole = (props: Props) => {
  return (
    <Layout className="add__device">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">Danh sách vai trò</h3>
        <div className="add__device__form role__manager">
          <div className="add__device__main">
            <div className="device__title title">Thông tin vai trò</div>
            <div className="device__inputs role__main">
              <div className="role__inputs">
                <div className="device__input__which">
                  <h4 className="device__input__title">
                    Tên vai trò <span>*</span>
                  </h4>
                  <Input placeholder="Nhập tên vai trò" />
                </div>
                <div className="device__input__which">
                  <h4 className="device__input__title">
                    Mô tả: <span>*</span>
                  </h4>
                  <TextArea rows={6} placeholder="Nhập mô tả" />
                </div>
                <p className="device__notify">
                  <span>*</span> Là trường thông tin bắc buộc
                </p>
              </div>
              <div className="role__checkboxs">
                <div className="device__input__which role__checkboxs__main">
                  <h4 className="device__input__title">
                    Phân quyền chức năng <span>*</span>
                  </h4>
                  <div className="role__list">
                    <div className="role__list__scroll">
                      <div className="role__list__item">
                        <h3 className="title">Nhóm chức năng A</h3>
                        <div className="item__list">
                          <div className="item__list__item">
                            <Checkbox>Tất cả</Checkbox>
                          </div>
                          <div className="item__list__item">
                            <Checkbox>Chức năng x</Checkbox>
                          </div>
                          <div className="item__list__item">
                            <Checkbox>Chức năng y</Checkbox>
                          </div>
                          <div className="item__list__item">
                            <Checkbox>Chức năng z</Checkbox>
                          </div>
                        </div>
                      </div>
                      <div className="role__list__item">
                        <h3 className="title">Nhóm chức năng B</h3>
                        <div className="item__list">
                          <div className="item__list__item">
                            <Checkbox>Tất cả</Checkbox>
                          </div>
                          <div className="item__list__item">
                            <Checkbox>Chức năng x</Checkbox>
                          </div>
                          <div className="item__list__item">
                            <Checkbox>Chức năng y</Checkbox>
                          </div>
                          <div className="item__list__item">
                            <Checkbox>Chức năng z</Checkbox>
                          </div>
                        </div>
                      </div>
                      <div className="role__list__item">
                        <h3 className="title">Nhóm chức năng C</h3>
                        <div className="item__list">
                          <div className="item__list__item">
                            <Checkbox>Tất cả</Checkbox>
                          </div>
                          <div className="item__list__item">
                            <Checkbox>Chức năng x</Checkbox>
                          </div>
                          <div className="item__list__item">
                            <Checkbox>Chức năng y</Checkbox>
                          </div>
                          <div className="item__list__item">
                            <Checkbox>Chức năng z</Checkbox>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default AddRole;
