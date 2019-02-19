module.exports = {
    title: '飞鸿的博客',
    description: '我的心路历程',
    dest: './dist',
    port: '6666',
    head: [
        ['link', {rel: 'icon', href: '/logo.gif'}]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: [
            {
                text: '首页', link: '/'
            },
            {
                text: '我的资源',
                items: [
                    {text: '前端学习路线', link: 'http://www.imooc.com/article/261756'},
                    {text: '全栈学习资源', link: '/resource/'}
                ]
            },
            {
                text: '优文转载', link: '/reprint/'
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
                        text: 'Vue.js官方文档', link: 'https://cn.vuejs.org/'
                    },
                    {
                        text: 'VuePress官方文档', link: 'https://vuepress.vuejs.org/zh/'
                    }
                ]
            },
            {
                text: '每日总结',
                items: [
                    {
                        text: '2019.1', link: '/daliy-summary/2019/1/'
                    },
                    {
                        text: '2019.2', link: '/daliy-summary/2019/2/'
                    }
                ]
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
        sidebar: {
            '/graduation-project/': require('../graduation-project/sidebar').sidebar,
            '/technical-summary/github/': require('../technical-summary/github/sidebar').sidebar
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
    }
}