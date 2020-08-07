# Array对象

简介：本文为Array对象笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 常用数组对象方法

| 方法 | 描述 | 语法 | 原始改变 | 其他 |
| :--- | :--- | :--- | :--- | :--- |
| concat\(\) | 连接两个或更多的数组，并返回结果。 | array1.concat\(array2,array3,...,arrayX\) | / | 如果数组元素为对象，更改原数组对象内容，返回的新数组也会改，因为是浅拷贝-拷贝的是对象的引用。 |
| copyWithin\(\) | 从数组的指定位置start拷贝元素到数组的另一个指定位置target中 | array.copyWithin\(target, start, end\) | 变 |  |
| entries\(\) | 返回一个数组的迭代对象，该对象包含数组的键值对 \(key/value\) | array.entries\(\) | / |  |
| every\(\) | 检测数组所有元素是否都符合指定条件（通过函数提供） | array.every\(function\(currentValue,index,arr\), thisValue\) | / |  |
| some\(\) | 检测数组中的元素是否满足指定条件（函数提供） | array.some\(function\(currentValue,index,arr\),thisValue\) | / |  |
| fill\(\) | 将一个固定值替换数组的元素 | array.fill\(value, start, end\) | 变 |  |
| filter\(\) | 返回一个通过检查指定数组中符合条件的所有元素的数组 | array.filter\(function\(currentValue,index,arr\), thisValue\) | / |  |
| find\(\) | 返回通过测试（函数内判断）的数组的第一个元素的值 / undefined | array.find\(function\(currentValue, index, arr\),thisValue\) | / |  |
| findIndex\(\) | 返回数组符合测试条件（函数）条件的第一个元素的索引 / -1 | array.findIndex\(function\(currentValue, index, arr\), thisValue\) | / |  |
| forEach\(\) | 调用数组的每个元素并将元素传递给回调函数，无返回undefined | array.forEach\(function\(currentValue, index, arr\), thisValue\) | 具体情况 | 注意`forEach`方法不会跳过`undefined`和`null`，但是会跳过空位。 |
| from\(\) | 通过拥有 length 属性的对象或可迭代的对象来返回一个数组，如set，string等 | array.from\(object, mapFunction, thisValue\) | / |  |
| includes\(\) | 判断一个数组是否包含一个指定的值，如果是返回 true，否则false | arr.includes\(searchElement, fromIndex\) | / |  |
| indexOf\(\) | 返回数组中某个指定的元素位置 / -1 | array.indexOf\(item,start\) | / |  |
| lastIndexOf\(\) | 返回一个指定的元素在数组中最后出现的位置，从该字符串的后面向前查找 / -1 | array.lastIndexOf\(item,start\) | / |  |
| isArray\(\) | 判断一个对象是否为数组 | array.isArray\(obj\) | / |  |
| join\(\) | 把数组中的所有元素通过指定的分隔符转换一个字符串，若无指定分隔符则默认逗号 | array.join\(separator\) | / |  |
| toString\(\) | 把数组转换为字符串，并返回结果，数组的所有值用逗号隔开 | array.toString\(\) | / |  |
| keys\(\) | 从数组创建一个包含数组键的可迭代对象 | array.keys\(\) | / |  |
| map\(\) | 返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值 | array.map\(function\(currentValue,index,arr\), thisValue\) | / | 注意`map`方法不会跳过`undefined`和`null`，但是会跳过空位。 |
| pop\(\) | 删除并返回数组的最后一个元素 | array.pop\(\) | 变 |  |
| push\(\) | 向数组的末尾添加一个或更多元素，并返回新的长度 | array.push\(item1, item2, ..., itemX\) | 变 |  |
| shift\(\) | 删除并返回数组的第一个元素 | array.shift\(\) | 变 |  |
| unshift\(\) | 向数组的开头添加一个或更多元素，并返回新的长度 | array.unshift\(\) | 变 |  |
| reduce\(\) | 接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值 | array.reduce\(function\(total, currentValue, currentIndex, arr\), initialValue\) | / |  |
| reduceRight\(\) | 同reduce\(\)，将数组元素计算为一个值（从右到左） | array.reduceRight\(function\(total, currentValue, currentIndex, arr\), initialValue\) | / |  |
| reverse\(\) | 颠倒数组中元素的顺序 | array.reverse\(\) | 变 |  |
| slice\(\) | 从已有的数组中返回选定元素 | _array_.slice\(_start_, _end_\) | / | 重要的作用是将类似数组的对象转为真正的数组。Array.prototype.slice.call\(\) |
| sort\(\) | 对数组的元素进行排序 | _array_.sort\(_sortfunction_\) | 变 | sortfunction为空则按照字典顺序排序，反之，`sort`的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于`0`，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。 |
| splice\(\) | 添加或删除数组中的元素 | array.splice\(index_,_howmany_,_item1_,.....,_itemX\) | 变 |  |
| flat\(\) | 将嵌套的数组“拉平”，变成一维的数组 | array.flat\(num\) | / | num表示拉平的层数，默认只会“拉平”一层，如果num为Infinity，则无论几层均拉平 |
| flatMap\(\) | 对原数组的每个成员执行一个函数,然后对返回值组成的数组执行`flat()`方法 | arr.flatMap\(function callback\(currentValue\[, index\[, array\]\]\) {   // ... }\[, thisArg\]\) | / |  |

修改原数组的方法：pop\(\), push\(\), unshift\(\), shift\(\), splice\(\), sort\(\), reverse\(\), fill\(\), copyWithin\(\)

## 补充说明

1、数组实例的 entries\(\)，keys\(\) 和 values\(\)

> 类似于python字典的items\(\)，keys\(\)，values\(\)，但返回一个遍历器对象，通过for...of循环遍历

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

2、ES6 明确将空位转为`undefined`

ES5对空位处理各不相同，如忽略跳过等，但ES6进行了统一，但建议避免出现空位。

如果发现本项目有错误，欢迎提交 issues 指正。

