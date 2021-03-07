import { remote } from 'electron'

// 模板中注册双击事件，事件名为 onOpenFolder
// folder对象是文件夹数组中的单个对象
onOpenFolder(folder) {
    // 获取当前窗口
    const window = remote.getCurrentWindow()
    // 资源管理器配置项
    const options = {
        title: '飞鸿酱文件管理',
        // 打开的路径
        defaultPath: folder.folderPath,
        // 属性
        properties: ['openFile', 'multiSelections']
    }
    remote.dialog.showOpenDialog(window, options)
}