import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { Service } from "../../models/services";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import { filterServiceList, loadServiceList } from "../../api/service";
import { useDispatch, useSelector } from "react-redux";
import { updateService } from "../../slice/serviceSlice";
import { RootState } from "../../store";
type Props = {};

const SeviceList = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const filter = useSelector((state: RootState) => state.services.fitler);
  const handleUpdate = (service: Service) => {
    dispatch(updateService(service));
    navigate(IRoute.ADD_SERVICE);
  };
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
        <span
          className="link"
          onClick={() => navigate(`${IRoute.SERVICE_DETAIL}/${record.id}`)}
        >
          Chi tiết
        </span>
      ),
    },
    {
      title: "",
      key: "update",
      render: (record: Service) => (
        <span className="link" onClick={() => handleUpdate(record)}>
          Cập nhật
        </span>
      ),
    },
  ];

  useEffect(() => {
    loadServiceList()
      .then((res) => {
        setServiceList(filterServiceList(filter, res));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [filter]);
  return (
    <Table
      columns={columns}
      dataSource={serviceList}
      pagination={{ pageSize: 6 }}
      className="device__list"
    />
  );
};

export default SeviceList;
