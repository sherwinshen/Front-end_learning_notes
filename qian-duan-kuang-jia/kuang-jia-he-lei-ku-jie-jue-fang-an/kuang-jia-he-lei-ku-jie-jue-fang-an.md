# 框架和类库解决方案

简介：本文提供框架和类库解决方案，由于技术迭代太快，仅供参考，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

主要包括七个方面：

* [DOM](kuang-jia-he-lei-ku-jie-jue-fang-an.md#DOM)
* [communication（通信）](kuang-jia-he-lei-ku-jie-jue-fang-an.md#communication通信)
* [Utility（工具库）](kuang-jia-he-lei-ku-jie-jue-fang-an.md#utility工具库)
* [Templating（模版技术）](kuang-jia-he-lei-ku-jie-jue-fang-an.md#Templating模版技术)
* [Component（组件）](kuang-jia-he-lei-ku-jie-jue-fang-an.md#Component组件)
* [Routing（路由）](kuang-jia-he-lei-ku-jie-jue-fang-an.md#Routing路由)
* [Architecture（架构）](kuang-jia-he-lei-ku-jie-jue-fang-an.md#Architecture架构)

## DOM

> Selector / Manipulation / Event / Animation ......

职责：

* 提供便利的Dom查询/操作/移动等操作
* 提供事件绑定/事件代理等支持
* 提供浏览器特性检测，UA侦测
* 提供节点属性、样式、类名等操作
* 上述操作实现目标平台的跨浏览器支持

框架：

* jQuery
* zepto.js
* mootools
* Hammer.js - 针对手势相关操作
* Velocity.js - 针对高级动画实现
* iscroll.js - 针对局部滚动实现
* video.js - 针对视频播放实现
* ......

## communication\(通信\)

> XmlHttpRequest / Form / JSONP / Socket ......

职责：

* 处理与服务器的请求与响应
* 预处理请求数据/响应数据 Error&Success的判断封装
* 多种类型请求，统一接口（XmlHttpRequest1/2,  JSONP, Iframe）
* 处理浏览器兼容器

框架：

* Reqwest
* qwest
* socket.io
* ......

## Utility\(工具库\)

> 函数增强&shim / Flow Control ......

职责：

* 提供JS原生不提供的功能
* 方法门面包装，使其更易于使用
* 异步队列/流程控制等

框架：

* shim - es5/es6
* Extension - underscore/Lodash
* ......

## Templating\(模版技术\)

> String-based / Dom-based / Living Template ......

框架：

* String-based 

![](../../.gitbook/assets/pic10%20%283%29.png)

* Dom-based

![](../../.gitbook/assets/pic11%20%283%29.png)

* Living Template

![](../../.gitbook/assets/pic12%20%283%29.png)

比较：

![](../../.gitbook/assets/pic13%20%283%29.png)

## Component\(组件\)

> Modal / Slider / DatePicker / Tabs / Editor ......

职责：

* 提供基础组建CSS支持
* 提供常用组件如Modal / Slider等
* 提供声明式的调用方式（Optional）

框架：

* Bootstrap
* Foundation
* ......

## Routing\(路由\)

> Client Side / Server Side / ......

职责：

* 监听url变化，并通知注册模块
* 通过JS进行主动跳转
* 历史管理对目标浏览器的兼容支持

框架：

* page.js
* Director.js
* statesman
* ......

## Architecture\(架构\)

> MVC / MVVM / MV\* / ......

职责：

* 提供一种范式帮助开发者进行模块解耦
* 视图与模型分离
* 更容易进行单元测试

![](../../.gitbook/assets/pic14%20%282%29.png)

参考网站：[http://todomvc.com](http://todomvc.com)

如果发现本项目有错误，欢迎提交 issues 指正。

