# Electron请求管理员权限
## 请求管理员权限
### 1.	方案一
通过更改 `electron-builder` 中的配置。

可以通过配置**requestedExecutionLevel**达到请求管理员权限打开应用。

参数说明：
1.	asInvoker：默认配置
2.	requireAdministrator：管理员权限
3.	highestAvailable：可用的最高权限

如上述代码在electron-builder中的win选项中配置了requestedExecutionLevel，
如：requestedExecutionLevel：requireAdministrator或requestedExecutionLevel：highestAvailable。重新打包安装后，打开应用，应用会去请求管理员权限。

修改后的应用图标右下角多了个盾牌的标志。
### 2.	方案二
这个方案需要借助第三方工具，所以比较繁琐。

通过**mt.exe**程序改造应用。
#### 什么是mt.exe
mt.exe是微软官方出品的开发工具包中的一个软件。

该文件是一种生成签名文件和目录的工具。他要求清单中引用的文件与清单位于同一目录中，使用安全散列算法sha-1的cryptoAPI实现生成散列。哈希作为十六进制字符串插入到清单中的文件标签中。该工具目前仅生成sha-1哈希。

利用mt.exe修改exe中manifest.xml文件来使应用申请管理员权限。
#### 获取mt.exe
Mt.exe存在于Microsoft Windows Software Development Kit (SDK)，可以通过安装visualstudio获得。飞鸿是通过安装vs2017获得这个sdk。在vs2017的可选功能里面，找到“通用windows开发工具”中的“windows 10 SDK”，安装即可。
#### 配置环境变量
为了在所有目录下使用mt命令。

下载完后，配置环境变量，就像配置jdk一样。

找到此电脑右键——高级系统设置——环境变量——系统变量新建——将mt.exe路径存入。
#### 更改配置
执行mt命令在应用中导出现有manifest.xml文件
```
mt -inputresource:<your_exe_name>.exe;#1 -out:manifest.xml
```
在manifest.xml中找到requestedExecutionLevel节点，修改asInvoker为requireAdministrator或highestAvailable。

最后执行mt命令导入修改后的xml文件。
```
mt -manifest manifest.xml -outputresource:<your_exe_name>.exe;1
```
最后的最后，重新打包安装后，打开应用，应用会去请求管理员权限。

修改后的应用图标右下角多了个盾牌的标志。
### 3.	源码分析
追究根源是每一个热爱代码的程序员最爱的事情。

requestedExecutionLevel属性存在于winOptions文件中。

