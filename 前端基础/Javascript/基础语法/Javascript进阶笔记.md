# 易忽略/出错语法

简介：前端个人学习笔记-易忽略/出错语法，完整笔记在[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision)         联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)



## 1、区块

> JavaScript 使用大括号，将多个相关的语句组合在一起，称为“区块”（block）。在 JavaScript 语言中，单独使用区块并不常见，区块往往用来构成其他更复杂的语法结构，比如`for`、`if`、`while`、`function`等。

## 2、标签

> 标签相当于定位符，用于跳转到程序的任意位置，标签通常与`break`语句和`continue`语句配合使用，跳出特定的循环。

```javascript
// break后加标签则跳出指定的循环，此处跳出双层循环，若不加标签则只是跳出内层循环
top:
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (i === 1 && j === 1) break top;
      console.log('i=' + i + ', j=' + j);
    }
  }
// 标签也可以用于跳出代码块
foo: {
  console.log(1);
  break foo;
  console.log('本行不会输出');
}
```

## 3、null与undefined

> - undefined表示一个声明了没有赋值的变量，变量只声明的时候默认就是undefined。
> - null 的数据类型是 object。
> - null表示一个空，变量值如果想变为null，必须手动设置。
> - 注意，null与undefined进行比较返回为true，即undefined==null为true。
> - `null`是一个表示“空”的对象，转为数值时为`0`；`undefined`是一个表示"此处无定义"的原始值，转为数值时为`NaN`。

```javascript
// 变量声明了，但没有赋值
var i;
i // undefined

// 调用函数时，应该提供的参数没有提供，该参数等于 undefined
function f(x) {
  return x;
}
f() // undefined

// 对象没有赋值的属性
var  o = new Object();
o.p // undefined

// 函数没有返回值时，默认返回 undefined
function f() {}
f() // undefined
```

## 4、数值的一些点

### 取值范围

> 一个数大于等于2的1024次方，那么就会发生“正向溢出”，返回`Infinity`
>
> 一个数小于等于2的-1075次方，那么就会发生为“负向溢出”，返回`0`（指数部分最小值-1023，再加上小数部分的52位）

```javascript
// JavaScript 提供Number对象的MAX_VALUE和MIN_VALUE属性，返回可以表示的具体的最大值和最小值。
Number.MAX_VALUE // 1.7976931348623157e+308
Number.MIN_VALUE // 5e-324
```

### 进制表示

> 0b/0B表示二进制
>
> 0o/0O表示八进制
>
> 0f/0F表示十六进制

注意：十进制没有前导0，八进制有前导0、且只用到0-7的八个阿拉伯数字，两者容易出错，例如012认为是八进制，0888则认为是十进制。

### 特殊数值

正零+0，负零-0，无穷Infinity，负无穷Infinity，非数字NaN。

注意：`NaN`的数据类型依旧为Number，0/0为NaN，非0数/0为Infinity，NaN不等于任何值（包括NaN本身），NaN与任何数（包括它自己）的运算都是NaN，

## 5、对象的一些点

### 引用

> 如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量。

```javascript
var o1 = {};
var o2 = o1;

o1.a = 1;
o2.a // 1
```

注意：这种引用只局限于对象，如果两个变量指向同一个原始类型的值（Undefined，Null，Boolean，String，Number），变量这时都是值的拷贝，不存在互相影响

### 属性的读取

如果使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理；数字键可以不加引号，其会自动转成字符串。

```javascript
var foo = 'bar';

var obj = {
  foo: 1,
  bar: 2
};

obj['foo']  // 1
obj[foo]  // 2
```

### 属性的增删改查

```javascript
var obj = {
  123: 'hello world', // 123会自动转成字符串
  'p': 'bar'
}

// 增
obj.new = "fine"
obj['new'] = 'fine'
// 删 - 只能删除对象本身的属性，无法删除继承的属性
delete obj.p
// 改
obj.p = 'foo'
// 查
obj['123']
obj.p
// 其他
Object.keys(obj); // 查看所有属性['123','p']
'p' in obj; // 查看属性是否存在 - 查询的属性不仅是自身的还包括继承的
obj.hasOwnProperty('p') // 查看属性是否存在 - 查询的属性仅仅是自身的

```

### 属性遍历

```javascript
// 遍历i为键名 - 不仅遍历对象自身属性，还遍历继承属性
for (var i in obj) {
  i
} 
// 一般情况下，都只想遍历对象自身属性，所以使用for...in时，应结合hasOwnProperty，在循环内部判断某个属性是否为对象自身的属性。
for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
```

### with语句可操作同一对象的多个属性

