# 布局方案

## 1. 居中布局

![](../../interview/img/居中布局.png)

## 2. 多列布局

### 2.1 两列自适应

#### 2.1.1 float + margin

```html
<!-- Html -->
<div class="parent">
    <div class="left-fix">left</div>
    <div class="right-auto">right</div>
</div>

<!-- CSS -->
<style>
    .left-fix {
        float: left;
        width: 100px;
    }

    .right-auto {
        margin-left: 100px;
    }
</style>
```

#### 2.1.2  float + overflow

```html
<!-- Html -->
<div class="parent">
    <div class="left-fix">left</div>
    <div class="right-auto">right</div>
</div>

<!-- CSS -->
<style>
    .left-fix {
        float: left;
        width: 100px;
    }

    .right-auto {
        overflow: hidden; /* 形成BFC */
    }
</style>
```

#### 2.1.3*  flex

```html
<!-- Html -->
<div class="parent">
    <div class="left-fix">left</div>
    <div class="right-auto">right</div>
</div>

<!-- CSS -->
<style>
    .parent{
        display: flex;
    }
    .left-fix {
        width: 100px;
    }

    .right-auto {
       flex: 1;
    }
</style>
```

### 2.2 等分布局

<img src="./img/pic1.png" style="zoom:50%;" />

#### 2.2.1 flex

```html
<!-- Html -->
<div class="parent">
    <div class="column"><p>1</p></div>
    <div class="column"><p>2</p></div>
    <div class="column"><p>3</p></div>
    <div class="column"><p>4</p></div>
</div>

<!-- CSS -->
<style>
    .parent {
        display: flex;
    }

    .column {
        flex: 1;
    }

    .column + .column {  /*下一兄弟节点选择器*/
        margin-left: 20px;
    }
</style>
```

#### 2.2.2 float

```html
<!-- Html -->
<div class="parent">
    <div class="column"><p>1</p></div>
    <div class="column"><p>2</p></div>
    <div class="column"><p>3</p></div>
    <div class="column"><p>4</p></div>
</div>

<!-- CSS -->
<style>
    .parent {
        display: flex;
        margin-left: -50px;
    }

    .column {
        float: left;
        width: 25%;
        margin-left: 50px;
    }
</style>
```

### 2.3 等高布局

等高指的是列等高，当一列高度增加时，旁边的列也都和其等高，即所有列的高度都等于最高的列。

<img src="./img/pic2.png" style="zoom:50%;" />

#### 2.3.1 负margin正padding

```html
<!-- Html -->
<div class="parent">
    <div class="column">left</div>
    <div class="column">right</div>
</div>
<!-- CSS -->
<style>
    .parent {
        overflow: hidden;
    }

    .column {
        margin-bottom: -9999px;
        padding-bottom: 9999px;
    }
</style>
```

#### 2.3.2 flex / table

本身默认值就满足等高要求，例如 flex 的 align-items 属性默认值 stretch 表示如果项目未设置高度或设为 auto，将占满整个容器的高度。

## 3. 全局布局

### 3.1 内容定宽+自适应

<img src="/Users/Sherwin/Desktop/Front-end_learning_notes-1 2/前端基础/CSS/专题笔记/img/pic3.png" height=350/>

#### 3.1.1 position

```html
<!-- Html -->
<div class="parent">
    <div class="top"></div>
    <div class="left"></div>
    <div class="right"></div>
    <div class="bottom"></div>
</div>
```

```css
/* CSS */
.top{ position: absolute; height: 100px; top: 0; left: 0; right: 0; }
.left{ position: absolute; width: 200px; top: 100px; left: 0; bottom: 50px; }
.right{ position: absolute; top: 100px; left: 200px; right: 0; bottom: 50px;}
.bottom{ position: absolute; height: 50px; left: 0; right: 0; bottom: 0; }
```

> 若right部分想加一个滚动条，则right再加一个right-inner的div，并为right-inner添加样式{min-height: 1000px;}和为right添加样式{overflow: auto;}即可完成需求。

