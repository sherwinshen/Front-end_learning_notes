# 模块化

## 1. 基础概念

许多语言都具有模块支持，如 python 通过 import 导入模块，CSS 通过 @import 导入模块，但是 JS 语言没有模块支持，即不同 JS 文件之间不能直接通过如 import 这样的语言进行导入使用。

模块的职责：封装实现；暴露接口；声明依赖。

## 2. 解决方法

### 2.1 AMD/CMD

个人基本不用，略，可参看：[RequireJS和AMD规范](https://www.cnblogs.com/ghw0501/p/4796922.html) [谈谈Js前端模块化规范](https://segmentfault.com/a/1190000015991869)

### 2.2 Commonjs

```javascript
// 模块文件
// 导出模块：exports.XXX = XXX;
exports.add = function(a,b){return a+b};

// 引用文件
// 引入模块：XXX = require('/filePath');
let module = require('module.js');
console.log(module.add(1,2));
```

### 2.3 ES6 Module

<img src="./img/pic13.png" style="zoom:40%;" />

主要有2个命令构成：`export`和`import`。`export`命令用于规定模块的对外接口，`import`命令用于输入其他模块提供的功能。

#### 2.3.1 export

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

#### 2.3.2 import

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

#### 2.3.3 export 与 import 的复合写法 

```javascript
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };

// export *，表示再输出circle模块的所有属性和方法，实现了模块的继承
export * from 'circle';
```

### 3. 注意点

CommonJS 与 ES6 module 的区别：

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。