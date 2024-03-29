# 响应式方案

一个常用的针对移动网页优化过的页面的 viewport meta 标签大致如下：

```markup
<meta 
    name="viewport" 
    content="width=device-width", // viewport的宽度设置成设备宽度
    inintial-scale=1.0, // 初始缩放为1.0
    user-scalable=no // 防止用户手动缩放
>
```

* width：控制 viewport 的大小，可以指定的一个值，如 600，或者特殊的值。
* height：和 width 相对应，指定高度。
* initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
* maximum-scale：允许用户缩放到的最大比例。
* minimum-scale：允许用户缩放到的最小比例。
* user-scalable：用户是否可以手动缩放。

## 1. 媒体查询 @media

缺点：在浏览器大小改变时，需要改变的样式太多，多套样式太繁琐。

```css
/* 以下代码分别给分辨率在0～320px，320px～550px，550px～768px以及768px～960px的屏幕设置样式 */
@media screen and (max-width: 960px){ }

@media screen and (max-width: 768px){ }

@media screen and (max-width: 550px){ }

@media screen and (max-width: 320px){ }
```

## 2. 百分比

{% hint style="info" %}
关键在于百分比（%）相对于谁而言
{% endhint %}

a）height 和 width 的百分比

* 直接相对于父元素而言，width 相对于父元素的 width，height 相对于父元素的 height

b）top、bottom 、left和right的百分比

* top 和 bottom 相对于直接非 static 定位\(默认定位\)的父元素的高度
* left 和 right 相对于直接非 static 定位\(默认定位\)父元素的宽度

c）padding 和 margin 的百分比

* 不论是垂直方向或者水平方向都相对于直接父亲元素的 width，而与父元素的 height 无关

d）border-radius 的百分比

* 相对于自身的宽度 width

e）......

## 3. rem / em

rem 是以**浏览器的根元素（HTML元素）的 font-size** 为基准，默认情况下，html 元素的 font-size 为 16px，为了方便通常设置 html{ font-size: 62.5% }，使得 1rem = 10px。em 是以**父元素的 font-size** 为基准。通过rem来实现响应式的布局，只需要根据视图容器的大小，通过JS动态的改变font-size即可，注意必须将改变font-size的代码放在css样式之前。

```javascript
function refreshRem() {
    var docEl = doc.documentElement;
    var width = docEl.getBoundingClientRect().width;
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
}
win.addEventListener('resize', refreshRem);
```

在实际开发中，通常在 css 中还是用 px 来表示元素的大小，最后编写完 css 代码之后，将 css 文件中的所有 px 单位，转化成 rem 单位，以下为两种方法：

应用 [**px2rem-loader** ](https://github.com/Jinjiang/px2rem-loader)，在 webpack 的配置文件中：

```javascript
module.exports = {
    // ...
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'px2rem-loader',
                // options here
                options: {
                    remUni: 75,
                    remPrecision: 8
                }
            }]
        }]
    }
}
```

应用  [**postcss-loader**](https://github.com/webpack-contrib/postcss-loader)，在 webpack 的配置文件中：

```javascript
const px2rem = require('postcss-px2rem');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    postcss: function () {
        return [px2rem({remUnit: 75})];
    }
}
```

## 4. vw / vh

CSS3 中引入了一个新的单位 vw/vh，与视图窗口有关，vw 表示相对于视图窗口的宽度，vh 表示相对于视图窗口高度，比较类似于百分比，只是这里是以视图窗口为基准。

| 单位 | 含义 |
| :--- | :--- |
| vw | 相对于视窗的宽度，视窗宽度是100vw |
| vh | 相对于视窗的高度，视窗高度是100vh |
| vmin | vw和vh中的较小值 |
| vmax | vw和vh中的较大值 |

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

