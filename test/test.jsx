var TodoList = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <li key={item.id}>{item.text}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});


var TodoApp = React.createClass({

  // 初始化，两个状态
  getInitialState: function() {
    return {items: [], text: ''};
  },

  // 监控输入
  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  // 提交
  handleSubmit: function(e) {
    e.preventDefault();
    var todoText = this.state.text.trim();
    if (todoText) {
      var nextItems = this.state.items.concat([{text: todoText, id: Date.now()}]);
      var nextText = '';
      this.setState({items: nextItems, text: nextText});
    }
  },

  render: function() {

    // input 内 value 的作用就是 hanndleSubmit 的时候，可以清0
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});

// 为什么不用 DOM 了？
// ReactDOM.render(<TodoApp />,
React.render(<TodoApp />,
  document.getElementById('example')
);
