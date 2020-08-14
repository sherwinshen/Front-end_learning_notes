# 设计模式

## 单例模式

单例模式确保全局只有一个实例，其常用于全局缓存、全局状态管理等。主要实现方法是再构造函数上添加静态方法来实现只有一个实例。

```javascript
// ES6
class Singleton {
    constructor() {
    }
}

// 立即执行函数
Singleton.create = (function () {
    let instance
    return function () {
        if (!instance) {
            instance = new Singleton()
        }
        return instance
    }
})()

const a = Singleton.create()
const b = Singleton.create()
console.log(a === b) // true
```

## 工厂模式

工厂起到的作用就是隐藏了创建实例的复杂度，只需要提供一个接口，简单清晰。用户并不关心复杂的代码，只需要你提供给我一个接口去调用，用户只负责传递需要的参数，至于这些参数怎么使用，内部有什么逻辑是不关心的，只需要你最后返回我一个实例。这个构造过程就是工厂。注意，工厂模式也是调用构造函数的静态方法。

```javascript
class Person {
    constructor() {
    }
}

class Factory {
    static create() {
        return new Person()
    }
}

const a = Factory.create()
```

## 适配器模式

适配器用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。

```javascript
class Plug {
  getName() {
    return '港版插头'
  }
}

class Target {
  constructor() {
    this.plug = new Plug()
  }
  getName() {
    return this.plug.getName() + ' 适配器转二脚插头'
  }
}

let target = new Target()
target.getName() // 港版插头 适配器转二脚插头
```

## 代理模式

代理是为了控制对对象的访问，不让外部直接访问到对象。例如说事件代理就用到了代理模式。

## 发布-订阅模式

通过一对一或者一对多的依赖关系，当对象发生改变时，订阅方都会收到通知。比如我们点击一个按钮触发了点击事件就是使用了该模式，VUE的响应式也是使用了发布-订阅模式。

## 外观模式

外观模式提供了一个接口，隐藏了内部的逻辑，更加方便外部调用。



{% hint style="info" %} 参考资料：[《JavaScript 设计模式》](https://juejin.im/post/59df4f74f265da430f311909#heading-3) [《JavaScript 中常见设计模式整理》](https://juejin.im/post/5afe6430518825428630bc4d) {% endhint %}

