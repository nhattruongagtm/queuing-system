import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAccount } from "../models/user";

export interface AuthStatus {
  authStatus: number;
  user: UserAccount;
}

const initialState: AuthStatus = {
  authStatus: 0,
  user: {
    id: "",
    username: "",
    password: "",
    createdToken: 0,
    email: "",
    expiredToken: 0,
    token: "",
    fullName: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<number>) => {
      state.authStatus = action.payload;
    },
    updateUserForgot: (state, action: PayloadAction<UserAccount>) => {
      state.user = action.payload;
    },
  },
});

export const { updateState,updateUserForgot } = authSlice.actions;

export default authSlice.reducer;
