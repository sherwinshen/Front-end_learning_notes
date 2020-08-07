# 性能优化

简介：本文为性能优化的一些措施，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 1、网络部分

* 减少HTTP请求数
  * 合并文件
  * 雪碧图
  * 小图Base64
* 减少DNS查找
  * 开启DNS预解析
* 使用CND静态资源服务器
* 避免重定向
* 杜绝404

## 2、内容部分

* 按需加载组件
* 预加载组件
* 减少DOM元素的数量
* 尽量少用iframe
* 使用工具进行CSS文件压缩 - YUI compressor, cssmin, ...
* 压缩JavaScript
* 图片相关
  * 选用合适的图片格式
  * 雪碧图中间少留空白
  * 不要用HTML缩放图片，要小图就去加载小图
  * 用小的可缓存的favicon.ico
  * 图片压缩 -无损/有损
  * 图片懒加载

## 3、CSS 部分

* 避免使用CSS表达式
* 选择`<link>`而不是`@import`
* 避免使用滤镜
* 把样式表放在顶部

## 4、JS部分

* 把脚本放在底部
* 去除重复脚本
* 减少DOM访问

## 5、缓存

* 配置ETags
* 添上Expires或者Cache-Control HTTP头

## 6、cookie

* 给cookie减肥
  * 清除不必要的cookie
  * cookie尽可能小
  * 设置好合适的域
  * 合适的有效期
* 把静态资源放在不含cookie的域下
  * 当浏览器发送对静态图像的请求时，cookie也会一起发送，而服务器根本不需要这些cookie。

## 7、移动端

* 保证所有组件都小于25K
* 把组件打包到一个复合文档里

## 8、服务器

* 开启Gzip等压缩
* 避免图片src属性为空（为空浏览器也会向服务器发送另一个请求）
* 对Ajax用GET请求
* 尽早清空缓冲区
* 使用CDN（内容分发网络）
* 服务端渲染

## 9、代码书写

* 代码规范
* 代码语义化
* 避免Hack
* 模块化
* 注释多写写

如果发现本项目有错误，欢迎提交 issues 指正。

