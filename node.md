# Node.js

> _Node_._js_ 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。_Node_._js_ 使用了一个事件驱动、非阻塞式 I/O 的模型,使其轻量又高效。

## 1. 基础知识

在 NodeJS 中，一般将代码合理拆分到不同的 JS 文件中，每一个文件就是一个模块，而文件路径就是模块名。在编写每个模块时，都有 require、exports、module 三个预先定义好的变量可供使用（CommonJS 规范）。

```javascript
// require - 在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。
var foo1 = require('./foo');
var foo2 = require('./foo.js');
```

```javascript
// exports - 当前模块的导出对象，用于导出模块公有方法和属性。
// module - 通过 module 对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。
const newModule = {
	add: (a, b) => a + b
}
module.exports  = newModule;
```

## 2. 网络模块

### 2.1 Http 模块

```javascript
const http = require('http')
const server = http.createServer(function (req, res) {
    res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"}); //插入响应头
    if (req.url === '/index.html') {
        res.write('This is demo.')
    } else {
        res.write('404')
    }
    res.end();
});

server.listen(3000, function () {
    console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
});
```

### 2.2 URL 模块（解析 URL）

```javascript
let jd_url = "https://search.jd.com/Search?keyword=空气净化器&enc=utf-8";
let { pathname, query } = url.parse(request.url, true); // true 表示同时解析 query 字段
/*
query: { 
keyword: '空气净化器',
enc: 'utf-8'
}
pathname: '/Search'
*/
```

### 2.3 多进程

```javascript
const os = require("os");
const http = require("http");
const process = require("process");
const cluster = require("cluster");

// 主进程：分配任务
if (cluster.isMaster) {
    console.log(`主进程PID：${process.pid}`);
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    // 子进程执行任务
    http.createServer((request, response) => {
        console.log(`当前进程PID：${process.pid}，父进程PPID：${process.ppid}`);
        response.write("Fork Test");
        response.end();
    }).listen(8080, () => {
        console.log(`服务器启动成功，当前端口：8080，进程PID：${process.pid}`);
    });
}
```

```text
结果：
主进程PID：12316
服务器启动成功，当前端口：8080，进程PID：20700
服务器启动成功，当前端口：8080，进程PID：22108
服务器启动成功，当前端口：8080，进程PID：20052
服务器启动成功，当前端口：8080，进程PID：20720

访问结果（只有进程忙不过来才会让其他进程处理，否则都是该进程处理）：
当前进程PID：20720，父进程PPID：12316
当前进程PID：20720，父进程PPID：12316
当前进程PID：20720，父进程PPID：12316
当前进程PID：20720，父进程PPID：12316
```

## 3. 文件模块

### 3.1 fs 模块

* 检测是文件还是目录 - fs.stat
* 创建目录 - fs.mkdir
* 写文件 - fs.writeFile
* 读文件 - fs.readFile
  * toString\(\)：buffer转换成字符串
  * toJSON\(\)：buffer转化成Json
* 追加文件 - fs.appendFile \(如果没有文件则会生成文件，相当于创建文件\)
* 读取目录 - fs.readdir
* 重命名 - fs.rename
* 删除目录 - fs.rmdir
* 删除文件 - fs.unlink
* 管道流（大文件一般都是用流）

```javascript
// 创建一个可读流
const readerStream = fs.createReadStream('demo.txt');
// 创建一个可写流
const writerStream = fs.createWriteStream('output.txt');
// 管道读写操作 - 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
```

### 3.2 zlib 模块（压缩包）

```javascript
const fs = require('fs')
const zlib = require('zlib')

const readerStream = fs.createReadStream('demo.txt');
const gz = zlib.createGzip();
const writerStream = fs.createWriteStream('demo.txt.gz');

// readerStream水龙头先传给了gz，gz又当一个水龙头传给了writerStream
readerStream.pipe(gz).pipe(writerStream);

writerStream.on("finish", () => {
    console.log("写入完毕");
});
```

## 4. Express 框架

### 4.1 快速入门

安装

```text
$ npm install express --save
```

生成器工具 `express-generator` 快速创建一个应用的骨架

```text
$ npx express-generator
```

路由

```javascript
const express = require('express')
const app = express()
app.listen(3000, () => console.log(`Example app listening on port ${port}!`))

// 格式 - app.METHOD(PATH, HANDLER)
// app为express实例，path为路径，HANDLER为路由匹配时执行的操作
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', (req, res) => res.send('Got a POST request'))
app.put('/user', (req, res) => res.send('Got a PUT request at /user'))
app.delete('/user', (req, res) => res.send('Got a DELETE request at /user'))
```

