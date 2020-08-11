# MVVM 原理

## 1. 基础概念

**概念**

MVVM（Model-View-ViewModel）中Model用JS对象表示，而View就是显示的UI界面，ViewModel就负责把View和Model关联起来，其将model的数据改变同步显示到View中，并将View的修改同步回Model。

**好处**

通过MVVM我们只需要关注Model中的JS对象的变化即可，MVVM会自动更新DOM的状态显示，避免了操作DOM的繁琐步骤。

**举例**

```javascript
// 如下所示person为一个model，视图中绑定person.name，我们更新视图只需要修改person.name即可。
var person = {
    name: 'Bart',
    age: 12
};

person.name = 'envision'; // 更新视图
```

## 2. Vuejs 实现原理

> 采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`和`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调，而产生更新数据和视图。

1. 实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就拿到最新值并通知订阅者。
2. 实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图。
3. 实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板替换数据，以及绑定相应的更新函数。

<img src='./img/pic2.png'>

当执行 new Vue() 时，Vue 就进入了初始化阶段，一方面Vue 会遍历 data 选项中的属性，并用 Object.defineProperty 将它们转为 getter/setter，实现数据变化监听功能；另一方面，Vue 的指令编译器Compile 对元素节点的指令进行解析，初始化视图，并订阅Watcher 来更新视图， 此时Wather 会将自己添加到消息订阅器中(Dep),初始化完毕。当数据发生变化时，Observer 中的 setter 方法被触发，setter 会立即调用Dep.notify()，Dep 开始遍历所有的订阅者，并调用订阅者的 update 方法，订阅者收到通知后对视图进行相应的更新。



{% hint style="info" %} 参考资料：[剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500)   [MVVM中双向数据绑定的基本原理](https://www.cnblogs.com/dashnowords/p/9955460.html) {% endhint %}

