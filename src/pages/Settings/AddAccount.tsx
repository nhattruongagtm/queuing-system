import { Input, Layout, Select, Tag, TagProps } from "antd";
import React, { useState, useEffect } from "react";
import { createAccount, updateAccount } from "../../api/account";
import { loadRoleList } from "../../api/role";
import { Account } from "../../models/account";
import { Role } from "../../models/role";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router";
import { IRoute } from "../../constant/routes";
const { Content } = Layout;
const { Option } = Select;

type Props = {};

export interface Password {
  password: string;
  rePassword: string;
}

export type AccountInput = Account & Password;

const AddAccount = (props: Props) => {
  const navigate = useNavigate();
  const [roleList, setRoleList] = useState<Role[]>([]);
  const [input, setInput] = useState<Account>({
    id: "",
    email: "",
    fullName: "",
    phone: "",
    role: "",
    status: -1,
    username: "",
    password: "",
    rePassword: "",
  });
  const edit = useSelector((state: RootState) => state.account.edit);

  useEffect(() => {
    setInput(edit);
  }, [edit]);

  useEffect(() => {
    loadRoleList()
      .then((res) => {
        setRoleList(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };
  const validate = () => {
    const { email, fullName, password, phone, rePassword, username } = input;
    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      phone.trim() === "" ||
      rePassword.trim() === "" ||
      username.trim() === ""
    ) {
      return false;
    }
    return true;
  };
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log(input);
      if (edit.id === "") {
        // create
        createAccount(input)
          .then((res) => {
            if (res) {
              alert("Thêm tài khoản thành công!");
            } else {
              alert("Thêm tài khoản thất bại!");
            }
          })
          .catch((e) => {
            alert("Đã xảy ra lỗi vui lòng thử lại");
          });
      } else {
        // update
        updateAccount(input)
          .then((res) => {
            if (res) {
              alert("Cập nhật thông tin thành công!");
            } else {
              alert("Cập nhật thông tin thất bại!");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };
  return (
    <Layout className="add__device add__account">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">Quản lý tài khoản</h3>
        <form
          className="add__device__form add__account__form"
          onSubmit={handleSubmitForm}
        >
          <div className="add__device__main">
            <div className="device__title title">Thông tin tài khoản</div>
            <div className="device__inputs">
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Họ tên: <span>*</span>
                </h4>
                <Input
                  placeholder="Nhập họ tên"
                  name="fullName"
                  value={input.fullName}
                  onChange={handleOnChange}
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Tên đăng nhập: <span>*</span>
                </h4>
                <Input
                  placeholder="Nhập tên đăng nhập"
                  name="username"
                  value={input.username}
                  onChange={handleOnChange}
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Số điện thoại: <span>*</span>
                </h4>
                <Input
                  placeholder="Nhập số điện thoại"
                  value={input.phone}
                  onChange={handleOnChange}
                  name="phone"
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Mật khẩu: <span>*</span>
                </h4>
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  name="password"
                  value={input.password}
                  onChange={handleOnChange}
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Email: <span>*</span>
                </h4>
                <Input
                  placeholder="Nhập email"
                  value={input.email}
                  onChange={handleOnChange}
                  name="email"
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Nhập lại mật khẩu: <span>*</span>
                </h4>
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  name="rePassword"
                  value={input.rePassword}
                  onChange={handleOnChange}
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Vai trò: <span>*</span>
                </h4>
                <Select
                  placeholder="Chọn vai trò"
                  className="add__device__select"
                  value={input.role === "" ? null : input.role}
                  onChange={(value) =>
                    setInput({
                      ...input,
                      role: value,
                    })
                  }
                >
                  {roleList.map((item) => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Tình trạng: <span>*</span>
                </h4>
                <Select
                  placeholder="Chọn tình trạng"
                  className="add__device__select"
                  value={input.status === -1 ? null : input.status + ""}
                  onChange={(value) =>
                    setInput({
                      ...input,
                      status: Number(value),
                    })
                  }
                >
                  <Option value="0"> Hoạt động</Option>
                  <Option value="1"> Ngưng hoạt động</Option>
                </Select>
              </div>
            </div>

            <p className="device__notify">
              <span>*</span> Là trường thông tin bắc buộc
            </p>
          </div>
          <div className="add__device__actions">
            <button
              className="button button--outline"
              type="button"
              onClick={() => navigate(IRoute.SETTINGS_ACCOUNT)}
            >
              Hủy bỏ
            </button>
            <button className="button" type="submit">
              {edit.id === "" ? "Thêm tài khoản" : "Cập nhật"}
            </button>
          </div>
        </form>
      </Content>
    </Layout>
  );
};

export default AddAccount;
