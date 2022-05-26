import axiosClient from "./axiosClient";

export const mailApi = {
  sendMail: (email: string): Promise<string> => {
    const url = `/mail/${email}`;
    return axiosClient.post(url);
  },
};
