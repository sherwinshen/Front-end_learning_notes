# Javascript-ES6笔记

## 1. 变量声明

- ES5 存在 2 种声明方式：var 命令和 function 命令。
- ES6 增加至 6 种声明方式：var 命令、function 命令、let 命令、const 命令、import 命令和 class 命令。

**let 和 const**

区别于 var，let 不存在变量提升，变量在未声明前不允许使用。

```javascript
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

块级作用域内存在 let 命令，该变量就绑定这个区域，若外部有同名全局变量，并且在声明块级作用域声明该变量前使用该变量则会报错，因为绑定后不会认为该变量是外部的全局变量。

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

ES6中，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性；let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性。

```javascript
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

const 所谓的常量针对的是数值、字符串、布尔值等不会改变，对于复合类型的数据（主要是对象和数组），const保存的是一个地址，仅能够保证地址不变，具体的数据仍旧是可以改变的。 

✍️ 注意数组，`const a =[1,2]`基础数据也能更改，但是赋值数组的话`a=[1,2,3]`就会报错，因为地址会改变。

## 2. 解构赋值

解构赋值的拷贝是浅拷贝。如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。如果解构不成功，变量的值就等于 undefined。

### 2.1 数组解构

```javascript
// 数组解构 - 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [x, , y] = [1, 2, 3];
let [head, ...tail] = [1, 2, 3, 4];
```

### 2.2 对象解构

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

### 2.3 函数参数解构

```javascript
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b); // [ 3, 7 ]
```

### 2.4 其他解构

```javascript
// 字符串
const [a, b, c, d, e] = 'hello';

// 数值
let {toString: s} = 123;
s === Number.prototype.toString // true

// 布尔值
let {toString: s} = true;
s === Boolean.prototype.toString // true
```

### 2.5 应用

交换变量的值

```javascript
let x = 1;
let y = 2;
let [x,y] = [y,x]
```

从函数返回多个值

```javascript
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

函数参数的定义

```javascript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

提取 JSON 数据

```javascript
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;
```

遍历 Map 结构

```javascript
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
```

输入模块的指定方法 - 加载模块时，往往需要指定输入哪些方法

```javascript
const { SourceMapConsumer, SourceNode } = require("source-map");
```

## 3. 字符串扩展

### 3.1 遍历接口 for...of

```javascript
for(let str of 'abc'){
	console.log(str);
}
// a
// b
// c
```

### 3.2 模版字符串

模版字符串的引入可以使字符串中直接嵌入变量，而不用使用'+'连接。注意模版字符串不是引号""，而是反引号``。

```javascript
// ES5
let a = 'hello <b>' + basket.count + '</b>';

// ES6 - 多行字符串所有的空格和缩进都会被保留在输出之中
let a = `hello <b> ${basket.count} </b>`;
let a = `
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`;
```

### 3.3 标签模版

模板字符串紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。

```javascript
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```

## 4. 函数扩展

### 4.1 默认值设置

```javascript
function log(x, y = 'World') {
  console.log(x, y);
}
log('Hello') // Hello World
log('Hello', '') // Hello
```

函数设置默认值，函数的 length 属性，将返回没有指定默认值的参数个数。

```javascript
(function (a, b, c = 5) {}).length // 2
```

与解构赋值同用时需要注意 - 函数参数的默认值先生效，然后解构赋值的默认值生效

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

### 4.2 ...剩余运算符

rest 参数，用于获取函数的多余参数。区别于arguments变量，arguments对象是类似数组，需要先将其转变为数组 Array.prototype.slice.call()。

```javascript
// 举例
const sortNumbers = (...numbers) => numbers.sort();
```

## 4.3 箭头函数

```javascript
var res = num1 => num1;
var res = (num1, num2) => num1 + num2;
var res = (num1, num2) => { return num1 + num2; }
```

1. 如果返回对象，需要再加一层{}，否则大括号被解释为代码块 `let getTempItem = id => ({ id: id, name: "Temp" });`
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

// 箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。等同于下方。arguments、super、new.target等箭头函数均没有自己的，都是外层代码块的。
function foo(){
  var _this = this;
  setTimeout(() => {
    console.log('id:', _this.id);
  }, 100);
}
```

## 5、数组扩展

### 5.1 ...扩展运算符

... 将一个数组转为用逗号分隔的参数序列。

```javascript
// 1.复制数组 - 此复制为完全克隆，复合数据类型也是完全复制而不是地址复制
const a2 = [...a1];
// 2.合并数组 - 浅拷贝
const a3 = [...a1, ...a2];
// 3.与解构赋值结合，注意扩展运算符若用于赋值则需放到最后一位
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
// 4.字符串转数组
[...'hello'] // [ "h", "e", "l", "l", "o" ]
// 5.实现了 Iterator 接口的对象，即转为真正的数组
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];
```

### 5.2 Array.from()

Array.from 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。

```javascript
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).filter(p => {
  return p.textContent.length > 100;
});
// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

