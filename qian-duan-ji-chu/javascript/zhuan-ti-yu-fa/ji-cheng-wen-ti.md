# 继承问题

简介：本文为继承问题笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

![](../../../.gitbook/assets/pic9%20%283%29.png)

## 1、ES5语法 - 6种继承

参考链接：[JS继承的实现方式](https://www.cnblogs.com/humin/p/4556820.html)

```javascript
function Animal(name) {
    // 实例属性
    this.name = name;
    // 实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}

Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
};
```

### 1.1、原型链继承

> 子类的原型是父类的实例。

```javascript
function Cat() {
}

Cat.prototype = new Animal();
Cat.prototype.name = 'cat';
```

> 缺点是：1、创建子类实例时无法向父类构造函数传参，`const cat = new Cat('name')`；2、来自原型对象的所有属性被所有实例共享，如果是引用类型成员，那么更改会影响其他子类实例；3、无法实现多继承。

### 1.2、构造继承

> 使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类

```javascript
function Cat2(name) {
    Animal.call(this, name);
}
```

> 解决了原型继承的缺点1和缺点2（因为每一次都创建了新的父类实例）。缺点是：1、不能继承父类原型的属性与方法；2、每个子类都有父类实力函数的副本，影响性能。

### 1.3、实例继承

> 为父类实例添加新特性，作为子类实例返回

```javascript
function Cat3(name) {
    const cat = new Animal(name);
    cat.age = 18 // 实例添加属性
    return cat
}
```

> 缺点：1、子类的实例其实是父类的实例；2、不能多继承。

### 1.4、拷贝继承

> 子类拷贝父类实例的属性和方法

```javascript
function Cat4(name) {
    const animal = new Animal(name);
    for (let pro in animal) {
        Cat4.prototype[pro] = animal[pro];
    }
}
```

> 缺点：1、效率低，需要拷贝父类的属性；2、无法获取父类不可枚举的属性。

### 1.5、组合继承

> 通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用

```javascript
function Cat5(name) {
    Animal.call(this, name);
}

Cat5.prototype = new Animal();
Cat5.prototype.constructor = Cat5;
```

> 缺点：1、调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）。

### 1.6、寄生组合继承

> 通过寄生方式，砍掉父类的实例属性

```javascript
function Cat(name) {
    Animal.call(this, name);c
}

(function () {
    // 创建一个没有实例方法的类
    const Super = function () {};
    // 将实例作为子类的原型
    Super.prototype = Animal.prototype;
    Cat.prototype = new Super();
})();
```

|  | 原理 | 父类实例属性继承 | 父类原型属性继承 | 多继承 |
| :--- | :--- | :--- | :--- | :--- |
| 原型链继承 | 子类的原型是父类的实例 | + | + | - |
| 构造继承 | 调用父类构造函数 | + | - | + |
| 实例继承 | 子类实例是父类实例 | + | + | - |
| 拷贝继承 | 子类拷贝父类实例的属性和方法 | + | + | + |
| 组合继承 | 调用父类构造，子类原型是父类实例 | + | + | ？ |
| 寄生组合继承 | / | + | + | ？ |

### 1.7、多重继承

```javascript
function M1() {
  this.hello = 'hello';
}

function M2() {
  this.world = 'world';
}

function S() {
  M1.call(this);
  M2.call(this);
}

// 继承 M1
S.prototype = Object.create(M1.prototype);
// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);

// 指定构造函数
S.prototype.constructor = S;

var s = new S();
s.hello // 'hello'
s.world // 'world'
```

## 2、ES6语法 - class

详见[Class的基本语法](https://es6.ruanyifeng.com/#docs/class)

如果发现本项目有错误，欢迎提交 issues 指正。

