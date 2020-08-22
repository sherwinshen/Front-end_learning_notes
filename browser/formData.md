# 表单对象（formData）

## 1. 概念

```html
<form action="/handling-page" method="post">
  <div>
    <label for="name">用户名：</label>
    <input type="text" id="name" name="user_name" required/>
  </div>
  <div>
    <label for="passwd">密码：</label>
    <input type="password" id="passwd" name="user_passwd" />
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="提交" />
  </div>
</form>
```

表单提交以键值对的形式，键名是控件的`name`属性，键值是控件的`value`属性。

- 表单以 GET 形式提交，所有键值对会以 URL 的查询字符串形式，提交到服务器——`/handling-page?user_name=张三&user_passwd=123&submit_button=提交`
- 表单以POST形式提交，所有键值对会连接成一行，作为 HTTP 请求的数据体发送到服务器——`user_name=张三&user_passwd=123&submit_button=提交`

✍️ 注意，实际提交的时候，只要键值不是 URL 的合法字符（比如汉字“张三”和“提交”），浏览器会自动对其进行编码。编码解码参见[浏览器对象 - URL对象](browser_object.md)

## 2. FormData 对象

`FormData()` 构造函数的参数是一个表单元素，如果参数为空，则默认为空表单。

```javascript
const formdata = new FormData(form);
```

表单实例方法（以开头表单为例）：

```javascript
const myForm = document.getElementById('myForm');
const formData = new FormData(myForm);

// 获取指定键名对应的键值，参数为键名
formData.get('user_name');
// 返回一个数组，表示指定键名对应的所有键值
formData.getAll();
// 设置指定键名的键值
formData.set('user_name','Envision');
// 删除一个键值对
formData.delete('user_name');
// 添加一个键值对。注意，如果键名重复，则会生成两个相同键名的键值对！！！
formData.append('user_name','Shen');
// 返回一个布尔值，表示是否具有该键名的键值对
formData.has('user_name');
// 返回一个遍历器对象，用于for...of循环遍历。
formData.keys(); formData.values();formData.enties();
```

表单验证及其他相关属性详见👉 [表单，FormData 对象](https://wangdoc.com/javascript/bom/form.html)

## 3. 文件上传例子

```html
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">选择图片文件</label>
    <!-- multiple属性可以指定可以一次选择多个文件；如果没有这个属性，则一次只能选择一个文件。-->
    <input type="file" id="file" name="myFile" multiple> 
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="上传" />
  </div>
</form>
```

```javascript
var fileSelect = document.getElementById('file');
var files = fileSelect.files;
// 新建一个 FormData 实例对象，模拟发送到服务器的表单数据
var formData = new FormData();
for (var i = 0; i < files.length; i++) {
  var file = files[i];
  // 只上传图片文件
  if (!file.type.match('image.*')) {
    continue;
  }
  formData.append('photos[]', file, file.name); // 一般两个参数，但如果第二个参数是文件，还可使用第三个参数，表文件名。
}
// 使用 Ajax 向服务器上传文件
var xhr = new XMLHttpRequest();
xhr.open('POST', 'handler.php', true);
xhr.onload = function () {
  if (xhr.status !== 200) {
    console.log('An error occurred!');
  }
};
xhr.send(formData);
```

