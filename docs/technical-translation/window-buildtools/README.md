# 【Github】Windows-Build-Tools

<a href="https://ci.appveyor.com/project/felixrieseberg/windows-build-tools"><img src="https://ci.appveyor.com/api/projects/status/gpna6y54wnfp07xr?svg=true" /></a>
<a href="http://badge.fury.io/js/windows-build-tools"><img src="https://badge.fury.io/js/windows-build-tools.svg" alt="npm version" height="18"></a> <a href="https://david-dm.org/felixrieseberg/windows-build-tools"><img src="https://david-dm.org/felixrieseberg/windows-build-tools.svg" alt="dependencies" height="18px"></a> <img src="https://img.shields.io/npm/dm/windows-build-tools.svg" height="18px" />

在 Windows 下? 想要去编译 [原生 Node 模块](#examples-of-modules-supported)? 用这一行程序去安装构建工具。开启 PowerShell 用 Administrator 并去运行:

```
npm install --global windows-build-tools
```

或者，如果你用 `Yarn`：

```
yarn global add windows-build-tools
```

![Gif](https://user-images.githubusercontent.com/1426799/45007904-bde9f280-afb4-11e8-8a35-c77dffaffa2a.gif)

安装好后, npm 将自动执行这个模块，他会下载和安装Visual C++ Build Tools，由微软提供给大多数用户（作为Visual Studio社区的一部分，请咨询许可证，以确定您是否符合资格）。

这些工具是 [编译流行的本地模块所必需的](https://github.com/nodejs/node-gyp)。
如果没有安装，它将还要安装 Python 3.8, 相应地配置你的机器和npm。

> :bulb: [Windows Vista / 7 only] 需要 [.NET Framework 4.5.1](http://www.microsoft.com/en-us/download/details.aspx?id=40773) (通过这些包当前没有自动安装)

这两个装置都是无冲突的，这意味着它们不会干扰现有的装置
Visual Studio, C++ Build Tools, 或者 Python。如果你看到任何不一样的东西，请提上一个bug。
## Visual Studio 2017 vs Visual Studio 2015
这个模块能够从Visual Studio [2017](https://blogs.msdn.microsoft.com/vcblog/2016/11/16/introducing-the-visual-studio-build-tools/) 或者 Visual
Studio [2015](https://blogs.msdn.microsoft.com/vcblog/2016/03/31/announcing-the-official-release-of-the-visual-c-build-tools-2015/) 中安装构建工具。

默认的，这个工具将安装2017构建工具。为了改变这个，运行脚本带上 `--vs2015` 参数。

## Usage

```
npm [--python-mirror=''] [--proxy=''] [--debug] [--strict-ssl] [--resume] [--sockets=5] [--vcc-build-tools-parameters=''] [--vs2015] [--dry-run-only] install --global windows-build-tools
```

选项参数：

* `--offline-installers`: 已下载安装程序的文件夹的路径。看到
* `--python-mirror`: 用一个给定的 mirror 去下载 Python (像 `--python_mirror=https://npm.taobao.org/mirrors/python/`)。 你可以设置 `PYTHON_MIRROR` 的环境变量。
* `--proxy`: 使用给定的代理。你可以设置 `PROXY` 的环境变量。
* `--debug`: 在记录器输出中提供额外的详细信息。相当于设置环境变量 `DEBUG` 为 `*`.
* `--strict-ssl`: 是能够 "Strict SSL" 模式。 默认值是false。
* `--resume`: 默认是， `windows-build-tools` 将恢复中断的下载。设置为 `false` 以禁用。
* `--sockets`: 指定一次使用的http套接字的数量(控制并发性)。默认为无穷大。
* `--vcc-build-tools-parameters`: 为Visual c++ Build Tools 2015指定其他参数。请参阅下面获得更详细的使用说明。
* `--silent`: 该脚本不会输出任何信息。
* `--vs2015`: Install the Visual Studio 2015 Build Tools instead of the Visual Studio 2017 ones.
* `--dry-run-only`: 实际上什么也不做，只打印脚本要做的事情。
* `--include-arm64-tools`: 包括为ARM64 Windows构建二进制文件所需的可选Visual Studio组件。仅支持2017年及更新的构建工具和Node.js v12及以上版本。

## 为VCC构建工具提供参数

您可以直接将附加参数传递给VCC构建工具安装程序。
这个工具没有
检查参数是否有意义——传递不正确的参数可能会破坏整体
安装。

提供参数 `windows-build-tools` 作为一个json数组.这里的快速例子 (笔记是双引号):

```
npm --vcc-build-tools-parameters='[""--allWorkloads""]' install --global windows-build-tools
```

### Visual Studio 2015 参数

如果你用 `--vs2015` 去运行 `windows-build-tools`,这里又可以用的参数:

 - `/AdminFile`: <filename> 指定安装控制文件。
 - `/CreateAdminFile`: <filename> 指定创建可随后使用的控制文件的位置
 - `/CustomInstallPath`: <path> 设置自定义安装位置。
 - `/ForceRestart`: 安装后总是重新启动系统。
 - `/Full`: 安装所有产品特性。
 - `/InstallSelectableItems`: <item1;item2;...;itemN> 选择要安装的可选项目。要安装的可选项目，只需传入这个开关，不带任何值。
 - `/Layout`: 在指定的文件夹中创建媒体的副本。
 - `/NoRefresh`: 防止安装程序检查来自internet的更新。
 - `/NoRestart`: 请勿在安装过程中或安装后重启。
 - `/NoWeb`: 防止从internet下载安装程序。
 - `/Passive`: 显示进度，但不等待用户输入。
 - `/ProductKey`: <25-character product key> 设置自定义产品密钥(无破折号)。
 - `/PromptRestart`: 重启系统前提示用户。
 - `/Repair`: 修复的产品。
 - `/Uninstall`: 卸载产品。
 - `/Uninstall /Force`: 卸载与其他产品共享的产品和功能。

### Visual Studio 2017 参数

可用的参数 [are documented here](https://docs.microsoft.com/en-us/visualstudio/install/use-command-line-parameters-to-install-visual-studio).

### 离线安装

默认情况下， `windows-build-tools` 每次都会从微软下载最新的安装程序
这是安装。
或者，您可以准备一个包含安装程序的文件夹。
他们需要
有他们原来的名字:
 * Visual Studio Build Tools: `vs_BuildTools.exe` or `BuildTools_Full.exe`
 * Python: `python-3.8.1.amd64.msi` or `python-3.8.1.msi`

Then, run `windows-build-tools` with the `--offline-installers` argument:

```ps1
npm install -g windows-build-tools --offline-installers="C:\Users\John\installers"
```

## 支持和帮助

这个包目前只处理最常见的用例，没有任何边缘用例。
如果您遇到错误，我们将非常感激[错误报告](https://github.com/felixrieseberg/windows-build-tools)(甚至拉请求)。
这是目前在Windows 10上测试的。
#### Node versions
 * `windows-build-tools` 4.0 and up require at least Node v8.
 * `windows-build-tools` 3.0 and up require at least Node v6.
 * `windows-build-tools` 1.0 and up require at least Node v4.


#### Python安装在哪里?
它保存在 `%USERPROFILE%\.windows-build-tools\python38`.

#### 以非管理员身份安装
`windows-build-tools` 如果从具有管理权限的帐户安装，效果最好。
然而,
感谢@brucejo75，可以采取以下步骤安装到不同的用户帐户:

1. 从你的非管理员帐户(例如 **\<Me\>**)运行 `cmd.exe` 。
exe”管理员。
2. 在新的命令行中设置以下环境变量:
```
set APPDATA=C:\Users\<Me>\AppData\Roaming
npm config set prefix C:\Users\<Me>\AppData\Roaming\npm
set USERNAME=<Me>
set USERPROFILE=C:\Users\<Me>
```
确保传递的变量与npm漫游数据的位置和位置相匹配
您机器上的用户配置文件。
输入 `<me>`，请输入您想要的账户的名称
安装 `windows-build-tools`。
更多信息，请参见`npm config set prefix`
描述(这里)(https://docs.npmjs.com/getting-started/fixing-npm-permissions)。

3. Run `npm install -g windows-build-tools`

## 支持的模块示例
从理论上讲， `windows-build-tools` 支持Node.js的所有纯c++插件(实际上也支持所有插件)
否则，需要在您的机器上安装本地编译器工具链)。

为了确保这是真的，我们采取了一个新的Windows 10安装，添加了 `windows-build-tools` ，和
确保最流行的本地节点插件从源代码编译。
这些都是:[node-sass](https://www.npmjs.com/package/node-sass), [bcrypt](https://www.npmjs.com/package/bcrypt), [sqlite3](https://www.npmjs.com/package/sqlite3), [serialport](https://www.npmjs.com/package/serialport), [websocket](https://www.npmjs.com/package/websocket), [deasync](https://www.npmjs.com/package/deasync), [grpc](https://www.npmjs.com/package/grpc), [canvas](https://www.npmjs.com/package/canvas), [sharp](https://www.npmjs.com/package/sharp),
[hiredis](https://www.npmjs.com/package/hiredis), [leveldown](https://www.npmjs.com/package/leveldown), [nodegit](https://www.npmjs.com/package/nodegit), [zqm](https://www.npmjs.com/package/zqm), [ffi](https://www.npmjs.com/package/ffi), [libxmljs](https://www.npmjs.com/package/libxmljs), [iconv](https://www.npmjs.com/package/iconv), [ref](https://www.npmjs.com/package/ref), [sleep](https://www.npmjs.com/package/sleep), [microtime](https://www.npmjs.com/package/microtime), [couchbase](https://www.npmjs.com/package/couchbase), [bignum](https://www.npmjs.com/package/bignum),
[kerberos](https://www.npmjs.com/package/kerberos), and [ursa](https://www.npmjs.com/package/ursa).
