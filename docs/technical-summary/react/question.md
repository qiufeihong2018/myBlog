# react-question
## 在 react 项目中执行 yarn start 时出现问题：
```
yarn run v1.19.2
$ react-scripts start

There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

The react-scripts package provided by Create React App requires a dependency:

  "webpack": "4.44.2"

Don't try to install it manually: your package manager does it automatically.
However, a different version of webpack was detected higher up in the tree:

  E:\node_modules\webpack (version: 4.43.0)

Manually installing incompatible versions is known to cause hard-to-debug issues.

If you would prefer to ignore this check, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
That will permanently disable this message but you might encounter other issues.

To fix the dependency tree, try following the steps below in the exact order:

  1. Delete package-lock.json (not package.json!) and/or yarn.lock in your project folder.
  2. Delete node_modules in your project folder.
  3. Remove "webpack" from dependencies and/or devDependencies in the package.json file in your project folder.
  4. Run npm install or yarn, depending on the package manager you use.

In most cases, this should be enough to fix the problem.
If this has not helped, there are a few other things you can try:

  5. If you used npm, install yarn (http://yarnpkg.com/) and repeat the above steps with it instead.
     This may help because npm has known issues with package hoisting which may get resolved in future versions.

  6. Check if E:\node_modules\webpack is outside your project directory.
     For example, you might have accidentally installed something in your home folder.

  7. Try running npm ls webpack in your project folder.
     This will tell you which other package (apart from the expected react-scripts) installed webpack.

If nothing else helps, add SKIP_PREFLIGHT_CHECK=true to an .env file in your project.
That would permanently disable this preflight check in case you want to proceed anyway.

P.S. We know this message is long but please read the steps above :-) We hope you find them helpful!

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
其中告诉我们问题是 webpack 包版本问题，也告诉我们解决的方法。

1. 删除package-lock。Json(不是package.json!)和/或yarn。锁定您的项目文件夹。
2. 删除项目文件夹中的node_modules。
3. 从包的依赖项和/或devDependencies中移除“webpack”。Json文件，在您的项目文件夹。
4. 运行npm install或yarn，这取决于你使用的包管理器。

5. 如果您使用npm，请安装yarn (http://yarnpkg.com/)，并使用它重复上述步骤。
这可能会有帮助，因为npm已经知道包提升的问题，可能会在未来的版本中得到解决。
6. 检查E:\node_modules\webpack是否在项目目录之外。
例如，您可能不小心在您的主文件夹中安装了一些东西。
7. 尝试在你的项目文件夹中运行npm ls webpack。
这将告诉你其他的包(除了预期的反应脚本)安装了webpack。

## 用create-react-app创建APP出错
按官网教程创建app：
```
npm install -g create-react-app
create-react-app first-app
```
错误日志如下：
```
0 info it worked if it ends with ok
1 verbose cli [ 'D:\\nodejs\\node.exe',
1 verbose cli   'D:\\nodejs\\node_modules\\npm\\bin\\npm-cli.js',
1 verbose cli   'install',
1 verbose cli   '--save',
1 verbose cli   '--save-exact',
1 verbose cli   '--loglevel',
1 verbose cli   'error',
1 verbose cli   'react',
1 verbose cli   'react-dom',
1 verbose cli   'react-scripts' ]
2 info using npm@5.3.0
3 info using node@v8.3.0
4 verbose npm-session 79169483b62de104
5 silly install loadCurrentTree
6 silly install readLocalPackageData
7 http fetch GET 304 https://registry.npmjs.org/react-scripts 1097ms (from cache)
8 silly pacote tag manifest for react-scripts@latest fetched in 1106ms
9 http fetch GET 304 https://registry.npmjs.org/react-dom 1701ms (from cache)
10 silly pacote tag manifest for react-dom@latest fetched in 1707ms
11 http fetch GET 304 https://registry.npmjs.org/react 5579ms (from cache)
12 silly pacote tag manifest for react@latest fetched in 5613ms
13 silly install loadIdealTree
14 silly install cloneCurrentTreeToIdealTree
15 silly install loadShrinkwrap
16 silly install loadAllDepsIntoIdealTree
17 silly resolveWithNewModule react-scripts@1.0.11 checking installable status
18 silly resolveWithNewModule react-dom@15.6.1 checking installable status
19 silly resolveWithNewModule react@15.6.1 checking installable status
20 http fetch GET 304 https://registry.npmjs.org/create-react-class 125ms (from cache)
21 silly pacote range manifest for create-react-class@^15.6.0 fetched in 128ms
22 silly resolveWithNewModule create-react-class@15.6.0 checking installable status
23 http fetch GET 304 https://registry.npmjs.org/object-assign 126ms (from cache)
24 silly pacote range manifest for object-assign@^4.1.0 fetched in 128ms
25 silly resolveWithNewModule object-assign@4.1.1 checking installable status
26 http fetch GET 304 https://registry.npmjs.org/loose-envify 390ms (from cache)
27 http fetch GET 304 https://registry.npmjs.org/prop-types 391ms (from cache)
28 silly pacote range manifest for loose-envify@^1.1.0 fetched in 395ms
29 silly resolveWithNewModule loose-envify@1.3.1 checking installable status
30 silly pacote range manifest for prop-types@^15.5.10 fetched in 396ms
31 silly resolveWithNewModule prop-types@15.5.10 checking installable status
32 http fetch GET 304 https://registry.npmjs.org/fbjs 698ms (from cache)
33 silly pacote range manifest for fbjs@^0.8.9 fetched in 703ms
34 silly resolveWithNewModule fbjs@0.8.14 checking installable status
35 http fetch GET 304 https://registry.npmjs.org/ua-parser-js 108ms (from cache)
36 silly pacote range manifest for ua-parser-js@^0.7.9 fetched in 109ms
37 silly resolveWithNewModule ua-parser-js@0.7.14 checking installable status
38 http fetch GET 304 https://registry.npmjs.org/core-js 113ms (from cache)
39 silly pacote range manifest for core-js@^1.0.0 fetched in 118ms
40 silly resolveWithNewModule core-js@1.2.7 checking installable status
41 http fetch GET 304 https://registry.npmjs.org/setimmediate 132ms (from cache)
42 silly pacote range manifest for setimmediate@^1.0.5 fetched in 134ms
43 silly resolveWithNewModule setimmediate@1.0.5 checking installable status
44 http fetch GET 304 https://registry.npmjs.org/isomorphic-fetch 135ms (from cache)
45 silly pacote range manifest for isomorphic-fetch@^2.1.1 fetched in 136ms
46 silly resolveWithNewModule isomorphic-fetch@2.2.1 checking installable status
47 http fetch GET 304 https://registry.npmjs.org/promise 658ms (from cache)
48 silly pacote range manifest for promise@^7.1.1 fetched in 661ms
49 silly resolveWithNewModule promise@7.3.1 checking installable status
50 http fetch GET 304 https://registry.npmjs.org/node-fetch 119ms (from cache)
51 silly pacote range manifest for node-fetch@^1.0.1 fetched in 122ms
52 silly resolveWithNewModule node-fetch@1.7.2 checking installable status
53 http fetch GET 304 https://registry.npmjs.org/whatwg-fetch 122ms (from cache)
54 silly pacote range manifest for whatwg-fetch@>=0.10.0 fetched in 124ms
55 silly resolveWithNewModule whatwg-fetch@2.0.3 checking installable status
56 http fetch GET 304 https://registry.npmjs.org/encoding 128ms (from cache)
57 silly pacote range manifest for encoding@^0.1.11 fetched in 130ms
58 silly resolveWithNewModule encoding@0.1.12 checking installable status
59 http fetch GET 304 https://registry.npmjs.org/is-stream 602ms (from cache)
60 silly pacote range manifest for is-stream@^1.0.1 fetched in 604ms
61 silly resolveWithNewModule is-stream@1.1.0 checking installable status
62 http fetch GET 304 https://registry.npmjs.org/iconv-lite 121ms (from cache)
63 silly pacote range manifest for iconv-lite@~0.4.13 fetched in 124ms
64 silly resolveWithNewModule iconv-lite@0.4.18 checking installable status
65 http fetch GET 304 https://registry.npmjs.org/js-tokens 141ms (from cache)
66 silly pacote range manifest for js-tokens@^3.0.0 fetched in 143ms
67 silly resolveWithNewModule js-tokens@3.0.2 checking installable status
68 http fetch GET 304 https://registry.npmjs.org/asap 105ms (from cache)
69 silly pacote range manifest for asap@~2.0.3 fetched in 109ms
70 silly resolveWithNewModule asap@2.0.6 checking installable status
71 http fetch GET 304 https://registry.npmjs.org/babel-eslint 137ms (from cache)
72 http fetch GET 304 https://registry.npmjs.org/babel-preset-react-app 142ms (from cache)
73 silly pacote version manifest for babel-eslint@7.2.3 fetched in 151ms
74 silly resolveWithNewModule babel-eslint@7.2.3 checking installable status
75 silly pacote range manifest for babel-preset-react-app@^3.0.2 fetched in 152ms
76 silly resolveWithNewModule babel-preset-react-app@3.0.2 checking installable status
77 http fetch GET 304 https://registry.npmjs.org/autoprefixer 179ms (from cache)
78 http fetch GET 304 https://registry.npmjs.org/babel-jest 180ms (from cache)
79 silly pacote version manifest for autoprefixer@7.1.2 fetched in 186ms
80 silly resolveWithNewModule autoprefixer@7.1.2 checking installable status
81 silly pacote version manifest for babel-jest@20.0.3 fetched in 184ms
82 silly resolveWithNewModule babel-jest@20.0.3 checking installable status
83 http fetch GET 304 https://registry.npmjs.org/dotenv 130ms (from cache)
84 silly pacote version manifest for dotenv@4.0.0 fetched in 134ms
85 silly resolveWithNewModule dotenv@4.0.0 checking installable status
86 http fetch GET 304 https://registry.npmjs.org/eslint-loader 164ms (from cache)
87 http fetch GET 304 https://registry.npmjs.org/eslint-config-react-app 166ms (from cache)
88 silly pacote range manifest for eslint-config-react-app@^2.0.0 fetched in 170ms
89 silly resolveWithNewModule eslint-config-react-app@2.0.0 checking installable status
90 silly pacote version manifest for eslint-loader@1.9.0 fetched in 171ms
91 silly resolveWithNewModule eslint-loader@1.9.0 checking installable status
92 http fetch GET 304 https://registry.npmjs.org/chalk 367ms (from cache)
93 http fetch GET 304 https://registry.npmjs.org/case-sensitive-paths-webpack-plugin 368ms (from cache)
94 silly pacote version manifest for chalk@1.1.3 fetched in 369ms
95 silly resolveWithNewModule chalk@1.1.3 checking installable status
96 silly pacote version manifest for case-sensitive-paths-webpack-plugin@2.1.1 fetched in 372ms
97 silly resolveWithNewModule case-sensitive-paths-webpack-plugin@2.1.1 checking installable status
98 http fetch GET 304 https://registry.npmjs.org/eslint-plugin-flowtype 105ms (from cache)
99 silly pacote version manifest for eslint-plugin-flowtype@2.35.0 fetched in 109ms
100 silly resolveWithNewModule eslint-plugin-flowtype@2.35.0 checking installable status
101 http fetch GET 304 https://registry.npmjs.org/eslint-plugin-react 139ms (from cache)
102 http fetch GET 304 https://registry.npmjs.org/eslint-plugin-import 159ms (from cache)
103 http fetch GET 304 https://registry.npmjs.org/eslint-plugin-jsx-a11y 160ms (from cache)
104 silly pacote version manifest for eslint-plugin-react@7.1.0 fetched in 145ms
105 silly resolveWithNewModule eslint-plugin-react@7.1.0 checking installable status
106 silly pacote version manifest for eslint-plugin-import@2.7.0 fetched in 164ms
107 silly resolveWithNewModule eslint-plugin-import@2.7.0 checking installable status
108 http fetch GET 304 https://registry.npmjs.org/file-loader 123ms (from cache)
109 silly pacote version manifest for eslint-plugin-jsx-a11y@5.1.1 fetched in 164ms
110 silly resolveWithNewModule eslint-plugin-jsx-a11y@5.1.1 checking installable status
111 silly pacote version manifest for file-loader@0.11.2 fetched in 127ms
112 silly resolveWithNewModule file-loader@0.11.2 checking installable status
113 http fetch GET 304 https://registry.npmjs.org/extract-text-webpack-plugin 237ms (from cache)
114 silly pacote version manifest for extract-text-webpack-plugin@3.0.0 fetched in 238ms
115 silly resolveWithNewModule extract-text-webpack-plugin@3.0.0 checking installable status
116 http fetch GET 304 https://registry.npmjs.org/fs-extra 107ms (from cache)
117 silly pacote version manifest for fs-extra@3.0.1 fetched in 109ms
118 silly resolveWithNewModule fs-extra@3.0.1 checking installable status
119 http fetch GET 304 https://registry.npmjs.org/postcss-flexbugs-fixes 104ms (from cache)
120 silly pacote version manifest for promise@8.0.1 fetched in 1ms
121 silly resolveWithNewModule promise@8.0.1 checking installable status
122 silly pacote version manifest for postcss-flexbugs-fixes@3.2.0 fetched in 105ms
123 silly resolveWithNewModule postcss-flexbugs-fixes@3.2.0 checking installable status
124 http fetch GET 304 https://registry.npmjs.org/html-webpack-plugin 125ms (from cache)
125 silly pacote version manifest for html-webpack-plugin@2.29.0 fetched in 127ms
126 silly resolveWithNewModule html-webpack-plugin@2.29.0 checking installable status
127 http fetch GET 304 https://registry.npmjs.org/jest 127ms (from cache)
128 silly pacote version manifest for jest@20.0.4 fetched in 130ms
129 silly resolveWithNewModule jest@20.0.4 checking installable status
130 http fetch GET 304 https://registry.npmjs.org/postcss-loader 117ms (from cache)
131 silly pacote version manifest for postcss-loader@2.0.6 fetched in 118ms
132 silly resolveWithNewModule postcss-loader@2.0.6 checking installable status
133 http fetch GET 304 https://registry.npmjs.org/react-dev-utils 114ms (from cache)
134 silly pacote range manifest for react-dev-utils@^3.1.0 fetched in 116ms
135 silly resolveWithNewModule react-dev-utils@3.1.1 checking installable status
136 http fetch GET 304 https://registry.npmjs.org/react-error-overlay 116ms (from cache)
137 silly pacote range manifest for react-error-overlay@^1.0.10 fetched in 122ms
138 silly resolveWithNewModule react-error-overlay@1.0.10 checking installable status
139 http fetch GET 200 https://registry.npmjs.org/style-loader 126ms
140 http fetch GET 304 https://registry.npmjs.org/eslint 619ms (from cache)
141 silly pacote version manifest for style-loader@0.18.2 fetched in 134ms
142 silly resolveWithNewModule style-loader@0.18.2 checking installable status
143 silly pacote version manifest for eslint@4.4.1 fetched in 626ms
144 silly resolveWithNewModule eslint@4.4.1 checking installable status
145 http fetch GET 304 https://registry.npmjs.org/url-loader 101ms (from cache)
146 silly pacote version manifest for url-loader@0.5.9 fetched in 102ms
147 silly resolveWithNewModule url-loader@0.5.9 checking installable status
148 http fetch GET 304 https://registry.npmjs.org/babel-runtime 861ms (from cache)
149 silly pacote version manifest for babel-runtime@6.23.0 fetched in 864ms
150 silly resolveWithNewModule babel-runtime@6.23.0 checking installable status
151 http fetch GET 304 https://registry.npmjs.org/webpack-manifest-plugin 102ms (from cache)
152 silly pacote version manifest for webpack-manifest-plugin@1.2.1 fetched in 104ms
153 silly resolveWithNewModule webpack-manifest-plugin@1.2.1 checking installable status
154 http fetch GET 304 https://registry.npmjs.org/fsevents 126ms (from cache)
155 silly pacote version manifest for fsevents@1.1.2 fetched in 127ms
156 silly resolveWithNewModule fsevents@1.1.2 checking installable status
157 silly pacote trying https://registry.npmjs.org/fsevents/-/fsevents-1.1.2.tgz by hash: sha512-Sn44E5wQW4bTHXvQmvSHwqbuiXtduD6Rrjm2ZtUEGbyrig+nUH3t/QD4M4/ZXViY556TBpRgZkHLDx3JxPwxiw==
158 http fetch GET 304 https://registry.npmjs.org/webpack 428ms (from cache)
159 silly fetchPackageMetaData error for webpack@3.5.1 Unexpected end of input at 1:452704
159 silly fetchPackageMetaData js"},"directories":{},"dist":{"shasum":"7bb1d72ae2087dd1a4af526afec15
159 silly fetchPackageMetaData                                                                      ^
160 http fetch GET 304 https://registry.npmjs.org/sw-precache-webpack-plugin 636ms (from cache)
161 silly pacote version manifest for sw-precache-webpack-plugin@0.11.4 fetched in 640ms
162 silly resolveWithNewModule sw-precache-webpack-plugin@0.11.4 checking installable status
163 http fetch GET 304 https://registry.npmjs.org/webpack-dev-server 540ms (from cache)
164 silly pacote version manifest for webpack-dev-server@2.7.1 fetched in 543ms
165 silly resolveWithNewModule webpack-dev-server@2.7.1 checking installable status
166 silly pacote https://registry.npmjs.org/fsevents/-/fsevents-1.1.2.tgz extracted to D:\Temp\npm-4400-5c0cc52a\unpack-af94c700 by content address 689ms
167 silly addBundled read tarball
168 silly cleanup remove extracted module
169 http fetch GET 200 https://registry.npmjs.org/babel-loader 1879ms
170 silly pacote version manifest for babel-loader@7.1.1 fetched in 1880ms
171 silly resolveWithNewModule babel-loader@7.1.1 checking installable status
172 http fetch GET 200 https://registry.npmjs.org/babel-core 2468ms
173 silly pacote version manifest for babel-core@6.25.0 fetched in 2472ms
174 silly resolveWithNewModule babel-core@6.25.0 checking installable status
175 http fetch GET 200 https://registry.npmjs.org/css-loader 3632ms
176 silly pacote version manifest for css-loader@0.28.4 fetched in 3637ms
177 silly resolveWithNewModule css-loader@0.28.4 checking installable status
178 verbose stack SyntaxError: Unexpected end of input at 1:452704
178 verbose stack js"},"directories":{},"dist":{"shasum":"7bb1d72ae2087dd1a4af526afec15
178 verbose stack                                                                      ^
178 verbose stack     at Object.parseJSON (D:\nodejs\node_modules\npm\node_modules\pacote\node_modules\make-fetch-happen\node_modules\node-fetch-npm\node_modules\json-parse-helpfulerror\node_modules\jju\lib\parse.js:745:13)
178 verbose stack     at parse (D:\nodejs\node_modules\npm\node_modules\pacote\node_modules\make-fetch-happen\node_modules\node-fetch-npm\node_modules\json-parse-helpfulerror\index.js:10:13)
178 verbose stack     at consumeBody.call.then.buffer (D:\nodejs\node_modules\npm\node_modules\pacote\node_modules\make-fetch-happen\node_modules\node-fetch-npm\src\body.js:96:50)
178 verbose stack     at <anonymous>
178 verbose stack     at process._tickCallback (internal/process/next_tick.js:188:7)
179 verbose cwd E:\project\my-app
180 verbose Windows_NT 6.1.7601
181 verbose argv "D:\\nodejs\\node.exe" "D:\\nodejs\\node_modules\\npm\\bin\\npm-cli.js" "install" "--save" "--save-exact" "--loglevel" "error" "react" "react-dom" "react-scripts"
182 verbose node v8.3.0
183 verbose npm  v5.3.0
184 error Unexpected end of input at 1:452704
184 error js"},"directories":{},"dist":{"shasum":"7bb1d72ae2087dd1a4af526afec15
184 error                                                                      ^
185 verbose exit [ 1, true ]
```

注意日志上面下载依赖资源的部分
```
http fetch GET 304 https://registry.npmjs.org/react-scripts 1097ms (from cache)
silly pacote tag manifest for react-scripts@latest fetched in 1106ms
```
在GET请求资源的时候返回了304重定向到cache。于是我就大胆地猜测一下，cache是不是可能为本地的./npm/cache目录?

react-app创建失败的原因，可能是由于某一次下载或者运行的过程中出了错，导致某些cache文件异常，后来再次执行create-react-app的时候又使用了这些错误的cache文件。

原因分析完毕，于是我尝试删除cache目录，重新跑create-reatp-app，创建成功，至此问题解决！

