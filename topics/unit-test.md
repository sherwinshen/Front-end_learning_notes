# 单元测试 - VUE为例



## 1. 测试粒度

| 架构层级     | 测试内容                                                     | 测试策略                                                     |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| component 层 | 1. 是否渲染了正确的组件 2. computed和watch属性 3. 事件的emit | 1. 组件的分支渲染逻辑要求100%覆盖 2. 交互事件的调用参数一般要求100%覆盖 3. 连接 vuex store 的容器组件不测 |
| UI 层        | 1. 组件是否渲染了正确的样式                                  | 1. 纯 UI 不测 2. CSS 不测                                    |
| utils 层     | 1. 各种辅助工具函数                                          | 1. 没有副作用的100%覆盖                                      |
| action 层    | 1. 是否获取了正确的参数 2. 是否正确地调用了 API 3. 是否使用了正确的返回值存取回 Vuex 中 4. 业务分支逻辑 5. 异常逻辑 | 1. 一般100% 覆盖                                             |
| mutation 层  | 1. 是否正确完成计算                                          | 1. 有逻辑的 mutation 要求100%覆盖                            |
| getter 层    | 1. 是否正确完成计算                                          | 1. 有逻辑的 getter 要求 100%覆盖率                           |

## 2. 测试框架

### 2.1 JS测试框架

| 框架  | 断言           | 异步 | Mock            | 代码覆盖率         |
| ----- | -------------- | ---- | --------------- | ------------------ |
| Jest  | 默认支持       | 友好 | 默认支持        | 支持               |
| Mocha | 不支持（Chai） | 友好 | 不支持（Sinon） | 不支持（Istanbul） |
| Ava   | 默认支持       | 友好 | 不支持（Sinon)  | 不支持（Istanbul)  |

✍️ Chai为断言库；Sinon是具有spies, stub, mock功能的库； Istanbul是JavaScript程序的代码覆盖率工具。

## 3. Vue Test Utils + Jest

### 3.1 基础说明

如果使用的是 VUE CIL 的话，在创建项目时就选择 Jest 即可，或者后续添加配置即可，输入以下命令，会自动安装：

```shell
$vue add @vue/unit-jest
```

**基本思路**

Step1: 挂载组件 —— 通过 `mount/shallowMount` 方法来创建包裹器

Step2: 模拟必要的输入 (prop、注入和用户事件)   

Step3: 对输出 (渲染结果、触发的自定义事件) 的断言来完成测试

**测试描述**

Given (如果) _ 指定的状态，通常是给出的条件（测试数据）；

When (当) _ 触发一个动作或者事件；

Then (则) _ 对期望结果的验证；

> 举例：
>
> it('Given a = 1 And b = 2，When execute add()，Then result is 3', () => {});
> it('When 用户访问登录页面，Then 看到用户名、密码输入框和提交按钮', () => {})

### 3.2 Mock依赖

**Mock**

> 用于替代整个模块

```js
import SoundPlayer from './sound-player'

const mockPlaySoundFile = jest.fn()

jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return { playSoundFile: mockPlaySoundFile }
  })
})
```

jest.mock()完全接管整个 `./sound-player` JavaScript 模块，比如说这里的 `playSoundFile` 本来应该是从 `./sound-player` 这个文件当中 `export` 出来的，而被 Mock 之后我们的测试就可以使用 Mock 所返回的数据或方法。注意，该模板的所有功能都已经被 Mock 掉，模块中其他功能也被mock了如果需要使用也需要重新实现。

**Stub**

> 用于模拟特定行为

```js
const mockFn = jest.fn()
mockFn()
expect(mockFn).toHaveBeenCalled()

// With a mock implementation:
const returnsTrue = jest.fn(() => true)
console.log(returnsTrue()) // true;
```

`jest.fn()` 代表着我就是一个 Stub（桩），可以是特定行为也可以是没有行为。没有行为常用于验证 Stub 被调用过，也就能够断言某处代码被执行，从而确定代码被测试所覆盖。特定行为就是返回特定的数据， Stub 也可以根据输入模拟返回一种输出。

