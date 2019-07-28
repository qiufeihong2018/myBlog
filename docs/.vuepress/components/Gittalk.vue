<template>
    <div class="page">
        <section class="page-edit">
            <!-- <h3>
                <span class="leancloud-visitors" data-flag-title="Your Article Title">
                    <a class="post-meta-item-text">阅读量：</a>
                    <a class="leancloud-visitors-count"></a>
                </span>
            </h3> -->
            <div id="gitalk-container"></div>
        </section>
    </div>

</template>
<script>
    import 'gitalk/dist/gitalk.css'
    import Gitalk from 'gitalk'
    // import Valine from 'valine'

    export default {
        name: 'Gittalk',
        mounted: function () {
            // if (typeof window !== 'undefined') {
            //     this.window = window
            //     window.AV = require('leancloud-storage')
            // }
            // this.valine = new Valine()
            this.initGittalk()
            // this.initReadingVolume()

        },
        watch: {
            $route(to, from) {
                if (from.path != to.path) {
                    this.initGittalk()
                    // this.initReadingVolume()
                }
            }
        },
        methods: {
            // initReadingVolume() {
            //     let path = location.origin + location.pathname
            //     document.getElementsByClassName('leancloud-visitors')[0].id = path
            //     this.valine.init({
            //         el: '#vcomments',
            //         appId: '54maloyBQ5IhlzR4zhQQcWSN-gzGzoHsz', // your appId
            //         appKey: '8wNBKl9gNeGderoEfSxiP3Si', // your appKey
            //         notify: false,
            //         verify: false,
            //         path: path,
            //         visitor: true,
            //         avatar: 'mm',
            //         placeholder: 'write here'
            //     });
            // },
            initGittalk() {
                let path = location.pathname
                const gitalk = new Gitalk({
                    clientID: '869b2dea1c53cc9b6ddd', // 填入你的clientID
                    clientSecret: '0416acb02689088d4d2c55243a82db0582af4575', // 填入你的clientSecret
                    repo: 'vuepress-blog', // 填入你的存储评论的仓库名字
                    owner: 'qiufeihong2018', //你的用户名
                    admin: ['qiufeihong2018'], // 你的用户名
                    id: decodeURI(path), // 每个页面根据url生成对应的issue，保证页面之间的评论都是独立的
                    distractionFreeMode: false // Facebook-like distraction free mode
                })
                gitalk.render('gitalk-container')
            }
        }
    }
</script>