```javascript
with (对象) {
  语句;
}

// 举例
var obj = {
  p1: 1,
  p2: 2,
};
with (obj) {
  p1 = 4;
  p2 = 5;
}
// 等同于
obj.p1 = 4;
obj.p2 = 5;

// 注意，如果with区块内部有变量的赋值操作，必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量，而不是创建对象的内部属性
var obj = {};
with (obj) {
  p1 = 4;
  p2 = 5;
}
obj.p1 // undefined
p1 // 4
```

## 6、变量提升/函数提升

> 函数及变量的声明都将被提升到函数的最顶部，因此变量可以在使用后声明，也就是变量可以先使用再声明，同时可能会导致一些覆盖的情况。

```javascript
// 注意区分以下两个例子

console.log(a);
var a = 1;
// 上述结果为1

var a;
console.log(a);
a = 1;
// 上述结果为undefined
```

```javascript
function f() {
  console.log(1);
}
f() // 2，此处输出2是由于函数提升的原因
function f() {
  console.log(2);
}
f() // 2

// 注意函数表达式赋值情况则不同 - 采用赋值语句定义函数提升的只是变量名，函数是被赋值的
f();
var f = function (){};
// TypeError: undefined is not a function
// 等同于如下
var f;
f();
f = function () {};

// ！！！注意，同时采用function命令和赋值语句声明同一个函数，最后总是采用赋值语句的定义。
var f = function () {
  console.log('1');
}
function f() {
  console.log('2');
}
f() // 1
```

## 7、函数的作用域

> 函数的作用域与变量一样，就是其声明定义时所在的作用域，与其运行调用时所在的作用域无关。非常容易出错！！！

```javascript
// 举例1
var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f() // 1

// 举例2
var x = function () {
  console.log(a);
};

function y(f) {
  var a = 2;
  f();
}

y(x)
// ReferenceError: a is not defined
```

## 8、函数的参数传递是否改变原始值

传值传递 - 函数参数为原始类型的值（数值、字符串、布尔值），则在函数体内修改参数值，不会影响原始值。

传址传递 - 函数参数为复合类型的值（数组、对象、其他函数），则在函数体内修改参数值，会影响到原始值。

注意⚠️：如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值，赋值会指向另一个地址。

```javascript
# 举例
var obj = [1, 2, 3];

function f(o) {
  o = [2, 3, 4];
}
f(obj);

obj // [1, 2, 3]
```

## 9、不定数目参数的函数

> `arguments`对象包含了函数运行时的所有参数，`arguments[0]`就是第一个参数，`arguments[1]`就是第二个参数，以此类推。这个对象只有在函数体内部，才可以使用。

```javascript
# 正常模式下，arguments对象可以在运行时修改。
var f = function(a, b) {
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
}
f(1, 1) // 5
# 严格模式下，arguments对象修改不会影响到实际的函数参数。
var f = function(a, b) {
  'use strict'; // 开启严格模式
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
}
f(1, 1) // 2

# arguments不是数组，如果要让arguments对象使用数组方法，真正的解决方法是将arguments转为真正的数组。
var args = Array.prototype.slice.call(arguments);
```

## 10、立即调用的函数表达式IIFE

```javascript
// 写法 - 没有函数名
(function(){ /* code */ }());
// 或者
(function(){ /* code */ })();

// 当function开头时，为了让JavaScript 引擎将其理解成一个表达式，则需要加()，以下写法已经表示为表达式，则不需要在function(){ /* code */ }()外加（）
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();
```

IIFE的目的有两个：一是不必为函数命名，避免了污染全局变量；二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

```javascript
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());
```

立即执行函数表达式`IIFE`通常用于将相关功能分组到单个对象或`module`中。

```javascript
// IIFE返回一个对象motionModule,这个返回的对象包含所有的mixin行为作为对象的属性。
var motionModule = (function () {    
  return {    
    glideMixin: function (obj) {    
      obj.glide = function() {    
        console.log("在水面上滑翔");    
      };    
    },    
    flyMixin: function(obj) {    
      obj.fly = function() {    
        console.log("Flying, wooosh!");    
      };    
    }    
  }    
}) (); // 两个括号导致函数立即被执行
```

## 11、eval 命令和void运算符

> `eval`命令接受一个字符串作为参数，并将这个字符串当作语句执行。

基本不使用

> `void`运算符的作用是执行一个表达式，然后不返回任何值，或者说返回`undefined`。

```javascript
void(0) // undefined

var x = 3;
void (x = 5) //undefined
x // 5
```

## 12、数组的一些点

`delete`命令删除一个数组成员，会形成空位，并且不会影响`length`属性。(使用`length`属性遍历时要注意哦)

```javascript
var a = [1, 2, 3];
delete a[1];

a[1] // undefined
a.length // 3
```

⚠️空位和undefined不同哦！

