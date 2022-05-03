import { CloseOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { hiddenModal, ModalState } from "../../slice/modalSlice";
type Props = {};

const NumberPopup = (props: Props) => {
  const dispatch = useDispatch()
  const modalState = useSelector((state: RootState) => state.modal.status);
  return (
    <div
      className={`number__note ${
        modalState === ModalState.NUMBER_PROVIDER ? "display" : ""
      }`}
    >
      <div className="number__note__header">
        <CloseOutlined onClick={()=>dispatch(hiddenModal())}/>
      </div>
      <div className="number__note__main">
        <h3 className="note__title">Số thứ tự được cấp</h3>
        <h3 className="note__order">2001201</h3>
        <h3 className="note__sevice">
          DV: Khám răng hàm mặt <span>(tại quầy số 1)</span>
        </h3>
      </div>
      <div className="number__note__footer">
        <div className="number__createdDate">
          <span>Thời gian cấp:</span>
          <span>09:30 11/10/2021</span>
        </div>
        <div className="number__createdDate">
          <span>Thời gian cấp:</span>
          <span>09:30 11/10/2021</span>
        </div>
      </div>
    </div>
  );
};

export default NumberPopup;
