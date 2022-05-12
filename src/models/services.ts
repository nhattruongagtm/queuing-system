export interface Service {
  id: string;
  name: string;
  desc: string;
  status: number;
  increase: {
    from: number;
    to: number;
  };
  prefix: number;
  surfix: number;
  isReset: boolean;
  createdDate: string;
}