#### 3.1.2 flex

```html
<!-- Html -->
<div class="parent">
    <div class="top"></div>
    <div class="middle">
        <div class="left"></div>
        <div class="right"></div>
    </div>
    <div class="bottom"></div>
</div>
```

```css
/* CSS */
.parent{display: flex;flex-direction: column;height: 100%;}
.top{height: 100px;}
.bottom{height: 50px;}
.middle{flex: 1}

.middle{display: flex; flex-direction: row;}
.left{width: 200px;}
.right{flex:1;}
```

### 3.2 内容自适应+自适应

<img src="/Users/Sherwin/Desktop/Front-end_learning_notes-1 2/前端基础/CSS/专题笔记/img/pic4.png" height=350/>

#### 3.2.1 flex

> flex布局根据内容自适应来填充，只需将3.1原本设置定宽定高的部分去掉即可

```html
<!-- Html -->
<div class="parent">
    <div class="top"></div>
    <div class="middle">
        <div class="left"></div>
        <div class="right"></div>
    </div>
    <div class="bottom"></div>
</div>
```

```css
/* CSS */
.parent{display: flex;flex-direction: column;height: 100%;}
/*.top{height: 100px;}*/
/*.bottom{height: 50px;}*/
.middle{flex: 1}

.middle{display: flex; flex-direction: row;}
/*.left{width: 200px;}*/
.right{flex:1;}
```

## 4* Flex布局

{% hint style="info" %}参考链接：[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool（语法篇）)  [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html) {% endhint %}

采用 Flex 布局`dispaly:flex;`的元素，称为 Flex 容器（flex container）；所有子元素自动成为容器成员，称为 Flex 项目（flex item）。水平的叫主轴（main axis），垂直的叫交叉轴（cross axis）。

### 4.1 容器的属性

- **flex-direction**：决定主轴的方向（即项目的排列方向），默认从左到右

- **flex-wrap**：决定一条轴线排不下如何换行，默认不换行

- flex-flow：flex-direction || flex-wrap；

- **justify-content**：定义了项目在主轴上的对齐方式(左/右对齐, 居中, 两端对齐,等间隔对齐)，默认左对齐


- **align-items**：定义项目在交叉轴上如何对齐。
- align-content：定义了多根交叉轴线的对齐方式。

### 4.2 项目的属性

- order：定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大（用于确定各部分的比例大小，例如属性都为1，则等分剩余空间）。
- flex-shrink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小（爷用于确定各部分的比例大小，例如属性都为1，则等比例缩小，特殊的是如果一个项目属性为0，其他项目都为1，则空间不足时，前者不缩小）。
- flex-basis：定义了在分配多余空间之前，项目占据的主轴空间（main size），默认值为`auto`，即项目的本来大小。
- flex：none | [ flex-grow flex-shrink || flex-basis]，
  - 默认值：0 1 auto
  - auto：1 1 auto 
  - none：0 0 auto
  - 1：1 1 0%
  - 2 3：2 3 0%
  - 0%：1 1 0%
  - 200px: 1 1 200px
  - 10 100px：10 1 100px
- align-self：允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。

>项目长度计算举例：容器宽度600px，项目1设置`width: 140px; flex: 2 1 0%;`，项目2设置`width: 100px; flex: 2 1 auto;`，项目3设置` flex: 1 1 200px;`。
>
>目前已占据宽度 0%+100px+200px=300px（注意项目1尽管设置了宽度140px，但flex-basis设置为0%，则不认为其占据了宽度），因此剩余300px。根据比例2:2:1分配300px，最终项目1-120px，项目2-220px，项目3-260px。

## 5. Grid布局

