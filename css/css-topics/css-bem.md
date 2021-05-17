# CSS BEM 规范

{% hint style="info" %}
参考链接：[GetBEM](http://getbem.com)  [CSS BEM 书写规范 ](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)
{% endhint %}

## 1. 什么时候用 BEM 格式?

在具体应用中并不是每个地方都应该使用 BEM 命名方式。当需要明确关联性的模块关系时，应当使用 BEM 格式，比如只是一条公共的单独的样式，就没有使用 BEM 格式的意义：

```css
.hide {
    display: none !important;
}
```

此外，因为某些东西确实是位于一个块的内部，但这并不意味它就是BEM中所说的元素，BEM最难的部分之一是明确作用域是从哪开始和到哪结束的，以及什么时候使用（不使用）它。

## 2. 命名模式

BEM由Block、Element、Modifier组成，为的是结束混乱的命名方式，达到一个语义化的CSS命名方式，其命名方法：

* block-name--modifier-name
* block-name\_\_element-name
* block-name\_\_element-name--modifier-name
* block-name\_\_element-name--modifier-name--modifier-name

scss 写法举例：

```css
.header {
  &__body {
    padding: 20px;
  }
  &__button {
    &--primary {
      background: #329FD9;
    }
    &--default {
      background: none;
    }
  }
}
```

### 2.1 Block 块

* 负责描述功能的，不应该包含状态（如 header、menu、button等）
* 不影响自身布局，不包含具体的样式（如不能为块设置 margin 或 position）
* 只能使用class命名选择器，而不能使用标签或id选择器
* 不依赖于页面内其他块或元素

```markup
<div class="header">
    <div class="logo"></div>
    <div class="search"></div>
</div>
```

### 2.2 Element 元素

* 表示的是目的（如.header\_\_body、.header\_\_logo、 .header\_\_title）
* 元素总是属于块的一部分，不能脱离 Block 父级单独使用
* 元素之间是可以嵌套的，但并不意味着可以出现 block-name\_\_element-name\_\_element-name 命名情况

```markup
<div class="header">
    <div class="header__item">
        <span>
            <img src=" " alt="" class="header__icon">
        </span>
        <p class="header__label"></p>
    </div>
</div>
```

### 2.3 Modifier修饰符

* Modifier是Block或Element上的标记，使用它们来改变样式，行为或状态。
* 不能单独使用

```markup
<div class="weui-tabbar weui-tabbar--focused">
    <div class="weui-tabbar__item weui-tabbar__item--on"></div>
</div>
```

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

