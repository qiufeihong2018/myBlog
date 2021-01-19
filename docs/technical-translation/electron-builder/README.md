# 【Github】electron-builder说明文档
## electron-builder Publish
publish键包含一组选项，指导electron-builder如何发布工件并构建用于 auto update的更新信息文件。

String | Object | Array<Object | String> 其中对象是Bintray, Generic Server, GitHub, S3, Spaces or Snap Store存储选项。订单很重要——第一项将用作默认的自动更新服务器。可以在顶级配置或任何平台(mac, linux, win)或目标(如nsis)的特定配置中指定。

Travis和AppVeyor支持发布构件。但是它需要为每个CI进行额外的配置，您需要配置要发布的内容。electron-builder使出版变得非常简单。

If GH_TOKEN is defined — defaults to [{provider: "github"}].

If BT_TOKEN is defined and GH_TOKEN is not — defaults to [{provider: "bintray"}].

临时存储

snap目标默认发布到snap store (Linux的应用程序商店)。要强制发布到其他提供程序，显式地为snap指定发布配置。
可以发布到多个提供程序。例如，将Windows工件发布到GitHub和Bintray(顺序很重要——第一项将用作默认的自动更新服务器，因此，在本例中app将使用GitHub作为auto-update提供者):

package.json
{
  "build": {
    "win": {
      "publish": ["github", "bintray"]
    }
  }
}
您还可以使用CLI参数配置发布，例如，强制publishing snap not to Snap Store, but to GitHub: -c.snap.publish=github

如果需要，可以使用自定义发布提供程序。 Macros

In all publish options File Macros are supported.

How to Publish¶ Excerpt from CLI Usage of electron-builder command:

Publishing: --publish, -p [choices: "onTag", "onTagOrDraft", "always", "never"] CLI --publish option values: Value	Description onTag	on tag push only onTagOrDraft	on tag push or if draft release exists always always publish never	never publish But please consider using automatic rules instead of explicitly specifying publish:

If CI server detected, — onTagOrDraft.

If CI server reports that tag was pushed, — onTag.

Release will be drafted (if doesn’t already exist) and artifacts published only if tag was pushed.

If npm script named release, — always. Add to scripts in the development package.json:

package.json "release": "build" and if you run yarn release, a release will be drafted (if doesn’t already exist) and artifacts published.

推荐GitHub发布工作流

Draft a new release. Set the “Tag version” to the value of version in your application package.json, and prefix it with v. “Release title” can be anything you want.

For example, if your application package.json version is 1.0, your draft’s “Tag version” would be v1.0.

Push some commits. Every CI build will update the artifacts attached to this draft.

Once you are done, publish the release. GitHub will tag the latest commit for you. The benefit of this workflow is that it allows you to always have the latest artifacts, and the release can be published once it is ready.

Amazon S3和其他非github上的连续部署工作流

This example workflow is modelled on how releases are handled in maven (it is an example of one of many possible workflows, you are not forced to follow it).

Setup your CI to publish on each commit. E.g. "dist": "electron-builder --publish always" in your package.json. Set your version in your application package.json to 1.9.0-snapshot (or 1.9.0-master or whatever you want your development channel to be named). This will publish a file named snapshot.yml and a build named something-snapshot.exe (and corresponding for mac) to S3. When you are ready to deploy, simply change you package version to 1.9.0 and push. This will then produce a latest.yml and something.exe on s3. Usually you’ll git-tag this version as well (just to keep track of it). Change the version back to a snapshot version right after, i.e. 1.10.0-snapshot, and commit it.

GitHub存储库和Bintray包

Detected automatically using:

repository in the application or development package.json, if not set, env TRAVIS_REPO_SLUG or APPVEYOR_REPO_NAME or CIRCLE_PROJECT_USERNAME/CIRCLE_PROJECT_REPONAME, if no env, from .git/config origin url.

BintrayOptions

Bintray options. 需要API密钥。API密钥可以从用户配置文件页面获得 (“Edit Your Profile” -> API Key). Define BT_TOKEN environment variable.

provider “bintray” - The provider. Must be bintray.

package String - The Bintray package name.

repo = generic String - The Bintray repository name.

owner String - The owner. component String - The Bintray component (Debian only).

distribution = stable String - The Bintray distribution (Debian only).

user String - The Bintray user account. Used in cases where the owner is an organization.

