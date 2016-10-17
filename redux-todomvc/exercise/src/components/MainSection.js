import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

 // 这个哪里用到？
const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

export default class MainSection extends Component {

  // 我所理解的这个 proptyes 只作用于这个组件
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  // 这个状态用在哪里呀？ 这个算是初始化状态啰
  state = { filter: SHOW_ALL }


  handleClearCompleted = () => {
    this.props.actions.clearCompleted()
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  // completedCount 在哪里用到呢
  renderToggleAll(completedCount) {
    const { todos, actions } = this.props
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={actions.completeAll} />
      )
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props    // 解构出来， 这个和store有关吗
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }

  render() {
    const { todos, actions } = this.props
    const { filter } = this.state

    // TODO_FILTERS的状态改变在这里
    // filtrer 可以不是回调函数？
    // 括号内直接就是回调内容？
    const filteredTodos = todos.filter(TODO_FILTERS[filter])

    // cout前一个结果，todo是当前处理的元素
    const completedCount = todos.reduce((count, todo) =>
    // todo有一个completed属性
      todo.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">

          {filteredTodos.map(todo =>
            // actions 里面有这么多东西？
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }

}
