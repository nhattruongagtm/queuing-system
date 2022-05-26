import {
  getDocs,
  collection,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { Login, User, UserAccount } from "../models/user";
import { db } from "./fbConfig";
import md5 from "md5";
import { rejects } from "assert";
const USER_DOCS = "users";

export const login = (u: string, p: string): Promise<UserAccount | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = await getDocs(collection(db, USER_DOCS));
      userRef.forEach((doc) => {
        const data = doc.data() as UserAccount;
        const { password, username } = data ;
        if (username === u && password === md5(p)) {
          const user: UserAccount = {
            ...data,
            id: doc.id,
          }
          resolve(user);
        }
      });
      resolve(null);
    } catch (error) {
      reject(false);
    }
  });
};

export const getUserByEmail = (mail: string): Promise<UserAccount> => {
  return new Promise(async (resolve, reject) => {
    const user: UserAccount = {
      id: "",
      username: "",
      password: "",
      createdToken: 0,
      email: "",
      expiredToken: 0,
      token: "",
      fullName: "",
    };
    try {
      const userRef = await getDocs(collection(db, USER_DOCS));
      userRef.forEach((doc) => {
        const data = doc.data() as UserAccount;
        const { email } = data;
        if (mail === email) {
          resolve({
            ...data,
            id: doc.id,
          });
        }
      });
      resolve(user);
    } catch (error) {
      reject(false);
    }
  });
};

export const updateUser = async (user: UserAccount): Promise<boolean> => {
  const userRef = doc(db, USER_DOCS, user.id);
  return new Promise(async (resolve, reject) => {
    try {
      await updateDoc(userRef, { ...user });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const checkToken = async (account: UserAccount): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = await getDoc(doc(db, USER_DOCS, account.id));
      if (userRef.exists()) {
        const user = userRef.data() as UserAccount;
        if (
          user.token === account.token &&
          new Date().getTime() < user.expiredToken
        ) {
          console.log(true);
          resolve(true);
        }
      } else {
        console.log(false);
        resolve(false);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const getUserByToken = async (token: string): Promise<UserAccount> => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = await getDocs(collection(db, USER_DOCS));

      userRef.forEach((doc) => {
        if (doc.exists()) {
          const user = doc.data() as UserAccount;

          if (user.token === token) {
            resolve({
              ...user,
              id: doc.id,
            });
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
