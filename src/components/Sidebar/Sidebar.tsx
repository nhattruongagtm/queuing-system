import React from "react";
import { NavLink } from "react-router-dom";
import { IRoute } from "../../constant/routes";
import { useNavigate } from "react-router";
interface Props {}

interface Sidebar {
  path: string;
  icon: string;
  title: string;
}

const Sidebar = (props: Props) => {
  const navigate = useNavigate();
  const sidebar: Sidebar[] = [
    {
      path: IRoute.DASHBOARD,
      icon: "./imgs/dashboard.svg",
      title: "Dashboard",
    },
    {
      path: IRoute.DEVICES,
      icon: "./imgs/monitor.svg",
      title: "Thiết bị",
    },
    {
      path: IRoute.SERVICES,
      icon: "./imgs/services.svg",
      title: "Dịch vụ",
    },
    {
      path: IRoute.NUMBER_PROVIDATION,
      icon: "./imgs/number.svg",
      title: "Cấp số",
    },
    {
      path: IRoute.REPORT,
      icon: "./imgs/report.svg",
      title: "Báo cáo",
    },
  ];
  return (
    <>
      <div className="sidebar__logo">
        <img src="./imgs/logo.svg" alt="" />
      </div>
      <ul className="sidebar__navigation">
        {sidebar.map((item) => (
          <NavLink key={item.path} to={item.path}>
            <li className="sidebar__navigation__item">
              <img src={item.icon} alt="" />
              {item.title}
            </li>
          </NavLink>
        ))}
        <label htmlFor="setting">
          <li className="sidebar__navigation__item item--setting">
            <img src="./imgs/setting.svg" alt="" />
            Cài đặt hệ thống
            <div className="settings__more">
              <img src="./imgs/dots.svg" alt="" className="dots" />
            </div>
            <input type="checkbox" id="setting" hidden />
            <div className="settings__more__panel">
              <a onClick={()=>navigate(IRoute.SETTINGS_ROLE)}>Quản lý vai trò</a>
              <a onClick={()=>navigate(IRoute.SETTINGS_ACCOUNT)}>Quản lý tài khoản</a>
              <a onClick={()=>navigate(IRoute.SETTINGS_USER)}>Nhật ký người dùng</a>
            </div>
          </li>
        </label>
      </ul>
      <div className="sidebar__logout">
        <button className="btn__logout" onClick={() => navigate(IRoute.HOME)}>
          <img src="./imgs/logout.svg" alt="" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