如果是空位，使用数组的`forEach`方法、`for...in`结构、以及`Object.keys`方法进行遍历，空位都会被跳过。

```javascript
var a = [, , ,];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 不产生任何输出

// 空位的时候键名也不存在数组对象中
var arr = [];
arr[100] = 'a';
100 in arr // true
1 in arr // false
```

如果某个位置是`undefined`，遍历的时候就不会被跳过。

```javascript
var a = [undefined, undefined, undefined];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
});
// 0. undefined
// 1. undefined
// 2. undefined
```

数组判空要用length进行，不能直接使用arr===[]进行，相当于声明了一个新的空数组，内存空间不是同一块，所以不相等。

```javascript
const a = [];
console.log(a===[]); // false
console.log(a.length===0); // true
```

数组sort()方法是对数组中，每项的第一个字符的ASCII码进行排序，对于正负数均有的比较不能直接使用，会出错！！！

```javascript
const a = [-1, -3, -2, -5, -4, 2, 4];
a.sort(); // [-1, -2, -3, -4, -5, 2, 4]

// 应该自定义进行比较
function compare(e1,e2){
  return e1-e2;
}
a.sort(compare); // [ -5, -4, -3, -2, -1, 2, 4] 
```

## 13、运算符的一些点

算数运算符

> 指数运算符是右结合，而不是左结合。即多个指数运算符连用时，先进行最右边的计算。

```javascript
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
```

比较运算符

> 非相等运算符：比较的规则是先看两个运算子是否都是字符串，如果是的，就按照字典顺序比较（实际上是比较 Unicode 码点）；否则，将两个运算子都转成数值，再比较数值的大小，即使一个字符串也要把字符串转成数值。
>
> 严格相等运算符：同一类型的原始类型的值（数值、字符串、布尔值）比较时，值相同就返回`true`，值不同就返回`false`；两个复合类型（对象、数组、函数）的数据比较时，严格相等运算符不是比较它们的值是否相等，而是比较它们是否指向同一个地址；而大于或小于运算符比较的是值。
>
> 相等运算符：原始类型的值（数值、字符串、布尔值）会转换成数值再进行比较，两个字符串除外；对象（对象、数组、函数）与原始类型的值比较时，对象转换成原始类型的值，再进行比较。

> 注意，任何与`NaN`的比较均返回NaN，包括NaN自身；正`0`等于负`0`。`undefined`和`null`与自身严格相等。
>
> `undefined`和`null`与自身严格相等,`undefined`和`null`与其他类型的值比较时，结果都为`false`，它们互相比较时结果为`true`。

```javascript
undefined === undefined // true
null === null // true

false == null // false
false == undefined // false

0 == null // false
0 == undefined // false

undefined == null // true
```

布尔运算符

> 1、Boolean为false —— null, undefined, 0, '', false, NaN； 其他形式均为true。
>
> 2、⚠️特别容易出错！！！且运算符（`&&`）如果第一个运算子的布尔值为`true`，则返回第二个运算子的值（注意是值，不是布尔值）；如果第一个运算子的布尔值为`false`，则直接返回第一个运算子的值（注意是值，不是布尔值），且不再对第二个运算子求值。
>
> 3、或运算符（`||`）如果第一个运算子的布尔值为`true`，则返回第一个运算子的值，且不再对第二个运算子求值；如果第一个运算子的布尔值为`false`，则返回第二个运算子的值。

```javascript
// Boolean为false —— null, undefined, 0, '', false, NaN； 其他形式均为true。
```

余数运算符

> 余数运算符的运算结果的正负号由第一个运算子的正负号决定

```javascript
-1 % 2 // -1
1 % -2 // 1
```

右结合运算符

> 赋值运算符（`=`）和三元条件运算符（`?:`）、指数运算符`**`

```javascript
w = x = y = z;
w = (x = (y = z));

q = a ? b : c ? d : e ? f : g;
q = a ? b : (c ? d : (e ? f : g));

2 ** 3 ** 2;
2 ** (3 ** 2);
```

关于对象的运算

> 对象会先转为原始类型的值再进行运算。对象转换成原始类型的值，算法是先调用`valueOf`方法；如果返回的还是对象，再接着调用`toString`方法。

## 14、定时事件Timing Events

- setTimeout(*function*, *milliseconds*) - 在指定毫秒数后执行函数 - 1次执行
- clearTimeout() - 清除setTimeout
- setInterval(*function*, *milliseconds*) - 在指定毫秒数后执行函数 - 重复执行
- clearInterval() - 清除setInterval

```javascript
var myTimer = seTimeout(function(){ console.log('hello')},100)
clearTimeout(myTimer)
```

## 15、函数柯里化

> 接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数。

