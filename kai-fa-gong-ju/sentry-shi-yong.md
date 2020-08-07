# 前端错误监控Sentry

参考资料：1. [vue+sentry 前端异常日志监控](https://www.cnblogs.com/qiezuimh/p/11440506.html)

## 1、安装依赖

Vue安装：

```text
npm i @sentry/browser
npm i @sentry/integrations
```

React安装：

```text
npm i @sentry/react
```

## 2、申请权限

Sentry中配置项目基本信息后，可以得到如下地址明确项目错误信息的上报地址：

```text
https://<key>@report.url.cn/sentry/<project>
```

## 3、项目接入sentry

Vue接入：

```javascript
// /src/index.js
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
const RELEASE_VERSION = require('../package.json').version
Sentry.init({
    dsn: "", // 步骤2所得到的地址
    integrations: [
        new Integrations.Vue({
            Vue,
            attachProps: true,
        }),
        new Integrations.RewriteFrames(),
    ],
    release: RELEASE_VERSION, // 版本号
});
```

React接入：

```javascript
// /src/index.js
import * as Sentry from '@sentry/react';
const RELEASE_VERSION = require('../package.json').version
Sentry.init({
    dsn: "", // 步骤2所得到的地址
    release: RELEASE_VERSION, // 版本号
});
```

## 4、上传sourcemap

### 4.1 安装依赖

```text
npm i @sentry/webpack-plugin -D
```

### 4.2 配置.sentryclirc文件

根目录下创建.sentryclirc文件：

```text
[auth]
token=XXX // sentry中个人的token令牌

[defaults]
org=组织名称
project=projectName
url=http://sentry.oa.com/
```

### 4.3 配置webpack - vue2.0 + react

```javascript
// webpack.prod.conf，参数解释详见参考资料
const SentryCliPlugin = require("@sentry/webpack-plugin");
const RELEASE_VERSION = require('../package.json').version
plugins:[
    new SentryCliPlugin({
          include: "./dist",
          release: RELEASE_VERSION,
          configFile: "sentry.properties",
          ignore: ['node_modules', 'webpack.config.js'],
          urlPrefix : "~/", // 正式环境的js的代码路径前缀
    })
]
```

### 4.4 配置webpack - vue3.0

```javascript
// vue.config.js
const SentryPlugin = require("@sentry/webpack-plugin");
const RELEASE_VERSION = require('../package.json').version
module.exports = {
  productionSourceMap: true,
  chainWebpack: config => {
    config.plugin("sentry").use(SentryPlugin, [
      {
        ignore: ["node_modules"],
        include: "./dist", // 上传dist文件的js
        configFile: "./.sentryclirc", // 配置文件地址
        release: RELEASE_VERSION, // 版本号
        urlPrefix: "~/", // 正式环境的js的代码路径前缀
      },
    ]);
  },
  // ...
}
```

注意，`@sentry/webpack-plugin`在上传后不会删除sourceMap, 修改一下`npm run build`命令,：

```javascript
"scripts": {
    "build": "vue-cli-service build && rm -fr dist/js/*.map"
}
```

### 4.5 其他

webpack-sentry-plugin 可以在上传后删除打包后的sourcemap，可以节省后面上传打包后文件的过滤sourcemap的操作。

```text
npm install webpack-sentry-plugin --save-dev
```

根目录创建 sentry.config.js

```javascript
module.exports = {
  organization: '',
  project: '',
  apiKey: '',
};
```

webpack配置：

```javascript
const SentryPlugin = require('webpack-sentry-plugin')
const RELEASE_VERSION = require('../package.json').version
plugins: [
  // ...
  new SentryPlugin(Object.assign({
      release: RELEASE_VERSION,
      deleteAfterCompile: true,
      // exclude: /(\.css\.map| \.css | \.html)$/,
      include: /(\.js\.map | \.js)$/, // 只上传js和map文件
      filenameTransform: function (filename) {
        return '~/' + filename
      },
    }, require('../sentry.config.js')))
]
```

如果发现本项目有错误，欢迎提交 issues 指正。

