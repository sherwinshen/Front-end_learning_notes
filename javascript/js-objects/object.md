# Object 对象

{% hint style="info" %}
参考资料：[Object 对象](https://wangdoc.com/javascript/stdlib/object.html)
{% endhint %}

```javascript
var obj = Object();
// 等同于
var obj = Object(undefined);
var obj = Object(null);

obj instanceof Object // true
```

## 1. 静态方法

`Object.keys`方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名。

```javascript
var obj = {
  p1: 123,
  p2: 456
};

Object.keys(obj) // ["p1", "p2"]
```

`Object.getOwnPropertyNames`方法与`Object.keys`类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。

```javascript
var a = ['Hello', 'World'];

Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]
```

## 2. 实例方法

`Object`实例对象的方法，主要有以下六个。

* `Object.prototype.valueOf()`：返回当前对象对应的值。
* `Object.prototype.toString()`：返回当前对象对应的字符串形式。
* `Object.prototype.toLocaleString()`：返回当前对象对应的本地字符串形式。
* `Object.prototype.hasOwnProperty()`：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
* `Object.prototype.isPrototypeOf()`：判断当前对象是否为另一个对象的原型。
* `Object.prototype.propertyIsEnumerable()`：判断某个属性是否可枚举。

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

