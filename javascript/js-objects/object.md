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

`Object.is()`比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身。

```javascript
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

`Object.assign()`用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target），注意为浅拷贝。

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

