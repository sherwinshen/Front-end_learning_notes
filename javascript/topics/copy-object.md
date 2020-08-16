# 对象的赋值与复制

## 1. 赋值

JS 的数据类型分为基本类型和引用类型，其中基本数据类型为 number、string、boolean、null、underined。在赋值时，基本类型传值，即互相之间不影响；而引用类型传引用地址，互相之间会有一定的影响。

```javascript
// 1 基本类型
let x=5;
let y=x;
console.log(x,y); // 5,5
y=3;
console.log(x,y); // 5,3
// 2 引用类型
let x={a:5};
let y=x;
console.log(x.a,y.a); // 5,5
y.a=3;
console.log(x.a,y.a); // 3,3
```

## 2. 浅拷贝

浅拷贝只会赋值对象的非对象属性，使其不会指向同一个地址，对于对象属性仍旧会有影响，也就是说深度就一层而已。

```javascript
let x = {a:3,b:{m:5,n:4}};
let y = {};
Object.assign(y, x); // 或者let y = {...x}
y.a=1;
y.b.m=6;
console.log(x.a,y.a); // 3,1
console.log(x.b.m,y.b.m); // 6,6
```

实现浅拷贝的方法：

- Object.assign(target, ...sources)
- 扩展运算符...
- 数组还可以使用 target=Array.prototype.slice.call(source)

## 3. 深拷贝

深拷贝会另外拷贝一份一个一模一样的对象,从堆内存中开辟一个新的区域存放新对象,新对象跟原对象不共享内存，修改新对象不会改到原对象。

```javascript
let x = {a:3,b:{m:5,n:4}};
let y = JSON.parse(JSON.stringify(x));
y.a=1;
y.b.m=6;
console.log(x.a,y.a); // 3,1
console.log(x.b.m,y.b.m); // 5,6
```

实现深拷贝的方法：

- target=JSON.parse(JSON.stringify(source));

✍️ 存在一些弊端：1、无法拷贝不可枚举的属性，无法拷贝对象的原型链；2、拷贝Date引用类型会变成字符串；3、拷贝RegExp引用类型会变成空对象；4、对象中含有NaN、Infinity和-Infinity，则序列化的结果会变成null；5、对象的值中如果有函数、undefined、symbol则序列化后这个键值对会消失；等等。 所以我们可以自己实现深拷贝。

## 4. 自定义深拷贝

## 

```javascript
function deepClone(obj) {
    let newObj = obj instanceof Array ? [] : {};
    for (let item in obj) {
        newObj[item] = typeof obj[item] == 'object' ? deepClone(obj[item]) : obj[item]
    }
    return newObj;
}
```

上述代码不能实现包装对象 Number、String、Boolean 以及正则对象 RegExp 和 Date 对象的克隆。

```javascript
// 举例：
obj1 = new Number(1);
obj2 = new String('hello');
temp1 = deepClone(obj1);
temp2 = deepClone(obj2);
console.log(obj1); // [Number: 1]
console.log(temp1); // {}
console.log(obj2); // [String: 'hello']
console.log(temp1); // { '0': 'h', '1': 'e', '2': 'l', '3': 'l', '4': 'o' }
console.log(obj3); // [Boolean: true]
console.log(temp1); // {}
```

为解决这个问题，通过 valueof() 函数将将对象转换为表示它的原始值

```javascript
function deepClone(base) {
	return base.valueOf();
}

// Date类型有一点区别，因为返回的是毫秒数
function deepClone(base) {
	return new Date(base.valueOf());
}

// RegExp对象也有点区别
function deepClone(base) {
   const pattern = base.valueOf();
   let flags = '';
   flags += pattern.global ? 'g' : '';
   flags += pattern.ignoreCase ? 'i' : '';
   flags += pattern.multiline ? 'm' : '';
   return new RegExp(pattern.source, flags);
}
```
