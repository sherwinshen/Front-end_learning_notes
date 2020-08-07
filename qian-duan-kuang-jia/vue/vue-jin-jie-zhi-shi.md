# Vue进阶知识

简介：本文为Vue进阶知识笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 1、V-if和v-for避免同时使用

在使用下面模版时，`v-for` 比 `v-if` 具有更高的优先级，v-for会先遍历再判断是否显示，因此哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，这会一定程度影响效率。

```text
<ul>
  <li v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

解决方法：

1. 通过计算属性先筛选一遍list

```text
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

1. `v-if` 移动至容器元素上 \(比如 `ul`, `ol`\)

```text
<ul v-if="shouldShowUsers">
  <li v-for="user in users" :key="user.id">
    {{ user.name }}
  </li>
</ul>
```

如果没有外层元素，我们可以添加`<template v-if=''></template>` 包裹住对应的v-for.

如果发现本项目有错误，欢迎提交 issues 指正。

