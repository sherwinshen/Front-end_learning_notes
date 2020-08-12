# Javascript-入门笔记

## 1. 基础

### 1.1 添加JS文件的方法

内部：

```html
<script>
  // ...在此编写 JavaScript 代码  
</script>
```

外部：

> 如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 async。如果脚本需要等待解析，且依赖于其它脚本，调用这些脚本时应使用 defer，将关联的脚本按所需顺序置于 HTML 中，脚本将按照在页面中出现的顺序加载。

```html
<script src="script.js" async></script> 
<script src="script.js" defer></script>   
```

### 1.2 变量和常量

首先来明白三个定义：

- 全局作用域：定义的全局变量在整个程序中都是有定义的 
- 函数作用域：定义的变量只在声明的函数体以及其所嵌套的函数内有定义 
- 块级作用域：由let关键字已经，指let声明的变量只有语句块的作用范围 - {} 区域

**变量**

let  var 注意区别！

✍️ 没有使用关键字定义的变量，会被自动创建在全局作用域中，变成全局变量，即使在function中。

**常量**

常量使用 const，使用 const 声明的常量，在声明前无法使用，否则将会导致错误（暂时性死区），const 使用时必须初始化（即必须赋值），只能在块作用域里访问，而且不能修改。

易错点

```javascript
// a为局部变量，test为全局变量，这个需要注意！
function demo(){
    var a=test="hello";
}
```

## 2. 数据类型

* 基本数据类型 - null, undefined, number, boolean, string, symbol
* 引用对象类型 - Object, Function, Array, Date, RegExp, String, Boolean, Number

### 2.1 字符串

一些注意点：

1. 如果在引号里面使用相同的引号，则需要用 \ 进行转义。
2. 从代码编译的角度说的话，单引号在JS中被浏览器（IE，Chrome，Safari）编译的速度更快（在FireFox中双引号更快）。
3. 字符串 + 运算，前面两个以上为数值类型，则 + 作为数字运算符运算，直到遇到第一个字符串，则 + 又变成字符串拼接。

```javascript
var s1 = '123';
var s2 = 'abc';
var s3 = 1;
var s4 = 12;

var s5 = s1 + s2; // '123abc'
var s6 = s3 + s1; // '1123'
var s7 = s4 + s2; // '12abc'
var s8 = s3 + s4 + s1; // '13123'
var s9 = s3 + s4 + s1 + s3 + s4; // '13123112'
```

字符串操作:

```javascript
// 在字符串中查找子字符串
let a = 'mozilla';
let b = 'zilla';
let c = 'aaaa' 
a.indexOf(b) // 2
a.indexOf(c) // -1

// 提取字符串
let a = 'hello';
a.slice(0,3); // 'hel' - 不包括最后一个位置

// 替换字符串
let a = 'hello';
a = a.replace('hel','hhh'); // 'hhhlo' - replace不会改变原来的变量

// 查找字符串
str.indexOf("welcome"); // 返回字符串第一次出现的位置 

// 内容匹配
str.match("world"); // 若找到则返回这个匹配的字符串

// 替换内容
str.replace("Microsoft","w3cschool");  // 返回替换后的字符串

// 字符串分割
str.split('-');  
```

✍️ 直接使用字面量创建字符串与对象创建是不同的：

```javascript
const a = 'shen'
const b = 'shen'
const c = new String('shen')
console.log(a === b) // true
console.log(a === c) // false
```

### 2.2 Undefined 和 Null

1. undefined表示一个声明了没有赋值的变量，变量只声明的时候默认就是undefined。
2. null 的数据类型是 object，null表示一个空，变量值如果想变为null，必须手动设置。

```javascript
// undefined 表示“未定义”，下面是返回 undefined 的典型场景

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

### 2.3 布尔值

如果布尔对象无初始值或者其值为:

- 0
- -0
- null
- ""
- false
- undefined
- NaN 

那么对象的值为 false。否则，其值为 true（即使当自变量为字符串 "false" 时）！

### 2.4 数据类型转换

```javascript
// 1 数值->字符串
var a = 5; 
a.toString(); // '5'
String(a) // '5' 

// 2 布尔值->字符串
var a = true;
a.toString(); // 'true'
String(a) // '5'

// 3 字符串(数字)->数值
var a = '123';
Number(a); // 123
parseInt(a); // 123
// float识别到开头，后面有错误的就省去了 
parseFloat('1.23df'); // 1.23
parseFloat('1.2.3.4'); // 1.2

