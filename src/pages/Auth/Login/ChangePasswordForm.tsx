import { Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateState } from "../../../slice/AuthSlice";

interface Props {}
interface LoginInput {
  password: string;
  retype: string;
}

const ChangePasswordForm = (props: Props) => {
  const initialInput: LoginInput = {
    password: "",
    retype: "",
  };
  const [input, setInput] = useState<LoginInput>(initialInput);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({
      ...input,
      [name]: value,
    });

    if (name === "password") {
      if (input.retype === value) {
        setError(false);
      } else {
        setError(true);
      }
    } else {
      if (input.password === value) {
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { retype, password } = input;

    if (retype !== "" && password !== "") {
      if (retype === password) {
        setError(false);
        setInput(initialInput);
        alert("Đổi mật khẩu thành công!");
      } else {
        setError(true);
      }
    }
  };

  return (
    <form className="login__form change__form" onSubmit={handleLogin}>
      <p className="change__title">Đặt lại mật khẩu mới</p>
      <div className="input">
        <p className="label">Mật khẩu</p>
        <Input.Password
          placeholder="Nhập mật khẩu"
          value={input.password}
          onChange={handleOnChange}
          className={error ? "input__error" : ""}
          name="password"
        />
      </div>
      <div className="input">
        <p className="label">Nhập lại mật khẩu</p>
        <Input.Password
          placeholder="Xác nhận mật khẩu"
          value={input.retype}
          onChange={handleOnChange}
          className={error ? "input__error" : ""}
          name="retype"
        />
      </div>
      {/* {!error ? (
        <a onClick={handleRedirectForgotPassword}>Quên mật khẩu?</a>
      ) : (
        <span className="login__error">Sai mật khẩu hoặc tên đăng nhập</span>
      )} */}
      <button
        className={`button btn__change ${
          input.retype.trim() !== input.password.trim() ||
          input.password.trim() === "" ||
          input.retype.trim() === ""
            ? "button--disable"
            : ""
        }`}
        type="submit"
      >
        Xác nhận
      </button>
    </form>
  );
};

export default ChangePasswordForm;
