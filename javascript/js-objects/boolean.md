# Boolean 对象

{% hint style="info" %}
参考资料：[Boolean 对象](https://wangdoc.com/javascript/stdlib/boolean.html)
{% endhint %}

通过 new 生成的 Boolean 对象，如果参数是 0, -0, null, false, NaN, undefined, “” 生成的 Boolean 对象的值为 false，如果参数是其他值均为 true。

```javascript
const b = new Boolean(); // 等同于 var b = new Boolean(null);
```

注意区别 new Boolean\(\) 与 Boolean\(\)，new 生成的是对象，如果只需要得到布尔值，则单独使用 Boolean\(\) 即可。

```javascript
Boolean(false) // false
new Boolean(false) // true
Boolean(null) // false
new Boolean(null) // true
```

Boolean\(\) 可以将任意值转为布尔值。

```javascript
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean('') // false
Boolean(NaN) // false
​
Boolean(1) // true
Boolean('false') // true
Boolean([]) // true
Boolean({}) // true
Boolean(function () {}) // true
Boolean(/foo/) // true
```

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

