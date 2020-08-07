# 基本类型及类型识别

简介：本文为基本类型及类型识别笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 1、类型系统

![](../../../.gitbook/assets/pic1%20%283%29.png)

### 1.1 原始类型与引用类型

`原始类型：`Undefined，Null，Boolean，String，Number

`引用类型：`Object，Boolean，String，Number

* 存储区别如下

原始类型值直接存储在栈内存，而引用类型值存储在堆内存，其栈内存值存储的是值存储地址，如下图所示：

![](../../../.gitbook/assets/pic2%20%284%29.png)

* 复制的区别如下

原始类型复制即重新复制一份原始数据，而引用类型复制为拷贝地址，两个地址指向同一个堆内存，更改其中一个也会影响另一个。如下图所示：

![](../../../.gitbook/assets/pic3%20%284%29.png)

## 2、类型识别

* [typeof](ji-ben-lei-xing-lei-xing-shi-bie.md#typeof)
* \[Object.prototype.toString\(\)\]\(\#Object.prototype.toString\(\)\)
* [constructor](ji-ben-lei-xing-lei-xing-shi-bie.md#constructor)
* [instanceof](ji-ben-lei-xing-lei-xing-shi-bie.md#instanceof)

### 2.1 typeof

```javascript
// typeof可以识别标准类型（除null）；
typeof 'hello'; // string
typeof 12; // number
typeof true; // boolean
typeof undefined; // undefined
typeof null; // object
typeof {a:12}; // object

// typeof不能识别具体的对象类型（除function）
typeof function(){}; // function
typeof []; // object
typeof new Date(); // object
typeof /\d/; // object
function Person(){}
typeof Person(); // object

// ES6 新加的symbol也能识别
typeof Symbol('hello'); // symbol
```

### 2.2 Object.prototype.toString\(\)

```javascript
function type(obj){
  return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}
// Object.prototype.toString可以识别标准类型
type(1); // number
type("abc"); // string
type(true); // boolean
type(undefined); // undefined
type(null); // null
type({}); // object

// Object.prototype.toString可以识别内置对象类型
type([]); // array
type(new Date); // date
type(/\d/); // regexp
type(function(){}); // function

// Object.prototype.toString不能识别自定义类型
function Person(){}
type(new Person); // object

// 也可以识别symbol
type(Symbol()); // symbol
```

### 2.3 constructor

```javascript
// constructor是对象原型上的属性，指向构造器本身

//constructor可以识别标准类型（除null/undefined）
"hello".constructor === String; // true
(1).constructor === Number; // true
true.constructor === Boolean; // true
({}).constructor === Object; // true

// constructor可以识别内置对象
[].constructor === Array; // true

// constructor可以识别自定义类型
function Person(){}
new Person().constructor === Person; // true 
// 也可以识别symbol
Symbol('hello').constructor === Symbol;  // true
```

### 2.4 instanceof

```javascript
// instanceof不能判别原始类型
1 instanceof Number; // false
"hello" instanceof String; // false

// instanceof能够判别内置对象类型
[] instanceof Array; // true
/\d/ instanceof RegExp; // true

// instanceof能够判别自定义类型及父子类型
function Point(){}
function Circle(){}
Circle.prototype = new Point();
Circle.prototype.constructor = Circle;
var c = new Circle();
c instanceof Point(); // true
c instanceof Circle(); // true

// instanceof 不能识别symbol
Symbol('hello') instanceof Symbol; // false
```

### 2.5 总结

* `typeof 目标 === 'object'` - 可以判断基本数据类型\(除null为object\)，引用对象类型均为object\(除function\)
* `目标 instanceof Array === true` - 不可以判断基本数据类型，可以判断引用对象类型包括自定义对象
* `Object.prototype.toString.call(目标)..slice(8,-1).toLowerCase() === 'string'` - 可以判断基本数据类型和引用对象类型，不能识别自定义对象
* `目标.constructor === Object` - 可以判断基本数据类型\(除null和undefined\)和对象数据类型\(内置和自定义\)

如果发现本项目有错误，欢迎提交 issues 指正。

