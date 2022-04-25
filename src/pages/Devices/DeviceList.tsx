import React from "react";
import { Table, Tag, Space } from "antd";
import { Device } from "../../models/device";
import {useNavigate} from 'react-router'
import { IRoute } from "../../constant/routes";
type Props = {};



const DeviceList = (props: Props) => {
  const navigate = useNavigate();
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
              {index === 0 && <h5>{record.usedDevice}</h5>}
              {index === 1 && <span className="link">Xem thêm</span>}
            </>
          ))}
        </div>
      ),
    },
    {
      title: "",
      key: "detail",
      render: (record: Device) => <span className="link" onClick={()=>navigate(IRoute.DEVICE_DETAIL)}>Chi tiết</span>,
    },
    {
      title: "",
      key: "update",
      render: (record: Device) => <span className="link" onClick={()=>navigate(IRoute.ADD_DEVICE)}>Cập nhật</span>,
    },
  ];
  
  const data: Device[] = [
    {
      id: "KIO_01",
      name: "Kiosk",
      ip: "192.168.1.10",
      activeStatus: 0,
      connectStatus: 1,
      usedDevice:
        "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, tai mũi họng, Khám hô hấp, Khám tổng quát",
    },
    {
      id: "KIO_02",
      name: "Kiosk",
      ip: "192.168.1.10",
      activeStatus: 1,
      connectStatus: 0,
      usedDevice:
        "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, tai mũi họng, Khám hô hấp, Khám tổng quát",
    },
    {
      id: "KIO_03",
      name: "Kiosk",
      ip: "192.168.1.10",
      activeStatus: 0,
      connectStatus: 0,
      usedDevice:
        "Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, tai mũi họng, Khám hô hấp, Khám tổng quát",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 6 }}
      className="device__list"
    />
  );
};

export default DeviceList;
