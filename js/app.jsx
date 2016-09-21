/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {
  'use strict';

  app.ALL_TODOS = 'all';
  app.ACTIVE_TODOS = 'active';
  app.COMPLETED_TODOS = 'completed';
  var TodoFooter = app.TodoFooter;
  var TodoItem = app.ToDoItem;

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
    },

    toggle: function (todoToggle) {
      this.props.model.toggle(todoToToggle);
    },

    destroy: function (todo) {
      this.props.model.destroy(todo);
    },

    edit: function (todo) {
      this.setState({editing: todo.id});
    },

    save: function (todoToSave, text){
      this.props.model.save(todoToSave, text);
      this.setState({edit: null});
    },

    cancel: function () {
      this.setState({editing: null});
    },

    clearCompleted: function () {
      this.props.model.clearCompleted();
    },

    render: function () {
      var footer;
      var main;
      var todos = this.props.model.todos;

      var shownTods = todos.filter(function (todo) {
        switch (this.state.nowShowing) {
        case app.ACTIVE_TODOS:
          return !todo.completed;
        case app.COMPLETED_TODOS:
          return todo.completed;
        default:
        return true;
        }
      }, this);  // 这个 this 是干嘛的

      var todoItems = shownTodos.map(function (todo) {
        return (    // 有些需要绑定而有些不用绑定
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={this.toggle.bind(this, todo)}
            onDestroy={this.destroy.bind(this, todo)}
            onEdit={this.edit.bind(this, todo)}
            editing={this.state.editing === todo.id}
            onSave={this.save.bind(this, todo)}
            onCancel={this.cancel}
          />
        );
      }, this);

      var activeTodoCount = todos.reduce(function (accum, todo) {
        return todo.completed ? accum : accum + 1;
      }, 0);

      var completedCount = todos.length - activeTodoCount;

      if (activeTodoCount || completedCount) {
        footer =
          <TodoFooter
            count={activeTodoCount}
            completedCount={completedCount}
            nowShowing={this.state.nowShowing}
            onClearCompleted={this.clearCompleted}
          />;
      }

      if (todos.length) {
        main = (
          <section className='main'>
            <input
              className='toggle-all'
              type="checkbox"
              onChange={this.toggleAll}
              checked={activeTodoCount === 0}
            />
            <ul className="todo-list">
              {todoItems}
            </ul>
          </section>
        );
      }

      return (
        <div>
          <header className='header'>
            <h1>todos</h1>
            <input
              className='new-todo'
              placeholder='what needs to be done'
              value={this.state.newTodo}
              onkeyDown={this.handleNewTodoKeyDown}
              onChange={this.handleChnge}
              autofocus={true}
            />
          </header>
          {main}
          {footer}
        </div>
      );
    }
  });

  var model = new app.TodoModel('react-todos');

  function render() {
    react.render(
      <TodoApp model={model}/>,
      document.getElementsByClassName('todoapp')[0]
    );
  }

  model.subscribe(render);
  render();

})();
