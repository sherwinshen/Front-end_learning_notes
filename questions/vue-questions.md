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



{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

