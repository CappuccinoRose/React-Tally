import React, { useState, useMemo, useEffect } from "react";
import { NavBar } from "antd-mobile";
import { useSelector } from "react-redux";
import _ from "lodash";
import MonthSelector from "./components/MonthSelector/MonthSelector";
import BillOverview from "./components/BillOverview/BillOverview";
import DailyBill from "./components/DailyBill/DailyBill";
import { useBillStats } from "./components/hooks/useBillStats";
// 引入格式化函数
import { formatMonth, formatDate } from "@/utils";
import "./index.css";

function Month() {
  const billList = useSelector((state) => state.bill.billList);
  const [currentDate, setCurrentDate] = useState(() =>
    formatMonth(new Date()),
  );
  const [currentMonthList, setCurrentMonthList] = useState([]);
  const [selectorVisible, setSelectorVisible] = useState(false);

  // 按月分组
  const groupByMonth = useMemo(() => {
    const list = Array.isArray(billList) ? billList : billList?.ka || [];
    if (!list?.length) return {};
    return _.groupBy(list, (item) => formatMonth(item.date));
  }, [billList]);

  // 按日分组
  const groupByDay = useMemo(() => {
    if (!currentMonthList?.length) return {};
    return _.groupBy(currentMonthList, (item) =>
      formatDate(item.date, "YYYY-MM-DD"),
    );
  }, [currentMonthList]);

  // 日期降序排序
  const sortedDayKeys = useMemo(() => {
    return Object.keys(groupByDay).sort(
      (a, b) => new Date(b).valueOf() - new Date(a).valueOf(),
    );
  }, [groupByDay]);

  // 当月统计
  const monthStats = useBillStats(currentMonthList);

  // 更新当月数据
  useEffect(() => {
    setCurrentMonthList(groupByMonth[currentDate] || []);
  }, [billList, currentDate, groupByMonth]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>

      <div className="content">
        <div className="header monthlyheader">
          {/* 月份选择器 */}
          <MonthSelector
            currentDate={currentDate}
            visible={selectorVisible}
            onConfirm={setCurrentDate}
            onClose={setSelectorVisible}
          />
          {/* 按当前月份汇总行 */}
          <BillOverview stats={monthStats} size="large" />
        </div>
        {/* 当前月份的日期列表 */}
        <div className="dailyList">
          {sortedDayKeys.map((date) => (
            // 日期选择器
            <DailyBill key={date} date={date} billList={groupByDay[date]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Month;
