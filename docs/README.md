---
home: true
---
<template>
    <a href="https://github.com/qiufeihong2018" target="_target" class="github-corner"
        aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250"
            style="fill:#151513; color:#fff; position: absolute; top: 40px; border: 0; right: 0;" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
            <path
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
            <path
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor" class="octo-body"></path>
        </svg></a>
    <span class="title">我的热门文章</span>
    <span class="time">{{ currentDate }}</span>
    <el-carousel type="card" height="200px" :interval=1500>
        <el-carousel-item v-for="(item,key) in arrPng" :key="key">
            <a :href='item.docLink'><img :src="item.pngLink" style="height: 100%;width: 100%;" /></a>
        </el-carousel-item>
    </el-carousel>
    <span class="title">我的公众号</span>
    <span class="time">{{ currentDate }}</span>
    <img src="https://images.qiufeihong.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E5%BE%AE%E4%BF%A1%E6%A0%87%E5%87%86%E7%BB%BF%E7%89%88.png"
        class="image">
</template>

<script>
    export default {
        data() {
            return {
                currentDate: new Date(),
                arrPng: [{
                        pngLink: 'https://images.qiufeihong.top/mocha.png',
                        docLink: 'https://www.qiufeihong.top/technical-summary/mocha/'
                    },
                    {
                        pngLink: 'https://images.qiufeihong.top/gitlab.png',
                        docLink: 'https://www.qiufeihong.top/technical-summary/gitlab/'
                    }, {
                        pngLink: 'https://images.qiufeihong.top/jk.jpeg',
                        docLink: 'https://www.qiufeihong.top/technical-summary/jenkins/'
                    }, {
                        pngLink: 'https://images.qiufeihong.top/vuepress2.png',
                        docLink: 'https://www.qiufeihong.top/technical-summary/vuepress/'
                    }, {
                        pngLink: 'https://images.qiufeihong.top/apidoc6.jpg',
                        docLink: 'https://www.qiufeihong.top/technical-summary/apiDoc/'
                    }, {
                        pngLink: 'https://images.qiufeihong.top/nginx-ssl-https.jpg',
                        docLink: 'https://www.qiufeihong.top/technical-summary/nginx-ssl-https/'
                    }, {
                        pngLink: 'https://images.qiufeihong.top/login.png',
                        docLink: 'https://www.qiufeihong.top/technical-summary/navigation/'
                    }, {
                        pngLink: 'https://images.qiufeihong.top/watch.jpg',
                        docLink: 'https://www.qiufeihong.top/technical-summary/watchLog/'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .title {
        font-size: 20px
    }

    .time {
        font-size: 13px;
        color: #999;
        float: right;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        display: block;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 61px
    }

    .github-corner:hover .octo-arm {
        animation: octocat-wave 560ms ease-in-out
    }

    @keyframes octocat-wave {

        0%,
        100% {
            transform: rotate(0)
        }

        20%,
        60% {
            transform: rotate(-25deg)
        }

        40%,
        80% {
            transform: rotate(10deg)
        }
    }

    @media (max-width:500px) {
        .github-corner:hover .octo-arm {
            animation: none
        }

        .github-corner .octo-arm {
            animation: octocat-wave 560ms ease-in-out
        }
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>

> a vuepress blog about qiufeihong