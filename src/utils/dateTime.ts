// format: yyyy-mm-dd hh:mm:ss
export const formatDateTime = (dateTime: string, delimiter: string = " ") => {
  let rs = "";
  const dts = dateTime.split(delimiter);
  const date = dts[0];
  const time = dts[1];

  rs += time.slice(0, 5) + " - ";
  rs += date.replaceAll("-", "/").split("/").reverse().join("/");

  return rs;
};

const isLessThan = (number: number, compare: number) => {
  if (number < compare) {
    return true;
  }
  return false;
};
const convert = (number: number, split: string) => {
  let rs = "";
  if (isLessThan(number, 10)) {
    rs += `0${number}${split}`;
  } else {
    rs += `${number}${split}`;
  }
  return rs;
};

export const getNow = () => {
  return {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
};

export const getDaysOfMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};
