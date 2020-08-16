# 事件

## 1. 事件操作

1）EventTarget.addEventListener() - 添加监听事件

```javascript
// target.addEventListener(type, listener[, useCapture]);
//  - type：事件名称，大小写敏感。
//  - listener：监听函数。事件发生时，会调用该监听函数。
//  - useCapture：布尔值，表示监听函数是否在捕获阶段（capture）触发，默认为false。
var el = document.getElementById('div1');
el.addEventListener('click', function () { console.log(‘hello’); }, false);
```

2）EventTarget.removeEventListener() - 移除监听事件

```javascript
// removeEventListener方法的参数，与addEventListener方法完全一致

// 第二个参数不一致，监听函数不是同一个匿名函数。 
div.addEventListener('click', function (e) {}, false);
div.removeEventListener('click', function (e) {}, false);
// 第三个参数不一致 
element.addEventListener('mousedown', handleMouseDown, true);
element.removeEventListener("mousedown", handleMouseDown, false);
```

3）EventTarget.dispatchEvent() - 触发事件

```javascript
// target.dispatchEvent(event)
// 该方法返回一个布尔值，只要有一个监听函数调用了Event.preventDefault()，则返回值为false，否则为true。
para.addEventListener('click', function () { console.log(‘hello’); }, false);
var event = new Event('click');
para.dispatchEvent(event);
```

## 2. 监听事件

1）HTML 的 on- 属性 - 不推荐，分离原则

HTML 语言允许在元素的属性中，直接定义某些事件的监听代码，`on+事件名`，注意，这些属性值是将会执行的代码，而不是一个函数名。

```javascript
<!-- 正确 -->
<body onload="doSomething()">
<div onclick="console.log('触发事件')">

<!-- 错误 -->
<body onload="doSomething">
```

2）元素节点的事件属性 - 不推荐，会覆盖

注意，这种方法与 HTML 的`on-`属性的差异是，它的值是函数名（`doSomething`），而不像后者，必须给出完整的监听代码。

```javascript
div.onclick = doSomething;
```

3）EventTarget.addEventListener() 

## 3. 事件传播

一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。

- **第一阶段**：从`window`对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
- **第二阶段**：在目标节点上触发，称为“目标阶段”（target phase）。
- **第三阶段**：从目标节点传导回`window`对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。

```javascript
// <div><p>点击</p></div>  - 分别为div和p添加捕获和冒泡阶段的函数，则点击的结果为：
// Tag: 'DIV'. EventPhase: 'capture'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'DIV'. EventPhase: 'bubble'
```

1. 捕获阶段：事件从`div`向`p`传播时，触发`div`的捕获`click`事件；
2. 目标阶段：事件从`div`到达`p`时，触发`p`的`click`冒泡事件；
3. 冒泡阶段：事件从`p`传回`div`时，先触发`p`的捕获`click`事件，再次触发`div`的冒泡`click`事件。

**停止冒泡**

```javascript
// addEventListener第三个函数表示监听函数是否在捕获阶段（capture）触发
// 事件传播到 p 元素后，就不再向下传播了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, true);

// 事件冒泡到 p 元素后，就不再向上冒泡了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, false);
```

## 4. 事件代理

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，通过判断事件发生元素DOM的类型，来做出不同的响应。这种方法叫做事件代理（delegation），也称事件委托。比较合适于动态元素的绑定。

```javascript
var ul = document.querySelector('ul');

ul.addEventListener('click', function (event) {
	// 也可以写成这样 if(e.target && e.target.nodeName.toLowerCase() == "li")
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
});
```

## 5. 事件模型

1）DOM0模型：事件发生后不会传播，没有事件流的概念` <input type="button" onclick="func1()" />`

2）IE事件模型：总共两个阶段事件处理阶段和事件冒泡阶段。绑定事件：attachEvent(eventType, handler)；解除事件：detachEvent(eventType, handler)

3）DOM2模型*：总共三个阶段事件捕获阶段、事件处理阶段和事件冒泡阶段。绑定事件：ele.addEventListener(eventType, handler, useCapture)；解除事件：ele.removeEventListener(eventType, handler, useCapture)；或者通过 on 绑定，例如 ele.onClick = () => {}