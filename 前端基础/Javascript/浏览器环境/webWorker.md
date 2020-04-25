# Web Worker

简介：本文为Web Worker笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision)         联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)



> JavaScript 语言采用的是单线程模型，web worker的出现为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行，在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。

注意，worker线程无法读取主线程所在网页的 `DOM`对象，也无法使用`document`、`window`、`parent`对象，同时可以使用`navigator`对象和`location`对象。



## 1、基本用法

### 1.1 主线程

```javascript
// 1、创建worker线程 - 参数为worker线程要处理的脚本文件，注意Worker不能读取本地文件，脚本必须来自网络
var worker = new Worker('work.js'); 
// 2、向worker线程传递消息 - Worker线程和主线程之间不能通信，只能通过消息
worker.postMessage({method: 'echo', args: ['Work']});
// 3、监听worker线程传来消息
worker.onmessage = function (event) {
  data = event.data; // data属性可以获取 Worker 发来的数据
}
// 4、错误监听
worker.onerror(function (event) {
  console.log([
    'ERROR: Line ', event.lineno, ' in ', event.filename, ': ', event.message
  ].join(''));
});
// 5、关闭worker线程 - Worker比较耗资源，一旦使用完毕，就应该关闭，也可worker自己关闭，见下文
worker.terminate();

```

### 1.2 worker线程

```javascript
// 监听主线程发来的消息 - 其中self代表子线程自身，即子线程的全局对象
self.addEventListener('message', function (e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg);
      self.close(); // 在 Worker 内部关闭自身
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);


// 加载其他脚本，通过importScripts()
importScripts('script1.js', 'script2.js');
```



## 2、实例

### 2.1 worker完成服务器状态轮询

```javascript
function createWorker(f) {
  var blob = new Blob(['(' + f.toString() + ')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}

var pollingWorker = createWorker(function (e) {
  var cache;

  function compare(new, old) { ... };

  setInterval(function () {
    fetch('/my-api-endpoint').then(function (res) {
      var data = res.json();

      if (!compare(data, cache)) {
        cache = data;
        self.postMessage(data);
      }
    })
  }, 1000)
});

pollingWorker.onmessage = function () {
  // render data
}

pollingWorker.postMessage('init');
```

### 2.2 worker创建worker

> 一个计算密集的任务，分配到10个 Worker。

```javascript
// worker线程 - worker.js

// settings
var num_workers = 10;
var items_per_worker = 1000000;

// start the workers
var result = 0;
var pending_workers = num_workers;
for (var i = 0; i < num_workers; i += 1) {
  var worker = new Worker('core.js');
  worker.postMessage(i * items_per_worker);
  worker.postMessage((i + 1) * items_per_worker);
  worker.onmessage = storeResult;
}

// handle the results
function storeResult(event) {
  result += event.data;
  pending_workers -= 1;
  if (pending_workers <= 0)
    postMessage(result); // finished!
}
```

```javascript
// 任务脚本 - core.js
var start;
onmessage = getStart;
function getStart(event) {
  start = event.data;
  onmessage = getEnd;
}

var end;
function getEnd(event) {
  end = event.data;
  onmessage = null;
  work();
}

function work() {
  var result = 0;
  for (var i = start; i < end; i += 1) {
    // perform some complex calculation here
    result += 1;
  }
  postMessage(result);
  close();
}
```



------

如果发现本项目有错误，欢迎提交 issues 指正。