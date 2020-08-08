# 面向对象/原型/原型链

简介：本文为面向对象/原型/原型链笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 1、创建对象的方法

* 字面量创建

```javascript
var person={
    name:'小王',
    age:18,
    _pri:233
}
```

* 内置构造函数创建对象

```javascript
var p = new Object();
p.name = "wang";
p.setName = function(){this.name = "shen";}
```

* 工厂函数\(不推荐\)

```javascript
function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function () {
        alert(this.name);
    }
    return o;
}
var person1 = createPerson('Grey', 27, 'Doctor');
```

* 自定义构造函数

```javascript
# 方法1
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        alert(this.name);
    }
}
var person1 = new Person("Nicholas", 29, "Software Engineer"); 

# 方法2
var Person = function(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        alert(this.name);
    }
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
```

> 自定义构造函数区别于工厂函数：
>
> 1、没有显式地创建对象； 2、直接将属性和方法赋给了 this 对象； 3、没有 return 语句。

* 原型

```javascript
function Person() {
}

Person.prototype.name = 'Nicholas';
Person.prototype.age = 29;
Person.prototype.sayName = function () {
    return this.name;
}

var person1 = new Person();
person1.sayName();//"Nicholas"

var person2 = new Person();
person2.sayName(); //"Nicholas"

console.log(person1.sayName == person2.sayName); //true
```

详细说明见下面`原型`

## 2、原型

> 每次利用构造函数生成对象，则部分重复的内容则会占用不必要的内存，因此利用原型prototype，则可以减少这些内存开销，每一个生成的对象都有一个隐式的`_proto_`指向原型，如下图所示。

![](../../../.gitbook/assets/pic4%20%284%29.png)

![](../../../.gitbook/assets/pic5%20%284%29.png)

> 如上图所示的原型代码，则会形成一个原型链，如下图所示：

![](../../../.gitbook/assets/pic6%20%284%29.png)

详细说明见下面`原型链`

## 3、原型链

> 依旧以上述显示的原型链为例

![](../../../.gitbook/assets/pic6%20%283%29.png)

* 属性访问

```javascript
//  属性访问会沿着原型链进行查找，首先在自身属性上查找，若没有则沿着原型链一层一层往下找
tom.name; // "Tom"
tom.job; // "teacher"
tom.toString(); // 内置Object对象含有该属性
```

* 属性修改

```javascript
// 属性修改永远修改的是对象的自身属性，除非指定修改prototype的属性
tom.job = "policeman"; // 此时只会在tom对象上生成job属性，并且Teacher的prototype上的job值不改变
Teacher.prototype.job = "assistant"; // 此时则会修改Teacher的prototype上的job值
```

> 注意，修改指的是赋值=不能更改，如果是push\(\)则就能更改，如下图所示，bill对象继承了Teacher原型，bill对象调用addCourse方法时，改变了teacher的course。实际为`bill.__proto__.add("haha");`是bill的原型调用了add，this指的是原型Teacher。

![](../../../.gitbook/assets/pic7%20%284%29.png)

* 属性删除

```javascript
// 属性删除永远删除的是对象的自身属性，除非指定删除prototype的属性
del tom.job; // 只删除tom的job属性，对原型无影响
tom.job; //再访问job则会获得原型的job属性值
```

## 4、原型链总结

![](../../../.gitbook/assets/pic8%20%283%29.png)

总结：

1. 我们需要牢记两点：①`__proto__`和`constructor`属性是对象所独有的；② `prototype`属性是函数所独有的，但因为函数也是一种对象，所以函数也拥有`__proto__`和`constructor`属性。
2. `__proto__`属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的`__proto__`属性所指向的那个对象（父对象）里找，一直找，直到`__proto__`属性的终点null，再往上找就相当于在null上取值，会报错。通过`__proto__`属性将对象连接起来的这条链路即我们所谓的原型链.
3. `prototype`属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即`f1.__proto__ === Foo.prototype`。
4. `constructor`属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。

简单来说：

* `__proto__`和`constructor`属性是对象所独有的；② `prototype`属性是函数所独有的，函数也是对象，因此拥有3个属性。
* `__proto__`指向父对象，`constructor`指向构造函数， `prototype`构造函数指向其原型。
* `__proto__`最终都会到达`Object.prototype`至null，`constructor`最终都会达到`Function()`

参考内容：[帮你彻底搞懂JS中的`prototype`、`__proto__`与`constructor`](https://blog.csdn.net/cc18868876837/article/details/81211729)

如果发现本项目有错误，欢迎提交 issues 指正。