token String Inherited from PublishConfiguration:

publishAutoUpdate = true Boolean - Whether to publish auto update info files.

自动更新只依赖于列表中的第一个提供程序(您可以指定多个发布程序)。因此，可能不需要为其他配置的提供程序上传元数据文件。但默认情况下会被上传。

GenericServerOptions¶

Generic (any HTTP(S) server) options. In all publish options File Macros are supported.

provider “generic” - The provider. Must be generic. url String - The base url. e.g. https://bucket_name.s3.amazonaws.com. channel = latest String - The channel. useMultipleRangeRequest Boolean - Whether to use multiple range requests for differential update. Defaults to true if url doesn’t contain s3.amazonaws.com. Inherited from PublishConfiguration:

publishAutoUpdate = true Boolean - Whether to publish auto update info files.

自动更新只依赖于列表中的第一个提供程序(您可以指定多个发布程序)。因此，可能不需要为其他配置的提供程序上传元数据文件。但默认情况下会被上传。roviders. But by default will be uploaded.

GithubOptions¶

GitHub options.

GitHub personal access token is required. You can generate by going to https://github.com/settings/tokens/new. The access token should have the repo scope/permission. Define GH_TOKEN environment variable.

provider “github” - The provider. Must be github. repo String - The repository name. Detected automatically. owner String - The owner. vPrefixedTagName = true Boolean - Whether to use v-prefixed tag name. host = github.com String - The host (including the port if need). protocol = https “https” | “http” - The protocol. GitHub Publisher supports only https. token String - The access token to support auto-update from private github repositories. Never specify it in the configuration files. Only for setFeedURL. private Boolean - Whether to use private github auto-update provider if GH_TOKEN environment variable is defined. See Private GitHub Update Repo. releaseType = draft “draft” | “prerelease” | “release” - The type of release. By default draft release will be created.

Also you can set release type using environment variable. If EP_DRAFTis set to true — draft, if EP_PRE_RELEASEis set to true — prerelease.

Inherited from PublishConfiguration:

publishAutoUpdate = true Boolean - Whether to publish auto update info files.

