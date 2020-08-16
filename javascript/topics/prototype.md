# 原型/原型链

## 1. 原型

每次利用构造函数生成对象，则部分重复的内容则会占用不必要的内存，因此利用原型prototype，则可以减少这些内存开销，每一个生成的对象都有一个隐式的`_proto_`指向原型，如下图所示。

![](./img/pic4.png)

![](./img/pic5.png)

如上图所示的原型代码，则会形成一个原型链，如下图所示：

![](./img/pic6.png)

## 2. 原型链

依旧以上述显示的原型链为例：

1）属性访问：属性访问会沿着原型链进行查找，首先在自身属性上查找，若没有则沿着原型链一层一层往下找

```javascript
tom.name; // "Tom"
tom.job; // "teacher"
tom.toString(); // 内置Object对象含有该属性
```

2）属性删除：属性删除永远删除的是对象的自身属性，除非指定删除prototype的属性

```javascript
del tom.job; // 只删除tom的job属性，对原型无影响
tom.job; //再访问job则会获得原型的job属性值 
```

3）属性修改：属性修改永远修改的是对象的自身属性，除非指定修改prototype的属性

```javascript
tom.job = "policeman"; // 此时只会在tom对象上生成job属性，并且Teacher的prototype上的job值不改变
Teacher.prototype.job = "assistant"; // 此时则会修改Teacher的prototype上的job值
```

注意，修改指的是赋值=不能更改，如果是数组 push() 则就能更改，如下图所示，bill 对象继承了 Teacher 原型，bill 对象调用 addCourse 方法时，改变了 teacher 的 course。实际为 `bill.__proto__.add("haha");` 是 bill 的原型调用了 add，this 指的是原型 Teacher。

![](./img/pic7.png)

## 3. 总结

![](./img/pic8.png)

总结：

1. 我们需要牢记两点：①\_\_proto\_\_ 和 constructor 属性是对象所独有的；②  prototype 属性是函数所独有的，但因为函数也是一种对象，所以函数也拥有 \_\_proto\_\_ 和 constructor属性。
2. \_\_proto\_\_ 属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的 \_\_proto\_\_ 属性所指向的那个对象（父对象）里找，一直找，直到 \_\_proto\_\_ 属性的终点 null，再往上找就相当于在 null 上取值，会报错。通过 \_\_proto\_\_ 属性将对象连接起来的这条链路即我们所谓的原型链.
3. prototype 属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即 `f1.__proto__ === Foo.prototype`。
4. constructor 属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向 Function。

简单来说：

- `__proto__`和`constructor`属性是对象所独有的；② `prototype`属性是函数所独有的，函数也是对象，因此拥有3个属性。
- `__proto__`指向父对象，`constructor`指向构造函数， `prototype`构造函数指向其原型。
- `__proto__`最终都会到达`Object.prototype`至null，`constructor`最终都会达到`Function()`



{% hint style="info" %} 参考资料：[帮你彻底搞懂 JS 中的 prototype、\_\_proto\_\_ 与 constructor](https://blog.csdn.net/cc18868876837/article/details/81211729){% endhint %}