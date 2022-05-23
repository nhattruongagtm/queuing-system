export interface Device {
  id: string;
  name: string;
  ip: string;
  activeStatus: number;
  connectStatus: number;
  usedDevice: string[];
  type: string;
  username: string;
  password: string;
  createdDate? : string;
}
