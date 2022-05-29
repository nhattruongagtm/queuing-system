import { combineReducers } from "redux";
import authSlice from "./AuthSlice";
import modalSlice from "./modalSlice";
import deviceSlice from "./deviceSlice";
import serviceSlice from "./serviceSlice";
import numberSlice from "./numberSlice";
import reportSlice from "./reportSlice";
import roleSlice from "./roleSlice";
import accountSlice from "./accountSlice";
import logSlice from "./logSlice";
import dashboardSlice from "./dashboardSlice";
export const rootReducer = combineReducers({
  auth: authSlice,
  devices: deviceSlice,
  modal: modalSlice,
  numbers: numberSlice,
  services: serviceSlice,
  report: reportSlice,
  role: roleSlice,
  account: accountSlice,
  log: logSlice,
  dashboard: dashboardSlice,
});
