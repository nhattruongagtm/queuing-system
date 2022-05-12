import { combineReducers } from "redux";
import authSlice from "./AuthSlice";
import modalSlice from "./modalSlice";
import deviceSlice from "./deviceSlice";
import serviceSlice from "./serviceSlice";
export const rootReducer = combineReducers({
  auth: authSlice,
  devices: deviceSlice,
  modal: modalSlice,
  services: serviceSlice
});
