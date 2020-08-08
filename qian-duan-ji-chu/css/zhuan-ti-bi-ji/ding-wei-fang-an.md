# 定位方案

简介：本文为CSS定位方案笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

参考链接：[CSS 定位详解](http://www.ruanyifeng.com/blog/2019/11/css-position.html)

> CSS定位主要分为静态定位static，固定定位fixed，绝对定位absolute，相对定位relative，粘性定位sticky\(新增\)。

## 1、静态定位static

元素默认为静态定位，正常文档流中。

## 2、绝对定位absolute

* 脱离文档流，不在正常文档流中占据空间；
* left、right、top、bottom等属性相对于其最接近的一个有定位设置的父级元素进行定位，如果父元素均没有设置定位，则依据 body 元素左上角作为参考进行定位；
* 绝对定位元素可以堆叠，通过 z-index 属性控制顺序

## 3、相对定位relative

> 相对指的是相对于原来的位置而言，区别于绝对定位是相对于设置有定位的父元素相对而言

* 未脱离文档流，会在正常文档流中占据空间，留下空白
* left、right、top、bottom等属性设置在正常文档流中偏移自身位置
* 通过 z-index 属性控制顺序，但相对定位元素不可层叠

## 4、固定定位fixed

> 固定定位类似于绝对定位，其相对于浏览器窗口而言定位，脱离文档流。最常见的用途是在页面中创建一个固定头部、固定脚部或者固定侧边栏。

## 5、粘性定位sticky

> 类似于像`relative`和`fixed`的结合，主要用于页面滚动：一些时候是`relative`定位（定位基点是自身默认位置），另一些时候自动变成`fixed`定位（定位基点是视口）。

* 用法：必须搭配`top`、`bottom`、`left`、`right`这四个属性一起使用。
* 规则：页面滚动，当元素开始脱离视口时（即部分不可见），只要与`sticky`元素的距离达到生效门槛，`relative`定位自动切换为`fixed`定位；等到元素完全脱离视口时（即完全不可见），`fixed`定位自动切换回`relative`定位。

  ```text
  #toolbar {
  position: -webkit-sticky; /* safari 浏览器 */
  position: sticky; /* 其他浏览器 */
  top: 20px;
  }
  ```

举例：上面代码中，页面向下滚动时，`#toolbar`的父元素开始脱离视口，一旦视口的顶部与`#toolbar`的距离小于`20px`（门槛值），`#toolbar`就自动变为`fixed`定位，保持与视口顶部`20px`的距离。页面继续向下滚动，父元素彻底离开视口（即整个父元素完全不可见），`#toolbar`恢复成`relative`定位。

注意：设置了绝对定位的元素，在文档流中是不占据空间的，它在文档流中的位置会被删除，相当于浮了起来。区别于浮动，浮动元素的定位还是基于正常的文档流，然后从文档流中抽出并尽可能远的移动至左侧或者右侧。文字内容会围绕在浮动元素周围。

如果发现本项目有错误，欢迎提交 issues 指正。

