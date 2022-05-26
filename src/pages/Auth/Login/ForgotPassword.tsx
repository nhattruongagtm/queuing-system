import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { checkToken, getUserByToken } from "../../../api/auth";
import { updateUserForgot } from "../../../slice/AuthSlice";
import { RootState } from "../../../store";
import ChangePasswordForm from "./ChangePasswordForm";
import {UserAccount} from '../../../models/user'
interface Props {}

interface ForgotInput {
  password: string;
  retype: string;
}

const { Sider, Content } = Layout;
const ForgotPassword = (props: Props) => {
  const token = new URLSearchParams(useLocation().search).get("token");
  const [input, setInut] = useState<ForgotInput>({
    password: "",
    retype: "",
  });
  const [user,setUser] = useState<UserAccount>();
  const userRef = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    const check = async () => {
      if (token) {
        try {
          const user = await getUserByToken(token);
          const isValid = new Date().getTime() < user.expiredToken;
          if (isValid) {
            setUser(user);
          } else {
            alert("Token không hợp hoặc hết hạn! Vui lòng gửi lại email!");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    check();
  }, []);

  return (
    <Layout className="login">
      <Sider className="login__sidebar">
        <div className="logo">
          <img src="./imgs/logo.svg" alt="" />
        </div>
        <ChangePasswordForm account={user}/>
      </Sider>
      <Content className="login__content">
        <img src="./imgs/change-pass.svg" alt="" />
      </Content>
    </Layout>
  );
};

export default ForgotPassword;
