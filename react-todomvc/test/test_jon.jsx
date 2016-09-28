var TodoList = React.createClass({
  render: function(){
    var createItem = function(item) {
      return <li key={item.id}>item.text</li>;
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

  // 处理提交
  handleSubmit: function(e){
    // 阻止默认的提交刷新
    e.preventDefault();

    // 处理 text state
    var todoText = this.state.text.trim();
    var nextItems = this.state.items.concat([{text: todoText, id: Date.now()}]);
    this.setState({items: nextItems, text: ''});
  },


  render: function() {
    return (
      <div>
        <TodoList items={this.state.items} />
        <h3>Todo</h3>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>Add #{this.state.items.length + 1}</button>
        </form>
      </div>
    );
  }
  //end
});

React.render(<TodoApp />,
  document.getElementById('example')
);