Auto update relies only on the first provider in the list (you can specify several publishers). Thus, probably, there`s no need to upload the metadata files for the other configured providers. But by default will be uploaded.

S3Options¶ Amazon S3 options.

AWS credentials are required, please see getting your credentials. Define AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables. Or in the ~/.aws/credentials.

Example configuration:

package.json { "build": "publish": { "provider": "s3", "bucket": "bucket-name" } } } provider “s3” - The provider. Must be s3. bucket String - The bucket name. region String - The region. Is determined and set automatically when publishing. acl = public-read “private” | “public-read” - The ACL. Set to null to not add.

Please see required permissions for the S3 provider.

storageClass = STANDARD “STANDARD” | “REDUCED_REDUNDANCY” | “STANDARD_IA” - The type of storage to use for the object.

encryption “AES256” | “aws:kms” - Server-side encryption algorithm to use for the object. endpoint String - The endpoint URI to send requests to. The default endpoint is built from the configured region. The endpoint should be a string like https://{service}.{region}.amazonaws.com. channel = latest String - The update channel. path = / String - The directory path. SpacesOptions¶ DigitalOcean Spaces options. Access key is required, define DO_KEY_ID and DO_SECRET_KEY environment variables.

provider “spaces” - The provider. Must be spaces. name String - The space name. region String - The region (e.g. nyc3). channel = latest String - The update channel. path = / String - The directory path. acl = public-read “private” | “public-read” - The ACL. Set to null to not add. SnapStoreOptions¶ Snap Store options.

channels = ["edge"] String | Array<String> - The list of channels the snap would be released.
## electron-builder Squirrel.Windows
顶层的 squirrelWindows 键包含一组选项，指示 electron-builder 应该如何构建 Squirrel.Windows。 Squirrel.Windows 目标被维护，但不推荐使用。请用nsis代替。

使用Squirrel.Windows请安装electron-builder-squirrel-windows依赖。为Squirrel.Window建造在macOS上，请安装mono (brew安装mono)。

iconUrl String - 一个ICO文件的URL， 用作应用程序图标(显示在控制面板>程序和特性中)。默认为 Electron icon.
请注意-本地图标文件url不被接受，必须是https/http。

如果你不打算构建windows安装程序，你可以忽略它。如果你的项目存储库在GitHub上是公开的，它就会是https://github.com/${u}/${p}/blob/master/build/icon.ico?raw=true。

loadingGif String - 安装期间要显示的.gif文件的路径。如果存在，将使用build/install-spinner.gif(这是一种推荐的设置方式)(否则为default)。
msi Boolean - 是否创建一个MSI安装程序。默认值为false(不创建MSI)。
remoteReleases String | Boolean - 指向您现有更新的URL。或true自动设置为GitHub存储库。如果给定，将下载这些文件来创建delta更新。
remoteToken String - 远程更新的身份验证令牌
useAppIdAsId Boolean - 使用appId来标识包而不是名称。
从TargetSpecificOptions继承:

artifactName String - 工件文件名模板。
publish 发布选项。
## electron-builder Common Configuration
electron-builder configuration can be defined

in the package.json file of your project using the build key on the top level: "build": { "appId": "com.example.app" } or through the --config <path/to/yml-or-json5-or-toml-or-js> option. Defaults to electron-builder.yml.

appId: "com.example.app" json, json5, toml or js (exported configuration or function that produces configuration) formats also supported.

Tip

If you want to use toml, please install yarn add toml --dev.

大多数选项接受null -例如，显式设置DMG图标必须是OS的默认卷图标和默认规则必须不应用(即使用应用程序图标作为DMG图标)，设置 dmg.icon为null。

工件文件名模板

${ext} macro is supported in addition to file macros.

文件中的环境变量

Env file electron-builder.env in the current dir (example). Supported only for CLI usage.

How to Read Docs¶

Name of optional property is normal, required is bold. Type is specified after property name: Array<String> | String. Union like this means that you can specify or string (/), or array of strings (["/", "!foo.js"]).

Configuration¶

appId = com.electron.${name} String - 应用程序id。在MacOS中用作CFBundleIdentifier，在Windows中用作应用程序用户模型id(仅NSIS目标，Squirrel.Windows不支持)。强烈建议设置显式ID。
productName String - 作为名称，但允许您为可执行文件指定产品名称，其中包含name属性中不允许的空格和其他特殊字符。
copyright = Copyright © year ${author} String - 人类可读的应用程序版权行。
buildResources = build String - The path to build resources.

Please note — build resources is not packed into the app. If you need to use some files, e.g. as tray icon, please include required files explicitly: "files": ["/", "build/icon."]

output = dist String - The output directory. File macros are supported.

app String - The application directory (containing the application package.json), defaults to app, www or working directory. mac MacConfiguration - Options related to how build macOS targets. mas MasConfiguration - MAS (Mac Application Store) options. dmg DmgOptions - macOS DMG options. pkg PkgOptions - macOS PKG options. win WindowsConfiguration - Options related to how build Windows targets. nsis NsisOptions nsisWeb - Web Installer options. Inherits NsisOptions options.

appPackageUrl String - The application package download URL. Optional — by default computed using publish configuration.

URL like https://example.com/download/latest allows web installer to be version independent (installer will download latest application package). Please note — it is full URL.

Custom X-Arch http header is set to 32 or 64.

artifactName String - The artifact file name template. Defaults to ${productName} Web Setup ${version}.${ext}.

portable - Portable options. requestExecutionLevel = user “user” | “highest” | “admin” - The requested execution level for Windows. unpackDirName String - The unpack directory name in TEMP directory.

Defaults to uuid of build (changed on each build of portable executable).

appx AppXOptions

squirrelWindows SquirrelWindowsOptions linux LinuxConfiguration - Options related to how build Linux targets. deb DebOptions - Debian package options. snap SnapOptions - Snap options. appImage AppImageOptions - AppImage options. pacman LinuxTargetSpecificOptions rpm LinuxTargetSpecificOptions freebsd LinuxTargetSpecificOptions p5p LinuxTargetSpecificOptions apk LinuxTargetSpecificOptions buildDependenciesFromSource = false Boolean - Whether to build the application native dependencies from source. nodeGypRebuild = false Boolean - Whether to execute node-gyp rebuild before starting to package the app.

Don’t use npm (neither .npmrc) for configuring electron headers. Use electron-builder node-gyp-rebuild instead.

npmArgs Array<String> | String - Additional command line arguments to use when installing app native deps.

npmRebuild = true Boolean - Whether to rebuild native dependencies before starting to package the app. buildVersion String - The build version. Maps to the CFBundleVersion on macOS, and FileVersion metadata property on Windows. Defaults to the version. If TRAVIS_BUILD_NUMBER or APPVEYOR_BUILD_NUMBER or CIRCLE_BUILD_NUM or BUILD_NUMBER or bamboo.buildNumber or CI_PIPELINE_IID env defined, it will be used as a build version (version.build_number). electronCompile Boolean - Whether to use electron-compile to compile app. Defaults to true if electron-compile in the dependencies. And false if in the devDependencies or doesn’t specified. electronDist String - The path to custom Electron build (e.g. ~/electron/out/R). electronDownload - The electron-download options. version String cache String - The cache location. mirror String - The mirror. strictSSL Boolean isVerifyChecksum Boolean platform “darwin” | “linux” | “win32” | “mas” arch String electronVersion String - The version of electron you are packaging for. Defaults to version of electron, electron-prebuilt or electron-prebuilt-compile dependency. extends String - The name of a built-in configuration preset or path to config file (relative to project dir). Currently, only react-cra is supported.

If react-scripts in the app dependencies, react-cra will be set automatically. Set to null to disable automatic detection.

extraMetadata any - Inject properties to package.json.

readonly = false Boolean - Whether to fail if the application is not signed (to prevent unsigned app if code signing configuration is not correct). nodeVersion String - libui-based frameworks only The version of NodeJS you are packaging for. You can set it to current to set the Node.js version that you use to run. launchUiVersion Boolean | String - libui-based frameworks only The version of LaunchUI you are packaging for. Applicable for Windows only. Defaults to version suitable for used framework version. framework String - The framework name. One of electron, proton-native, libui. Defaults to electron. afterPack - The function (or path to file or module id) to be run after pack (but before pack into distributable format and sign). afterSign - The function (or path to file or module id) to be run after pack and sign (but before pack into distributable format). artifactBuildStarted module:app-builder-lib/out/configuration.__type | String - The function (or path to file or module id) to be run on artifact build start. artifactBuildCompleted module:app-builder-lib/out/configuration.__type | String - The function (or path to file or module id) to be run on artifact build completed. afterAllArtifactBuild - The function (or path to file or module id) to be run after all artifacts are build. onNodeModuleFile - The function (or path to file or module id) to be run on each node module file. beforeBuild (context: BeforeBuildContext) => Promise | null - The function (or path to file or module id) to be run before dependencies are installed or rebuilt. Works when npmRebuild is set to true. Resolving to false will skip dependencies install or rebuild.

If provided and node_modules are missing, it will not invoke production dependencies check.

remoteBuild = true Boolean - Whether to build using Electron Build Service if target not supported on current OS. includePdb = false Boolean - Whether to include PDB files. removePackageScripts = true Boolean - Whether to remove scripts field from package.json files. Overridable per Platform Options¶ Following options can be set also per platform (top-level keys mac, linux and win) if need.

appId = com.electron.${name} String - The application id. Used as CFBundleIdentifier for MacOS and as Application User Model ID for Windows (NSIS target only, Squirrel.Windows not supported). It is strongly recommended that an explicit ID is set. artifactName String - The artifact file name template. Defaults to ${productName}-${version}.${ext} (some target can have other defaults, see corresponding options). compression = normal “store” | “normal” | “maximum” - The compression level. If you want to rapidly test build, store can reduce build time significantly. maximum doesn’t lead to noticeable size difference, but increase build time. files The files configuration. extraResources The extra resources configuration. extraFiles The extra files configuration. asar = true AsarOptions | Boolean - Whether to package the application’s source code into an archive, using Electron’s archive format.

Node modules, that must be unpacked, will be detected automatically, you don’t need to explicitly set asarUnpack - please file an issue if this doesn’t work.

smartUnpack = true Boolean - Whether to automatically unpack executables files. ordering String asarUnpack Array<String> | String - A glob patterns relative to the app directory, which specifies which files to unpack when creating the asar archive. fileAssociations Array<FileAssociation> | FileAssociation - The file associations.

ext String | Array<String> - The extension (minus the leading period). e.g. png. name String - The name. e.g. PNG. Defaults to ext. description String - windows-only. The description. mimeType String - linux-only. The mime-type. icon String - The path to icon (.icns for MacOS and .ico for Windows), relative to build (build resources directory). Defaults to ${firstExt}.icns/${firstExt}.ico (if several extensions specified, first is used) or to application icon.

Not supported on Linux, file issue if need (default icon will be x-office-document).

role = Editor String - macOS-only The app’s role with respect to the type. The value can be Editor, Viewer, Shell, or None. Corresponds to CFBundleTypeRole.

isPackage Boolean - macOS-only Whether the document is distributed as a bundle. If set to true, the bundle directory is treated as a file. Corresponds to LSTypeIsPackage. protocols Array<Protocol> | Protocol - The URL protocol schemes. name String - The name. e.g. IRC server URL. schemes Array<String> - The schemes. e.g. ["irc", "ircs"]. role = Editor “Editor” | “Viewer” | “Shell” | “None” - macOS-only The app’s role with respect to the type. forceCodeSigning Boolean - Whether to fail if app will be not code signed. electronUpdaterCompatibility String - The electron-updater compatibility semver range. publish The publish options. detectUpdateChannel = true Boolean - Whether to infer update channel from application version pre-release components. e.g. if version 0.12.1-alpha.1, channel will be set to alpha. Otherwise to latest. generateUpdatesFilesForAllChannels = false Boolean - Please see Building and Releasing using Channels. releaseInfo - The release info. Intended for command line usage:

-c.releaseInfo.releaseNotes="new features"

releaseName String - The release name. releaseNotes String - The release notes. releaseNotesFile String - The path to release notes file. Defaults to release-notes-${platform}.md (where platform it is current platform — mac, linux or windows) or release-notes.md in the build resources. releaseDate String - The release date. target String | TargetConfiguration Metadata¶ Some standard fields should be defined in the package.json.

name String - The application name. description String - The application description. homepage String - The url to the project homepage (NuGet Package projectUrl (optional) or Linux Package URL (required)).

If not specified and your project repository is public on GitHub, it will be https://github.com/${user}/${project} by default.

license String - linux-only. The license name.

author name String email String repository String | RepositoryInfo - The repository. url String build Configuration - The electron-builder configuration. Proton Native¶ To package Proton Native app, set protonNodeVersion option to current or specific NodeJS version that you are packaging for. Currently, only macOS and Linux supported.

Build Version Management¶ CFBundleVersion (macOS) and FileVersion (Windows) will be set automatically to version.build_number on CI server (Travis, AppVeyor, CircleCI and Bamboo supported).

Hooks¶ Node.js 8

All examples assumed that you use latest Node.js 8.11.x or higher.

afterPack¶ The function (or path to file or module id) to be run after pack (but before pack into distributable format and sign).

(context: AfterPackContext): Promise<any> | any As function

afterPack: async (context) => { // your code } Because in a configuration file you cannot use JavaScript, can be specified as a path to file or module id. Function must be exported as default export.

"build": { "afterPack": "./myAfterPackHook.js" } File myAfterPackHook.js in the project root directory:

myAfterPackHook.js

exports.default = async function(context) { // your custom code } afterSign¶ The function (or path to file or module id) to be run after pack and sign (but before pack into distributable format).

(context: AfterPackContext): Promise<any> | any Configuration in the same way as afterPack (see above).

afterAllArtifactBuild¶ The function (or path to file or module id) to be run after all artifacts are built.

(buildResult: BuildResult): Promise<Array<string>> | Array<string> Configuration in the same way as afterPack (see above).

myAfterAllArtifactBuild.js

exports.default = function () { // you can return additional files to publish return ["/path/to/additional/result/file"] } onNodeModuleFile¶ The function (or path to file or module id) to be run on each node module file.

(file: string) => void Configuration in the same way as afterPack (see above).

AfterPackContext¶ interface AfterPackContext { outDir: string appOutDir: string packager: PlatformPackager<any> electronPlatformName: string arch: Arch targets: Array<Target> } BuildResult¶ interface BuildResult { outDir: string artifactPaths: Array<string> platformToTargets: Map<Platform, Map<string, Target>> configuration: Configuration }

## electron-builder Any Windows Target
键包含指示 electron-builder 如何构建Windows目标的一组选项。这些选项适用于任何Windows目标。

target = nsis String | TargetConfiguration - The target package type: list of nsis, nsis-web (Web installer), portable (portable app without installation), appx, msi, squirrel, 7z, zip, tar.xz, tar.lz, tar.gz, tar.bz2, dir. AppX package can be built only on Windows 10.
To use Squirrel.Windows please install electron-builder-squirrel-windows dependency.

icon = build/icon.ico String - The path to application icon.

legalTrademarks String - 商标及注册商标

signingHashAlgorithms = ['sha1', 'sha256'] Array<“sha1” | “sha256”> - 使用的签名算法数组。对于AppX sha256总是被使用。

sign String |可执行文件的自定义函数(或文件或模块id的路径)。

certificateFile String - The path to the *.pfx certificate you want to sign with. Please use it only if you cannot use env variable CSC_LINK (WIN_CSC_LINK) for some reason. 请参阅代码签名。

certificatePassword String - The password to the certificate provided in certificateFile. Please use it only if you cannot use env variable CSC_KEY_PASSWORD (WIN_CSC_KEY_PASSWORD) for some reason. 请参阅代码签名。

certificateSubjectName String - The name of the subject of the signing certificate. Required only for EV Code Signing and works only on Windows (or on macOS if Parallels Desktop Windows 10 virtual machines exits).

certificateSha1 String - The SHA1 hash of the signing certificate. The SHA1 hash is commonly specified when multiple certificates satisfy the criteria specified by the remaining switches. Works only on Windows (or on macOS if Parallels Desktop Windows 10 virtual machines exits). additionalCertificateFile String -要添加到签名块的其他证书文件的路径。

rfc3161TimeStampServer = http://timestamp.comodoca.com/rfc3161 String - RFC 3161时间戳服务器的URL。

timeStampServer = http://timestamp.digicert.com String - 时间戳服务器的URL。

publisherName String | Array<String> - The publisher name, 完全像在你的代码签名证书。可以提供几个名字。默认为代码签名证书中的通用名称。

verifyUpdateCodeSignature = true Boolean - 安装前是否验证可用更新的签名。发布者名称将用于签名验证。

requestedExecutionLevel = asInvoker “asInvoker” | “highestAvailable” | “requireAdministrator” - 应用程序请求执行的安全级别。不能指定每个目标，只允许在win。

signAndEditExecutable = true Boolean - 是否签名并将元数据添加到可执行文件。高级选项。

signDlls = false Boolean - Whether to sign DLL files. Advanced option. See: https://github.com/electron-userland/electron-builder/issues/3101#issuecomment-404212384 And all common platform-specific options.

Common Questions¶

如何进行委托代码签名?

Use sign option. Please also see why sign.js is called 8 times.

"win": { "sign": "./customSign.js" } File customSign.js in the project root directory:

exports.default = async function(configuration) { // your custom code }

How do create Parallels Windows 10 Virtual Machine?¶

Disable “Share Mac user folders with Windows”

If you use Parallels, you must not use “Share Mac user folders with Windows” feature and must not run installers from such folders.

You don’t need to have Windows 10 license. Free is provided (expire after 90 days, but it is not a problem because no additional setup is required).

Open Parallels Desktop. File -> New. Select “Modern.IE” in the “Free Systems”. Continue, Continue, Accept software license agreement. Select “Microsoft Edge on Windows 10”. The next steps are general, see Installing Windows on your Mac using Parallels Desktop from “Step 6: Specify a name and location”. Parallels Windows 10 VM will be used automatically to build AppX on macOS. No need even start VM — it will be started automatically on demand and suspended after build. No need to specify VM — it will be detected automatically (first Windows 10 VM will be used).

How do create VirtualBox Windows 10 Virtual Machine?¶ If you are not on macOS or don’t want to buy Parallels Desktop, you can use free VirtualBox.

Open Download virtual machines. Select “MSEdge on Win10 (x64) Stable”. Select “VirtualBox” platform. Download. See installation instructions. The password to your VM is Passw0rd!.

VirtualBox is not supported by electron-builder for now, so, you need to setup build environment on Windows if you want to use VirtualBox to build AppX (and other Windows-only tasks).
## electron-builder NSIS
顶级nsis键包含一组选项，指示electron-builder如何构建nsis目标(Windows的默认目标)。

这些选项也适用于Web安装程序，使用顶级nsisWeb密钥。

oneClick = true Boolean - 是创建一键安装程序还是辅助安装程序。
perMachine = false Boolean - 是否为辅助安装程序显示安装模式安装程序页(选择每台计算机或每用户)。或者是否总是按所有用户(每台机器)安装。
If oneClick is true (default): Whether to install per all users (per-machine).

If oneClick is false and perMachine is true: no install mode installer page, always install per-machine.

If oneClick is false and perMachine is false (default): install mode installer page.

allowElevation = true Boolean - 协助安装。允许申请提升。如果为false，用户将不得不以提升的权限重启安装程序。

allowToChangeInstallationDirectory = false Boolean - 协助安装。是否允许用户更改安装目录。

installerIcon String - The path to installer icon, relative to the build resources or to the project directory. Defaults to build/installerIcon.ico or application icon. uninstallerIcon String - The path to uninstaller icon, relative to the build resources or to the project directory. Defaults to build/uninstallerIcon.ico or application icon.

installerHeader = build/installerHeader.bmp String - assisted installer only. MUI_HEADERIMAGE, relative to the build resources or to the project directory.

installerHeaderIcon String - one-click installer only. The path to header icon (above the progress bar), relative to the build resources or to the project directory. Defaults to build/installerHeaderIcon.ico or application icon.

installerSidebar String - assisted installer only. MUI_WELCOMEFINISHPAGE_BITMAP, relative to the build resources or to the project directory. Defaults to build/installerSidebar.bmp or ${NSISDIR}\Contrib\Graphics\Wizard\nsis3-metro.bmp. Image size 164 × 314 pixels.

uninstallerSidebar String - assisted installer only. MUI_UNWELCOMEFINISHPAGE_BITMAP, relative to the build resources or to the project directory. Defaults to installerSidebar option or build/uninstallerSidebar.bmp or build/installerSidebar.bmp or ${NSISDIR}\Contrib\Graphics\Wizard\nsis3-metro.bmp

uninstallDisplayName = ${productName} ${version} String -卸载程序在控制面板中显示名称。

include String - ：NSIS的路径包括自定义安装程序的脚本。Defaults to build/installer.nsh. See Custom NSIS - script. script String - The path to NSIS script to customize installer. Defaults to build/installer.nsi. See Custom NSIS script.

license String - The path to EULA license file. Defaults to license.txt or eula.txt (or uppercase variants). In addition to txt,rtfandhtmlsupported (don't forget to usetarget=”_blank”` for links).

