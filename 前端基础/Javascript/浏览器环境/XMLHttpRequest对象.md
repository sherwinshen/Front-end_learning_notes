# XMLHttpRequest对象

简介：前端个人学习笔记-XMLHttpRequest对象，完整笔记在[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision)         联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)



## AJAX 通信

1. 创建XMLHttpRequest对象实例
2. 发出 HTTP 请求
3. 接收服务器传回的数据
4. 更新网页数据

> 尽管名字里面有`XML`和`Http`，实际上可以使用多种协议（比如`file`或`ftp`），发送任何格式的数据（包括字符串和二进制）。



## 简单例子

```javascript
// 创建实例，不含参数
var xhr = new XMLHttpRequest();

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

// 指定建立 HTTP 连接的细节，方法类型、服务器地址、是否异步
xhr.open('GET', '/endpoint', true);

// 使用send()方法，实际发出请求
xhr.send(null);
```

**访问服务端返回的数据**

 - httpRequest.responseText
   - 服务器以文本字符的形式返回
 - httpRequest.responseXML 
   - 以 XMLDocument 对象方式返回，之后就可以使用JavaScript来处理

**post请求**

POST请求则需要设置`RequestHeader`告诉后台传递内容的编码方式以及在send方法里传入对应的值

```js
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type": "application/x-www-form-urlencoded");
xhr.send("key1=value1&key2=value2");
```



## 实例属性

| 属性                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| xhr.readyState      | 实例对象的当前状态（整数）                                   |
| xhr.response        | 表示服务器返回的数据体（即 HTTP 回应的 body 部分）           |
| xor.responseType    | 表示服务器返回数据的类型（字符串）                           |
| xhr.responseText    | 返回从服务器接收到的字符串                                   |
| xhr.responseXML     | 返回从服务器接收到的 HTML 或 XML 文档对象                    |
| xhr.responseURL     | 表示发送数据的服务器的网址（字符串）                         |
| xhr.status          | 表示服务器回应的 HTTP 状态码（整数）                         |
| xhr.timeout         | 表示多少毫秒后，若请求没有结果，则自动终止（整数）           |
| xhr.withCredentials | 表示跨域请求时，用户信息是否会包含在请求之中（布尔值）默认false |
| xhr.upload          | 用于上传文件，该属性得到一个对象，通过观察对象，可以得知上传的进展，该对象可以添加监听事件loadstart、loadend、load、abort、error、progress、timeout等，如`xhr.upload.loadstart` |



## 实例监听属性

- XMLHttpRequest.onreadystatechange - 指向一个监听函数，实例`readyState`属性变化，则执行该函数
- XMLHttpRequest.onloadstart：loadstart 事件（HTTP 请求发出）的监听函数
- XMLHttpRequest.onprogress：progress事件（正在发送和加载数据）的监听函数
- XMLHttpRequest.onabort：abort 事件（请求中止，比如用户调用了`abort()`方法）的监听函数
- XMLHttpRequest.onerror：error 事件（请求失败）的监听函数
- XMLHttpRequest.onload：load 事件（请求成功完成）的监听函数
- XMLHttpRequest.ontimeout：timeout 事件（用户指定的时限超过了，请求还未完成）的监听函数
- XMLHttpRequest.onloadend：loadend 事件（请求完成，不管成功或失败）的监听函数



## 实例方法

| 属性                        | 说明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| xhr.open()                  | 指定 HTTP 请求的参数，或者说初始化 XMLHttpRequest 实例对象   |
| xhr.send()                  | 用于实际发出 HTTP 请求                                       |
| xhr.setRequestHeader()      | 用于设置浏览器发送的 HTTP 请求的头信息                       |
| xhr.getResponseHeader()     | 返回 HTTP 头信息指定字段的值，如果还没有收到服务器回应或者指定字段不存在，返回`null` |
| xhr.getAllResponseHeaders() | 返回一个字符串，表示服务器发来的所有 HTTP 头信息，CRLF分隔   |
| xhr.overrideMimeType()      | 用来指定 MIME 类型，覆盖服务器返回的真正的 MIME 类型，从而让浏览器进行不一样的处理 |
| xhr.abort()                 | 终止已经发出的 HTTP 请求，`readyState`属性变`4`，`status`属性变`0` |



## 实例事件

- xhr.addEventListener('progress', updateProgress); - 用于监听上传进度

```javascript
var xhr = new XMLHttpRequest();

function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
  } else {
    console.log('无法计算进展');
  }
}

xhr.addEventListener('progress', updateProgress);

xhr.open();
```

- xhr.addEventListener('load', transferComplete); - 表示服务器传来的数据接收完毕
- xhr.addEventListener('error', transferFailed); - 表示请求出错
- xhr.addEventListener('abort', transferCanceled); - 表示请求被中断（比如用户取消请求）



------

如果发现本项目有错误，欢迎提交 issues 指正。