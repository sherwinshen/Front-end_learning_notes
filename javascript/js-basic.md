# 基础知识

{% hint style="info" %}
本文所谓的基础知识只包含重点内容和易错点，简单或常见知识点已省略。完整 JavaScript 内容可详见参考资料：[JavaScript 教程（网道）](https://wangdoc.com/javascript/) [ES6 标准入门教程（网道）](https://wangdoc.com/es6/)
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

### 1.1 变量声明

* ES5 中，使用 `var` 定义**全局变量**（如今开发中尽量不要出现`var`了）。
* ES6 中，使用`let`定义**局部变量**，使用`const`定义**常量。**

**var、let、const 的区别**

* var 声明的变量会挂载在 window 对象上（会污染），而 let 和 const 声明的变量不会

```javascript
var a = '我是a';
let b = '我是b';
let c = '我是c';

console.log(window.a); // 打印结果：我是a
console.log(window.b); // 打印结果：undefined
console.log(window.); // 打印结果：undefined
```

* var 声明的变量存在变量提升，let 和 const 声明的变量不存在变量提升，要先声明再使用

```javascript
console.log(a); // 打印结果：undefined ==> a已经声明但没有赋值
var a = '我是a';

console.log(b); // 报错：Uncaught ReferenceError: Cannot access 'b' before initialization ==> 找不到b这个变量
let b = '我是b';

console.log(c); // 报错：Uncaught ReferenceError: Cannot access 'c' before initialization ==> 找不到c这个变量
const c = '我是c';
```

* var 声明不存在块级作用域，let 和 const 声明存在块级作用域

```javascript
{
  var a = '我是a';
  let b = '我是b';
  const c = '我是c';
}

console.log(a); // 我是a
console.log(b); // 报错：Uncaught ReferenceError: b is not defined ==> 找不到b这个变量
console.log(c); // 报错：Uncaught ReferenceError: c is not defined ==> 找不到c这个变量
```

* 同一作用域下，var 可以重复声明变量，let 和 const 不能重复声明变量

```javascript
var a = '我是a';
var a = 'qianguyihao';
console.log(a); // 打印结果：qianguyihao

let b = '我是b';
let b = 'qianguyihao';
console.log(b); //报错：Uncaught SyntaxError: Identifier 'b' has already been declared  ==> 变量 b 已经被声明了

const c = '我是c';
const c = 'qianguyihao';
console.log(c); //报错：Uncaught SyntaxError: Identifier 'c' has already been declared  ==> 变量 c 已经被声明了
```

* let 和 const 存在暂时性死区（声明语句必须放在使用之前）

```javascript
const name = 'qianguyihao';

function foo() {
    console.log(name);
    const name = 'hello';
}

foo(); // 执行函数后，控制台报错：Uncaught ReferenceError: Cannot access 'name' before initialization
```

* const 一旦声明必须赋值，声明后不能再修改（当然如果是对象类型则另说）

```javascript
const a;
console.log(a); // 报错：Uncaught SyntaxError: Missing initializer in const declaration
```

### 1.2 解构赋值

ES6 允许按照一一对应的方式，从数组或者对象中**提取值**，再将提取出来的值赋值给变量。解构赋值的拷贝是浅拷贝，如果一个键的值是复合类型的值（数组、对象、函数），那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

**数组的解构赋值**

```javascript
// 数组解构 - 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [x, , y] = [1, 2, 3];
let [head, ...tail] = [1, 2, 3, 4];
let [a, b='world'] = ['hello']
```

{% hint style="warning" %}
易错点：

* 如果变量在一一对应没有找到对应值，那么多余的变量会被赋值为 undefined
* 解构赋值时，左边允许有默认值，但在没匹配到的情况下才使用
* 右边存在`undefined`时，左边则使用默认值；若右边存在`null`时，左边则为`null`，相当于有值
{% endhint %}

**对象的解构赋值**

```javascript
// 一般变量必须与属性同名才能取到正确的值
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
const { log } = console; log('hello');

// 变量不同名情况赋值
let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

// 嵌套结构注意找到同名属性才赋值
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};
let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]
```

**字符串的解构赋值**

```javascript
// 字符串也是可以被解构赋值的，此时字符串被转换成了一个类似数组的对象
const [a, b, c, d] = 'hello';
console.log(a); // h
console.log(b); // e
console.log(c); // l，一一对应而不是剩余的都会赋值给最后一个
```

**函数参数的解构赋值**

```javascript
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b); // [ 3, 7 ]
```

**应用**

```javascript
// 交换变量的值
let x = 1;
let y = 2;
let [x,y] = [y,x]

// 从函数返回多个值
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();

// 函数参数的定义
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});

// 提取 JSON 数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;

// 遍历 Map 结构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
// 获取键名/键值
for (let [key, value] of map) {
  // ...
}
// 获取键名
for (let [key] of map) {
  // ...
}
// 获取键值
for (let [,value] of map) {
  // ...
}

// 输入模块的指定方法 - 加载模块时，往往需要指定输入哪些方法
const { SourceMapConsumer, SourceNode } = require("source-map");
```

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

{% hint style="info" %}
JS 提供了 String/Boolean/Number 这三个基本包装对象，一般情况我们不会去使用这个基本包装对象的，其主要作用是当我们对一些基本数据类型的值去调用属性和方法时，浏览器会**临时使用包装类将基本数据类型转换为引用数据类型**，这样的话，基本数据类型就有了属性和方法，然后再调用对象的属性和方法；调用完以后，再将其转换为基本数据类型。例如`'abc'.length`字符串本身是没有属性和方法的。
{% endhint %}

### 2.1 数据类型转换/识别

{% page-ref page="js-topics/data-type.md" %}

### 2.2 符号 Symbol

Symbol 是一种新的原始数据类型，每一个 Symbol 值都是不相等的，主要用作对象属性名\(作为标识符\)，可以保证不会与其他属性名产生冲突，Symbol 值通过 Symbol 函数生成，`let s = Symbol();`。

```javascript
// Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，但不代表symbol的值，相同参数的Symbol函数的返回值是不相等的。
let s1 = Symbol('foo');
let s2 = Symbol('foo');
s1 === s2 // false

// Symbol 值可以显式转为字符串，也可以转为布尔值，但是不能转为数值。
let sym = Symbol('My symbol');
String(sym) // 'Symbol(My symbol)'
Boolean(sym) // true
Number(sym) // TypeError

// Symbol 值作为对象属性名时，不能用点运算符，也不需要加引号
let mySymbol = Symbol();
let a = {
  [mySymbol]: 'Hello!'
};
a[mySymbol] // "Hello!"
```

Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。但是`Object.getOwnPropertySymbols()`方法，可以获取指定对象的所有 Symbol 属性名，`Reflect.ownKeys()`方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

```javascript
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Object.getOwnPropertySymbols(obj) // [Symbol(my_key)]
Reflect.ownKeys(obj) //  ["enum", "nonEnum", Symbol(my_key)]
```

`Symbol.for()` 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。`symbol()` 不会搜索是否存在给定key值的symbol，直接创建新的symbol值。

```javascript
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```

`Symbol.keyFor()`方法返回一个已登记的 Symbol 类型值的`key`，注意通过symbol\(\)生成的不登记，因此不适用。

```javascript
let s1 = Symbol.for('foo');
Symbol.keyFor(s1) // 'foo'

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

### 2.3 ES6 Set/Map

#### 2.2.1 Set

Set 类似于数组，但是成员的值都是唯一的，没有重复的值。

{% hint style="info" %}
常见应用：

* 数组去重
* 存储用户搜索记录不需要重复数据，可以用 Set 来存储用户的搜索记录
* ......
{% endhint %}

```javascript
const set = new Set([1, 2, 3, 4, 4]);
[...set] // [1,2,3,4]

// 数组去重
[...new Set(array)];
Array.from(new Set(array));

// 字符串去重
[...new Set('ababbc')].join('');

// 并集，交集，差集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]);
// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// 差集
let difference = new Set([...a].filter(x => !b.has(x)));

// 遍历改变 set 结构
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
set = new Set(Array.from(set, val => val * 2));
```

属性：

* `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
* `Set.prototype.size`：返回`Set`实例的成员总数。

实例方法：

* `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
* `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
* `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
* `Set.prototype.clear()`：清除所有成员，没有返回值。

遍历操作 - `keys`方法和`values`方法的行为完全一致：

* `Set.prototype.keys()`：返回键名的遍历器，
* `Set.prototype.values()`：返回键值的遍历器
* `Set.prototype.entries()`：返回键值对的遍历器
* `Set.prototype.forEach()`：使用回调函数遍历每个成员

#### 2.2.2 Map

类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键，Map 结构提供了“值—值”的对应。

```javascript
// 举例
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false

// 常用：Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

// Map结构还是较为方便转化为数组
[...map.keys()] // [1, 2, 3]
[...map.values()] // ['one', 'two', 'three']
[...map.entries()] // [[1,'one'], [2, 'two'], [3, 'three']]
[...map] // [[1,'one'], [2, 'two'], [3, 'three']]

// 利用数组方法遍历
const map1 = new Map([...map0].filter(([k, v]) => k < 3));
const map2 = new Map([...map0].map(([k, v]) => [k * 2, '_' + v]));
```

**Map 与其他数据之间的转换**

* Map 与数组

```javascript
// Map转数组 - 扩展运算符
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]

