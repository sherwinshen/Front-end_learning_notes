# 闭包closure

## 1. 闭包的定义

闭包为定义在一个函数内部的函数，其本质是将函数内部和函数外部连接起来的一座桥梁，通过闭包使外部能够访问函数内的局部变量。

```javascript
// f2能够访问f1内的局部变量，因此返回f2就能在外部访问f1内的局部变量 - f2就是闭包
function f1() {
    var n = 999;
    function f2() {
        console.log(n);
    }
    return f2;
}
var result = f1();
result(); // 999

// 注意闭包返回f2与f2()的区别 - 带上括号返回的是函数调用，不带括号仅函数名返回的是函数
function f1() {
    var n = 999;
    function f2() {
        console.log(n);
    }
    return f2();
}
var result = f1(); // 999
```

## 2. 闭包的作用

1. 读取函数内部的变量
2. 变量的值始终保持在内存中 - 保存变量现场
3. 封装 - 信息隐藏

```javascript
// Example1 
function f1() {
    var n = 999;
    nAdd = function () {
        n += 1
    }
    function f2() {
        alert(n);
    }
    return f2;
}

var result = f1();
result(); // 999
// nAdd前面没有使用var关键字，因此nAdd是一个全局变量，而不是局部变量，但是需要先调用一次f1()才会生成全局变量nAdd。
nAdd();
// f1是f2的父函数，而f2被赋给了一个全局变量,这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收，因此f1的局部变量n也一直保存在内存中。
result(); // 1000
```

```javascript
// Example2
// 未使用闭包，在实际中点击节点并不会显示对应的标号，而每个节点点击显示的都是nodes的长度值，因为i均来自for循环中i
var addHandlers = function(nodes){
  for(var i=0;i<nodes.length;i++){
    nodes[i].onclick() = function(){
      alert(i);
    }
  }
} 

// 使用闭包，每个节点生成点击事件都生成一个闭包，每个闭包都存储了当前的i值，因此在这个情况下能满足要求，在实际中点击节点会显示对应的标号。
var addHandlers = function(nodes){
  var helper = function(i){
    return function(){
      alert(i);
    }
  }
  for(var i=0;i<nodes.length;i++){
    nodes[i].onclick() = helper(i);
  }
} 
```

```javascript
// Example3 - 封装
// 外部不能访问内部的observerList，而通过返回的闭包则能够访问observerList进行操作
var observer = (function(){
  var observerList = [];
  return {
    add: function(obj){
      observerList.push(obj);
    },
    empty: function(){
      observerList = [];
    },
    get: function(){
      return observerList;
    }
  }
})();
```