静态文件读取

```javascript
// 图像、CSS 文件和 JavaScript 文件之类的静态文件，使用 Express 中的 express.static 内置中间件函数

// 访问public目录中的所有文件，例如http://localhost:3000/images/pic.jpg等
app.use(express.static('public'))
// 通过带有/static前缀地址来访问public目录中的文件，例如http://localhost:3000/static/images/pic.jpg
app.use('/static', express.static('public'))
```

### 4.2 路由

格式： `app.METHOD(path, [callback...], callback)`

```javascript
// 1、Path路径匹配
// 字符串
app.get('/', (req, res) => {res.send('root')}); // 匹配根路径的请求
app.get('/about', (req, res) => {res.send('about')}); // 匹配 /about 路径的请求
// 字符串模式
app.get('/ab+cd', (req, res) => {res.send('ab+cd')}; // 匹配 abcd、abbcd、abbbcd等
// 正则表达式
app.get(/a/, (req, res) => {res.send('/a/')}; // 匹配任何路径中含有 a 的路径
```

```javascript
// 2、callback路由句柄 - 可以利用next请求处理提供多个回调函数
// 使用多个回调函数处理路由
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
// 使用回调函数数组处理路由
const callback_a = function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}
const callback_b = function (req, res) {
  res.send('Hello from B!');
}
app.get('/example/b', [callback_a,callback_b]);
```

```javascript
// 注意一个特殊的请求all，它的作用是对于一个路径上的所有请求加载中间件：
// 所有来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
```

响应对象（`res`）的方法向客户端返回响应：

| 方法 | 描述 |
| :--- | :--- |
| res.download\(\) | 提示下载文件。 |
| res.end\(\) | 终结响应处理流程。 |
| res.json\(\) | 发送一个 JSON 格式的响应。 |
| res.jsonp\(\) | 发送一个支持 JSONP 的 JSON 格式的响应。 |
| res.redirect\(\) | 重定向请求。 |
| res.render\(\) | 渲染视图模板。 |
| res.send\(\) | 发送各种类型的响应。 |
| res.sendFile\(\) | 以八位字节流的形式发送文件。 |
| res.sendStatus\(\) | 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。 |

链式路由：

```javascript
// 所有来自'/book'的请求都写在一起，有利于模块化路由
app.route('/book').get(function(req, res) {
  res.send('Get a random book');
}).post(function(req, res) {
  res.send('Add a book');
}).put(function(req, res) {
  res.send('Update the book');
});
```

模块化路由的写法

```javascript
// 路由文件 newRouter.js
var express = require('express');
var router = express.Router();
// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.send('About birds');
});
module.exports = router

// 使用文件 index.js
const newRouter = require('/newRouter.js');
app.use('/newRouter', newRouter)
// 可自动处理/newRouter 和 /newRouter/about 路径的请求
```

### 4.3 中间件Middleware

Express 本身就是由路由和中间件构成一个的 web 开发框架，中间件可以访问请求对象、响应对象和next变量，\(不知道是否可以简单理解为回调函数\)，其功能包括功能包括：

* 执行任何代码。
* 修改请求和响应对象。
* 终结请求-响应循环。
* 调用堆栈中的下一个中间件。

应用级中间件：绑定到 app 对象使用 `app.use()` 和 `app.METHOD()`：

```javascript
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```

路由级中间件：绑定的对象为 `express.Router()`：

```javascript
var app = express();
var router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 一个中间件栈，显示任何指向 /user/:id 的 HTTP 请求的信息
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
router.get('/user/:id', function (req, res, next) {
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0) next('route');
  // 负责将控制权交给栈中下一个中间件
  else next(); //
}, function (req, res, next) {
  // 渲染常规页面
  res.render('regular');
});

// 处理 /user/:id， 渲染一个特殊页面
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});
```

错误处理中间件：使用 4 个参数\(err, req, res, next\)：

```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

第三方中间件（以解析 cookie 的中间件 cookie-parser 为例）：

```javascript
// $ npm install cookie-parser
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// 加载用于解析 cookie 的中间件
app.use(cookieParser());
```

{% hint style="info" %}
参考资料：

* [一文入门 NodeJS](https://www.cnblogs.com/dotnetcrazy/p/10118756.html)  
* [七天学会 NodeJS](http://nqdeng.github.io/7-days-nodejs/) 
* [NodeJS 教程](https://www.runoob.com/nodejs/nodejs-tutorial.html)
* [Express 开发框架](http://caibaojian.com/expressjs/index.html)
* [Node 入门](https://www.nodebeginner.org/index-zh-cn.html#javascript-and-nodejs)
{% endhint %}

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

