# 数据类型转换

## 1. 类别

强制转换：

- `Number()`：原始数值(数值，布尔值，字符串) --> 数值

- `Number()`：对象 --> 数值

- `String()`：原始数值(数值，布尔值，字符串) --> 字符串

- `String()`：对象 --> 字符串

- `Boolean()`： 所有数据类型--> 布尔值

隐式转换（预期什么类型的值，就调用该类型的转换函数）：

- 转为布尔值，调用Boolean()
- 转为字符串，先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串
- 转为数值，调用Number()

## 2. 方法

### 2.1 Number()

```javascript
// 数值：转换后还是原来的值
Number(324) // 324
// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324') // 324
// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc') // NaN
// 空字符串转为0
Number('') // 0
// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0
// undefined：转成 NaN
Number(undefined) // NaN
// null：转成0
Number(null) // 0

Number({a: 1}) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5
```

✍️ null 转为 0，undefined 转为 NaN！！！

✍️ 区别 parseInt() 在于：parseInt 逐个解析字符，而 Number 函数整体转换字符串的类型，基本上，只要有一个字符无法转成数值，整个字符串就会被转为NaN。

✍️ Number 方法的参数是对象时，将返回 NaN，除非是包含单个数值的数组，注意是单个数值。

### 2.2 String()

```javascript
// 数值：转为相应的字符串。
String(123) // "123"
// 字符串：转换后还是原来的值。
String('abc') // "abc"
// 布尔值：true转为字符串"true"，false转为字符串"false"。
String(true) // "true"
// undefined：转为字符串"undefined"。
String(undefined) // "undefined"
// null：转为字符串"null"。
String(null) // "null"

String({a: 1}) // "[object Object]"
String(function demo(x,y){}) // "function demo(x,y){}"
String([1, 2, 3]) // "1,2,3"
```

✍️ String 方法的参数如果是对象，返回一个类型字符串；如果是数组，返回数组的字符串形式。

### 2.3 Boolean()

除了 +0、-0、undefined、null、''、false、NaN 之外其余均为 true！！！

✍️ 所有对象（包括空对象）的转换结果都是`true`，甚至连`false`对应的布尔对象`new Boolean(false)`也是`true`，要区别布尔值与布尔对象。

## 3. 补充知识

Number() 参数为对象时背后的规则：

1. 调用对象自身的`valueOf`方法。如果返回原始类型的值，直接对该值使用`Number`函数，不再进行后续步骤。

2. 如果`valueOf`方法返回的还是对象，则改为调用对象自身的`toString`方法。如果`toString`方法返回原始类型的值，则对该值使用`Number`函数，不再进行后续步骤。

3. 如果`toString`方法返回的是对象，就报错。

String() 参数为对象时背后的规则（区别 Number() 只是互换了`valueOf`方法和`toString`方法的执行顺序）：

1. 先调用对象自身的`toString`方法。如果返回原始类型的值，则对该值使用`String`函数，不再进行以下步骤。
2. 如果`toString`方法返回的是对象，再调用原对象的`valueOf`方法。如果`valueOf`方法返回原始类型的值，则对该值使用`String`函数，不再进行以下步骤。
3. 如果`valueOf`方法返回的是对象，就报错。

### 3.1 Object.prototype.valueOf()

`valueOf`方法的作用是返回一个对象的“值”，默认情况下返回对象本身。

```javascript
new Number(123).valueOf()  // 123
new String('abc').valueOf() // "abc"
new Boolean(true).valueOf() // true

var obj = new Object();
obj.valueOf() === obj // true
```

### 3.2 Object.prototype.toString()

`toString`方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串“[object Object]”。

注意：数组、字符串、函数、Date 对象都分别部署了自定义的`toString`方法，并不会返回“[object Object]”，举例如下。

```javascript
[1, 2, 3].toString() // "1,2,3"

'123'.toString() // "123"

(function () {
  return 123;
}).toString()
// "function () {
//   return 123;
// }"

(new Date()).toString()
// "Tue May 10 2016 09:11:31 GMT+0800 (CST)"
```

