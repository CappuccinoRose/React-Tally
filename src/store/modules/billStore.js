import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: 'billStore',
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList: (state, action) => {
      state.billList = action.payload;
    },
    addBill: (state, action) => {
      state.billList.push(action.payload);
    }
  },
})

export const { setBillList, addBill } = billStore.actions;

// 异步获取列表方法
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8000/ka')
    dispatch(setBillList(res.data));
  }
}

// 异步添加账单方法（手写 thunk，返回 Promise）
const postBill = (billData) => {
  return async (dispatch) => {
    const res = await axios.post('http://localhost:8000/ka', billData);
    dispatch(addBill(res.data));
    return res.data;
  }
}

export default billStore.reducer;

export { getBillList, postBill };
