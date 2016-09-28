var app = app || {};

(function () {
  'use strict';

  app.Utils = {

    // 统一标识符（规则乱码）
    uuid: function () {
      var i, random;
      var uuid = '';
      for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random ))
          .toString(16);
      }
      return uuid;
    },

    // 复数加s
    pluralize: function(count, word) {
      return count === 1 ? word : word + 's';
    },

    // 有data，存储到 localstorage，没数据就获取 namespace
    store: function (namespace, data) {
      // 有数据就写入
      if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
      }

      // 没有数据则读取
      var store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || [];
    },

    // 替换内容，es6 可以 Object.assign
    extend: function () {

      // 新建一个对象
      var newObj = {};

      // 把其他对象的内容，则复制到新建对象内
      for (var i = 0; i < arguments.length; i++){
        var obj = arguments[i];
        for (var key in obj) {

          // 只要实例对象，不要原型上的
          if (obj.hasOwnProperty(key)){
            newObj[key] = obj[key];
          }
        }
      }
      return newObj;
    },

    // 这里结束
  };
})();
