<template>
    <div class="page">
        <section class="page-edit">
            <div>
                <!-- id 将作为查询条件 -->
                <span class="leancloud-visitors"
                      data-flag-title="Your Article Title">
        <em class="post-meta-item-text">阅读量： </em>
        <i class="leancloud-visitors-count"></i>
      </span>
            </div>
            <h3>
                <a href="javascript:;"></a>
                评 论：
            </h3>
            <div id="vcomments"></div>
        </section>
    </div>

</template>

<script>
    export default {
        name: 'Valine',
        mounted: function () {
            // require window
            const Valine = require('valine');
            if (typeof window !== 'undefined') {
                this.window = window
                window.AV = require('leancloud-storage')
            }
            this.valine = new Valine()
            this.initValine()
        },
        watch: {
            $route (to, from) {
                if (from.path != to.path) {
                    this.initValine()
                }
            }
        },
        methods: {
            initValine () {
                let path = location.origin + location.pathname
                // vuepress打包后变成的HTML不知为什么吞掉此处的绑定`:id="countId"`
                document.getElementsByClassName('leancloud-visitors')[0].id = path
                this.valine.init({
                    el: '#vcomments',
                    appId: '54maloyBQ5IhlzR4zhQQcWSN-gzGzoHsz',// your appId
                    appKey: '8wNBKl9gNeGderoEfSxiP3Si', // your appKey
                    notify: false,
                    verify: false,
                    path: path,
                    visitor: true,
                    avatar: 'mm',
                    placeholder: 'write here'
                });
            }
        }
    }
</script>
