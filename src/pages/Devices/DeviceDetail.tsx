import React from "react";
import { Layout } from "antd";

interface Props {}

const { Content } = Layout;

const DeviceDetail = (props: Props) => {
  return (
    <Layout className="add__device device__detail">
      <Content className="dasbard__content device__detail__content">
        <h3 className="dashboard__content__title title-1">Quản lý thiết bị</h3>
        <div className="device__detail__parent">
          <div className="add__device__form ">
            <div className="add__device__main">
              <div className="device__title title">Thông tin thiết bị</div>
              <div className="device__detail__main">
                <div className="device__detail__item">
                  <h4 className="detail__item__title">Mã thiết bị:</h4>
                  <h4 className="detail__item__content">KIO_01</h4>
                </div>
                <div className="device__detail__item">
                  <h4 className="detail__item__title">Loại thiết bị:</h4>
                  <h4 className="detail__item__content">Kiosk</h4>
                </div>
                <div className="device__detail__item">
                  <h4 className="detail__item__title">Tên thiết bị:</h4>
                  <h4 className="detail__item__content">Kiosk</h4>
                </div>
                <div className="device__detail__item">
                  <h4 className="detail__item__title">Tên đăng nhập:</h4>
                  <h4 className="detail__item__content">Linhkyo011</h4>
                </div>
                <div className="device__detail__item">
                  <h4 className="detail__item__title">Địa chỉ IP:</h4>
                  <h4 className="detail__item__content">128.172.308</h4>
                </div>
                <div className="device__detail__item">
                  <h4 className="detail__item__title">Mật khẩu:</h4>
                  <h4 className="detail__item__content">CMS</h4>
                </div>
                <div className="device__detail__item item--flex">
                  <h4 className="detail__item__title">Dịch vụ sử dụng:</h4>
                  <h4 className="detail__item__content">
                    Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám
                    tai mũi họng, Khám hô hấp, Khám tổng quát.
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="devices__tags device__btn">
            <div className="devices__tags__add ">
              <img src="./imgs/edit.svg" alt="" />
              Cập nhật thiết bị
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default DeviceDetail;
