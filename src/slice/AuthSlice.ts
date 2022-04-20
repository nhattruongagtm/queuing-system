import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthStatus {
  authStatus: number;
}

const initialState: AuthStatus = {
  authStatus: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<number>) => {
      state.authStatus = action.payload;
    },
  },
});

export const { updateState } = authSlice.actions;

export default authSlice.reducer;
