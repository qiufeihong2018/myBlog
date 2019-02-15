module.exports = {
    title: '博客',
    description: '我的心路历程',
    head: [
        ['link', {rel: 'icon', href: '/logo.gif'}]
    ],
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        nav: [
            {
                text: 'home', link: '/'
            },
            {
                text: 'schedule',
                items: [
                    {text: 'x-alert', link: '/schedule/x-alert/'},
                    {text: 'deep-file-ai', link: '/schedule/deep-file-ai/'}
                ]
            },
            {
                text: 'front-end',
                items: [
                    {text: 'tutorial', link: '/front-end/tutorial/'},
                    {text: 'libs', link: '/front-end/libs/'}
                ]
            },
            {
                text: 'back-end', link: '/back-end/'
            }
        ],
        sidebar: 'auto',
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    }
}