// 数组转Map - 二维数组
new Map([[true, 7],[{foo: 3}, ['abc']]])
```

* Map 与对象

```javascript
// Map转为对象 - Map遍历
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}
const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)

// 对象转为Map
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
objToStrMap({yes: true, no: false})
```

* Map 与 JSON

```javascript
// Map转为JSON - 键名都是字符串 - Map转对象转对象JSON
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap) // '{"yes":true,"no":false}'

// Map转为JSON - 键名不都是字符串 - Map转数组JSON
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap) // '[[true,7],[{"foo":3},["abc"]]]'

// JSON转为Map - JSON转对象转Map
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"yes": true, "no": false}')
```

#### 2.2.3 WeakSet 和 WeakMap

`WeakSet`的成员只能是对象，而不能是其他类型的值。WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用。WeakSet 不能遍历，也没有`size`属性。

`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。`WeakMap`的键名所指向的对象，不计入垃圾回收机制。WeakMap不能遍历，也没有`size`属性。

### 2.4 易错点

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

{% hint style="info" %}
函数的作用域在**函数定义**时，就已经确定了，查找时采用的是**就近原则**。
{% endhint %}

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

{% hint style="warning" %}
注意，函数如果通过`function fun(){}`形式声明，则整个函数会在所有的代码执行之前就被创建完成，即声明提升，而函数如果通过`const fun = () => {}`形式声明，则不存在声明提升，需要先声明再使用。
{% endhint %}

