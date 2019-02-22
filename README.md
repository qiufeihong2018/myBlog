# vuepress-blog
> a vuepress blog about qiufeihong

## Build Setup

```
# clone item
git clone git@github.com:qiufeihong2018/vuepress-blog.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# deploy https://username.github.io
npm run d

# pm2 deploy
npm run server 
```

## directory
```
.
├── app.js
├── deploy.sh
├── dist
│   ├── 404.html
│   ├── assets
│   │   ├── css
│   │   │   └── 0.styles.68be1f38.css
│   │   ├── img
│   │   │   ├── es6.129d76e4.png
│   │   │   ├── github2.82384882.png
│   │   │   ├── github3.9cc070ab.png
│   │   │   ├── github4.902bc652.png
│   │   │   ├── github5.e85ab48d.png
│   │   │   ├── github6.1f5c9cbf.png
│   │   │   ├── github.727a1aa7.png
│   │   │   ├── github7.e9cec157.png
│   │   │   ├── github8.4e2f46e1.png
│   │   │   ├── language2.5618eab9.png
│   │   │   ├── language3.8a3bd699.png
│   │   │   ├── mongo.20e718bc.png
│   │   │   ├── nuxt1.907e0c13.png
│   │   │   ├── nuxt2.e67ed509.png
│   │   │   ├── nuxt3.fbaf303d.png
│   │   │   ├── plugin.9c406d6b.png
│   │   │   ├── search.83621669.svg
│   │   │   └── ubuntu.9cb9a230.png
│   │   └── js
│   │       ├── 10.20dacd80.js
│   │       ├── 11.5f14dbd3.js
│   │       ├── 12.1065931a.js
│   │       ├── 13.94587472.js
│   │       ├── 14.53aa2f6e.js
│   │       ├── 15.4801c72a.js
│   │       ├── 16.832acfa4.js
│   │       ├── 17.998cf083.js
│   │       ├── 18.43af62cd.js
│   │       ├── 19.06032793.js
│   │       ├── 20.aed80fed.js
│   │       ├── 21.419b1c1e.js
│   │       ├── 22.bdcb827d.js
│   │       ├── 23.d8cd8e4c.js
│   │       ├── 24.56598bc7.js
│   │       ├── 25.1a625d10.js
│   │       ├── 2.7bd5b60b.js
│   │       ├── 3.47735243.js
│   │       ├── 4.4669e8d8.js
│   │       ├── 5.e94f46d7.js
│   │       ├── 6.62276278.js
│   │       ├── 7.cb64ab79.js
│   │       ├── 8.c34b3a80.js
│   │       ├── 9.82f7141c.js
│   │       └── app.59291851.js
│   ├── daliy-summary
│   │   └── 2019
│   │       ├── 1
│   │       │   └── index.html
│   │       └── 2
│   │           └── index.html
│   ├── graduation-project
│   │   ├── index.html
│   │   ├── links
│   │   │   └── index.html
│   │   └── opration
│   │       └── index.html
│   ├── index.html
│   ├── interview
│   │   └── index.html
│   ├── logo.gif
│   ├── reprint
│   │   └── index.html
│   ├── resource
│   │   └── index.html
│   ├── technical-summary
│   │   ├── css
│   │   │   └── index.html
│   │   ├── es6
│   │   │   └── index.html
│   │   ├── eslint
│   │   │   └── index.html
│   │   ├── github
│   │   │   ├── command
│   │   │   │   └── index.html
│   │   │   ├── index.html
│   │   │   └── opration
│   │   │       └── index.html
│   │   ├── mongo
│   │   │   └── index.html
│   │   ├── node
│   │   │   └── index.html
│   │   ├── nuxt
│   │   │   └── index.html
│   │   ├── ubuntu
│   │   │   └── index.html
│   │   ├── vue-component
│   │   │   └── index.html
│   │   └── vue-webpack
│   │       └── index.html
│   └── video-summary
│       └── index.html
├── docs
│   ├── daliy-summary
│   │   └── 2019
│   │       ├── 1
│   │       │   └── README.md
│   │       └── 2
│   │           └── README.md
│   ├── graduation-project
│   │   ├── links
│   │   │   └── README.md
│   │   ├── opration
│   │   │   └── README.md
│   │   ├── README.md
│   │   └── sidebar.js
│   ├── interview
│   │   └── README.md
│   ├── README.md
│   ├── reprint
│   │   └── README.md
│   ├── resource
│   │   └── README.md
│   ├── technical-summary
│   │   ├── css
│   │   │   └── README.md
│   │   ├── es6
│   │   │   ├── public
│   │   │   │   └── es6.png
│   │   │   └── README.md
│   │   ├── eslint
│   │   │   └── README.md
│   │   ├── github
│   │   │   ├── command
│   │   │   │   └── README.md
│   │   │   ├── opration
│   │   │   │   └── README.md
│   │   │   ├── public
│   │   │   │   ├── github1.png
│   │   │   │   ├── github2.png
│   │   │   │   ├── github3.png
│   │   │   │   ├── github4.png
│   │   │   │   ├── github5.png
│   │   │   │   ├── github6.png
│   │   │   │   ├── github7.png
│   │   │   │   ├── github8.png
│   │   │   │   ├── github9.png
│   │   │   │   └── github.png
│   │   │   ├── README.md
│   │   │   └── sidebar.js
│   │   ├── mongo
│   │   │   └── README.md
│   │   ├── node
│   │   │   └── README.md
│   │   ├── nuxt
│   │   │   ├── public
│   │   │   │   ├── nuxt1.png
│   │   │   │   ├── nuxt2.png
│   │   │   │   └── nuxt3.png
│   │   │   └── README.md
│   │   ├── public
│   │   │   ├── dev.png
│   │   │   ├── mongo.png
│   │   │   ├── plugin.png
│   │   │   ├── ubuntu.png
│   │   │   └── webpack.png
│   │   ├── ubuntu
│   │   │   ├── pubilc
│   │   │   │   ├── language2.png
│   │   │   │   ├── language3.png
│   │   │   │   ├── language4.png
│   │   │   │   └── language.png
│   │   │   └── README.md
│   │   ├── vue-component
│   │   │   └── README.md
│   │   └── vue-webpack
│   │       └── README.md
│   └── video-summary
│       └── README.md
├── package.json
├── package-lock.json
├── README.md
├── shotPic
│   └── main.png
└── todo.md

60 directories, 122 files
devue@devue-System-Product-Name:~/myItem/vuepress-blog$ tree -I '*svn|*node_module*' -2
tree: Invalid argument -`2'.
usage: tree [-acdfghilnpqrstuvxACDFJQNSUX] [-H baseHREF] [-T title ]
        [-L level [-R]] [-P pattern] [-I pattern] [-o filename] [--version]
        [--help] [--inodes] [--device] [--noreport] [--nolinks] [--dirsfirst]
        [--charset charset] [--filelimit[=]#] [--si] [--timefmt[=]<f>]
        [--sort[=]<name>] [--matchdirs] [--ignore-case] [--] [<directory list>]
devue@devue-System-Product-Name:~/myItem/vuepress-blog$ tree -I '*svn|*node_module*' -L 2
.
├── app.js
├── deploy.sh
├── dist
│   ├── 404.html
│   ├── assets
│   ├── daliy-summary
│   ├── graduation-project
│   ├── index.html
│   ├── interview
│   ├── logo.gif
│   ├── reprint
│   ├── resource
│   ├── technical-summary
│   └── video-summary
├── docs
│   ├── daliy-summary
│   ├── graduation-project
│   ├── interview
│   ├── README.md
│   ├── reprint
│   ├── resource
│   ├── technical-summary
│   └── video-summary
├── package.json
├── package-lock.json
├── README.md
├── shotPic
│   └── main.png
└── todo.md

18 directories, 11 files
devue@devue-System-Product-Name:~/myItem/vuepress-blog$ tree -L 2  -I '*svn|*node_module*'
.
├── app.js
├── deploy.sh
├── dist
│   ├── 404.html
│   ├── assets
│   ├── daliy-summary
│   ├── graduation-project
│   ├── index.html
│   ├── interview
│   ├── logo.gif
│   ├── reprint
│   ├── resource
│   ├── technical-summary
│   └── video-summary
├── docs
│   ├── daliy-summary
│   ├── graduation-project
│   ├── interview
│   ├── README.md
│   ├── reprint
│   ├── resource
│   ├── technical-summary
│   └── video-summary
├── package.json
├── package-lock.json
├── README.md
├── shotPic
│   └── main.png
└── todo.md

18 directories, 11 files
devue@devue-System-Product-Name:~/myItem/vuepress-blog$ tree -L -I 2 '*svn|*node_module*'
tree: Invalid level, must be greater than 0.
devue@devue-System-Product-Name:~/myItem/vuepress-blog$ tree -L 1 -I  '*svn|*node_module*'
.
├── app.js
├── deploy.sh
├── dist
├── docs
├── package.json
├── package-lock.json
├── README.md
├── shotPic
└── todo.md

3 directories, 6 files
devue@devue-System-Product-Name:~/myItem/vuepress-blog$ tree -L 2 -I  '*svn|*node_module*'
.
├── app.js
├── deploy.sh
├── dist
│   ├── 404.html
│   ├── assets
│   ├── daliy-summary
│   ├── graduation-project
│   ├── index.html
│   ├── interview
│   ├── logo.gif
│   ├── reprint
│   ├── resource
│   ├── technical-summary
│   └── video-summary
├── docs
│   ├── daliy-summary
│   ├── graduation-project
│   ├── interview
│   ├── README.md
│   ├── reprint
│   ├── resource
│   ├── technical-summary
│   └── video-summary
├── package.json
├── package-lock.json
├── README.md
├── shotPic
│   └── main.png
└── todo.md

```
## main page
![avatar](./shotPic/main.png)
