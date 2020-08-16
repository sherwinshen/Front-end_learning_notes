# this的指向问题

不管是什么场合，`this`都有一个共同点：它总是返回一个对象。javascript 的 this 不是在函数定义的时候确定的，而是在调用的时候确定的，指向调用者。

```javascript
const A = {
  name: '张三',
  describe: function () {
    return '姓名：'+ this.name;
  }
};

const name = '李四';
const f = A.describe;
f() // "姓名：李四" - 相当于 window 调用了
```

![](../../interview/img/this.png)

## 1. 方法调用

通过对象来调用其方法函数 `对象.方法函数(...)`，函数中的 `this` 指向调用该方法的对象。

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

方法调用赋值情况注意是不同的：

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

## 2. new 实例调用

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

构造函数如果有 return 语句，且 return 语句是个对象，则 new 出来的新对象是指 return 的这个对象，如果 return 的是非对象数据类型，则 this 依旧指向 new 的新对象。

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

## 3. this绑定

### 3.1 call()

函数实例的 `call` 方法，可以指定函数内部 `this` 的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。`call ` 方法的参数，应该是一个对象。如果参数为空、`null` 和 `undefined`，则默认传入全局对象。

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

### 3.2 apply()

`apply` 方法的作用与 `call` 方法类似，也是改变 `this` 指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。

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

### 3.3 bind()

`bind `方法用于将函数体内的 `this `绑定到某个对象，然后返回一个新函数。

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

## 4、箭头函数中的 this

箭头函数中使用的 `this`，其实是直接包含它的那个函数或函数表达式中的 `this`。函数体内的`this`对象，是定义时所在的对象，而不是使用时所在的对象。或者可以说 箭头函数没有 this。

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

## 5. 总结

this代表函数调用相关联的对象，通常页称之为执行上下文。

1. 作为函数直接调用，非严格模式下，this指向window，严格模式下，this指向undefined；
2. 作为某对象的方法调用，this通常指向调用的对象。
3. 使用apply、call、bind 可以绑定this的指向。
4. 在构造函数中，new 调用时指的是被构造的对象 
5. 箭头函数没有单独的this值，this在箭头函数创建时确定，它与声明所在的上下文相同。

简单来说就是：

- 普通函数的this ==> 谁调用就是谁（经常变：谁调用是谁）
- 箭头函数的this ==> 在谁的环境下`this`就是谁（不变：当前作用域），例如常见document/window等
