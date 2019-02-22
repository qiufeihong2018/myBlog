module.exports = {
    title: '飞鸿的博客',
    description: '我的心路历程',
    dest: './dist',
    port: '7777',
    head: [
        ['link', {rel: 'icon', href: '/logo.gif'}]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./nav').nav,
        sidebar: {
            '/graduation-project/': require('../graduation-project/sidebar').sidebar,
            '/technical-summary/github/': require('../technical-summary/github/sidebar').sidebar,
            '/technical-summary/vue-component/': require('../technical-summary/vue-component/sidebar').sidebar
        },
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "New content is available.",
                buttonText: 'Refresh'
            }
        },
        repo: 'https://github.com/qiufeihong2018/vuepress-blog',
        repoLabel: 'myGithub',
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    },
    plugins: ['@vuepress/back-to-top']
}
