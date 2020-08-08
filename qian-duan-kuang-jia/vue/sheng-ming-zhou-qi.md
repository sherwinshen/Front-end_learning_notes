# 生命周期

简介：本文为Vue生命周期笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

![](../../.gitbook/assets/pic1%20%286%29.png)

* beforeCreate：在data初始化、event配置前调用
* created：data对象及其事件完全初始化，但是dom树未挂载
* beforeMount：在挂载dom树之前调用，即更改已完成，但尚未准备好更新dom
* mounted：挂载已完成，dom树被渲染到页面，可进行dom操作
* beforeUpdate：数据有更新时调用
* update：虚拟dom重新渲染补丁以最小开支渲染dom
* beforeDestory：实例销毁之前调用
* destory：组建销毁之后调用

注意：获得data和method最早在cteated；操作dom节点最早在mounted；

参考视频：[黑马程序员39期web前端-vue生命周期](https://www.bilibili.com/video/BV1sb411M7RT?p=1)

如果发现本项目有错误，欢迎提交 issues 指正。

