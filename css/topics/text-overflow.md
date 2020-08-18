# 文本溢出

主要涉及以下几个属性：text-overflow、white-space、word-wrap、word-break。

## 1. text-overflow

text-overflow用来设置文本溢出时的处理方式。

文本什么时候会发生溢出？

- 设置white-space:nowrap时
- 单个超长字符串

取值：

- clip：直接裁剪掉了
- ellipsis：以省略号...表示
- string：以自定义字符显示(不建议，存在兼容问题)

![](./img/pic11.png)

## 2. white-space

white-space设置如何处理元素内的空白。最常用的是nowrap，文本不会换行，文本会在在同一行上继续，直到遇到 `<br>` 标签为止。

## 3. word-wrap / word-break

word-wrap设置文本行为，当前行发生溢出时是否断开转行；word-break设置文本断字规则。

1）word-wrap取值

- normal：单词太长，换行显示，再超过一行就溢出显示
- break-word：当单词太长时，先尝试换行，换行后还是太长，单词内还可以换行。

![](./img/pic12.png)

2）word-break取值

- normal：单词太长，换行显示，再超过一行就溢出显示
- break-all：强行上，挤不下的话剩下的就换下一行显示
- keep-all：放不下我了，那我就另起一行展示，再放不下，我也不退缩。

![](./img/pic13.png)

## 4. 案例

### 4.1 单行文本省略号

```css
overflow:hidden; /* 超出限定的宽度就隐藏内容 */
text-overflow: ellipsis;
white-space: nowrap; /* 设置文字在一行显示不能换行 */
```

### 4.2 多行文本省略号

```css
/*多行文本溢出 - webkit内核浏览器*/
p {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-line-clamp:2; /* 表示最多显示2行 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
}

/*多行文本溢出 - 其他浏览器*/
p {
  overflow: hidden;
  position: relative;
  line-height: 1.5em;
  height: 3em; /*高度为需要显示的行数×行高*/
}
p:after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
}
```
