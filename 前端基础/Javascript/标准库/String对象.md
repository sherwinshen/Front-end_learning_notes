# String对象

简介：本文为String对象笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision)         联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)



```javascript
var s = new String('abc');
```

## 常用数组对象方法

| 方法           | 描述                                                         | 语法                                                  | 原始改变 | 其他                                               |
| -------------- | ------------------------------------------------------------ | ----------------------------------------------------- | -------- | -------------------------------------------------- |
| fromCharCode() | 将 Unicode 编码转为字符。                                    | String.fromCharCode(*n1*, *n2*, ..., *nX*)            | /        | /                                                  |
| charAt()       | 返回在指定位置的字符。                                       | *string*.charAt(*index*)                              | /        | 如果参数为负数，或大于等于字符串长度，返回空字符串 |
| charCodeAt()   | 返回在指定的位置的字符的 Unicode 编码。                      | *string*.charCodeAt(*index*)                          | /        | 如果参数为负数，或大于等于字符串的长度，返回`NaN`  |
| concat()       | 连接两个或更多字符串，并返回新的字符串。                     | *string*.concat(*string1*, *string2*, ..., *stringX*) | /        |                                                    |
| slice()        | 提取字符串的片断，并在新的字符串中返回被提取的部分。         | *string*.slice(*start*,*end*)                         | /        | 不含end位置的字符                                  |
| substring()    | 提取字符串中两个指定的索引号之间的字符。                     | *string*.substring(from, to)                          | /        | 不含to位置的字符                                   |
| substr()       | 从起始索引号提取字符串中指定数目的字符。                     | *string*.substr(*start*,*length*)                     | /        | 第二个参数为负，自动转为0，返回空字符串。          |
| indexOf()      | 从前向后搜索字符串，返回某个指定的字符串值在字符串中首次出现的位置。 | *string*.indexOf(*searchvalue*,*start*)               | /        | 如果返回`-1`，表示不匹配。                         |
| lastIndexOf()  | 从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置 | *string*.lastIndexOf(*searchvalue*,*start*)           | /        | 如果返回`-1`，表示不匹配。                         |
| trim()         | 去除字符串两边的空白，不仅空格，还包括制表符`\t`、`\v`换行符`\n`和回车符`\r` | string.trim()                                         | /        | /                                                  |
| toLowerCase()  | 把字符串转换为小写。                                         | *string*.toLowerCase()                                | /        | /                                                  |
| toUpperCase()  | 把字符串转换为大写。                                         | *string*.toUpperCase()                                | /        | /                                                  |
| match()        | 查找找到一个或多个正则表达式的匹配。                         | *string*.match(*regexp*)                              | /        | /                                                  |
| search()       | 查找与正则表达式相匹配的值的第一个位置。                     | *string*.search(*searchvalue*)                        | /        | /                                                  |
| replace()      | 在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串。    | *string*.replace(*searchvalue,newvalue*)              | /        | 返回新字符串                                       |
| split()        | 把字符串分割为字符串数组。                                   | *string*.split(*separator*,*limit*)                   | /        | /                                                  |
| includes()     | 查找字符串中是否包含指定的子字符串。                         | string.includes(searchvalue, start)                   | /        | /                                                  |
| repeat()       | 复制字符串指定次数，并将它们连接在一起返回。                 | string.repeat(count)                                  | /        | /                                                  |
| startsWith()   | 查看字符串是否以指定的子字符串开头。                         | string.startsWith(searchvalue, start)                 | /        | /                                                  |

## ES6新增方法

| 方法                  | 描述                                             | 语法                            | 原始改变 | 其他                                       |
| --------------------- | ------------------------------------------------ | ------------------------------- | -------- | ------------------------------------------ |
| includes()            | 返回布尔值，表示是否找到了参数字符串。           | String.includes(searchvalue)    | /        | /                                          |
| startsWith()          | 返回布尔值，表示参数字符串是否在原字符串的头部。 | String.startsWith(searchvalue） | /        | /                                          |
| endsWith()            | 返回布尔值，表示参数字符串是否在原字符串的尾部。 | String.endsWith(searchvalue）   | /        | /                                          |
| repeat()              | 返回一个新字符串，表示将原字符串重复`n`次        | String.repeat(num)              | /        | 小数取整；Infinity或负数报错；NaN等同于0； |
| padStart()            | 字符串头部补全长度，返回一个新字符串             | String.padStart(length,str)     | /        | /                                          |
| padEnd()              | 字符串尾部补全长度，返回一个新字符串             | String.padStart(length,str)     | /        | /                                          |
| trimStart()/trimEnd() | 消除字符串头部/尾部的空格                        | String.trimStart()/trimEnd()    | /        | 返回新字符串                               |
| matchAll()            | 返回一个正则表达式在当前字符串的所有匹配         | *String*.matchAll(*regexp*)     | /        | 返回的是一个遍历器（Iterator），而不是数组 |

注意：

1、slice和substring的区别

> substring中如果第一个参数大于第二个参数，会自动更换两个参数的位置，且参数是负数会自动转为0。

```javascript
'JavaScript'.substring(-3) // "JavaScript"
'JavaScript'.substring(4, -3) // "Java"
'JavaScript'.slice(-3) // "ipt"
'JavaScript'.slice(4, -3) // "Scr"
```

2、补全长度说明

> 第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串，若省略则以空格补充。

```javascript
'x'.padStart(5, 'ab') // 'ababx'
'xxx'.padStart(2, 'ab') // 'xxx'
'abc'.padStart(10, '0123456789') // '0123456abc'
'x'.padStart(4) // '   x'
```



------

如果发现本项目有错误，欢迎提交 issues 指正。