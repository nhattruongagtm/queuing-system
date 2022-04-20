import React from "react";

type Props = {};

const NotificationItem = (props: Props) => {
  return (
    <div className="notify__item">
      <h3 className="notify__item__name">Người dùng: Nguyễn Thị Thùy Dung</h3>
      <h3 className="notify__item__time">
        Thời gian nhận số: 12h20 ngày 30/11/2022
      </h3>
    </div>
  );
};

export default NotificationItem;
