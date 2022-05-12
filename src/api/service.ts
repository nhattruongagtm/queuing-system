import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Service } from "../models/services";
import { FilterService } from "../slice/serviceSlice";
import { db } from "./fbConfig";

export interface FilterParams {
  activeStatus: number;
  connectStatus: number;
  search: string;
}

export type DataList<T> = T[];
const SERVICE_DOCS = "services";
const randomServiceList = () => {
  const serviceList = [
    "Khám tim mạch",
    "Khám Sản - Phụ khoa",
    "Khám răng hàm mặt, tai mũi họng",
    "Khám hô hấp",
    "Khám tổng quát",
  ];
  const randomNumber = Math.floor(Math.random() * serviceList.length);
  const rs = serviceList.slice(0, randomNumber);
  if (rs.length === 0) {
    return [serviceList[0]];
  }
  return rs;
};

export const checkService = (id: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceRef = await getDoc(doc(db, SERVICE_DOCS, id));

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
export const createService = async (service: Service): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    checkService(service.id).then(async (res) => {
      if (res) {
        resolve(false);
      }
      const serviceRef = doc(db, SERVICE_DOCS, service.id);
      try {
        await setDoc(serviceRef, service);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  });
};
export const loadServiceList = (): Promise<Service[]> => {
  let rs: Service[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      const serviceRef = await getDocs(collection(db, SERVICE_DOCS));

      serviceRef.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data() as Service;

          rs.push({
            ...data,
            id: doc.id,
          });
        }
        if (rs.length === serviceRef.size) {
          resolve(rs);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const createDummyService = (amount: number) => {
  Array.from(new Array(amount)).forEach((item, index) => {
    const status = [0, 1];
    const isReset = [true, false];
    const service: Service = {
      id: "KIO_" + (Math.floor(Math.random() * 9000) + index),
      name: "Kiosk",
      desc: `Mô tả dịch vụ ${index + 1}`,
      status: status[Math.floor(Math.random() * 2)],
      increase: {
        from: Math.floor(Math.random() * 100),
        to: Math.floor(Math.random() * 1000) + 100,
      },
      isReset: isReset[Math.floor(Math.random() * 2)],
      prefix: Math.floor(Math.random() * 100),
      surfix: Math.floor(Math.random() * 100),
      createdDate: `2022-${Math.floor(Math.random() * 12) + 1}-${
        Math.floor(Math.random() * 31) + 1
      }`,
    };
    createService(service);
  });
};
export const getServiceById = (id: string): Promise<Service | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceRef = await getDoc(doc(db, SERVICE_DOCS, id));

      if (serviceRef.exists()) {
        resolve(serviceRef.data() as Service);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const updateService = (service: Service): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const serviceRef = await getDoc(doc(db, SERVICE_DOCS, service.id));
      const deviceRefs = doc(db, SERVICE_DOCS, service.id);

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
export const filterServiceList = (
  params: FilterService,
  list: DataList<Service>
) => {
  const { dateFrom, dateTo, search, status } = params;
  let rs = [...list];
  if (status !== -1) {
    rs = rs.filter((item) => item.status === status);
  }
  if (search) {
    if (search.trim() !== "") {
      rs = rs.filter((item) => item.id.indexOf(search) !== -1);
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
  return rs;
};
