import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Navigate, useNavigate, useParams } from "react-router";
import { Device } from "../../models/device";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getDeviceById } from "../../api/device";
import { IRoute } from "../../constant/routes";
import { updateDevice } from "../../slice/deviceSlice";

interface Props {}

const { Content } = Layout;

const DeviceDetail = (props: Props) => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [device, setDevice] = useState<Device>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      getDeviceById(id)
        .then((res) => {
          if (res) {
            setDevice(res);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleUpdate = () => {
    if (device) {
      dispatch(updateDevice(device));
      navigate(`${IRoute.ADD_DEVICE}`);
    }
  };

  return (
    <Layout className="add__device device__detail">
      <Content className="dasbard__content device__detail__content">
        <h3 className="dashboard__content__title title-1">Quản lý thiết bị</h3>
        <div className="device__detail__parent">
          <div className="add__device__form ">
            <div className="add__device__main">
              <div className="device__title title">Thông tin thiết bị</div>
              {device && (
                <div className="device__detail__main">
                  <div className="device__detail__item">
                    <h4 className="detail__item__title">Mã thiết bị:</h4>
                    <h4 className="detail__item__content">{device.id}</h4>
                  </div>
                  <div className="device__detail__item">
                    <h4 className="detail__item__title">Loại thiết bị:</h4>
                    <h4 className="detail__item__content">{device.type}</h4>
                  </div>
                  <div className="device__detail__item">
                    <h4 className="detail__item__title">Tên thiết bị:</h4>
                    <h4 className="detail__item__content">{device.name}</h4>
                  </div>
                  <div className="device__detail__item">
                    <h4 className="detail__item__title">Tên đăng nhập:</h4>
                    <h4 className="detail__item__content">{device.username}</h4>
                  </div>
                  <div className="device__detail__item">
                    <h4 className="detail__item__title">Địa chỉ IP:</h4>
                    <h4 className="detail__item__content">{device.ip}</h4>
                  </div>
                  <div className="device__detail__item">
                    <h4 className="detail__item__title">Mật khẩu:</h4>
                    <h4 className="detail__item__content">{device.password}</h4>
                  </div>
                  <div className="device__detail__item item--flex">
                    <h4 className="detail__item__title">Dịch vụ sử dụng:</h4>
                    <h4 className="detail__item__content">
                      {device.usedDevice.join(", ")}
                    </h4>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="devices__tags device__btn">
            <div className="devices__tags__add " onClick={handleUpdate}>
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