```javascript
// 普通的add函数
function add(x, y) {
    return x + y
}

// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}

add(1, 2)           // 3
curryingAdd(1)(2)   // 3
```

## 16、字符串转数值

> `parseInt`用于将字符串转为整数

易错点1:

如果字符串以`0x`或`0X`开头，`parseInt`会将其按照十六进制数解析

```javascript
parseInt('0x10') // 16
```

如果字符串以`0`开头，`parseInt`会将其按照十进制数解析

```javascript
parseInt('011') // 11
```

parseInt可以接受第二个参数来确定进制

```javascript
parseInt('1000', 10) // 1000
parseInt('1000', 2) // 8
parseInt('1000', 6) // 216
parseInt('1000', 8) // 512
```

注意这两个不同，若parseInt第一个参数为数字，也需要先将其转换为字符串在进行操作

```javascript
parseInt(011) // 9
parseInt('011') // 11

parseInt(011,2) // NaN - 等同于parseInt(String(011), 2)
parseInt('011',2) // 3
```

易错点2:

字符串数字能够转为科学计数法，则parseInt会将科学计数法的表示方法视为字符串

```javascript
parseInt(1000000000000000000000.5) // 1
// 等同于 parseInt('1e+21') // 1

parseInt(0.0000008) // 8
// 等同于 parseInt('8e-7') // 8
```

## 17、Boolean()对象

注意：构造函数`new Boolean(false)`在进行布尔运算的时候是true，因为被认为是一种对象，而不是布尔值false。区别`new Boolean(false)`和`Boolean(false)`。

```javascript
if (Boolean(false)) {
  console.log('true');
} // 无输出

if (new Boolean(false)) {
  console.log('true');
} // true

```

## 18、构造函数的一些点

1、基本方式

```javascript
var Vehicle = function () {
  this.price = 1000;
};
var v = new Vehicle();
```

2、如果构造函数内部有`return`语句，而且`return`后面跟着一个对象，`new`命令会返回`return`语句指定的对象；否则，就会不管`return`语句，返回`this`对象。如果对普通函数（内部没有`this`关键字的函数）使用`new`命令，则会返回一个空对象。

3、根据现有的对象而不是构造函数，利用Object.create() 创建实例对象

```javascript
var person1 = {
  name: '张三',
  age: 38,
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
};

var person2 = Object.create(person1);
```

## 19、定时器的一些点

如果回调函数是对象的方法，那么`setTimeout`使得方法内部的`this`关键字指向全局环境，而不是定义时所在的那个对象。

```javascript
var x = 1;

var obj = {
  x: 2,
  y: function () {
    console.log(this.x);
  }
};

setTimeout(obj.y, 1000) // 1，不是2，此时this指向全局环境

// 解决方法1 - 放入一个函数中
setTimeout(function () {
  obj.y();
}, 1000);

// 解决方法2 - bind函数绑定
setTimeout(obj.y.bind(obj), 1000)
```

## 20、JS文件加载 - defer和async

```javascript
// 一般来说，如果脚本之间没有依赖关系，就使用async属性，如果脚本之间有依赖关系，就使用defer属性。
// 如果同时使用async和defer属性，后者不起作用，浏览器行为由async属性决定。


// defer 等到 DOM 加载生成后，再执行脚本
<script src="a.js" defer></script>
<script src="b.js" defer></script>
// async 使用另一个进程下载脚本，下载时不会阻塞渲染。
<script src="a.js" async></script>
<script src="b.js" async></script>
```

## 21、URL协议与Javascript

> `javascript:`协议的常见用途是书签脚本 Bookmarklet。
>
> 由于浏览器的书签保存的是一个网址，所以`javascript:`网址也可以保存在里面，用户选择这个书签的时候，就会在当前页面执行这个脚本。为了防止书签替换掉当前文档，可以在脚本前加上`void`，或者在脚本最后加上`void 0`。

```javascript
<a href="javascript: void new Date().toLocaleTimeString();">点击</a>
<a href="javascript: new Date().toLocaleTimeString();void 0;">点击</a>
```

## 22、编程风格

数组：

```javascript
// 使用扩展运算符（...）拷贝数组
const a = [1,2,3,4];
cosnt b = [...a];
// 使用 Array.from 方法，将类似数组的对象转为数组
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```

对象：

```javascript
// 对象添加属性建议要使用Object.assign
const a = {};
Object.assign(a, { x: 3 });

// 对象的属性名是动态的，使用属性表达式定义
const obj = {
  name: 'San Francisco',
  [getKey('enabled')]: true,
};

// 对象的属性和方法采用简洁表达法
const atom = {
  ref,
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};
// 等同于
const atom = {
  ref: ref,
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};
```



------

如果发现本项目有错误，欢迎提交 issues 指正。

