import React from "react";
import { ACCESS_TOKEN } from "../constant/token";
import { UserAccount } from "../models/user";

const useUser = () => {
  const user = localStorage.getItem(ACCESS_TOKEN)
    ? (JSON.parse(localStorage.getItem(ACCESS_TOKEN) as string) as UserAccount)
    : null;
  return [user];
};

export default useUser;
