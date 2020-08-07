# MongoDB使用手册

简介：前端个人学习笔记-MongoDB使用手册，完整笔记在[Github](https://github.com/MrEnvision/Front-end_learning_notes)

作者：[Envision](https://github.com/MrEnvision) 联系邮箱：[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com) 创建日期：2020.03.25

参考链接：[MAC安装MONGODB](https://www.cnblogs.com/cbowen/p/11748922.html) [深入浅出mongoose](https://www.cnblogs.com/chris-oil/p/9142795.html)

目录：

[1、安装MongoDB及启动](mongodb-bi-ji.md#1安装MongoDB及启动) [2、数据库基本操作](mongodb-bi-ji.md#2数据库基本操作) [3、数据库条件匹配](mongodb-bi-ji.md#3数据库条件匹配) [3.1、使用比较运算符查询](mongodb-bi-ji.md#31使用比较运算符查询) [3.2、关键字](mongodb-bi-ji.md#32关键字) [3.3、模糊查询](mongodb-bi-ji.md#33模糊查询) [3.4、查询结果处理](mongodb-bi-ji.md#34查询结果处理) [3.5、聚合函数（重要）](mongodb-bi-ji.md#35聚合函数重要) [4、Mongoose](mongodb-bi-ji.md#4Mongoose) [4.1、Mongoose使用](mongodb-bi-ji.md#41Mongoose使用) [4.2、Mongoose基础](mongodb-bi-ji.md#42Mongoose基础) [4.3、Validation](mongodb-bi-ji.md#43Validation) [4.4、Population](mongodb-bi-ji.md#44Population) [4.5、Middleware](mongodb-bi-ji.md#45Middleware)

## 1、安装MongoDB及启动

* 【下载】在[官网](https://www.mongodb.com)下载安装包，并将其解压至/usr/local/目录，并重命名为MongoDB
* 【配置】终端输入`open -e .zshrc`，在.bash\_profile配置文件中添加环境变量`export PATH=${PATH}:/usr/local/mongoDB/bin`，关闭配置文件，在终端中输入`source .zshrc`使配置立即生效。
* 【启动服务】在/usr/local/mongoDB目录创建两个文件夹: data 和 log，并在该路径下终端输入`sudo mongod --dbpath data --logpath log/mongod.log --logappend`。
* 【连接数据库】新的终端中输入`mongo`连接数据库，也可以使用MongoDB Compass可视化工具连接。

> 备注1：默认的数据保存地址为/data/db，需要手动创建，我们自定义了data目录位置，需要在启动服务时指定dbpath的位置。 --dbpath data文件夹的地址 --logpath log存放的地址
>
> 备注2：macbook旧版本需要在`open -e .bash_profile`来配置环境

## 2、数据库基本操作

* 增
  * db.集合名.insert\({"键名1":值1, "键名2": 值2 ...}\)
* 删
  * db.集合名.remove\({查询条件}\)  —— 举例 db.students.remove\({"name":"envision"}\)
  * db.集合名.remove\({}\)  \# 删除全部数据  
* 改
  * db.集合名.update\({查询条件}, {修改后结果}\)  \# 修改整行
  * db.集合名.update\({查找条件}, {$set:{"要修改的字段名1":修改后的值, "要修改的字段名2": "值2"}}\)   \# 修改指定字段的值
* 查
  * db.集合名.findOne\(\)   \# 只返回一行
  * db.集合名.find\(\)   \# 返回全部
  * db.集合名.find\({查找条件}\) \# 按条件查找
  * db.集合名.find\(\).pretty\(\)  \# 格式化打印

## 3、数据库条件匹配

### 3.1、使用比较运算符查询

`db.集合名.find({"键名": {比较运算符1:值1, 比较运算符2:值2} })`

| MongoDB | 运算 |
| :--- | :--- |
| $gt | 大于 |
| $lt | 小于 |
| $gte | 大于等于 |
| $lte | 小于等于欧 |
| $ne | 不等于 |

### 3.2、关键字

* IN/NOT IN 关键字 - 判断值是否存在
  * db.集合名.find\({"键名": {$in:\[值1, 值2, 值3 ...\]} }\)
  * db.集合名.find\({"键名": {$nin:\[值1, 值2, 值3 ...\]} }\)
* EXISTS 关键字 - 判断值段\(键\)是否存在
  * db.集合名.find\({"键名": {$exist: true\|fase} }\)
* SIZE 关键字 - 判断list长度
  * db.集合名.find\( {"键名": {$size:n} }\)
* OR 关键字 - 多个条件
  * db.集合名.find\({$or:\[{条件1}, {条件2}, {条件3}...\]}\)

### 3.3、模糊查询

db.集合名.find\({"键名": js正则表达\)

### 3.4、查询结果处理

* 结果排序
  * db.集合名.find\(\).sort\({"键名": 1｜-1, "键名": 1｜-1...}\)  ——  1 为升序；-1 为降序
* 返回指定数量结果
  * db.集合名.find\(\).limit\(n\)
  * db.集合名.find\(\).skip\(n\)  \# 跳过n条，返回从n+1开始的数据
  * db.集合名.find\(\).skip\(n\).limit\(m\)  \# 跳过n条，返回后面的m条
* 返回结果计数
  * db.集合名.find\(\).count\(\)
  * db.集合名.find\(\).skip\(n\).count\(true\)  \# 与skip结合使用时，要加true，不加true就会统计全部数据条目

### 3.5、聚合函数\(重要\)

基本语法：

```text
db.集合名.aggregate([
                    { 管道1: {表达式1} },
                    { 管道1: {表达式1} },
                    { 管道1: {表达式1} },
                    ...
                    ])
```

常用管道：

| 管道 | 说明 |
| :--- | :--- |
| $group | 将集合中的文档分组，可用于统计结果 |
| $match | 过滤数据，只输出符合条件的文档 |
| $project | 修改输入文档的结构，如重命名、增加、删除字段、创建计算结果 |
| $sort | 将输入文档排序后输出 |
| $limit | 限制聚合管道返回的文档数 |
| $skip | 跳过指定数量的文档，并返回余下的文档 |
| $unwind | 将数组类型的字段进行拆分 |

常用聚合函数 - 只能在$group管道中使用。

| 分组函数 | 说明 |
| :--- | :--- |
| $sum | 计算总和，$sum:1同count表示计数 |
| $avg | 计算平均值 |
| $min | 获取最小值 |
| $max | 获取最大值 |
| $push | 在结果文档中插入值到一个数组中，相当于拼接字段 |
| $first | 根据资源文档的排序获取第一个文档数据 |
| $last | 根据资源文档的排序获取最后一个文档数据 |

实例1-$group：

```text
// _id的字段名设置为null，就是对全部数据进行聚合运算
db.集合名.aggregate($group:{
    _id:'$字段名', 别名:{$聚合函数:'$字段名'}
})

// 举例-1
db.teacher.aggregate($group:{
    _id:'$sex', 'count_sex':{$sum:1}
})
// 返回结果
// {'_id':'女', 'count_sex':4}
// {'_id':'男', 'count_sex':7}

// 举例-2
db.teacher.aggregate($group:{
    _id:null, 
    avg_age:{$avg:"$age"},
  min_age:{$min:"$age"},
  max_age:{$max:"$age"}
})
// 返回结果
// {'_id':null, "avg_age" : 42.666666666666664, "min_age" : 29, "max_age" : 55}
```

实例2 -$match

```text
db.集合名.aggregate({$match:{
    "键名":{表达式}
}});

// 举例-1
db.singer.aggregate({$match:{
    "age":{$gt:40}
}});
```

实例3-$unwind

```text
db.集合名.aggregate({
    $unwind:"键名"
});

// 举例-1
db.singer.aggregate([
    {$unwind:"$works"}
]);
// 原始数据 - {"score" : 100, "works" : [ "爱你一万年", "忘情水", "来生缘"]}
// 返回数据 - {"score" : 100, "works" : "爱你一万年"}, {"score" : 100, "works" : "忘情水"}, {"score" : 100, "works" : "来生缘"},
```

实例4-$project

```text
db.集合名.aggregate({
    $project:{"键名":1}
});

// 只显示标记为1的字段，默认情况下_id字段是被包含的，除非设置_id:0
```

实例5-$skip

```text
// 表示前五个文档被"过滤"掉。
db.集合名.aggregate({
    $skip:5
});
```

## 4、Mongoose

### 4.1、Mongoose使用

* 安装Mongoose - `npm install mongoose --save`
* 连接数据库

```javascript
var mongoose = require('mongoose'), 
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/fourdays', {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('Connection success!')
    }
});
```

* 创建Schema，并生成Model

```javascript
const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    // 定义字段
})
module.exports = mongoose.model("Teacher", teacherSchema); 
// 第一个参数是对应的集合（ collection ）名字的单数形式，也就是说这个model就对应数据库中teachers这个 collection
```

* 在需要使用数据库的地方导入对应的Model

```javascript
const Teacher = require('./../model/teachers');
router.get('/', function (req, res, next) {
      // 执行数据库操作
    Teacher.findOne(param, function (err, doc) {
       if (err) {
           console.log("Error:" + err);
       }
       else {
          console.log("Res:" + res);
      }
   })
});
```

### 4.2、Mongoose基础

> Mongoose中任何事物都是从Schema开始的，它是一种以文件形式存储的数据库模型骨架，但不具备数据库的操作能力，我们需要将其编译成Model，Model是一种构造器，具有抽象属性和行为，每一个Model的实例就是一个文档。

与普通数据库的术语对应

| SQL术语/概念 | MongoDB术语/概念 | 解释/说明 |
| :--- | :--- | :--- |
| table | collection | 数据库表/集合 |
| row | document | 数据记录行/文档 |
| column | index | 索引 |
| primary key | primary key | MongoDB自动将\_id字段设置为主键 |

Schema中允许的模式类型

> String-字符串 Number-数字 Date-时间格式 Boolean-布尔 Array-数组 ObjectId-对象 Buffer-二进制缓冲区 Mixed-混合值 Map-经纬度格式 Decimal-小数

实例方法与静态方法

> Schema中可以自定义实例方法与静态方法，其中静态方法在在Model层就能使用，实例方法则每个实例都能使用。

```javascript
const mongoose = require('mongoose');
const newSchema = new mongoose.Schema({});
// 静态方法
newSchema.statics.静态方法名 =  function(参数, callback){
  this.find(parame, (err, docs) => {
    callback(err, docs)
  })
}
const newModel = mongoose.model('NewModel', newSchema);
newModel.实例方法名(参数);

// 实例方法（基本不怎么用）
newSchema.methods.实例方法名 =  function(参数, callback){

}
const newModel = mongoose.model('NewModel', newSchema);
const modelInstance = new newModel({
  name: ' 刘花 ',
  age: 21
})
modelInstance.实例方法名(参数);
```

基本操作

* 增 - ModelName.create\({name: 'Dot'} , callback\)
* 删 - ModelName.remove\({name: 'Dot'}, callback\)
* 改 - ModelName.update\({name: 'Dot'}, {修改后结果}, callback\)
* 查 - ModelName.find\({name: 'Dot'}, callback\)

### 4.3、Validation

> 当save数据的时候可以在Schema定义的部分设置一些验证。参考链接:[Mongoose中文文档-指南之验证](https://itbilu.com/nodejs/npm/rkgfwg5C7.html)

可选字段

* required: 表示必填字段
* min,max: 用来给Number类型的数据设置限制
* enum,match,maxlength,minlength: 这些验证是给string类型的

```javascript
// 举例
const newSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true,'必须填写姓名'], // 第二个参数是错误提示
    maxlength: 12,
    enum: ['Coffee', 'Tea'] // 表示只能出现这些内容
  },
  age:{
    type: Number,
    min: 18,
    max: [24, '年纪太大了']
  }
})
```

当然也可以自定义验证的内容

```javascript
// 举例
const newSchema = new mongoose.Schema({
  phoneNum:{
    type: Number,
    validate:{
      validator: function(data){
        return /\d{3}-\d{3}-\d{4}/.test(data);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

const newModel = mongoose.Model('newModel', newSchema);
const instance = new newModel({
  //....
});
instance.save(function(error,docs) {
  if(err) return console.log(err);
  console.log(docs);
  // 也可在此处定义error的message
  assert.equal(error.errors['phoneNum'].message,'Path `name` is required.');
});

// 注意执行save时会自动执行一次验证，也可以通过doc.validate(callback)或doc.validateSync()手工执行验证
instance.save(function(error,docs) {
  error = instance.validateSync();
  assert.equal(error.errors['phoneNum'].message,'Path `name` is required.');
});

instance.validate(function(error) {
    assert.equal(error.errors['phoneNum'].message,'It is not a valid phone number!');
});
```

### 4.4、Population

> Mongoose提供的 population用来连接多表数据查询，用到的关键字是: `ref` 指明外联的数据库的名字。一般，我们需要在schema中就定义好。

1、schema中定义关联数据库

```javascript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }] // ref后面链接的是对应的model名字
});

var storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);
```

2、创建数据库

```javascript
const newPerson = new Person({
  _id: new mongoose.Types.ObjectId(),
  name: 'Ian Fleming'
})

newPerson.save(function (err) {
  if (err) return handleError(err);
  const newStory = new Story({
    title: 'Casino Royale',
    author: author._id    // assign the _id from the person
  })
  newStory.save(function(err){
    if (err) return handleError(err);
  })
})
// 至此 newPerson的id就关联到了story的author中
```

3、Population

```javascript
Story.findOne({title: 'Casino Royale'}).populate('author').exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name); // "The author is Ian Fleming"
});
// populate根据对应字段“author”的ID值在对应的Model中找到，返回的document代替author字段，再将整体返回。注意，使用populate来指定外联查询的字段必须是_id才行。

// 字段选择，Object类型的时，格式如: {name: 1, _id: 0}，为0表示不填充，为1时表示填充。String类型的时，格式如: “name -_id”，用空格分隔字段，在字段名前加上-表示不填充。
Story.findOne({title: 'Casino Royale'}).populate({path:'author', select: 'name  -_id'})

// 填充多个字段
Story.findOne({title: 'Casino Royale'}).populate('author').populate('fans')
```

### 4.5、Middleware

* pre: 在指定方法执行之前绑定。
* post: 相当于事件监听的绑定。

使用范围：

* doc上：init,validate,save,remove。
* model上：count,find,findOne,findOneAndRemove,findOneAndUpdate,update

```javascript
// 举例

// 在调用 model.save方法时, 会自动执行pre.
var newSchema = new Schema(..);
newSchema.pre('save', function(next) {
 // exe some operations
 this.model.next();  //  这里的next()相当于执行权给下一个pre
});

// 当save方法调用后, 便会触发post绑定的save事件
newSchema.post('save', function(doc, next) {
  // ...
});
```

如果发现本项目有错误，欢迎提交 issues 指正。

