# String 对象

{% hint style="info" %}
参考资料：[String 对象](https://wangdoc.com/javascript/stdlib/string.html)
{% endhint %}

```javascript
const s = new String('abc');
```

## 1. 实例方法

| 方法 | 作用 | 语法 |
| :--- | :--- | :--- |
| charAt\(\) | 返回在指定位置的字符 | string.charAt\(index\) |
| charCodeAt\(\) | 返回在指定的位置的字符的 Unicode 编码 | string.charCodeAt\(index\) |
| indexOf\(\) | 返回指定字符串值在字符串中首次出现的位置 | string.indexOf\(searchValue, start\) |
| lastIndexOf\(\) | 返回指定字符串值在字符串中最后次出现的位置 | string.lastIndexOf\(searchValue, start\) |
| includes\(\) | 查找字符串中是否包含指定的子字符串 | string.includes\(searchValue, start\) |
| startsWith\(\) | 查看字符串是否以指定的子字符串开头 | string.startsWith\(searchValue, start\) |
| endsWith\(\) | 查看字符串是否以指定的子字符串结尾 | string.endsWith\(searchValue, start\) |
| toLowerCase\(\) | 把字符串转换为小写 | string.toLowerCase\(\) |
| toUpperCase\(\) | 把字符串转换为大写 | string.toUpperCase\(\) |
| concat\(\) | 连接两个或更多字符串，并返回新的字符串 | string.concat\(string1, ..., stringX\) |
| split\(\) | 把字符串分割为字符串数组 | string.split\(separator_,_ limit\) |
| repeat\(\) | 复制字符串指定次数，并将它们连接在一起返回 | string.repeat\(count\) |
| slice\(\) | 提取字符串的片断，并在新的字符串中返回被提取的部分 | string.slice\(start, end\) |
| substring\(\) | 提取字符串中两个指定的索引号之间的字符 | string.substring\(from, to\) |
| substr\(\) | 从起始索引号提取字符串中指定数目的字符 | string.substr\(start, length\) |
| trim\(\) | 去除字符串两边的空白 | string.trim\(\) |
| trimStart\(\)/trimEnd\(\) | 消除字符串头部/尾部的空格 | string.trimStart\(\)/trimEnd\(\) |
| match\(\) | 查找找到一个或多个正则表达式的匹配。 | string.match\(regexp\) |
| search\(\) | 查找与正则表达式相匹配的值的第一个位置。 | string.search\(searchValue\) |
| replace\(\) | 在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串。 | string.replace\(searchValue, newValue\) |
| matchAll\(\) | 返回一个正则表达式在当前字符串的所有匹配 | string.matchAll\(regexp\) |

{% hint style="warning" %}
对比：

* string.slice\(start, end\)
* string.substring\(from, to\)
* string.substr\(start, length\)

slice VS substring：substring中如果第一个参数大于第二个参数，会自动更换两个参数的位置，且参数是负数会自动转为0。

```javascript
'JavaScript'.substring(-3) // "JavaScript"
'JavaScript'.substring(4, -3) // "Java"
'JavaScript'.slice(-3) // "ipt"
'JavaScript'.slice(4, -3) // "Scr"
```

substr VS substring：substr 的第二个参数是匹配的长度，不是结束的位置；slice 和 substring 的第二个参数指代的位置都不包含在返回字符串中，综上建议还是使用 slice 吧。
{% endhint %}

{% hint style="warning" %}
trim\(\) 去除的不仅空格，还包括制表符`\t`、`\v`换行符`\n`和回车符`\r` 。
{% endhint %}

{% hint style="warning" %}
matchAll\(\) 返回正则表达式在当前字符串的所有匹配，注意返回的是一个遍历器（Iterator），而不是数组。
{% endhint %}

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

