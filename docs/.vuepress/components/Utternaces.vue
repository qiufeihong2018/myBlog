<template>
    <div id="comment">
    </div>
</template>
<script>
    export default {
        name: 'Utternaces',
        props: {
            id: Number
        },
        methods: {
            comment() {
                // 建立脚本以及属性
                const utterances = document.createElement('script');
                utterances.type = 'text/javascript';
                utterances.async = true;
                utterances.setAttribute('issue-number', this.id)
                utterances.setAttribute('theme', 'github-dark')
                utterances.setAttribute('repo', 'qiufeihong2018/vuepress-blog')
                utterances.crossorigin = 'anonymous';
                utterances.src = 'https://utteranc.es/client.js';

                // comment 是要插入评论的地方
                window.document.getElementById('comment').appendChild(utterances);
            }
        },
        mounted() {
            this.comment()
        },
    }
</script>