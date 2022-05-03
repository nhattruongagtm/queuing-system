import React from "react";
import { Table, Tag, Space } from "antd";
import { Numbers } from "../../models/numbers";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import { User } from "../../models/user";

type Props = {};

const UserList = (props: Props) => {
  const navigate = useNavigate();
  const data: User[] = [
    {
      id: 1,
      username: "tuyetnguyen@12",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_01",
    },
    {
      id: 2,
      username: "tuyetnguyen@48",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_03",
    },
    {
      id: 3,
      username: "tuyetnguyen@79",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_04",
    },
    {
      id: 4,
      username: "tuyetnguyen@55",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_01",
    },
    {
      id: 3,
      username: "tuyetnguyen@81",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_04",
    },
    {
      id: 4,
      username: "tuyetnguyen@15",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_01",
    },
    {
      id: 3,
      username: "tuyetnguyen@12",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_06",
    },
    {
      id: 4,
      username: "tuyetnguyen@79",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_01",
    },
    {
      id: 3,
      username: "tuyetnguyen@13",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_04",
    },
    {
      id: 4,
      username: "tuyetnguyen@92",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_01",
    },
    {
      id: 3,
      username: "tuyetnguyen@78",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_03",
    },
    {
      id: 4,
      username: "tuyetnguyen@13",
      time: "01/12/2021 15:12:17",
      ip: "192.168.3.1",
      formal: "Cập nhật thông tin dịch vụ DV_03",
    },
  ];
  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Thời gian tác động",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "IP thực hiện",
      key: "ip",
      dataIndex: "ip",
    },
    {
      title: "Thao tác thực hiện",
      key: "formal",
      dataIndex: "formal",
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

export default UserList;
