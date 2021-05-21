# 静态网站框架 VuePress

## 1. 搭建项目

* 初始化项目：

```text
$npm init
```

* 安装 vuepress：

```text
$npm i vuepress --save--dev
```

* 创建docs文件夹
* 配置package.json

```text
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

* docs文件夹下创建.vuepress/config.js

```text
module.expost = {
  // 配置内容
  title: 'xxxxxx文档',
  description: 'Just playing around',
  themeConfig: {
  }
}
```

* 如果需要更改默认主题，则可以释放默认主题相关文件至项目中，下面命令会使得docs/.vuepress下面增加theme文件夹，可以在改该目录下更改相关布局和样式

```text
$vuepress eject docs
```

## 2. 自定义主题

{% hint style="info" %}
 参考资料：[Vuepress 主题](https://www.vuepress.cn/theme/writing-a-theme.html)
{% endhint %}

一个主题可以在以 `vuepress-theme-xxx` 的形式发布到 npm 或 github 中，并通过以下方式使用：

```javascript
module.exports = {
  theme: 'vuepress-theme-xxx'
}
```

主题项目目录，具体可以参考 - [vuepress-theme-koala](https://github.com/artiely/vuepress-theme-koala) [vuepress-theme-yubisaki](https://github.com/Yubisaki/vuepress-theme-yubisaki)

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

{% hint style="info" %}
npm如何发布？详见[包管理工具-NPM](../npm.md)
{% endhint %}

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

