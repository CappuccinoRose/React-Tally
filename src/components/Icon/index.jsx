import classNames from "classnames";
import "./index.css";

// 将图标组件作为 props 传入
function Icon({ icon: IconComponent, className, style, onClick }) {
  if (!IconComponent) return null;

  return (
    <span 
      className={classNames("icon-wrapper", className)} 
      style={style} 
      onClick={onClick}
    >
      {/* 渲染传入的 react-icons 组件 */}
      <IconComponent className="icon-svg" />
    </span>
  );
}

export default Icon;