{% hint style="info" %}
如果函数内部修改的不是参数对象的某个属性，而是替换整个参数，这样不会影响到原始值，赋值会指向另一个地址。

```javascript
// 举例
var obj = [1, 2, 3];

function f(o) {
  o[1] = 8
  o = [2, 3, 4];
}
f(obj);

obj // [1, 8, 3]
```
{% endhint %}

### 5.2 箭头函数

```javascript
var res = num1 => num1;
var res = (num1, num2) => num1 + num2;
var res = (num1, num2) => { return num1 + num2; }
```

1. 如果返回对象，需要再加一层 \(\)，否则花括号被解释为代码块 `let getTempItem = id => ({ id: id, name: "Temp" });`
2. 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。
3. 不可以当作构造函数，也就是说，不可以使用`new`命令。
4. 不可以使用`arguments`对象，该对象在函数体内不存在，但可以通过剩余运算符来弥补。
5. 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

```javascript
//箭头函数this指向函数定义生效时所在的对象（本例是{id: 42}），如果是普通函数this使用时是在100毫秒后，也就会指向全局对象，此时结果为21
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
var id = 21;
foo.call({ id: 42 });
​
// 箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。等同于下方。arguments、super、new.target等箭头函数均没有自己的，都是外层代码块的。
function foo(){
  var _this = this;
  setTimeout(() => {
    console.log('id:', _this.id);
  }, 100);
}
```

