import React from "react";
import { Table, Tag, Space } from "antd";
import { Numbers } from "../../models/numbers";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";

type Props = {};

const NumberList = (props: Props) => {
  const navigate = useNavigate();
  const data: Numbers[] = [
    {
      id: 2010001,
      customerName: "Lê Huỳnh Ái Vân",
      deviceName: "Khám tim mạch",
      createdDate: 1213213445,
      expireDate: 44545476876,
      provider: "Kiosk",
      status: 0,
    },
    {
      id: 2010002,
      customerName: "Huỳnh Ái Vân",
      deviceName: "Khám sản - Phụ Khoa",
      createdDate: 1213213445,
      expireDate: 44545476876,
      provider: "Kiosk",
      status: 1,
    },
    {
      id: 2010003,
      customerName: "Lê Ái Vân",
      deviceName: "Khám răng hàm mặt",
      createdDate: 1213213445,
      expireDate: 44545476876,
      provider: "Kiosk",
      status: 0,
    },
  ];
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "stt",
      key: "stt",
      render: (text: string, record: Numbers) => (
        <p>{data.indexOf(record) + 1}</p>
      ),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "Thời gian cấp",
      key: "createdDate",
      dataIndex: "createdDate",
      render: (text: string, record: Numbers) => (
        <div>
          <span>14:35</span> -<span>14:35</span>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
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
      title: "Nguồn cấp",
      key: "provider",
      dataIndex: "provider",
    },
    {
      title: "",
      key: "detail",
      render: (record: Numbers) => (
        <span className="link" onClick={() => navigate(IRoute.NUMBER_PROVIDATION_DETAIL)}>
          Chi tiết
        </span>
      ),
    },
    {
      title: "",
      key: "update",
      render: (record: Numbers) => <span className="link">Cập nhật</span>,
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

export default NumberList;