// 4 字符串(字母)->数值
var a = 'abc2';
Number(a); // NaN 无法转换
parseInt(a); // NaN 无法转换
parseFloat('h123'); // NaN 无法转换

// 5 null/undefined->数值
var a = null;
Number(a); // 0
parseInt(a); // NaN 无法转换
parseFloat(a); // NaN 无法转换
var b = undefined;
Number(b); // NaN 无法转换
parseInt(b); // NaN 无法转换
parseFloat(b); // NaN 无法转换

// 6 字符串/数值/null/undefined->布尔值
// 字符串只要有内容就为true
Boolean('0'); // true
Boolean('2'); // true
Boolean(''); // false
Boolean(' '); // true - 只要有空格就为true

// 数字除0之外均为真
Boolean(0); // false
Boolean(1); // true

Boolean(null); // false
Boolean(undefined); // false
```

## 3. 操作/运算符

**a++ / ++a**

操作符在变量前面，先自身运算，再进行其他运算；操作符在变量后面，先其他运算，再进行自身运算。

```javascript
var a = 5;
alert(a++); // 5
alert(a); // 6

var b = 6;
alert(++b); // 7

var c = 1;
alert(++c + c++); // 4 - 2+2

var d = 1;
alert(++d + ++d); // 5 - 2+3

var e = 1;
alert(e++ + ++e); // 4 - 1+3

var f = 1;
alert(f++ + f++); // 3 - 1+2
```

**逻辑运算**

<img src="./img/pic2.png" style="zoom:67%;" />

**运算符优先级**

<img src="./img/pic5.png" style="zoom:67%;" />

## 4. 语句

介绍三种语句：三元运算符、switch-case、do-while

- 三元运算符 `var a = 3 >= 5 ? 'yes' : 'no'`

- switch-case

```javascript
// switch-case的缺点在于case的值只能判断等于，而不能有其他判断，这个较if语句较弱
// break不写则会继续进行下一个case
switch(值){
    case 值1:
        code;
        break;
    case 值2:
        code;
        break;
    default:
        code;    
} 
// 举例
switch(grade){
   case 'A':
       alert('成绩A');
       break;
   case 'B':
       alert('成绩B');
       break;
   default:
       alert('不及格'); 
}
```

- do-while

```javascript
// 循环结构有三种：while、do-while、for
// 一般while循环解决无法确定循环次数的，能够确定循环次数的多采用for循环
do{
    code
}while(条件)
```

✍️ continue 和 break

1. break立即跳出整个循环，即循环结束，开始执行循环后面的内容（直接跳到大括号）
2. continue立即跳出当前循环，继续下一次循环

✍️ 还有一个非常容易被忽视的特性，**标签**，用于控制流，一个标签可以被用于 break , continue 语句去更精确地控制流。 通过标签可以跳出指定的循环，而不是仅仅就近原则循环。

```javascript
outerloop:   // This is the label name
    for (var i = 0; i< 5; i++){
        console.log("Outerloop: " + i + "<br />");
        innerloop:
            for (var j = 0; j < 5; j++) {
                if (j >  3 ) break ; // Quit the innermost loop
                if (i == 2) break innerloop; // Do the same thing
                if (i == 4) break outerloop; // Quit the outer loop
               console.log("Innerloop: " + j + "  <br />");
            }
    }
```

## 5. 数组

```javascript
// 自变量方式创建
var a = [];
var a = [1,'b'];

// 构造函数方式创建
var a = new Array();
var a = new Array(1,'b');

// 字符串->数组
let a = 'a,b,c,d'
let c = a.split(','); // ['a','b','c','d']

// 数组->字符串
let a = ['a','b','c','d']
let c1 = a.join('#'); // 'a#b#c#d'
let c2 = a.toString(); // 'a,b,c,d'

// 添加和删除
// 数组末尾添加或删除一个项目
a.push() // 返回值为添加元素后的长度
a.pop() // 返回值为最后一个删除的元素
// 数组开始添加或删除一个项目
a.unshift("William") // 返回值为添加元素后的长度
a.shift() // 返回值为第一个删除的元素
```

## 6. 函数

### 6.1 函数声明

```javascript
// 1、function 命令
function print(s) {
  console.log(s);
}

// 2、函数表达式
var print = function(s) {
  console.log(s);
};

