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
              alert("Th??m t??i kho???n th??nh c??ng!");
            } else {
              alert("Th??m t??i kho???n th???t b???i!");
            }
          })
          .catch((e) => {
            alert("???? x???y ra l???i vui l??ng th??? l???i");
          });
      } else {
        // update
        updateAccount(input)
          .then((res) => {
            if (res) {
              alert("C???p nh???t th??ng tin th??nh c??ng!");
            } else {
              alert("C???p nh???t th??ng tin th???t b???i!");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      alert("Vui l??ng nh???p ?????y ????? th??ng tin!");
    }
  };
  return (
    <Layout className="add__device add__account">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">Qu???n l?? t??i kho???n</h3>
        <form
          className="add__device__form add__account__form"
          onSubmit={handleSubmitForm}
        >
          <div className="add__device__main">
            <div className="device__title title">Th??ng tin t??i kho???n</div>
            <div className="device__inputs">
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  H??? t??n: <span>*</span>
                </h4>
                <Input
                  placeholder="Nh???p h??? t??n"
                  name="fullName"
                  value={input.fullName}
                  onChange={handleOnChange}
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  T??n ????ng nh???p: <span>*</span>
                </h4>
                <Input
                  placeholder="Nh???p t??n ????ng nh???p"
                  name="username"
                  value={input.username}
                  onChange={handleOnChange}
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  S??? ??i???n tho???i: <span>*</span>
                </h4>
                <Input
                  placeholder="Nh???p s??? ??i???n tho???i"
                  value={input.phone}
                  onChange={handleOnChange}
                  name="phone"
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  M???t kh???u: <span>*</span>
                </h4>
                <Input.Password
                  placeholder="Nh???p m???t kh???u"
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
                  placeholder="Nh???p email"
                  value={input.email}
                  onChange={handleOnChange}
                  name="email"
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Nh???p l???i m???t kh???u: <span>*</span>
                </h4>
                <Input.Password
                  placeholder="Nh???p m???t kh???u"
                  name="rePassword"
                  value={input.rePassword}
                  onChange={handleOnChange}
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Vai tr??: <span>*</span>
                </h4>
                <Select
                  placeholder="Ch???n vai tr??"
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
                  T??nh tr???ng: <span>*</span>
                </h4>
                <Select
                  placeholder="Ch???n t??nh tr???ng"
                  className="add__device__select"
                  value={input.status === -1 ? null : input.status + ""}
                  onChange={(value) =>
                    setInput({
                      ...input,
                      status: Number(value),
                    })
                  }
                >
                  <Option value="0"> Ho???t ?????ng</Option>
                  <Option value="1"> Ng??ng ho???t ?????ng</Option>
                </Select>
              </div>
            </div>

            <p className="device__notify">
              <span>*</span> L?? tr?????ng th??ng tin b???c bu???c
            </p>
          </div>
          <div className="add__device__actions">
            <button
              className="button button--outline"
              type="button"
              onClick={() => navigate(IRoute.SETTINGS_ACCOUNT)}
            >
              H???y b???
            </button>
            <button className="button" type="submit">
              {edit.id === "" ? "Th??m t??i kho???n" : "C???p nh???t"}
            </button>
          </div>
        </form>
      </Content>
    </Layout>
  );
};

export default AddAccount;
