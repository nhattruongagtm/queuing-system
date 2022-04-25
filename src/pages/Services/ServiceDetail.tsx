import React from "react";
import { Checkbox, DatePicker, Input, Layout, Select, Table } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

interface Props {}

const { Content } = Layout;
const { Option } = Select;

const ServiceDetail = (props: Props) => {
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status: number) => (
        <div>
          <span
            className={`dot--status dot--${
              status === 0 ? "precessing" : status === 1 ? "success" : "absent"
            }`}
          ></span>
          {status === 0
            ? "Đang thực hiện"
            : status === 1
            ? "Đã hoàn thành"
            : "Vắng"}
        </div>
      ),
    },
  ];

  const data: any[] = [
    {
      id: "2010001",
      status: 0,
    },
    {
      id: "2010002",
      status: 1,
    },
    {
      id: "2010003",
      status: 2,
    },
    {
      id: "2010004",
      status: 2,
    },
    {
      id: "2010005",
      status: 1,
    },
    {
      id: "2010006",
      status: 2,
    },
    {
      id: "2010007",
      status: 0,
    },
    {
      id: "2010008",
      status: 0,
    },
  ];
  return (
    <Layout className="add__device device__detail service__detail">
      <Content className="dasbard__content device__detail__content">
        <h3 className="dashboard__content__title title-1">Quản lý dịch vụ</h3>
        <div className="device__detail__parent">
          <div className="add__device__form service__detail__main">
            <div className="add__device__main add__service__detail">
              <div className="device__title title">Thông tin dịch vụ</div>
              <div className="device__detail__main service__detail__info">
                <div className="device__detail__item">
                  <h4 className="detail__item__title">Mã thiết bị:</h4>
                  <h4 className="detail__item__content">KIO_01</h4>
                </div>

                <div className="device__detail__item">
                  <h4 className="detail__item__title">Tên thiết bị:</h4>
                  <h4 className="detail__item__content">Kiosk</h4>
                </div>
                <div className="device__detail__item">
                  <h4 className="detail__item__title">Tên đăng nhập:</h4>
                  <h4 className="detail__item__content">Linhkyo011</h4>
                </div>
              </div>
              <div className="device__title title title-t">Quy tắc cấp số</div>
              <div className="device__detail__main service__detail__info">
                <div className="device__detail__item service__type__check">
                  <h4 className="detail__item__title">Tăng tự động:</h4>
                  <h4 className="detail__item__content">
                    {" "}
                    <div className="service__principles__item">
                      <Input placeholder="0001" /> <span>đến</span>{" "}
                      <Input placeholder="9999" />
                    </div>
                  </h4>
                </div>
                <div className="device__detail__item service__type__check">
                  <h4 className="detail__item__title">Prefix:</h4>
                  <h4 className="detail__item__content">
                    <div className="service__principles__item">
                      <Input placeholder="0001" />
                    </div>
                  </h4>
                </div>
                <div className="device__detail__item service__type__check">
                  <h4 className="detail__item__title">Tên thiết bị:</h4>
                  <h4 className="detail__item__content">
                    <div className="service__principles__item">
                      <Input placeholder="0001" />
                    </div>
                  </h4>
                </div>
                <div className="device__detail__item service__type__check">
                  <h4 className="detail__item__title">Reset mỗi ngày</h4>
                </div>
                <div className="device__detail__item service__type__check">
                  <h4 className="detail__item__title">Ví dụ: 201-2001</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="service__detail__list">
            <div className="service__content__selects">
              <div className="service__content__item select__active">
                <p>Trạng thái hoạt động</p>
                <Select
                  defaultValue={"all"}
                  className="service__content__item "
                >
                  <Option value="all">Tất cả</Option>
                  <Option value="active">Đã hoàn thành</Option>
                  <Option value="inactive">Đang thực hiện</Option>
                  <Option value="absent">Vắng</Option>
                </Select>
              </div>
              <div className="service__content__item select__dates">
                <p>Chọn thời gian</p>
                <div className="services__datepickers">
                  <DatePicker />
                  <CaretRightOutlined />
                  <DatePicker />
                </div>
              </div>
              <div className="service__content__item service__search">
                <div className="service__search__child">
                  <p className="service__search__title">Từ khóa</p>
                  <div className="service__search__input">
                    <Input placeholder="Nhập từ khóa" />
                    {/* <SearchOutlined /> */}
                  </div>
                </div>
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
              className="service__list__main"
            />
          </div>
          <div className="devices__tags device__btn">
            <div className="devices__tags__add ">
              <img src="./imgs/edit.svg" alt="" />
              Cập nhật thiết bị
            </div>
            <div className="devices__tags__add ">
              <img src="./imgs/edit.svg" alt="" />
              Quay lại
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ServiceDetail;
