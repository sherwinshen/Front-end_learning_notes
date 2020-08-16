# 继承问题

## 1. ES5语法

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

{% hint style="info" %} 参考链接：[JS继承的实现方式](https://www.cnblogs.com/humin/p/4556820.html) {% endhint %}

### 1.1 原型链继承

子类的原型是父类的实例。

```javascript
function Cat() {
}

Cat.prototype = new Animal();
Cat.prototype.name = 'cat';
```

缺点：1、创建子类实例时无法向父类构造函数传参，`const cat = new Cat('name')`；2、来自原型对象的所有属性被所有实例共享，如果是引用类型成员，那么更改会影响其他子类实例；3、无法实现多继承。

### 1.2 构造继承

使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类。

```javascript
function Cat(name) {
    Animal.call(this, name);
}
```

解决了原型继承的缺点1和缺点2（因为每一次都创建了新的父类实例）。缺点：1、不能继承父类原型的属性与方法；2、每个子类都有父类实力函数的副本，影响性能。

### 1.3 实例继承

为父类实例添加新特性，作为子类实例返回。

```
function Cat3(name) {
    const cat = new Animal(name);
    cat.age = 18 // 实例添加属性
    return cat
}
```

缺点：1、子类的实例其实是父类的实例；2、不能多继承。

### 1.4 拷贝继承

为父类实例添加新特性，作为子类实例返回。

```javascript
function Cat(name) {
    const animal = new Animal(name);
    for (let pro in animal) {
        Cat.prototype[pro] = animal[pro];
    }
}
```

缺点：1、效率低，需要拷贝父类的属性；2、无法获取父类不可枚举的属性。

### 1.5 组合继承

通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用。

```javascript
function Cat(name) {
    Animal.call(this, name);
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat5;
```

缺点：1、调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）。

### 1.6 寄生组合继承

通过寄生方式，砍掉父类的实例属性。

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

|              | 原理                             | 父类实例属性继承 | 父类原型属性继承 | 多继承 |
| ------------ | -------------------------------- | ---------------- | ---------------- | ------ |
| 原型链继承   | 子类的原型是父类的实例           | +                | +                | -      |
| 构造继承     | 调用父类构造函数                 | +                | -                | +      |
| 实例继承     | 子类实例是父类实例               | +                | +                | -      |
| 拷贝继承     | 子类拷贝父类实例的属性和方法     | +                | +                | +      |
| 组合继承     | 调用父类构造，子类原型是父类实例 | +                | +                | ？     |
| 寄生组合继承 | /                                | +                | +                | ？     |

## 2. ES6 Class

子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到`this`对象。

```javascript
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

✍️ super 除了当作函数使用外，还可以也可以当作对象使用。 super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。具体可以详见 [ES6笔记](../basic/js-es6.md)。