支持不同语言的多个许可证文件 — use lang postfix (e.g. _de, _ru)). For example, create files license_de.txt and license_en.txt in the build resources. If OS language is german, license_de.txt will be displayed. See map of language code to name.

将根据用户操作系统语言选择适当的许可证文件。

artifactName String -工件文件名模板。Defaults to ${productName} Setup ${version}.${ext}.

deleteAppDataOnUninstall = false Boolean - one-click installer only.卸载时是否删除app数据

differentialPackage Boolean - Defaults to true for 安装程序(nsis-web)

displayLanguageSelector = false Boolean - 是否显示语言选择对话框。不推荐(默认情况下使用OS语言检测)。

installerLanguages Array<String> | String - The installer languages (e.g. en_US, de_DE). 只有当你明白你要做什么，为什么而改变。

language String - LCID Dec, defaults to 1033(English - United States).

multiLanguageInstaller Boolean - Whether to create multi-language installer. Defaults to unicode option value.

packElevateHelper = true Boolean - true.是否打包elevate可执行文件(如果使用每台机器安装程序，electron-updater 就需要，或者将来可以使用)。如果perMachine设置为真，则忽略。

preCompressedFileExtensions = [".avi", ".mov", ".m4v", ".mp4", ".m4p", ".qt", ".mkv", ".webm", ".vmdk"] Array<String> | String - files.未压缩文件的文件扩展名。只适用于extraResources and extraFiles

