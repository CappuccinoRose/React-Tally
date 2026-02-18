import Icon from "@/components/Icon";
import { MdPieChart } from "react-icons/md";
import "./YearRank.css";

const YearRank = ({ categoryRank }) => {
  return (
    <section className="year-card">
      <div className="card-header">
        <Icon icon={MdPieChart} className="card-icon" />
        <h3>支出排行 TOP5</h3>
      </div>

      <div className="rank-list">
        {categoryRank.length === 0 && <div className="empty-tip">暂无数据</div>}
        {categoryRank.map((item, index) => (
          <div className="rank-item" key={item.type}>
            <span className="rank-num">{index + 1}</span>
            <span className="rank-name">{item.name}</span>
            <span className="rank-amount">¥{item.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YearRank;
