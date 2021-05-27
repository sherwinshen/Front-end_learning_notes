# 基础知识

{% hint style="info" %}
本文所谓的基础知识只包含重点内容和易错点，简单或常见知识点已省略。具体可详见参考资料：[JavaScript 教程（网道）](https://wangdoc.com/javascript/) [ES6 标准入门教程（网道）](https://wangdoc.com/es6/)
{% endhint %}











## 0. 基础

**如何引入 JS 代码？**

如果在 HTML 中引入 JavaScript 代码，则通过`<script></script>`包裹；如果在 HTML 中引入 JavaScript 文件，则通过`<script src="文件地址"></script>`引入。

{% hint style="info" %}
如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 async；如果脚本需要等待解析，且依赖于其它脚本，调用这些脚本时应使用 defer，将关联的脚本按所需顺序置于 HTML 中，脚本将按照在页面中出现的顺序加载。

```markup
<!-- defer 异步下载 JS 文件不阻塞 DOM 解析，HTML 标签解析完成后按顺序执行 JS 文件 -->
<script src="文件地址" defer></script>

<!-- async 异步下载 JS 文件不阻塞 DOM 解析，当下载完阻塞 DOM 解析转而执行 JS 文件 -->
<script src="文件地址" async></script>
```
{% endhint %}

**JavaScript 的组成？**

* ECMAScript：JavaScript 的语法标准，包括变量、表达式、运算符、函数、if/for语句等；
* 浏览器环境：
  * DOM：Document Object Model（文档对象模型），操作页面上的元素的API，比如让盒子移动、变色、改变大小、轮播图等等；
  * BOM：Browser Object Model（浏览器对象模型），操作浏览器部分功能的API，比如弹框、控制浏览器跳转、获取浏览器分辨率等等。
* Node.js 环境
* ......

## 1. 变量/常量

在 ES5 语法时，统一使用`var`关键字来声明一个变量；在ES6语法及之后，可以使用 `const`、`let`关键字来声明一个变量。`let`声明的变量只有语句块的作用范围；常量使用`const`声明，在声明前无法使用，否则将会导致错误（暂时性死区），`const`使用时必须初始化（即必须赋值），只能在块作用域里访问，而且不能修改。注意，`var`存在变量提升。

```javascript
var a = 100; // ES5语法

const b = hello; // ES6 语法
let b = world; // ES6 语法
```

{% hint style="warning" %}
易错点：

```javascript
// a 为局部变量，test为全局变量，这个需要注意！
function demo(){
    var a=test="hello";
}
```
{% endhint %}

## 2. 数据类型

**基本数据类型**：参数赋值的时候，传数值

* String 字符串
* Number 数值
* Boolean 布尔值
* null 空值
* undefined 未定义
* symbol

**引用数据类型**：参数赋值的时候，传地址

* Object 对象（Function, Array, Date, RegExp, String, Boolean, Number, Error 等）

### 2.1 易错点

如果在引号里面使用相同的引号，则需要用 \ 进行转义。

```javascript
const a = 'he\'s' // he's
```

字符串 + 运算，如果前面两个以上为数值类型，则 + 作数字运算，直到遇到第一个字符串，则 + 又变成字符串拼接。

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

直接使用字面量创建字符串与对象创建是不同的。

```javascript
const a = 'shen'
const b = 'shen'
const c = new String('shen')
console.log(a === b) // true
console.log(a === c) // false
```

undefined表示一个声明了没有赋值的变量，变量只声明的时候默认就是undefined；null 的数据类型是 object，null 表示一个空，变量值如果想变为 null，必须手动设置。

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

如果布尔对象无初始值或者其值为0、-0、null、undefined、""、NaN、false，则对象的值为 false。否则，其值为 true（即使当自变量为字符串 "false" 时）！

```javascript
console.log('false' === false) // false
```

### 2.2 数据类型转换/识别

{% page-ref page="js-topics/data-type.md" %}

## 3. 操作/运算符

### 3.1 自增和自减

* **a++**：先把 a 的值赋值给表达式，然后 a 再自增
* **++a**：a 先自增，然后再把自增后的值赋值给表达式

```javascript
var a = 5;
alert(a++); // 5
alert(a); // 6

var b = 6;
alert(++b); // 7

var c = 1;
alert(++c + c++); // 4：2+2

var d = 1;
alert(++d + ++d); // 5：2+3

var e = 1;
alert(e++ + ++e); // 4：1+3

var f = 1;
alert(f++ + f++); // 3：1+2
```

### 3.2 逻辑运算的妙用

**与运算**的返回结果：（以多个非布尔值的运算为例）

* 如果第一个值为false，则执行第一条语句，并直接返回第一个值；不会再往后执行。
* 如果第一个值为true，则继续执行第二条语句，并返回第二个值（如果所有的值都为true，则返回的是最后一个值）。

**或运算**的返回结果：（以多个非布尔值的运算为例）

* 如果第一个值为true，则执行第一条语句，并直接返回第一个值；不会再往后执行。
* 如果第一个值为false，则继续执行第二条语句，并返回第二个值（如果所有的值都为false，则返回的是最后一个值）。

{% hint style="info" %}
在实际开发中，经常用到这种写法，是一种很好的「容错、容灾、降级」方案。
{% endhint %}

```javascript
const a1 = 'qianguyihao';
a1 && alert('看 a1 出不出来'); // 第一个值为true，会继续执行后面的内容，可以弹出 alert 框
const a2 = undefined;
a2 && alert('看 a2 出不出来'); // 第一个值为false，不会继续执行后面的内容，不会弹出 alert 框

const msg = result || '活动太火爆，请稍后再试'; // 优先用 result 字段，其次用定义的文本
```

### 3.3 非数值的比较

* 对于非数值进行比较时，会将其转换为数字然后再比较。
* 如果符号两侧的值都是字符串时，**不会**将其转换为数字进行比较，而是比较**Unicode编码**。
* 任何值和NaN做任何比较都是false。

### 3.4 运算符优先级

优先级从高到低：

* `()`
* `++`、`--`
* `!`、`~`、`+`（单目）、`-`（单目）、`typeof`、`void`、`delete`
* `%`、`*`、`/`
* `+`（双目）、`-`（双目）
* `<<`、`>>`、`>>>`
* `<`、`<=`、`>`、`>=`
* `==`、`!==`、`===`、`!==`
* `&`、`^`、`|`、`&&`、`||`
* `?:`
* `=`、`+=`、`-=`、`*=`、`/=`、`%=`、`<<=`、`>>=`、`>>>=`、`&=`、`^=`、`|=`
* `,`

## 4. 语句

if 语句推荐使用 return 的写法

```javascript
let retCode = 1003; // 返回码 retCode 的值可能有很多种情况

// 不推荐写法
function handleRetCode(retCode) {
    if (retCode == 0) {
        alert('接口联调成功');
    } else if (retCode == 101) {
        alert('活动不存在');
    } else if (retCode == 103) {
        alert('活动未开始');
    } else {
        alert('系统君失联了，请稍候再试');
    }
}


// 推荐写法
function handleRetCode(retCode) {
   if (retCode == 0) {
        alert('接口联调成功');
        return;
    }

    if (retCode == 101) {
        alert('活动不存在');
        return;
    }

    if (retCode == 103) {
        alert('活动未开始');
        return;
    }
    
    alert('系统君失联了，请稍候再试');
    return;
}
```

switch-case 的缺点在于 case 的值只能判断等于，而不能有其他判断，这个较 if 语句较弱，且 break 不写则会继续进行下一个 case。

```javascript
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

循环结构有三种：while、do-while、for，一般while循环解决无法确定循环次数的，能够确定循环次数的多采用 for 循环。

```javascript
for(初始化表达式; 条件表达式; 更新表达式){
	语句...
}

while(条件表达式){
	语句...
}

do{
	语句...
}while(条件表达式)
```

continue 和 break

* break立即跳出整个循环，即循环结束，开始执行循环后面的内容（直接跳到大括号）
* continue立即跳出当前循环，继续下一次循环

还有一个非常容易被忽视的特性"**标签"**，用于控制流，一个标签可以被用于 break , continue 语句去更精确地控制流。 通过标签可以跳出指定的循环，而不是仅仅就近原则循环。

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

## 5. 函数

### 5.1 函数声明

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

{% hint style="info" %}
知识点：自调用函数 

```javascript
// 不使用变量来表示匿名函数，则可用自调用来执行，其主要作用是防止全局变量污染
(function(){
    alert();
})()
```
{% endhint %}

{% hint style="warning" %}
fn\(\) 和 fn 的区别

* `fn()`：调用函数，调用之后，还获取了函数的返回值。
* `fn`：函数对象，相当于直接获取了整个函数对象。
{% endhint %}

### 5.2 类数组 arguments

在调用函数时，浏览器每次都会传递进两个隐含的参数：

* 函数的上下文对象 this
* **封装实参的对象** arguments

arguments 是一个类数组对象，在调用函数时，我们所传递的实参都会在 arguments 中保存。

* arguments.length：返回函数实参的个数
* arguments\[0\] = 99：arguments 可以修改元素
* arguments 是类数组对象，可以遍历，但不具有数组的 push\(\)、pop\(\) 等方法

## 6. 对象

在 JavaScript 中，对象具有**特征**（属性）和**行为**（方法），其是是一组**无序**的相关属性和方法的集合。对象主要包括以下几类：

* 内置对象（ES标准中定义的对象）
* 宿主对象（如浏览器提供的对象）
* 自定义对象（开发人员自定义对象）

### 6.1 自定义对象

```javascript
// 方法一：自变量声明
// {}进行构造，里面的属性和方法采用键值对的方法
var objet = {};
var objet = {name:'shen', age:12, hanshu:function(){}};

// 方法二：实例化声明
var object = new Object();
object.name = 'shen';

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

### 6.2 对象遍历

```javascript
for  (const value of 对象) {
  console.log('属性:' + value);
}

for (const key in 对象) {
  console.log('键名:' + key);
}
```

### 6.3 构造函数

构造函数是一种特殊的函数，主要用来创建和初始化对象，也就是为对象的成员变量赋初始值，普通函数是直接调用，而构造函数需要使用 `new` 关键字来调用。

```javascript
function Fun(firstname,lastname){
  // 实例属性
  this.firstname=firstname;
  this.lastname=lastname;
  // 实例方法
  this.changeName = (name) => {
    this.lastname=name;
  }
}

// 静态属性
Fun.a = 'shen'
// 静态方法
Fun.getA = () => {
  return 'hello'
}

var f = new Fun("Shen","Wei"); 
```

{% hint style="warning" %}
注意区分静态成员与实例成员

* 静态成员：在构造函数上添加的成员称为静态成员，只能由构造函数本身访问。
* 实例成员：在构造函数内部创建的对象成员称为实例成员，只能由实例化的对象访问。
{% endhint %}



{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

