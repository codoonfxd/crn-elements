# 如何贡献

本篇文章简单介绍了开发的基本流程。

## Commit 提交规范

本项目采用业界使用较多的 **Angular 规范**，如果想要了解更多，请点击[这里](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)查看。

**注意：**这里强调一下规范中的 scope 用法，这个值规定了本次改动的作用域，比如你新添加了一个组件 Demo，commit message 就大致可以填写成`feat(demo): 新增Demo组件`。

**注意：**`commit message`以及代码中的注释最好使用**英文**。

## 分支管理

> 如果是 codoonfxd 组内成员可以直接提交 commit 至分支，但是请谨慎操作，以免混入不符合规范的代码。如果不是组内成员，可以 Fork 项目后，提交 Pull Request，详细的操作可以参考[这篇文章](https://segmentfault.com/a/1190000000736629)。

本项目维护两个分支，分别是`master`和`develop`，如果是修复现行版本的 bug，请提交 Pull Request 至 master；如果是新增功能，请提交 Pull Request 至 develop。

为了将开发中的功能**发布**，仓库维护者将不定期地将 develop 分支合并至 master，并进行发布操作。

## 编写文档

文档的目录结构如下，请按照相应结构添加。

```
├── CHANGELOG.md
├── CONTRIBUTING.md
├── README.md
├── _images
│   └── elements // 该文件夹下放置组件的图片
│       └── button // 对应组件的小写字母
│           ├── disabled&loading.png
│           ├── fix-iphonex.png
│           └── ghost.png
├── _media
│   └── favicon.ico
├── _sidebar.md // 该文件配置侧边栏的菜单
├── elements // 该文件夹放置组件文档
│   └── button.md // 对应组件的小写字母
└── index.html
```

如果添加新组件，请在`elements`文件夹下创建相应组件的文档，并在`_sidebar.md`中按照结构增加相应的组件菜单入口，如果需要添加图片，请在`_images`目录的组件目录中添加图片。

> 本地调试文档请在项目目录下运行`yarn docs-dev`。

**注意：**所有组件相关的文件名请使用**小写**。

## 开发流程

- 开发阶段
  - 执行`yarn`**安装依赖**。
  - 进行开发，并编写相应的**单元测试**。
  - 在 example 目录编写相应的**示例代码**（此目录代码可用于本地调试）。
  - 在`docs`目录下编写**组件文档**。
  - 开发完成后，请执行`yarn test`和`yarn lint`保证满足代码风格及单元测试的通过（注意：lint 检查会在 commit 提交时自动检查）。
- 提交阶段
  - 开发阶段完成后，提交 Commit。
  - 将自己的开发分支提交 Pull Request 至 master 或 develop 分支（具体提交至哪一个分支，请查看`分支管理`的内容）。
- 发布阶段（针对于仓库维护者）
  - 执行`yarn test`和`yarn lint`，确保代码理论上无误。
  - 执行`yarn build`打包。
  - 执行`npm publish`发布，并在 Github 上创建 Release，生成 Tag。

## 本地调试环境

> 进行以下操作之前，请确保本地的 Xcode 以及 Simulator 安装完成，具体的流程请参考这一篇[官方文档](https://facebook.github.io/react-native/docs/getting-started)下的`React Native CLI Quickstart`。

请按照以下步骤完成本地调试环境的搭建：

- 安装依赖
- `yarn run-ios`，该命令会自动打包并在模拟器中安装`crnElements`应用（该应用入口文件为根目录下的`index.js`，该操作只需要完成一次既可，后续调试无需执行）。
- `yarn start`开启 React Native 本地调试。

所有的组件调试以及组件示例都放在`examples`文件夹下，请开发者完成组件后，务必去该文件夹下添加相关示例，以便后续开发者使用。

> 注意：项目目录中的`ios`和`android`为示例应用的原生应用入口，组件的开发目录在`src`。
