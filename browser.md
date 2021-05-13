# 浏览器

> 浏览器是网页运行的平台，常见的浏览器有谷歌（Chrome）、Safari、火狐（Firefox）、IE、Edge、Opera等。

## 浏览器组成

1. 渲染引擎（即浏览器内核）：用来解析 HTML与CSS，渲染引擎决定了浏览器如何显示网页的内容以及页面的格式信息。
2. JS 引擎：用来解析网页中的JavaScript代码，对其处理后再运行。

{% hint style="warning" %}
注意，浏览器本身并不会执行JS代码，而是通过内置 JavaScript 引擎\(解释器\) 来执行 JS 代码。JS 引擎执行代码时会逐行解释每一句源码（转换为机器语言），然后由计算机去执行，所以 JavaScript 语言归为脚本语言，会逐行解释执行。
{% endhint %}

## 浏览器工作原理

![](.gitbook/assets/browser.png)

1. User Interface 用户界面，我们所看到的浏览器。
2. Browser engine 浏览器引擎，用来查询和操作渲染引擎。
3. Rendering engine 用来显示请求的内容，负责解析HTML、CSS。
4. Networking 网络，负责发送网络请求。
5. JavaScript Interpreter JavaScript解析器，负责执行JavaScript的代码。
6. UI Backend UI后端，用来绘制类似组合框和弹出窗口。
7. Data Persistence 数据持久化，数据存储 cookie、HTML5中的sessionStorage。

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

