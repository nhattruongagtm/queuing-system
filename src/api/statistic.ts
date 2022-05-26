import { collection, getDocs, query, where } from "firebase/firestore";
import { Device } from "../models/device";
import { Numbers } from "../models/numbers";
import { Service } from "../models/services";
import { Statistic, StatisticDevice } from "../models/statistic";
import { DEVICE_DOCS } from "./device";
import { db } from "./fbConfig";
import { NUMBERS_DOCS } from "./numbers";
import { SERVICE_DOCS } from "./service";

const getStatus = (a: number, b: number) => {
  if (a - b > 0) {
    return 1;
  }
  return -1;
};
const getFluctual = (a: number, b: number) => {
  return ((a - b) / 5) * 100;
};
export const getStatisticsByNumbers = (): Promise<Statistic> => {
  return new Promise(async (resolve, reject) => {
    try {
      const lastMonth = new Date().getMonth();
      const month = new Date().getMonth() + 1;

      const allLastValue = await getNumberProvidationByMonth(lastMonth, -1);
      const usedLastValue = await getNumberProvidationByMonth(lastMonth, 0);
      const unusedLastValue = await getNumberProvidationByMonth(lastMonth, 1);
      const skipLastValue = await getNumberProvidationByMonth(lastMonth, 2);
      const allValue = await getNumberProvidationByMonth(month, -1);
      const usedValue = await getNumberProvidationByMonth(month, 0);
      const unusedValue = await getNumberProvidationByMonth(month, 1);
      const skipValue = await getNumberProvidationByMonth(month, 2);

      const rs: Statistic = {
        total: {
          amount: getFluctual(allValue, allLastValue),
          value: allValue,
          status: getStatus(allValue, allLastValue),
        },
        used: {
          amount: getFluctual(usedValue, usedLastValue),
          value: usedValue,
          status: getStatus(usedValue, usedLastValue),
        },
        unused: {
          amount: getFluctual(unusedValue, unusedLastValue),
          value: unusedValue,
          status: getStatus(unusedValue, unusedLastValue),
        },
        skiped: {
          amount: getFluctual(skipValue, skipLastValue),
          value: skipValue,
          status: getStatus(skipValue, skipLastValue),
        },
      };
      resolve(rs);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};

export const getNumberProvidationByMonth = (
  month: number,
  type: number = -1
): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      let q;
      const yearNow = new Date().getFullYear();
      const condition = `${yearNow}-${month}`;
      if (type !== -1) {
        q = query(
          collection(db, NUMBERS_DOCS),
          where("status", "==", type),
          where("createdDate", ">", condition)
        );
      } else {
        q = query(
          collection(db, NUMBERS_DOCS),
          where("createdDate", ">", condition)
        );
      }
      const numberRef = await getDocs(q);

      resolve(numberRef.size);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};

export const getDevicesByMonth = async (
  month: number,
  type: number = 0
): Promise<StatisticDevice> => {
  return new Promise(async (resolve, reject) => {
    let q;
    let lastQ;
    let activeCount = 0;
    let inactiveCount = 0;
    const docs =
      type === 0
        ? `${DEVICE_DOCS}`
        : type === 1
        ? `${SERVICE_DOCS}`
        : `${NUMBERS_DOCS}`;
    const deviceRef = collection(db, docs);
    const condition = `${new Date().getFullYear()}-${month}`;
    // q = query(deviceRef, where("createdDate", ">=", condition));
    lastQ = query(deviceRef, where("createdDate", ">=", condition));

    try {
      const queryRef = await getDocs(deviceRef);
      const lastMonth = await getDocs(lastQ);
      queryRef.forEach((doc) => {
        const data = doc.data() as Device;
        switch (data.activeStatus) {
          case 0:
            activeCount++;
            break;
          case 1:
            inactiveCount++;
            break;
        }
      });
      const resp: StatisticDevice = {
        total: queryRef.size,
        amount: ((queryRef.size - lastMonth.size) / lastMonth.size) * 100,
        active: activeCount,
        inactive: inactiveCount,
      };
      resolve(resp);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};
export const getServiceByMonth = async (
  month: number
): Promise<StatisticDevice> => {
  return new Promise(async (resolve, reject) => {
    let q;
    let lastQ;
    let activeCount = 0;
    let inactiveCount = 0;
   
    const deviceRef = collection(db, SERVICE_DOCS);
    const condition = `${new Date().getFullYear()}-${month}`;
    // q = query(deviceRef, where("createdDate", ">=", condition));
    lastQ = query(deviceRef, where("createdDate", ">=", condition));

    try {
      const queryRef = await getDocs(deviceRef);
      const lastMonth = await getDocs(lastQ);
      queryRef.forEach((doc) => {
        const data = doc.data() as Service;
        switch (data.status) {
          case 0:
            activeCount++;
            break;
          case 1:
            inactiveCount++;
            break;
        }
      });
      const resp: StatisticDevice = {
        total: queryRef.size,
        amount: ((queryRef.size - lastMonth.size) / lastMonth.size) * 100,
        active: activeCount,
        inactive: inactiveCount,
      };
      resolve(resp);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};
export const getNumberByMonth = async (
  month: number,
): Promise<StatisticDevice> => {
  return new Promise(async (resolve, reject) => {
    let q;
    let lastQ;
    let activeCount = 0;
    let inactiveCount = 0;
    let skip = 0;
    const deviceRef = collection(db, NUMBERS_DOCS);
    const condition = `${new Date().getFullYear()}-${month}`;
    // q = query(deviceRef, where("createdDate", ">=", condition));
    lastQ = query(deviceRef, where("createdDate", ">=", condition));

    try {
      const queryRef = await getDocs(deviceRef);
      const lastMonth = await getDocs(lastQ);
      queryRef.forEach((doc) => {
        const data = doc.data() as Numbers;
        switch (data.status) {
          case 0:
            activeCount++;
            break;
          case 1:
            inactiveCount++;
            break;
          case 2:
            skip++;
            break;
        }
      });
      const resp: StatisticDevice = {
        total: queryRef.size,
        amount: ((queryRef.size - lastMonth.size) / lastMonth.size) * 100,
        active: activeCount,
        inactive: inactiveCount,
        skip,
      };
      resolve(resp);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};
