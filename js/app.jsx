/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';
var TodoFooter = app.TodoFooter;
var TodoItem = app.TOdoItem;

var ENTER_KEY = 13;

var TodoApp = React.createClass({

  // 初始化
  getInitialState: function(){
    return {
      nowShowing: app.ALL_TODOS,        // 显示类别
      editing: null,                    // 编辑状态
      newTodo: ''                       // 新添加
    };
  },

 // 加载完
  componentDidMount: function () {
    var setState = this.setState;
    var router = router({
      '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
      '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
      '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS}),
    });
    router.init('/');
  },

  // 跟踪状态变化
  handleChange: function(event) {
    this.setState({newTodo: event.target.value});
  },

  handleNewTodoKeyDown: function() {
    if(event.keyCode !== ENTER_KEY) {
      return;
    }
    event.preventDefault();

    var val = this.state.newTodo.trim();

    if (val) {
      this.props.model.addTodo(val);
      this.setState({newTodo: ''});
    }
  },

  toggleAll: function(event) {
    var checked = event.target.checked;
    this.props.model.toggleAll(checked);
  }













});
