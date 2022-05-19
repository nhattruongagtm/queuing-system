import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Role, RoleGroup, RoleItem } from "../models/role";
import { FilterRole } from "../slice/roleSlice";
import { DataList } from "./device";
import { db } from "./fbConfig";
const ROLE_DOCS = "roles";
export const loadRoleList = (): Promise<Role[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let rs: Role[] = [];
      const roleRef = await getDocs(collection(db, ROLE_DOCS));

      roleRef.forEach((doc) => {
        const data = doc.data() as Role;

        rs.push({ ...data, id: doc.id +""});

        if (rs.length === roleRef.size) {
          resolve(rs);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const loadRoleByID = () => {};
export const createRole = async (role: Role) => {
  try {
    await addDoc(collection(db, ROLE_DOCS), role);
  } catch (error) {
    console.log(error);
  }
};

export const updateRole = (role: Role) => {
  try {
    const roleRef = doc(db, ROLE_DOCS, role.id + "");
    updateDoc(roleRef, { ...role });
  } catch (error) {
    console.log(error);
  }
};

export const getRoleGroup = async (): Promise<RoleGroup[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let rs: RoleGroup[] = [];
      for (let i = 0; i < 3; i++) {
        const roleRef = await getDocs(
          query(collection(db, "roleGroups"), where("id", "==", `${i + 1}`))
        );
        const roles: RoleGroup = {
          id: "",
          roles: [],
        };
        roleRef.forEach((doc) => {
          const data = doc.data() as RoleItem;
          roles.id = i + 1 + "";
          roles.roles = [...roles.roles, { ...data, id: doc.id }];
        });

        rs.push(roles);

        if (rs.length === 3) {
          resolve(rs);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const filterRoletList = (params: FilterRole, list: DataList<Role>) => {
  const { search } = params;
  let rs = [...list];
  if (search) {
    if (search.trim() !== "") {
      rs = rs.filter((item) => item.name.toString().indexOf(search) !== -1);
    }
  }

  return rs;
};
