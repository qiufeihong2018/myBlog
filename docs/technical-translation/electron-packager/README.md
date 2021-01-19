# 【Github】electron-packager说明文档
## 来源
[https://github.com/electron/electron-packager](https://github.com/electron/electron-packager)

自定义和打包 `electron` 程序用特殊的操作系统(`.app`,`.exe`,`etc.`)通过 `JS` 或 `CLI`。

## 关于
`Electron Packager` 是一个命令行工具和 `Node.js` 库，它将基于 `electron` 应用程序源代码、重命名的 `electron` 可执行文件的和支持文件打包进准备发布的文件夹中。

对于创建如安装程序和 `linux` 包这样的发行版，可以考虑用[Electron
Forge](https://github.com/electron-userland/electron-forge)(内部使用 `Electron Packager` )，或者 [相关 Electron 工具](#distributable-creators)，这些工具利用 `Electron Packager` 创建文件夹作为基础。


注意 `Electron` 应用可以相对比较大。 一个压缩的、最小的 `Electron`
程序的大小与给定的压缩预构二进制文件大致相同的平台, 目标架构, 和[Electron版本](https://github.com/electron/electron/releases)
_(files named `electron-v${version}-${platform}-${arch}.zip`)_.

## 支持的平台

`Electron Packager` 是已知运行在以下**主机**平台：

* Windows (32/64 bit)
* macOS (formerly known as OS X)
* Linux (x86/x86_64)

它为以下**目标**平台生成可执行文件/包:

* Windows (also known as `win32`, for x86, x86_64, and arm64 architectures)
* macOS (also known as `darwin`) / [Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide/) (also known as `mas`)<sup>*</sup> (for x86_64 and arm64 architectures)
* Linux (for x86, x86_64, armv7l, arm64, and mips64el architectures)

<sup>*</sup> *Note for macOS / Mac App Store target bundles: the `.app` bundle只能在主机macOS平台上构建时进行签名。*

## 安装
这个包需要 `Node.js 10.0` 或者更高的版本去运行。

```sh
# For use in npm scripts (recommended)
npm install electron-packager --save-dev

# For use from the CLI
npm install electron-packager -g
```

### 从非Windows平台构建Windows应用程序

为 `windows` 目标平台构建一款 `Electron app` 需要编辑 `Electron.exe` 文件。目前, `Electron Packager` 使用 [node-rcedit](https://github.com/atom/node-rcedit) 来完成。一个 `Windows` 可执行文件绑定在该节点包中，需要为此运行它
功能，所以在非 `windows` 主机平台上，[Wine](https://www.winehq.org/) `1.6` 或者更新的需要被安装
。 在 `macOS`, 他通过[Homebrew](http://brew.sh/)安装。

## 用法

在[API文档](https://electron.github.io/electron-packager/master/modules/electronpackager.html)中可以发现 `api` 用法。

### 命令行
运行 `electron-packager` 从命令行有以下基本形式:

```
electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]
```

这将:

- 找到或下载正确的释放 `Electron`
- 用 `Electron` 版本去创建一个 `app` 在 `<out>/<appname>-<platform>-<arch>` *(这可以通过一个可选的标志来定制)*

`--platform` 和 `--arch` 两种情况可以省略:

* 如果你指定 `-all` 代替，捆绑为所有有效的组合的目标
将创建平台/架构。
* 否则，将为主机平台/架构创建一个单独的 `bundle`。

有关其他可选标志的概述，请运行 `electron-packager --help` 或者查看
[usage.txt](https://github.com/electron/electron-packager/blob/master/usage.txt). 详细的描述, 看 [API 文档](https://electron.github.io/electron-packager/master/modules/electronpackager.html).

如果 `appname` 是被省略的, 这将使用最近的 `package.json` 中的 `productName` 或 `name` 指定的名称。

**在 `Electron app name` 的字符， 不允许在所有目标平台的文件名中出现
(例如 `/`), 将被连字符(‘-’)所取代。**

您应该能够在您构建的平台上启动应用程序。
如果没有，请检查设置并重试。

**小心** 不要去包含你不想进入你的最终的app的 `node_modules`。如果你把它们放进去
`package.json`中的“`devDependencies`”部分, 默认没有与这些相关的模块
依赖项将被复制到应用程序包中。 (此行为可以通过
“`prune: false`” `API`选项或“`——no-prune`” `CLI` 标志。)此外， 如`.git` 和
`node_modules/.bin`文件夹默认将被忽略。你可以用 `--ignore`取忽略文件和通过正则 (*not* 一个 [glob 模式](https://en.wikipedia.org/wiki/Glob_%28programming%29)).
例子包括 `--ignore=\.gitignore` or `--ignore="\.git(ignore|modules)"`.

#### 例子

假设你已经基于 [electron-quick-start](https://github.com/electron/electron-quick-start)存储库在 `macOS` 主机平台上，具有以下文件结构:

```
foobar
├── package.json
├── index.html
├── […other files, like the app's LICENSE…]
└── script.js
```

…下面是对的:

* `electron-packager` 被全局安装
* `productName` 在 `package.json` 已经被设置成 `Foo Bar`
* 这个 `electron` 已经在`package.json`的 `devDependencies`中 , 并且设置精确的版本为 `1.4.15`。
* `npm install` the `Foo Bar` 应用程序至少运行过一次

当在 `foobar` 目录中第一次运行以下命令时:

```
electron-packager .
```

`electron-packager`将完成以下工作:

* 为 `sourcedir` 作为当前目录
* 在 `package.json`中，从 `productName` 推断出 `appname`
* 在`package.json`中，从 `version` 推断出 `appVersion` 
* 从 `host` 中推断出 `platform` 和 `arch`, 在这个例子中, `darwin` 平台和 `x64` 架构。
* 下载 `darwin x64` 构建的 `Electron 1.4.15` (并将下载资料存储在 `~/.electron`)
* 构建 `macOS` `Foo Bar.app`
* 将 `Foo Bar.app` 放入 `foobar/Foo Bar-darwin-x64/` (因为没有指定 `out` 目录, 所以它使用当前工作目录)

文件结构现在是这样的:

```
foobar
├── Foo Bar-darwin-x64
│   ├── Foo Bar.app
│   │   └── […Mac app contents…]
│   ├── LICENSE [the Electron license]
│   └── version
├── […other application bundles, like "Foo Bar-win32-x64" (sans quotes)…]
├── package.json
├── index.html
├── […other files, like the app's LICENSE…]
└── script.js
```

生成的文件夹 `Foo Bar.app` 可以由系统执行 `macOS` 运行， 这将启动包装 `Electron` 应用。 这也是真正的 ` Windows x64` 新建系统上运行一个足够为一个 `64` 位版本的 `Windows` 系统(通过 `Foo Bar-win32-x64/Foo Bar.exe`)等等。

## 有关

- [Electron Forge](https://github.com/electron-userland/electron-forge) - 创建、构建和分发现代 `Electron` 应用程序
- [electron-packager-interactive](https://github.com/Urucas/electron-packager-interactive) - electron-packager的交互式CLI
- [grunt-electron](https://github.com/sindresorhus/grunt-electron) - electron-packager的 `grunt` 插件

### 可分配的创造者

* [electron-installer-zip](https://github.com/electron-userland/electron-installer-zip) - 创建与符号链接兼容的 `ZIP` 文件

Windows:

* [electron-winstaller](https://github.com/electron/windows-installer) - Squirrel. 来自于 `Electron` 维护组的windows的安装程序
* [electron-windows-store](https://github.com/felixrieseberg/electron-windows-store) - 为Windows存储创建一个AppX包
* [electron-wix-msi](https://github.com/felixrieseberg/electron-wix-msi) - 创建传统的MSI安装程序
* [electron-installer-windows](https://github.com/electron-userland/electron-installer-windows) - 替代的 Squirrel.windows安装程序

macOS:

* [electron-installer-dmg](https://github.com/electron-userland/electron-installer-dmg) - 创建一个 `DMG`

Linux:

* [electron-installer-debian](https://github.com/electron-userland/electron-installer-debian) - 创建一个 `DEB` 文件
* [electron-installer-redhat](https://github.com/electron-userland/electron-installer-redhat) - 创建一个 `RPM`
* [electron-installer-flatpak](https://github.com/endlessm/electron-installer-flatpak) - 创建一个 `Flatpak` 文件
* [electron-installer-snap](https://github.com/electron-userland/electron-installer-snap) - 创建一个 `Snap` 文件

### 插件

些节点模块利用了 `Electron Packager API` 钩子:

- [electron-packager-languages](https://npm.im/electron-packager-languages) - 设置语言环境，包装后可供 `Electron` 使用，在 `Mac` 应用商店和其他地方使用
- [electron-packager-plugin-non-proprietary-codecs-ffmpeg](https://www.npmjs.com/package/electron-packager-plugin-non-proprietary-codecs-ffmpeg) - 用一个没有专有编解码器的版本代替 `Electron` 中的正常版本的 `FFmpeg`
- [electron-rebuild](https://github.com/electron/electron-rebuild) - 重建本地 `Node.js` 模块
相对于包装 `Electron` 版本
