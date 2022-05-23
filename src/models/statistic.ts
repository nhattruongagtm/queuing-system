export interface Statistic {
  total: StatisticValue;
  used: StatisticValue;
  unused: StatisticValue;
  skiped: StatisticValue;
}

export interface StatisticValue {
  status: number;
  amount: number;
  value: number;
}

export interface StatisticDevice{
  total: number;
  amount: number;
  active: number;
  inactive: number;
}