# Math 对象

{% hint style="info" %}
参考资料：[Math 对象](https://wangdoc.com/javascript/stdlib/math.html)
{% endhint %}

## 1. 数学常数

* `Math.E`：常数`e`。
* `Math.LN2`：2 的自然对数。
* `Math.LN10`：10 的自然对数。
* `Math.LOG2E`：以 2 为底的`e`的对数。
* `Math.LOG10E`：以 10 为底的`e`的对数。
* `Math.PI`：常数`π`。
* `Math.SQRT1_2`：0.5 的平方根。
* `Math.SQRT2`：2 的平方根。

## 2. 三角函数

* `Math.sin()`：返回参数的正弦（参数为弧度值）
* `Math.cos()`：返回参数的余弦（参数为弧度值）
* `Math.tan()`：返回参数的正切（参数为弧度值）
* `Math.asin()`：返回参数的反正弦（返回值为弧度值）
* `Math.acos()`：返回参数的反余弦（返回值为弧度值）
* `Math.atan()`：返回参数的反正切（返回值为弧度值）

## 3. 静态方法

* `Math.abs()`：绝对值
* `Math.ceil()`：向上取整
* `Math.floor()`：向下取整
* `Math.max()`：最大值
* `Math.min()`：最小值
* `Math.pow()`：指数运算
* `Math.sqrt()`：平方根
* `Math.log()`：自然对数
* `Math.exp()`：`e`的指数
* `Math.round()`：四舍五入
* `Math.random()`：随机数\[0,1\)

## 4. ES6新增

* `Math.trunc`方法用于去除一个数的小数部分，返回整数部分。
* `Math.sign`方法用来判断一个数到底是正数+1、负数-1、还是正零0，负零-0，其他NaN。
* `Math.cbrt`方法用于计算一个数的立方根。
* `Math.hypot`方法返回所有参数的平方和的平方根。
* `Math.expm1(x)`返回 ex - 1，即`Math.exp(x) - 1`。
* `Math.log1p(x)`方法返回`1 + x`的自然对数，即`Math.log(1 + x)`。如果`x`小于-1，返回`NaN`。
* `Math.log10(x)`返回以 10 为底的`x`的对数。如果`x`小于 0，则返回 NaN。
* `Math.log2(x)`返回以 2 为底的`x`的对数。如果`x`小于 0，则返回 NaN。
* 指数运算符\*\* - `2 ** 3 ** 2`

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

