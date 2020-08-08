# BEM规范

简介：本文为CSS-BEM规范，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

> BEM由Block、Element、Modifier组成，为的是结束混乱的命名方式，达到一个语义化的CSS命名方式。

命名方法：

* block-name--modifier-name
* block-name\_\_element-name
* block-name\_\_element-name--modifier-name
* block-name\_\_element-name--modifier-name--modifier-name

## Block块

* 负责描述功能的，不应该包含状态（如 header、menu、button等）
* 不影响自身布局，不包含具体的样式（如不能为块设置margin或position）
* 只能使用class命名选择器，而不能使用标签或id选择器
* 不依赖于页面内其他块或元素

```markup
<div class="header">
    <div class="logo"></div>
    <div class="search"></div>
</div>
```

## Element元素

* 表示的是目的（如`.header__body、.header__logo、 .header__title`）
* 元素总是属于块的一部分，不能脱离Block父级单独使用
* 元素之间是可以嵌套的，但并不意味着可以出现`block-name__element-name__element-name`命名情况

```markup
<div class="weui-tabbar">
    <div class="weui-tabbar__item">
        <span>
            <img src=" " alt="" class="weui-tabbar__icon">
        </span>
        <p class="weui-tabbar__label"></p>
    </div>
</div>
```

## Modifier修饰符

* Modifier是Block或Element上的标记，使用它们来改变样式，行为或状态。
* 不能单独使用

```markup
<div class="weui-tabbar weui-tabbar--focused">
    <div class="weui-tabbar__item weui-tabbar__item--on">
    </div>
</div>
```

**scss写法**

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

如果发现本项目有错误，欢迎提交 issues 指正。

