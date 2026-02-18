// 引入 react-icons 中的图标组件
// Fa: Font Awesome | Md: Material Design | Bi: Bootstrap Icons
import {
  FaUtensils, FaWineBottle, FaIceCream,       // 餐饮
  FaBus, FaPlane, FaSuitcase,                 // 交通旅行
  FaShoppingBag, FaTshirt,          // 购物
  FaGamepad, FaHome, FaBook, FaFirstAid,      // 生活娱乐
  FaMoneyBillWave, FaCoins, FaHandHoldingUsd, // 收入
} from 'react-icons/fa';
import { MdOutlineElectricalServices } from 'react-icons/md'; // 数码电子
import { BiMoneyWithdraw } from 'react-icons/bi';            // 兼职

// 映射关系：type -> 图标组件
export const iconMap = {
  // === 支出 - 餐饮美食 ===
  food: FaUtensils,           // 餐饮
  drinks: FaWineBottle,       // 酒水饮料
  dessert: FaIceCream,        // 甜品零食

  // === 支出 - 交通出行 ===
  transportation: FaBus,      // 公共交通
  longdistance: FaPlane,      // 长途交通

  // === 支出 - 旅行度假 ===
  travel: FaSuitcase,         // 旅行

  // === 支出 - 购物消费 ===
  shopping: FaShoppingBag,    // 购物
  clothes: FaTshirt,          // 服饰鞋包
  electronics: MdOutlineElectricalServices, // 数码电子

  // === 支出 - 休闲娱乐 ===
  entertainment: FaGamepad,   // 休闲娱乐

  // === 支出 - 居家生活 ===
  supplies: FaHome,           // 日常用品
  books: FaBook,              // 图书学习
  health: FaFirstAid,         // 医疗健康

  // === 收入 ===
  salary: FaMoneyBillWave,    // 工资
  bonus: FaCoins,             // 奖金
  allowance: FaHandHoldingUsd,// 补贴津贴
  parttime: BiMoneyWithdraw,  // 兼职收入
};

// 获取图标组件的函数
export const getIconComponent = (type) => {
  return iconMap[type] || FaShoppingBag; // 默认返回购物袋图标
};
