# CSSReset

简介：本文为CSSReset笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 概念

> 不同的浏览器对不同的标签都有自己内置的样式设置，这是全局性的样式，不同浏览器之间可能设置还不一样，并且内置的样式可能并不是我们想要的，我们就需要覆盖它，内置样式的存在对兼容性显示产生较大的影响。 CSSReset - 清除浏览器的默认样式

注意点：

* 项目开发初期就需要定好CSSReset，在后期更改就比较容易产生错误。
* 在html文件中`<link rel="stylesheet" href="reset.css">`引用的时候要将CSSReset文件放在第一位；若和其他CSS写在同一个文件中，则CSSReset的代码要写在最开头。

## 常用CSSReset

### 1、reset.css

升到了2.0版本，因为是HTML5时代了，样式包含了HTML5标签的重置默认样式。

官网地址：[https://meyerweb.com/eric/tools/css/reset/](https://meyerweb.com/eric/tools/css/reset/)

### 2、normalize.css

一种现代的，HTML5就绪的CSS重置替代方案。怎么说，意思就是比reset.css的方案优化了一些更好的样式。

相比于传统的CSS reset，Normalize.css是一种现代的、为HTML5准备的优质替代方案。Normalize.css现在已经被用于Twitter Bootstrap、HTML5 Boilerplate、GOV.UK、Rdio、CSS Tricks 以及许许多多其他框架、工具和网站上。

官网地址：[http://necolas.github.io/normalize.css/](http://necolas.github.io/normalize.css/)

> ⚠️注意：上述文件，请[点击链接](https://github.com/MrEnvision/Front-end_learning_notes/tree/e271cf028afb432007c228479fafc70df6e880c6/前端基础/CSS/专题笔记/CSSReset/README.md)查看

如果发现本项目有错误，欢迎提交 issues 指正。

