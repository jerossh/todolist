var FancyCheckbox = React.createClass({
  getInitialState: function() {
   return {value: ''};
  },
  handleChange: function(event) {
   this.setState({value: event.target.value});
  },
  rest: function(){

  },
  render: function() {
   return <input type="text" name="title" value="Untitled" />;
 }
});
React.render(
  <FancyCheckbox />,
  document.getElementById('example')
);
