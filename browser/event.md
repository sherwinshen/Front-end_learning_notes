# 事件

事件就是文档或浏览器窗口中发生的一些特定的交互瞬间，其主要分为三步骤：

1. 获取事件源（DOM元素）
2. 绑定事件
3. 设置事件驱动程序（即触发事件的处理）

{% hint style="info" %}
获取事件源的方式：

* document.getElementById\(\);
* document.getElementsByTagName\(\);
* document.getElementsByClassName\(\);
* document.querySelector\(\); //返回与该模式匹配的第一个元素
* document.querySelectorAll\(\) //返回与该模式匹配的所有元素
{% endhint %}

## 1. 事件传播

一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。

* **第一阶段**：从`window`对象传导到目标节点（上层传到底层），称为“捕获阶段”。
* **第二阶段**：在目标节点上触发，称为“目标阶段”。
* **第三阶段**：从目标节点传导回`window`对象（从底层传回上层），称为“冒泡阶段”。

![](../.gitbook/assets/shi-jian-mo-xing-.png)

```text
// <div><p>点击</p></div>  - 分别为div和p添加捕获和冒泡阶段的函数，则点击的结果为：
// Tag: 'DIV'. EventPhase: 'capture'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'DIV'. EventPhase: 'bubble'
```

1. 捕获阶段：事件从`div`向`p`传播时，触发`div`的捕获`click`事件；
2. 目标阶段：事件从`div`到达`p`时，触发`p`的`click`冒泡事件；
3. 冒泡阶段：事件从`p`传回`div`时，先触发`p`的捕获`click`事件，再次触发`div`的冒泡`click`事件。

{% hint style="warning" %}
不是所有的事件都能冒泡，以下事件不冒泡：blur、focus、load、unload、onmouseenter、onmouseleave。意思是，事件不会往父元素那里传递。
{% endhint %}

**停止冒泡**

{% hint style="info" %}
addEventListener ****第三个函数表示监听函数是否在捕获阶段（capture）触发，默认 false，事件句柄在冒泡阶段执行，当设为 true 时，事件句柄在捕获阶段执行。
{% endhint %}

```javascript
// 事件传播到 p 元素后，就不再向下传播了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, true);
​
// 事件冒泡到 p 元素后，就不再向上冒泡了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, false);
```

```javascript
dom.onclick = function (event) {

    alert("child");

    // 阻止冒泡，IE10 以下则是 event.cancelBubble = true;
    event = event || window.event;

    if (event && event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
```

## 2. 事件模型

DOM0模型：`DOM对象.事件 = 函数`，一个元素的一个事件只能绑定一个响应函数，事件发生后不会传播，没有事件流概念`<input type="button" onclick="func1()" />`

```javascript
var btn = document.getElementsByTagName("button")[0];

//这种事件绑定的方式，如果绑定多个，则后面的会覆盖掉前面的
btn.onclick = function (e) {
    console.log("事件1");
}

btn.onclick = function (e) {
    console.log("事件2");
}
```

 IE事件模型：总共两个阶段事件处理阶段和事件冒泡阶段。绑定事件：attachEvent\(eventType, handler\)；解除事件：detachEvent\(eventType, handler\)。

```javascript
var btn = document.getElementsByTagName('button')[0];

btn.attachEvent('onclick', function(e) {
    console.log('事件1');
});

btn.attachEvent('onclick', function(e) {
    console.log('事件2');
});
```

DOM2模型\*：总共三个阶段事件捕获阶段、事件处理阶段和事件冒泡阶段。

* 绑定事件：ele.addEventListener\(eventType, handler, useCapture\)；
* 解除事件：ele.removeEventListener\(eventType, handler, useCapture\)；

```javascript
var btn = document.getElementsByTagName("button")[0];

btn.addEventListener("click", (e) => {});
btn.addEventListener("click", (e) => {});
```

## 3. 事件代理

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，通过判断事件发生元素DOM的类型，来做出不同的响应。这种方法叫做事件代理（delegation），也称事件委托。比较合适于动态元素的绑定。

```javascript
var ul = document.querySelector('ul');
​
ul.addEventListener('click', function (event) {
  // 也可以写成这样 if(e.target && e.target.nodeName.toLowerCase() == "li")
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
});
```

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

