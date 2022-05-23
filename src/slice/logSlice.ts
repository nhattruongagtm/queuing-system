import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterLog } from "../api/log";
import { Device } from "../models/device";
import { Log } from "../models/log";
import { Numbers } from "../models/numbers";
import { Service } from "../models/services";
import { FilterNumber } from "../pages/NumberProvidation/NumberProvidation";
import { FilterReport } from "../pages/Report/Report";

interface LogSlice {
  logList: Log[];
  fitler: FilterLog;
}

const initialState: LogSlice = {
  logList: [],
  fitler: {
    dateFrom: "",
    dateTo: "",
    search: "",
  },
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    loadLogList: (state, action: PayloadAction<Log[]>) => {
      state.logList = action.payload;
    },
    createLog: (state, action: PayloadAction<Log>) => {
      state.logList.push(action.payload);
    },
    filterLog: (state, action: PayloadAction<FilterLog>) => {
      state.fitler = action.payload;
    },
  },
});

export const { createLog, filterLog, loadLogList } = logSlice.actions;

export default logSlice.reducer;
