# Vue 踩坑指南

## 1. v-if 和 v-for 避免同时使用

在使用下面模版时，`v-for` 比 `v-if` 具有更高的优先级，v-for会先遍历再判断是否显示，因此哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，这会一定程度影响效率。

```markup
<ul>
  <li v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

**解决方法**

* 通过计算属性先筛选一遍 list

```markup
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

* `v-if` 移动至容器元素上 \(比如 `ul`, `ol`\)（个人推荐）

{% hint style="info" %}
如果没有外层元素，我们可以添加`<template v-if=''></template>` 进行包裹。
{% endhint %}

```markup
<ul v-if="shouldShowUsers">
  <li v-for="user in users" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

## 2. SCSS 全局变量

以下是存放变量的 scss 文件：

```css
// @/styles/variables.scss
// SCSS 公共变量，例如颜色等

$colorBg: #304156;
```

即使在 main.js 中引入文件，但是在实际组件的应用中也需要进行引入否则无法使用全局变量：

```markup
<template>
  <div class="notice">注意！</div>
</template>

<style lang="scss" scoped>
@import " @/styles/variables.scss"; // 如果不加这个的话则无法使用变量
.notice {
  background: $colorBg;
}
</style>
```

那么全局 SASS/SCSS 变量在 Vue 项目中应用解决方案如下：

* 使用 sass-resources-loader
* 项目基于 Vue-cli 3.x 的话可以配置`vue.config.js`文件，详见[参考资料](https://vueschool.io/articles/vuejs-tutorials/globally-load-sass-into-your-vue-js-applications/)。

```javascript
module.exports = {
  // css相关配置
  css: {
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `,
      },
    },
  },
}
```

## 3. Vue 使用 computed 时不要使用箭头函数

在获取 vuex state 的过程中，在 computed 下，如果使用箭头函数则无法获取到数据！！！

```javascript
export default {
  computed: {
    // 错误做法
    isOpened: () => {
      return this.$store.state.app.sideBar.isOpened // 无法获取到数据，this 指向问题
    },
    // 正确做法
    isOpened() {
      return this.$store.state.app.sideBar.isOpened
    },
  }
}
```

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

