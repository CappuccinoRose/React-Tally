import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBillList } from "@/store/modules/billStore";
import Header from "./components/NewHeader/NewHeader.jsx";
import BillForm from "./components/BillForm/BillForm.jsx";
import CategoryGrid from "./components/CategoryGrid/CategoryGrid.jsx";
import Toast from "@/components/Toast/Toast.jsx"; // 引入 Toast 组件
import "./index.css";

function New() {
  const dispatch = useDispatch();

  const [type, setType] = useState("pay");
  const [date, setDate] = useState("今天");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toast, setToast] = useState(null); // 管理 Toast 显示

  const getDateTimeString = (dateVal) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const handleSave = async () => {
    if (!selectedCategory) {
      showToast("请选择分类", "warning");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      showToast("请输入有效金额", "warning");
      return;
    }

    const billData = {
      type: type,
      money: type === "pay" ? -parsedAmount : parsedAmount,
      date: getDateTimeString(date),
      useFor: selectedCategory,
    };

    try {
      const response = await fetch('http://localhost:8000/ka', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
      });

      if (response.ok) {
        showToast("账单保存成功！", "success");

        // 保存成功后，触发 Redux Action 重新获取列表
        dispatch(getBillList());

        // 重置表单
        setAmount("");
        setSelectedCategory(null);
      } else {
        throw new Error('服务器响应错误');
      }
    } catch (error) {
      console.error("保存失败:", error);
      showToast("保存失败，请确认 json-server 已在 8000 端口启动！", "error");
    }
  };

  return (
    <div className={`new-page ${type === "pay" ? "pay-mode" : "income-mode"}`}>
      <Header />
      <BillForm 
        type={type} 
        setType={setType} 
        date={date} 
        setDate={setDate} 
        amount={amount} 
        setAmount={setAmount} 
      />
      <CategoryGrid 
        type={type} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <div className="save-section">
        <button className="save-btn" onClick={handleSave}>
          保存
        </button>
      </div>

      {/* Toast 渲染在这里 */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={2500}
          onClose={hideToast}
        />
      )}
    </div>
  );
}

export default New;
