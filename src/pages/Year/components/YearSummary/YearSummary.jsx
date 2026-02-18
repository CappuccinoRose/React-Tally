import "./YearSummary.css";

const YearSummary = ({ totalIncome, totalExpense, balance }) => {
  return (
    <section className="year-summary-card">
      <div className="summary-item">
        <span className="summary-label">收入</span>
        <span className="summary-value income">{totalIncome.toFixed(2)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">支出</span>
        <span className="summary-value expense">{totalExpense.toFixed(2)}</span>
      </div>
      <div className="summary-footer">
        <span className="balance-label">年度结余</span>
        <span className={`balance-amount ${balance >= 0 ? "positive" : "negative"}`}>
          {balance >= 0 ? "+" : ""}{balance.toFixed(2)}
        </span>
      </div>
    </section>
  );
};

export default YearSummary;
