---
home: true

footer: MIT Licensed | Copyright © 2019-present FeiHong
---

<template>
    <el-carousel :interval="4000" type="card" height="200px" interval="1000">
        <el-carousel-item v-for="item in arrPng" :key="item">
         <a :href='item.docLink'><img :src="item.pngLink"/></a>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        data() {
            return {
                arrPng: [
                    {
                        pngLink:'https://user-gold-cdn.xitu.io/2019/6/17/16b647bd65968947?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1',
                        docLink:'https://www.qiufeihong.top/technical-summary/mocha/'
                    },
                    {
                        pngLink:'https://user-gold-cdn.xitu.io/2019/6/5/16b2546faf9430c4?imageView2/1/w/1080/h/320/q/85/format/webp/interlace/1',
                        docLink:'https://www.qiufeihong.top/technical-summary/gitlab/'
                    },{
                        pngLink:'https://user-gold-cdn.xitu.io/2019/6/5/16b2571e13dbbdc6?imageView2/1/w/1080/h/320/q/85/format/webp/interlace/1',
                        docLink:'https://www.qiufeihong.top/technical-summary/jenkins/'
                    },{
                        pngLink:'https://user-gold-cdn.xitu.io/2019/6/5/16b25770c4917f2f?imageView2/1/w/1080/h/320/q/85/format/webp/interlace/1',
                        docLink:'https://www.qiufeihong.top/technical-summary/vuepress/'
                    },{
                        pngLink:'https://user-gold-cdn.xitu.io/2019/6/20/16b7403d36b0f0a1?imageView2/1/w/1080/h/320/q/85/format/webp/interlace/1',
                        docLink:'https://www.qiufeihong.top/technical-summary/apiDoc/'
                    },{
                        pngLink:'https://user-gold-cdn.xitu.io/2019/7/10/16bd9e3c59139ab9?imageView2/1/w/1080/h/320/q/85/format/webp/interlace/1',
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
