module.exports = {
    // '@vuepress/register-components': {
    //     componentsDir: './components'
    // },
    '@vuepress/pwa': {
        serviceWorker: true,
        updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新",
            // 自定义弹窗
            // popupComponent: 'MySWUpdatePopup',
        }
    },
    '@vuepress/back-to-top': true
}
