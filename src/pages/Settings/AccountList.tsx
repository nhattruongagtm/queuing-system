import React from "react";
import { Table, Tag, Space } from "antd";
import { Numbers } from "../../models/numbers";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import { Account } from "../../models/account";

type Props = {};

const AccountList = (props: Props) => {
  const navigate = useNavigate();
  const data: Account[] = [
    {
      id: 1,
      username: "tuyetnguyen@12",
      fullName: "Nguyen Văn A",
      role: "Bác sĩ",
      phone: "0919256712",
      email: "tuyetnguyen123@gmail.com",
      status: 1,
    },
    {
      id: 1,
      username: "tuyetnguyen@87",
      fullName: "Nguyen Văn B",
      role: "Bác sĩ",
      phone: "0919256712",
      email: "tuyetnguyen123@gmail.com",
      status: 1,
    },
    {
      id: 1,
      username: "tuyetnguyen@47",
      fullName: "Nguyen Văn C",
      role: "Kế toán",
      phone: "0919256712",
      email: "tuyetnguyen123@gmail.com",
      status: 0,
    },
    {
      id: 1,
      username: "tuyetnguyen@72",
      fullName: "Nguyen Văn D",
      role: "Bác sĩ",
      phone: "0919256712",
      email: "tuyetnguyen123@gmail.com",
      status: 1,
    },
  ];
  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Vai trò",
      key: "role",
      dataIndex: "role",
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
      key: "update",
      render: (record: Account) => (
        <span className="link" onClick={() => navigate(IRoute.SETTINGS_ADD_ACCOUNT)}>
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

export default AccountList;
