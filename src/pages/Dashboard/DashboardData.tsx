import React, { useEffect, useState } from "react";
import { getStatisticsByNumbers } from "../../api/statistic";
import { Statistic } from "../../models/statistic";

type Props = {};

const DashboardData = (props: Props) => {
  const [statistic, setStatistic] = useState<Statistic>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getStatisticsByNumbers()
      .then((res) => {
        setLoading(false);
        console.log(res)
        setStatistic(res);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);
  const Loading = () => (
    <div className="alta-loading">
      <img src="./imgs/loading.svg" alt="" />
    </div>
  );
  return (
    <>
      {!loading ? (
        <div className="dashboard__content__datas">
          {statistic && (
            <>
              <div className="dashboard__content__item">
                <div className="data__item__title">
                  <div className="data__item__icon order">
                    <img src="./imgs/calendar.svg" alt="" />
                  </div>
                  <p>Số thứ tự đã cấp</p>
                </div>
                <div className="data__item__numbers">
                  <p>{statistic.total.value}</p>
                  <span className="tag tag--plus ">
                    <i className="bx bx-up-arrow-alt"></i> 31.24%
                  </span>
                </div>
              </div>
              <div className="dashboard__content__item">
                <div className="data__item__title">
                  <div className="data__item__icon used">
                    <img src="./imgs/complete.svg" alt="" />
                  </div>
                  <p>Số thứ tự đã sử dụng</p>
                </div>
                <div className="data__item__numbers">
                  <p>{statistic.used.value}</p>
                  <span className="tag tag--sub">
                    <i className="bx bx-down-arrow-alt"></i> 31.24%
                  </span>
                </div>
              </div>
              <div className="dashboard__content__item">
                <div className="data__item__title">
                  <div className="data__item__icon waiting">
                    <img src="./imgs/waiting.svg" alt="" />
                  </div>
                  <p>Số thứ tự đang chờ</p>
                </div>
                <div className="data__item__numbers">
                  <p>{statistic.unused.value}</p>
                  <span className="tag tag--plus">
                    <i className="bx bx-up-arrow-alt"></i> 56.41%
                  </span>
                </div>
              </div>
              <div className="dashboard__content__item">
                <div className="data__item__title">
                  <div className="data__item__icon ignore">
                    <img src="./imgs/ignore.svg" alt="" />
                  </div>
                  <p>Số thứ tự đã bỏ qua</p>
                </div>
                <div className="data__item__numbers">
                  <p>{statistic.skiped.value}</p>
                  <span className="tag tag--sub ">
                    <i className="bx bx-down-arrow-alt"></i> 22.41%
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DashboardData;
