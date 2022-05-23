import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "../models/device";
import { Role } from "../models/role";
import { Service } from "../models/services";
import { FilterNumber } from "../pages/NumberProvidation/NumberProvidation";

export interface FilterRole {
  search: string;
}
interface RoleSlice {
  roleList: Role[];
  edit: Role;
  filter: FilterRole;
}

const initialState: RoleSlice = {
  roleList: [],
  edit: {
    desc: "",
    id: "",
    name: "",
  },
  filter: {
    search: "",
  },
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    loadRoleList: (state, action: PayloadAction<Role[]>) => {
      state.roleList = action.payload;
    },
    createRole: (state, action: PayloadAction<Role>) => {
      state.roleList.push(action.payload);
    },
    updateRole: (state, action: PayloadAction<Role>) => {
      state.edit = action.payload;
    },
    resetEditRole: (state) => {
      state.edit = initialState.edit;
    },
    filterRole: (state, action: PayloadAction<FilterRole>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  createRole,
  filterRole,
  loadRoleList,
  resetEditRole,
  updateRole,
} = roleSlice.actions;

export default roleSlice.reducer;