打包后在
`electron-builder/packages/app-builder-lib/src/options/winOptions.ts`中。
```js
import {
    PlatformSpecificBuildOptions,
    TargetConfigType
} from "../index"
import {
    CustomWindowsSign
} from "../codeSign/windowsCodeSign"

export interface WindowsConfiguration extends PlatformSpecificBuildOptions {
    
    /**
   * 标识要执行应用程序请求的安全级别
   * 此元素没有子元素但具有以下属性。
     标识应用程序正在请求的安全级别。 可能的值包括：

        asInvoker，不请求其他权限。 此级别不需要其他信任提示。

        highestAvailable，请求可用于父进程的最高权限。

        requireAdministrator，请求完全管理员权限。
   */
    /**
     * The [security level](https://msdn.microsoft.com/en-us/library/6ad1fshk.aspx#Anchor_9) at which the application requests to be executed.
     * Cannot be specified per target, allowed only in the `win`.
     * @default asInvoker
     */
    readonly requestedExecutionLevel ? : RequestedExecutionLevel | null
}

export type RequestedExecutionLevel = "asInvoker" | "highestAvailable" | "requireAdministrator"
```
如果需要配置window中参数达到某种功能，我们可以仔细查看其中的配置项。
```js
export interface WindowsConfiguration extends PlatformSpecificBuildOptions {
    /**
     * 指定包的类型
     */
    /**
     * The target package type: list of `nsis`, `nsis-web` (Web installer), `portable` ([portable](/configuration/nsis#portable) app without installation), `appx`, `msi`, `squirrel`, `7z`, `zip`, `tar.xz`, `tar.lz`, `tar.gz`, `tar.bz2`, `dir`.
     * AppX package can be built only on Windows 10.
     *
     * To use Squirrel.Windows please install `electron-builder-squirrel-windows` dependency.
     *
     * @default nsis
     */
    readonly target ? : TargetConfigType

    /**
     * 指定应用图标地址
     * @default build/icon.ico
     */
    readonly icon ? : string | null

    /**
     * 商标及注册商标。
     */
    readonly legalTrademarks ? : string | null
    /**
     * 使用签名算法
     */
    /**
     * Array of signing algorithms used. For AppX `sha256` is always used.
     * @default ['sha1', 'sha256']
     */
    readonly signingHashAlgorithms ? : Array < "sha1" | "sha256" > | null
    /**
     * 用于签名Windows可执行文件的自定义函数(或文件或模块id的路径)。
     */
    /**
     * The custom function (or path to file or module id) to sign Windows executable.
     */
    readonly sign ? : CustomWindowsSign | string | null
    /**
     * 签名的证书
     */
    /**
     * The path to the *.pfx certificate you want to sign with. Please use it only if you cannot use env variable `CSC_LINK` (`WIN_CSC_LINK`) for some reason.
     * Please see [Code Signing](/code-signing).
     */
    readonly certificateFile ? : string | null
    /**
     * 证书密码
     */
    /**
     * The password to the certificate provided in `certificateFile`. Please use it only if you cannot use env variable `CSC_KEY_PASSWORD` (`WIN_CSC_KEY_PASSWORD`) for some reason.
     * Please see [Code Signing](/code-signing).
     */
    readonly certificatePassword ? : string | null
    /**
     * 签名证书主题的名称。
     */
    /**
     * The name of the subject of the signing certificate. Required only for EV Code Signing and works only on Windows (or on macOS if [Parallels Desktop](https://www.parallels.com/products/desktop/) Windows 10 virtual machines exits).
     */
    readonly certificateSubjectName ? : string | null
    /**
     * 签名证书的SHA1哈希值。
     */
    /**
     * The SHA1 hash of the signing certificate. The SHA1 hash is commonly specified when multiple certificates satisfy the criteria specified by the remaining switches. Works only on Windows (or on macOS if [Parallels Desktop](https://www.parallels.com/products/desktop/) Windows 10 virtual machines exits).
     */
    readonly certificateSha1 ? : string | null
    /**
     * 要添加到签名块的附加证书文件的路径。
     */
    readonly additionalCertificateFile ? : string | null
    /**
     * The URL of the RFC 3161 time stamp server.
     * @default http://timestamp.comodoca.com/rfc3161
     */
    readonly rfc3161TimeStampServer ? : string | null
    /**
     * The URL of the time stamp server.
     * @default http://timestamp.digicert.com
     */
    readonly timeStampServer ? : string | null

    /**
     * [The publisher name](https://github.com/electron-userland/electron-builder/issues/1187#issuecomment-278972073), exactly as in your code signed certificate. Several names can be provided.
     * 默认为代码签名证书中的通用名称。
     */
    readonly publisherName ? : string | Array < string > | null

    /**
     * 安装前是否验证可用更新的签名。
     * The [publisher name](#publisherName) 将用于签名验证。
     *
     * @default true
     */
    readonly verifyUpdateCodeSignature ? : boolean

    /**
   * 标识要执行应用程序请求的安全级别
   * 此元素没有子元素但具有以下属性。
     标识应用程序正在请求的安全级别。 可能的值包括：

        asInvoker，不请求其他权限。 此级别不需要其他信任提示。

        highestAvailable，请求可用于父进程的最高权限。

        requireAdministrator，请求完全管理员权限。
   */
    /**
     * The [security level](https://msdn.microsoft.com/en-us/library/6ad1fshk.aspx#Anchor_9) at which the application requests to be executed.
     * Cannot be specified per target, allowed only in the `win`.
     * @default asInvoker
     */
    readonly requestedExecutionLevel ? : RequestedExecutionLevel | null

    /**
     * 是否将元数据签名并添加到可执行文件中。高级选项。
     * @default true
     */
    readonly signAndEditExecutable ? : boolean

    /**
     * 是否签名DLL文件。高级选项。
     * @see https://github.com/electron-userland/electron-builder/issues/3101#issuecomment-404212384
     * @default false
     */
    readonly signDlls ? : boolean
}
```
