import React, { PropTypes, Component } from 'React'
import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
  static propTypes = { // static 是 es6 里的静态方法
    addTodo: PropTypes.func.isRequired
  }

  handleSave = text => {
    if (text.length !== 0) {
      this.props.addTodo(text)   // addTodo 在哪里？
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput newTodo
                       onSave={this.handleSave}
                       placeholder="你想做什么？" />
      </header>
    )
    // 上面的 newTodo 为什么后面没有赋值？
  }
}
