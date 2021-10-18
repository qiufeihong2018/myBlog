# react-question
在 react 项目中执行 yarn start 时出现问题：
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

 