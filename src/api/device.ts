import Password from "antd/lib/input/Password";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Device } from "../models/device";
import { db } from "./fbConfig";

export interface FilterParams {
  activeStatus: number;
  connectStatus: number;
  search: string;
}
export type DataList<T> = T[];
export const DEVICE_DOCS = "devices";
const randomDeviceList = () => {
  const deviceList = [
    "Khám tim mạch",
    "Khám Sản - Phụ khoa",
    "Khám răng hàm mặt, tai mũi họng",
    "Khám hô hấp",
    "Khám tổng quát",
  ];
  const randomNumber = Math.floor(Math.random() * deviceList.length);
  const rs = deviceList.slice(0, randomNumber);
  if (rs.length === 0) {
    return [deviceList[0]];
  }
  return rs;
};

export const checkDevice = (id: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const deviceRef = await getDoc(doc(db, DEVICE_DOCS, id));

      if (deviceRef.exists()) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const createDevice = async (device: Device): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    checkDevice(device.id).then(async (res) => {
      if (res) {
        resolve(false);
      }
      const deviceRef = doc(db, DEVICE_DOCS, device.id);
      try {
        await setDoc(deviceRef, device);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  });
};
export const loadDeviceList = (): Promise<Device[]> => {
  let rs: Device[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      const deviceRef = await getDocs(collection(db, DEVICE_DOCS));

      deviceRef.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data() as Device;

          rs.push({
            ...data,
            id: doc.id,
          });
        }
        if (rs.length === deviceRef.size) {
          resolve(rs);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const createDummyData = (amount: number) => {
  Array.from(new Array(amount)).forEach((item, index) => {
    const status = [0, 1];
    const device: Device = {
      id: "KIO_" + (Math.floor(Math.random() * 9000) + index),
      name: "Kiosk",
      ip: `192.168.1.${Math.floor(Math.random() * 10)}`,
      activeStatus: status[Math.floor(Math.random() * 2)],
      connectStatus: status[Math.floor(Math.random() * 2)],
      usedDevice: randomDeviceList(),
      username: "nhatturongagtm",
      password: "123456789",
      type: "Kiosk",
      createdDate: new Date().toISOString().slice(0,10),
    };
    createDevice(device);
  });
};
export const getDeviceById = (id: string): Promise<Device | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const deviceRef = await getDoc(doc(db, DEVICE_DOCS, id));

      if (deviceRef.exists()) {
        resolve(deviceRef.data() as Device);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const updateDevice = (device: Device): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const deviceRef = await getDoc(doc(db, DEVICE_DOCS, device.id));
      const deviceRefs = doc(db, DEVICE_DOCS, device.id);

      if (deviceRef.exists()) {
        await updateDoc(deviceRefs, { ...device });
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const filter = (params: FilterParams, list: DataList<Device>) => {
  const { activeStatus, connectStatus, search } = params;
  console.log(params);
  let rs = [...list];
  if (activeStatus && activeStatus !== -1) {
    rs = rs.filter((item) => item.activeStatus === activeStatus);
  }
  if (connectStatus && connectStatus !== -1) {
    rs = rs.filter((item) => item.connectStatus === connectStatus);
  }
  if (search) {
    if (search.trim() === "") {
      return rs;
    }
    return rs.filter((item) => item.id.indexOf(search) !== -1);
  }
  return rs;
};
