/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

(function() {
  'use strict';

  var ESCAPE_KEY =27;
  var ENTER_KEY = 13;

  app.TodoItem = React.createClass({
    handleSubmit: function (event){
      var val = this.state.editText.trim();
      if (val) {
        this.props.onsave(val);
        this.setState({editText: val});
      } else {
        this.props.onDestroy();   // on destroy 是什么
      }
    },

    handleEdit: function () {
      this.props.onEdit();
      this.setState({editText: this.props.todo.title});
    },


    handleKeyDown: function (event) {
      if (event.which === ESCAPE_KEY) {
        this.setState({editText: this.props.todo.title});
        this.props.onCancel(event);         //  这是什么
      } else if (event.which === ENTER_KEY) {
        this.handleSubmit(event);
      }
    },


    handleChange: function (event) {
      if (this.props.editing) {
        this.setState({editText: event.target.value});
      }
    },


    getInitialState: function () {
      return {editText: this.props.todo.title};
    },


    // This is a completely optional performance enhancement
    shouldComponentUpdate: function (nextProps, nextState) {
      return (
        nextProps.todo !== this.props.todo ||
				nextProps.editing !== this.props.editing ||
				nextState.editText !== this.state.editText        // 不懂这一段
      );
    },


    // Safely manipulate the DOM after updating the state when invoking `this.props.onEdit()`
    componentDidUpdate: function (prevProps) {
      if (!prevProps.editing && this.props.editing) {
        var node = react.findDOMNode(this.refs.edtField);
        node.focus();
        node.setSelectionRange(node.value.length, node.value.length);
      }
    },

    render: function () {
      return (

      );
    }


  });
// TodoItem 结束


})();
