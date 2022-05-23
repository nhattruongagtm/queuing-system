import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Account } from "../models/account";
import { FilterAccount } from "../slice/accountSlice";
import { DataList } from "./device";
import { db } from "./fbConfig";
const ACCOUNT_DOCS = "accounts";

export const createAccount = async (account: Account) => {
  const accountRref = collection(db, ACCOUNT_DOCS);

  try {
    await addDoc(accountRref, account);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const updateAccount = async (account: Account) => {
  const accountRref = doc(db, ACCOUNT_DOCS, account.id + "");

  try {
    await updateDoc(accountRref, { ...account });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const loadAccountList = (): Promise<Account[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let rs: Account[] = [];
      const accountRref = await getDocs(collection(db, ACCOUNT_DOCS));
      accountRref.forEach((doc) => {
        const data = doc.data() as Account;
        rs.push({ ...data, id: doc.id });
        if (rs.length === accountRref.size) {
          resolve(rs);
        }
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};
export const getAccountById = (id: number): Promise<Account> => {
  return new Promise(async (resolve, reject) => {
    try {
      const accountRref = await getDoc(doc(db, ACCOUNT_DOCS, id + ""));
      if (accountRref.exists()) {
        //   TO DO
        const account = accountRref.data() as Account;
        resolve(account);
      } else {
        reject("error");
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const filterAccountList = (
  params: FilterAccount,
  list: DataList<Account>
) => {
  let rs: Account[] = [...list];
  const { search, status } = params;

  if (search.trim() !== "") {
    rs = rs.filter((item) => item.fullName.indexOf(search) !== -1);
  }

  if(status !== -1){
    return rs.filter((item) => (item.status === status));
  }

  return rs;
};
