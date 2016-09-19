# 1. React TodoMVC Example

need http-server module

```
npm install http-server -g

cd tolist

http-server
```

# 2. About node_module

### 1) classnames
[link](https://www.npmjs.com/package/classnames): A simple utility for conditionally joining classNames together

before:

```javascript
var Button = React.createClass({
// ...
render () {
  var btnClass = 'btn';
  if (this.state.isPressed) btnClass += ' btn-pressed';
  else if (this.state.isHovered) btnClass += ' btn-over';
  return <button className={btnClass}>{this.props.label}</button>;
}
});
```

after:

```javascript
var classNames = require('classnames');

var Button = React.createClass({
  // ...
  render () {
    var btnClass = classNames({
      'btn': true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });
    return <button className={btnClass}>{this.props.label}</button>;
  }
});
```

 also you can:

 ```javascript
 var btnClass = classNames('btn', this.props.className, {
  'btn-pressed': this.state.isPressed,
  'btn-over': !this.state.isPressed && this.state.isHovered
});
```

## polyfills

- Array.isArray
- Object.keys
