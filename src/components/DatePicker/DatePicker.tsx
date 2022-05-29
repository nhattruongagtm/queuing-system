import React, { useEffect, useState } from "react";
import { DatePicker as DateTime } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateDate } from "../../slice/dashboardSlice";
export interface IDatePicker {
  top?: number;
  left?: number;
  onGetDate: (date: DateTime) => void;
  isOpen?: boolean;
  onGetWeek?: (days: DateType[]) => void;
}
export interface DateTime {
  day: number;
  month: number;
  year: number;
}

const monthRefs = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Opt",
  "Nov",
  "Dec",
];

interface OtherTime {
  prev: number;
  next: number;
}

enum DateEnumType {
  NOW = 0,
  BEFORE = -1,
  AFTER = 1,
}

export interface DateType {
  type: DateEnumType;
  value: number;
}

const DatePicker = ({ isOpen, onGetDate, onGetWeek }: IDatePicker) => {
  // const [dateTime, setDateTime] = useState<IDatePicker>({
  //   day: new Date().getDate(),
  //   month: new Date().getMonth() + 1,
  //   year: new Date().getFullYear(),
  // });

  const mapMonth = (month: number) => {
    return monthRefs[month - 1];
  };

  const [option, setOptions] = useState<number>(0);

  const dispatch = useDispatch();

  const handleGetRadio = (value: number) => {
    value !== option && setOptions(value);
  };

  const [dateTimeList, setDateTimeList] = useState<DateType[]>([]);

  const getDaysOfMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const [dateTime, setDateTime] = useState<DateTime>(() => {
    const dateNow = new Date();

    const month = dateNow.getMonth() + 1;

    const year = dateNow.getFullYear();

    const day = dateNow.getDate();

    return {
      day,
      month,
      year,
    };
  });

  const prevDay = getDaysOfMonth(dateTime.year, dateTime.month - 1);

  const [prevDate, setPrevDate] = useState<OtherTime>(() => {
    const prevDate = new Date(
      dateTime.year,
      dateTime.month - 1,
      prevDay
    ).getDay();

    const nextDate = new Date(
      getDaysOfMonth(dateTime.year, dateTime.month)
    ).getDay();

    return {
      prev: prevDate + 1,
      next: 7 - nextDate,
    };
  });

  useEffect(() => {
    const prevClone = { ...dateTime };
    const nextClone = { ...dateTime };
    if (prevClone.month > 1) {
      prevClone.month = prevClone.month - 1;
    } else {
      prevClone.month = 12;
      prevClone.year = prevClone.year - 1;
    }
    // if (nextClone.month > 11) {
    //   nextClone.month = 1;
    //   nextClone.year = nextClone.year + 1;
    // } else {
    //   nextClone.month = nextClone.month + 1;
    // }

    const prevDate =
      new Date(prevClone.year, prevClone.month - 1, prevDay).getDay() + 1;

    const nextDate = new Date(
      nextClone.year,
      nextClone.month - 1,
      getDaysOfMonth(nextClone.year, nextClone.month)
    ).getDay();

    setPrevDate({ prev: prevDate, next: nextDate > 0 ? 7 - nextDate : 0 });
  }, [dateTime]);

  const getDateFromPrevDate = () => {
    const rs = [];
    for (let i = prevDay; i > prevDay - prevDate.prev + 1; i--) {
      rs.push(i);
    }

    return rs.reverse();
  };

  const handleChangeMonth = (type: -1 | 1) => {
    switch (type) {
      case -1:
        if (dateTime.month > 1) {
          dispatch(updateDate({ ...dateTime, month: dateTime.month - 1 }));
          setDateTime({ ...dateTime, month: dateTime.month - 1 });
        } else {
          dispatch(
            updateDate({ ...dateTime, month: 12, year: dateTime.year - 1 })
          );
          setDateTime({ ...dateTime, month: 12, year: dateTime.year - 1 });
        }
        break;
      case 1:
        if (dateTime.month > 11) {
          dispatch(
            updateDate({ ...dateTime, month: 1, year: dateTime.year + 1 })
          );
          setDateTime({ ...dateTime, month: 1, year: dateTime.year + 1 });
        } else {
          dispatch(updateDate({ ...dateTime, month: dateTime.month + 1 }));
          setDateTime({ ...dateTime, month: dateTime.month + 1 });
        }
        break;
      default:
        return dateTime;
    }
  };

  const handleChooseDate = (index: number) => {
    onGetDate({ ...dateTime, day: index });
    setDateTime({ ...dateTime, day: index });
  };
  const isSameDate = (day: number) => {
    return (
      new Date().getFullYear() === dateTime.year &&
      new Date().getMonth() + 1 === dateTime.month &&
      new Date().getDate() === day
    );
  };

  useEffect(() => {
    let dateList: DateType[] = [];
    const prevList = getDateFromPrevDate().map((item) => {
      return {
        type: DateEnumType.BEFORE,
        value: item,
      };
    });
    dateList = [...dateList, ...prevList];

    const daysOfMonth = getDaysOfMonth(dateTime.year, dateTime.month);

    const nowList = Array.from(new Array(daysOfMonth)).map((item, index) => {
      return {
        type: DateEnumType.NOW,
        value: index + 1,
      };
    });

    dateList = [...dateList, ...nowList];

    const nextList = Array.from(new Array(prevDate.next)).map(
      (number, index) => {
        return {
          type: DateEnumType.AFTER,
          value: index + 1,
        };
      }
    );

    dateList = [...dateList, ...nextList];

    setDateTimeList(dateList);
  }, [dateTime, prevDate]);

  const handleGetWeek = (days: DateType[]) => {
    if (option === 1) {
      onGetWeek && onGetWeek(days);
    } else {
      onGetWeek && onGetWeek(dateTimeList);
    }
  };

  const renderDateList = () => {
    let content = [];
    let count = 7;
    for (let i = 0; i < Math.ceil(dateTimeList.length / 7); i++) {
      content.push(
        <tr
          className={option === 0 ? "date--date" : "date--week"}
          onClick={() => handleGetWeek(dateTimeList.slice(i * 7, i * 7 + 7))}
        >
          {dateTimeList.slice(i * 7, count).map((item, index) => (
            <td
              key={index}
              onClick={() => handleChooseDate(item.value)}
              className={`${
                item.type !== DateEnumType.NOW ? "date--none" : ""
              } ${
                index === dateTimeList.slice(i * 7, count).length - 1 ||
                index === 0
                  ? "active"
                  : ""
              } `}
            >
              <div
                className={`item__date ${
                  item.type !== DateEnumType.NOW ? "other" : ""
                } ${
                  item.value === dateTime.day &&
                  new Date().getMonth() + 1 === dateTime.month
                    ? "active"
                    : ""
                }`}
              >
                {item.value}
              </div>
            </td>
          ))}
        </tr>
      );
      count += 7;
    }
    return content;
  };
  return (
    <div className="date__picker shadow">
      <div className="date__picker__header">
        <span className="date--prev">
          <LeftOutlined onClick={() => handleChangeMonth(-1)} />
        </span>
        <span className="date--choosed">
          {" "}
          {dateTime.day} {mapMonth(dateTime.month)} {dateTime.year}
        </span>
        <span className="date--next">
          <RightOutlined onClick={() => handleChangeMonth(1)} />
        </span>
      </div>
      <table className="date__picker__main">
        <thead>
          <tr>
            <td>
              <div className="item__date">Mo</div>
            </td>
            <td>
              <div className="item__date">Tu</div>
            </td>
            <td>
              <div className="item__date">We</div>
            </td>
            <td>
              <div className="item__date">Th</div>
            </td>
            <td>
              <div className="item__date">Fr</div>
            </td>
            <td>
              <div className="item__date">Sa</div>
            </td>
            <td>
              <div className="item__date">Su</div>
            </td>
          </tr>
        </thead>
        <tbody>{renderDateList()}</tbody>
      </table>
    </div>
  );
};

export default DatePicker;
