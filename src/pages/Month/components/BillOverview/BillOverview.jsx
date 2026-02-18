import React from "react";
import "./BillOverview.css";
// 引入格式化函数
import { formatMoney } from "@/utils";

// 映射配置：定义类型、显示名称、对应的CSS类名
const overViewConfig = [
  { type: "pay", label: "支出", className: "expense" },
  { type: "income", label: "收入", className: "income" },
  { type: "balance", label: "结余", className: "balance" },
];

const BillOverview = ({ stats, size = "large" }) => {
  // 计算结余
  const balance = (stats.income || 0) - (stats.pay || 0);

  // 组装渲染数据
  const renderData = [
    { ...overViewConfig[0], value: stats.pay || 0 },
    { ...overViewConfig[1], value: stats.income || 0 },
    { ...overViewConfig[2], value: balance },
  ];

  return (
    <div className={`billOverview ${size === "large" ? "horizontal large" : "small"}`}>
      {renderData.map((item) => (
        <div key={item.type} className={`overview-item ${item.className}`}>
          <span className="money">
            {formatMoney(item.value, item.type)}
          </span>
          <span className="type">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BillOverview;
