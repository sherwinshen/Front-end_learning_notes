# iframe标签

简介：本文为iframe标签笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision)         联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)



> 网页可以使用`iframe`元素，嵌入其他网页，因此一个网页之中会形成多级窗口。

1、窗口的引用：

- `top`：顶层窗口，即最上层的那个窗口
- `parent`：父窗口
- `self`：当前窗口，即自身

```javascript
// 当前窗口是否为顶层窗口
if (window.top === window.self) {}
// 当前窗口是否为iframe窗口
if (window.parent !== window.self) {}
```

2、获得iframe元素

```javascript
const frame = document.getElementById('theFrame'); // 注意此时仅获得DOM对象
// 获得Window对象
const frameWindow = frame.contentWindow;
// 获得document对象
var frameDoc = frame.contentWindow.document;
```

3、window.frames 属性

> `window.frames`属性返回一个类似数组的对象，成员是所有子窗口的`window`对象。

通过该属性可以获得窗口之间的互相引用，举例：`frames[1].frames[2]`返回第二个子窗口内部的第三个子窗口



------

如果发现本项目有错误，欢迎提交 issues 指正。