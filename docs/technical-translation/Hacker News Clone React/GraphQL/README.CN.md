<h2 align="center">Hacker News Clone React/GraphQL</h2>

<p align="center">
<a href="https://github.com/clintonwoo/hackernews-react-graphql/stargazers"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/clintonwoo/hackernews-react-graphql.svg?style=social&label=Star"></a> 
<a href="https://github.com/clintonwoo/hackernews-react-graphql/"><img alt="GitHub Followers" src="https://img.shields.io/github/followers/clintonwoo.svg?style=social&label=Follow"></a> 
<a href="https://github.com/clintonwoo/hackernews-react-graphql/issues"><img alt="GitHub Issues" src="https://img.shields.io/github/issues/clintonwoo/hackernews-react-graphql.svg"></a> 
<a href="https://github.com/clintonwoo/hackernews-react-graphql/pulls"><img alt="GitHub Pull Requests" src="https://img.shields.io/github/issues-pr-raw/clintonwoo/hackernews-react-graphql.svg"></a>
</p>

这个项目是黑客新闻的克隆，用通用JavaScript重写，使用React和GraphQL。
它的目的是作为一个示例或样板，帮助您使用生产就绪技术来组织项目。

<p align="center" margin-bottom="0">
  <a href="http://www.hnclone.win" target="_blank">
    <img alt="Hacker News Clone Demo" width="auto" height="auto" src="docs/HN-Demo.jpg">
  </a>
</p>
<p align="center">
  <a href="http://www.hnclone.win">Live Demo</a>
</p>

## 概览

### 特征

- React - (UI 框架)
- GraphQL - (Web 数据 API)
- Apollo - (GraphQL 客户端\服务端)
- Next - (路由, SSR, 热更新, 代码分离, 用 Webpack 构建工具)
- TypeScript - (Static Types)
- Webpack - (Module 捆绑)
- PostCSS - (CSS 预处理)
- Node.js - (Web Server)
- Express - (Web App Server)
- Passport - (权限)
- ESLint - (Coding Best Practices/Code Highlighting)
- Jest - (Tests)
- Docker - (Container Deployment)

- Optional - Yarn or Pnpm Package Manager - (Better Dependencies)

### 优势

**Front End**

- Declarative UI - (`react`)
- Static Typing (`typescript`)
- GraphQL Fragment Colocation - (`@apollo/client`)
- Prefetch Page Assets - (`next`)

**Server**

- Universal JS - (`node` & `express`)
- Declarative GraphQL Schema - (`apollo-server`)
- GraphQL Query Batching - (`apollo-server-express`)
- GraphQL Stored Queries - (`apollo-server-express`)
- Easy GraphiQL Include - (`apollo-server-express`)
- Local Authentication Strategy - (`passport`)
- Server Side Rendering - (`next`)
- Code Splitting - (`next`)
- Build to Static Website - (`next`)
- Container Based Runtime - (`docker`)

**Dev/Test**

- Hot Module Reloading - (`next`)
- Snapshot Testing - (`jest`)
- GraphQL Playground - (`apollo-server-express`)
- Faster Package Install - (`pnpm`/`yarn`)
- JS/TS Best Practices - (`eslint`)

### 体系结构概述

<p align="center">
  <img alt="Hacker News Clone Architecture Overview" width="auto" height="400px" src="docs/HN-Clone-Architecture-overview.png">
</p>

`server.ts` 是入口。 它使用Express并将请求传递给Next。Next SSR 使用 Apollo helper 的 `getServerSideProps()` 钩子来渲染页面。因此，应用程序在客户机或服务器上发出GraphQL请求。

当客户端加载页面时，它会预加载来自任何 `<Link href="/">` 的下一页代码。
当客户端导航到下一页时，它只需要执行一个 GraphQL 查询就可以呈现。_Great!_

See more: <a href="https://github.com/zeit/next.js/">Next.js</a>,
<a href="http://dev.apollodata.com/react/">Apollo GraphQL Client</a>

GraphQL: <a href="http://dev.apollodata.com/tools/graphql-tools/index.html">GraphQL-Tools by Apollo</a>
or
<a href="http://graphql.org/graphql-js/">GraphQL docs</a>

### 目录结构

每个网页在 `pages` 中都有一个React组件。服务器代码在  `server` 中。在客户端或服务器上运行的共享代码位于  `src` 中。不要从  `src` 中的 `server` 或 `pages` 导入，以避免在错误的环境中运行代码。

项目根目录包含TypeScript、Babel、ESLint、Docker、Flow、NPM、Yarn、Git等配置文件。
## 怎样去启动

### 一键下载和运行

您可以下载并运行repo与一个命令来统治它们所有:

`git clone https://github.com/clintonwoo/hackernews-react-graphql.git && cd hackernews-react-graphql && npm install && npm start`

### 设置

在dev模式下运行应用程序是完全功能的，包括 _hot module reloading_:

`npm install`

`npm start`

在生产模式下运行:

`npm run build:prod && npm run start:prod`

### 配置

该项目使用默认设置运行 (`/src/config.ts`). 您可以在项目根目录中包含一个 .env 文件来配置设置 (这是 '_dotenv_' npm包). 这个 _.env_ 文件包含在 _.gitignore_.

## 怎么样去测试

### Jest

`npm test`

这个项目用 Jest 并且可以用React组件的快照测试。无论何时一个组件被更新，请更新快照用  `npm test -- -u` or `npx jest --updateSnapshot`.

## 如何构建用于部署

`npm run build:prod`: NextJS app 入口 `server.ts` 他用 Node.js/Express. 用 TypeScript 编译项目的 src 目录到 build.

OR

`npm run build-docker`
Docker 容器: 构建一个 docker 容器用 Dockerfile.

#### 静态网站(Optional)

NextJS 让我们构建一个强力的静态网站 但你需要考虑是否需要服务器端渲染。

`npm run build-static-website`: 构建静态网站到 `/build/static`。 Use a static web server _eg._ NGINX/Github Pages.

## Contributing

Pull requests are welcome. File an issue for ideas, conversation or feedback.

### Community

After you ★Star this project, follow [@ClintonDAnnolfo](https://twitter.com/clintondannolfo) on Twitter.
