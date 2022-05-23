import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { GenerateOrder, Numbers } from "../models/numbers";
import { Service } from "../models/services";
import { FilterNumber } from "../pages/NumberProvidation/NumberProvidation";
import { FilterReport } from "../pages/Report/Report";
import { FilterService } from "../slice/serviceSlice";
import { getDeviceById } from "./device";
import { db } from "./fbConfig";
import { getServiceById } from "./service";

export interface FilterParams {
  activeStatus: number;
  connectStatus: number;
  search: string;
}

export type DataList<T> = T[];
export const NUMBERS_DOCS = "numbers";

export const checkNumber = (id: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceRef = await getDoc(doc(db, NUMBERS_DOCS, id));

      if (serviceRef.exists()) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const createNumbers = async (number: Numbers): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    checkNumber(number.id).then(async (res) => {
      if (res) {
        resolve(false);
      }
      const numberRef = doc(db, NUMBERS_DOCS, number.id + "");
      try {
        await setDoc(numberRef, number);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  });
};
export const loadNumberList = (): Promise<Numbers[]> => {
  let rs: Numbers[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      const numberRef = await getDocs(collection(db, NUMBERS_DOCS));

      numberRef.forEach(async (doc) => {
        if (doc.exists()) {
          const data = doc.data() as Numbers;

          const service = await getServiceById(data.serviceID as string);
          const device = await getDeviceById(data.deviceID as string);

          rs.push({
            ...data,
            id: doc.id,
            serviceName: service ? service.name : "",
            deviceName: device ? device.name : "",
            customerName: "Huỳnh Ái Vân",
          });
        }
        if (rs.length === numberRef.size) {
          resolve(rs);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const createDummyNumber = (amount: number) => {
  Array.from(new Array(amount)).forEach((item, index) => {
    const status = [0, 1, 2];
    const number: Numbers = {
      id: Math.floor(Math.random() * 10000) + "",
      status: status[Math.floor(Math.random() * 3)],
      createdDate: `2022-${Math.floor(Math.random() * 12) + 1}-${
        Math.floor(Math.random() * 31) + 1
      } ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      expireDate: `2022-${Math.floor(Math.random() * 12) + 1}-${
        Math.floor(Math.random() * 31) + 1 + 1
      } ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      customerID: "1",
      deviceID: "KIO_1",
      serviceID: "KIO_1",
      deviceName: "",
    };
    createNumbers(number);
  });
};
export const getNumberById = (id: string): Promise<Numbers | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceRef = await getDoc(doc(db, NUMBERS_DOCS, id));

      if (serviceRef.exists()) {
        resolve(serviceRef.data() as Numbers);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const updateNumber = (service: Numbers): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceRef = await getDoc(doc(db, NUMBERS_DOCS, service.id + ""));
      const deviceRefs = doc(db, NUMBERS_DOCS, service.id + "");

      if (serviceRef.exists()) {
        await updateDoc(deviceRefs, { ...service });
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const filterNumberList = (
  params: FilterNumber,
  list: DataList<Numbers>
) => {
  const { dateFrom, dateTo, search, status, deviceID, serviceID } = params;
  let rs = [...list];
  if (status !== -1) {
    rs = rs.filter((item) => item.status === status);
  }
  if (search) {
    if (search.trim() !== "") {
      rs = rs.filter((item) => item.id.toString().indexOf(search) !== -1);
    }
  }
  if (dateFrom !== "" && dateTo !== "") {
    const before = new Date(dateFrom);
    const after = new Date(dateTo);

    if (before > after) {
      alert("Hai ngày không hợp lệ!");
    } else {
      rs = rs.filter((item) => {
        const createdDate = new Date(item.createdDate);
        return createdDate >= before && createdDate <= after;
      });
    }
  }
  if (deviceID !== "" && deviceID !== "-1") {
    rs = rs.filter((item) => item.deviceID === deviceID);
  }
  if (serviceID !== "" && serviceID !== "-1") {
    rs = rs.filter((item) => item.serviceID === serviceID);
  }
  return rs;
};
export const filterReportList = (
  params: FilterReport,
  list: DataList<Numbers>
) => {
  const { dateFrom, dateTo } = params;
  let rs = [...list];

  if (dateFrom !== "" && dateTo !== "") {
    const before = new Date(dateFrom);
    const after = new Date(dateTo);

    if (before > after) {
      alert("Hai ngày không hợp lệ!");
    } else {
      rs = rs.filter((item) => {
        const createdDate = new Date(item.createdDate);
        return createdDate >= before && createdDate <= after;
      });
    }
  }

  return rs;
};
export const getNumberLengthById = (
  id: string,
  date?: string
): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q;
      if (date) {
        q = query(
          collection(db, NUMBERS_DOCS),
          where("serviceID", "==", id),
          where("createdDate", ">=", date.split("-").reverse().join("-"))
        );
      } else {
        q = query(collection(db, NUMBERS_DOCS), where("serviceID", "==", id));
      }
      const serviceRef = await getDocs(q);
      resolve(serviceRef.size);
    } catch (error) {
      reject(error);
    }
  });
};
export const generateOrder = async (input: GenerateOrder) => {
  const { id, increase, isReset, prefix, surfix } = input;
  const order = !isReset
    ? await getNumberLengthById(id)
    : await getNumberLengthById(
        id,
        new Date().toLocaleDateString().replaceAll("/", "-")
      );

  if (order < increase.to && order > increase.from) {
    if (prefix !== 0 && surfix !== 0) {
      return `${prefix}${order + 1}${surfix}`;
    }
    return order + 1 + "";
  }
  return `${prefix + 1}${order + 1}${surfix}`;
};
