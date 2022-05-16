import { Input, Select } from "antd";
import React, { useEffect, useState } from "react";

import { Layout } from "antd";
import { useDispatch } from "react-redux";
import { displayNumberPopup } from "../../slice/modalSlice";
import { Service } from "../../models/services";
import { getServiceById, loadServiceList } from "../../api/service";
import { generateOrder } from "../../api/numbers";
import { updateNumber } from "../../slice/numberSlice";
const { Content } = Layout;
const { Option } = Select;
type Props = {};

export interface FormNumberInput {
  serviceID: string;
  createdDate: string;
  expireDate: string;
  order: number;
}

const NumberProvicerForm = (props: Props) => {
  const dispatch = useDispatch();
  const [service, setService] = useState<Service[]>([]);
  const [choose, setChoose] = useState<Service>();
  const [formInput, setFormInput] = useState<FormNumberInput>({
    serviceID: service.length > 0 ? service[0].id : "",
    createdDate: new Date().toISOString(),
    expireDate: new Date().toISOString(),
    order: 0,
  });

  useEffect(() => {
    loadServiceList()
      .then((res) => {
        setService(res.slice(0, 5));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getServiceById(formInput.serviceID)
      .then((res) => {
        res && setChoose(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [formInput.serviceID]);

  const handlePrintNumber = async () => {
    if (choose) {
      const { id, increase, isReset, prefix, surfix } = choose;
      if (formInput.serviceID !== "") {
        const order = await generateOrder({
          id,
          increase,
          isReset,
          prefix,
          surfix,
        });

        dispatch(
          updateNumber({
            id: order,
            serviceID: choose.id,
            createdDate: new Date().toLocaleString().split(", ").join(" "),
            expireDate: new Date().toLocaleString().split(", ").join(" "),
            status: 0,
            serviceName: choose.name,
          })
        );
        dispatch(displayNumberPopup());
      }
    }
  };

  return (
    <Layout className="dashbad services">
      <Content className="dasbard__content">
        <h3 className="dashboard__content__title title-1">Quản lí cấp số</h3>
        <div className="devices__main ">
          <div className="numbers__main">
            <div className="form">
              <h2 className="form__title">Cấp số mới</h2>
              <h2 className="form__intro">Dịch vụ khách hàng lựa chọn</h2>
              <Select
                className="numbers__content__item form__selects"
                placeholder="Chọn dịch vụ"
                onChange={(value) =>
                  setFormInput({
                    ...formInput,
                    serviceID: value,
                  })
                }
              >
                {service.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              <div className="form__actions">
                <button className=" button button--outline">Hủy bỏ</button>
                <button
                  className=" button button--fill"
                  onClick={handlePrintNumber}
                >
                  In số
                </button>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default NumberProvicerForm;
