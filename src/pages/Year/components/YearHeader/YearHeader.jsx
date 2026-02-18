import Icon from "@/components/Icon";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "./YearHeader.css";

const YearHeader = ({ year, onPrev, onNext }) => {
  return (
    <header className="year-header">
      <button className="year-nav-btn" onClick={onPrev}>
        <Icon icon={MdChevronLeft} />
      </button>
      <h2 className="year-title">{year}年度账单</h2>
      <button className="year-nav-btn" onClick={onNext}>
        <Icon icon={MdChevronRight} />
      </button>
    </header>
  );
};

export default YearHeader;
