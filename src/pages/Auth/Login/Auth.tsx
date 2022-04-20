import { Button, Input, Layout } from "antd";
import { userInfo } from "os";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { IRoute } from "../../../constant/routes";
import { RootState } from "../../../store";
import ChangePassword from "./ChangePassword";
import ChangePasswordForm from "./ChangePasswordForm";
import LoginForm from "./LoginForm";

interface Props {}

const { Sider, Content } = Layout;
const Auth = (props: Props) => {
  const page = useSelector((state: RootState) => state.auth.authStatus);
  // 0 is login, 1 is email typing, 2 change password
  return (
    <Layout className="login">
      <Sider className="login__sidebar">
        <div className="logo">
          <img src="./imgs/logo.svg" alt="" />
        </div>
        {page === 0 ? (
          <LoginForm />
        ) : page === 1 ? (
          <ChangePassword />
        ) : (
          <ChangePasswordForm />
        )}
      </Sider>
      <Content className="login__content">
        {page === 0 ? (
          <img src="./imgs/login-img.svg" alt="" />
        ) : (
          <img src="./imgs/change-pass.svg" alt="" />
        )}
        {page === 0 && (
          <div className="login__content__text">
            <span>Hệ thống</span>
            <span>Quản lý xếp hàng</span>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default Auth;