### 5.3 默认值设置

```javascript
// 传统写法
function fn(param) {
    let p = param || 'hello';
    console.log(p);
}

// 默认值设置
function fn(param = 'hello') {
    console.log(p);
}
```

函数设置默认值，函数的 length 属性，将返回没有指定默认值的参数个数。

```javascript
(function (a, b, c = 5) {}).length // 2
```

与解构赋值同用时需要注意 - 函数参数的默认值先生效，然后解构赋值的默认值生效。

```javascript
// 写法一：参数的默认值是空对象，但是设置了对象解构赋值的默认值
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二：参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]
// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]
// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]
// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]
m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```

### 5.4 ... 剩余运算符

剩余参数允许我们将不确定数量的剩余的元素放到一个数组中，其区别于arguments变量，arguments对象是类似数组，需要先将其转变为数组 Array.prototype.slice.call\(\)。

```javascript
function fn1(first, ...args) {
    console.log(first); // 10
    console.log(args); // 数组：[20, 30]
}

fn1(10, 20, 30);
```

{% hint style="warning" %}
扩展运算符和剩余参数是相反的。剩余参数是将剩余的元素放到一个数组中；而扩展运算符是将数组或者对象拆分成逗号分隔的参数序列，例如`...[1,2,3]`得到的就是`1 2 3`这个序列。
{% endhint %}

### 5.5 类数组 arguments

在调用函数时，浏览器每次都会传递进两个隐含的参数：

* 函数的上下文对象 this
* **封装实参的对象** arguments

arguments 是一个类数组对象，在调用函数时，我们所传递的实参都会在 arguments 中保存。

* arguments.length：返回函数实参的个数
* arguments\[0\] = 99：arguments 可以修改元素
* arguments 是类数组对象，可以遍历，但不具有数组的 push\(\)、pop\(\) 等方法，需要通过 \[...arguments\] 或 Array.from\(arguments\) 进行转化为数组

### 5.6 立即调用的函数表达式 IIFE

```javascript
// 写法 - 没有函数名
(function(){ /* code */ }());
// 或者
(function(){ /* code */ })();
```

IIFE的目的有两个：一是不必为函数命名，避免了污染全局变量；二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

```javascript
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());
```

### 5.7 构造函数

构造函数是一种特殊的函数，主要用来创建和初始化对象，也就是为对象的成员变量赋初始值，普通函数是直接调用，而构造函数需要使用 `new` 关键字来调用。

{% hint style="info" %}
构造函数可结合 [Class 类](js-basic.md#7-class-lei) 阅读
{% endhint %}

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

## 6. 对象

在 JavaScript 中，对象具有**特征**（属性）和**行为**（方法），其是是一组**无序**的相关属性和方法的集合。对象主要包括以下几类：

* 内置对象（ES标准中定义的对象）
* 宿主对象（如浏览器提供的对象）
* 自定义对象（开发人员自定义对象）

### 6.1 ES6 属性扩展

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。

```javascript
// 变量
const foo = 'bar';
// 函数
function getItem (key) {
  return key in ms ? ms[key] : null;
}
// 简写-1  
const obj1 = {foo,getItem};
// 简写-2
const obj2 = {
  foo,
  getIte(key){return key in ms ? ms[key] : null;}
}
```

ES6中允许用表达式作为对象的属性名，方法名也适用，但是属性名表达式与简洁表示法，不能同时使用，方法名无关。

```javascript
let lastWord = 'last';

const a = {
  'first word': 'hello',
  [lastWord]: 'world',
  ['h' + 'ello']() {
    return 'hi';
  }
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last'] // "world"
```

### 6.2 对象属性遍历

* `for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性） - 由于引入继承，不建议使用
* `Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
* `Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
* `Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有 Symbol 属性的键名。

### 6.3 自定义对象

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

### 6.4 Object 对象

{% page-ref page="js-objects/object.md" %}

## 7. Class 类

传统生成实例对象是通过构造函数实现，引入了 Class（类）这个概念，可以通过`class`关键字定义类。实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上），类的所有方法都定义在类的`prototype`属性上面，如下面的 toString。

```javascript
class Point {
  constructor(x, y) { // 构造方法
    this.x = x;
    this.y = y;
  }

  toString() { // 自定义方法
    return '(' + this.x + ', ' + this.y + ')';
  }
}

const p = new Point(x,y)

// 等同于
Point.prototype = {
  constructor() {},
  toString() {}
};
```

对某个属性设置存值函数和取值函数可以拦截该属性的存取行为：

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: ' + value);
  }
}

