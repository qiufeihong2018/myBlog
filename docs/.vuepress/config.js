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
                text: '我的资源', link: '/resource/'
            },
            {
                text: '优文转载', link: '/Reprint/'
            },
            {
                text: '技术总结',
                items: [
                    {
                        text: 'mongo', link: '/technical-summary/mongo/'
                    },
                    {
                        text: 'vue-webpack', link: '/technical-summary/vue-webpack/'
                    },
                    {
                        text: 'Vue.js 组件精讲', link: '/technical-summary/vue-component/'
                    },
                    {
                        text: 'ubuntu', link: '/technical-summary/ubuntu/'
                    },
                    {
                        text: 'eslint', link: '/technical-summary/eslint/'
                    },
                    {
                        text: 'nuxt', link: '/technical-summary/nuxt/'
                    },
                    {
                        text: 'node', link: '/technical-summary/node/'
                    },
                    {
                        text: 'css', link: '/technical-summary/css/'
                    },
                    {
                        text: 'github', link: '/technical-summary/github/'
                    },
                    {
                        text: 'es6', link: '/technical-summary/es6/'
                    },
                    {
                        text: 'vuejs官方文档', link: '/technical-summary/vue-document/'
                    },
                ]
            },
            {
                text: '每日总结', link: '/daliy-summary/'
            },
            {
                text: '毕业设计', link: '/graduation-project/'
            },
            {
                text: '视频总结', link: '/video-summary/'
            },
            {
                text: '谷逸项目', link: '/guyi-item/'
            },
            {
                text: '面试', link: '/interview/'
            }
        ],
        sidebar: 'auto',
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    }
}