unicode = true Boolean - Whether to create Unicode installer.

guid String - See GUID vs Application Name.

warningsAsErrors = true Boolean - If warningsAsErrors is true (default): NSIS will treat warnings as errors. If warningsAsErrors is false: NSIS will allow warnings.

runAfterFinish = true Boolean - 完成后是否运行已安装的应用程序。对于辅助安装程序，相应的复选框将被删除。

createDesktopShortcut = true Boolean | “always” - 是否创建桌面快捷方式。设置为always，重新安装时也要重新创建(即使被用户删除)。

createStartMenuShortcut = true Boolean - 是否创建开始菜单快捷方式。

menuCategory = false Boolean | String - 是否为开始菜单快捷方式和程序文件目录创建子菜单。如为真，将使用公司名称。或字符串值。

shortcutName String - The name that will be used for all shortcuts. Defaults to the application name. Inherited from TargetSpecificOptions:

artifactName String - The artifact file name template.

publish The publish options. Unicode enabled by default. Large strings are supported (maximum string length of 8192 bytes instead of the default of 1024 bytes).

32 bit + 64 bit¶ If you build both ia32 and x64 arch (--x64 --ia32), you in any case get one installer. Appropriate arch will be installed automatically. The same applied to web installer (nsis-web target).

Web Installer¶ To build web installer, set target to nsis-web. Web Installer automatically detects OS architecture and downloads corresponding package file. So, user don’t need to guess what installer to download and in the same time you don’t bundle package files for all architectures in the one installer (as in case of default nsis target). It doesn’t matter for common Electron application (due to superb LZMA compression, size difference is acceptable), but if your application is huge, Web Installer is a solution.

