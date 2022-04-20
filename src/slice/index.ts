import { combineReducers } from "redux";
import authSlice from "./AuthSlice";
export const rootReducer = combineReducers({
  auth: authSlice,
});
