/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {
  'use strict';

  // 这里定义的是 css 的类
  app.ALL_TODOS = 'all';
  app.ACTIVE_TODOS = 'active';
  app.COMPLETED_TODOS = 'completed';

  var TodoFooter = app.TodoFooter;
  var TodoItem = app.TodoItem;

  var ENTER_KEY = 13;

// 整个组件
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

      // 通过路由改变来定义 nowShowing 状态
      var router = Router({         // director module
        '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
        '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
        '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS}),
      });

      // 初始化状态
      router.init('/');
      // redirect {String}: This value will be used if '/#/' is not found in the URL.
      // (e.g., init('/') will resolve to '/#/', init('foo') will resolve to '/#foo').
    },

    // 跟踪状态变化
    handleChange: function(event) {
      this.setState({newTodo: event.target.value});
    },

    handleNewTodoKeyDown: function(event) {
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

    toggle: function (todoToToggle) {
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

			var shownTodos = todos.filter(function (todo) {
				switch (this.state.nowShowing) {
				case app.ACTIVE_TODOS:
					return !todo.completed;
				case app.COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
				}
			}, this);

			var todoItems = shownTodos.map(function (todo) {
				return (
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
			}, this);  // thisArg: Optional. Value to use as this when executing callback.

      // 不懂
			var activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.completed ? accum : accum + 1;
			}, 0);       // initialValue

			var completedCount = todos.length - activeTodoCount;


      // footer定义
			if (activeTodoCount || completedCount) {
				footer =
					<TodoFooter
						count={activeTodoCount}                     // 待办事务
						completedCount={completedCount}             // 完成事务
						nowShowing={this.state.nowShowing}          // 显示状态
						onClearCompleted={this.clearCompleted}      //
					/>;
			}

      // 待办定义
			if (todos.length) {
				main = (
					<section className="main">
						<input
							className="toggle-all"
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
					<header className="header">
						<h1>todos</h1>
						<input
							className="new-todo"
							placeholder="What needs to be done?"
							value={this.state.newTodo}
							onKeyDown={this.handleNewTodoKeyDown}
							onChange={this.handleChange}
							autoFocus={true}
						/>
					</header>
					{main}
					{footer}
				</div>
			);
		}
	});

	var model = new app.TodoModel('react-todos');    //  todomodel 还是一个构造函数

	function render() {
		React.render(                                  // ReactDOM 弃用了？
			<TodoApp model={model}/>,
			document.getElementsByClassName('todoapp')[0]
		);
	}

	model.subscribe(render);
	render();
})();
