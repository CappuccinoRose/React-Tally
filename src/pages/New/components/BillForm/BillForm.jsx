import React, { useState } from "react";
import { DatePicker } from "antd-mobile";
import Icon from "@/components/Icon";
import { MdOutlineCalendarMonth } from "react-icons/md";
import "./BillForm.css";

// 辅助函数：判断是否是今天
const isToday = (date) => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate();
};

// 辅助函数：格式化显示日期
const formatDisplayDate = (date) => {
  if (isToday(date)) return "今天";
  return `${date.getMonth() + 1}月${date.getDate()}日`;
};

function BillForm({ type, setType, date, setDate, amount, setAmount }) {
  // 控制日期选择器的显示状态
  const [visible, setVisible] = useState(false);

  return (
    <div className="new-bill-form">
      {/* 类型切换 */}
      <div className="type-toggle">
        <button
          className={`toggle-btn pay ${type === "pay" ? "active" : ""}`}
          onClick={() => setType("pay")}
        >
          支出
        </button>
        <button
          className={`toggle-btn income ${type === "income" ? "active" : ""}`}
          onClick={() => setType("income")}
        >
          收入
        </button>
      </div>

      {/* 日期和金额输入 */}
      <div className="input-section">
        {/* 点击区域触发日期选择器 */}
        <div className="date-input" onClick={() => setVisible(true)}>
          <Icon icon={MdOutlineCalendarMonth} className="date-icon" />
          <span className="date-text">{formatDisplayDate(date)}</span>
        </div>
        
        {/* 金额输入 */}
        <div className="amount-input">
          <span className="currency">¥</span>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="amount-field"
          />
        </div>
      </div>

      {/* 日期选择器组件 */}
      <DatePicker
        title="选择日期"
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={(val) => {
          setDate(val);
          setVisible(false);
        }}
        value={date}
        max={new Date()} // 不允许选择未来时间
      />
    </div>
  );
}

export default BillForm;
