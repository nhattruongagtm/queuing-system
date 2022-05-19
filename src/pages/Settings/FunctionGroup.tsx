import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import Item from "antd/lib/list/Item";
import React, { useState } from "react";
import { Feature, Role, RoleGroup } from "../../models/role";

type Props = {
  role: RoleGroup;
  onGetValue: (rs: string[]) => void;
};

const FunctionGroup = ({ role, onGetValue }: Props) => {
  const { id, roles } = role;
  const [check, setCheck] = useState<string[]>([]);

  const handleChange = (value: string) => {
    let rs: string[] = [];
    if (!check.includes(value)) {
      if (value === "-1") {
        if (roles) {
          rs = roles?.map((item) => item.id);
        }
        setCheck(["-1"]);
      } else {
        rs = [...check.filter((item) => item !== "-1"), value];
        setCheck([...check.filter((item) => item !== "-1"), value]);
      }
    } else {
      if (value === "-1") {
        rs = [];
        setCheck([]);
      } else {
        rs = [...check.filter((item) => item !== value)];
        setCheck([...check.filter((item) => item !== value)]);
      }
    }
    onGetValue(rs);
  };
  return (
    <div className="role__list__item">
      <h3 className="title">Nhóm chức năng {id}</h3>
      <div className="item__list">
        <div className="item__list__item">
          <Checkbox
            value={-1}
            onChange={() => handleChange("-1")}
            checked={check.includes("-1")}
          >
            Tất cả
          </Checkbox>
        </div>
        {roles &&
          roles.map((item, index) => (
            <div className="item__list__item" key={index}>
              <Checkbox
                value={item.id}
                onChange={() => handleChange(item.id)}
                checked={check.includes(item.id) || check.includes("-1")}
              >
                {item.name}
              </Checkbox>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FunctionGroup;
