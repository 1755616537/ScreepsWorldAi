翻译自官方文档：https://github.com/screepers/screeps-typescript-starter/blob/master/docs/getting-started/installation.md
# 安装

## 要求

你需要以下软件:

- [Node.JS](https://nodejs.org/en/download) (10.x || 12.x)
- 包管理器 \([Yarn](https://yarnpkg.com/en/docs/getting-started) or [npm](https://docs.npmjs.com/getting-started/installing-node)\)
- Rollup CLI \(可选，可通过 `npm install -g rollup` 进行全局安装\)

## 安装 `npm` 模块

在终端中打开你的项目文件夹，然后运行包管理器来安装所需的包和TypeScript声明文件:

```bash
# 使用npm
npm install

# 使用yarn
yarn
```

完成上述步骤后，接下来让我们 [使用Screeps服务器的身份验证](authenticating.md)。
这一步骤涉及获取一个身份验证令牌，然后将该令牌添加到你的screeps.json配置文件中，以便你的本地开发环境能够与Screeps服务器通信，上传你的代码更新。
