export interface Numbers {
  id: string;
  customerName?: string;
  serviceName?: string;
  createdDate: string;
  expireDate: string;
  status: number;
  deviceName?: string;
  deviceID?: string;
serviceID?: string;
  customerID?: string;
}

export interface GenerateOrder {
  id: string;
  increase: {
    from: number;
    to: number;
  };
  prefix: number;
  surfix: number;
  isReset: boolean;
}