**Spy** 

> 用于监听模块行为、

```js
const video = require('./video')

it('plays video', () => {
  const spy = jest.spyOn(video, 'play')
  const isPlaying = video.play()

  expect(spy).toHaveBeenCalled()
  expect(isPlaying).toBe(true)
})
```

Spy 并不会影响到原有模块的功能代码，而只是充当一个监护人的作用。比如说上文中的 `video` 模块中的 `play()` 方法已经被 `spy` 过，那么之后 `play()` 方法只要被调用过，我们就能判断其是否执行，甚至执行的次数。

### 3.3 异步测试

第一种：Vue 会异步的将未生效的 DOM 批量更新，避免因数据反复变化而导致不必要的渲染。因此在更新会引发 DOM 变化的属性后必须使用 `Vue.nextTick（）` （异步函数）来等待 Vue 完成 DOM 更新。

```js
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

```vue
<template>
  <button @click="fetchResults" />
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        value: null
      }
    },

    methods: {
      async fetchResults() {
        const response = await axios.get('mock/service')
        this.value = response.data
      }
    }
  }
</script>
```

```js
// 将 done(通知测试完成的回调函数) 与 $nextTick 或 setTimeout 结合使用
it('fetches async when a button is clicked', done => {
  const wrapper = shallowMount(Foo)
  wrapper.find('button').trigger('click')
  wrapper.vm.$nextTick(() => {
    expect(wrapper.vm.value).toBe('value')
    done()
  })
})

// 或者通过npm i flush-promises (建议使用，可读性较好)
import flushPromises from 'flush-promises'
it('fetches async when a button is clicked', async () => {
  const wrapper = shallowMount(Foo)
  wrapper.find('button').trigger('click')
  await flushPromises()
  expect(wrapper.vm.value).toBe('value')
})
```

### 3.4 Vuex测试

> 创建了一个 `localVue` 并对其安装 Vuex，具体测试详见：[Vue 应用单元测试的策略与实践 04 - Vuex 单元测试](https://blog.jimmylv.info/2018-11-02-vue-application-unit-test-strategy-and-practice-04-testing-vuex/)

```js
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

### 3.5 路由测试

>创建了一个 `localVue` 并对其安装 Vue Router

```js
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

## 4. 踩坑指南

- 注意，Vue 会异步的将未生效的 DOM 批量更新，避免因数据反复变化而导致不必要的渲染。因此在更新会引发 DOM 变化的属性后必须使用 `Vue.nextTick（）` （异步函数）来等待 Vue 完成 DOM 更新。
- 如果项目依赖第三方插件，建议将第三方插件注册到localVue中，mount挂载组件生成wrapper时，将localVue作为参数传递。
- elementUI组件库与实际html不同，当一些事件无法触发（无法选中对应的dom），可以打印wrapper.html看实际渲染结果。
- 注意触发事件是在dom上通过trigger()触发，还是子组件触发事件通过wrapper.vm.emit()
- 一个测试套件之间的测试用例肯能会互相影响，可使用钩子函数，在每次测试用例测试后都销毁。



{% hint style="info" %} 
参考资料：[Vue 应用单元测试的策略与实践](https://blog.jimmylv.info/2018-09-19-vue-application-unit-test-strategy-and-practice-01-introduction/)   [Jest结合Vue-test-utils使用的初步实践](https://blog.csdn.net/duola8789/article/details/80434962) ：[Vue 应用单元测试的策略与实践 05 - 测试奖杯策略](https://juejin.im/post/5d2ddf9e518825407e37ff06) [vue单元测试第一篇：单元测试介绍和基本使用](https://juejin.im/post/5de5fdd3e51d452515148083)  [ Jest Mock组件方法及axios promise请求](https://blog.csdn.net/sinat_33312523/article/details/82970655) 
{% endhint %}