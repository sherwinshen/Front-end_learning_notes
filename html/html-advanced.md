# 进阶知识

## 1. 图片自适应

**问题1**：艺术方向问题，即当网站在狭窄的屏幕上观看时，显示一幅图片的包含了重要细节的裁剪版本

**解决方法**：采用`<picture></picture>`标签——`<picture>`素包含了一些`<source>`元素，它使浏览器在不同资源间做出选择，紧跟着的是最重要的`<img>`元素。

```markup
<picture>
  <source media="(max-width: 799px)" srcset="test-480w.jpg">
  <source media="(min-width: 800px)" srcset="test-800w.jpg">
  <img src="test.jpg" alt="this is test">
</picture>
```

{% hint style="warning" %}
`<picture>`标签中必须提供一个`<img>`元素以及它的src和alt属性，否则不会有图片显示
{% endhint %}

{% hint style="warning" %}
注意，如果是 CSS 背景图片的形式，则图片自适应可基于background-image 的 css 属性 object-fit！
{% endhint %}

**问题2：**分辨率切换问题，即不同分辨率的设备，选择适合分辨率的图片进行显示

**解决方法：**利用srcset 和 sizes属性来提供更多额外的资源图像和提示，帮助浏览器选择正确的一个资源。

* srcset格式为文件名 + 空格 + 图像固有宽度（或x语法）
* sizes 格式为媒体条件 + 空格 + 当媒体条件为真时，图像将填充的“槽的宽度”（或选择“图像固有宽度”最接近的“槽的宽度”的图片）

```markup
<!-- srcset 中为图像固有宽度 -->
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" 
     alt="Elva dressed as a fairy"
/>

<!-- srcset 中和x语法结合的方式（更加常用） -->
<img srcset="elva-fairy-320w.jpg,
             elva-fairy-480w.jpg 1.5x,
             elva-fairy-640w.jpg 2x"
     src="elva-fairy-640w.jpg" 
     alt="Elva dressed as a fairy"
/>
```

## 2. URL地址

 scheme://host.domain:port/path/filename

* scheme - 定义因特网服务的类型。最常见的类型是 http
* host - 定义域主机（http 的默认主机是 www）
* domain - 定义因特网域名，比如 w3school.com.cn
* :port - 定义主机上的端口号（http 的默认端口号是 80）
* path - 定义服务器上的路径（如果省略，则文档必须位于网站的根目录中）。
* filename - 定义文档/资源的名称

目前主流的 schemes 主要有：

![](../.gitbook/assets/scheme.png)

## 3. 图像区域映射

`<map>` 标签定义一个客户端图像映射 - 图像映射（image-map）指带有可点击区域的一幅图像。area 元素永远嵌套在 map 元素内部。area 元素可定义图像映射中的区域。建议：同时向 `<map>` 添加 id 和 name 属性。

```markup
<img src="planets.jpg" border="0" usemap="#planetmap" alt="Planets" />

<map name="planetmap" id="planetmap">
  <area shape="circle" coords="180,139,14" href ="venus.html" alt="Venus" />
  <area shape="circle" coords="129,161,10" href ="mercur.html" alt="Mercury" />
  <area shape="rect" coords="0,0,110,260" href ="sun.html" alt="Sun" />
</map>
```

area 的 coords 定义可点击区域（对鼠标敏感的区域）的坐标：

* 圆形：`shape="circle"，coords="x,y,z"` 
  *  x 和 y 定义了圆心的位置，z 是以像素为单位的圆形半径
* 多边形：`shape="polygon"，coords="x1,y1,x2,y2,x3,y3,..."` 
  * 每一对 "x,y" 坐标都定义了多边形的一个顶点
* 矩形：`shape="rectangle"，coords="x1,y1,x2,y2"` 
  * x1,y1,x2,y2 表示两个对角顶点

## 4. 表单验证

主要分为两种形式：

1. Html5 通过表单元素的校验属性实现表单校验
2. JS 校验表单

```markup
<!-- required 属性 - 输入是必需的，若没有输入，该表单将不会提交（并将显示错误消息） -->
<input id="choose" name="i_like" required>

<!-- pattern 属性 - 结合正则表达式 -->
<input id="choose" name="i_like" required pattern="banana|cherry">

<!-- minlength 和 maxlength 属性 - 用于强制条目的长度 -->
<input id="choose" name="i_like" required minlength="6" maxlength="6">
```

## 5. 元标签

meta 标签提供关于 HTML 文档的元数据，元数据将服务于浏览器（如何布局或重载页面），搜索引擎 SEO 和其它网络服务等，主要分为两种：

```markup
＜meta http-equiv="参数" content="参数变量值"＞

1、用于设定网页字符集，便于浏览器解析与渲染页面
<meta http-equiv="content-Type" content="text/html;charset=utf-8">
2、指导浏览器如何缓存某个响应以及缓存多长时间。
<meta http-equiv="cache-control" content="no-cache">
3、用于设定网页的到期时间，过期后网页必须到服务器上重新传输。
<meta http-equiv="expires" content="Sunday 10 October 2020 01:00 GMT">
4、设定cookie
<meta http-equiv="Set-Cookie" content="User=Lxxyx; path=/; expires=10-Jan-16 10:00:00 GMT">
5、网页将在设定的时间内，自动跳转设定的网址。
<meta http-equiv="refresh" content="30;URL=http://www.fourdays.com">
```

```markup
＜meta name="参数" content="具体的参数值"＞

1、告诉搜索引擎网页的信息：keywords-关键字；author-作者；description-描述；copyright-版权信息；关键词可以提高搜索命中率，description设置了什么则百度搜索结果就能够显示这些语句
<meta name="keywords" content="硕士生，前端">

2、视图窗口的设置信息
<meta name="viewport" content="width=device-width, initial-scale=1">
```

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