To customize web installer, use the top-level nsisWeb key (not nsis).

If for some reasons web installer cannot download (antivirus, offline):

Download package file into the same directory where installer located. It will be detected automatically and used instead of downloading from the Internet. Please note — only original package file is allowed (checksum is checked). Specify any local package file using --package-file=path_to_file. Custom NSIS script¶ Two options are available — include and script. script allows you to provide completely different NSIS script. For most cases it is not required as you need only to customise some aspects, but still use well-tested and maintained default NSIS script. So, include is recommended.

Keep in mind — if you customize NSIS script, you should always state about it in the issue reports. And don’t expect that your issue will be resolved.

Add file build/installer.nsh. Define wanted macro to customise: customHeader, preInit, customInit, customUnInit, customInstall, customUnInstall, customRemoveFiles, customInstallMode.

Example

!macro customHeader !system "echo '' > ${BUILD_RESOURCES_DIR}/customHeader" !macroend

!macro preInit ; This macro is inserted at the beginning of the NSIS .OnInit callback !system "echo '' > ${BUILD_RESOURCES_DIR}/preInit" !macroend

!macro customInit !system "echo '' > ${BUILD_RESOURCES_DIR}/customInit" !macroend

!macro customInstall !system "echo '' > ${BUILD_RESOURCES_DIR}/customInstall" !macroend

