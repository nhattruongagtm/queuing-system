import { combineReducers } from "redux";
import authSlice from "./AuthSlice";
import modalSlice from "./modalSlice";
export const rootReducer = combineReducers({
  auth: authSlice,
  modal: modalSlice,
});
