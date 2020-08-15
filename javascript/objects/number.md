# Number对象

```javascript
const a = new Number(1)
```

## 1. 静态属性

```javascript
Number.POSITIVE_INFINITY // Infinity
Number.NEGATIVE_INFINITY // -Infinity
Number.NaN // NaN

Number.MAX_VALUE // 1.7976931348623157e+308
Number.MAX_VALUE < Infinity // true

Number.MIN_VALUE // 5e-324
Number.MIN_VALUE > 0 // true

Number.MAX_SAFE_INTEGER // 9007199254740991
Number.MIN_SAFE_INTEGER // -9007199254740991

Number.EPSILON // 代表一个极小量
```

✍️ Number.EPSILON 是极小的常量，对于 64 浮点数来说等于 2 的 -52 次方，引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围，误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

```javascript
// 0.1 + 0.2 与 0.3 得到的结果是 false，这是由于二进制存储的原因
function withinErrorMargin (left, right) {
  return Math.abs(left - right) < Number.EPSILON;
}
0.1 + 0.2 === 0.3 // false
withinErrorMargin(0.1 + 0.2, 0.3) // true
```

## 2. 静态方法

```javascript
// Number.isFinite() - 检查一个数值是否为有限的，即不是 Infinity。
Number.isFinite(1234555555) // true

// Number.isNaN() - 检查一个数值是否为NaN
Number.isNaN(5) // false
Number.isNaN(NaN) // true

// Number.isInteger() - 判断一个数值是否为整数，不是数字也则返回false
Number.isInteger(5) // true
Number.isInteger(5.0) // true
Number.isInteger(5.1) // false

// Number.isSafeInteger() - 判断一个整数是否落在安全范围之内，也就是 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER
Number.isSafeInteger(5) // true
```

✍️ 注意由于存储的原因，JavaScript 内部，整数和浮点数采用的是同样的储存方法，因此 isInteger 方法中 25.0 也是 true 的。

✍️ 要区别于传统的全局方法 isFinite() / isNaN() 和 Number 对象的静态方法，传统方法先调用 Number() 将非数值转为数值再判断。

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

## 3. 实例方法

```javascript
// Number.prototype.toString() - 参数代表进制，默认十进制
(10).toString(2) // "1010"
(10).toString(8) // "12"
(10).toString(16) // "a"

// Number.prototype.toFixed() - 先将一个数转为指定位数的小数，然后返回这个小数对应的字符串
(10).toFixed(2) // "10.00"
(10.005).toFixed(2) // "10.01"

// Number.prototype.toExponential() - 将一个数转为科学计数法形式
(1234).toExponential()  // "1.234e+3"
(1234).toExponential(1) // "1.2e+3"
(1234).toExponential(2) // "1.23e+3"

// Number.prototype.toPrecision() - 将一个数转为指定位数的有效数字
(12.34).toPrecision(1) // "1e+1"
(12.34).toPrecision(2) // "12"
(12.34).toPrecision(3) // "12.3"
(12.34).toPrecision(4) // "12.34"
(12.34).toPrecision(5) // "12.340"
```

