import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: 'billStore',
  initialState: {
    billList: [],
  },
  reducers: {
    // 1. 同步修改store的方法：设置列表
    setBillList: (state, action) => {
      state.billList = action.payload;
    },
    // 2. 同步添加账单的方法
    addBill: (state, action) => {
      state.billList.push(action.payload);
    }
  },
})

// 3. 解构出 ActionCreator 函数
export const { setBillList, addBill } = billStore.actions;

// 异步获取列表方法
const getBillList = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:8000/ka')
    dispatch(setBillList(res.data));
  }
}

// 4. 异步添加账单方法
// 接收组件传递的 billData，请求接口后，使用同步方法更新状态
const postBill = (billData) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://localhost:8000/ka', billData);
      // 注意：这里使用 res.data，因为 json-server 返回的是创建后的对象
      dispatch(addBill(res.data));
      return res.data; // 返回数据以便组件判断成功
    } catch (error) {
      throw error; // 抛出错误以便组件 catch 捕获
    }
  }
}

export default billStore.reducer;

// 导出异步方法
export { getBillList, postBill };
