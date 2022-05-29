import React from "react";
import { useLocation, useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
import Notification from "../Notification/Notification";
import useUser from "../../hooks/useUser";
type Props = {};

interface MapHeader {
  path: string;
  title: string;
  child?: MapHeader;
}

interface AllMapHeader {
  account: MapHeader;
  device: MapHeader;
  service: MapHeader;
  number: MapHeader;
  role: MapHeader;
  report: MapHeader;
  user: MapHeader;
}

const Header = (props: Props) => {
  const navigate = useNavigate();
  const [user] = useUser();
  const path = useLocation().pathname;
  console.log(path);

  const map: AllMapHeader = {
    account: {
      path: IRoute.SETTINGS_ACCOUNT,
      title: "Cài đặt hệ thống",
      child: {
        path: IRoute.SETTINGS_ACCOUNT,
        title: "Quản lí tài khoản",
        child: {
          path: IRoute.SETTINGS_ADD_ACCOUNT,
          title: "Thêm tài khoản",
        },
      },
    },
    device: {
      path: IRoute.SETTINGS_ACCOUNT,
      title: "Cài đặt hệ thống",
      child: {
        path: IRoute.SETTINGS_ACCOUNT,
        title: "Quản lí tài khoản",
        child: {
          path: IRoute.SETTINGS_ADD_ACCOUNT,
          title: "Thêm tài khoản",
        },
      },
    },
    role: {
      path: IRoute.SETTINGS_ACCOUNT,
      title: "Cài đặt hệ thống",
      child: {
        path: IRoute.SETTINGS_ACCOUNT,
        title: "Quản lí tài khoản",
        child: {
          path: IRoute.SETTINGS_ADD_ACCOUNT,
          title: "Thêm tài khoản",
        },
      },
    },
    report: {
      path: IRoute.SETTINGS_ACCOUNT,
      title: "Cài đặt hệ thống",
      child: {
        path: IRoute.SETTINGS_ACCOUNT,
        title: "Quản lí tài khoản",
        child: {
          path: IRoute.SETTINGS_ADD_ACCOUNT,
          title: "Thêm tài khoản",
        },
      },
    },
    number: {
      path: IRoute.SETTINGS_ACCOUNT,
      title: "Cài đặt hệ thống",
      child: {
        path: IRoute.SETTINGS_ACCOUNT,
        title: "Quản lí tài khoản",
        child: {
          path: IRoute.SETTINGS_ADD_ACCOUNT,
          title: "Thêm tài khoản",
        },
      },
    },
    service: {
      path: IRoute.SETTINGS_ACCOUNT,
      title: "Cài đặt hệ thống",
      child: {
        path: IRoute.SETTINGS_ACCOUNT,
        title: "Quản lí tài khoản",
        child: {
          path: IRoute.SETTINGS_ADD_ACCOUNT,
          title: "Thêm tài khoản",
        },
      },
    },
    user: {
      path: IRoute.SETTINGS_ACCOUNT,
      title: "Cài đặt hệ thống",
      child: {
        path: IRoute.SETTINGS_ACCOUNT,
        title: "Quản lí tài khoản",
        child: {
          path: IRoute.SETTINGS_ADD_ACCOUNT,
          title: "Thêm tài khoản",
        },
      },
    },
  };
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
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
