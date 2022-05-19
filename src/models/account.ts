export interface Account {
  id: string;
  username: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  roleName?: string;
  status: number;
  password: string;
  rePassword: string;
}
