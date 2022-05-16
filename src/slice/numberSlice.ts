import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "../models/device";
import { Numbers } from "../models/numbers";
import { Service } from "../models/services";
import { FilterNumber } from "../pages/NumberProvidation/NumberProvidation";

interface NumberSlice {
  numberList: Numbers[];
  edit: Numbers;
  fitler: FilterNumber;
}

const initialState: NumberSlice = {
  numberList: [],
  edit: {
    id: "",
    createdDate: "",
    expireDate: "",
    status: 0,
    customerID: "",
  },
  fitler: {
    dateFrom: "",
    dateTo: "",
    deviceID: "",
    search: "",
    serviceID: "",
    status: -1,
  },
};

const numberSlice = createSlice({
  name: "numbers",
  initialState,
  reducers: {
    loadNumberList: (state, action: PayloadAction<Numbers[]>) => {
      state.numberList = action.payload;
    },
    createNumber: (state, action: PayloadAction<Numbers>) => {
      state.numberList.push(action.payload);
    },
    updateNumber: (state, action: PayloadAction<Numbers>) => {
      state.edit = action.payload;
    },
    resetEditNumber: (state) => {
      state.edit = initialState.edit;
    },
    filterNumber: (state, action: PayloadAction<FilterNumber>) => {
      state.fitler = action.payload;
    },
  },
});

export const {
  createNumber,
  filterNumber,
  loadNumberList,
  resetEditNumber,
  updateNumber,
} = numberSlice.actions;

export default numberSlice.reducer;
