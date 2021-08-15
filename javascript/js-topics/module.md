# 模块化

> 许多语言都具有模块支持，例如 python 可通过 import 导入模块，CSS 可通过 @import 导入模块，但是 JavaScript 语言没有模块支持，即不同 JS 文件之间不能直接通过诸如 import 这样的方式进行导入使用，本文主要介绍通过 ES6 module 和 CommonJS 进行 JavaScript 文件模块化，[AMD/CMD](https://www.cnblogs.com/ghw0501/p/4796922.html) 等不再介绍，参考资料：
>
> * [《ES6模块化Module》](https://es6.ruanyifeng.com/#docs/module)
> * [《CommonJS规范》](https://javascript.ruanyifeng.com/nodejs/module.html)
> * [《聊聊什么是CommonJs和Es Module及它们的区别》](https://juejin.cn/post/6938581764432461854)

## 1. ES6 Module

ES6 Module 主要有2个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的变量、函数或类（class），就必须使用 `export` 关键字输出该变量。

使用 `export` 命令定义了模块的对外接口以后，其他 JS 文件就可以通过 `import` 命令加载这个模块。

```javascript
/**
 * export 基本写法
 */
export const age_1 = 18
export function sayHi_1() {
    console.log('hi');
}
// 或者
const age_2 = 18
const sayHi_2 = () => { console.log('hi'); }
export {
    age_2,
    sayHi_2
}
// 重命名
const age_3 = 18
const sayHi_3 = () => { console.log('hi'); }
export {
    age_3 as age,
    sayHi_3 as sayHi
}

/**
 * import 基本写法
 */
import { age_1, sayHi_1 } from './es6.js'
// 重命名
import { age_2 as age, sayHi_2 as sayHi } from './es6.js'
// 通过 星号（*）整体加载，即命名空间
import * as myModule from './es6.js'
myModule.age
myModule.sayHi
```

使用 `import` 命令的时候，用户需要知道所要加载的变量名或函数名，以 {} 的形式加载，也可以采用到 `export default` 命令，为模块指定默认输出。注意，一个模块只能有一个默认输出，因此export default命令只能使用一次 。

```javascript
/**
 * export default 写法
 */
// 输出部分
export default function () {
    console.log('foo');
}
// 输入部分 - 不需要 {}
import es6Module from './es6.js'
es6Module()
```

另外，`export`和`export default`可以同时使用并且互不影响，但是在引入的时候需要先导入默认导出的，在导入单个导入的值。

```javascript
// 导出
export const name = "蛙人"
export const age = 24

export default {) {}，
    msg: "hello 蛙人",
    sayHi() {}
}
// 导入
import DemoModule, { name, age } from 'my_module' 
```

如果在一个模块之中，先输入后输出同一个模块，`import`语句可以与`export`语句写在一起。注意，如下所示，foo 和 bar 尽管进行 import，但是实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，当前不能使用。

```javascript
/**
 * export 与 import 的复合写法 
 */
export { foo, bar } from 'my_module';
// 默认接口
export { default } from 'foo';
// 接口改名
export { foo as myFoo } from 'my_module';
// 整体输出
export * from 'my_module';
export * as test from 'my_module';
```

通常，借助上面的 export 与 import 的复合写法，我们会把一些模块都归集到一个 index.js 文件中进行导出。

```javascript
// index.js
export { test1 } from './test1.js'
export * as test2 from './test2.js'

// use.js
import { test1, test2 } from './index.js'
```

## 2. CommonJS

CommonJS 中使用 module.exports 导出变量及函数，也可以导出任意类型的值，也可以直接通过 exports 进行导出（不建议！！！）：

```javascript
// 导出一个对象
module.exports = {
    name: "sherwin",
    age: 24,
}

// 导出任意值
module.exports.name = "sherwin"
module.exports.age = 24
```

`CommonJs`中使用`require`语法可以导入，如果想要单个的值，可以通过解构对象来获取。

```javascript
let data = require("./index.js")
let { name, age } = require("./index.js")
```

CommonJS一个需要关注的点就是其能够动态导入，但 ES6 Module 不行，因为其是静态的：

```javascript
let lists = ["./index.js", "./config.js"]
lists.forEach((url) => require(url)) // 动态导入
```

## 3. ES6 Module 与 CommonJS 的区别

CommonJs可以动态加载语句，代码发生在运行时；ES6 模块是编译时输出接口，是静态的，不可以动态加载语句，只能声明在该文件的最顶部。

CommonJs导出值是拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值，同时可以修改导出的值，但可能会造成变量污染；ES6 Module导出是引用值，并且值都是可读的但不能修改。举例如下：

```javascript
/*
 * CommonJS
 */
 
// 导出
let counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};

// 导入
const constmod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

```javascript
/*
 * ES6 Module
 */
 
// 导出
export let counter = 3;
export function incCounter() {
  counter++;
}

// 导入
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

总结：

* CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
* CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段。

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

