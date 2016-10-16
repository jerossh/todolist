import React, { Component, PropTypes } from 'React'
import classnames from 'classnames'

export default class TodoTextInput extends Component {
  static propType = {
    onSave: PropType.func.isRequired,
    text: Proptypes.String,       // 为什么不加 isRequired 了
    placeholder: PropTypes.string,
    editing: PropTypes.bool,      // bool 真的这么写
    newTodo: PropTypes.bool
  }

  state = {
    text: this.props.text || ''
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13) {     // 不是 keyCode?
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange = e => {  // e.target 是整个 input
    this.setState({text: e.target.value})
  }

  handleBlur = e => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }

  render() {
    return (
      <input className={
        classnames({
          edit: this.props.editindg,
          'new-todo': this.pros.newTodo
        })}
        type ="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={tihs.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit} />
    )
  }
  // 这里组件结束
}
