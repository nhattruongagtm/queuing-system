import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../models/account";
import { FilterNumber } from "../pages/NumberProvidation/NumberProvidation";

export interface FilterAccount {
  search: string;
  status: number;
}
interface NumberSlice {
  accountList: Account[];
  edit: Account;
  fitler: FilterAccount;
}

const initialState: NumberSlice = {
  accountList: [],
  edit: {
    id: "",
    email: "",
    fullName: "",
    phone: "",
    role: "",
    status: -1,
    username: "",
    password: "",
    rePassword: "",
  },
  fitler: {
    search: "",
    status: -1,
  },
};

const numberSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    loadAccountList: (state, action: PayloadAction<Account[]>) => {
      state.accountList = action.payload;
    },
    createAccount: (state, action: PayloadAction<Account>) => {
      state.accountList.push(action.payload);
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      state.edit = action.payload;
    },
    resetEditAccount: (state) => {
      state.edit = initialState.edit;
    },
    filterAccount: (state, action: PayloadAction<FilterAccount>) => {
      state.fitler = action.payload;
    },
  },
});

export const {
  createAccount,
  filterAccount,
  loadAccountList,
  resetEditAccount,
  updateAccount,
} = numberSlice.actions;

export default numberSlice.reducer;
