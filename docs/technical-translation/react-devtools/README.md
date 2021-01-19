# 【Github】react-devtools说明文档
React DevTools是Chrome和Firefox浏览器的内置扩展。这个包允许您在其他地方调试React应用程序(例如，在iframe中调试移动浏览器、嵌入式webview、Safari)。它可以与React DOM和React Native一起工作。

## 安装
安装react-devtools包。因为这是一个开发工具，全局安装通常是最方便的:
```
# Yarn
yarn global add react-devtools

# NPM
npm install -g react-devtools

```
如果希望避免全局安装，可以将react-devtools作为项目依赖项添加。使用Yarn，您可以通过运行以下命令来实现这一点:
```
yarn add --dev react-devtools
```
使用NPM你可以使用NPX:
```
npx react-devtools
```
## 使用React Native
从终端运行react-devtools，启动独立的DevTools app:
```
react-devtools
```
如果你不是在模拟器，那么你还需要运行以下命令提示:
```
adb reverse tcp:8097 tcp:8097
```
如果你使用的是React Native 0.43或更高版本，它应该在几秒钟内连接到你的模拟器。
### 与React本机检查器集成
你可以打开应用内的开发者菜单，选择“显示检查器”。它会出现一个覆盖，让你点击任何UI元素，并看到有关它的信息

但是，当react-devtools运行时，Inspector将进入一个特殊的折叠模式，而不是使用DevTools作为主UI。在这种模式下，在模拟器中点击某个东西，就会出现DevTools中的相关组件:

你可以在相同的菜单中选择“隐藏检查器”来退出这个模式。
### 检查组件实例
在Chrome中调试JavaScript时，可以在浏览器控制台中检查React组件的props和state。首先，按照在Chrome中调试的说明打开Chrome控制台。

确保Chrome控制台左上角的下拉菜单显示debuggerWorker.js。这一步至关重要。然后在React DevTools中选择一个React组件。在顶部有一个搜索框，可以帮助你按名字找到一个。一旦你选择了它，它就会以$r的形式出现在Chrome控制台中，让你检查它的props、state和实例属性。
## 使用React DOM
独立的shell也可以用于React DOM(例如调试Safari或iframe中的应用程序)。从终端运行response - DevTools，启动独立的DevTools app:
```
react-devtools
```
添加`<script src="http://localhost:8097"></script>`作为开发时页面`<head>`中的第一个`<script>`标签:
```
<!doctype html>
<html lang="en">
  <head>
    <script src="http://localhost:8097"></script>
```

这将确保开发人员工具是连接的。在部署到生产环境之前，不要忘记删除它!