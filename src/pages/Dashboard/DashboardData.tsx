import React from "react";

type Props = {};

const DashboardData = (props: Props) => {
  return (
    <div className="dashboard__content__datas">
      <div className="dashboard__content__item">
        <div className="data__item__title">
          <div className="data__item__icon order">
            <img src="./imgs/calendar.svg" alt="" />
          </div>
          <p>Số thứ tự đã cấp</p>
        </div>
        <div className="data__item__numbers">
          <p>4.221</p>
          <span className="tag tag--plus ">
            <i className="bx bx-up-arrow-alt"></i> 31.24%
          </span>
        </div>
      </div>
      <div className="dashboard__content__item">
        <div className="data__item__title">
          <div className="data__item__icon used">
            <img src="./imgs/complete.svg" alt="" />
          </div>
          <p>Số thứ tự đã sử dụng</p>
        </div>
        <div className="data__item__numbers">
          <p>3.721</p>
          <span className="tag tag--sub">
            <i className="bx bx-down-arrow-alt"></i> 31.24%
          </span>
        </div>
      </div>
      <div className="dashboard__content__item">
        <div className="data__item__title">
          <div className="data__item__icon waiting">
            <img src="./imgs/waiting.svg" alt="" />
          </div>
          <p>Số thứ tự đang chờ</p>
        </div>
        <div className="data__item__numbers">
          <p>468</p>
          <span className="tag tag--plus">
            <i className="bx bx-up-arrow-alt"></i> 56.41%
          </span>
        </div>
      </div>
      <div className="dashboard__content__item">
        <div className="data__item__title">
          <div className="data__item__icon ignore">
            <img src="./imgs/ignore.svg" alt="" />
          </div>
          <p>Số thứ tự đã bỏ qua</p>
        </div>
        <div className="data__item__numbers">
          <p>32</p>
          <span className="tag tag--sub ">
            <i className="bx bx-down-arrow-alt"></i> 22.41%
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardData;
