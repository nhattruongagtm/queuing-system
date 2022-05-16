import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { hiddenModal, ModalState } from "../../slice/modalSlice";
type Props = {};

const NumberPopup = (props: Props) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal.status);
  const orderPopup = useSelector((state: RootState) => state.numbers.edit);
  return (
    <div
      className={`number__note ${
        modalState === ModalState.NUMBER_PROVIDER ? "display" : ""
      }`}
    >
      <div className="number__note__header">
        <CloseOutlined onClick={() => dispatch(hiddenModal())} />
      </div>
      <div className="number__note__main">
        <h3 className="note__title">Số thứ tự được cấp</h3>
        <h3 className="note__order">{orderPopup.id}</h3>
        <h3 className="note__sevice">
          DV: {orderPopup.serviceName} <span>(tại quầy số 1)</span>
        </h3>
      </div>
      <div className="number__note__footer">
        <div className="number__createdDate">
          <span>Thời gian cấp:</span>
          <span>{orderPopup.createdDate}</span>
        </div>
        <div className="number__createdDate">
          <span>Hạn sử dụng:</span>
          <span>{orderPopup.expireDate}</span>
        </div>
      </div>
    </div>
  );
};

export default NumberPopup;
