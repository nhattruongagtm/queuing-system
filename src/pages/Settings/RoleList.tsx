import React from "react";
import { Table, Tag, Space } from "antd";
import { Numbers } from "../../models/numbers";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import { Role } from "../../models/role";

type Props = {};

const ReportList = (props: Props) => {
  const navigate = useNavigate();
  const data: Role[] = [
    {
      id: 1,
      name: "Bác sĩ",
      numberOfUsers: 6,
      desc: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    },
    {
      id: 2,
      name: "Kế toán",
      numberOfUsers: 6,
      desc: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    },
    {
      id: 3,
      name: "Lễ tân",
      numberOfUsers: 5,
      desc: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    },
    {
      id: 4,
      name: "Quản lý",
      numberOfUsers: 15,
      desc: "Thực hiện nhiệm vụ về thống kê số liệu và tổng hợp số liệu",
    },
  ];
  const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Role) => <p>{data.indexOf(record) + 1}</p>,
    },

    {
      title: "Số người dùng",
      dataIndex: "numberOfUsers",
      key: "numberOfUsers",
    },
    {
      title: "Mô tả",
      key: "desc",
      dataIndex: "desc",
    },
    {
      title: "",
      key: "update",
      render: (record: Role) => (
        <span className="link" onClick={() => navigate(IRoute.SETTINGS_ADD_ROLE)}>
          Cập nhật
        </span>  
      ),
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

export default ReportList;
