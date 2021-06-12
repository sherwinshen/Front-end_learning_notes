# 前端跨域

## 1. 同源概念

为了保证用户信息的安全，防止恶意的网站窃取数据产生了同源限制，同源是指三个相同，**协议相同+域名相同+端口相同**，尤其注意`http://www.example.com`和`http://example.com`为不同域名，还有域名和域名对应相同ip也是不同域的。

## 2. 同源限制范围

* 无法读取非同源网页的 Cookie、LocalStorage 和 IndexedDB。
* 无法接触非同源网页的 DOM。
* 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）

## 3. 跨域方法

{% hint style="info" %}
参考资料：[《前端常见跨域解决方案》](https://segmentfault.com/a/1190000011145364)[《解锁跨域的九种姿势》](https://github.com/LiChangyi/crossDomain)[《同源限制及解决》](https://wangdoc.com/javascript/bom/same-origin.html)
{% endhint %}

{% hint style="info" %}
项目地址：[「前端跨域」](https://github.com/MrEnvision/Front-end_learning_project/tree/master/cross-domain_solutions)
{% endhint %}

* 通过jsonp跨域——只能实现get一种请求
* 跨域资源共享（CORS）
* postMessage跨域——网页之间通信
* nginx代理跨域
* nodejs中间件代理跨域
* WebSocket协议跨域
* document.domain + iframe跨域——主域相同，子域不同场景
* location.hash + iframe
* window.name + iframe跨域

{% hint style="warning" %}
注意 CORS 的两种请求：简单请求和非简单请求\(预检请求\)，具体参考[《全面讲解 CORS》](https://juejin.cn/post/6856556746706518024#heading-4)。
{% endhint %}

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

