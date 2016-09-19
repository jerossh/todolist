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
  getInitialState: function(){
    return {
      nowShowing: app.ALL_TODOS,
      editing: null,
      newTodo: ''
    };
  },

  componentDidMount: function () {
    var setState = this.setState;
    var router = router({
      '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
      '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
      '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS}),
    });
  }

});
