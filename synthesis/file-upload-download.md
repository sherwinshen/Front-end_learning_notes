# 文件上传与下载

{% hint style="info" %}
项目地址：[文件上传与下载](https://github.com/MrEnvision/Front-end_learning_project/tree/master/file_upload_download)
{% endhint %}

## 1. 前置知识

{% hint style="info" %}
具体详见[文件相关对象](../browser/file-objects.md)
{% endhint %}

### 1.1 Blob 对象

Blob 对象表示一个二进制文件的数据内容，比如图片文件的内容就可以通过 Blob 对象读写。

```javascript
// 创建 lob 对象
const blob = new Blob(array [, type]);

// 举例
const blob_1 = new Blob(['<a id="a"><b id="b">hey!</b></a>'], {type : 'text/html'});
const blob_2 = new Blob([ JSON.stringify({ hello: 'world' }) ], {type : 'application/json'});
```

第一个参数是数组，成员是字符串或二进制对象，表示新生成的`Blob`实例对象的内容；第二个参数是配置对象，目前只有一个属性`type`，表示数据的 MIME 类型。

{% hint style="info" %}
Blob 对象有一个非常重要的方法`myBlob.slice(start, end, contentType)`，其用来拷贝原来的数据，常用于大文件分片上传，详见[大文件分片上传](file-upload-download.md#23-da-wen-jian-fen-pian-shang-chuan)。
{% endhint %}

获取 Blob 对象后，直接打印是获取不到的，我们需要通过`FileReader`对象，读取 Blob 对象的内容，即文件内容。

```javascript
const reader = new FileReader();
reader.readAsText(myBlob); // 返回文本，需要指定文本编码，默认为 UTF-8。
reader.onload = function () {
  const text = reader.result; // 通过指定 FileReader 实例对象的onload监听函数，在实例的result属性上才拿到文件内容
}
```

浏览器允许使用`URL.createObjectURL()`方法，针对 Blob 对象生成一个临时 URL，以便于某些 API 使用。

```javascript
const url = .createObjectURL(myBlob)

// 举例 - File 对象可以认为是一种特殊的 Blob 对象
img.src = URL.createObjectURL(files[i]);
a.href = URL.createObjectURL(files[i]);
```

### 1.2 File 对象

File 对象代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的场合都可以使用它。最常见的使用场合是表单的文件上传控件（`<input type="file">`），用户选中文件以后，浏览器就会生成一个数组，里面是每一个用户选中的文件，它们都是 File 实例对象。

```javascript
// 创建 File 对象
const file = new File(array, name [, options])

// 举例
var file = new File(['foo'], 'foo.txt', { type: 'text/plain', });
```

第一个参数是数组，成员可以是二进制对象或字符串，表示文件的内容；第二个参数表示文件名或文件路径；第三个参数是可选对象，设置实例的属性。

### 1.3 FileReader对象

FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容。

```javascript
// <input type="file" onchange="onChange(event)">
function onChange(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    console.log(event.target.result)
  };
  reader.readAsText(file);
}
```

* `FileReader.readAsText()`：返回文本，需要指定文本编码，默认为 UTF-8。
* `FileReader.readAsArrayBuffer()`：返回 ArrayBuffer 对象。
* `FileReader.readAsDataURL()`：返回 Data URL。
* `FileReader.readAsBinaryString()`：返回原始的二进制字符串。

## 2. 文件上传

### 2.1 Form 表单提交

直接通过 form 表单提交，也不需要 JS，action 即为接口地址，注意两点，一是类型需要设置为`multipart/form-data`，二是 input必须设置 name 属性，否则数据无法发送。

```markup
<form method="post" action="接口地址" enctype="multipart/form-data">
  选择文件:<input type="file" name="file" />
  <button type="submit">提交</button>
</form>
```

### 2.2 文件接口上传

通过 document.getElementById\('file'\).files\[0\] 获取 file 对象，再以 `formData` 形式发送请求。

```markup
<input id="file" type="file" name="file" />
<button onclick="submitFile()">提交</button>

<script>
  submitFile() {
    const file = document.getElementById('file2').files[0]
    const formData = new FormData()
    formData.append('file', file)
    const data = {
      file: formData
    }
    // 将 data 通过 axios、fetch、ajax 等发送即可
    console.log(data)
  }
</script>
```

file 打印出来如下所示：

![](../.gitbook/assets/file.png)

formData 打印出来如下所示：

![](../.gitbook/assets/filedata.png)

{% hint style="warning" %}
打印出来是一个空的Object，但并不是说它的内容是空的，只是它对前端开发人员是透明的，无法查看、修改、删除里面的内容。
{% endhint %}

FormData 无法得到文件的内容，需要使用 **FileReader** 读取整个文件的内容：

```javascript
const fileReader = new FileReader()
fileReader.onload = function(event) {
  console.log(event.target.result)
}
fileReader.readAsDataURL(file); // 按base64的方式读取，结果是base64，任何文件都可转成base64的形式
fileReader.readAsArrayBuffer(file); // 以原始二进制方式读取，读取结果可直接转成整数数组
```

### 2.3 大文件分片上传

分片上传思路：

1. 将文件按一定大小\(比如 1M\)截取成一小份，并将切片带上 hash 值，用于作为标识，简单方式是文件名字+下标来标识，但是文件名修改就失去意义了，因此建议根据文件内容生成 `hash`，采用 `spark-md5` 库。
2. 将每个切片文件，当前端获取到本地图片后，利用 `Blob.prototype.slice` 方法（和数组的 `slice` 方法相似），将大文件按照一定大小（例如 1M）进行切割，再并发将各个分片上传到服务端，服务端保存每个切片文件的信息。
3. 切片上传完成后，服务端根据文件标识进行合并，合并完后删除切片文件。

断点续传思路：

1. 每个分片上传的时候，服务端记录上传好的文件 hash 值，上传成功后返回 hash 值给前端，前端记录 hash 值
2. 重新上传时，将每个文件的 hash 值与记录的 hash 值做比对，如果相同的话则跳过，继续下一个分段的上传。
3. 全部分片上传完成后，服务端根据文件标识进行合并，合并完后删除小文件。

```javascript
function chunkUpload() {
  // 切片处理
  let chunkSize = 1024 * 1024
  let totalSize = file.size
  let count = Math.ceil(totalSize / chunkSize)
  let chunkArr = []
  for (let i = 0; i < count; i++) {
    if (i === count.length - 1) {
      chunkArr.push(file.slice(i * chunkSize, totalSize))
    } else {
      chunkArr.push(file.slice(i * chunkSize, (i + 1) * chunkSize))
    }
  }
  // 上传处理
  for (let index = 0; index < count; index++) {
    uploadChunk(chunkArr[index]) // 上传过程中记得要计算MD等信息一起上传
  }
}
```

## 3. 文件下载

### 3.1 window.open

浏览器可直接浏览的文件类型是不提供下载的，如 txt、png、jpg、gif 等，会直接打开而非下载；

```markup
<button @click="download1">下载1</button>
<script>
  download1() {
    window.open(downloadURL)
  }
</script>
```

### 3.2 调用 form 表单的 submit

无法直接下载浏览器可直接预览的文件类型，无法知道下载的进度；

```markup
<button @click="download2">下载2</button>
<script>
  download2() {
    const form = document.createElement('form');
    form.method = 'get';
    form.action = downloadURL;
    //form.action = wordURL;
    //form.target = '_blank';	// form 新开页面
    document.body.appendChild(form); // form 表单做出提交操作要先加入到 dom 树中
    form.submit();
    document.body.removeChild(form);
  }
</script>
```

### 3.3 调用 a 标签的 click

```markup
<button @click="download3">下载3</button>
<script>
  download3() {
    const a = document.createElement('a');
    a.href = downloadURL;
    a.download = 'fileName.jpg' // download 对应下载文件名，并且如果没有 download 属性则也会直接在浏览器预览，而不会下载
    a.click();
  }
</script>
```

### 3.4 Blob对象下载

除了利用已知文件地址路径进行下载，还能够发送请求 api 获取文件流进行下载，利用 Blob 对象可以将文件流转化成 Blob 二进制对象。

基本思路：发请求获取二进制数据，转化为 Blob 对象，利用 `URL.createObjectUrl` 生成 url 地址，赋值在`a`标签的`href`属性上，结合 download 进行下载，即文件流 -&gt; fileReader转Blob对象 -&gt; a标签下载。

```markup
<input id="file" type="file" name="file"/>
<button @click="download4">下载4</button>

<script>
  // 注意，这边通过 FileReader 来模拟后台返回的二进制文件流
  download4() {
    // 通过 FileReader 来生成二进制文件流
    const file = document.getElementById('file').files[0]
    const fileReader = new FileReader()
    fileReader.onload = function (event) {
      // event.target.result 为二进制文件流，然后处理下载
      const blob = new Blob([event.target.result]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'myFile.js'; // 也可以这么写 a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    fileReader.readAsArrayBuffer(file);
  }
</script>
```

### 3.5 Base64 下载

base64 可以实现任意类型文件的下载，即文件流 -&gt; fileReader转base64 -&gt; a标签下载。

```javascript
// 文件转 base64
function base64(文件流) {
  const file = new FileReader()
  fileReader.onload = function (event) {
    // 然后利用a标签点击下载同2.4
    const a = document.createElement('a');
    a.setAttribute('href', event.target.result); // 区别于2.4不需要转化
    a.download = 'myFile.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  fileReader.readAsDataURL(file);
}
```

### 3.4 依赖其他库

通过第三方依赖包来实现，例如 [file-saver](https://www.npmjs.com/package/file-saver) 等。

## 4. 总结

### 4.1 文件上传

{% hint style="info" %}
ile 对象基于 input 标签通过 document.getElementById\('file'\).files\[0\] 获取
{% endhint %}

* formData 上传

```javascript
const file = document.getElementById('file2').files[0]
const formData = new FormData()
formData.append('file', file)
const data = { file: formData } // 发送 data
```

* Base64 通过字符串上传

```javascript
// 文件转 base64 以字符串上传即可 
const fileReader = new FileReader()
fileReader.onload = function(event) {
  const data = { file: event.target.result } // 发送 data
}
fileReader.readAsDataURL(file); // 按base64的方式读取，结果是base64，任何文件都可转成base64的形式
fileReader.readAsArrayBuffer(file); // 以原始二进制方式读取，读取结果可直接转成整数数组
```

### **4.2 文件下载**

* 调用 window.open\(URL\)
* 表单 form.action = URL 调用 submit\(\)

```javascript
const form = document.createElement('form');
form.method = 'get';
form.action = downloadURL;
document.body.appendChild(form); 
form.submit();
document.body.removeChild(form);
```

* a 标签 href = URL 调用 click\(\)

```javascript
const a = document.createElement('a');
a.href = downloadURL;
a.download = 'fileName.jpg'
a.click();
```

{% hint style="info" %}
没有URL则需要创造URL。数据（例如文件流、json等）可以转成 Blob 对象，再通过 URL.createObjectURL\(blob\) 即可获得 URL。

objectURL = URL.createObjectURL\(object\); 的 object 表示指定的 File 对象、 Blob 对象或者 MediaSource 对象。
{% endhint %}

```text
const blob = new Blob([数据], options: { type: 类型 });
const url = URL.createObjectURL(blob);
```

{% hint style="info" %}
base64 可以直接当成 URL 来下载。
{% endhint %}

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

