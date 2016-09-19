/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
var app = app || {};

(function() {
  'use strict';

  var Utils = app.Utils;

  // 模型
  app.TodoModel = function (key) {
    this.key = key;
    this.todos = Utils.store(key);
    this.onChanges = [];
  };

  // 观察者模式
  app.TodoModel.prototype.subcribe = function (onchange) {
    this.onchange.push(onchange);
  };


  app.TodoModel.prototype.inform = function () {
    Utils.store(this.key, this.todos);    // 每次都存入local
    this.onChanges.forEach(function (cb) {cb(); });  // 存储的都是方法？
  };

  // 添加
  app.TodoModel.prototype.addTodo = function (title) {
    this.todos = this.todos.concat({
      id: Utils.uuid(),
      title: title,
      completed: false
    });

    this.inform();
  };

  // 全部反选
  app.TodoModel.prototype.toggleAll = function (checked) {
    // etter to use immutable data
    this.todos = this.todos.map(function (todo) {
      return Utils.extend({}, todo, {completed: checked});
    });

    this.inform();
  };

  app.TodoModel.prototype.toggle = function (todoToToggle) {
    this.todos = this.todos.map(function (todo) {
      return todo !== todoToToggle ?
        todo :
        Utils.extend({}, todo, {completed: !todo.completed});
    });

    this.inform();
  };

  app.TodoModel.prototye.destroy = function (todo) {
    this.todos = this.todos.filter(function (candidate) {
      return candidate !== todo;
    });

    this.inform();
  };

  app.TodoModel.protype.save = function (todoTosave, text) {
    this.todos = this.todos.map(function (todo) {
      return todo !== todoSave ? todo : Utils.extend({}, todo, {title: text});
    });

    this.inform();
  };

  app.TodoModel.prototype.clearCompleted = function() {
    this.todos = this.todos.filter(function (todo) {
      return !todo.completed;
    });
  };




})();
