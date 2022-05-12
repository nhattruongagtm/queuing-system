import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "../models/device";
import { Service } from "../models/services";
export interface FilterService {
  status: number;
  dateFrom: string;
  dateTo: string;
  search: string;
}
interface ServiceSlice {
  serviceList: Service[];
  edit: Service;
  fitler: FilterService;
}

const initialState: ServiceSlice = {
  serviceList: [],
  edit: {
    id: "",
    name: "",
    status: 0,
    desc: "",
    increase: {
      from: 0,
      to: 0,
    },
    isReset: false,
    prefix: 0,
    surfix: 0,
    createdDate: "",
  },
  fitler: {
    status: -1,
    dateFrom: "",
    dateTo: "",
    search: "",
  },
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    loadServiceList: (state, action: PayloadAction<Service[]>) => {
      state.serviceList = action.payload;
    },
    createService: (state, action: PayloadAction<Service>) => {
      state.serviceList.push(action.payload);
    },
    updateService: (state, action: PayloadAction<Service>) => {
      state.edit = action.payload;
    },
    resetEditService: (state) => {
      state.edit = initialState.edit;
    },
    filterService: (state, action: PayloadAction<FilterService>) => {
      state.fitler = action.payload;
    },
  },
});

export const {
  createService,
  filterService,
  loadServiceList,
  resetEditService,
  updateService,
} = serviceSlice.actions;

export default serviceSlice.reducer;