简单区别于Flex 布局，Flex是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。同样采用网格布局`dipaly:grid`的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）。划分网格的线，称为"网格线"（grid line）。正常情况下，`n`行有`n + 1`根水平网格线，`m`列有`m + 1`根垂直网格线，`n`行和`m`列会产生`n x m`个单元格。参考链接：[Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

### 5.1 容器的属性

第一组：

- grid-template-columns：定义每一列的列宽
- grid-template-rows：定义每一行的行高


```css
/*举例-column与row同理*/
grid-template-columns: 100px 100px 100px; /*三列每列100px*/
grid-template-columns: 33.3% 33.3% 33.3%; /*三列每列占33.3%*/
grid-template-columns: repeat(3, 33.3%); /*三列每列占33.3%*/
grid-template-columns: repeat(2, 100px 200px); /*4列左起100px 200px 100px 200px*/
grid-template-columns: repeat(auto-fill, 100px);/*每列100px自动填充直到容器不能放置更多的列*/
grid-template-columns: 1fr 2fr;/*两列1:2均分*/
grid-template-columns: 150px 1fr 2fr;/*三列第一列150px剩余1:2均分*/
grid-template-columns: 100px auto 100px; /*auto浏览器自己决定长度*/
grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];/*设置网格线名字以引用*/
```

-  grid-template-areas：定义网格区域

```css
/*举例*/
/*指定了9个单元格*/
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}
/*指定了4个单元格，适用于单元格合并的需求*/
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: "header header header"
                       "main main sidebar"
                       "footer footer footer";
}
```

- grid-template：grid-template-columns、grid-template-rows和grid-template-areas（不建议合并写法）

第二组：

- grid-row-gap：设置行与行的间隔（行间距）
- grid-column-gap：设置列与列的间隔（列间距）
- grid-gap：grid-row-gap与grid-column-gap;

第三组：

- grid-auto-flow：元素排列顺序，默认先行后列（具体说明见下）

第四组：

- justify-items：设置单元格内容的水平位置（左中右）
- align-items：设置单元格内容的垂直位置（上中下）
- place-items: align-items || justify-items;

第五组：

- justify-content：整个内容区域在容器里面的水平位置（左中右）
- align-content：整个内容区域在容器里面的垂直位置（上中下）
- place-content: align-content || justify-content;

### 5.2 项目的属性

第一组：通过组合可以设置一个单位格的位置，实现合并单元格的需求，设置值可以为数字可以为容器属性中定义的命名

- grid-column-start：左边框所在的垂直网格线
- grid-column-end：右边框所在的垂直网格线
- grid-row-start：上边框所在的水平网格线
- grid-row-end：下边框所在的水平网格线

- grid-area：指定项目放在哪一个区域

``` css
/*举例*/
/*放置于e区域，结合容器属性grid-template-areas的定义*/
.item-1 {
  grid-area: e;
}
/*通过网格线定义grid-area: <row-start> / <column-start> / <row-end> / <column-end>;*/
.item-1 {
  grid-area: 1 / 1 / 3 / 3;
}
```

第二组：

- justify-self：设置单元格内容的水平位置（左中右）

- align-self：设置单元格内容的垂直位置（上中下）

- place-self：align-self || justify-self;


> 注意，设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

## 6. Table布局

- display:table - 作为块级表格来显示，表格前后带有换行符
- display:inline-table - 作为内联表格来显示，表格前后没有换行符

- display:table-row - 此元素会作为一个表格行显示（类似 <tr>）
- display:table-row-group - 元素会作为一个或多个行的分组来显示（类似 <tbody>）
- display:table-column - 此元素会作为一个单元格列显示（类似 <col>）
- display:table-column-group - 此元素会作为一个或多个列的分组来显示（类似 <colgroup>）

- display:table-header-group - 此元素会作为一个或多个行的分组来显示（类似 <thead>）
- display:table-footer-group - 此元素会作为一个或多个行的分组来显示（类似 <tfoot>）
- display:table-caption - 此元素会作为一个表格标题显示（类似 <caption>）

- display:table-cell - 此元素会作为一个表格单元格显示（类似 <td> 和 <th>）

