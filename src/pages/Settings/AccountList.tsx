import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { Numbers } from "../../models/numbers";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import { Account } from "../../models/account";
import { filterAccountList, loadAccountList } from "../../api/account";
import { useDispatch, useSelector } from "react-redux";
import { updateAccount } from "../../slice/accountSlice";
import { RootState } from "../../store";

type Props = {};

const AccountList = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState)=>state.account.fitler);
  const [accountList, setAccountList] = useState<Account[]>([]);
  useEffect(() => {
    loadAccountList()
      .then((res) => {
        // setAccountList(res)
        setAccountList(filterAccountList(filter,res));
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
        <span
          className="link"
          onClick={() => {
            navigate(IRoute.SETTINGS_ADD_ACCOUNT);
            dispatch(updateAccount(record));
          }}
        >
          Cập nhật
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={accountList}
      pagination={{ pageSize: 6 }}
      className="device__list"
    />
  );
};

export default AccountList;
