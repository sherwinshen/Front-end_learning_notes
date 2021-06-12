# 模块化

> 许多语言都具有模块支持，例如 python 可通过 import 导入模块，CSS 可通过 @import 导入模块，但是 JavaScript 语言没有模块支持，即不同 JS 文件之间不能直接通过诸如 import 这样的方式进行导入使用，本文主要介绍了JavaScript 文件进行模块化的几种方式。

## 1. ES6 Module

{% hint style="info" %}
参考资料：[《ES6模块化Module》](https://es6.ruanyifeng.com/#docs/module)
{% endhint %}

主要有2个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的变量、函数或类（class），就必须使用 `export` 关键字输出该变量。

```javascript
const name = 'Michael';
function a(){}

export {name, a};

// 也可以使用重命名类似python的import a as newName
export {
  name as newName,
  a as newA
};
```

使用 `export` 命令定义了模块的对外接口以后，其他 JS 文件就可以通过 `import` 命令加载这个模块。

```javascript
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}

// 同样可以使用重命名
import { firstName as newName , lastName as newName2 , year } from './profile.js';

// 使用*来指定一个对象作为整体加载
import * as newModule from './circle';
function setName(element) {
  element.textContent = newModule.firstName + ' ' + newModule.lastName;
}
```

使用 `import` 命令的时候，用户需要知道所要加载的变量名或函数名，以 {} 的形式加载。可以采用到 `export default` 命令，为模块指定默认输出。

```javascript
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'

// 注意一个模块只能有一个默认输出，因此export default命令只能使用一次
```

## 2. CommonJS

{% hint style="info" %}
参考资料：[《CommonJS规范》](https://javascript.ruanyifeng.com/nodejs/module.html)
{% endhint %}

```javascript
// 模块文件
// 导出模块：exports.XXX = XXX;
exports.add = function(a,b){return a+b};

// 引用文件
// 引入模块：XXX = require('/filePath');
let module = require('module.js');
console.log(module.add(1,2));
```

{% hint style="info" %}
CommonJS 与 ES6 module 的区别：

* CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
{% endhint %}

## 3. AMD/CMD

{% hint style="info" %}
参考资料：[《RequireJS和AMD规范》](https://www.cnblogs.com/ghw0501/p/4796922.html)[《谈谈JS前端模块化规范》](https://segmentfault.com/a/1190000015991869)
{% endhint %}

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

