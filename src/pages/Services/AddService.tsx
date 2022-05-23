import { Checkbox, Input, Layout, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createLog } from "../../api/log";
import { createService, updateService } from "../../api/service";
import { Log } from "../../models/log";
import { Service } from "../../models/services";
import { RootState } from "../../store";
const { Content } = Layout;
const { Option } = Select;

type Props = {};

const { TextArea } = Input;

const AddService = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState<Service>({
    id: "",
    name: "",
    desc: "",
    increase: {
      from: 0,
      to: 0,
    },
    prefix: 0,
    surfix: 0,
    isReset: false,
    status: 1,
    createdDate: `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`,
  });
  const edit = useSelector((state: RootState) => state.services.edit);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      if (edit.id !== "") {
        // update
        updateService(input)
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
              alert("Cập nhật dịch vụ thành công!");
            } else {
              alert("Cập nhật dịch vụ thất bại!");
            }
          })
          .catch((e) => {
            alert("Đã xảy ra lỗi vui lòng thử lại!");
            console.log(e);
          });
      } else {
        // create
        createService(input)
          .then((res) => {
            if (res) {
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
              alert("Thêm dịch vụ thành công!");
            } else {
              alert("Thêm dịch vụ thất bại!");
            }
          })
          .catch((e) => {
            alert("Đã xảy ra lỗi vui lòng thử lại!");
            console.log(e);
          });
      }
    }
  };

  useEffect(() => {
    setInput(edit);
  }, [edit]);

  const validate = () => {
    if (
      input.id.trim() !== "" ||
      input.name.trim() !== "" ||
      input.desc.trim() !== ""
    ) {
      return true;
    }
    return false;
  };
  return (
    <Layout className="add__device">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">Quản lý dịch vụ</h3>
        <form className="add__device__form" onSubmit={handleSubmit}>
          <div className="add__device__main add__service__main">
            <div className="device__title title">Thông tIn dịch vụ</div>
            <div className="device__inputs service__inputs">
              <div className="service__input__left">
                <div className="device__inputs__item service__input__item">
                  <h4 className="device__input__title">
                    Mã dịch vụ: <span>*</span>
                  </h4>
                  <Input
                    placeholder="Nhập mã thiết bị"
                    value={input.id}
                    onChange={(e) => setInput({ ...input, id: e.target.value })}
                    disabled={edit.id !== ""}
                  />
                </div>
                <div className="device__inputs__item service__input__item">
                  <h4 className="device__input__title">
                    Tên dịch vụ: <span>*</span>
                  </h4>
                  <Input
                    placeholder="Nhập tên thiết bị"
                    value={input.name}
                    onChange={(e) =>
                      setInput({ ...input, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="service__input__right">
                <div className="device__inputs__item service__input__item">
                  <h4 className="device__input__title">
                    Mô tả: <span>*</span>
                  </h4>
                  <TextArea
                    placeholder="Mô tả dịch vụ"
                    value={input.desc}
                    onChange={(e) =>
                      setInput({ ...input, desc: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="service__principles">
                <h3 className="service__principles__title title">
                  Quy tắc cấp số
                </h3>
                <div className="service__principles__main">
                  <div className="service__principles__item">
                    <Checkbox>
                      <span className="check__label">Tăng tự động từ:</span>{" "}
                    </Checkbox>{" "}
                    <Input
                      placeholder="0001"
                      value={
                        input.increase.from === 0 ? "" : input.increase.from
                      }
                      type="number"
                      onChange={(e) =>
                        setInput({
                          ...input,
                          increase: {
                            ...input.increase,
                            from: Number(e.target.value),
                          },
                        })
                      }
                    />{" "}
                    <span>đến</span>{" "}
                    <Input
                      type="number"
                      placeholder="9999"
                      value={input.increase.to === 0 ? "" : input.increase.to}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          increase: {
                            ...input.increase,
                            to: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div className="service__principles__item">
                    <Checkbox>
                      <span className="check__label">Prefix:</span>{" "}
                    </Checkbox>{" "}
                    <Input
                      type="number"
                      placeholder="0001"
                      value={input.prefix === 0 ? "" : input.prefix}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          prefix: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="service__principles__item">
                    <Checkbox>
                      <span className="check__label">Surfix:</span>{" "}
                    </Checkbox>{" "}
                    <Input
                      type="number"
                      placeholder="0001"
                      onChange={(e) =>
                        setInput({
                          ...input,
                          surfix: Number(e.target.value),
                        })
                      }
                      value={input.surfix === 0 ? "" : input.surfix}
                    />
                  </div>
                  <div className="service__principles__item">
                    <Checkbox
                      onChange={() =>
                        setInput({
                          ...input,
                          isReset: !input.isReset,
                        })
                      }
                      value={input.isReset}
                    >
                      <span className="check__label">Reset mỗi ngày:</span>{" "}
                    </Checkbox>{" "}
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
            <p className="device__notify">
              <span>*</span> Là trường thông tIn bắc buộc
            </p>
          </div>
          <div className="add__device__actions add__service__actions">
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

export default AddService;
