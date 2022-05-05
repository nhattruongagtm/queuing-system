import { getDocs, collection } from "firebase/firestore";
import { Login } from "../models/user";
import { db } from "./fbConfig";
import md5 from "md5";
import { rejects } from "assert";
const USER_DOCS = "users";

export const login = (u: string, p: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = await getDocs(collection(db, USER_DOCS));
      userRef.forEach((doc) => {
        const data = doc.data();
        const { password, username } = data as Login;
        if (username === u && password === md5(p)) {
          resolve(true);
        }
      });
      resolve(false)
    } catch (error) {
      reject(false);
    }
  });
};
