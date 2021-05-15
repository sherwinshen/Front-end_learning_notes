# 基础知识

## 1. 基础语法

![](../.gitbook/assets/css-yuan-li-.png)

引入 CSS 样式的方法

* 外部样式表 - `<link rel="stylesheet" href="style.css">`
* 内部样式表 - `<style>样式</style>`
* 内联样式 - `<h1 style="样式"></h1>`
* 导入方式 - `<style> @import url('main.css') <style>`

## 2. CSS 选择器

{% page-ref page="css-topics/css-selector.md" %}

## 3. CSS的数值与单位

### 3.1 数值

* 长度值，用于指定例如元素宽度、边框（border）宽度或字体大小；
* 无单位整数，用于指定例如相对线宽或运行动画的次数。

**长度值：**

* 绝对单位：
  * px：像素（pixels ）
  * 1 `in`=2.54`cm`=25.4`mm`=72`pt`=6`pc`
    * `in`：英寸Inches \(1 英寸 = 2.54 厘米\)
    * `cm`：厘米Centimeters
    * `mm`：毫米Millimeters
    * `pt`：点Points，或者叫英镑 \(1点 = 1/72英寸\)
    * `pc`：皮卡Picas \(1 皮卡 = 12 点\)
* 相对单位：
  * em:1em与当前元素的字体大小相同（注意em会继承父元素的字体大小）
  * rem: 等于默认基础字体大小的尺寸，且继承的字体大小将不起作用，区别于em
  * vw, vh: 分别是视口宽度的1/100和视口高度的1/100

**无单位整数：**

* 0就是0，无关单位，如`margin: 0;`则去除了内外边框
* 设置行高，line-height，如`line-height: 1.5;`
* 运行动画的次数等，如`animation-iteration-count: 5;`

### 3.2 百分比

{% hint style="info" %}
百分比的关键是看参照是什么？
{% endhint %}

* width/height：相对于父元素的width/height；
* margin/padding：相对于父元素的width（无论什么方向）；
* transform: translate：自身border-box的尺寸；
* 定位bottom/left/right/top：left/right是参照包含块宽度，bottom/top是参照包含块高度；
* border-radius：水平半轴相对于盒模型的宽度，垂直半轴相对于盒模型的高度；
* background-position：图片移动结果是\(父元素-背景图片\)\*百分比；
* line-height：自身的font-size；
* vertical-align：自身的line-height；

{% hint style="warning" %}
对于 width/height 的百分比来说，如果父元素（定位元素）没有明确的高度定义，则百分比都视为 auto。
{% endhint %}

### 3.3 颜色

用于指定背景颜色，字体颜色等

* 关键词，如“red”
* 十六进制，如“\#000000”
* RGB，如“rgb\(255,0,0\)”
* RGBA，如“rgba\(255,0,0,0.5\)” - 多了透明度通道
* 不透明度，如“opacity: 0.5”

## 4. 层叠和继承

05

## 5. 盒模型

06

## 6. 文本/字体样式

01

## 7. 列表样式

## 8. 链接样式

## 9. 背景 background

02

## 10. 边界 border

## 11. 布局

{% page-ref page="css-topics/css-layout.md" %}

## 12. CSS动画

## 13. 浏览器内核

## 14. 设备媒体



{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

