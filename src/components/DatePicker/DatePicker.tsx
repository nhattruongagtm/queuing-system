import React from "react";
import { DatePicker as DateTime } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
type Props = {};

const DatePicker = (props: Props) => {
  return (
    <div className="date__picker shadow">
      <div className="date__picker__header">
        <span className="date--prev">
          <LeftOutlined />
        </span>
        <span className="date--choosed"> 19 Nov 2021</span>
        <span className="date--next">
          <RightOutlined />
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
        <tbody>
          <tr>
            <td>
              <div className="item__date">27</div>
            </td>
            <td>
              <div className="item__date">28</div>
            </td>
            <td>
              <div className="item__date">29</div>
            </td>
            <td>
              <div className="item__date">30</div>
            </td>
            <td>
              <div className="item__date">1</div>
            </td>
            <td>
              <div className="item__date">2</div>
            </td>
            <td>
              <div className="item__date">3</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="item__date">4</div>
            </td>
            <td>
              <div className="item__date">5</div>
            </td>
            <td>
              <div className="item__date">6</div>
            </td>
            <td>
              <div className="item__date">7</div>
            </td>
            <td>
              <div className="item__date">8</div>
            </td>
            <td>
              <div className="item__date">9</div>
            </td>
            <td>
              <div className="item__date">10</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="item__date">11</div>
            </td>
            <td>
              <div className="item__date">12</div>
            </td>
            <td>
              <div className="item__date">13</div>
            </td>
            <td>
              <div className="item__date">14</div>
            </td>
            <td>
              <div className="item__date">15</div>
            </td>
            <td>
              <div className="item__date">16</div>
            </td>
            <td>
              <div className="item__date">17</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="item__date">18</div>
            </td>
            <td>
              <div className="item__date">19</div>
            </td>
            <td>
              <div className="item__date">20</div>
            </td>
            <td>
              <div className="item__date">21</div>
            </td>
            <td>
              <div className="item__date">22</div>
            </td>
            <td>
              <div className="item__date">23</div>
            </td>
            <td>
              <div className="item__date">24</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="item__date">25</div>
            </td>
            <td>
              <div className="item__date">26</div>
            </td>
            <td>
              <div className="item__date active">27</div>
            </td>
            <td>
              <div className="item__date">28</div>
            </td>
            <td>
              <div className="item__date">29</div>
            </td>
            <td>
              <div className="item__date">30</div>
            </td>
            <td>
              <div className="item__date">31</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DatePicker;