let inst = new MyClass();
inst.prop = 123; // setter: 123
inst.prop // 'getter'
```

### 7.1 静态成员/公有成员

```javascript
class User {
    constructor() {
        // 公有属性
        this.name = 'Sherwin'
        this.age = 24
    }

    // 公有方法
    getName() {
        console.log(this.name)
    }

    // 静态方法
    static getAge() {
        console.log(this.age) // 不能使用公有属性和方法
    }
}

// 静态属性
User.hobby = 'swimming'

const user = new User()
console.log(user.name) // 实例使用公有属性
user.getName() // 实例使用公有方法
console.log(User.hobby) // 类使用静态属性
User.getAge() // 类使用静态方法
```

{% hint style="info" %}
[私有属性和方法](https://wangdoc.com/es6/class.html#%E7%A7%81%E6%9C%89%E6%96%B9%E6%B3%95%E5%92%8C%E7%A7%81%E6%9C%89%E5%B1%9E%E6%80%A7)目前仍在提案中，暂不说明。
{% endhint %}

### 7.2 Class 继承

{% page-ref page="js-topics/prototype.md" %}

## 8. Proxy 对象

Proxy 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。具体的拦截操作详见 [ES6 - proxy](https://es6.ruanyifeng.com/#docs/proxy)。

```javascript
// 用法 - target参数表示所要拦截的目标对象，handler参数用来定制拦截行为(也是对象)
var proxy = new Proxy(target, handler);
​
// 举例
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
```

## 9. Iterator 遍历器

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口，即`for...of`；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。

原生具备 Iterator 接口的数据结构：

* Array
* Map
* Set
* String
* TypedArray
* 函数的 arguments 对象
* NodeList 对象

调用 Iterator 接口的场合：

* 解构赋值
* 扩展运算符
* yield\*
* for...of
* Array.from\(\)
* Map\(\), Set\(\), WeakMap\(\), WeakSet\(\)（比如`new Map([['a',1],['b',2]])`）
* Promise.all\(\)
* Promise.race\(\)

```javascript
// 数组
const arr = ['red', 'green', 'blue'];
for(let v of arr) {
  console.log(v); // red green blue
}
// 注意原本的for...in循环只能获得键名，不能获得键值
for (let a in arr) {
  console.log(a); // 0 1 2
}
​
// Set
const engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (let e of engines) {
  console.log(e); // // Gecko Trident Webkit
}
​
// Map - 注意遍历得到的是一个数组
const es6 = new Map([["edition", 6], ["committee", "TC39"], ["standard", "ECMA-262"]]);
for (let [name, value] of es6) {
  console.log(name + ": " + value); // edition: 6 committee: TC39 standard: ECMA-262
}
​
// 字符串
let str = "hello";
for (let s of str) {
  console.log(s); // h e l l o
}
​
// DOM NodeList对象
let paras = document.querySelectorAll("p");
for (let p of paras) {
  p.classList.add("test");
}
​
// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x); // 'a' 'b'
  }
}
printArgs('a', 'b');
​
// 普通对象for...of循环会报错，使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组
let es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};
for (let key of Object.keys(es6)) {
  console.log(key + ': ' + es6[key]);
}
```

{% hint style="info" %}
for...of 遍历还有一个重要的特点，不同于 forEach 方法，它可以与 break、continue 和 return 配合使用。

```javascript
for (let n of fibonacci) {
  if (n > 1000)
    break;
  console.log(n);
}
```
{% endhint %}

## 10. 模块化

{% page-ref page="js-topics/module.md" %}

## 11. 异步相关内容

Promise 对象、Generator 函数、async 函数、定时器等相见异步操作章节。

{% page-ref page="js-topics/async.md" %}

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

