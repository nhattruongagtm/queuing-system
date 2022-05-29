import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "../components/DatePicker/DatePicker";

export interface Dashboard {
  date: DateTime;
}

const initialState: Dashboard = {
  date: {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  },
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateDate: (state,action:PayloadAction<DateTime>) =>{
            state.date = action.payload;
        }
    }
})
export const {updateDate} = dashboardSlice.actions;

export default dashboardSlice.reducer