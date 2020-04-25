# this的指向问题

简介：前端个人学习笔记-this的指向问题，完整笔记在[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision)         联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)



> 不管是什么场合，`this`都有一个共同点：它总是返回一个对象。javascript的this不是在函数定义的时候确定的，而是在调用的时候确定的，指向调用者。

```javascript
var A = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

var name = '李四';
var f = A.describe;
f() // "姓名：李四"
```



以下分析各种不同情况的调用：

## 1、直接调用

通过函数名的方式调用 `函数名(参数......)`，函数内部的 `this` 指向全局对象，在浏览器中全局对象是 `window`，在 NodeJs 中全局对象是 `global`。

```javascript
// 简单兼容浏览器和 NodeJs 的全局对象
const _global = typeof window === "undefined" ? global : window;
function test() {
    console.log(this === _global);    // true
}
test();    // 直接调用


// 直接调用并不是指在全局作用域下进行调用，在任何作用域下，直接通过 函数名(...) 来对函数进行调用的方式，都称为直接调用
(function(_global) {
    // 通过 IIFE 限定作用域
    function test() {
        console.log(this === _global);  // true
    }
    test();     // 非全局作用域下的直接调用
})(typeof window === "undefined" ? global : window);
```

### 1.1 bind()影响

`Function.prototype.bind() `  将当前函数与指定的对象绑定，并返回一个新函数，这个新函数无论以什么样的方式调用，其 `this` 始终指向绑定的对象。

### 1.2 call()/apply()影响

`Function.prototype.call()`和`Function.prototype.apply()`第一个参数都是指定函数运行时其中的 `this` 指向，但如果目录函数本身是一个绑定了 `this` 对象的函数，那么`this` 指向该绑定的函数。

```javascript
const obj = {};
function test() {
    console.log(this === obj);
}
// 绑定到一个新对象，而不是 obj
const testObj = test.bind({});
test.apply(obj);    // true
// testObj 绑定了不是 obj 的对象，所以会输出 false
testObj.apply(obj); // false
```



##  2、方法调用

通过对象来调用其方法函数 `对象.方法函数(...)`，函数中的 `this` 指向调用该方法的对象。但是，同样需要注意 `bind()` 的影响。

```javascript
const obj = {
    // 第一种方式，定义对象的时候定义其方法
    test() {
        console.log(this === obj);
    }
};

// 第二种方式，对象定义好之后为其附加一个方法(函数表达式)
obj.test2 = function() {
    console.log(this === obj);
};

// 第三种方式和第二种方式原理相同,是对象定义好之后为其附加一个方法(函数定义)
function t() {
    console.log(this === obj);
}
obj.test3 = t;

// 这也是为对象附加一个方法函数,但是这个函数绑定了一个不是 obj 的其它对象
obj.test4 = (function() {
    console.log(this === obj);
}).bind({});

obj.test(); // true  
obj.test2(); // true   
obj.test3(); // true    
obj.test4(); // false -受 bind() 影响，test4 中的 this 指向不是 obj
```

方法调用赋值情况注意是不同的。
```javascript
// t 是 obj 的 test 方法，但是 t() 调用时，其中的 this 指向了全局。
const obj = {
    test() {
        console.log(this === obj);
    }
};

const t = obj.test;
t();    // false
```

再举一个例子

```javascript
// 第一次this的调用是对象foo的方法调用，因此此时的this就是该对象foo
function Foo() {
    this.bar = function () {console.log(this==foo)}
}
var foo = new Foo();
foo.bar();

// 第二次this的调用是内部bar2()调用的，直接调用，返回的是全局对象
function Foo2() {
    var bar2 = new Function('console.log(this)');
    bar2();

}
var foo2 = new Foo2();
foo2.bar2();
```



## 3、new调用

在 es5 中，用 `new` 调用一个构造函数，会创建一个新对象，而其中的 `this` 就指向这个新对象。

