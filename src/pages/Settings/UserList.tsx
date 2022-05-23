import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { Numbers } from "../../models/numbers";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import { User } from "../../models/user";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Log } from "../../models/log";
import { filterLogList, loadLogList } from "../../api/log";

type Props = {};

const UserList = (props: Props) => {
  const navigate = useNavigate();
  const filter = useSelector((state: RootState) => state.log.fitler);
  const [logList, setLogList] = useState<Log[]>([]);
  useEffect(() => {
    loadLogList()
      .then((res) => {
        setLogList(filterLogList(filter, res));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [filter]);

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },

    {
      title: "Thời gian tác động",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "IP thực hiện",
      key: "ip",
      dataIndex: "ip",
    },
    {
      title: "Thao tác thực hiện",
      key: "action",
      dataIndex: "action",
      render: (text: string, log: Log) => (
        <>
          {log.action === 0 ? "Thêm" : log.action === 1 ? "Cập nhật" : "Xóa"}{" "}
          thông tin {log.actor}
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={logList}
      pagination={{ pageSize: 6 }}
      className="device__list"
    />
  );
};

export default UserList;
