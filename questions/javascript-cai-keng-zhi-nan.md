# JavaScript 踩坑指南

## 1. style 属性只能获取行内样式

通过 style 获取的属性都是**行内样式**，不能获取内嵌的样式和外链的样式。

```markup
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        div {
            border: 6px solid red;
        }
    </style>
</head>
<body>
    <div class="box1" style="width: 200px;height: 100px;background-color: pink;"></div>
    <script>
        const box1 = document.getElementsByTagName("div")[0];
        console.log(box1.style.backgroundColor); // pink
        console.log(box1.style.border);  //没有打印结果，因为这个属性不是行内样式
    </script>
</body> 
```

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

