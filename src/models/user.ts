export interface User {
  id: number;
  username: string;
  time: string;
  ip: string;
  formal: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface UserAccount {
  id: string;
  username: string;
  password: string;
  email: string;
  token: string;
  createdToken: number;
  expiredToken: number;
  fullName: string;
}
