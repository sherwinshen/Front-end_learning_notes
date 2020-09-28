# 浏览器对象

## 1. Location 对象

Location 对象提供 URL 相关的信息和操作方法。通过 `window.location` 和 `document.location` 属性得到对象。

属性：

```javascript
// 当前网址为http://user:passwd@www.example.com:4097/path/a.html?x=111#part1

document.location.href
// "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
document.location.protocol
// "http:"
document.location.host
// "www.example.com:4097"
document.location.hostname
// "www.example.com"
document.location.port
// "4097"
document.location.pathname
// "/path/a.html"
document.location.search
// "?x=111"
document.location.hash
// "#part1"
document.location.username
// "user"
document.location.password
// "passwd"
document.location.origin
// "http://user:passwd@www.example.com:4097"

// 跳转到新网址
document.location.href = 'http://www.example.com';
// 滚动到新的锚点
document.location.href = '#top';
```

方法：

```javascript
document.location.assign('http://www.example.com'); // 跳转到新的网址
document.location.replace('http://www.example.com'); // 跳转到新的网址,并在浏览历史删除当前网址
window.location.reload(true); // 向服务器重新请求当前网址
```

## 2. URL 对象

url的合法对象分为：

- URL 元字符：分号（`;`），逗号（`,`），斜杠（`/`），问号（`?`），冒号（`:`），at（`@`），`&`，等号（`=`），加号（`+`），美元符号（`$`），井号（`#`）
- 语义字符：`a-z`，`A-Z`，`0-9`，连词号（`-`），下划线（`_`），点（`.`），感叹号（`!`），波浪线（`~`），星号（`*`），单引号（`'`），圆括号（`()`）

url编码和解码即合法与不合法之间的转换：

- `encodeURI()`方法用于转码整个 URL，转码**元字符**和**语义字符**之外的字符
- `encodeURIComponent()`方法用于转码 URL 的组成部分，转码**语义字符**之外的所有字符（一般使用这个）
- `decodeURI()`方法用于整个 URL 的解码
- `decodeURIComponent()`方法用于URL 片段的解码

> `URL`接口是一个构造函数，通过`window.URL`可以拿到构造函数。

```javascript
var url = new URL('http://www.example.com/index.html');
url.href // // "http://www.example.com/index.html"
```

实例属性：

```javascript
var url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1');

url.href // "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
url.protocol // "http:"
url.hostname // "www.example.com"
url.host // "www.example.com:4097"
url.port // "4097"
url.origin // "http://www.example.com:4097"
url.pathname // "/path/a.html"
url.search // "?x=111"
url.searchParams // URLSearchParams {}
url.hash // "#part1"
url.password // "passwd"
url.username // "user"
```

## 3. URLSearchParams 对象

`URLSearchParams` 对象用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面的部分）。

```javascript
// 方法一：传入字符串
var params = new URLSearchParams('?foo=1&bar=2');
// 方法二：传入数组
var params = new URLSearchParams([['foo', 1], ['bar', 2]]);
// 方法三：传入对象
var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});

var params = new URLSearchParams({'foo': 1 , 'bar': 2});
// 追加一个查询参数
params.append('baz', 3);
// 删除指定的查询参数
params.delete('bar');
// 查询字符串是否包含指定的键名，返回布尔值
params.has('bar') // false
// 设置查询字符串的键值
params.set('foo', 2);
// 读取查询字符串里面的指定键
params.get('foo') // "2"
// 读取查询字符串里面的指定键的所有键值，返回数组
var params = new URLSearchParams('?foo=3&foo=2&foo=1');
params.get('foo') // "3"
params.getAll('foo') // ["3", "2", "1"]
// 对查询字符串里面的键进行排序，规则是按照 Unicode 码点从小到大排列。
params.sort();
// for...of遍历
params.keys()
params.values()
params.entries()
```

## 4. History 对象

`window.history` 指向 History 对象，表示当前窗口的浏览历史。

```javascript
// 访问过的网址长度
window.history.length

// 移动到上一个网址，等同于点击浏览器的后退键
history.back()
// 移动到下一个网址，等同于点击浏览器的前进键
history.forward()
// 接受一个整数作为参数，移动到参数指定的网址
history.go(-1) // back
history.go(1) // forward
history.go() //相当于默认为0，刷新页面

// 在历史中添加一条记录
window.history.pushState(state, title, url)
// 修改当前记录
window.history.replaceState(state, title, url)
```

每当同一个文档的浏览历史（即`history`对象）出现变化时，就会触发`popstate`事件。注意，仅仅调用`pushState()`方法或`replaceState()`方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用`History.back()`、`History.forward()`、`History.go()`方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

```javascript
// 添加监听函数
window.addEventListener('popstate', callback)
```