// 扩展运算符（...）也可以将某些数据结构转为数组，下面的形式等同于上述形式。
// arguments对象
function foo() {
  const args = [...arguments];
}
// NodeList对象
[...document.querySelectorAll('div')]
```

Array.from 还可以接受第二个参数，作用类似于数组的 map 方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```javascript
let arr = Array.from([1, , 2, , 3], (n) => n || 0); // [1, 0, 2, 0, 3]
let names = Array.from(spans, s => s.textContent);
```

### 5.3 Array.of()

Array.of 方法用于将一组值，转换为数组。

```javascript
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```

其主要是为了区别 new Array() 由于参数不同而返回结果的不同，array.of() 则行为统一。

```javascript
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

### 5.4 entries()、keys() 和 values()

数组实例的 entries()，keys() 和 values() —— 用于遍历数组。它们都返回一个遍历器对象，可以用 for...of 循环进行遍历，唯一的区别是 keys() 是对键名的遍历，values() 是对键值的遍历，entries() 是对键值对的遍历。

✍️ entries() 通过数组来获取。

```javascript
for (let [key, value] of [1, 2, 3].entries()) {
    console.log(key, value)
}
// 0 1
// 1 2
// 2 3
```

## 6、对象扩展

### 6.1 属性简洁写法

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

### 6.2 属性名表达式

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

### 6.3 对象属性遍历

- `for...in`循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性） - 由于引入继承，不建议使用
- `Object.keys`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
- `Object.getOwnPropertyNames`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
- `Object.getOwnPropertySymbols`返回一个数组，包含对象自身的所有 Symbol 属性的键名。

### 6.4 ... 扩展运算符

解构赋值 - 将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面，但扩展运算符的解构赋值不能复制继承自原型对象的属性。

```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined
```

### 6.5 Object 对象新增方法

**Object.is()**

比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身。

```javascript
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

**Object.assign()**

用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target），注意为浅拷贝。

```javascript
// 举例
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}，同名后面的属性会覆盖前面的属性。

// 注意数组的合并情况
Object.assign([1, 2, 3], [4, 5]) // [4, 5, 3]
```

**Object.setPrototypeOf()**

设置一个对象的 prototype 对象，返回参数对象本身。

```javascript
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);
```

**Object.getPrototypeOf()**

读取一个对象的原型对象。

```javascript
function Rectangle() {
  // ...
}

const rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype // true
```

**Object.keys()，Object.values()，Object.entries()，Object.fromEntries()**

前三个分别返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名/键值/键值对。 Object.fromEntries() 方法是 Object.entries() 的逆操作，用于将一个键值对数组转为对象。

```javascript
const obj = { foo: 'bar', baz: 42 };
Object.keys(obj) // ["foo", "baz"]
Object.values(obj) // ["bar", 42]
Object.entries(obj) // [ ["foo", "bar"], ["baz", 42] ]
Object.fromEntries([['foo', 'bar'],['baz', 42]]) // { foo: "bar", baz: 42 }
```

## 7、Symbol

Symbol 是一种新的原始数据类型，每一个 Symbol 值都是不相等的，主要用作对象属性名(作为标识符)，可以保证不会与其他属性名产生冲突，Symbol 值通过 Symbol 函数生成，`let s = Symbol();`。

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

`Symbol.keyFor()`方法返回一个已登记的 Symbol 类型值的`key`，注意通过symbol()生成的不登记，因此不适用。

```javascript
let s1 = Symbol.for('foo');
Symbol.keyFor(s1) // 'foo'

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

## 8、Set / Map

### 8.1 Set

类似于数组，但是成员的值都是唯一的，没有重复的值。

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

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数。

- `Set.prototype.size`：返回`Set`实例的成员总数。

实例方法：

- `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `Set.prototype.clear()`：清除所有成员，没有返回值。

遍历操作 - `keys`方法和`values`方法的行为完全一致：

- `Set.prototype.keys()`：返回键名的遍历器，
- `Set.prototype.values()`：返回键值的遍历器
- `Set.prototype.entries()`：返回键值对的遍历器
- `Set.prototype.forEach()`：使用回调函数遍历每个成员

### 8.2 Map

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

**数据转换**

```javascript
// Map转数组 - 扩展运算符
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// 数组转Map - 二维数组
new Map([[true, 7],[{foo: 3}, ['abc']]])


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

### 8.3 WeakSet 和 WeakMap

`WeakSet `的成员只能是对象，而不能是其他类型的值。WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用。WeakSet 不能遍历，也没有`size`属性。

