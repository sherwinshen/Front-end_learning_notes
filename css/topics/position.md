# 定位方案

CSS定位主要分为静态定位static，固定定位fixed，绝对定位absolute，相对定位relative，粘性定位sticky。

## 1. 静态定位 static

元素默认为静态定位，正常文档流中。

## 2. 绝对定位 absolute

- 脱离文档流，不在正常文档流中占据空间
- left、right、top、bottom等属性相对于其最接近的一个有定位设置的父级元素进行定位，如果父元素均没有设置定位，则依据 body 元素左上角作为参考进行定位
- 绝对定位元素可以堆叠，通过 z-index 属性控制顺序

✍️ 注意：设置了绝对定位的元素，在文档流中是不占据空间的，它在文档流中的位置会被删除，相当于浮了起来。区别于浮动，浮动元素的定位还是基于正常的文档流，然后从文档流中抽出并尽可能远的移动至左侧或者右侧。文字内容会围绕在浮动元素周围。

## 3. 相对定位 relative

> 相对指的是相对于原来的位置而言，区别于绝对定位是相对于设置有定位的父元素相对而言

- 未脱离文档流，会在正常文档流中占据空间，留下空白
- left、right、top、bottom等属性设置在正常文档流中偏移自身位置
- 通过 z-index 属性控制顺序，但相对定位元素不可层叠

## 4. 固定定位 fixed

固定定位类似于绝对定位，其相对于浏览器窗口而言定位，脱离文档流。最常见的用途是在页面中创建一个固定头部、固定脚部或者固定侧边栏。

## 5. 粘性定位sticky

类似于像 relative 和 fixed 的结合，主要用于页面滚动：在跨越特定阈值前为 relative 定位（定位基点是自身默认位置），之后变成 fixed 定位（定位基点是视口）。使用的时候必须搭配`top`、`bottom`、`left`、`right`这四个属性（之一）一起使用。

规则：页面滚动，当父元素开始脱离视口时（即部分不可见），只要与`sticky`元素的距离达到生效门槛，`relative`定位自动切换为`fixed`定位；等到元素完全脱离视口时（即完全不可见），`fixed`定位自动切换回`relative`定位。

```html
<head>
  <style>
    body{
      height: 2000px;
      width: 100%;
      background-color: red;
    }
    div {
      height: 200px;
      margin-top: 50px;
      border: solid deepskyblue;
      width: 400px;
      background-color: deepskyblue;
    }
    nav {
      position: sticky;
      top: 20px;
      background: yellow;
      height: 60px;
      line-height: 60px;
    }
  </style>
</head>
<body>
  <div>
    <nav>导航</nav>
  </div>
</body>
```

<img src="./img/sticky.png" style="zoom:70%;" />





{% hint style="info" %} 参考链接：[CSS 定位详解](http://www.ruanyifeng.com/blog/2019/11/css-position.html)  [sticky定位](https://juejin.im/post/6844903973627887624){% endhint %}

