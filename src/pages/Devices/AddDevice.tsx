import { Input, Layout, Select, Tag, TagProps } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createDevice, updateDevice } from "../../api/device";
import { createLog } from "../../api/log";
import { Device } from "../../models/device";
import { Log } from "../../models/log";
import { createDevice as createDeviceStore } from "../../slice/deviceSlice";
import { RootState } from "../../store";
const { Content } = Layout;
const { Option } = Select;

type Props = {};

interface tagProps {
  label: string;
  value: string;
  closable: boolean;
  onClose: () => void;
}

function tagRender(props: any) {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={"#FFAC6A"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}
const options = [
  { value: "Khám tim mạch" },
  { value: "Khám sản phụ khoa" },
  { value: "Khám răng hàm mặt" },
  { value: "Khám tai mũi họng" },
  { value: "Khám tổng quát" },
];

export interface AddDeviceInput {
  id: string;
  type: string;
  name: string;
  username: string;
  password: string;
  ip: string;
  usedDevice: string[];
}

const AddDevice = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const edit = useSelector((state: RootState) => state.devices.edit);
  const [input, setInput] = useState<Device>({
    id: "",
    name: "",
    username: "",
    password: "",
    ip: "",
    type: "",
    activeStatus: 0,
    connectStatus: 0,
    usedDevice: [],
  });
  const checkEmpty = () => {
    const { id, name, ip, usedDevice, password, username, type } = input;
    if (
      id.trim() === "" ||
      name.trim() === "" ||
      ip.trim() === "" ||
      usedDevice.length === 0 ||
      username.trim() === "" ||
      password.trim() === "" ||
      type === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return false;
    }
    return true;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      id,
      name,
      activeStatus,
      connectStatus,
      ip,
      usedDevice,
      username,
      password,
      type,
    } = input;
    const device: Device = {
      id,
      activeStatus,
      connectStatus,
      ip,
      name,
      usedDevice,
      username,
      password,
      type,
    };

    if (edit.id === "") {
      // create
      checkEmpty() &&
        createDevice(device)
          .then((res) => {
            const log: Log = {
              username: "nhattruongagtm",
              dateTime: new Date().toLocaleString().split(", ").join(" "),
              ip: "192.168.1.5",
              action: 0,
              actor: input.id,
            };
            createLog(log)
              .then((res) => {})
              .catch((e) => {
                console.log(e);
              });
            if (res) {
              alert("Thêm thiết bị thành công!");
            } else {
              alert("Mã thiết bị đã tồn tại!");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      dispatch(createDeviceStore(input));
    } else {
      // update
      updateDevice(input)
        .then((res) => {
          if (res) {
            const log: Log = {
              username: "nhattruongagtm",
              dateTime: new Date().toLocaleString().split(", ").join(" "),
              ip: "192.168.1.5",
              action: 1,
              actor: input.id,
            };
            createLog(log)
              .then((res) => {})
              .catch((e) => {
                console.log(e);
              });
            alert("Cập nhật thiết bị thành công!");
          } else {
            alert("Cập nhật thông tin thất bại!");
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Đã xảy ra lỗi vui lòng thử lại!");
        });
    }
  };

  useEffect(() => {
    setInput(edit);
  }, [edit]);
  return (
    <Layout className="add__device">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">Quản lý thiết bị</h3>
        <form className="add__device__form" onSubmit={handleSubmit}>
          <div className="add__device__main">
            <div className="device__title title">Thông tin thiết bị</div>
            <div className="device__inputs">
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Mã thiết bị: <span>*</span>
                </h4>
                <Input
                  placeholder="Nhập mã thiết bị"
                  value={input.id}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      id: e.target.value,
                    })
                  }
                  disabled={edit.id !== ""}
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Loại thiết bị: <span>*</span>
                </h4>
                <Select
                  placeholder="Chọn loại thiết bị"
                  className="add__device__select"
                  onChange={(value) =>
                    setInput({
                      ...input,
                      type: value,
                    })
                  }
                  defaultValue={"Kiosk"}
                >
                  <Option value="Kiosk"> Kiosk</Option>
                  <Option value="Display counter"> Display counter</Option>
                </Select>
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Tên thiết bị: <span>*</span>
                </h4>
                <Input
                  placeholder="Nhập tên thiết bị"
                  value={input.name}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Tên đăng nhập: <span>*</span>
                </h4>
                <Input
                  placeholder="Nhập tài khoản"
                  value={input.username}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      username: e.target.value,
                    })
                  }
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Địa chỉ IP: <span>*</span>
                </h4>
                <Input
                  placeholder="Nhập địa chỉ IP"
                  value={input.ip}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      ip: e.target.value,
                    })
                  }
                />
              </div>
              <div className="device__inputs__item">
                <h4 className="device__input__title">
                  Mật khẩu: <span>*</span>
                </h4>
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  value={input.password}
                  className="input--password"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="device__input__which">
              <h4 className="device__input__title">
                Dịch vụ sử dụng: <span>*</span>
              </h4>
              {/* <Input placeholder="Nhập dịch vụ sử dụng" /> */}
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                // defaultValue={["gold", "cyan"]}
                style={{ width: "100%" }}
                options={options}
                onChange={(value) =>
                  setInput({
                    ...input,
                    usedDevice: value,
                  })
                }
                value={input.usedDevice}
              />
            </div>
            <p className="device__notify">
              <span>*</span> Là trường thông tin bắc buộc
            </p>
          </div>
          <div className="add__device__actions">
            <button
              className="button button--outline"
              type="button"
              onClick={() => navigate(-1)}
            >
              Hủy bỏ
            </button>
            <button className="button" type="submit">
              {edit.id === "" ? "Thêm thiết bị" : "Cập nhật"}
            </button>
          </div>
        </form>
      </Content>
    </Layout>
  );
};

export default AddDevice;
