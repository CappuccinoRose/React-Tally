import classNames from "classnames";
import { billCategoryData } from "@/utils/billCategory";
import Icon from "@/components/Icon";
import { getIconComponent } from "@/utils/iconMap";
import "./CategoryGrid.css";

function CategoryGrid({ type, selectedCategory, setSelectedCategory }) {
  return (
    <div className="new-category-grid">
      {billCategoryData[type].map((group) => (
        <div key={group.type} className="category-group">
          <h3 className="group-title">{group.name}</h3>
          <div className="category-items">
            {group.list.map((item) => (
              <button
                key={item.type}
                className={classNames("category-item", {
                  selected: selectedCategory === item.type,
                  "pay-type": type === "pay",
                  "income-type": type === "income"
                })}
                onClick={() => setSelectedCategory(item.type)}
              >
                <Icon icon={getIconComponent(item.type)} className="category-icon" />
                <span className="category-name">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryGrid;
