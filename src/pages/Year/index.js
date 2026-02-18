import React, { useState } from "react";
import useYearStats from "./components/hooks/useYearStats";
import YearHeader from "./components/YearHeader/YearHeader";
import YearSummary from "./components/YearSummary/YearSummary";
import YearTrend from "./components/YearTrend/YearTrend";
import YearRank from "./components/YearRank/YearRank";
import "./index.css";

const Year = () => {
  // 1. 状态管理：当前选中的年份
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // 2. 使用自定义 Hook 获取计算后的年度数据
  const stats = useYearStats(currentYear);

  // 3. 切换年份的方法
  const changeYear = (delta) => {
    setCurrentYear((prev) => prev + delta);
  };

  return (
    <div className="year-page">
      {/* 头部：年份选择器 */}
      <YearHeader
        year={currentYear}
        onPrev={() => changeYear(-1)}
        onNext={() => changeYear(1)}
      />

      {/* 核心概览：收入/支出/结余 */}
      <YearSummary
        totalIncome={stats.totalIncome}
        totalExpense={stats.totalExpense}
        balance={stats.balance}
      />

      {/* 图表区：月度趋势 */}
      <YearTrend monthlyData={stats.monthlyData} />

      {/* 列表区：支出排行 */}
      <YearRank categoryRank={stats.categoryRank} />
    </div>
  );
};

export default Year;
