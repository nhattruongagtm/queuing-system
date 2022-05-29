import { collection, getDocs, query, where } from "firebase/firestore";
import { resolve } from "path/posix";
import { Device } from "../models/device";
import { Numbers } from "../models/numbers";
import { Service } from "../models/services";
import { ChartData, Statistic, StatisticDevice } from "../models/statistic";
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
  month: number
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

export const getNumbersToday = async (
  day: number,
  month: number = new Date().getMonth() + 1,
  year: number = new Date().getFullYear()
): Promise<ChartData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const dateString = `${year}-${month}-${day}`;
      const rs: ChartData = {
        date: dateString,
        value: 0,
      };
      const userRef = await getDocs(collection(db, NUMBERS_DOCS));
      let count = 0;
      userRef.forEach((doc) => {
        count++;
        const data = doc.data() as Numbers;

        const createdDate = data.createdDate.split(" ")[0];

        if (rs.date === createdDate) {
          rs.value++;
        }

        if (count === userRef.size) {
          resolve(rs);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getNumberByDay = async (
  year: number,
  month: number
): Promise<ChartData[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let rs: ChartData[] = [];
      const numberOfMonth = new Date(year, month, 0).getDate();
      for (let i = 1; i <= numberOfMonth; i++) {
        const item = await getNumbersToday(i, month, year);
        rs.push(item);
      }
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
};

export const getNumberByWeek = async (
  year: number,
  month: number
): Promise<ChartData[]> => {
  return new Promise((resolve, reject) => {
    try {
      let rs: ChartData[] = [];
      const numberOfMonth = new Date(year, month, 0).getDate();
      let count = 0;

      const months = Array.from(new Array(numberOfMonth));
      for (let i = 0; i < months.length; i++) {
        months[i] = i + 1;
      }
      for (let i = 0; i < 4; i++) {
        const date = "Tuần " + (i + 1);
        const item: ChartData = {
          date,
          value: 0,
        };
        console.log(i)
        months.slice(count, count + 8).forEach(async (i, index) => {
          const value = (await getNumbersToday(i, month, year)).value;
          item.value += value;
        });
        rs.push(item);
        count += 8;

        console.log("w",rs)
      }
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
};

export const getNumbersByMonth = (
  year: number,
  month: number
): Promise<ChartData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const dateString = `${year}-${month}`;
      const numberRef = await getDocs(collection(db, NUMBERS_DOCS));
      const rs: ChartData = {
        date: month + "",
        value: 0,
      };
      let count = 0;
      numberRef.forEach(async (doc) => {
        count++;
        const data = doc.data() as Numbers;
        const createdDate = data.createdDate.split(" ")[0];
        if (createdDate.indexOf(dateString) !== -1) {
          const value = await getNumberByDay(year, month);
          value.forEach((item) => {
            rs.value += item.value;

            if (count === numberRef.size) {
              resolve(rs);
            }
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getNumberByYear = (year: number): Promise<ChartData[]> => {
  return new Promise(async (resolve, reject) => {
    const months = Array.from(new Array(12));
    for (let i = 0; i < months.length; i++) {
      months[i] = i + 1;
    }
    let count = 0;
    let rs: ChartData[] = [];
    for (let i = 0; i < months.length; i++) {
      count++;
      const monthValue = await getNumbersByMonth(year, months[i]);
      const item: ChartData = {
        date: months[i],
        value: monthValue.value,
      };
      rs.push(item);

      console.log(count, months.length);
      if (count === months.length) {
        const sort = rs.sort((a, b) => Number(a.date) - Number(b.date));
        console.log("rs", sort);
        resolve(sort);
      }
    }
    try {
    } catch (error) {
      reject(error);
    }
  });
};
