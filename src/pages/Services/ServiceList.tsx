import React from "react";
import { Table, Tag, Space } from "antd";
import { Service } from "../../models/services";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
type Props = {};

const SeviceList = (props: Props) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Mã dịch vụ",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Trạng thái hoạt động",
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
      title: "",
      key: "detail",
      render: (record: Service) => (
        <span className="link" onClick={() => navigate(IRoute.SERVICE_DETAIL)}>
          Chi tiết
        </span>
      ),
    },
    {
      title: "",
      key: "update",
      render: (record: Service) => (
        <span className="link" onClick={() => navigate(IRoute.ADD_SERVICE)}>
          Cập nhật
        </span>
      ),
    },
  ];

  const data: Service[] = [
    {
      id: "KIO_01",
      name: "Kiosk",
      desc: "Mô tả dịch vụ 1",
      status: 0,
    },
    {
      id: "KIO_02",
      name: "Kiosk",
      desc: "Mô tả dịch vụ 2",
      status: 1,
    },
    {
      id: "KIO_03",
      name: "Kiosk",
      desc: "Mô tả dịch vụ 3",
      status: 0,
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

export default SeviceList;
