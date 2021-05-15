# 本地存储

浏览器本地存储主要有以下几种方式：

* webStorage
  * localStorage
  * sessionStorage
* cookie
* IndexDB
* WebSQL（已废弃）
* ......

{% hint style="warning" %}
本文只关注 webStorage 和 cookie，其余内容详见 [MDN Web Docs - IndexDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
{% endhint %}

## 1. webStorage

* `sessionStorage`保存的数据用于浏览器的一次会话（session），当会话结束（通常是窗口关闭），数据被清空；
* `localStorage`保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。保存的数据以键值对的形式存在。

webStorage的处理

```javascript
window.sessionStorage.length //用于返回保存的数据项个数
window.sessionStorage.setItem('key', 'value');  // 用于存入数据
window.sessionStorage.storage.getItem('key'); // 用于读取数据
window.sessionStorage.removeItem('key'); // 用于清除某个键名对应的键值
window.sessionStorage.key(0); // 返回该位置对应的键值
window.sessionStorage.clear(); // 用于清除所有保存的数据
```

storage 接口储存的数据发生变化时，会触发 storage 事件，可以指定这个事件的监听函数

```javascript
window.addEventListener('storage', onStorageChange);
```

storage存储的是字符串，如果需要用到JSON格式就需要转换

```javascript
JSON.stringify(data); // 将对象转换成JSON格式的数据串
JSON.parse(data); // 将数据解析成对象并返回解析后的对象
```

## 2. cookie

服务器通过设置`set-cookie`这个响应头，将cookie信息返回给浏览器，浏览器将响应头中的cookie信息保存在本地，当下次向服务器发送HTTP请求时，浏览器会自动将保存的这些cookie信息添加到请求头中。通过cookie，服务器就会识别出浏览器，从而保证返回的数据是这个用户的。

#### cookie 功能

* 对话（session）管理：保存登录、购物车等需要记录的信息。
* 个性化信息：保存用户的偏好，比如网页的字体大小、背景色等等。
* 追踪用户：记录和分析用户行为。

#### cookie 属性

* name —— cookie 的名字
* value —— cookie 的值（真正的数据写在这里面）
* max-age —— 过期时间有多长；默认在浏览器关闭时失效
* expires —— 到哪个时间点过期
* secure —— 表示这个cookie只会在https的时候才会发送
* HttpOnly —— 设置后无法通过在js中使用document.cookie访问，保障安全，防止攻击者盗用用户cookie
* domain —— 表示该cookie对于哪个域是有效的（默认为当前域名）
* path —— 生效的路径（默认为当前网址）

#### 操作 cookie

* **读取cookie：**document.cookie，但可能存在多个cookies，因此需要分离，`const cookies = document.cookie.split(';');`
* **添加cookie：**`document.cookie = 'fontSize=14';`，以 key=value 的形式，并且注意这是添加 cookie，不是覆盖/修改 cookie。

#### HTTP Cookie 生成

服务器返回的响应头中的`Set-Cookie`字段包含cookie信息：

```text
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>; Max-Age=<non-zero-digit>; Domain=<domain-value>; Path=<path-value>; Secure; HttpOnly
```

{% hint style="info" %}
如果服务器想改变一个早先设置的 Cookie，必须同时满足四个条件：Cookie 的`key`、`domain`、`path`和`secure`都匹配。只要有一个属性不同，就会生成一个全新的 Cookie，而不是替换掉原来那个 Cookie。
{% endhint %}

{% hint style="success" %}
知识点：session

seesion是存放在服务器的一种用来存放用户数据的类似 HashTable 的结构。浏览器第一次发送请求时，服务器自动生成了 HashTable 和 SessionID 来唯一标识这个 hash 表，并将 sessionID 存放在 cookie 中通过响应发送到浏览器。浏览器第二次发送请求会将前一次服务器响应中的 sessionID 随着 cookie 发送到服务器上，服务器从请求中提取 sessionID，并和保存的所有 sessionID 进行对比，找到这个用户对应的 hash表。一般这个值是有时间限制的，超时后销毁，默认 30min。当用户在应用程序的 web 页面间挑转时，存储在 session 对象中的变量不会丢失而是在整个用户会话中一直存在下去。
{% endhint %}

## 3. 比较

### 3.1 cookie 与 storage 区别

* cookie 数据始终在同源 http 请求中携带（即使不需要），即 cookie 在浏览器和服务器间来回传递，而 sessionStorage 和 localStorage 不会自动把数据发送给服务器，仅本地保存。cookie 数据还有路径（path）概念，可以限制 cookie 只在某个路径下。
* 存储大小限制也不同，cookie数据不能超过4K，同时因为每次http请求都会携带cookie、所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M左右。
* 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭之前有效；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie：只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭。
* sessionStorage 不在不同的浏览器窗口中共享，即使是同一个页面；localstorage 在所有同源窗口中都是共享的；cookie 也是在所有同源窗口中都是共享的。

### 3.2 cookie 与 session 区别

* cookie存在客户端，session存在于服务端
* cookie在客户端中存放，容易伪造，不如session安全
* session会消耗大量服务器资源，cookie在每次HTTP请求中都会带上，影响网络性能

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

