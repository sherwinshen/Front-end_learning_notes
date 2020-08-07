# 浏览器对象

简介：本文为浏览器对象相关笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 1、Location 对象

> Location 对象提供 URL 相关的信息和操作方法。通过通过`window.location`和`document.location`属性得到对象。

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

## 2、URL 对象

url的合法对象分为：

* URL 元字符：分号（`;`），逗号（`,`），斜杠（`/`），问号（`?`），冒号（`:`），at（`@`），`&`，等号（`=`），加号（`+`），美元符号（`$`），井号（`#`）
* 语义字符：`a-z`，`A-Z`，`0-9`，连词号（`-`），下划线（`_`），点（`.`），感叹号（`!`），波浪线（`~`），星号（`*`），单引号（`'`），圆括号（`()`）

url编码和解码即合法与不合法之间的转换：

* `encodeURI()`方法用于转码整个 URL，转码**元字符**和**语义字符**之外的字符
* `encodeURIComponent()`方法用于转码 URL 的组成部分，转码**语义字符**之外的所有字符
* `decodeURI()`方法用于整个 URL 的解码
* `decodeURIComponent()`方法用于URL 片段的解码

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

## 3、URLSearchParams 对象

> `URLSearchParams`对象用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面的部分）。

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

## 4、History 对象

> `window.history`指向 History 对象，表示当前窗口的浏览历史。

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

> 每当同一个文档的浏览历史（即`history`对象）出现变化时，就会触发`popstate`事件。注意，仅仅调用`pushState()`方法或`replaceState()`方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用`History.back()`、`History.forward()`、`History.go()`方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

```javascript
// 添加监听函数
window.addEventListener('popstate', callback)
```

## 5、ArrayBuffer 对象

> ArrayBuffer 对象表示一段二进制数据，用来模拟内存里面的数据。通过这个对象，JavaScript 可以读写二进制数据。这个对象可以看作内存数据的表达。具体参看[教程](https://wangdoc.com/javascript/bom/arraybuffer.html)

## 6、Blob 对象

> Blob 对象表示一个二进制文件的数据内容，通常用来读写文件，比如一个图片文件的内容就可以通过 Blob 对象读写通常用来读写文件。它与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存。具体参看[教程](https://wangdoc.com/javascript/bom/arraybuffer.html)

## 7、File 对象

> File 对象代表一个文件，用来读写文件信息，可以说是一种特殊的 Blob 对象。

```javascript
// 最常见的使用场合是表单的文件上传控件（<input type="file">），用户选中文件以后，浏览器就会生成一个文件数组，元素都是File对象
const file = document.getElementById('fileItem').files[0]; // File对象
```

```javascript
// 通过构造对象new File(array, name [, options])生成File对象，array文件内容，name表示文件名或文件路径
const file = new File(['foo'], 'foo.txt', {type: 'text/plain',})
```

实例属性：

* File.lastModified：最后修改时间
* File.name：文件名或文件路径
* File.size：文件大小（单位字节）
* File.type：文件的 MIME 类型

实例方法：

* 继承Blob对象的方法

## 8、FileList 对象

> `FileList`对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 File 实例。

FileList 对象主要出现的两个场合：

* 文件控件节点（```）的``files\`属性，返回一个 FileList 实例。
* 拖拉一组文件时，目标区的`DataTransfer.files`属性，返回一个 FileList 实例。

FileList 的实例是一个类似数组的对象，可以直接用`[]`运算符，即`myFileList[0]`表示第一个File对象。

## 9、FileReader 对象

> FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容。

```javascript
// 生成实例对象
var reader = new FileReader();
```

实例属性：

* FileReader.error：读取文件时产生的错误对象
* FileReader.readyState：整数，表示读取文件时的当前状态。一共有三种可能的状态，`0`表示尚未加载任何数据，`1`表示数据正在加载，`2`表示加载完成。
* FileReader.result：读取完成后的文件内容，有可能是字符串，也可能是一个 ArrayBuffer 实例。
* FileReader.onabort：`abort`事件（用户终止读取操作）的监听函数。
* FileReader.onerror：`error`事件（读取错误）的监听函数。
* FileReader.onload：`load`事件（读取操作完成）的监听函数，通常在这个函数里面使用`result`属性，拿到文件内容。
* FileReader.onloadstart：`loadstart`事件（读取操作开始）的监听函数。
* FileReader.onloadend：`loadend`事件（读取操作结束）的监听函数。
* FileReader.onprogress：`progress`事件（读取操作进行中）的监听函数。

实例方法：

* FileReader.abort\(\)：终止读取操作，`readyState`属性将变成`2`。
* FileReader.readAsArrayBuffer\(\)：以 ArrayBuffer 的格式读取文件，读取完成后`result`属性将返回一个 ArrayBuffer 实例。
* FileReader.readAsBinaryString\(\)：读取完成后，`result`属性将返回原始的二进制字符串。
* FileReader.readAsDataURL\(\)：读取完成后，`result`属性将返回一个 Data URL 格式（Base64 编码）的字符串，代表文件内容。对于图片文件，这个字符串可以用于`<img>`元素的`src`属性。注意，这个字符串不能直接进行 Base64 解码，必须把前缀`data:*/*;base64,`从字符串里删除以后，再进行解码。
* FileReader.readAsText\(\)：读取完成后，`result`属性将返回文件内容的文本字符串。该方法的第一个参数是代表文件的 Blob 实例，第二个参数是可选的，表示文本编码，默认为 UTF-8。

```javascript
// 举例
/* HTML 代码如下
  <input type="file" onchange="previewFile()">
  <img src="" height="200">
*/

function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener('load', function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
```

如果发现本项目有错误，欢迎提交 issues 指正。

