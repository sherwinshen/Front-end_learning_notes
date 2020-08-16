# 异步操作

同步任务是那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。

## 1. 异步操作模式

### 1.1 回调函数

```javascript
function f1(callback){
  // ...
  callback();
}

function f2(){
  // ...
}

f1(f2); // f1若为异步操作，则f2会等待f1执行完毕才运行，正常js引擎遇到异步操作，会挂起，并运行下一个任务
```

### 1.2 事件监听

```javascript
function f1() {
  // ...
}

function f2() {
  // ...
}


// 当f1发生done事件，就执行f2。
f1.on('done', f2);

// f1.trigger('done')表示，执行完成后，立即触发done事件，从而开始执行f2
function f1() {
  setTimeout(function () {
    // ...
    f1.trigger('done');
  }, 1000);
}
```

### 1.3 发布/订阅

事件完全可以理解成“信号”，如果存在一个“信号中心”，某个任务执行完成，就向信号中心“发布”（publish）一个信号，其他任务可以向信号中心“订阅”（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做”发布/订阅模式”（publish-subscribe pattern），又称“观察者模式”（observer pattern）。

## 2. 定时器

### 2.1 setTimeout()

```javascript
var timerId = setTimeout(func|code, delay);
```

第一个参数 `func|code` 是将要推迟执行的函数名或者一段代码，第二个参数 `delay` 是推迟执行的毫秒数。返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。

```javascript
// 形式1
setTimeout('console.log(2)',1000);

// 形式2
function f() {
  console.log(2);
}
setTimeout(f, 1000);

//形式3 - 后面两个参数为回调函数的参数
setTimeout(function (a,b) {
  console.log(a + b);
}, 1000, 1, 1);
```

### 2.2 setInterval()

与setTimeout()用法一致，`setInterval`指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。`setTimeout`函数用来指定某个函数或某段代码，在多少毫秒之后执行。

### 2.3 clearTimeout() / clearInterval()

`setTimeout`和`setInterval`函数，都返回一个整数值，表示计数器编号。将该整数传入`clearTimeout`和`clearInterval`函数，就可以取消对应的定时器。

## 3. Promise对象

```javascript
// 基础语法
function f1(resolve, reject) {
  // 异步代码...
  
  if (/* 异步操作成功 */){
    resolve(value);
  } else { /* 异步操作失败 */
    reject(new Error());
  }
}
var p1 = new Promise(f1); // Promise构造函数接受一个回调函数f1作为参数
p1.then(successFunc, errorFunc); // Promise 实例有一个then方法，用来指定下一步的回调函数

// 举例 - setTimeout
function timeout(ms) {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, ms, 'done');
        }
    )
}
timeout(100).then(回调函数);
```

✍️ Promise 对象一旦新建它就会立即执行，无法中途取消。

### 3.1 Promise.prototype.then()

`then` 方法通过链式方法可读性更强，`then` 方法可以接受两个回调函数，第一个是异步操作成功时（变为`fulfilled`状态）的回调函数，第二个是异步操作失败（变为`rejected`）时的回调函数（一般该参数可以省略）

```javascript
// 写法一 - f3回调函数的参数，是f2函数的运行结果
f1().then(function () {
  return f2();
}).then(f3);;

// 写法二 - f3回调函数的参数，是undefined
f1().then(function () {
  f2();
}).then(f3);;

// 写法三 - f3回调函数的参数，是f2函数返回的函数的运行结果
f1().then(f2()).then(f3);;

// 写法四 - f3回调函数的参数，是f2函数的运行结果，并且f2会接收到f1()返回的结果
f1().then(f2).then(f3);;
```

### 3.3 Promise.prototype.catch()

`Promise.prototype.catch` 方法是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的别名，用于指定发生错误时的回调函数。因此在使用上建议 then 就使用单个参数表示成功回调函数，错误回调函数一律通过 catch 调用。

```javascript
f1().then(function() {
  // ...
}).catch(function(error) {
  console.log('发生错误！', error);
});
```

### 3.4 Promise.prototype.finally()

`finally `方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

### 3.5 async/await

{% hint style="info" %} 参考链接：[理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316) {% endhint %}

async返回的是一个promise对象，如果return 一个直接量，也会通过 `Promise.resolve()` 封装成 Promise 对象。await后面接Promise 对象，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。如果后面是不是一个Promise 对象，则表达式的运算结果就是它等到的东西。