import dayjs from "dayjs";

/**
 * 格式化日期 - 通用方法
 */
export const formatDate = (date, format = "YYYY-MM-DD") => {
  if (!date) return "";
  return dayjs(date).format(format);
};

/**
 * 格式化为月份
 */
export const formatMonth = (date) => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM");
};

/**
 * 格式化为带星期的日期
 */
export const formatDateWithWeek = (date) => {
  if (!date) return "";
  const d = dayjs(date);
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
  return `${d.format("MM月DD日")} 周${weekDays[d.day()]}`;
};

/**
 * 格式化金额 - 带正负号
 */
export const formatMoney = (amount, type = "pay") => {
  const num = Number(amount) || 0;
  const absMoney = Math.abs(num).toFixed(2);
  
  if (type === "pay") {
    return `-${absMoney}`;
  } else if (type === "income") {
    return `+${absMoney}`;
  } else {
    // 结余可能为负
    return num >= 0 ? absMoney : `-${absMoney}`;
  }
};
