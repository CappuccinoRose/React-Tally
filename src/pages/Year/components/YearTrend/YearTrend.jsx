import Icon from "@/components/Icon";
import { MdTrendingUp } from "react-icons/md";
import "./YearTrend.css";

const YearTrend = ({ monthlyData }) => {
  const maxMonthAmount = Math.max(
    ...monthlyData.map((d) => Math.max(d.income, d.expense)),
    1
  );

  return (
    <section className="year-card">
      <div className="card-header">
        <Icon icon={MdTrendingUp} className="card-icon" />
        <h3>月度收支趋势</h3>
      </div>

      <div className="chart-container">
        {monthlyData.map((data) => (
          <div className="chart-bar-group" key={data.month}>
            <div className="bar-wrapper">
              <div
                className="bar income"
                style={{ height: `${(data.income / maxMonthAmount) * 100}%` }}
              />
              <div
                className="bar expense"
                style={{ height: `${(data.expense / maxMonthAmount) * 100}%` }}
              />
            </div>
            <span className="chart-label">{data.month}月</span>
          </div>
        ))}
      </div>

      <div className="chart-legend">
        <span className="legend-item income"><i />收入</span>
        <span className="legend-item expense"><i />支出</span>
      </div>
    </section>
  );
};

export default YearTrend;
