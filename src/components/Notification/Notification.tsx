import React from "react";
import NotificationItem from "./NotificationItem";

interface Props {}

const Notification = (props: Props) => {
  return (
    <div className="notification">
      <h3 className="notification__header">Thông báo</h3>
      <div className="notification__main">
          {Array.from(new Array(7)).map((item) => (
            <NotificationItem />
          ))}
      </div>
    </div>
  );
};

export default Notification;
