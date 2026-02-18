import React, { useState } from "react";
import classNames from "classnames";
import BillOverview from "../BillOverview/BillOverview";
import Icon from "@/components/Icon"; // 引入 Icon 组件
import { getIconComponent } from "@/utils/iconMap";
import { useBillStats, useCategoryStats } from "../hooks/useBillStats";
// 引入工具函数
import { getCategoryName, formatDateWithWeek, formatMoney } from "@/utils";
import "./DailyBill.css";

function DailyBill({ date, billList }) {
  // 默认不展开
  const [isExpanded, setIsExpanded] = useState(false);
  // 日期选择器的数据计算结果列表
  const dayResult = useBillStats(billList);
  // 日期选择器的分类计算结果列表
  const categoryStats = useCategoryStats(billList);

  return (
    <div className={classNames("dailyBill", { expanded: isExpanded })}>
      {/* 事件委托给header,冒泡后，根据isExpanded判断是否显示categoryDetail */}
      <div className="header" onClick={() => setIsExpanded(!isExpanded)}>
        {/* 日期行 */}
        <div className="dateRow">
          {/* 具体日期 */}
          <span className="date">{formatDateWithWeek(date)}</span>
          {/* 日期旁边翻转的箭头，表示展开或收起 */}
          <span className={classNames("arrow", { expand: isExpanded })} />
        </div>
        {/* 按日期汇总行 */}
        <BillOverview stats={dayResult} size="small" />
      </div>

      {isExpanded && categoryStats.length > 0 && (
        //  每日账单详情
        <div className="categoryDetail">
          {categoryStats.map((stat) => (
            <div key={stat.category} className="categoryItem">
              {/* 分类名称和数量 */}
              <div className="categoryInfo">
                 {/* 添加图标 */}
               <Icon icon={getIconComponent(stat.category)} className="categoryIcon" />
                {/* 使用工具函数转换 */}
                <span className="categoryName">
                  {getCategoryName(stat.category)}
                </span>
                <span className="categoryCount">{stat.count}笔</span>
              </div>
              {/* 统计金钱 */}
              <span className={classNames("categoryMoney", stat.type)}>
                {formatMoney(stat.total, stat.type)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DailyBill;
