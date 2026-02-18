import ReactDOM from 'react-dom/client';
import router from '@/router/index.js';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store/index.js';
import { getBillList } from './store/modules/billStore'; // 引入

//导入全局样式
import './styles/index.css'

// 在渲染前先初始化数据
store.dispatch(getBillList());



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
