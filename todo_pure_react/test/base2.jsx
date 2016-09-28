var Timer =React.createClass({
  getInitialState:function () {
    return {secondsElapsed: 0};
  },

  tick: function () {
    this.setState ({secondsElapsed: this.state.secondsElapsed + 1});
  },

  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {
    return (
      <div>seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
});

// 组件必须大写， 不知道为什么出现两个 Timer
React.render(
  <Timer />,
  document.getElementById('example')
);