// 3、函数对象 - 几乎不使用
// Function构造函数接受任意数量的参数，但只有最后一个参数会被当做函数体，如果只有一个参数，该参数就是函数体。
var add = new Function(
  'x',
  'y',
  'return x + y'
);
```

### 6.2 匿名函数与自调用函数

```javascript
// 匿名函数
// 将匿名函数赋值给一个变量，通过变量进行调用
var functionName = function(){
    alert();
}
functionName();

// 自调用函数
// 不使用变量来表示匿名函数，则可用自调用来执行，其主要作用是防止全局变量污染
(function(){
    alert();
})()
```

## 7. 对象

### 7.1 对象声明

```javascript
// 方法一：自变量声明
// {}进行构造，里面的属性和方法采用键值对的方法
var objet = {};
var objet = {name:'shen', age:12, hanshu:function(){}};

// 方法二：实例化声明
var object = new Object();

// 方法三：自定义构造函数
function Fun(firstname,lastname){
    this.firstname=firstname;
    this.lastname=lastname;
    function changeName(name){
           this.lastname=name;
     }
}
var f = new Fun("Shen","Wei"); 
```

### 7.2 this

具体详见 - [this指向]()

### 7.3 对象遍历

```javascript
// for...in循环，语法：for(键 in 对象)
var obj = {
    a:'123',
    b:'456',
    c:'789'
}
for(let k in obj){
  if(obj.hasOwnProperty(k)){
    console.log(obj[k])
  }
}
```

### 7.4 包装对象

**数学对象常用：**

```javascript
// 绝对值
Math.abs(n);
// 最大整数
Math.floor(n);
// 0-1随机数
Math.random();
// 0-8随机数
Math.random()*8
// 0-n随机整数
Math.floor(Math.random()*n)
// n-m的随机整数
Math.floor(Math.random()*(m-n)+n)
```

**日期对象常用：**

```javascript
// 实例化构造函数获取时间对象
var date = new Date();
var date = new Date(1498099002345); // 毫秒数
var date = new Date('2019-07-12'); // 日期格式字符串
var date = new Date(2019,4,1); // 年、月、日（月份从0开始）
// 获取年份/月份/日期/小时....
date.getFullYear();
date.getMonth(); // 0-11
date.getDate(); // 当月第几天
date.getDay(); // 0-Sunday 6-Saturday
date.getHours(); // 0-23
date.getMinutes(); // 0-59
date.getSeconds(); // 0-59
date.getTime(); // 毫秒值
// 日期格式化
toString(); // 转成字符串
valueOf(); // 获取毫秒值
```

**数组对象常用：**

```
var a = [1, 2, 3, 4, 5, 6, 7];
// 添加 - 末尾
a.push(n);
// 删除 - 末尾
a.pop(n);
// 数组拷贝slice(begin, end) - 原数组不会被改变
a.slice(2,4); // [3, 4] - end对应的返回
// 合并数组并返回新数组，即不改变原数组
newArray = array1.concat(array2);
// 数组的元素连接成一个字符串并返回这个字符串，字符串用指定分隔符分割
array.join(); // 无设置则默认,分割
array.join('-'); // '1-2-3-4-5-6-7'
```

**字符串对象常用：**

```javascript
// 返回字符串中字符的下标 - 第一个符合
string1.indexOf('a');
// 返回指定开始位置和字符数的字符
string2.substr(开始位置，字符数)；
// 字符串全部小写(大写同理)
string3.toLowerCase();
// 字符串中字母替换 - 返回一个新字符串，原始字符串不改变
string4.replace(正则表达式，替换字符串)； // string4.replece('ab','kl')即string4中ab替换成kl
```

## 8. 面向对象编程

```javascript
// 创建对象举例1
// 一般一个构建函数通常是大写字母开头，这样便于区分构建函数和普通函数。
function Person(name) {
  this.name = name;
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name.first + '.');
  };
}
// new表示创建一个对象
var person1 = new Person('Bob');
var person2 = new Person('Sarah');
// 访问对象
person1.greeting()
person1.name

// 创建对象举例2
var person1 = new Object();
person1.name = 'Chris';
person1['age'] = 38;
person1.greeting = function() {
  alert('Hi! I\'m ' + this.name + '.');
}

// 创建对象举例3
var person1 = new Object({
  name : 'Chris',
  age : 38,
  greeting : function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
});
```