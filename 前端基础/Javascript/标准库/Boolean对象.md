# Boolean对象

简介：本文为Boolean对象笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision)         联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)



```javascript
var b = new Boolean(); // 等同于 var b = new Boolean(null);
```

> 通过new生成的Boolean对象，如果参数是 0, -0, null, false, NaN, undefined, “”生成的Boolean对象的值为false。如果参数是其他值均为true，尤其注意new Boolean(false)也是为true。

注意，new生成的为对象，需要得到布尔值，则应该单独使用Boolean()

> `Boolean`对象除了可以作为构造函数，还可以单独使用，将任意值转为布尔值

```javascript
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean('') // false
Boolean(NaN) // false

Boolean(1) // true
Boolean('false') // true
Boolean([]) // true
Boolean({}) // true
Boolean(function () {}) // true
Boolean(/foo/) // true
```



注意区别new Boolean()与Boolean()

```javascript
Boolean(false) // false
new Boolean(false) // true
Boolean(null) // false
new Boolean(null) // true
```



------

如果发现本项目有错误，欢迎提交 issues 指正。