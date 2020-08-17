# Https

## 1. 概念

简单来说**HTTPS协议 = HTTP协议 + SSL/TLS协议**，在HTTPS数据传输的过程中，需要用SSL/TLS对数据进行加密和解密，需要用HTTP对加密后的数据进行传输，由此可以看出HTTPS是由HTTP和SSL/TLS一起合作完成的。

http默认采用80作为通讯端口，对于传输采用不加密的方式，https默认采用443，对于传输的数据进行加密传输。

## 2. 过程

![](./img/httpscrypt.png)

1. `Client`发送`Client Hello`报文给`Server`开启`SSL`通信，报文中包含`Random_1`
2. 服务器支持`SSL`通信的话，发送`Server Hello`报文回应，报文中包含`Random_2`
3. 服务器之后发送`Certificate`报文，报文中包含数字证书
4. 服务器再发送`Server Hello Done`通知`Client`，最初的`SSL`握手阶段协商部分结束
5. `Client`对数字证书校验，正确后，解密得到服务器的公钥。通过`RSA`算法随机生成`Pre-Master Secret`，并且用服务器的公钥进行加密，包含在`Client Key Exchange`报文中，发送给`Server`
6. 客户端继续发送`Change Cipher Spec`报文，告知`Server`端，客户端切换协商的加密套件，准备使用协商的加密套件加密数据并传输。
7. `Client`发送`Finished`报文，该报文包含了连接至今全部报文的整体校验值（也就是`hash`值）
8. `Server`接收到`Client`的请求，用私钥解密，把`Pre-master secret`取出来。`Server`发送同样的`Change Cipher Spec`报文
9. `Server`同样发送`Finished`报文，提供`Client`校验
10. `Server`和`Client`的`Finished`报文交换完毕，`SLL`连接建立。开始通信。

✍️ 注意，整个过程涉及三个随机数，步骤1中客户端发送给服务端的，步骤2中服务端发送给客户端的，还有步骤5中客户端加密发送给服务端的。