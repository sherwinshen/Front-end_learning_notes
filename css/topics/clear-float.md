# 清除浮动

关键点在于添加清除属性（具体添加在什么上）和触发父元素BFC ，直接设置父元素的高度的方法不考虑；

## 1. div + clear

浮动元素后额外使用一个带有`clear:both`属性的空元素，当然也可以对邻接元素添加清除属性。（不建议：额外添加元素，语义化差）

```html
<div class="parent">
  <div style="float: left;"> child</div>
  <div style="clear: both;"></div>
</div>
```

## 2. 父元素BFC

BFC 概念，父元素添加`overflow:hidden`等，使父元素变为 BFC 元素，具体详见[BFC 专题](./bfc.md)。（不推荐：可能会产生额外副作用，例如父元素高度比浮动元素小，那么浮动元素超过父元素的部分就无法显示）

```html
<div style="overflow:hidden;">
  <div style="float: left;"> child</div>
</div>
```

## 3. 伪元素 + clear 

父元素添加 after 伪元素清除浮动

```html
<head>
  <style>
    .clearfix::after{
      content: '';
      height: 0;
      display: block;
      visibility: hidden;
      clear: both;
    }
  </style>
</head>
<body>
  <div class="parent clearfix">
    <div style="float:left;">child</div>
  </div>
</body>
```

或者 before 和 after 双伪元素清除浮动

```html
<head>
  <style>
    .clearfix:after,.clearfix:before{
      content: "";
      display: table;
    }
    .clearfix:after {
      clear: both;   
    }
  </style> 
</head>
<body>
  <div class="parent clearfix">
    <div style="float:left;">child</div>
  </div>
</body>
```