```javascript
var data = "Hi";    // 全局变量

function AClass(data) {
    this.data = data;
}

var a = new AClass("Hello World");
console.log(a.data);    // Hello World
console.log(data);      // Hi

var b = new AClass("Hello World");
console.log(a === b);   // false
```

构造函数如果有return语句，且return语句是个对象，则new出来的新对象是指return的这个对象，如果return的是非对象数据类型，则this依旧指向new的新对象。

```javascript
// 1
function fn()  
{  
    this.user = '追梦子';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined
// 2
function fn()  
{  
    this.user = '追梦子';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined
// 3
function fn()  
{  
    this.user = '追梦子';  
    return 1;
}
var a = new fn;  
console.log(a.user); //追梦子
```



## 4、箭头函数中的 this

箭头函数中使用的 `this`，其实是直接包含它的那个函数或函数表达式中的 `this`。函数体内的`this`对象，是定义时所在的对象，而不是使用时所在的对象。

```javascript
const obj = {
    test() {
        const arrow = () => {
            // 这里的 this 是 test() 中的 this，
            // 由 test() 的调用方式决定
            console.log(this === obj);
        };
        arrow();
    },

    getArrow() {
        return () => {
            // 这里的 this 是 getArrow() 中的 this，
            // 由 getArrow() 的调用方式决定
            console.log(this === obj);
        };
    }
};

obj.test();     // true

const arrow = obj.getArrow();
arrow();        // true
```



## 5、this绑定

1、`call()`

> 函数实例的`call`方法，可以指定函数内部`this`的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。`call`方法的参数，应该是一个对象。如果参数为空、`null`和`undefined`，则默认传入全局对象。

```javascript
// func.call(thisValue, arg1, arg2, ...)
// 第一个参数就是this所要指向的那个对象

var n = 123;
var obj = { n: 456 };

function a() {
  console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456
```

2、`apply()`

> `apply`方法的作用与`call`方法类似，也是改变`this`指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。

可以进行一些有趣的应用

```javascript
// 1、找出数组最大元素
var a = [10, 2, 4, 15, 9];
Math.max.apply(null,a) // 15

// 2、将数组的空元素变为undefined，空与undefined的区别在于遍历时空会被跳过
Array.apply(null, ['a', ,'b']) // [ 'a', undefined, 'b' ]

// 3、转换类似数组的对象，比如arguments对象
Array.prototype.slice.apply({0: 1, length: 1}) // [1]
Array.prototype.slice.apply({0: 1}) // []
Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
Array.prototype.slice.apply({length: 1}) // [undefined]

// 4、绑定回调函数的对象
var o = new Object();
o.f = function () {
  console.log(this === o);
}
var f = function (){
  o.f.apply(o); // 或者 o.f.call(o);
};
$('#button').on('click', f);
```

3、`bind()`

> `bind`方法用于将函数体内的`this`绑定到某个对象，然后返回一个新函数。

```javascript
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var func = counter.inc.bind(counter);
func();
counter.count // 1
```



## 6、总结

this代表函数调用相关联的对象，通常页称之为执行上下文。

1. 作为函数直接调用，非严格模式下，this指向window，严格模式下，this指向undefined；
2. 作为某对象的方法调用，this通常指向调用的对象。
3. 使用apply、call、bind 可以绑定this的指向。
4. 在构造函数中，new 调用时指的是被构造的对象 
5. 箭头函数没有单独的this值，this在箭头函数创建时确定，它与声明所在的上下文相同。

简单来说就是：

- 普通函数的this ==> 谁调用就是谁（经常变：谁调用是谁）
- 箭头函数的this ==> 在谁的环境下`this`就是谁（不变：当前作用域），例如常见document/window等



参考内容：[JavaScript 的 this 指向问题深度解析](https://www.w3cschool.cn/ivmkf/ivmkf-v3y2250z.html)   [彻底理解js中this的指向](https://www.cnblogs.com/pssp/p/5216085.html)



------

如果发现本项目有错误，欢迎提交 issues 指正。