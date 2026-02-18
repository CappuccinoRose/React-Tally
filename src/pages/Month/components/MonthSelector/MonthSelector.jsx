import React from "react";
import { DatePicker } from "antd-mobile";
import classNames from "classnames";
import "./MonthSelector.css";
// 引入格式化函数
import { formatMonth } from "@/utils";

/**
 * 月份选择器
 * @param {string} currentDate - 当前选中日期 "YYYY-MM"
 * @param {boolean} visible - 弹窗显示状态
 * @param {function} onConfirm - 确认回调
 * @param {function} onClose - 关闭回调
 */
function MonthSelector({ currentDate, visible, onConfirm, onClose }) {
  const handleConfirm = (date) => {
    onConfirm?.(formatMonth(date));
  };

  return (
    <>
      <div className="monthSelector" onClick={() => onClose?.(true)}>
        <span className="text">{currentDate} 账单</span>
        <span className={classNames("arrow", { expand: visible })} />
      </div>

      <DatePicker
        className="kaDate"
        title="记账日期"
        precision="month"
        visible={visible}
        onConfirm={handleConfirm}
        onClose={() => onClose?.(false)}
        max={new Date()}
      />
    </>
  );
}

export default MonthSelector;
