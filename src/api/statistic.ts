import { collection, getDocs, query, where } from "firebase/firestore";
import { Statistic, StatisticDevice } from "../models/statistic";
import { DEVICE_DOCS } from "./device";
import { db } from "./fbConfig";
import { NUMBERS_DOCS } from "./numbers";

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
  type: number = -1
): Promise<StatisticDevice> => {
  return new Promise(async (resolve, reject) => {
    let q;
    const deviceRef = collection(db, DEVICE_DOCS);
    const condition = `${new Date().getFullYear()}-${month}`;
    q = query(deviceRef, where("createdDate", ">=", condition));

    try {
      const queryRef = await getDocs(q);
      // queryRef.forEach((doc) => {

      // });
    } catch (error) {
      console.log(error);
    }
  });
};
