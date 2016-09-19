# 1. React TodoMVC Example

need http-server module

```
npm install http-server -g

cd tolist

http-server
```

# 2. About node_module

### 1) classnames
[npm-link](https://www.npmjs.com/package/classnames): A simple utility for conditionally joining classNames together

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

#### polyfills of classNames

- Array.isArray
- Object.keys

### 2) director
[npm-link](https://www.npmjs.com/package/director): A client Side/Server Side Router
