# 重绘和回流

简介：本文为重绘和回流笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 概念

> 每个页面至少需要一次回流，就是在页面第一次加载的时候。当render tree中的一些元素需要更新属性，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。回流必将引起重绘，重绘不一定会引起回流

* 回流\(也称重排\)：当render tree中的部分或全部因为元素的规模尺寸、布局、隐藏等改变而需要重新构建。
* 重绘：当render tree中一些元素需要更新属性，这些属性只影响外观风格，不影响布局。

## 回流的场景

* 添加或删除可见的DOM元素
* 元素的位置发生变化
* 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
* 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
* 元素字体大小变化
* 激活CSS伪类（例如：:hover）
* 页面一开始渲染的时候（这肯定避免不了）
* 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

## 减少回流和重绘

* 使用csstext，className一次性改变属性

```javascript
const el = document.getElementById('test');
// 原本
el.style.padding = '5px';
el.style.borderLeft = '1px';
el.style.borderRight = '2px';

// 现在合并处理
e1.style.cssText += 'border-left: 1px; border-right: 2px;   padding: 5px;
el.className += ' active'; // 在active的CSS类中定义样式
```

* 对dom进行一系列修改引起多次回流时候，可以使其**脱离文档流**，避免影响其他元素

> 脱离文档流的方法[见下](zhong-hui-he-hui-liu.md#脱离文档流的方法)

* 对于复杂动画效果,使用绝对定位让其脱离文档流，因为动画经常引起重排，影响周围元素
* 缓存布局信息

```javascript
// 每次都会访问div的offsetLeft，造成浏览器强制刷新渲染队列以获取最新的offsetLeft值
div.style.left = 1 + div.offsetLeft + 'px';

// 缓存该信息进行改进
current = div.offsetLeft;
div.style.left = 1 + ++current + 'px';
```

* css3硬件加速（GPU加速）

> 常见的触发硬件加速的css属性：transform/opacity/filters/Will-change

### 脱离文档流的方法

1、隐藏元素，进行修改后，然后再显示该元素（隐藏和显示两次回流）

```javascript
let ul = document.querySelector('#mylist');
ul.style.display = 'none'; // display:none使其脱离文档流
appendNode(ul, data); // 此处进行修改元素
ul.style.display = 'block';
```

2、使用文档片段\(document fragment\)在当前DOM之外构建一个子树，再把它拷贝回文档

```javascript
const ul = document.getElementById('list');
const fragment = document.createDocumentFragment(); // 创建子树
appendDataToElement(fragment, data);
ul.appendChild(fragment); // 加入到当前文档中
```

3、将原始元素拷贝到一个独立的节点中，操作这个节点，然后覆盖原始元素

```javascript
let old = document.querySelector('#mylist');
let clone = old.cloneNode(true); // 拷贝到独立的节点
appendNode(clone, data);
old.parentNode.replaceChild(clone, old);
```

如果发现本项目有错误，欢迎提交 issues 指正。

