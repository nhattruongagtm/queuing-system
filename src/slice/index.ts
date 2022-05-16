import { combineReducers } from "redux";
import authSlice from "./AuthSlice";
import modalSlice from "./modalSlice";
import deviceSlice from "./deviceSlice";
import serviceSlice from "./serviceSlice";
import numberSlice from "./numberSlice";
export const rootReducer = combineReducers({
  auth: authSlice,
  devices: deviceSlice,
  modal: modalSlice,
  numbers: numberSlice,
  services: serviceSlice,
});
