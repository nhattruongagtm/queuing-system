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
