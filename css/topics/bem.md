# BEM 规范

BEM由Block、Element、Modifier组成，为的是结束混乱的命名方式，达到一个语义化的CSS命名方式，其命名方法：

- block-name--modifier-name
- block-name__element-name
- block-name__element-name--modifier-name
- block-name__element-name--modifier-name--modifier-name

scss 写法举例：

```scss
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

## 1. Block 块

- 负责描述功能的，不应该包含状态（如 header、menu、button等）
- 不影响自身布局，不包含具体的样式（如不能为块设置margin或position）
- 只能使用class命名选择器，而不能使用标签或id选择器
- 不依赖于页面内其他块或元素

```html
<div class="header">
    <div class="logo"></div>
    <div class="search"></div>
</div>
```

## 2. Element 元素

- 表示的是目的（如.header\_\_body、.header\_\_logo、 .header\_\_title）
- 元素总是属于块的一部分，不能脱离 Block 父级单独使用
- 元素之间是可以嵌套的，但并不意味着可以出现 block-name\_\_element-name\_\_element-name 命名情况

```html
<div class="header">
    <div class="header__item">
        <span>
            <img src=" " alt="" class="header__icon">
        </span>
        <p class="header__label"></p>
    </div>
</div>
```

## 3. Modifier修饰符

- Modifier是Block或Element上的标记，使用它们来改变样式，行为或状态。
- 不能单独使用

```html
<div class="weui-tabbar weui-tabbar--focused">
    <div class="weui-tabbar__item weui-tabbar__item--on">
    </div>
</div>
```

