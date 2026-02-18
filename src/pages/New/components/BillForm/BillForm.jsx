import Icon from "@/components/Icon";
import { MdOutlineCalendarMonth } from "react-icons/md";
import "./BillForm.css";

function BillForm({ type, setType, date, setDate, amount, setAmount }) {
  return (
    <div className="new-bill-form">
      {/* 类型切换 - 修改为更美观的胶囊样式 */}
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
        <div className="date-input">
          {/* 使用 Icon 组件替换表情 */}
          <Icon icon={MdOutlineCalendarMonth} className="date-icon" />
          <span className="date-text">{date}</span>
        </div>
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
    </div>
  );
}

export default BillForm;
