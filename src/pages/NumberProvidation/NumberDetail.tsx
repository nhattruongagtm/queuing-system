import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getNumberById } from "../../api/numbers";
import { Numbers } from "../../models/numbers";

type Props = {};

const NumberDetail = (props: Props) => {
  const [number, setNumber] = useState<Numbers>();

  const id = useParams().id;

  useEffect(() => {
    id &&
      getNumberById(id)
        .then((res) => {
          res && setNumber(res);
        })
        .catch((e) => {
          console.log(e);
        });
  }, []);
  return (
    <div className="number__detail">
      <div className="number__detail__container">
        <h3 className="title-1 number__detail__title">Quản lý cấp số</h3>
        <div className="number__detail__center">
          <div className="number__detail__main">
            <h3 className="title">Thông tin cấp số</h3>
            {number && (
              <div className="number__detail__info">
                <div className="number__detail__item">
                  <h3 className="text text-main">Họ và tên:</h3>
                  <h3 className="text text-content">{number.customerName}</h3>
                </div>
                <div className="number__detail__item">
                  <h3 className="text text-main">Nguồn cấp:</h3>
                  <h3 className="text text-content">{number.deviceName}</h3>
                </div>
                <div className="number__detail__item">
                  <h3 className="text text-main">Tên dịch vụ:</h3>
                  <h3 className="text text-content">{number.serviceName}</h3>
                </div>
                <div className="number__detail__item">
                  <h3 className="text text-main">Trạng thái:</h3>
                  <h3 className="text text-content">
                    {" "}
                    <span></span>{" "}
                    {number.status === 0
                      ? "Đang chờ"
                      : number.status === 1
                      ? "Đã sử dụng"
                      : "Bỏ qua"}
                  </h3>
                </div>
                <div className="number__detail__item">
                  <h3 className="text text-main">Số thứ tư:</h3>
                  <h3 className="text text-content">{number.id}</h3>
                </div>
                <div className="number__detail__item">
                  <h3 className="text text-main">Số điện thoại:</h3>
                  <h3 className="text text-content">0948523623</h3>
                </div>
                <div className="number__detail__item">
                  <h3 className="text text-main">Thời gian cấp:</h3>
                  <h3 className="text text-content">{number.createdDate}</h3>
                </div>
                <div className="number__detail__item">
                  <h3 className="text text-main">Địa chỉ Email:</h3>
                  <h3 className="text text-content">nguyendung@gmail.com</h3>
                </div>
                <div className="number__detail__item">
                  <h3 className="text text-main">Hạn sử dụng:</h3>
                  <h3 className="text text-content">{number.expireDate}</h3>
                </div>
              </div>
            )}
          </div>
          <div className="number__detail__actions">
            <div className="btn__action">
              <img src="./imgs/back.svg" alt="" />
              Quay lại
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberDetail;
