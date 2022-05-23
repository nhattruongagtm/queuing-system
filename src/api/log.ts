import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Log } from "../models/log";
import { db } from "./fbConfig";

export interface FilterLog {
  dateFrom: string;
  dateTo: string;
  search: string;
}

export type DataList<T> = T[];
const LOG_DOCS = "logs";

export const createLog = async (log: Log): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const numberRef = collection(db, LOG_DOCS);
    try {
      await addDoc(numberRef, { ...log });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
export const loadLogList = (): Promise<Log[]> => {
  let rs: Log[] = [];
  return new Promise(async (resolve, reject) => {
    try {
      const numberRef = await getDocs(collection(db, LOG_DOCS));

      numberRef.forEach(async (doc) => {
        if (doc.exists()) {
          const data = doc.data() as Log;

          rs.push({
            ...data,
            id: doc.id,
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

export const filterLogList = (params: FilterLog, list: DataList<Log>) => {
  const { dateFrom, dateTo, search } = params;
  let rs = [...list];

  if (search) {
    if (search.trim() !== "") {
      rs = rs.filter((item) => item.username.toString().indexOf(search) !== -1);
    }
  }
  if (dateFrom !== "" && dateTo !== "") {
    const before = new Date(dateFrom.split(" ")[1]);
    const after = new Date(dateTo.split(" ")[1]);

    if (before > after) {
      alert("Hai ngày không hợp lệ!");
    } else {
      rs = rs.filter((item) => {
        const createdDate = new Date(item.dateTime.split(" ")[0]);
        return createdDate >= before && createdDate <= after;
      });
    }
  }
  return rs;
};
