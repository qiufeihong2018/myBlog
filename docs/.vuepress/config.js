module.exports = {
    title: '飞鸿的博客',
    description: '我的心路历程',
    dest: './dist',
    port: '7777',
    head: [
        ['link', {rel: 'icon', href: '/logo.gif'}],
        ['script', {src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js'}],
        ['script', {src: 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js'}],
        ['script', {src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js'}],
        ['script', {src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js'}],
        ['script', {src: 'https://cdn.jsdelivr.net/npm/numerify/lib/index.umd.min.js'}],
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./nav'),
        sidebar: require('./sidebar'),
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "New content is available.",
                buttonText: 'Refresh'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    },
    plugins: [
        [
            '@vuepress/register-components',
            {
                componentsDir: './components'
            }
        ],
        [
            'demo-block',
            {
                jsLibs: [
                    // umd
                    'https://unpkg.com/tua-storage/dist/TuaStorage.umd.js',
                ],
                cssLibs: [
                    'https://unpkg.com/animate.css@3.7.0/animate.min.css',
                ],
                showText: 'show code',
                hideText: 'hide',
                styleStr: 'text-decoration: underline;',
                minHeight: 200,
                onlineBtns: {
                    codepen: true,
                    jsfiddle: true,
                    codesandbox: true,
                },
                codesandbox: {
                    deps: {'lodash': 'latest'},
                    json: '',
                    query: '',
                    embed: '',
                },
                demoCodeMark: 'demo-block',
            }]
    ]
}
