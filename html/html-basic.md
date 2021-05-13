# 基础知识

> HTML（HyperText Markup Language）：超文本标记语言，从**语义**角度描述页面的**结构**。

## 基础结构

```markup
<!-- 文档声明头 -->
<!DOCTYPE html>
<!-- 根标签 -->
<html lang="en">
<!-- 头标签 -->
<head>
    <!-- 网页的编码方式 -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- 视口设置 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 文档标题 -->
    <title>Document</title>
</head>
<!-- 文档主体 -->
<body>
</body>
</html>
```

html 的常见元素主要分为两类：head 区域的元素、body 区域的元素。

* **head 区域的元素**：[meta](https://sherwinshen.gitbook.io/front-end-blog/html/html-advanced#yuan-biao-qian)，title，style，link，script，base
* **body 区域的元素**：详见下面[HTML标签](https://sherwinshen.gitbook.io/front-end-blog/html/html-basic#biao-qian-yu-yi)

## HTML 标签

第一种分类：

* **文本级标签**：文本级标签里只能放**文字、图片、表单元素**，主要有 p、span、a、b、i、u、em 等。
* **容器级标签**：容器级标签里可以放置任何东西，主要有 div、h1、li、dt、dd 等。

第二种分类

* **块元素**：
* **行内元素**：

### 排版标签

基础标签

```markup
<!-- 标签标签 -->
<h1></h1>
<h2></h2>
<h3></h3>
<h4></h4>
<h5></h5>
<h6></h6>
<!-- 段落标签 -->
<p>This is a paragraph</p>
<!-- 水平线标签 -->
<hr />
<!-- 换行标签 -->
<br />
```

格式化标签

```markup
<!-- 定义计算机代码（表示计算机源代码，不保留多余的空格和折行） -->
<code></code>
<!-- 定义预格式文本（编辑器的格式就是显示的格式，保留多余的空格和折行） -->
<pre></pre>

<!-- 定义粗体文本 -->
<b></b>
<!-- 定义强调文字 -->
<em></em>
<!-- 定义斜体字 -->
<i></i>
<!-- 定义小号字 -->
<small></small>
<!-- 定义加重语气 -->
<strong></strong>
<!-- 定义下标字 -->
<sub></sub>
<!-- 定义上标字 -->
<sup></sup>
<!-- 定义插入字 -->
<ins></ins>
<!-- 定义删除线 -->
<del></del>
<!-- 定义下划线 -->
<u></u>

<!-- 定义短引用（显示带“”） -->
<q></q>
<!-- 定义首字母缩写（显示会缩进） -->
<blockquote></blockquote>
<!-- 定义缩写(例如WHO)  -->
<abbr></abbr>
<!-- 定义地址联系方式(显示为斜体)  -->
<address></address>
<!-- 定义著作标题 -->
 <cite></cite>
```

### 列表标签



### 表格标签



### 图片标签



### 框架标签



### 表单标签



### 多媒体标签



### 超链接



{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

