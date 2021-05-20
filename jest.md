# 单元测试工具-Jest

{% hint style="info" %}
参考资料：

* [Vue 应用单元测试的策略与实践 01 - 前言和目标](https://blog.jimmylv.info/2018-09-19-vue-application-unit-test-strategy-and-practice-01-introduction/)
* [Vue 应用单元测试的策略与实践 02 - 单元测试基础](https://blog.jimmylv.info/2018-10-29-vue-application-unit-test-strategy-and-practice-02-how-jest-work/)
* [Vue 应用单元测试的策略与实践 03 - Vue 组件单元测试](https://blog.jimmylv.info/2018-10-30-vue-application-unit-test-strategy-and-practice-03-testing-vue-components/)
* [Vue 应用单元测试的策略与实践 04 - Vuex 单元测试](https://blog.jimmylv.info/2018-11-02-vue-application-unit-test-strategy-and-practice-04-testing-vuex/)
* [Vue 应用单元测试的策略与实践 05 - 测试奖杯策略](https://blog.jimmylv.info/2019-05-08-vue-application-unit-test-strategy-and-practice-05-testing-trophy/)
* [Vue 应用单元测试的策略与实践 06 - 如何落地的几点建议](https://blog.jimmylv.info/2019-07-16-vue-application-unit-test-strategy-and-practice-06-execution-suggestion/)
* [vue单元测试第一篇：单元测试介绍和基本使用](https://juejin.cn/post/6844904012827852814)
* [vue单元测试第二篇：jest 断言库的使用](https://juejin.cn/post/6844904013289242638)
* [Jest 结合 ue-test-utils 使用的初步实践](https://blog.csdn.net/duola8789/article/details/80434962)
{% endhint %}

## 1. 测试框架

| 框架 | 断言 | 异步 | Mock | 代码覆盖率 |
| :--- | :--- | :--- | :--- | :--- |
| Jest | 默认支持 | 友好 | 默认支持 | 支持 |
| Mocha | 不支持（Chai） | 友好 | 不支持（Sinon） | 不支持（Istanbul） |
| Ava | 默认支持 | 友好 | 不支持（Sinon\) | 不支持（Istanbul\) |

{% hint style="warning" %}
Chai为断言库；Sinon是具有spies, stub, mock功能的库； Istanbul是JavaScript程序的代码覆盖率工具。
{% endhint %}

## 2. Jest + Vue Test Utils

### 2.1 基础说明

如果使用的是 VUE CIL 的话，在创建项目时就选择 Jest 即可，或者后续添加配置即可，输入以下命令，会自动安装：

```text
$vue add @vue/unit-jest
```

**基本思路**

* Step1: 挂载组件 —— 通过 `mount/shallowMount` 方法来创建包裹器
* Step2: 模拟必要的输入 \(prop、注入和用户事件\)
* Step3: 对输出 \(渲染结果、触发的自定义事件\) 的断言来完成测试

**测试描述**

* Given \(如果\) \_ 指定的状态，通常是给出的条件（测试数据）；
* When \(当\) \_ 触发一个动作或者事件；
* Then \(则\) \_ 对期望结果的验证；

{% hint style="info" %}
举例：

* it\('Given a = 1 And b = 2，When execute add\(\)，Then result is 3', \(\) =&gt; {}\);
* it\('When 访问登录页面，Then 看到用户名、密码输入框和提交按钮', \(\) =&gt; {}\)
{% endhint %}

### 2.2 Mock 依赖

**Mock -** 用于替代整个模块

```javascript
import SoundPlayer from './sound-player'
​
const mockPlaySoundFile = jest.fn()
​
jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return { playSoundFile: mockPlaySoundFile }
  })
})
```

`jest.mock()` 完全接管整个 `./sound-player` JavaScript 模块，比如说这里的 `playSoundFile` 本来应该是从 `./sound-player` 这个文件当中 `export` 出来的，而被 Mock 之后我们的测试就可以使用 Mock 所返回的数据或方法。注意，该模板的所有功能都已经被 Mock 掉，模块中其他功能也被mock了如果需要使用也需要重新实现。

**Stub -** 用于模拟特定行为

```javascript
const mockFn = jest.fn()
mockFn()
expect(mockFn).toHaveBeenCalled()
​
// With a mock implementation:
const returnsTrue = jest.fn(() => true)
console.log(returnsTrue()) // true;
```

`jest.fn()` 代表着我就是一个 Stub（桩），可以是特定行为也可以是没有行为。没有行为常用于验证 Stub 被调用过，也就能够断言某处代码被执行，从而确定代码被测试所覆盖。特定行为就是返回特定的数据， Stub 也可以根据输入模拟返回一种输出。

**Spy -** 用于监听模块行为

```javascript
const video = require('./video')
​
it('plays video', () => {
  const spy = jest.spyOn(video, 'play')
  const isPlaying = video.play()
​
  expect(spy).toHaveBeenCalled()
  expect(isPlaying).toBe(true)
})
```

Spy 并不会影响到原有模块的功能代码，而只是充当一个监护人的作用。比如说上文中的 `video` 模块中的 `play()` 方法已经被 `spy` 过，那么之后 `play()` 方法只要被调用过，我们就能判断其是否执行，甚至执行的次数。

### 2.3 异步测试

第一种：Vue 会异步的将未生效的 DOM 批量更新，避免因数据反复变化而导致不必要的渲染。因此在更新会引发 DOM 变化的属性后必须使用 `Vue.nextTick（）` （异步函数）来等待 Vue 完成 DOM 更新。

```javascript
it('button click should increment the count text', async () => {
  expect(wrapper.text()).toContain('0')
  const button = wrapper.find('button')
  button.trigger('click')
  await Vue.nextTick()
  expect(wrapper.text()).toContain('1')
})
```

第二种：在 Vuex 中进行 API 调用。

举例：按钮会处理一个异步函数

```markup
<template>
  <button @click="fetchResults" />
</template>
​
<script>
  import axios from 'axios'
​
  export default {
    data() {
      return {
        value: null
      }
    },
​
    methods: {
      async fetchResults() {
        const response = await axios.get('mock/service')
        this.value = response.data
      }
    }
  }
</script>
```

```javascript
// 将 done(通知测试完成的回调函数) 与 $nextTick 或 setTimeout 结合使用
it('fetches async when a button is clicked', done => {
  const wrapper = shallowMount(Foo)
  wrapper.find('button').trigger('click')
  wrapper.vm.$nextTick(() => {
    expect(wrapper.vm.value).toBe('value')
    done()
  })
})
​
// 或者通过npm i flush-promises (建议使用，可读性较好)
import flushPromises from 'flush-promises'
it('fetches async when a button is clicked', async () => {
  const wrapper = shallowMount(Foo)
  wrapper.find('button').trigger('click')
  await flushPromises()
  expect(wrapper.vm.value).toBe('value')
})
```

### 2.4 Vuex 测试

创建了一个 `localVue` 并对其安装 Vuex

```javascript
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const fakeStore = new Vuex.Store({
  state: {},
  actions: {
    actionClick: jest.fn(),
  },
})
const wrapper = shallowMount(Component, { 
    store: fakeStore, 
    localVue 
})
```

### 2.5 路由测试

创建了一个 `localVue` 并对其安装 Vue Router

```javascript
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

const $route = { // 伪造 $route
  path: '/some/path'
}
const wrapper = shallowMount(Component, {
  localVue,
  router
  mocks: {
    $route
  }
})
wrapper.vm.$route.path // /some/path
```

## 3. 踩坑指南

* 注意，Vue 会异步的将未生效的 DOM 批量更新，避免因数据反复变化而导致不必要的渲染。因此在更新会引发 DOM 变化的属性后必须使用 `Vue.nextTick（）` （异步函数）来等待 Vue 完成 DOM 更新。
* 如果项目依赖第三方插件，建议将第三方插件注册到 localVue 中，mount 挂载组件生成 wrapper 时，将 localVue 作为参数传递。
* elementUI 组件库与实际 html 不同，当一些事件无法触发（无法选中对应的 dom），可以打印 wrapper.html 看实际渲染结果。
* 注意触发事件是在 dom 上通过 trigger\(\) 触发，还是子组件触发事件通过 wrapper.vm.emit\(\)。
* 一个测试套件之间的测试用例肯能会互相影响，可使用钩子函数，在每次测试用例测试后都销毁。

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

