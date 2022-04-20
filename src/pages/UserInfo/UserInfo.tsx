import { Input } from "antd";
import React from "react";

type Props = {};

const UserInfo = (props: Props) => {
  return (
    <div className="user__info">
      <div className="user__info__general">
        <div className="user__info__avatar">
          <img src="./imgs/avatar.svg" alt="" />
          <div className="icon__take__photo">
            <img src="./imgs/camera.svg" alt="" />
          </div>
        </div>
        <h3 className="user__info__name">Lê Quỳnh Ái Vân</h3>
      </div>
      <div className="user__info__inputs">
        <div className="user__info__item">
          <h2 className="user__info__label">Tên người dùng</h2>
          <Input placeholder="Lê Quỳnh Ái Vân" />
        </div>
        <div className="user__info__item">
          <h2 className="user__info__label">Tên đăng nhập</h2>
          <Input placeholder="lequynhaivan01" />
        </div>
        <div className="user__info__item">
          <h2 className="user__info__label">Số điện thoại</h2>
          <Input placeholder="0767375921" />
        </div>
        <div className="user__info__item">
          <h2 className="user__info__label">Mật khẩu</h2>
          <Input placeholder="311940211" />
        </div>
        <div className="user__info__item">
          <h2 className="user__info__label">Email</h2>
          <Input placeholder="adminSSO1@domain.com" />
        </div>
        <div className="user__info__item">
          <h2 className="user__info__label">Vai trò</h2>
          <Input placeholder="Kế toán" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
