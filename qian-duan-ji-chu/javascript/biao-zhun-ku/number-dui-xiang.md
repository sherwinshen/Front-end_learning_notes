# Number对象

简介：本文为Number对象笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

> var n = new Number\(1\);

## 静态属性

```javascript
Number.POSITIVE_INFINITY // Infinity
Number.NEGATIVE_INFINITY // -Infinity
Number.NaN // NaN

Number.MAX_VALUE
// 1.7976931348623157e+308
Number.MAX_VALUE < Infinity
// true

Number.MIN_VALUE
// 5e-324
Number.MIN_VALUE > 0
// true

Number.MAX_SAFE_INTEGER // 9007199254740991
Number.MIN_SAFE_INTEGER // -9007199254740991
```

## 实例方法

* **Number.prototype.toString\(\)**

```javascript
(10).toString(2) // "1010"
(10).toString(8) // "12"
(10).toString(16) // "a"
```

* **Number.prototype.toFixed\(\)**

```javascript
// toFixed()方法先将一个数转为指定位数的小数，然后返回这个小数对应的字符串。
(10).toFixed(2) // "10.00"
10.005.toFixed(2) // "10.01"
```

* **Number.prototype.toExponential\(\)**

```javascript
// toExponential方法用于将一个数转为科学计数法形式。
(1234).toExponential()  // "1.234e+3"
(1234).toExponential(1) // "1.2e+3"
(1234).toExponential(2) // "1.23e+3"
```

* **Number.prototype.toPrecision\(\)**

```javascript
// Number.prototype.toPrecision()方法用于将一个数转为指定位数的有效数字。
(12.34).toPrecision(1) // "1e+1"
(12.34).toPrecision(2) // "12"
(12.34).toPrecision(3) // "12.3"
(12.34).toPrecision(4) // "12.34"
(12.34).toPrecision(5) // "12.340"
```

* **Number.prototype.toLocaleString\(\)**

```javascript
// 方法接受一个地区码作为参数，返回一个字符串，表示当前数字在该地区的当地书写形式。
(123).toLocaleString('zh-Hans-CN-u-nu-hanidec') // "一二三"
// 方法还可以接受第二个参数配置对象，用来定制指定用途的返回字符串。
(123).toLocaleString('zh-Hans-CN', { style: 'persent' }) // "12,300%"
(123).toLocaleString('zh-Hans-CN', { style: 'currency', currency: 'CNY' }) // "￥123.00"
(123).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) // "123,00 €"
(123).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) // "$123.00"
```

## 自定义方法

> 在数值上无法定义方法，只能在其原型上定义方法，这样才能够对数值使用方法

```javascript
(8).iterate() // Error

Number.prototype.iterate = function () {
  var result = [];
  for (var i = 0; i <= this; i++) {
    result.push(i);
  }
  return result;
};

(8).iterate() // [0, 1, 2, 3, 4, 5, 6, 7, 8]
```

## ES6增加

1、`Number.isFinite()`用来检查一个数值是否为有限的（finite），即不是`Infinity`。

2、`Number.isNaN()`用来检查一个值是否为`NaN`。

> 区别于传统的全局方法`isFinite()`和`isNaN()`，传统方法先调用`Number()`将非数值的值转为数值再判断

```javascript
isFinite(25) // true
isFinite("25") // true
Number.isFinite(25) // true
Number.isFinite("25") // false

isNaN(NaN) // true
isNaN("NaN") // true
Number.isNaN(NaN) // true
Number.isNaN("NaN") // false
Number.isNaN(1) // false
```

3、`Number.isInteger()`用来判断一个数值是否为整数。 - 不是数字则返回false

> 注意区别于python等，JavaScript 内部，整数和浮点数采用的是同样的储存方法。

```javascript
Number.isInteger(25) // true
Number.isInteger(25.0) // true
```

4、`Number.EPSILON`是极小的常量，对于64位浮点数来说等于 2 的 -52 次方，引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围，误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

```javascript
// 0.1 + 0.2与0.3得到的结果是false
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON;
}
0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true
```

5、`Number.MAX_SAFE_INTEGER`和`Number.MIN_SAFE_INTEGER`表示JavaScript 能够准确表示的整数范围`-2^53`到`2^53`之间（不含两个端点）。`Number.isSafeInteger()`则是用来判断一个整数是否落在这个范围之内。

如果发现本项目有错误，欢迎提交 issues 指正。

