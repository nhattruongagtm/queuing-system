import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import { Numbers } from "../../models/numbers";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import {
  filterNumberList,
  filterReportList,
  loadNumberList,
} from "../../api/numbers";
import { getServiceById } from "../../api/service";
import { getDeviceById } from "../../api/device";
import { FilterReport } from "./Report";
import { formatDateTime } from "../../utils/dateTime";

type Props = {
  filter: FilterReport;
};

const ReportList = ({ filter }: Props) => {
  const navigate = useNavigate();
  const [numberList, setNumberList] = useState<Numbers[]>([]);
  console.log(filter);
  useEffect(() => {
    loadNumberList()
      .then((res) => {
        let rs = [...res];
        rs.map(async (item) => {
          const { customerID, serviceID, deviceID } = item;

          if (customerID && serviceID && deviceID) {
            const service = await getServiceById(serviceID);
            const device = await getDeviceById(deviceID);
            item.deviceName = device?.name;
            item.serviceName = service?.name;
            item.customerName = "Huỳnh Ái Vân";
          }
        });
        setNumberList(filterReportList(filter, res));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [filter]);
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "stt",
      key: "stt",
      render: (text: string, record: Numbers) => <p>{record.id}</p>,
    },

    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Thời gian cấp",
      key: "createdDate",
      dataIndex: "createdDate",
      render: (text: string, record: Numbers) => (
        <div>
          <span>{formatDateTime(record.createdDate)}</span>
        </div>
      ),
    },
    {
      title: "Tình trạng",
      key: "status",
      dataIndex: "status",
      render: (status: number) => (
        <div>
          <span
            className={`dot--status dot--${
              status === 0 ? "used" : status === 1 ? "waiting" : "skip"
            }`}
          ></span>
          {status === 0 ? "Đã sử dụng" : status === 1 ? "Đang chờ" : "Bỏ qua"}
        </div>
      ),
    },
    {
      title: "Nguồn cấp",
      key: "deviceName",
      dataIndex: "deviceName",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={numberList}
      pagination={{ pageSize: 6 }}
      className="device__list"
    />
  );
};

export default ReportList;
