# Date 对象

{% hint style="info" %}
参考资料：[Date 对象](https://wangdoc.com/javascript/stdlib/date.html)
{% endhint %}

## 1. 构造函数

允许多种参数（以国际标准时间（UTC）1970年1月1日00:00:00作为时间的零点）：

```javascript
// 参数为时间零点开始计算的毫秒数
new Date(1378218728000) // Tue Sep 03 2013 22:32:08 GMT+0800 (CST)
​
// 参数为日期字符串 - 只要是能被Date.parse()方法解析
new Date('2013-2-15')
new Date('2013/2/15')
new Date('02/15/2013')
new Date('2013-FEB-15')
new Date('FEB, 15, 2013')
new Date('FEB 15, 2013')
new Date('February, 15, 2013')
new Date('February 15, 2013')
new Date('15 Feb 2013')
new Date('15, February, 2013')
// Fri Feb 15 2013 00:00:00 GMT+0800 (CST)
​
// 参数为多个整数，代表年、月、日、小时、分钟、秒、毫秒
new Date(2013, 0, 1, 0, 0, 0, 0)
// Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
​
// 参数为负整数，代表1970年元旦之前的时间
new Date(-1378218728000)
// Fri Apr 30 1926 17:27:52 GMT+0800 (CST)
```

## 2. 静态方法

```javascript
// Date.now() - 返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数
Date.now() // 1364026285194
​
// Date.parse() - 解析日期字符串，返回该时间距离时间零点（1970年1月1日 00:00:00）的毫秒数
Date.parse('Aug 9, 1995')
Date.parse('January 26, 2011 13:51:50')
Date.parse('Mon, 25 Dec 1995 13:30:00 GMT')
Date.parse('Mon, 25 Dec 1995 13:30:00 +0430')
Date.parse('2011-10-10')
Date.parse('2011-10-10T14:48:00')
Date.parse('xxx') // NaN
​
// Date.UTC() - 接受年、月、日等作为参数，返回该时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数。
// 格式：(year, month[, date[, hrs[, min[, sec[, ms]]]]])
Date.UTC(2011, 0, 1, 2, 3, 4, 567) // 1293847384567
```

## 3. 实例方法

**to 类** - 从 Date 对象返回一个字符串，表示指定的时间。

```javascript
const d = new Date(2013, 0, 1);

// Data.toString() - 返回一个完整的日期字符串
d.toString() // "Tue Jan 01 2013 00:00:00 GMT+0800 (CST)"
// Data.toUTCString() - 返回对应的 UTC 时间(比北京晚8个小时)
d.toUTCString() // "Mon, 31 Dec 2012 16:00:00 GMT"
// Date.toISOString() - 返回对应时间的 ISO8601 写法，注意也为UTC时区
d.toISOString() // "2012-12-31T16:00:00.000Z"
// Date.toJSON() - 返回一个符合 JSON 格式的 ISO 日期字符串
d.toJSON() // "2012-12-31T16:00:00.000Z"

// Data.toDateString() - 返回日期字符串（不含小时、分和秒）
d.toDateString() // "Tue Jan 01 2013"
// Date.prototype.toTimeString() - 返回时间字符串（不含年月日）
d.toTimeString() // "00:00:00 GMT+0800 (CST)"
```

**get 类** - 获取 Date 对象的日期和时间，返回的为当前时区的。

* `getTime()`：返回实例距离1970年1月1日00:00:00的毫秒数，等同于`valueOf`方法
* `getDate()`：返回实例对象对应每个月的几号（从1开始）。
* `getDay()`：返回星期几，星期日为0，星期一为1，以此类推。
* `getFullYear()`：返回四位的年份。
* `getMonth()`：返回月份（0表示1月，11表示12月）。
* `getHours()`：返回小时（0-23）。
* `getMilliseconds()`：返回毫秒（0-999）。
* `getMinutes()`：返回分钟（0-59）。
* `getSeconds()`：返回秒（0-59）。
* `getTimezoneOffset()`：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素。

{% hint style="warning" %}
getDate\(\) 区别于其他，日期是从 1 开始的，其他都是 0 开始；另外不要搞混 getDate\(\) 和 getDay\(\)，一个日期一个星期。
{% endhint %}

**set 类** - 设置 Date 对象的日期和时间，设置当前时区的时间。

* `setDate(date)`：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳。
* `setFullYear(year [, month, date])`：设置四位年份。
* `setHours(hour [, min, sec, ms])`：设置小时（0-23）。
* `setMilliseconds()`：设置毫秒（0-999）。
* `setMinutes(min [, sec, ms])`：设置分钟（0-59）。
* `setMonth(month [, date])`：设置月份（0-11）。
* `setSeconds(sec [, ms])`：设置秒（0-59）。
* `setTime(milliseconds)`：设置毫秒时间戳。

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

