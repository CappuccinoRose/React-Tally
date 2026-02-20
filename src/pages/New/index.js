import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postBill } from "@/store/modules/billStore";
import Header from "./components/NewHeader/NewHeader.jsx";
import BillForm from "./components/BillForm/BillForm.jsx";
import CategoryGrid from "./components/CategoryGrid/CategoryGrid.jsx";
import Toast from "@/components/Toast/Toast.jsx";
import "./index.css";

function New() {
  const dispatch = useDispatch();

  const [type, setType] = useState("pay");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toast, setToast] = useState(null);

  const getDateTimeString = (dateObj) => {
    if (!(dateObj instanceof Date)) return dateObj;
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
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
      // 直接使用 await，不需要 .unwrap()
      await dispatch(postBill(billData));
      
      showToast("账单保存成功！", "success");
      setAmount("");
      setSelectedCategory(null);
      setDate(new Date());
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
