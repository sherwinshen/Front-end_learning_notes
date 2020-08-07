# Vuepress开发

简介：本文为Vuepress开发相关总结，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 搭建项目

1、初始化项目：

```text
$npm init
```

2、安装vuepress：

```text
$npm i vuepress --save--dev
```

3、创建docs文件夹

4、配置package.json

```javascript
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

5、docs文件夹下创建.vuepress/config.js

```javascript
module.expost = {
  // 配置内容
  title: 'xxxxxx文档',
    description: 'Just playing around',
  themeConfig: {
  }
}
```

6、如果需要更改默认主题，则可以释放默认主题相关文件至项目中，下面命令会使得docs/.vuepress下面增加theme文件夹，可以在改该目录下更改相关布局和样式

```text
$vuepress eject docs
```

## 自定义主题

> 参考资料：[vuepress主题](https://www.vuepress.cn/theme/writing-a-theme.html)

一个主题可以在以 `vuepress-theme-xxx` 的形式发布到 npm或github中，并通过以下方式使用：

```text
module.exports = {
  theme: 'vuepress-theme-xxx'
}
```

主题项目目录，具体可以参考 - [vuepress-theme-koala](https://github.com/artiely/vuepress-theme-koala) [vuepress-theme-yubisaki](https://github.com/Yubisaki/vuepress-theme-yubisaki)：

```text
theme
├── global-components
│   └── xxx.vue
├── components
│   └── xxx.vue
├── layouts
│   ├── Layout.vue (必要的)
│   └── 404.vue
├── styles
│   ├── index.styl
│   └── palette.styl
├── templates
│   ├── dev.html
│   └── ssr.html
├── index.js
├── enhanceApp.js
└── package.json
```

* `theme/global-components`: 该目录下的组件都会被自动注册为全局组件。
* `theme/components`: Vue 组件。
* `theme/layouts`: 布局组件，其中 `Layout.vue` 是必需的。
* `theme/styles`: 全局的样式和调色板。
* `theme/templates`: 修改默认的模板文件。
* `theme/index.js`: 主题文件的入口文件。
* `theme/enhanceApp.js`: 主题水平的客户端增强文件。

其中layout为布局组件，可以认为是以此为基础展开的。

如何发布npm包，详见参考资料：[《npm发布包教程（一）：从npm说起》](https://segmentfault.com/a/1190000017461666) [《npm发布包教程（二）：发布包》](https://segmentfault.com/a/1190000017463371) [《npm发布包教程（三）：安装发布包》](https://segmentfault.com/a/1190000017472970) [《npm发布包教程（四）：迭代》](https://segmentfault.com/a/1190000017477077) [《npm发布包教程（五）：废弃/删除》](https://segmentfault.com/a/1190000017479985)

或者可以直接通过github项目安装：`npm i git+https://github.com/MrEnvision/XXX.git`，建议github项目使用tag来进行版本号管理，安装的时候加上版本号`npm i git+https://github.com/MrEnvision/XXX.git#版本号`

如果发现本项目有错误，欢迎提交 issues 指正。