!macro customInstallMode

set $isForceMachineInstall or $isForceCurrentInstall

to enforce one or the other modes.

!macroend BUILD_RESOURCES_DIR and PROJECT_DIR are defined.

build is added as addincludedir (i.e. you don’t need to use BUILD_RESOURCES_DIR to include files). build/x86-unicode and build/x86-ansi are added as addplugindir. File associations macro registerFileAssociations and unregisterFileAssociations are still defined. All other electron-builder specific flags (e.g. ONE_CLICK) are still defined. Is there a way to call just when the app is installed (or uninstalled) manually and not on update? GUID vs Application Name¶ Windows requires to use registry keys (e.g. INSTALL/UNINSTALL info). Squirrel.Windows simply uses application name as key. But it is not robust — Google can use key Google Chrome SxS, because it is a Google.

So, it is better to use GUID. You are not forced to explicitly specify it — name-based UUID v5 will be generated from your appId or name. It means that you should not change appId once your application in use (or name if appId was not set). Application product name (title) or description can be safely changed.

You can explicitly set guid using option nsis.guid, but it is not recommended — consider using appId.

It is also important to set the Application User Model ID (AUMID) to the appId of the application, in order for notifications on Windows 8/8.1 to function and for Window 10 notifications to display the app icon within the notifications by default. The AUMID should be set within the Main process and before any BrowserWindows have been opened, it is normally the first piece of code executed: app.setAppUserModelId(appId)

Portable¶ To build portable app, set target to portable (or pass --win portable).

For portable app, following environment variables are available:

PORTABLE_EXECUTABLE_DIR - dir where portable executable located. PORTABLE_EXECUTABLE_APP_FILENAME - sanitized app name to use in file paths. Common Questions¶ How do change the default installation directory to custom? Is it possible to made single installer that will allow configuring user/machine installation?