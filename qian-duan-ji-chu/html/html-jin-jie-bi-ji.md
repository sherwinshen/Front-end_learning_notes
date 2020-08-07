# Html进阶笔记

简介：本文为Html进阶学习笔记，完整笔记详见[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)

## 图像区域映射

`<map>` 标签定义一个客户端图像映射 - 图像映射（image-map）指带有可点击区域的一幅图像。area 元素永远嵌套在 map 元素内部。area 元素可定义图像映射中的区域。建议：同时向 `<map>` 添加 id 和 name 属性。

```markup
<img src="planets.jpg" border="0" usemap="#planetmap" alt="Planets" />

<map name="planetmap" id="planetmap">
  <area shape="circle" coords="180,139,14" href ="venus.html" alt="Venus" />
  <area shape="circle" coords="129,161,10" href ="mercur.html" alt="Mercury" />
  <area shape="rect" coords="0,0,110,260" href ="sun.html" alt="Sun" />
</map>
```

**area的coords定义可点击区域（对鼠标敏感的区域）的坐标：**

* 圆形：shape="circle"，coords="x,y,z" —— x 和 y 定义了圆心的位置，z 是以像素为单位的圆形半径；
* 多边形：shape="polygon"，coords="x1,y1,x2,y2,x3,y3,..." —— 每一对 "x,y" 坐标都定义了多边形的一个顶点；
* 矩形：shape="rectangle"，coords="x1,y1,x2,y2" —— 两个对角顶点

注意："0,0" 是图像左上角的坐标

如果发现本项目有错误，欢迎提交 issues 指正。

