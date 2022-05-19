import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "../models/device";
import { Numbers } from "../models/numbers";
import { Service } from "../models/services";
import { FilterNumber } from "../pages/NumberProvidation/NumberProvidation";
import { FilterReport } from "../pages/Report/Report";

interface NumberSlice {
  reportList: Numbers[];
  edit: Numbers;
  fitler: FilterReport;
}

const initialState: NumberSlice = {
  reportList: [],
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
  },
};

const reportSlice = createSlice({
  name: "Reports",
  initialState,
  reducers: {
    loadReportList: (state, action: PayloadAction<Numbers[]>) => {
      state.reportList = action.payload;
    },
    createReport: (state, action: PayloadAction<Numbers>) => {
      state.reportList.push(action.payload);
    },
    updateReport: (state, action: PayloadAction<Numbers>) => {
      state.edit = action.payload;
    },
    resetEditReport: (state) => {
      state.edit = initialState.edit;
    },
    filterReport: (state, action: PayloadAction<FilterReport>) => {
      state.fitler = action.payload;
    },
  },
});

export const {
  createReport,
  filterReport,
  loadReportList,
  resetEditReport,
  updateReport,
} = reportSlice.actions;

export default reportSlice.reducer;
