# 进阶知识

## 1. 浏览器兼容性问题

为了让CSS3样式兼容，需要将某些样式加上浏览器前缀：

* -ms- 兼容IE浏览器
* -moz- 兼容firefox
* -o- 兼容opera
* -webkit- 兼容chrome 和 safari

```css
div{ 
    -ms-transform: rotate(30deg); 
    -webkit-transform: rotate(30deg); 
    -o-transform: rotate(30deg); 
    -moz-transform: rotate(30deg); 
    transform: rotate(30deg);
}
```

{% hint style="info" %}
在实际开发中，我们可以借助[Autoprefixer](https://github.com/postcss/autoprefixer)插件来自动解析CSS文件并且添加浏览器前缀到CSS规则里。
{% endhint %}

### 2. SASS/SCSS

{% hint style="info" %}
详见[官方文档](https://sass-lang.com)
{% endhint %}

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

