import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getCategoryName } from "@/utils/billCategory";

const useYearStats = (year) => {
  const { billList } = useSelector((state) => state.bill);

  return useMemo(() => {
    // 1. 过滤出当前年份的数据
    const yearBills = billList.filter((bill) => bill.date.startsWith(year.toString()));

    // 2. 计算年度总收支
    const totalIncome = yearBills
      .filter((b) => b.type === "income")
      .reduce((sum, b) => sum + b.money, 0);
    
    const totalExpense = yearBills
      .filter((b) => b.type === "pay")
      .reduce((sum, b) => sum + Math.abs(b.money), 0);

    // 3. 计算月度趋势 (初始化12个月)
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      income: 0,
      expense: 0,
    }));

    yearBills.forEach((bill) => {
      const monthIndex = parseInt(bill.date.slice(5, 7), 10) - 1;
      if (bill.type === "income") {
        monthlyData[monthIndex].income += bill.money;
      } else {
        monthlyData[monthIndex].expense += Math.abs(bill.money);
      }
    });

    // 4. 计算分类排行 (只统计支出)
    const categoryMap = {};
    yearBills
      .filter((b) => b.type === "pay")
      .forEach((bill) => {
        const cat = bill.useFor;
        categoryMap[cat] = (categoryMap[cat] || 0) + Math.abs(bill.money);
      });

    const categoryRank = Object.entries(categoryMap)
      .map(([type, amount]) => ({
        type,
        name: getCategoryName(type) || type, // 修正：使用正确的函数名
        amount,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5); // 取前5名

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      monthlyData,
      categoryRank,
    };
  }, [billList, year]);
};

export default useYearStats;
