# Electron控制应用是否更新
## 更新需要提示用户，需要控制应用是否更新
### 1.	方案一
在检测到更新后提示用户，让用户选择更新。

设置autoDownload参数为false，让应用检测到更新不自动下载，改成手动下载更新包。

通过在钩子update-available中，加入对话框提示用户，让用户选择。

response为0用户选择确定，触发downloadUpdate方法下载应用更新包进行后续更新操作。否则，不下载更新包。

如果我们不配置autoDownload为false，那么问题来了：在弹出对话框的同时，用户还来不及选择，应用自动下载并且更新完成，做不到阻塞。

重要代码如下：
```js
autoUpdater.autoDownload = false
```
在**update-available**钩子中弹出对话框
```js
autoUpdater.on('update-available', (ev, info) => {
  // // 不可逆过程
  const options = {
    type: 'info',
    buttons: ['确定', '取消'],
    title: '更新提示',
    // ${info.version} Cannot read property 'version' of undefined
    message: '发现有新版本，是否更新？',
    cancelId: 1
  }
  dialog.showMessageBox(options).then(res => {
    if (res.response === 0) {
      autoUpdater.downloadUpdate()
      logger.info('下载更新包成功')
      sendStatusToWindow('下载更新包成功');
    } else {
      return;
    }
  })
})
```
### 2.	方案二
在更新下载完后提示用户，让用户选择更新。

先配置参数autoInstallOnAppQuit为false，阻止应用在检测到更新包后自动更新。

在钩子update-downloaded中加入对话框提示用户，让用户选择。

response为0用户选择确定，更新应用。否则，当前应用不更新。

如果我们不配置autoInstallOnAppQuit为false，那么问题是：虽然第一次应用不更新，但是第二次打开应用，应用马上关闭，还没让我们看到主界面，应用暗自更新，重点是更新完后不重启应用。

