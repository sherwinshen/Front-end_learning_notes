# 事件循环机制

avaScript 是一门单线程语言，异步操作都是放到事件循环队列里面，每次宏任务执行完毕，先去微任务队列查找是否有微任务，如果有就先完成所有的微任务，如果没有微任务或完成所有微任务则从宏任务队列中继续执行宏任务。

<img src="../../interview/img/event_loop.png" style="zoom:60%;" />

## 1. 宏任务

分类：script 整体代码, **setTimeout, setInterval**, requestAnimationFrame, I/O, UI rendering

1. 宏任务所处的队列就是宏任务队列
2. 第一个宏任务队列中只有一个任务，也就是script的代码
3. 宏任务队列可以有多个
4. 当宏任务队列中的任务全部执行完毕后可以查看是否有微任务队列，如果有就先执行微任务队列中的所有任务

## 2. 微任务 

分类：**Promise.then()**, **await之后的代码**, process.nextTick, Object.observe, MutationObserver

1. 微任务所处的队列就是微任务队列
2. 只有一个微任务队列
3. 在上一个宏任务队列执行完毕后，如果微任务队列中有任务就会去执行微任务队列中的所有任务

## 3.例题

<img src="./img/pic15.png" style="zoom:40%;" />

分析：

<img src="./img/pic16.png" style="zoom:30%;" />

结果： 

————start—————
0
1
2
3
4
—————end—————
promise执行成功
setTimeout