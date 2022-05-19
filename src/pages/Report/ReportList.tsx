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
import { loadReportList } from "../../slice/reportSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

type Props = {
  filter: FilterReport;
};

const ReportList = ({ filter }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const numberList = useSelector((state: RootState) => state.report.reportList);
  useEffect(() => {
    loadNumberList()
      .then((res) => {
        const list = filterReportList(filter, res);
        dispatch(loadReportList(list));
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
