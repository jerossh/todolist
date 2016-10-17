import React from 'react'            // 为什么每一个都要传入 react
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'// 提供一个放 store 的地方给内部使用
import App from './containers/App'    // 这是啥？
import reducer from './reducers'      // 这个函数要好好了解下
import 'todomvc-app-css/index.css'    // css 吗

// 使用 reducer 自动处理 action
const store = createStore(reducer)

render(
  // Provider 是 react-redux 存储 store 的地方，App的所有子组件就默认都可以拿到state了
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
