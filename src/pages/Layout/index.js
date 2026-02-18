import { TabBar } from "antd-mobile";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
} from "antd-mobile-icons";
import "./index.css";

const tabs = [
  {
    key: "/",
    title: "月度账单",
    icon: <BillOutline />,
  },
  {
    key: "/new",
    title: "记一笔",
    icon: <AddCircleOutline />,
  },
  {
    key: "/year",
    title: "年度账单",
    icon: <CalculatorOutline />,
  },
];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    // 使用 app-container 包裹
    <div className="app-container">
      {/* 主内容区 */}
      <div className="layout-content">
        <Outlet />
      </div>

      {/* 底部导航 */}
      <div className="layout-footer">
        <TabBar
          activeKey={location.pathname}
          onChange={(value) => navigate(value)}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default Layout;
