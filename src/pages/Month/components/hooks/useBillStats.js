import { useMemo } from "react";
import _ from "lodash";

  // 计算支出、收入、结余并返回账单统计信息
export function useBillStats(billList) {
  return useMemo(() => {
    // 如果没有检查这一步,filter会报错
    if (!billList?.length) {
      return { pay: 0, income: 0, balance: 0 };
    }
// 先filter找出type，然后reduce求和
    const pay = billList
      .filter((item) => item.type === "pay")
      .reduce((sum, item) => sum + Number(item.money), 0);

    const income = billList
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.money), 0);

    return {
      pay: Math.abs(pay),
      income,
      balance: income + pay,
    };
  }, [billList]);
}

// 计算分类统计信息并返回
export function useCategoryStats(billList) {
  return useMemo(() => {
    if (!billList?.length) return [];

    const grouped = _.groupBy(billList, "useFor");

    return Object.entries(grouped)
      .map(([category, items]) => {
        const total = items.reduce(
          (sum, item) => sum + Math.abs(Number(item.money)),
          0
        );
        return {
          category,
          total,
          count: items.length,
          type: items[0].type,
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [billList]);
}
