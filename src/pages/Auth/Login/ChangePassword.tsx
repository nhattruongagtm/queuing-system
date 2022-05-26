import { Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getUserByEmail, updateUser } from "../../../api/auth";
import { mailApi } from "../../../api/mail";
import { updateState, updateUserForgot } from "../../../slice/AuthSlice";

interface Props {}

const ChangePassword = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const handleSendMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() !== "") {
      mailApi
        .sendMail(email)
        .then(async (res) => {
          if (res) {
            const user = await getUserByEmail(email);
            if (user.id !== "") {
              const u = {
                ...user,
                token: res,
                createdToken: new Date().getTime(),
                expiredToken: new Date().getTime() + 1000 * 60,
              };
              updateUser(u).then((res) => {
                updateUserForgot(u);
              });
            }
            setEmail("");
            alert("Gửi mail thành công! Vui lòng kiểm tra email!");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("Vui lòng nhập email!");
    }
  };
  return (
    <form className="typing__email" onSubmit={handleSendMail}>
      <p className="typing__email__title">Đặt lại mật khẩu</p>
      <p className="typing__email__text">
        Vui lòng nhập email để đặt lại mật khẩu của bạn *
      </p>
      <Input
        placeholder="Nhập email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="typing__email__actions">
        <button
          className="button button--outline"
          type="button"
          onClick={() => navigate(-1)}
        >
          Hủy
        </button>
        <button className="button" type="submit">
          Tiếp tục
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
