# Vuex指南

简介：本文为vuex状态管理基本用法，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision)         联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

参考链接：[5分钟带你入门vuex](https://baijiahao.baidu.com/s?id=1618794879569468435&wfr=spider&for=pc)         源代码：[code](./code)



<img src='vuex.png'>

## Step1

> 创建store文件夹及index.js文件，引入vuex以及创建Vuex.Store实例保存到变量store中，最后使用export default导出store

```javascript
// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

// 使用vuex
Vue.use(Vuex);

// 创建vuex实例
const store = new Vuex.Store({});

// 导出store
export default store;
```

## Step2

> 在main.js文件中引入store/index.js文件，在文件里面添加 import store from ‘./store’;，再在vue实例全局引入store对象

```javascript
// main.js

import store from './store'

/* eslint-disable no-new */
new Vue({
  store // 新添加
})
```

## Step3

> 在Vuex.Store实例中编写vuex业务代码 —— 具体参看代码中注释说明

- state - vuex中的数据源，用于数据保存，页面通过 this.$store.state来获取我们定义的数据
- getters - Getters可以用于监听state中的值的变化，返回计算后的结果
- mutations - 用户修改store中的值唯一的方法就是提交mutation来修改
- actions - 对mutations修改值外面套了一层，修改store里面的值，先去提交一个actions，在actions中提交mutation再去修改状态值

## Step4

> 页面文件中使用vuex

- 获取数据 -  this.$store.state
- 修改数据 - this.$store.commit('mutation中function')
- 修改数据(改进) - this.$store.dispatch('action中function')，即通过actions来实现操作

> mapState、mapGetters、mapActions 写法可以避免`this.$stroe.state.count`和`this.$store.dispatch('funName')`这种长写法。

```javascript
...mapState({
	count: state => state.count // this.count就是this.$store.state
})
...mapActions([
	'addFun' // 可以将this.addFun映射为this.$store.dispatch('addFun')
])
...mapGetters([
	'addFun' // 可以将this.addFun映射为this.$store.commit('addFun')
])
```



------

如果发现本项目有内容上的错误，欢迎提交 issues 进行指正，相关合作请邮件<a href="mailto:EnvisionShen@gmail.com">EnvisionShen@gmail.com</a>联系