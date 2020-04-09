# 【npm】npm的一些问题
## npm如何换成淘宝镜像源？
官方是国外，太慢，所以最好还是使用淘宝的镜像源。
### 单次使用
```
 npm install --registry=https://registry.npm.taobao.org
```
### 永久使用
```
npm config set registry https://registry.npm.taobao.org
```
### 检测是否修改成功
```
// 配置后可通过下面方式来验证是否成功
npm config get registry
// 或
npm info express
```
### 还原官网镜像
```
npm config set registry https://registry.npmjs.org/
```