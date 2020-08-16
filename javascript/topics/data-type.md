# 数据类型/类型识别

## 1. 数据类型

<img src="./img/pic1.png" style="zoom:70%;" />

**原始类型与引用类型**

- 原始类型：Undefined，Null，Boolean，String，Number

- 引用类型：Object，Boolean，String，Number 

两者区别：

- 原始类型值直接存储在栈内存，而引用类型值存储在堆内存，其栈内存值存储的是值存储地址，如下图所示：

<img src="./img/pic2.png" style="zoom:60%;" />

- 原始类型复制即重新复制一份原始数据，而引用类型复制为拷贝地址，两个地址指向同一个堆内存，更改其中一个也会影响另一个。

<img src="./img/pic3.png" style="zoom:90%;" />



## 2. 类型识别

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

### 2.2 instanceof

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

### 2.4  Object.prototype.toString()

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

### 2.5 总结

1. typeof 目标 === 'object'  —— 可以判断基本数据类型（除 null 为 object），引用对象类型均为 object（除function）

2. 目标 instanceof Array === true —— 不可以判断基本数据类型，可以判断引用对象类型包括自定义对象

3. 目标.constructor === Object —— 可以判断基本数据类型（除 null 和 undefined）和对象数据类型（内置和自定义）

4. Object.prototype.toString.call(目标).slice(8,-1).toLowerCase() === 'string'  —— 可以判断基本数据类型和引用对象类型，不能识别自定义对象

   