重要代码如下：
```js
// 表示下载包不自动更新
autoUpdater.autoInstallOnAppQuit = false
在update-downloaded钩子中弹出对话框
autoUpdater.on('update-downloaded', (ev, releaseNotes, releaseName) => {
  logger.info('下载完成，更新开始')
  sendStatusToWindow('下载完成，更新开始');
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  const options = {
    type: 'info',
    buttons: ['确定', '取消'],
    title: '应用更新',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: '发现有新版本，是否更新？'
  }
  dialog.showMessageBox(options).then(returnVal => {
    if (returnVal.response === 0) {
      logger.info('开始更新')
      setTimeout(() => {
        autoUpdater.quitAndInstall()
      }, 5000);
    } else {
      logger.info('取消更新')
      return
    }
  })
});
```
### 3.	源码分析
未打包目录位于：
`electron-builder/packages/electron-updater/src/AppUpdater.ts`中。
打包后在electron-updater\out\AppUpdater.d.ts中
1.	首先进入checkForUpdates()方法，开始检测更新
2.	正在更新不需要进入
3.	开始更新前判断autoDownload，为true自动下载，为false不下载等待应用通知。
```js
export declare abstract class AppUpdater extends EventEmitter {
    /**
     * 当被发现有更新时，是否要自动下载更新
     * 场景：可以适用于electron检查更新包提示，用户操作是否需要更新
     */
    autoDownload: boolean;
    /**
     * 在app.quit()后，是否自动将下载下载的更新包更新
     * 场景：可以适用于electron下载完更新包提示，用户操作是否需要更新。在第二次打开应用，应用不会自动更新。
     */
    autoInstallOnAppQuit: boolean;
}


/**
 * 检测是否需要更新
 */
checkForUpdates(): Promise < UpdateCheckResult > {
  let checkForUpdatesPromise = this.checkForUpdatesPromise
  // 正在检测更新跳过
  if (checkForUpdatesPromise != null) {
    this._logger.info("Checking for update (already in progress)")
    return checkForUpdatesPromise
  }

  const nullizePromise = () => this.checkForUpdatesPromise = null
  // 开始检测更新
  this._logger.info("Checking for update")
  checkForUpdatesPromise = this.doCheckForUpdates()
  .then(it => {
    nullizePromise()
    return it
  })
  .catch(e => {
    nullizePromise()
    this.emit("error", e, `Cannot check for updates: ${(e.stack || e).toString()}`)
    throw e
  })

  this.checkForUpdatesPromise = checkForUpdatesPromise
  return checkForUpdatesPromise
}
// 检测更新具体函数
private async doCheckForUpdates(): Promise < UpdateCheckResult > {
  // 触发  checking-for-update 钩子
  this.emit("checking-for-update")
  // 取更新信息
  const result = await this.getUpdateInfoAndProvider()
  const updateInfo = result.info
  //  判断更新信息是否有效
  if (!await this.isUpdateAvailable(updateInfo)) {
    this._logger.info(`Update for version ${this.currentVersion} is not available (latest version: ${updateInfo.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`)
    this.emit("update-not-available", updateInfo)
    return {
      versionInfo: updateInfo,
      updateInfo,
    }
  }

  this.updateInfoAndProvider = result
  this.onUpdateAvailable(updateInfo)

  const cancellationToken = new CancellationToken()
  //noinspection ES6MissingAwait
  // 如果设置autoDownload为true,则开始自动下载更新包,否则不下载
  return {
    versionInfo: updateInfo,
    updateInfo,
    cancellationToken,
    downloadPromise: this.autoDownload ? this.downloadUpdate(cancellationToken) : null
  }
}
```
如果需要配置updater中的其他参数达到某种功能，我们可以仔细查看其中的配置项。
```ts
export abstract class AppUpdater extends EventEmitter {
    /**
     * 当被发现有更新时，是否要自动下载更新
     * 场景：可以适用于electron检查更新包提示，用户操作是否需要更新
     */
    autoDownload: boolean;
    /**
     * 在app.quit()后，是否自动将下载下载的更新包更新
     * 场景：可以适用于electron下载完更新包提示，用户操作是否需要更新。在第二次打开应用，应用不会自动更新。
     */
    autoInstallOnAppQuit: boolean;
    /**
   *   GitHub提供者。
    是否允许升级到预发布版本。
    如果应用程序版本包含预发布组件，默认为“true”。0.12.1-alpha.1，这里alpha是预发布组件)，否则“false”。
    allowDowngrade设置为true，则应用允许降级。
   */
    allowPrerelease: boolean;
    /**
     * GitHub提供者。
    获取所有发布说明(从当前版本到最新版本)，而不仅仅是最新版本。
    @default false
     */
    fullChangelog: boolean;
    /**
     *是否允许版本降级(当用户从测试通道想要回到稳定通道时)。
     *仅当渠道不同时考虑(根据语义版本控制的预发布版本组件)。
     * @default false
     */
    allowDowngrade: boolean;
    /**
     * 当前应用的版本
     */
    readonly currentVersion: SemVer;
    private _channel;
    protected downloadedUpdateHelper: DownloadedUpdateHelper | null;
    /**
     * 获取更新通道。
      不适用于GitHub。
      从更新配置不返回“channel”，仅在之前设置的情况下。
     */
    get channel(): string | null;
    /**
     * 设置更新通道。
   不适用于GitHub。
   覆盖更新配置中的“channel”。
   “allowDowngrade”将自动设置为“true”。
   如果这个行为不适合你，明确后简单设置“allowDowngrade”。
     */
    set channel(value: string | null);
    /**
     * 请求头
     */
    requestHeaders: OutgoingHttpHeaders | null;
    protected _logger: Logger;
    get netSession(): Session;
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     * 日志，类型有：info、warn、error
     */
    get logger(): Logger | null;
    set logger(value: Logger | null);
    /**
     * For type safety you can use signals, e.g. 
    为了类型安全，可以使用signals。
     例如：
      `autoUpdater.signals.updateDownloaded(() => {})` instead of `autoUpdater.on('update-available', () => {})`
     */
    readonly signals: UpdaterSignal;
    private _appUpdateConfigPath;
    /**
     * test only
     * @private
     */
    set updateConfigPath(value: string | null);
    private clientPromise;
    protected readonly stagingUserIdPromise: Lazy<string>;
    private checkForUpdatesPromise;
    protected readonly app: AppAdapter;
    protected updateInfoAndProvider: UpdateInfoAndProvider | null;
    protected constructor(
        options: AllPublishOptions | null | undefined,
        app?: AppAdapter
    );
    /**
     * 获取当前更新的url
     */
    getFeedURL(): string | null | undefined;
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](/configuration/publish#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     *
     * 配置更新提供者。通过提供url
     * @param options 如果你想覆盖' app-update.yml '中的配置。
     */
    setFeedURL(options: PublishConfiguration | AllPublishOptions | string): void;
    /**
     * 检查服务其是否有更新
     */
    checkForUpdates(): Promise<UpdateCheckResult>;
    isUpdaterActive(): boolean;
    /**
     *
     * @param downloadNotification 询问服务器是否有更新，下载并通知更新是否可用
     */
    checkForUpdatesAndNotify(
        downloadNotification?: DownloadNotification
    ): Promise<UpdateCheckResult | null>;
    private static formatDownloadNotification;
    private isStagingMatch;
    private computeFinalHeaders;
    private isUpdateAvailable;
    protected getUpdateInfoAndProvider(): Promise<UpdateInfoAndProvider>;
    private createProviderRuntimeOptions;
    private doCheckForUpdates;
    protected onUpdateAvailable(updateInfo: UpdateInfo): void;
    /**
     *
     * 作用：开始下载更新包
     *
     * 如果将`autoDownload`选项设置为false，就可以使用这个方法。
     *
     * @returns {Promise<string>} Path to downloaded file.
     */
    downloadUpdate(cancellationToken?: CancellationToken): Promise<any>;
    protected dispatchError(e: Error): void;
    protected dispatchUpdateDownloaded(event: UpdateDownloadedEvent): void;
    protected abstract doDownloadUpdate(
        downloadUpdateOptions: DownloadUpdateOptions
    ): Promise<Array<string>>;
    /**
     * 作用：下载后重新启动应用程序并安装更新。
     *只有在' update- downloads '被触发后才会调用。
     *
     * 注意：如果在update-downloaded钩子中，让用户选择是否更新应用，选择不更新，那就是没有执行autoUpdater.quitAndInstall()方法。
     * 虽然应用没有更新，但是当第二次打开应用的时候，应用检测到本地有更新包，他就会直接更新，最后不会重启更新后的应用。
     *
     * 为了解决这个问题，需要设置`autoInstallOnAppQuit`为false。关闭应用自动更新。
     *
     * **Note:** ' autoUpdater.quitAndInstall() '将首先关闭所有的应用程序窗口，然后只在' app '上发出' before-quit '事件。
     *这与正常的退出事件序列不同。
     *
     * @param isSilent 仅Windows以静默模式运行安装程序。默认为false。
     * @param isForceRunAfter 即使无提示安装也可以在完成后运行应用程序。不适用于macOS。忽略是否isSilent设置为false。
     */
    abstract quitAndInstall(isSilent?: boolean, isForceRunAfter?: boolean): void;
    private loadUpdateConfig;
    private computeRequestHeaders;
    private getOrCreateStagingUserId;
    private getOrCreateDownloadHelper;
    protected executeDownload(
        taskOptions: DownloadExecutorTask
    ): Promise<Array<string>>;
}
```