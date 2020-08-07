# 前端-面试问题总结（2）

简介：本文为前端面试问题总结，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 1、浏览器/HTML

* http和https的区别
* 介绍HTTP协议
* https的工作原理
* TCP三次握手
* TCP和UDP的区别
* WebSocket的实现和应用
* web无障碍（WAI）
* [常用BOM属性对象方法](mian-shi-wen-ti-zong-jie-2.md#1常用BOM属性对象方法)
* HTML5拖放Drag
* HTTP2.0
* 常见状态码
* fetch发送2次请求的原因
* cookie、sessionStorage、localStorage的区别
* cookie和session的区别
* web worker
* HTML5语义化标签
* iframe及优缺点
* Doctype作用及严格模式与混杂模式的区分
* XHTML 与 HTML 之间的差异
* XSS攻击及cookies对XSS攻击的防范
* RESTFUL\(表现层状态转化\)
* viewport和移动端布局
* addEventListener参数\(三个\)
* 强缓存/协商缓存，状态码304，哪些请求头是跟缓存相关的，cache-control值有哪些
* 前端优化
* [get/post区别](mian-shi-wen-ti-zong-jie-2.md#2getpost区别)
* [post支持的编码格式](mian-shi-wen-ti-zong-jie-2.md#3post支持的编码格式)
* 301/302状态码的区别
* [HTTP支持的方法](mian-shi-wen-ti-zong-jie-2.md#4HTTP支持的方法)
* 200/304状态码的区别
* [HTML5新增的元素](mian-shi-wen-ti-zong-jie-2.md#5HTML5新增的元素)
* Http常用请求头\(Request Header/Response Header\)
* [浏览器输入URL到页面渲染全过程](mian-shi-wen-ti-zong-jie-2.md#6浏览器输入URL到页面渲染全过程)
* CSRF和XSS网络攻击及防范
* cookie可以设置哪些字段

## 2、CSS

* css盒模型
* [如何画一条0.5px的线](mian-shi-wen-ti-zong-jie-2.md#1画05px的线)
* link标签和import标签的区别
* transition、transform和animation的区别
* Flex布局
* [src与href的区别](mian-shi-wen-ti-zong-jie-2.md#2src与href的区别)
* [居中布局\(水平+垂直\)](mian-shi-wen-ti-zong-jie-2.md#3居中布局)
* [块元素、行元素、行内块元素](mian-shi-wen-ti-zong-jie-2.md#4块元素行元素行内块元素)
* [多行文本省略号（注意区别单行文本省略号）](mian-shi-wen-ti-zong-jie-2.md#5多行文本省略号)
* [区别visibility=hidden，opacity=0，display:none](mian-shi-wen-ti-zong-jie-2.md#6visibilityhiddenopacity0displaynone)
* 双边距重叠问题（外边距折叠）
* CSS定位（5种）
* 浮动与绝对定位的区别
* 清除浮动（高度塌陷解决方案）
* CSS3新特性
* [CSS选择器及样式优先级](mian-shi-wen-ti-zong-jie-2.md#7CSS选择器及样式优先级)
* 怎么样让一个元素消失（4种）
* [css动画如何实现](mian-shi-wen-ti-zong-jie-2.md#8CSS动画)
* 溢出文本处理
* 三栏布局的实现方式
* [calc属性](mian-shi-wen-ti-zong-jie-2.md#9calc属性)
* display：table和本身的table有什么区别
* 三栏布局的实现方式
* 如何改变一个DOM元素的字体颜色且不在它本身上进行操作？（CSS的继承）
* 元素的背景颜色会填充哪些区域？[背景颜色/图片填充](mian-shi-wen-ti-zong-jie-2.md#10背景颜色图片填充)
* 重绘和回流是什么？以及什么会引发？
* 如何减少回流？
* [脱离文档流的方法](mian-shi-wen-ti-zong-jie-2.md#11脱离文档流的方法)
* BFC（块级格式化上下文）作用
* absolute定位的top针对父元素的定位点是什么？**border内侧，padding外侧**？？
* [css预处理器](mian-shi-wen-ti-zong-jie-2.md#12css预处理器)
* [line-height/font-size理解](mian-shi-wen-ti-zong-jie-2.md#13line%5C-heightfont%5C-size理解)
* display取值常用有哪些
* 多列等高布局
* [物理像素与CSS像素](mian-shi-wen-ti-zong-jie-2.md#14物理像素与CSS像素)

## 3、Javascript

* get/post请求区别
  * get传参长度存在的误区以及实际原因
  * get/post在缓存方面的差别 
* 闭包（是什么？为什么要用？） - [什么是闭包？闭包的作用，用法及优缺点](https://www.cnblogs.com/amcy/p/9912528.html)
* 类的创建和继承\(ES5+ES6\)
* 事件
  * 什么是事件流
  * 事件委托（事件代理）
* [图片的懒加载和预加载](mian-shi-wen-ti-zong-jie-2.md#1图片的懒加载和预加载)
* [mouseover和mouseenter的区别](mian-shi-wen-ti-zong-jie-2.md#2mouseover和mouseenter的区别)
* [new操作符做了哪些事情](mian-shi-wen-ti-zong-jie-2.md#3new操作符做了哪些事情)
* [bind，apply，call的区别](mian-shi-wen-ti-zong-jie-2.md#4bindapplycall的区别)\(改变函数内部this指针的指向函数有哪些\)
* 各种位置属性的区别
* 拖拽功能的实现
* [异步/延迟加载js的方法](mian-shi-wen-ti-zong-jie-2.md#5异步延迟加载JS的方法)
* 垃圾回收机制
* eval是做什么的
* 节流和防抖
* [前端模块化](mian-shi-wen-ti-zong-jie-2.md#6前端模块化)
* 实现一个once函数，传入函数参数只执行一次
* Commonjs、AMD、CMD、UMD和ES6 Module
* JS对象的赋值与复制
  * 对象深度克隆的简单实现
  * 实现js中所有对象的深度克隆（包装对象，Date对象，正则对象）
  * 深浅拷贝的区别和实现
* [监听对象属性的改变](mian-shi-wen-ti-zong-jie-2.md#7监听对象属性的改变)
* 原型链相关
  * `Function._proto_()`
  * 原型链？原型链的顶端是什么？Object的原型是什么？Object的原型的原型是什么？
* [如何实现一个私有变量，用getName方法可以访问，不能直接访问](mian-shi-wen-ti-zong-jie-2.md#8私有变量)
* [==和===、以及Object.is的区别](mian-shi-wen-ti-zong-jie-2.md#9==和===以及Objectis的区别)
* 数组常用方法/字符串常用方法
* JS基本数据类型  5种/6种\(es6新增\)
* [ES6新特性](mian-shi-wen-ti-zong-jie-2.md#10ES6新特性)
* setTimeout、setInterval和requestAnimationFrame之间的区别
* [箭头函数获取arguments？剩余运算符与arguments的区别？](mian-shi-wen-ti-zong-jie-2.md#11剩余运算符和arguments)
* [bind函数实现](mian-shi-wen-ti-zong-jie-2.md#12bind函数实现)
* JavaScript中的轮播实现原理？假如一个页面上有两个轮播，你会怎么实现？
* private和public
* async和await具体该怎么用
* promise和await/async的关系
* js加载过程阻塞的解决方法
* js对象类型，基本对象类型以及引用对象类型的区别
* 怎么实现一个计算一年中有多少周
* [异步函数for循环获得正确索引](mian-shi-wen-ti-zong-jie-2.md#13异步函数索引)
* [JS获取对象属性和方法的方法](mian-shi-wen-ti-zong-jie-2.md#14JS获取对象属性和方法的方法)
* 事件模型，DOM0级和DOM2级有什么区别，DOM的分级是什么
* NaN是什么的缩写，JS的作用域类型
* undefined==null返回的结果是什么，undefined与null的区别在哪，写一个函数判断变量类型
* [setTimeout和Promise的执行顺序](mian-shi-wen-ti-zong-jie-2.md#15setTimeout和Promise的执行顺序)
* setTimeout\(\)设置延迟时间为0毫秒作用
* ES6箭头函数的特性
* string的startwith和indexof两种方法的区别
* promise+Generator+Async的使用
* 写个函数转化下划线命名到驼峰命名
* vue的生命周期
* symbol
* 什么是事件监听
* 写一个函数，第一秒打印1，第二秒打印2
* 暂停死区
* 按需加载
* virtual dom
* webpack用来干什么的
* JS中继承实现的几种方式
* 不同数据类型的值的比较，是怎么转换的，有什么规则
* null == undefined的值以及原因
* 跨域的原理及方法
* this的指向\(哪几种\)
* JS的全排列
* JS的语言特性
* 类型判断
  * 如何判断一个数组（类型判断）
* [性能优化](mian-shi-wen-ti-zong-jie-2.md#16性能优化)
* 去除字符串首尾空格\(正则表达式和字符串方法\)
* promise相关
  * 将原生的ajax封装成promise
  * 简单的实现一个promise
  * 介绍一下promise，及其底层如何实现
  * promise串行和并行
* 不同页面之间进行通信
* 给两个构造函数A和B，如何实现A继承B
* 模块化开发（require）
* Eventloop
* 解决异步回调地狱
* Ajax解决浏览器缓存问题
* 用setTimeout来实现setInterval
* js怎么控制一次加载一张图片，加载完后再加载下一张
* 如何实现sleep的效果
* 简单实现Node的Events模块
* [Ajax解决浏览器缓存问题](mian-shi-wen-ti-zong-jie-2.md#17Ajax解决浏览器缓存问题)

待完成编程任务

* 通过url访问下载图片（跨域）

## 浏览器/HTML部分答案：

### 1、常用BOM属性对象方法

BOM\(浏览器对象模型\)的核心是window\(顶层对象\)

* document 文档对象
* history - 历史记录相关的信息
* navigator - 浏览器相关的信息
* location - 当前的url相关的信息
* screen - 客户端显示屏幕的信息
* ......

### 2、get/post区别

* get参数通过url传递，post放在request body中；
* get传递的参数是有长度限制的，而post没有（需要了解实际原因）；
* get比post更加安全，因为get参数直接暴露在url中；
* get仅支持URI编码，而post支持多种编码方式-见下；
* get请求参数会被完整保留在浏览历史记录里，而post中的参数不会被保留；
* get产生一个TCP数据包，post产生两个TCP数据包（原因：浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok）； 
* GET请求会被浏览器主动cache，而POST不会，除非手动设置。

### 3、post支持的编码格式

1. application/x-www-form-urlencoded - 表单默认编码格式，以key1=val1&key2=val2 的方式进行编码
2. multipart/form-data - 一般用来上传文件
3. application/json - 消息主体是序列化后的 JSON 字符串
4. text/xml

### 4、HTTP支持的方法

* 服务器数据增删改查 - POST/DELETE/PUT/GET
* HEAD - 类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头
* OPTIONS - 允许客户端查看服务器的性能
* CONNECT - HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器
* TRACE - 回显服务器收到的请求，主要用于测试或诊断

### 5、HTML5新增的元素

* 语义化标签 - header、footer、nav、aside、section、article
* input类型 - color、emial、tel、data、datatime、month、week、range等
* 存储 - sessionStorage，localStorage、离线存储
* 多媒体方面 - audio、vedio
* 其他 - 地理定位、canvas画布、svg、拖放、web worker和websocket协议等

### 6、浏览器输入URL到页面渲染全过程

* DNS解析\(寻找哪个服务器上有请求的资源\)
  * 浏览器缓存：浏览器会按照一定的频率 缓存DNS记录
  * 操作系统缓存：如果浏览器缓存中找不到需要的DNS记录，就会取操作系统中找
  * 路由缓存：路由器也有DNS缓存
  * ISP的DNS服务器：ISP有专门的DNS服务器应对DNS查询请求
  * 根服务器：ISP的DNS服务器找不到之后，就要向根服务器发出请求，进行递归查询
* TCP连接\(三次握手\)
* 发送HTTP请求
  * http请求包括header和body。header中包括请求的方式（get和post）、请求的协议 （http、https、ftp）、请求的地址ip、缓存cookie。body中有请求的内容。
* 服务器处理HTTP请求，并返回响应的数据\(报文\)
  * 状态码为200显示响应成功
* 浏览器解析渲染资源
  * 浏览器根据深度遍历的方式把html节点遍历成dom 树
  * 将css解析成CSS DOM树
  * 将dom树和CSS DOM树构造成render树
  * JS根据得到的render树计算所有节点在屏幕中的位置，进行布局（回流）
  * 遍历render树并调用硬件API绘制所有节点（重绘）

## CSS部分答案

### 1、画0.5px的线

方法1:transform: scale\(\)

```css
div{
  height:1px;
  transform: scaleY(0.5);
  transform-origin: 50% 100%;
}
```

方法2:meta viewport\(\)

```markup
<meta name="viewport" content="width=device-width,initial-sacle=0.5">
```

方法3:boxshadow

```css
div{
  height: 1px;
  background: none;
  box-shadow: 0 0.5px 0 #000;
}
```

### 2、src与href的区别

* src主要用于引入（浏览器解析到该元素时，会需要加载该元素），src指向的内容会嵌入到文档中当前标签所在的位置，img/script/iframe
* herf主要用于引用，用于在当前文档和引用资源之间建立联系，link\(连接css\)/a

### 3、居中布局

![&#x5C45;&#x4E2D;&#x5E03;&#x5C40;](../.gitbook/assets/居中布局%20%281%29.png)

### 4、块元素、行元素、行内块元素

* 块元素 - display：block（常见：div、p、nav、aside、header、footer、section、article、ul-li等）
  * 独占一行，自动填满父元素
  * 设置宽高/margin/padding均有效
  * 自动换行
  * 默认排列方式为从上到下
* 行元素 - display：inline （常见：span、a）
  * 不独占一行
  * 设置宽高无效，宽仅与内容有关，但高可以通过line-height设置；设置margin上下无效，左右有效；设置padding上下无效，左右有效，但上下可以有视觉效果，比如border会被撑开。
  * 不自动换行
  * 默认排列方式为从左到右
* 行内块元素 - display：inline-block
  * 设置宽高/margin/padding均有效
  * 自动换行
  * 默认排列方式为从左到右

### 5、多行文本省略号

单行文本省略号设置：

```css
overflow:hidden; /* 超出限定的宽度就隐藏内容 */
text-overflow: ellipsis;
white-space: nowrap; /* 设置文字在一行显示不能换行 */
```

多行文本省略号设置（仅适用于WebKit浏览器及移动端）：

```css
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
-webkit-line-clamp:2; /* 表示最多显示2行 */
-webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
```

### 6、visibility=hidden，opacity=0，display:none

* visibility=hidden：元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已经绑定的事件，只会引起页面重绘，子元素可以设置visibility:visible显示出来。
* opacity=0：透明度为0，元素隐藏起来了，但不会改变页面布局，绑定的事件也能正常触发，只会引起页面重绘
* display:none：元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删除掉一样，它会产生回流和重绘

### 7、CSS选择器及样式优先级

* ID选择器&gt;类选择器=伪类选择器=属性选择器&gt;标签选择器
* 内联样式&gt; 内部样式 &gt; 外部样式 &gt; 浏览器用户自定义样式 &gt; 浏览器默认样式

注意区分伪元素选择器和伪类选择器：

* 伪元素：创建一些不存在原有dom结构树的元素，如::before, ::after等
* 伪类：表示已存在的某个元素处于某种状态，如:link,​ :visited, :active, :hover等

### 8、CSS3动画

```css
animation: 动画名 持续时间 其他子属性;

/*注意，动画的实际表现是由 @keyframes规则实现*/

@keyframes 动画名{
  from{css-styles};
  to{css-styles;};
  /* 也可以写成百分比的形式25%，50%，75%等逐步定义动画的表现 */
}
```

### 9、calc属性

动态计算长度值，可以使用%、px、em、rem等单位混合，但必须要注意的是运算符前后都需要保留一个空格。

```css
.class{
    width: calc(100% - 10px);
}
```

### 10、背景颜色/图片填充

**背景颜色**填充包含**内容+padding+border**，注意boeder如果为solid则颜色为border的默认黑色，如果为dashed虚线，可以看到border也包括背景颜色

**背景图片**默认也是填充包含**内容+padding+border**，默认为重复填充满，如果设置不重置no-repeat，则background-position的top和left分别顶到padding的边界，不包含border区域。

### 11、脱离文档流的方法

* float - 使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在该元素的周围。
* absolute - 脱离文档流后的元素是相对于该元素具有定位属性的祖先元素进行定位的
* fixed - 完全脱离文档流，相对于浏览器窗口进行定位。

### 12、css预处理器

> CSS 预处理器定义了一种新的语言，其基本思想是，用一种专门的编程语言，为 CSS 增加了一些编程的特性，将 CSS 作为目标生成文件，然后开发者就只要使用这种语言进行 CSS 的编码工作。转化成通俗易懂的话来说就是“用一种专门的编程语言，进行 Web 页面样式设计，再通过编译器转化为正常的 CSS 文件，以供项目使用”。

* SASS：基于 Ruby，通过服务端处理，功能强大。解析效率高。需要学习 Ruby 语言，上手难度高于 LESS。
* LESS：基于 NodeJS，通过客户端处理，使用简单。功能比 SASS 简单，解析效率也低于 SASS，但在实际开发中足够了，建议使用 LESS。

### 13、line-height/font-size理解

![](https://img-blog.csdnimg.cn/20190902210836352.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzEwOTU0OQ==,size_16,color_FFFFFF,t_70)

### 14、物理像素与CSS像素

物理像素和CSS取决于像素比：dpr = 物理像素/CSS像素，可通过`window.devicePixelRatio`获取查看。

```javascript
// 设置1px物理像素
```

## Javascript部分答案

### 1、图片的懒加载和预加载

* 图片预加载：提前加载图片，当用户需要查看时可直接从本地缓存中渲染，减少等待的时间。
  * 应用场景：略缩图，点击方法时可以直接获取大图显示
* 图片懒加载（缓载）：延迟加载图片或符合某些条件时才加载某些图片，减少请求数或延迟请求数。
  * 应用场景：滑动相册，不需要全部加载，滑动的时候加载即可

### 2、mouseover和mouseenter的区别

主要区别于两个地方：1、是否支持冒泡；2、事件触发的时机；

* mouseover - 当鼠标移入元素或其子元素都会触发事件；支持冒泡；对应的移除事件是mouseout
* mouseenter - 当鼠标移入元素（不包含元素的子元素）触发事件；不会冒泡；对应的移除事件是mouseleave

![](https://img2018.cnblogs.com/blog/1670358/201909/1670358-20190918160838058-597135305.png)

### 3、new操作符做了哪些事情

```javascript
const Class = fucntion(){};
const res = new Class();
```

1. 创建一个空对象 `const obj = new Object();`
2. 链接到原型 `obj._proyo_ = Class.prototype;`
3. 绑定this指向，执行构造函数 `const temp = Class.call(obj);`
4. 返回对象 `res = temp`

### 4、bind，apply，call的区别

|  | 调用方式 | 第一个参数 | 其余参数 |
| :--- | :--- | :--- | :--- |
| bind | 返回一个函数 | this指向改变后的对象 | 直接传递 |
| apply | 函数直接调用 | this指向改变后的对象 | 用数组包裹参数 |
| call | 函数直接调用 | this指向改变后的对象 | 直接传递 |

> 如果第一个参数为null或undefined，this的指向就是全局变量，在浏览器里就是window对象。

### 5、异步/延迟加载JS的方法

> 注：同步加载的话会阻止浏览器的后续解析，直到当前的加载完成。

* defer属性 - 浏览器立即下载，且脚本会被延迟到整个页面都解析完毕之后再执行，另外将按出现的顺序加载和运行。
* async属性 - 浏览器立即下载，且脚本会被延迟到整个页面都解析完毕之后再执行，但是运行顺序就无法执行，如果脚本之间无相互关联则推荐async属性。
* 设置setTimeout方法，实现延迟加载
* 将JS放置最后，实现延迟加载

### 6、前端模块化

简单理解为实现特定功能的相互独立的一组方法，利用了一种分治的思想，有利于代码复用和维护。

现有的模块化规范有：CommonJS AMD UMD CMD Module\(es6\)

### 7、监听对象属性的改变

> 主要通过getter和setter函数来实现

* Object.defineProperty\(obj, prop, descriptor\)

```javascript
// Example
var obj={};
Object.defineProperty(obj,'a',{
    set:function(newValue){
        a = newValue;
        console.log('set :',newValue);
    }
})
```

> 缺点：1、无法监听数组的变化（push, pop, shift, unshift,splice, sort, reverse）等方法；2、只能监听属性，而不是监听对象本身。

* Proxy代理 

```javascript
// Example
const obj = {};
const newObj = new Proxy(obj, {
    get: function (target, name) {
        return name in target ? target[name] : 37;
    },
    set: function (target, name, value) { // 目标对象,被设置的属性名,被设置的新值
        target[name] = value + 1
        return true
    }
});
```

> 优点：监听数组变化，监听的是对象本身，有13种拦截方法。

### 8、私有变量

> 私有变量指的是只能在函数内部使用，函数外部不能获取到。

```javascript
// 构造函数，外部通过调用函数获取，但不能直接获取
function func(){
    // this.name 外部可以直接访问
    this.name1 = 'name1';
    // 内部定义的变量外部无法访问，可通过方法属性获取
    const name2 = 'name2';
    this.getName = () => name2
}
```

但是上述代码存在一个问题是，每一个实例都有同样的特权方法，完全可以复用，通过静态私有变量的方法来实现特权方法（基于）。

```javascript
(function() {
    // 私有变量
    let name = 'demo';
    // 构造函数
    Person = function () {
    };
    // 在原型上定义方法
    Person.prototype.getName = function() {
        return name;
    };
})();
```

### 9、==和===、以及Object.is的区别

> ==是值比较，===和Object.is是值和类型比较。

1、==值比较就会存在隐式类型转换，在大部分情况下满足{对象=&gt;字符串=&gt;数值，布尔值=&gt;数值}

![&#x9690;&#x5F0F;&#x7C7B;&#x578B;&#x8F6C;&#x6362;](https://upload-images.jianshu.io/upload_images/1464420-6e0c14072d7465f3.png?imageMogr2/auto-orient/strip|imageView2/2/w/316)

2、===和Object.is基本一致，但存在一些特殊情况

```text
Object.is(NaN, NaN); //true
NaN === NaN; // false，NaN与任意数据相比都是false，包括自身

Object.is(+0, -0); //false
+0 === -0; // true
```

![&#x503C;&#x6BD4;&#x8F83;](https://upload-images.jianshu.io/upload_images/1464420-81cb4cda76004182.png?imageMogr2/auto-orient/strip|imageView2/2/w/787)

### 10、ES6新特性

* let/const
* 解构赋值
* 扩展运算符
* 函数相关
  * 箭头函数
  * 默认参数
  * 参数展开...args
* 字符串模版
* promise对象
* Generator函数
* 面向对象Class
* async/await

### 11、剩余运算符和arguments

```javascript
function fun1(a,b,...rest) {
    console.log(Array.from(arguments))
    console.log(rest)
}

fun1(1,2,3);
// [ 1, 2, 3 ]
// [ 3 ]

const func2 = (...rest) =>{
    console.log(Array.from(arguments))
    console.log(rest)
}
func2(1,2,3);
// 箭头函数没有arguments，或者或者说跟普通函数的arguments不一样，是一个复杂的对象
// [ 1, 2, 3 ]
```

* 剩余参数只代表没有对应形参的实参，arguments代表了所有的实参。
* arguments是一个类数组，剩余参数是一个真实的数组。

### 12、bind函数实现

```javascript
// 自定义bind函数
Function.prototype.newBind = function () {
    // 获取到新的上下文
    const context = arguments[0]
    // 保存当前的函数
    const func = this;
    // bind中带的参数
    let thisArgs = Array.prototype.slice.call(arguments, 1);
    const returnFunc = function () {
        // 合并参数
        thisArgs = thisArgs.concat(Array.from(arguments))
        // 使用apply改变上下文
        return func.apply(this instanceof func ? this : context, thisArgs)
    }
    // 继承原函数的原型
    const newFunction = function () {
    }
    newFunction.prototype = func.prototype;
    returnFunc.prototype = new newFunction();
    return returnFunc
}
```

### 13、异步函数索引

```javascript
// 如果用var，则使用自执行函数
for (var i = 0; i < 5; i++) {
    (function (i) {
        setTimeout(function () {
            console.log(i);
        }, 100)
    })(i);
}
// 使用let就不会有索引的问题
for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000)
}
```

### 14、JS获取对象属性和方法的方法

* Object.keys\(\)——对象内可枚举属性\(方法\)，不包含原型链
* Object.getOwnPropertyNames\(\)——对象内可枚举属性\(方法\)及不可枚举属性（除Symbol值为名称的属性），不包含原型链
* for...in——对象内可枚举属性，包含原型链（hasOwnPropery属性用于判断自身可枚举属性）

### 15、setTimeout和Promise的执行顺序

```javascript
setTimeout(function () {
    console.log(1)
}, 0);
new Promise(function (resolve, reject) {
    console.log(2)
    setTimeout(function () {
        console.log(6)
        resolve();
    }, 0);
    console.log(3)
}).then(function () {
    console.log(4)
})
console.log(5);

// 2 3 5 1 6 4
```

注意点：

1、promise新建后立即执行，里面的代码同步执行

2、promise.then指向的回调将在当前脚本所有同步任务执行完成后执行，但你如果promise的resolve\(\)在异步函数中，还需要等异步函数处理完才能回调

3、setTimeout在主线程中没有执行任何同步代码的前提下才会执行异步回调

### 16、性能优化

减少HTTP请求

使用内容发布网络（CDN）

添加本地缓存

压缩资源文件

将CSS样式表放在顶部，把javascript放在底部（浏览器的运行机制决定）

避免使用CSS表达式

减少DNS查询

使用外部javascript和CSS

避免重定向

图片lazyLoad

### 17、Ajax解决浏览器缓存问题

1、在ajax发送请求前加上 anyAjaxObj.setRequestHeader\("If-Modified-Since","0"\)。

2、在ajax发送请求前加上 anyAjaxObj.setRequestHeader\("Cache-Control","no-cache"\)。

3、在URL后面加上一个随机数： "fresh=" + Math.random\(\);。

4、在URL后面加上时间搓："nowtime=" + new Date\(\).getTime\(\);。

如果发现本项目有错误，欢迎提交 issues 指正。

