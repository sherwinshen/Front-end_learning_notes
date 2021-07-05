# RegExp 对象

{% hint style="info" %}
参考资料：[RegExp 对象](https://wangdoc.com/javascript/stdlib/regexp.html)
{% endhint %}

```javascript
const regex = /xyz/;
```

## 1. 实例方法

RegExp.prototype.test\(\) - 返回布尔值，表示当前模式是否能匹配参数字符串。

```javascript
/cat/.test('cats and dogs') // true
```

RegExp.prototype.exec\(\) - 返回匹配结果，如果匹配返回数组，否则返回null。

```javascript
/x/.exec('_x_x') // ["x"]
```

## 2. 语法规则

元字符

* 点字符`.`：一个点就是一个任意字符\(部分字符除外回车`\r`、换行`\n` 、行分隔符`\u2028`和段分隔符`\u2029`\)
* 开始位置字符`^` / 结束位置字符`$`
* 选择符`|`：表示或
* 转义符\：十二个字符需要转义`^`、`.`、`[`、`$`、`(`、`)`、`|`、`*`、`+`、`?`、`{`和`\`

特殊字符

* `\cX` 表示`Ctrl-[X]`，其中的`X`是A-Z之中任一个英文字母，用来匹配控制字符。
* `[\b]` 匹配退格键\(U+0008\)，不要与`\b`混淆。
* `\n` 匹配换行键。
* `\r` 匹配回车键。
* `\t` 匹配制表符 tab（U+0009）。
* `\v` 匹配垂直制表符（U+000B）。
* `\f` 匹配换页符（U+000C）。
* `\0` 匹配`null`字符（U+0000）。
* `\xhh` 匹配一个以两位十六进制数（`\x00`-`\xFF`）表示的字符。
* `\uhhhh` 匹配一个以四位十六进制数（`\u0000`-`\uFFFF`）表示的 Unicode 字符。

字符类

* 脱字符`^`表示除了字符类之中的字符，其他字符都可以匹配，`[^xyz]`表示除了`x`、`y`、`z`之外都可以匹配，`[^]`表示匹配一切字符。
* 连字符`-`表示字符的连续范围，\[a-c\]、\[0-9\]、\[A-Z\]等，注意\[1-31\]表示1-3，不是1-31
  * `/[ab]/` 等价于 `/a|b/`：检查一个字符串中是否包含 a或b
  * `/[a-z]/`：检查一个字符串那种是否包含任意小写字母
  * `/[A-Z]/`：任意大写字母
  * `/[A-z]/`：任意字母
  * `/[0-9]/`：任意数字
  * `/a[bde]c/`：检查一个字符串中是否包含 abc 或 adc 或 aec

{% hint style="info" %}
简单来说就是`[]`表示或，`[^]`表示除了。
{% endhint %}

预定义模式

* `\d` 匹配0-9之间的任一数字，相当于`[0-9]`。
* `\D` 匹配所有0-9以外的字符，相当于`[^0-9]`。
* `\w` 匹配任意的字母、数字和下划线，相当于`[A-Za-z0-9_]`。
* `\W` 除所有字母、数字和下划线以外的字符，相当于`[^A-Za-z0-9_]`。
* `\s` 匹配空格（包括换行符、制表符、空格符等），相等于`[ \t\r\n\v\f]`。
* `\S` 匹配非空格的字符，相当于`[^ \t\r\n\v\f]`。
* `\b` 匹配词的边界。
* `\B` 匹配非词边界，即在词的内部。

重复类

* `{n}`表示恰好重复`n`次
* `{n,}`表示至少重复`n`次
* `{n,m}`表示重复不少于`n`次，不多于`m`次

量词符

* `?` 问号表示某个模式出现0次或1次，等同于`{0, 1}`。
* `*` 星号表示某个模式出现0次或多次，等同于`{0,}`。
* `+` 加号表示某个模式出现1次或多次，等同于`{1,}`。

修饰符\(放在正则模式的最尾部 - /regex/修饰符\)

* `g`修饰符，默认情况下，第一次匹配成功后，正则对象就停止向下匹配了。`g`修饰符表示全局匹配（global），加上它以后，正则对象将匹配全部符合条件的结果，主要用于搜索和替换。
* `i`修饰符，默认情况下，正则对象区分字母的大小写，加上`i`修饰符以后表示忽略大小写。
* `m`修饰符，默认情况下（即不加`m`修饰符时），`^`和`$`匹配字符串的开始处和结尾处，加上`m`修饰符以后，`^`和`$`还会匹配行首和行尾，即`^`和`$`会忽略末尾换行符（`\n`）

{% hint style="warning" %}
全局匹配 g 慎用test\(\)方法，当设置全局标志 `/g` 时，一旦字符串中还存在匹配，test\(\) 方法都将返回 true，同时匹配成功后将把 `lastIndex` 属性的值设置为上次匹配成功结果之后的第一个字符所在的位置，下次匹配将从 `lastIndex` 指示的位置开始；匹配不成功时返回 false，同时将 lastIndex 属性的值重置为 0。

```javascript
const reg = /test/g;
const str = '_test_test';

console.log(reg.test(str)); // true
console.log(reg.lastIndex); // 5

console.log(reg.test(str)); // true
console.log(reg.lastIndex); // 10

console.log(reg.test(str)); // false
console.log(reg.lastIndex); // 0
```
{% endhint %}

**支持正则表达式的 String 对象的方法**

| 方法 | 描述 |
| :--- | :--- |
| split\(\) | 将字符串拆分成数组 |
| search\(\) | 搜索字符串中是否含有指定内容，返回索引 index |
| match\(\) | 根据正则表达式，从一个字符串中将符合条件的内容提取出来 |
| replace\(\) | 将字符串中的指定内容，替换为新的内容并返回 |

```javascript
"1a2b3c4d5e6f7g".split(/[A-z]/) // ["1", "2", "3", "4", "5", "6", "7", ""]
"hello abc hello aec afc".search(/a[bef]c/) // 6
"1a2a3a4a5e6f7A8B9C".match(/[a-z]/g); // ["a", "a", "a", "a", "e", "f"]
"Today is fine day,today is fine day".replace(/today/i,"tomorrow") // tomorrow is fine day,today is fine day
```

{% hint style="warning" %}
默认情况下，`match()`方法只会找到**第一个**符合要求的内容，找到以后就停止检索,我们可以设置正则表达式为**全局匹配**模式，这样就会匹配到所有的内容，并以**数组**的形式返回。
{% endhint %}

![](../../.gitbook/assets/regexp.png)

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

