import React from "react";
import { Table, Tag, Space } from "antd";
import { Numbers } from "../../models/numbers";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import { useEffect, useState } from "react";
import { filterNumberList, loadNumberList } from "../../api/numbers";
import { filter, getDeviceById } from "../../api/device";
import { getServiceById } from "../../api/service";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatDateTime } from "../../utils/dateTime";
type Props = {};

const NumberList = (props: Props) => {
  const navigate = useNavigate();
  const [numberList, setNumberList] = useState<Numbers[]>([]);
  const filter = useSelector((state: RootState) => state.numbers.fitler);
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
        console.log(rs);
        setNumberList(filterNumberList(filter, res));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [filter]);
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
      key: "id",
      render: (text: string, record: Numbers) => <p>{record.id}</p>,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
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
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status: number) => (
        <div>
          <span
            className={`dot--status dot--${
              status === 0 ? "waiting" : status === 1 ? "used" : "skip"
            }`}
          ></span>
          {status === 0 ? "Đang chờ" : status === 1 ? "Đã sử dụng" : "Bỏ qua"}
        </div>
      ),
    },
    {
      title: "Nguồn cấp",
      key: "deviceName",
      dataIndex: "deviceName",
    },
    {
      title: "",
      key: "detail",
      render: (record: Numbers) => (
        <span
          className="link"
          onClick={() => navigate(`${IRoute.NUMBER_PROVIDATION_DETAIL}/${record.id}`)}
        >
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
      dataSource={numberList}
      pagination={{ pageSize: 6 }}
      className="device__list"
    />
  );
};

export default NumberList;
