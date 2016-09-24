var TodoList = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <li key={item.id}>{item.text}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});



var TodoApp = React.createClass({

  // 状态初始化
  getInitialState: function() {
    return {items:[], text:''};
  },

  // 处理输入
  handleChange: function(e) {
    this.setState({text: e.target.value});
  },


  render: function() {
    return (
      <div>
        <TodoList items={this.state.items}/>
        <h3>Todo</h3>
        <form>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>Add #1</button>
        </form>
      </div>
    );
  }
  //end
});

React.render(<TodoApp />,
  document.getElementById('example')
);
