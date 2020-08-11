# Vuepress开发

## 1. 搭建项目

1、初始化项目：

```shell
$npm init
```

2、安装vuepress：

```shell
$npm i vuepress --save--dev
```

3、创建docs文件夹

4、配置package.json

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

5、docs文件夹下创建.vuepress/config.js

```js
module.expost = {
  // 配置内容
  title: 'xxxxxx文档',
	description: 'Just playing around',
  themeConfig: {
  }
}
```

6、如果需要更改默认主题，则可以释放默认主题相关文件至项目中，下面命令会使得docs/.vuepress下面增加theme文件夹，可以在改该目录下更改相关布局和样式

```shell
$vuepress eject docs
```

## 2. 自定义主题

{% hint style="info" %} 参考资料：[vuepress主题](https://www.vuepress.cn/theme/writing-a-theme.html) {% endhint %}

一个主题可以在以 `vuepress-theme-xxx` 的形式发布到 npm或github中，并通过以下方式使用：

```
module.exports = {
  theme: 'vuepress-theme-xxx'
}
```

主题项目目录，具体可以参考 - [vuepress-theme-koala](https://github.com/artiely/vuepress-theme-koala) [vuepress-theme-yubisaki](https://github.com/Yubisaki/vuepress-theme-yubisaki)

```
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

- `theme/global-components`: 该目录下的组件都会被自动注册为全局组件。
- `theme/components`: Vue 组件。
- `theme/layouts`: 布局组件，其中 `Layout.vue` 是必需的。
- `theme/styles`: 全局的样式和调色板。
- `theme/templates`: 修改默认的模板文件。
- `theme/index.js`: 主题文件的入口文件。
- `theme/enhanceApp.js`: 主题水平的客户端增强文件。

其中layout为布局组件，可以认为是以此为基础展开的。

✍️ npm如何发布？详见-[npm包发布]()