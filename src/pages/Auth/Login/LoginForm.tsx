import { Input } from "antd";
import md5 from "md5";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../../api/auth";
import { IRoute } from "../../../constant/routes";
import { ACCESS_TOKEN } from "../../../constant/token";
import { updateState } from "../../../slice/AuthSlice";

interface Props {}
interface LoginInput {
  username: string;
  password: string;
}

const LoginForm = (props: Props) => {
  const initialInput: LoginInput = {
    username: "",
    password: "",
  };
  const [input, setInput] = useState<LoginInput>(initialInput);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, password } = input;

    if (username.trim() !== "" && password.trim() !== "") {
      // if (username === "nhattruongagtm" && password === "123") {
      //   setError(false);
      //   setInput(initialInput);
      //   alert("Đăng nhập thành công!");
      // } else {
      //   setError(true);
      // }
      login(username, password)
        .then((res) => {
          if (res) {
            localStorage.setItem(
              ACCESS_TOKEN,
              JSON.stringify({ ...res, password: "**************************" })
            );

            alert("Đăng nhập thành công!");
            navigate(IRoute.DASHBOARD);
          } else {
            setError(true);
          }
        })
        .then((e) => {
          console.log(e);
        });
    }
  };
  const handleRedirectForgotPassword = () => {
    dispatch(updateState(1));
  };
  return (
    <form className="login__form" onSubmit={handleLogin}>
      <div className="input input--text">
        <p className="label">Tên đăng nhập *</p>
        <Input
          placeholder="Nhập tên đăng nhập"
          value={input.username}
          onChange={(e) => setInput({ ...input, username: e.target.value })}
          className={error ? "input__error" : ""}
        />
      </div>
      <div className="input">
        <p className="label">Mật khẩu *</p>
        <Input.Password
          placeholder="Nhập mật khẩu"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          className={error ? "input__error" : ""}
        />
      </div>
      {!error ? (
        <a onClick={handleRedirectForgotPassword}>Quên mật khẩu?</a>
      ) : (
        <span className="login__error">Sai mật khẩu hoặc tên đăng nhập</span>
      )}
      <button
        className={`button ${
          input.username.trim() === "" || input.password.trim() === ""
            ? "button--disable"
            : ""
        }`}
        type="submit"
      >
        Đăng nhập
      </button>
      {error && (
        <a className="login__forgot" onClick={handleRedirectForgotPassword}>
          Quên mật khẩu?
        </a>
      )}
    </form>
  );
};

export default LoginForm;
