# 异步操作

> 同步任务是那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。异步操作执行顺序可详见[进阶知识-事件循环机制](../js-advanced.md#2-shi-jian-xun-huan-ji-zhi)。

{% hint style="info" %}
参考资料：[《网道教程 - 异步操作》](https://wangdoc.com/javascript/async/index.html)[《JS异步操作总结》](https://juejin.cn/post/6844904145502240781#heading-22)[《JS异步编程的方法》](https://juejin.cn/post/6844903776780828685)
{% endhint %}

## 1. 回调函数 Callback

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

## 2. 事件监听

异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

具体详见[《异步操作-事件监听》](https://wangdoc.com/javascript/async/general.html#%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC)。

## 3. 发布/订阅

事件完全可以理解成“信号”，如果存在一个“信号中心”，某个任务执行完成，就向信号中心“发布”（publish）一个信号，其他任务可以向信号中心“订阅”（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做”[发布/订阅模式](https://en.wikipedia.org/wiki/Publish-subscribe_pattern)”（publish-subscribe pattern），又称“[观察者模式](https://en.wikipedia.org/wiki/Observer_pattern)”（observer pattern）。

具体详见[《异步操作-发布订阅》](https://wangdoc.com/javascript/async/general.html#%E5%8F%91%E5%B8%83%E8%AE%A2%E9%98%85)。

## 4. 定时器

### 2.1 setTimeout\(\)

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

{% hint style="warning" %}
注意，setTimeout 其实还能加入其他的参数，第三个参数及以后的参数都可以作为回调函数的参数。
{% endhint %}

### 2.2 setInterval\(\)

与setTimeout\(\)用法一致，`setInterval`指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。`setTimeout`函数用来指定某个函数或某段代码，在多少毫秒之后执行。

{% hint style="info" %}
`setTimeout`和`setInterval`函数都返回一个整数值，表示计数器编号，将该整数传入`clearTimeout`和`clearInterval`函数，就可以取消对应的定时器。
{% endhint %}

## 5. ES6 - Promise\*

{% hint style="info" %}
参考链接：[ES6-promise](https://es6.ruanyifeng.com/#docs/promise)
{% endhint %}

```javascript
// Promise 封装异步操作

// 1. 接口封装
const promise = new Promise((resolve, reject)=>{
  // 异步代码...
  if (/* 异步操作成功 */){
    resolve(value);
  } else { /* 异步操作失败 */
    reject(new Error());
  }
})
// 或者还可以这么写
function promise() {
  return new Promise((resolve, reject)=>{
    // 异步代码...
    if (/* 异步操作成功 */){
      resolve(value);
    } else { /* 异步操作失败 */
      reject(new Error());
    }
  })
}


// 2. 业务调用接口
promise.then(successFunc, errorFunc) 
```

```javascript
// 举例
function timeout(ms) {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        }
    )
}

timeout(100).then(result => {});
```

{% hint style="info" %}
Promise 对象一旦新建它就会立即执行，无法中途取消。
{% endhint %}

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

`Promise.prototype.catch` 方法是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的别名，用于指定发生错误时的回调函数。因此在使用上建议 then 就使用单个参数表示成功回调函数，错误回调函数一律通过 catch 调用。

```javascript
f1().then(function() {
  // ...
}).catch(function(error) {
  console.log('发生错误！', error);
});
```

`finally`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

* `Promise.all()`并发处理多个异步任务，所有任务都执行成功，才能得到结果。
* `Promise.race()`并发处理多个异步任务，只要有一个任务执行成功，就能得到结果。

```javascript
Promise.all([promise1, promise2, promise3]).then((result) => {
    console.log(result);
});
Promise.all([promise1, promise2, promise3]).then((result) => {
    console.log(result);
});
```

链式调用，基于 Promise 处理多层嵌套调用：

```javascript
const operation1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('Operation1 is ok ')
    }, 1000)
  })
}

const operation2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('Operation2 is ok ')
    }, 1000)
  })
}


const operation3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('Operation3 is ok ')
    }, 1000)
  })
}

operation1().then((res) => {
  console.log(res)
  return operation2()
}).then((res) => {
  console.log(res)
  return operation3()
}).then((res) => {
  console.log(res)
})
```

return 后面的返回值，有两种情况：

* 情况 1：返回 Promise 实例对象，则该实例对象会调用下一个 then
* 情况 2：返回普通值，则直接传递给下一个 then，通过 then 参数中函数的参数接收该值

## 6. ES6- **Generator**

{% hint style="info" %}
参考资料：[ES6-Generator](https://es6.ruanyifeng.com/#docs/generator)
{% endhint %}

Generator 函数是一个状态机，封装了多个内部状态；Generator 函数也是一个遍历器对象生成函数，返回遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

```javascript
// 注意function后需要加*，函数体内部使用yield表达式，定义不同的内部状态
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator(); // 该函数有三个状态：hello，world 和 return 语句（结束执行），注意，函数名()并不是函数执行，而是一个指向内部状态的指针对象（遍历器对象）

// 调用遍历器对象的next方法，使得指针移向下一个状态，返回一个有着value和done两个属性的对象，done表示遍历是否结束。yield表达式是暂停执行的标记（还有return语句），next方法可以恢复往下执行。 
hw.next() // { value: 'hello', done: false }
hw.next() // { value: 'world', done: false }
hw.next() // { value: 'ending', done: true }
hw.next() // { value: undefined, done: true }
```

```javascript
// yield表达式只能用在 Generator 函数里面，即使是 Generator 函数里面的函数
function* f(a){
    a.forEach((item) => {
        yield 'hello';
    })
}

// yield表达式如果用在另一个表达式之中，必须放在圆括号里面
function* demo() {
    console.log('Hello' + yield 123); // SyntaxError
    console.log('Hello' + (yield 123)); // OK
}
```

next 方法可以带参数，该参数就会被当作上一个 `yield` 表达式的返回值（第一次使用 `next` 方法时无上一个yeild，则传递参数是无效的），若不带参数，yield表达式对应值为undefined。

```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false} 
a.next() // Object{value:NaN, done:false} - 无参数返回，则yield表达式对应的值为undefined
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

内部调用的是遍历器接口的都可以将 Generator 函数返回的 Iterator 对象作为参数，但是注意返回对象的`done`属性为`true`，遍历循环就会中止，且不包含该返回对象，也就是说return后面所带的不包含在内。

```javascript
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```

Generator 函数返回的遍历器对象的方法：

* next\(\) - 使得指针移向下一个状态，见上面的一些应用
* throw\(\) - 在函数体外抛出错误，然后在 Generator 函数体内捕获。
* return\(\) - 可以返回给定的值，并且终结遍历 Generator 函数。

这三个方法本质上是同一件事，它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 yield 表达式。

```javascript
// throw 例子
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};
var i = g();
i.next();
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a - Generator函数内捕获错误
// 外部捕获 b - 由于Generator函数内捕获错误已经执行过了，因而在外部捕获
​
// return例子
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
​
var g = gen();
​
g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

yield\* 表达式用来在一个 Generator 函数里面执行另一个 Generator 函数。

```javascript
function* foo() {
  yield 'a';
  yield 'b';
}
​
// yield* 表达式等同于部署一个for...of循环
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}  // 'x' 'a' 'b' 'y' 
​
// 如果不加*则返回的是一个遍历器对象。
function* bar() {
  yield 'x';
  yield foo();
  yield 'y';
} // 'x' 一个遍历器对象 'y'
```

yield\* 后面的 Generator函数，没有 return 语句时，相当于 for...of 的一种简写形式；在有 return 语句时，则需要用 var value = yield\* iterator 的形式获取 return 语句的值。

```javascript
function* iter1(){
    yield 'x';
    yield 'y';
}
​
function* iter2() {
    yield 'a';
    yield 'b';
    return 'c';
}
​
function* concat(iter1, iter2) {
  yield* iter1;
  const value = yield* iter2;
  yield value;
}
​
const a = concat(iter1(),iter2()); // x y a b c
```

实际上，任何数据结构只要有 Iterator 接口，就可以被 yield\* 遍历。

```javascript
// 数组原生支持遍历器，因此可以被yield*遍历
function* gen(){
  yield* ["a", "b", "c"];
}
gen().next() // { value:"a", done:false }
​
// 字符串同样
function* gen(){
    yield* 'hello';
}
​
gen().next() // { value:"h", done:false }
```

## 7. ES6 - async/await\*

{% hint style="info" %}
参考链接：[理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)   [ES6-async/await](https://es6.ruanyifeng.com/#docs/async)
{% endhint %}

async 返回的是一个 promise 对象，如果 return 一个直接量，也会通过 `Promise.resolve()` 封装成 Promise 对象。await 后面接 Promise 对象，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果；如果后面是不是一个 Promise 对象，则表达式的运算结果就是它等到的东西。

```javascript
// 例子：指定毫秒后输出内容
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。当函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

async 函数是 Generator 函数的语法糖，其中几点改进：

* Generator 函数的执行必须必须靠执行器 next\(\)，而 async 函数的执行与普通函数一样，只要一行。
* async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
* Generator 函数中 yield 命令后面只能是 Thunk 函数或 Promise 对象，async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（实际会转成立即 resolved 的 Promise 对象）。

语法的注意点：

* async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。
* 正常情况下，await 命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
* await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。

```javascript
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}
// 另一种写法
async function myFunction() {
  await somethingThatReturnsAPromise().catch(function (err){
    console.log(err);
  });
}
```

链式调用，基于 async/await 处理多层嵌套调用：

```javascript
const operation1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('Operation1 is ok ')
    }, 1000)
  })
}

const operation2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('Operation2 is ok ')
    }, 1000)
  })
}


const operation3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('Operation3 is ok ')
    }, 1000)
  })
}

async function test() {
  const res = await operation1()
  console.log(res)
  const res2 = await operation2()
  console.log(res2)
  const res3 = await operation3()
  console.log(res3)
}

test()
```

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

