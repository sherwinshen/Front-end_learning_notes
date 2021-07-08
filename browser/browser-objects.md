# 浏览器模型

{% hint style="info" %}
参考资料：[JS 教程 - 浏览器模型](https://wangdoc.com/javascript/bom/index.html)  [MDN - Web API 接口参考](https://developer.mozilla.org/zh-CN/docs/Web/API)
{% endhint %}

{% hint style="warning" %}
第 5-9 节内容建议结合[《文件上传与下载》](../comprehensive/file-upload-download.md)学习。
{% endhint %}

## 1. 浏览器对象 BOM

BOM\(Browser Object Model\) 是指浏览器对象模型，是用于描述这种对象与对象之间层次关系的模型，浏览器对象模型提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。BOM由多个对象组成，其中代表浏览器窗口的 Window 对象是BOM的顶层对象，其他对象都是该对象的子对象（如 Screen、Location、History、Navigator 等）。

![](../.gitbook/assets/bom.png)

### 1.1 Window 对象

浏览器里面，`window`对象（注意，`w`为小写）指当前的浏览器窗口。它也是当前页面的顶层对象，即最高一层的对象，所有其他对象都是它的下属。一个变量如果未声明，那么默认就是顶层对象的属性。具体详见[《网道 - Window 对象》](https://wangdoc.com/javascript/bom/window.html)。

```javascript
// 打开窗口
window.open(url,target,param)
// 关闭窗口
window.close()
```

### 1.2 Location 对象

Location 对象提供 URL 相关的信息和操作方法。通过 `window.location` 和 `document.location` 属性得到对象。

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

```javascript
document.location.assign('http://www.example.com'); // 跳转到新的网址
document.location.replace('http://www.example.com'); // 跳转到新的网址,并在浏览历史删除当前网址
window.location.reload(true); // 向服务器重新请求当前网址
```

### 1.3 History 对象

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

### 1.4 Screen 对象

Screen 对象表示当前窗口所在的屏幕，提供显示设备的信息。`window.screen`属性指向这个对象。具体详见[《网道 - Screen 对象》](https://wangdoc.com/javascript/bom/navigator.html)。

### 1.5 Navigator 对象

`window.navigator`属性指向一个包含浏览器和系统信息的 Navigator 对象。脚本通过这个属性了解用户的环境信息。具体详见[《网道 - Navigator 对象》](https://wangdoc.com/javascript/bom/navigator.html)。

## 2. Document 对象

Document Object Model（DOM），文档对象模型，其由节点组成的。DOM 为文档提供了结构化表示，并定义了如何通过脚本来访问文档结构。

**DOM 节点分类：**

* 文档节点（文档）：整个 HTML 文档
* 元素节点（标签）：HTML标签
* 属性节点（属性）：元素的属性
* 文本节点（文本）：HTML标签中的文本内容（包括空格/换行）

![](../.gitbook/assets/dom-jie-dian-.png)

**DOM 节点获取：**

* 获取直接节点
  * `document.getElementById()`
  * `document.getElementsByClassName()`
  * `document.getElementsByTagName()`
  * `document.querySelector()`
  * `document.querySelectorAll()`
* 获取关系节点
  * 父节点：`节点.parentNode`
  * 下一个兄弟节点：`节点.nextElementSibling || 节点.nextSibling`
  * 前一个兄弟节点：`节点.previousElementSibling || 节点.previousSibling`
  * 任意兄弟节点：`节点.parentNode.children[index]`
  * 第一个子节点：`节点.firstElementChild || 节点.firstChild`
  * 最后一个子节点：`节点.lastElementChild || 节点.lastChild`
  * 所有子节点：`节点.children`

**DOM 节点操作：**

* 创建节点：`document.createElement("标签名")`
* 末尾插入节点：`节点.appendChild(新的子节点)`
* 定位插入节点：`节点.insertBefore(新的子节点, 作为参考的子节点)`
* 删除节点：`节点.removeChild(子节点)`
* 克隆节点：`要复制的节点.cloneNode()`

 **DOM 节点属性操作：**

* 获取属性：`节点.属性名`或`节点.getAttribute("属性名称")`
* 设置属性：`节点.属性名=XXX`或`节点.setAttribute("属性名", "属性值")`
* 删除属性：`节点.removeAttribute(属性名)`

{% hint style="info" %}
上述获取和设置属性都有两种方法，其区别在于：

* `元素节点.属性`方式绑定的属性值不会出现在标签上
* `get/setAttribut`绑定的属性值会出现在标签上
{% endhint %}



## 3. URL 对象

url的合法对象分为：

* URL 元字符：分号（`;`），逗号（`,`），斜杠（`/`），问号（`?`），冒号（`:`），at（`@`），`&`，等号（`=`），加号（`+`），美元符号（`$`），井号（`#`）
* 语义字符：`a-z`，`A-Z`，`0-9`，连词号（`-`），下划线（`_`），点（`.`），感叹号（`!`），波浪线（`~`），星号（`*`），单引号（`'`），圆括号（`()`）

url编码和解码即合法与不合法之间的转换：

* `encodeURI()`方法用于转码整个 URL，转码**元字符**和**语义字符**之外的字符
* `encodeURIComponent()`方法用于转码 URL 的组成部分，转码**语义字符**之外的所有字符
* `decodeURI()`方法用于整个 URL 的解码
* `decodeURIComponent()`方法用于URL 片段的解码

`URL`接口是一个构造函数，通过`window.URL`可以拿到构造函数。

```javascript
var url = new URL('http://www.example.com/index.html');
url.href // "http://www.example.com/index.html"
```

实例属性：

```javascript
var url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1');
​
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

## 4. URLSearchParams 对象

`URLSearchParams` 对象用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面部分）。

```javascript
// 方法一：传入字符串
var params = new URLSearchParams('?foo=1&bar=2');
// 方法二：传入数组
var params = new URLSearchParams([['foo', 1], ['bar', 2]]);
// 方法三：传入对象
var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});
​
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

## 5. XMLHttpRequest 对象

{% hint style="info" %}
具体属性和方法详见 [网道 - XMLHttpRequest 对象](https://wangdoc.com/javascript/bom/xmlhttprequest.html)
{% endhint %}

**AJAX 通信**

1. 创建XMLHttpRequest对象实例
2. 发出 HTTP 请求
3. 接收服务器传回的数据
4. 更新网页数据

```javascript
// 创建实例，不含参数
var xhr = new XMLHttpRequest();

// 指定建立 HTTP 连接的细节，方法类型、服务器地址、是否异步
xhr.open('GET', '/endpoint', true);

// 回调函数 - 监听通信状态
xhr.onreadystatechange = function () {
    // 通信成功时，状态值为4
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.error(xhr.statusText);
        }
    }
};

// 回调函数 - 发生错误
xhr.onerror = function (e) {
    console.error(xhr.statusText);
};

// 使用send()方法，实际发出请求
xhr.send(null);
```

## 6. FormData 表单对象

```markup
<form action="/handling-page" method="post">
  <div>
    <label for="name">用户名：</label>
    <input type="text" id="name" name="user_name" required/>
  </div>
  <div>
    <label for="passwd">密码：</label>
    <input type="password" id="passwd" name="user_passwd" />
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="提交" />
  </div>
</form>
```

表单提交以键值对的形式，键名是控件的`name`属性，键值是控件的`value`属性。

* 表单以 GET 形式提交，所有键值对会以 URL 的查询字符串形式，提交到服务器，例如`/handling-page?user_name=张三&user_passwd=123&submit_button=提交`
* 表单以 POST 形式提交，所有键值对会连接成一行，作为 HTTP 请求的数据体发送到服务器，例如`user_name=张三&user_passwd=123&submit_button=提交`

{% hint style="info" %}
注意，实际提交的时候，只要键值不是 URL 的合法字符（比如汉字“张三”和“提交”），浏览器会自动对其进行编码。编发方式详见 [URL 对象](browser-objects.md#2-url-dui-xiang)。
{% endhint %}

`FormData()` 构造函数的参数是一个表单元素，如果参数为空，则默认为空表单。

```javascript
const formdata = new FormData(form);
```

表单实例方法（以上述表单为例）：

```javascript
const myForm = document.getElementById('myForm');
const formData = new FormData(myForm);

// 获取指定键名对应的键值，参数为键名
formData.get('user_name');
// 返回一个数组，表示指定键名对应的所有键值
formData.getAll();
// 设置指定键名的键值
formData.set('user_name','Envision');
// 删除一个键值对
formData.delete('user_name');
// 添加一个键值对。注意，如果键名重复，则会生成两个相同键名的键值对！！！
formData.append('user_name','Shen');
// 返回一个布尔值，表示是否具有该键名的键值对
formData.has('user_name');
// 返回一个遍历器对象，用于for...of循环遍历。
formData.keys(); formData.values();formData.enties();
```

{% hint style="info" %}
表单验证及其他相关属性详见[表单/FormData 对象](https://wangdoc.com/javascript/bom/form.html)。
{% endhint %}

```markup
<!-- 文件上传实例 -->
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">选择图片文件</label>
    <!-- multiple属性可以指定可以一次选择多个文件；如果没有这个属性，则一次只能选择一个文件。-->
    <input type="file" id="file" name="myFile" multiple> 
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="上传" />
  </div>
</form>

<script>
var fileSelect = document.getElementById('file');
var files = fileSelect.files;
// 新建一个 FormData 实例对象，模拟发送到服务器的表单数据
var formData = new FormData();
for (var i = 0; i < files.length; i++) {
  var file = files[i];
  // 只上传图片文件
  if (!file.type.match('image.*')) {
    continue;
  }
  formData.append('photos[]', file, file.name); // 一般两个参数，但如果第二个参数是文件，还可使用第三个参数，表文件名。
}
// 使用 Ajax 向服务器上传文件
var xhr = new XMLHttpRequest();
xhr.open('POST', 'handler.php', true);
xhr.onload = function () {
  if (xhr.status !== 200) {
    console.log('An error occurred!');
  }
};
xhr.send(formData);
</script>
```

## 7.  ArrayBuffer 对象

ArrayBuffer 对象表示一段二进制数据，用来模拟内存里面的数据。通过这个对象，JavaScript 可以读写二进制数据。这个对象可以看作内存数据的表达。具体详见 [ArrayBuffer 对象教程](https://wangdoc.com/javascript/bom/arraybuffer.html)。

## 8. Blob 对象

Blob 对象表示一个二进制文件的数据内容，通常用来读写文件，比如一个图片文件的内容就可以通过 Blob 对象读写通常用来读写文件。它与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存。具体详见 [Blob 对象教程](https://wangdoc.com/javascript/bom/arraybuffer.html)。

```javascript
// 构建对象 - options 为类型，如 {type : 'text/html'}
const blob = new Blob(array [, options])
// 举例 - 保存 json 数据
const obj = { hello: 'world' };
const blob = new Blob([ JSON.stringify(obj) ], {type : 'application/json'});
```

Blob 对象不能直接下载成文件，需要通过 `URL.createObjectURL()` 转化成一个临时 URL。这个 URL 以`blob://`开头，表明对应一个 Blob 对象，协议头后面是一个识别符，用来唯一对应内存里面的 Blob 对象。

```javascript
// 举例 - 通过为拖放的图片文件生成一个 URL，产生缩略图
var droptarget = document.getElementById('droptarget');

droptarget.ondrop = function (e) {
  var files = e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    var type = files[i].type;
    if (type.substring(0,6) !== 'image/')
      continue;
    var img = document.createElement('img');
    img.src = URL.createObjectURL(files[i]);
    img.onload = function () {
      this.width = 100;
      document.body.appendChild(this);
      URL.revokeObjectURL(this.src);
    }
  }
}
```

## 9. File 对象

File 对象代表一个文件，用来读写文件信息，可以说是一种特殊的 Blob 对象。

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

* 继承自 Blob 对象的方法

FileList 对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 File 实例。FileList 对象主要出现的两个场合：

* 文件控件节点的 files 属性，返回一个 FileList 实例。
* 拖拉一组文件时，目标区的 `DataTransfer.files` 属性，返回一个 FileList 实例。

FileList 的实例是一个类似数组的对象，可以直接用`[]`运算符，即 `myFileList[0]` 表示第一个 File 对象。

## 10. FileReader 对象

FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容。

```javascript
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

{% hint style="info" %}
上述 FileReader.readAsDataURL 和 FileReader.readAsArrayBuffer 最常用！！！
{% endhint %}

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