`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。`WeakMap`的键名所指向的对象，不计入垃圾回收机制。WeakMap不能遍历，也没有`size`属性。

## 9. Proxy对象

Proxy 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

```javascript
// 用法 - target参数表示所要拦截的目标对象，handler参数用来定制拦截行为(也是对象)
var proxy = new Proxy(target, handler);

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

具体的拦截操作详见 - [ES6 - proxy](https://es6.ruanyifeng.com/#docs/proxy).

## 10. Reflect对象

```javascript
// 1、将Object对象的一些明显属于语言内部的方法，放到Reflect对象上。

// 2、修改某些Object方法的返回结果，让其变得更合理。
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}
// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}

// 3、让Object操作都变成函数行为。
// 老写法
'assign' in Object // true
// 新写法
Reflect.has(Object, 'assign') // true

// 4、Reflect对象的方法与Proxy对象的方法对应。
Proxy(target, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
```

具体详见 - [ES6 - reflect](https://es6.ruanyifeng.com/#docs/reflect).

## 11. Iterator遍历器

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口，即`for...of`；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。

原生具备 Iterator 接口的数据结构：

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

调用 Iterator 接口的场合：

- 解构赋值
- 扩展运算符
- yield\*
- for...of
- Array.from()
- Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
- Promise.all()
- Promise.race()

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

// Set
const engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (let e of engines) {
  console.log(e); // // Gecko Trident Webkit
}

// Map - 注意遍历得到的是一个数组
const es6 = new Map([["edition", 6], ["committee", "TC39"], ["standard", "ECMA-262"]]);
for (let [name, value] of es6) {
  console.log(name + ": " + value); // edition: 6 committee: TC39 standard: ECMA-262
}

// 字符串
let str = "hello";
for (let s of str) {
  console.log(s); // h e l l o
}

// DOM NodeList对象
let paras = document.querySelectorAll("p");
for (let p of paras) {
  p.classList.add("test");
}

// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x); // 'a' 'b'
  }
}
printArgs('a', 'b');

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

✍️ for...of 遍历还有一个重要的特点，不同于 forEach 方法，它可以与 break、continue 和 return 配合使用

```javascript
for (let n of fibonacci) {
  if (n > 1000)
    break;
  console.log(n);
}
```

## 12. Promise对象

这一节非常重要，建议仔细学习 - [ES6 - promise](https://es6.ruanyifeng.com/#docs/promise).

## 13. Generator函数

Generator 函数是一个状态机，封装了多个内部状态；Generator 函数也是一个遍历器对象生成函数，返回遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

```javascript
// 注意function后需要加*，函数体内部使用yield表达式，定义不同的内部状态
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator(); // 该函数有三个状态：hello，world 和 return 语句（结束执行），注意，函数名()并不是函数执行，而是一个指向内部状态的指针对象（遍历器对象）

// 调用遍历器对象的next方法，使得指针移向下一个状态，返回一个有着value和done两个属性的对象，done表示遍历是否结束。yield表达式是暂停执行的标记（还有return语句），next方法可以恢复往下执行。 
hw.next() // { value: 'hello', done: false }
hw.next() // { value: 'world', done: false }
hw.next() // { value: 'ending', done: true }
hw.next() // { value: undefined, done: true }
```

```javascript
// yield表达式只能用在 Generator 函数里面，即使是Generator 函数里面的函数
function* f(a){
    a.forEach(function (item) {
        yield 'hello';
    })
}

// yield表达式如果用在另一个表达式之中，必须放在圆括号里面
function* demo() {
    console.log('Hello' + yield 123); // SyntaxError
    console.log('Hello' + (yield 123)); // OK
}
```

next 方法可以带参数，该参数就会被当作上一个 `yield` 表达式的返回值（第一次使用 `next` 方法时无上一个yeild，则传递参数是无效的），若不带参数，yield表达式对应值为undefined。

```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false} 
a.next() // Object{value:NaN, done:false} - 无参数返回，则yield表达式对应的值为undefined
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

遍历：内部调用的是遍历器接口的都可以将 Generator 函数返回的 Iterator 对象作为参数，但是注意返回对象的`done`属性为`true`，遍历循环就会中止，且不包含该返回对象，也就是说return后面所带的不包含在内.

```javascript
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```

Generator 函数返回的遍历器对象的方法：

- next() - 使得指针移向下一个状态，见上面的一些应用
- throw() - 在函数体外抛出错误，然后在 Generator 函数体内捕获。
- return() - 可以返回给定的值，并且终结遍历 Generator 函数。

这三个方法本质上是同一件事，它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 yield 表达式。

```javascript
// throw 例子
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};
var i = g();
i.next();
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a - Generator函数内捕获错误
// 外部捕获 b - 由于Generator函数内捕获错误已经执行过了，因而在外部捕获

