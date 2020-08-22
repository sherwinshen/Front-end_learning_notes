# 文件相关对象

## 1. ArrayBuffer 对象

ArrayBuffer 对象表示一段二进制数据，用来模拟内存里面的数据。通过这个对象，JavaScript 可以读写二进制数据。这个对象可以看作内存数据的表达。具体参看👉 [教程](https://wangdoc.com/javascript/bom/arraybuffer.html)

## 2. Blob 对象

Blob 对象表示一个二进制文件的数据内容，通常用来读写文件，比如一个图片文件的内容就可以通过 Blob 对象读写通常用来读写文件。它与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存。具体参看👉 [教程](https://wangdoc.com/javascript/bom/arraybuffer.html)

```javascript
// 构建对象 - options 为类型，如 {type : 'text/html'}
const blob = new Blob(array [, options])
// 举例 - 保存 json 数据
const obj = { hello: 'world' };
const blob = new Blob([ JSON.stringify(obj) ], {type : 'application/json'});
```

✍️ Blob 对象不能直接下载成文件，需要通过 `URL.createObjectURL()` 转化成一个临时 URL。这个 URL 以`blob://`开头，表明对应一个 Blob 对象，协议头后面是一个识别符，用来唯一对应内存里面的 Blob 对象。

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

## 3. File 对象

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

- File.lastModified：最后修改时间
- File.name：文件名或文件路径
- File.size：文件大小（单位字节）
- File.type：文件的 MIME 类型

实例方法：

- 继承自 Blob 对象的方法

FileList 对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 File 实例。FileList 对象主要出现的两个场合：

- 文件控件节点的 files 属性，返回一个 FileList 实例。
- 拖拉一组文件时，目标区的 `DataTransfer.files` 属性，返回一个 FileList 实例。

FileList 的实例是一个类似数组的对象，可以直接用`[]`运算符，即 `myFileList[0] ` 表示第一个 File 对象。

## 4. FileReader 对象

FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容。

```javascript
var reader = new FileReader();
```

实例属性：

- FileReader.error：读取文件时产生的错误对象
- FileReader.readyState：整数，表示读取文件时的当前状态。一共有三种可能的状态，`0`表示尚未加载任何数据，`1`表示数据正在加载，`2`表示加载完成。
- FileReader.result：读取完成后的文件内容，有可能是字符串，也可能是一个 ArrayBuffer 实例。
- FileReader.onabort：`abort`事件（用户终止读取操作）的监听函数。
- FileReader.onerror：`error`事件（读取错误）的监听函数。
- FileReader.onload：`load`事件（读取操作完成）的监听函数，通常在这个函数里面使用`result`属性，拿到文件内容。
- FileReader.onloadstart：`loadstart`事件（读取操作开始）的监听函数。
- FileReader.onloadend：`loadend`事件（读取操作结束）的监听函数。
- FileReader.onprogress：`progress`事件（读取操作进行中）的监听函数。

实例方法：

- FileReader.abort()：终止读取操作，`readyState`属性将变成`2`。
- FileReader.readAsArrayBuffer()：以 ArrayBuffer 的格式读取文件，读取完成后`result`属性将返回一个 ArrayBuffer 实例。
- FileReader.readAsBinaryString()：读取完成后，`result`属性将返回原始的二进制字符串。
- FileReader.readAsDataURL()：读取完成后，`result`属性将返回一个 Data URL 格式（Base64 编码）的字符串，代表文件内容。对于图片文件，这个字符串可以用于`<img>`元素的`src`属性。注意，这个字符串不能直接进行 Base64 解码，必须把前缀`data:*/*;base64,`从字符串里删除以后，再进行解码。
- FileReader.readAsText()：读取完成后，`result`属性将返回文件内容的文本字符串。该方法的第一个参数是代表文件的 Blob 实例，第二个参数是可选的，表示文本编码，默认为 UTF-8。

其中 FileReader.readAsDataURL 和 FileReader.readAsArrayBuffer 最常用，需要理解！！！



{% hint style="info" %} 本文强烈建议结合 [文件上传与下载](../topics/file-upload-download.md) 一起学习 {% endhint %}