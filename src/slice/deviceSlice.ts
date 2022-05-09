import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterParams } from "../api/device";
import { Device } from "../models/device";
interface DeviceSlice {
  deviceList: Device[];
  edit: Device;
  fitler: FilterParams;
}

const initialState: DeviceSlice = {
  deviceList: [],
  edit: {
    id: "",
    name: "",
    username: "",
    password: "",
    ip: "",
    type: "",
    activeStatus: 0,
    connectStatus: 0,
    usedDevice: [],
  },
  fitler: {
    activeStatus: -1,
    connectStatus: -1,
    search: "",
  },
};

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {
    loadDeviceList: (state, action: PayloadAction<Device[]>) => {
      state.deviceList = action.payload;
    },
    createDevice: (state, action: PayloadAction<Device>) => {
      state.deviceList.push(action.payload);
    },
    updateDevice: (state, action: PayloadAction<Device>) => {
      state.edit = action.payload;
    },
    resetEdit: (state) => {
      state.edit = initialState.edit;
    },
    filterDevice: (state, action: PayloadAction<FilterParams>) => {
      state.fitler = action.payload;
    },
  },
});

export const {
  createDevice,
  loadDeviceList,
  updateDevice,
  resetEdit,
  filterDevice,
} = deviceSlice.actions;

export default deviceSlice.reducer;
