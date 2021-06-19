# git submodule

{% hint style="info" %}
参考资料：[《git submodule 使用小结》](https://www.jianshu.com/p/f8a55b972972/)[《Git Submodule使用完整教程》](https://www.cnblogs.com/lsgxeva/p/8540758.html)[《git submodule 使用》](https://blog.justwe.site/post/git-submodule/)
{% endhint %}

## 1. 子模块添加

首先需要有一个父仓库和子仓库，克隆并进入父仓库，在父仓库下将子仓库通过 git submodule 添加至父仓库，例如`git submodule add <仓库地址> demo`则会在父仓库下有一个名叫demo的文件夹，里面是子仓库的内容。

```bash
$git clone <父仓库地址>
$cd <父仓库本地路径>
$git submodule add <子仓库地址> <子仓库本地路径>
```



添加成功后，在父仓库根目录增加了.gitmodule文件。

```bash
[submodule "demo"]
    path = demo
    url = <子仓库地址>
```

{% hint style="warning" %}
克隆一个包含子仓库的仓库目录，并不会clone下子仓库的文件，只是会克隆下.gitmodule描述文件，需要进一步克隆子仓库文件。

```bash
$git submodule init
$git submodule update
```

或

```bash
$git submodule update --init --recursive
```
{% endhint %}

## 2. 子模块更新

情况1：如果在父仓库中进行子模块修改，则可以同步更新子模块，进入子模块的路径，进行正常的commit和push即可。

```bash
$cd <子仓库路径>
$git commit -m 'update'
$git push
```

情况2：如果子模块的维护者提交了更新，那么使用子模块的项目必须手动更新才能包含最新的提交。

```bash
$cd <子仓库路径>
$git pull
```

## 3. 子模块删除

* `rm -rf 子模块目录` 删除子模块目录及源码；
* 删除项目目录下`.gitmodules`文件中子模块相关条目；
* 删除配置项`.git/config`中子模块相关条目；
* `rm .git/module/*` 删除模块下的子模块目录，每个子模块对应一个目录，注意只删除对应的子模块目录即可 。

{% hint style="info" %}
如果你对内容有任何疑问，欢迎提交 [❕issues](https://github.com/MrEnvision/Front-end_learning_notes/issues) 或 [ ✉️ email](mailto:EnvisionShen@gmail.com)
{% endhint %}

