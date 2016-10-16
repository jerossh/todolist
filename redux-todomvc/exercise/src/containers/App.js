import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

// actions 是怎么传进去的？
const App = ({todos, actions}) => (
  <div>
    <Header addTodo={actions.addTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos                       // 输入道 UI 的参数
})

// 直接 bind了所有的 action？
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)    // 这个还是不理解
})


export default connect(   // 生成容器组件
  mapStateToProps,        // 输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数
  mapDispatchToProps      // 输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。
)(App)

// 疑问
// bindActionCreators
// connect
