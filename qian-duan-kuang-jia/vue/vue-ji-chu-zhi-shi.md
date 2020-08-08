# Vue基础知识

简介：本文为Vue基础知识笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 1、Vue实例

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

注：生命周期及钩子函数，详见[生命周期](https://github.com/MrEnvision/Front-end_learning_notes/tree/e271cf028afb432007c228479fafc70df6e880c6/前端框架/Vue/2.1_生命周期.md)专题

## 2、指令

> 指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

1、条件渲染

* v-if
* v-else-if
* v-else
* v-show

> 注意v-show只是单纯切换元素的 CSS 属性 `display`，带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。

2、列表渲染

* v-for

> a\)：一个参数为键值，v-for ="item in items"，两个参数对应键值和键名v-for ="\(value, key\) in items"，三个参数对应键值、键名和索引，v-for="\(value, key, index\) in items"
>
> b\)：列表渲染时最好绑定一个key属性，从而能够跟踪每个节点的身份，`<div v-for="item in items" v-bind:key="item.id">`

3、事件处理

* v-on

> a\)：`v-on:click='fun('参数', $event)'`，通过`$event`传入可以访问原生事件对象
>
> b\)：事件修饰符来处理事件，

4、表单绑定

* v-model

> a\)：`v-model`会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值：
>
> b\)：`v-model` 在内部为不同的输入元素使用不同的属性并抛出不同的事件，
>
> * text 和 textarea 元素使用 `value` 属性和 `input` 事件；
> * checkbox 和 radio 使用 `checked` 属性和 `change` 事件；
> * select 字段将 `value` 作为 prop 并将 `change` 作为事件。
>
> c\)：修饰符
>
> * .lazy - 使用 `change` 事件将输入框的值与数据进行同步
> * .number - 将用户的输入值转为数值类型
> * .trim - 过滤用户输入的首尾空白字符

5、数据绑定

* v-text
* v-html

6、其他

* v-bind
* v-model
* v-slot
* v-pre
* v-cloak
* v-once

## 3、Class绑定

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

```text
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

## 4、事件处理

事件处理符：具体参看[API](https://cn.vuejs.org/v2/api/#v-on)

* `.stop` - 调用 `event.stopPropagation()`。
* `.prevent` - 调用 `event.preventDefault()`。
* `.capture` - 添加事件侦听器时使用 capture 模式。
* `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
* `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
* `.native` - 监听组件根元素的原生事件。
* `.once` - 只触发一次回调。
* `.left` - 只当点击鼠标左键时触发。
* `.right` - 只当点击鼠标右键时触发。
* `.middle` - 只当点击鼠标中键时触发。
* `.passive` - 以 `{ passive: true }` 模式添加侦听器

## 5、数据监听

注意，Vue2.0不能检测一些数据的变动

* 利用索引直接设置一个数组项，`this.a[0]=2`

> 改进方法： `Vue.set(vm.items, indexOfItem, newValue)`或`vm.items.splice(indexOfItem, 1, newValue)`，即`vm.$set(vm.num,0,2)`或`vm.num.splice(0, 1, 2)`

* 对象属性的添加或删除，`this.obj.age = 27`

> 改进方法： `vm.$set(vm.obj, 'age', 27)`，多个属性添加`vm.obj = Object.assign({}, vm.obj, {age: 27, color: 'Green'})`

但是在Vue3.0中已经把Object.defineProperty\(\)监听数据变化换成了通过Proxy\(\)来监听数据变化，解决了上述问题。

如果发现本项目有错误，欢迎提交 issues 指正。

