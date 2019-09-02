---
home: true

footer: MIT Licensed | Copyright © 2019-present FeiHong
---

<template>
    <el-carousel type="card" height="200px" :interval=1000>
        <el-carousel-item v-for="(item,key) in arrPng" :key="key">
         <a :href='item.docLink'><img :src="item.pngLink" style="height: 100%;width: 100%;"/></a>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        data() {
            return {
                arrPng: [
                    {
                        pngLink:'http://images.qiufeihong.top/mocha.png',
                        docLink:'https://www.qiufeihong.top/technical-summary/mocha/'
                    },
                    {
                        pngLink:'http://images.qiufeihong.top/gitlab.png',
                        docLink:'https://www.qiufeihong.top/technical-summary/gitlab/'
                    },{
                        pngLink:'http://images.qiufeihong.top/jk.jpeg',
                        docLink:'https://www.qiufeihong.top/technical-summary/jenkins/'
                    },{
                        pngLink:'http://images.qiufeihong.top/vuepress2.png',
                        docLink:'https://www.qiufeihong.top/technical-summary/vuepress/'
                    },{
                        pngLink:'http://images.qiufeihong.top/apidoc6.jpg',
                        docLink:'https://www.qiufeihong.top/technical-summary/apiDoc/'
                    },{
                        pngLink:'http://images.qiufeihong.top/nginx-ssl-https.jpg',
                        docLink:'https://www.qiufeihong.top/technical-summary/nginx-ssl-https/'
                    }
                ]
            }
        }
    }
</script>

<style>
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

### 构建
```bash
# clone item
git clone git@github.com:qiufeihong2018/vuepress-app.git

# install dependencies
npm install 

# serve with hot reload at localhost:6666
npm run dev

# build for production with minification
npm run build

# deploy to github page
npm run d

# build&&pm2
npm run server
```

::: warning 注意

请确保你的 Node.js 版本 >= 8。
:::
