# Array 对象

{% hint style="info" %}
参考资料：[Array 对象](https://wangdoc.com/javascript/stdlib/array.html)
{% endhint %}

```javascript
const myCars = new Array("Saab","Volvo","BMW");
```

## 1. 实例方法

| 方法 | 作用 | 语法 | 返回值 | 改变原数组 |
| :--- | :--- | :--- | :--- | :--- |
| concat\(\) | 拼接数组 | array1.concat\(array2, ..., arrayX\) | 新数组 | 否 |
| entries\(\) | 键值对 | array.entries\(\) | 迭代对象 | 否 |
| keys\(\) | 键 | array.keys\(\) | 迭代对象 | 否 |
| values\(\) | 值 | array.values\(\) | 迭代对象 | 否 |
| fill\(\) | 固定值替换数组元素 | array.fill\(value, start, end\) | 原数组 | ✓ |
| pop\(\) | 数组尾删除元素 | array.pop\(\) | 删除元素 | ✓ |
| push\(\) | 数组尾添加元素 | array.push\(item1, item2, ..., itemX\) | **新长度** | ✓ |
| unshift\(\) | 数组头添加元素 | array.unshift\(item1, item2, ..., itemX\) | **新长度** | ✓ |
| shift\(\) | 数组头删除元素 | array.shift\(\) | 删除元素 | ✓ |
| splice\(\) | 添加或删除数组中的元素 | array.splice\(index, num, item1, ....., itemX\) | 删除的数组 | ✓ |
| slice\(\) | 从已有的数组中返回选定元素 | array.slice\(start, end\) | 新数组 | 否 |
| join\(\) | 分隔符合成字符串（默认逗号） | array.join\(separator\) | 字符串 | 否 |
| sort\(\) | 对数组的元素进行排序 | array.sort\(sortfunction\) | 原数组 | ✓ |
| flat\(\) | 数组降维 | array.flat\(num\) | 新数组 | 否 |
| toString\(\) | 数组转字符串，值用逗号隔开 | array.toString\(\) | 字符串 | 否 |
| reverse\(\) | 颠倒数组中元素的顺序 | array.reverse\(\) | 原数组 | ✓ |
| indexOf\(\) | 返回某个指定的元素起始位置 | array.indexOf\(item, start\) | 索引 / -1 | 否 |
| lastIndexOf\(\) | 返回某个指定的元素最后位置 | array.lastIndexOf\(item, start\) | 索引 / -1 | 否 |
| includes\(\) | 判断是否包含某个值 | arr.includes\(searchElement, fromIndex\) | 布尔值 | 否 |

| 方法 | 作用 | 语法 | 返回值 | 改变原数组 |
| :--- | :--- | :--- | :--- | :--- |
| every\(\) | 检查元素是否所有符合条件 | array.every\(参数\) | 布尔值 | 否 |
| some\(\) | 检查是否存在符合条件元素 | array.some\(参数\) | 布尔值 | 否 |
| filter\(\) | 筛选元素并组成新数组 | array.filter\(参数\) | 新数组 | 否 |
| forEach\(\) | 遍历元素进行处理 | array.forEach\(参数\) | undefined | 否 |
| map\(\) | 调用回调处理元素并返回 | array.map\(参数\) | 新数组 | 否 |
| find\(\) | 找到满足条件的第一个值 | array.find\(参数\) | 值/undefined | 否 |
| findIndex\(\) | 找到满足条件的第一个索引 | array.findIndex\(参数\) | 索引 / -1 | 否 |

上述参数均指的是 `(function(curValue, index, arr), thisValue)`

| 方法 | 作用 | 语法 | 返回值 | 改变原数组 |
| :--- | :--- | :--- | :--- | :--- |
| reduce\(\) | 根据处理函数将数组中的值缩减为一个值 | array.reduce\(function\(total, curValue, curIndex, arr\), initialValue\) | 最终值 | 否 |
| reduceRight\(\) | 同上，只是从右开始累加 | array.reduceRight\(function\(total, curValue, curIndex, arr\), initialValue\) | 最终值 | 否 |

{% hint style="warning" %}
`Array.prototype.slice.call(类数组)`重要的作用是将类似数组的对象转为真正的数组`。`
{% endhint %}

{% hint style="info" %}
`sort()`默认是根据字典顺序排序，不是根据数值大小，因此比较大小需要自己写函数。sort 的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于 0，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。
{% endhint %}

{% hint style="info" %}
`flat()`用于数组降维，其参数代表了降维的维数，但是如果想要无论几层均拉平，则需要设置为 `array.flat(infinity)`。
{% endhint %}

{% hint style="info" %}
ES5 对空位处理各不相同，如忽略跳过等，但 ES6 进行了统一，明确将空位转为 undefined。
{% endhint %}

{% hint style="warning" %}
注意 indexOf 直接传入要查找的元素即可，findIndex 需要传入一个判断函数，不要搞混了。

```javascript
[1,2,4].indexOf(1)

[1,2,4].findIndex((currentValue) => {
  return currentValue === 1
})
```
{% endhint %}

{% hint style="info" %}
数组实例的 entries\(\)，keys\(\) 和 values\(\)，尤其注意 entries\(\) 的写法

```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
{% endhint %}

{% hint style="info" %}
`sort()`可根据回调函数的返回值来决定元素的排序:

* 如果返回一个大于 0 的值，则元素会交换位置
* 如果返回一个小于等于 0 的值，则元素位置不变
{% endhint %}

{% hint style="info" %}
`reduce()`应用：

```javascript
// 数组求和
const total = arr.reduce((prev,cur) => prev + cur)

// 统计某个元素出现的次数
const count = arr.reduce((prev, cur) => {
  prev += item == value ? 1 : 0;
  return prev
})

// 求元素的最大值
const count = arr.reduce((prev, cur) => {
  return prev > item ? prev : item
})
```
{% endhint %}

总结：

* 元素增减：pop\(\) / push\(\) / unshift\(\) / shift\(\) / splice\(\)
* 元素查找：indexOf\(\)/ lastIndexOf\(\) / includes\(\) / find\(\) / findIndex\(\) / every\(\) / some\(\)
* 元素遍历：forEach\(\) / map\(\) / reduce\(\) / filter\(\)
* 其他常用：fill\(\) / join\(\) / slice\(\) / sort\(\) / flat\(\)

## 2. 静态方法

| 方法 | 作用 | 语法 | 返回值 |
| :--- | :--- | :--- | :--- |
| isArray\(\) | 判断一个对象是否为数组 | Array.isArray\(obj\) | 布尔值 |
| from\(\) | 通过拥有 length 属性的对象或可迭代的对象来返回一个数组 | Array.from\(object, mapFunction, thisValue\) | 新数组 |

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