// return例子
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

yield* 表达式用来在一个 Generator 函数里面执行另一个 Generator 函数。

```javascript
function* foo() {
  yield 'a';
  yield 'b';
}

// yield* 表达式等同于部署一个for...of循环
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}  // 'x' 'a' 'b' 'y' 

// 如果不加*则返回的是一个遍历器对象。
function* bar() {
  yield 'x';
  yield foo();
  yield 'y';
} // 'x' 一个遍历器对象 'y'
```

yield* 后面的 Generator函数，没有 return 语句时，相当于 for...of 的一种简写形式；在有 return 语句时，则需要用 var value = yield* iterator 的形式获取 return 语句的值。

```javascript
function* iter1(){
    yield 'x';
    yield 'y';
}

function* iter2() {
    yield 'a';
    yield 'b';
    return 'c';
}

function* concat(iter1, iter2) {
  yield* iter1;
  const value = yield* iter2;
  yield value;
}

const a = concat(iter1(),iter2()); // x y a b c
```

实际上，任何数据结构只要有 Iterator 接口，就可以被 yield* 遍历。

```javascript
// 数组原生支持遍历器，因此可以被yield*遍历
function* gen(){
  yield* ["a", "b", "c"];
}
gen().next() // { value:"a", done:false }

// 字符串同样
function* gen(){
    yield* 'hello';
}

gen().next() // { value:"h", done:false }
```

## 14. async函数

```javascript
// 例子：指定毫秒后输出内容
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。当函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

async 函数是 Generator 函数的语法糖，其中几点改进：

- Generator 函数的执行必须必须靠执行器 next()，而 async 函数的执行与普通函数一样，只要一行。
- async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
- Generator 函数中 yield 命令后面只能是 Thunk 函数或 Promise 对象，async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（实际会转成立即 resolved 的 Promise 对象）。

语法的注意点：

- async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。
- 正常情况下，await 命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
- await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。

```javascript
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}
// 另一种写法
async function myFunction() {
  await somethingThatReturnsAPromise().catch(function (err){
    console.log(err);
  });
}
```

## 15. Class类

传统生成实例对象是通过构造函数实现，引入了 Class（类）这个概念，可以通过`class`关键字定义类。实例的属性除非显式定义在其本身（即定义在 `this` 对象上），否则都是定义在原型上（即定义在 `class ` 上），类的所有方法都定义在类的 `prototype` 属性上面，如下面的 toString。

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

### 15.1 静态/私有/共有

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

✍️ 私有属性和方法目前仍在提案中，暂不说明。

### 15.2 类继承

子类中存在 constructor 方法则必须先调用 super 方法，这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，this也不能用在 super 方法之前。

```javascript
class Point {
  constructor(x) {
    this.x = x;
  }
}

class ColorPoint extends Point {
  constructor(x, y) {
    this.y = y // ReferenceError
    super(x); // // 调用父类的constructor(x)
    this.y = y; // 正确
  }
}
```

父类的静态方法，也会被子类继承，而父类的实例对象不能使用父类的静态方法。

```javascript
class A {
    static hello() {
        console.log('hello world');
    }
}

class B extends A {
}

B.hello();  // hello world

const b = new A();
b.hello(); // TypeError: newB.hello is not a function
```

**继承关系**

```javascript
class A { }
class B extends A { }
console.log(B.__proto__ === A);  // true
console.log(B.prototype.__proto__ === A.prototype);  // true
```

<img src="./img/继承.jpeg" style="zoom:20%;" />

**super关键词的用法**

1、当作函数调用时，代表父类的构造函数。

```javascript
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```

2、当作对象使用时，在普通方法中，指向父类的原型对象（简单说就是父类中没有static的部分），也就是说在父类实例上的方法或属性是无法通过`super`调用。在子类普通方法中通过`super`调用父类的方法时，方法内部的`this`指向当前的子类实例。

```javascript
class A {
  constructor() {
    this.p = 2;
  }
  print() {
    console.log(this.x);
  }
}

A.prototype.x = 2;

class B extends A {
  constructor() {
    super();
    this.x = 4;
  }
  get m() {
    return super.p;
  }
  get x(){
    return super.x;
  }
  y() {
    super.print();
  }
}

let b = new B();
b.m // undefined
b.x // 2
b.y() // 4
```

3、当作对象使用时，在静态方法中，指向父类（简单说就是父类中static的部分）。类相当于实例的原型对象。

```javascript
// super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2
```

## 16. 模块化Module

具体详见 - [ES6 - module](https://es6.ruanyifeng.com/#docs/module).

