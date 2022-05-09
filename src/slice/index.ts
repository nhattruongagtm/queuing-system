import { combineReducers } from "redux";
import authSlice from "./AuthSlice";
import modalSlice from "./modalSlice";
import deviceSlice from "./deviceSlice";
export const rootReducer = combineReducers({
  auth: authSlice,
  devices: deviceSlice,
  modal: modalSlice,
});
