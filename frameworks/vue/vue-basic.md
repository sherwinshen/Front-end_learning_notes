# Vue 基础知识

## 1. Vue 实例

```javascript
let vm = new Vue({
  // 实例的数据 - 这里的数据改变时，视图会进行重渲染
  data: {},
  // 实例的方法
  method: {},
  // 计算属性
  computed: {},
  // 监听属性
  watch: {},
  // 生命周期钩子函数，如create
  created: function(){}
})
```

✍️ 这是 vue2.0 的语法

## 2. 指令

> 指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

1、条件渲染

- v-if
- v-else-if
- v-else
- v-show

✍️ v-show只是单纯切换元素的 CSS 属性 display，带有 v-show 的元素始终会被渲染并保留在 DOM 中，而 v-if 则决定了元素是否在 Dom树中。

2、列表渲染

- v-for

✍️ 列表渲染时最好绑定一个key属性，从而能够跟踪每个节点的身份，`<div v-for="item in items" v-bind:key="item.id">`

3、事件处理

- v-on

✍️ `v-on:click='fun('参数', $event)'`，通过`$event`传入可以访问原生事件对象

4、表单绑定

- v-model

5、数据绑定

- v-text
- v-html

6、其他

- v-bind
- v-model
- v-slot
- v-pre
- v-cloak
- v-once

## 3. Class 绑定

```javascript
// vue的data数据如下
data: {
  isActive: true,
  hasError: false,
	activeClass: 'active',
	errorClass: 'error',
 	classObject: {
    active: true,
    error: false
  }
}
```

```vue
<!-- class绑定 -->
<div v-bind:class="{ active: isActive }"></div>
<div class="active"></div>

<div v-bind:class="classObject"></div>
<div class="active"></div>

<div v-bind:class="[activeClass, errorClass]"></div>
<div class="active error"></div>

<div v-bind:class="[errorClass, { active: isActive }]"></div>
<div class="active error"></div>
```

## 4. 数据监听

Vue2.0不能检测一些数组/对象的数据变动，因此需要特殊处理，但是在 Vue3.0 中已经把 Object.defineProperty() 监听数据变化换成了通过 Proxy() 来监听数据变化，解决了上述问题。

✍️ 数组直接修改值可以利用 this.$set() 或 this.targetItems.splice

> this.a[0] = 2  ——>  this.$set(this.a, 0, 2) 或 this.a.splice(0, 1, 2)

✍️对象属性的添加或删除可以利用 this.$set()，多个属性可以使用Object.assign

> this.a.age = 2  ——>  this.$set(this.a, 'age', 2)
>
> this.a.age = 2; this.a.name = 'tom'   ——> this.a = Object.assign({} , this.a, { age: 2, name: 'tom' })

## 5. 生命周期

<img src="./img/pic1.png" alt=" " style="zoom:50%;" />

- beforeCreate：在data初始化、event配置前调用
- created：data对象及其事件完全初始化，但是dom树未挂载
- beforeMount：在挂载dom树之前调用，即更改已完成，但尚未准备好更新dom
- mounted：挂载已完成，dom树被渲染到页面，可进行dom操作
- beforeUpdate：数据有更新时调用
- update：虚拟dom重新渲染补丁以最小开支渲染dom
- beforeDestory：实例销毁之前调用
- destory：组建销毁之后调用

✍️ 获得data和method最早在cteated；操作dom节点最早在mounted；

## 6. 其他

### 6.1 V-if和v-for避免同时使用

在使用下面模版时，`v-for` 比 `v-if` 具有更高的优先级，v-for会先遍历再判断是否显示，因此哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，这会一定程度影响效率。

```vue
<ul>
  <li v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

**解决方法**

1、通过计算属性先筛选一遍list

```vue
<ul>
  <li v-for="user in activeUsers" :key="user.id">
    {{ user.name }}
  </li>
</ul>

<script>
export default {
    computed: {
        activeUsers: function () {
            return this.users.filter(function (user) {
                return user.isActive
            })
        }
    }
}
</script>
```

2、`v-if` 移动至容器元素上 (比如 `ul`, `ol`)

```vuee
<ul v-if="shouldShowUsers">
  <li v-for="user in users" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

✍️ 如果没有外层元素，我们可以添加`<template v-if=''></template>` 包裹住对应的 v-for。