import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

//定义store
const billStore = createSlice({
    name: 'billStore',
    //定义store的初始状态
    initialState: {
        billList: [],
    },
    //定义store的修改方法
    reducers: {
        //同步修改store的方法
        setBillList: (state, action) => {
            state.billList = action.payload;
        }
        },
})

//解构出ActionCreator函数
export const {setBillList} = billStore.actions;

//异步修改store的方法
const getBillList = () => {
    return async (dispatch) => {
        //异步获取数据
        const res = await axios.get('http://localhost:8000/ka')
        //调用同步修改store的方法
        dispatch(setBillList(res.data));
    }
}

//导出reducer
export default billStore.reducer;
//导出异步修改store的方法   
export {getBillList};
