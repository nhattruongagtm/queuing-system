import { Input, Layout, Select, Tag, TagProps, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Set } from "typescript";
import { createRole, getRoleGroup, updateRole } from "../../api/role";
import { IRoute } from "../../constant/routes";
import { Role, RoleGroup } from "../../models/role";
import { RootState } from "../../store";
import FunctionGroup from "./FunctionGroup";
const { Content } = Layout;
const { Option } = Select;

const { TextArea } = Input;

type Props = {};

interface tagProps {
  label: string;
  value: string;
  closable: boolean;
  onClose: () => void;
}

const AddRole = (props: Props) => {
  const navigate = useNavigate();
  const [check, setCheck] = useState<string[]>([]);
  const [roles, setRoles] = useState<RoleGroup[]>([]);
  const edit = useSelector((state: RootState) => state.role.edit);
  const [role, setRole] = useState<Role>({
    id: "-1",
    name: "",
    desc: "",
    numberOfUsers: 10,
  });
  const id = useParams().id;

  useEffect(() => {
    setRole(edit);
    edit.permission && setCheck(edit.permission.map((item) => item.id));
  }, [edit]);

  useEffect(() => {
    const loadRoles = async () => {
      const rs = await getRoleGroup();
      setRoles(rs);
    };
    loadRoles();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setRole({
      ...role,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (role.name.trim() === "" && role.desc.trim() === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
    } else {
      if (edit.id !== "") {
        // update
        try {
          updateRole(role);
          alert("Cập nhật vai trò thành công!");
        } catch (error) {
          console.log(e);
        }
      } else {
        // create
        console.log(role);
        try {
          await createRole(role);
          alert("Thêm vai trò thành công!");
          setRole({
            id: "-1",
            name: "",
            desc: "",
            numberOfUsers: 10,
          });
        } catch (error) {
          alert("ERROR");
        }
      }
    }
  };
  const handleGetValue = (rs: string[]) => {
    const newCheckList = [...check, ...rs];
    const checkList = new Set(newCheckList);
    if (rs.length === 0) {
      setCheck([]);
    } else {
      setCheck([...check, ...rs]);
    }
    setRole({
      ...role,
      permission:
        rs.length === 0
          ? []
          : Array.from(checkList).map((item) => {
              return {
                id: item + "",
                name: "",
              };
            }),
    });
  };

  return (
    <Layout className="add__device">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">Danh sách vai trò</h3>
        <form
          className="add__device__form role__manager"
          onSubmit={handleSubmit}
        >
          <div className="add__device__main">
            <div className="device__title title">Thông tin vai trò</div>
            <div className="device__inputs role__main">
              <div className="role__inputs">
                <div className="device__input__which">
                  <h4 className="device__input__title">
                    Tên vai trò <span>*</span>
                  </h4>
                  <Input
                    placeholder="Nhập tên vai trò"
                    value={role.name}
                    name="name"
                    onChange={handleChange}
                  />
                </div>
                <div className="device__input__which">
                  <h4 className="device__input__title">
                    Mô tả: <span>*</span>
                  </h4>
                  <TextArea
                    rows={6}
                    placeholder="Nhập mô tả"
                    value={role.desc}
                    name="desc"
                    onChange={handleChange}
                  />
                </div>
                <p className="device__notify">
                  <span>*</span> Là trường thông tin bắc buộc
                </p>
              </div>
              <div className="role__checkboxs">
                <div className="device__input__which role__checkboxs__main">
                  <h4 className="device__input__title">
                    Phân quyền chức năng <span>*</span>
                  </h4>
                  <div className="role__list">
                    <div className="role__list__scroll">
                      {roles.map((item) => (
                        <FunctionGroup
                          role={item}
                          onGetValue={handleGetValue}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="add__device__actions">
            <button
              className="button button--outline"
              type="button"
              onClick={() => navigate(IRoute.SETTINGS_ROLE)}
            >
              Hủy bỏ
            </button>
            <button className="button" type="submit">
              {edit.id !== "" ? "Cập nhật" : "Thêm vai trò  "}
            </button>
          </div>
        </form>
      </Content>
    </Layout>
  );
};

export default AddRole;
