import { Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { updateState } from "../../../slice/AuthSlice";

interface Props {}

const ChangePassword = (props: Props) => {
  const dispatch = useDispatch();
  const handleSendMail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTimeout(() => {
      dispatch(updateState(2));
    }, 2000);
  };
  return (
    <form className="typing__email" onSubmit={handleSendMail}>
      <p className="typing__email__title">Đặt lại mật khẩu</p>
      <p className="typing__email__text">
        Vui lòng nhập email để đặt lại mật khẩu của bạn *
      </p>
      <Input placeholder="Nhập email" />
      <div className="typing__email__actions">
        <button className="button button--outline">Hủy</button>
        <button className="button" type="submit">
          Tiếp tục
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
