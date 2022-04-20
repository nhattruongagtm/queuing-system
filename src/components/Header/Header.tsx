import React from "react";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import Notification from "../Notification/Notification";

type Props = {};

const Header = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <h3 className="content__header__page">Thông tin cá nhân</h3>
      <div className="content__header__user">
        <div className="header__bell">
          <label className="header__notify" htmlFor="notify">
            <img src="./imgs/notification.svg" alt="" />
          </label>
          <input type="checkbox" id="notify" hidden />
          <Notification />
        </div>
        <div className="header__user" onClick={() => navigate(IRoute.INFO)}>
          <div className="header__user__avatar">
            <img src="./imgs/avatar.svg" alt="" />
          </div>
          <div className="header__user__info">
            <h4 className="greetings">Xin chào</h4>
            <p>Lê Quỳnh Ái Vân</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
