import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { Numbers } from "../../models/numbers";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import { Role } from "../../models/role";
import { filterRoletList, loadRoleList } from "../../api/role";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type Props = {};

const ReportList = (props: Props) => {
  const navigate = useNavigate();
  const [roleList, setRoleList] = useState<Role[]>([]);
  const filter = useSelector((state: RootState) => state.role.filter);

  useEffect(() => {
    loadRoleList()
      .then((res) => {
        setRoleList(filterRoletList(filter, res));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [filter]);

  const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Role) => <p>{record.name}</p>,
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
        <span
          className="link"
          onClick={() => navigate(IRoute.SETTINGS_ADD_ROLE)}
        >
          Cập nhật
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={roleList}
      pagination={{ pageSize: 6 }}
      className="device__list"
    />
  );
};

export default ReportList;
