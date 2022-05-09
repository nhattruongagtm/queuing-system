import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { Device } from "../../models/device";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import { useDispatch, useSelector } from "react-redux";
import { filter, FilterParams, loadDeviceList } from "../../api/device";
import {
  loadDeviceList as loadList,
  updateDevice,
} from "../../slice/deviceSlice";
import { RootState } from "../../store";
type Props = {};

const DeviceList = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useSelector((state: RootState) => state.devices.fitler);
  const deviceList = useSelector(
    (state: RootState) => state.devices.deviceList
  );
  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Tên thiết bị",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Trạng thái hoạt động",
      key: "activeStatus",
      dataIndex: "activeStatus",
      render: (status: number) => (
        <div>
          <span
            className={`dot--status dot--${status === 0 ? "green" : "red"}`}
          ></span>
          {status === 0 ? "Hoạt động" : "Ngưng hoạt động"}
        </div>
      ),
    },
    {
      title: "Trạng thái kết nối",
      key: "connectStatus",
      dataIndex: "connectStatus",
      render: (status: number) => (
        <>
          <span
            className={`dot--status dot--${status === 0 ? "green" : "red"}`}
          ></span>
          {status === 0 ? "Kết nối" : "Mất kết nối"}
        </>
      ),
    },
    {
      title: "Dịch vụ sử dụng",
      key: "usedDevice",
      render: (record: Device) => (
        <div className="device__usedDevice">
          {Array.from(new Array(2)).map((item, index) => (
            <>
              {index === 0 && <h5>{record.usedDevice.join(", ")}</h5>}
              {index === 1 && <span className="link">Xem thêm</span>}
            </>
          ))}
        </div>
      ),
    },
    {
      title: "",
      key: "detail",
      render: (record: Device) => (
        <span
          className="link"
          onClick={() => navigate(`${IRoute.DEVICE_DETAIL}/${record.id}`)}
        >
          Chi tiết
        </span>
      ),
    },
    {
      title: "",
      key: "update",
      render: (record: Device) => (
        <span className="link" onClick={() => handleUpdate(record)}>
          Cập nhật
        </span>
      ),
    },
  ];

  const handleUpdate = (device: Device) => {
    dispatch(updateDevice(device));
    navigate(IRoute.ADD_DEVICE);
  };

  useEffect(() => {
    loadDeviceList()
      .then((res) => {
        const list = [...res];

        dispatch(loadList(filter(params, list)));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params]);

  return (
    <Table
      columns={columns}
      dataSource={deviceList}
      pagination={{ pageSize: 6 }}
      className="device__list"
    />
  );
};

export default DeviceList;
