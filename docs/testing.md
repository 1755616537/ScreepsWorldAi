翻译自官方文档：https://github.com/screepers/screeps-typescript-starter/blob/master/docs/in-depth/testing.md
# 测试

自动化测试有助于防止回归错误，并能够重现复杂的故障场景以便于修复bug或实施新功能。本项目支持使用 Screeps 代码进行单元测试和集成测试。

你可以在 [维基百科](https://en.wikipedia.org/wiki/Test-driven_development) 上阅读更多关于单元测试和集成测试的信息。

本文档将涵盖测试设置，适用于那些已经熟悉测试驱动设计流程的开发者。

测试通过 [Mocha](https://mochajs.org/) 编写，只有当文件名包含 `.test.ts` 时才会被识别为测试文件并被执行。
如果你编写了测试文件但没有看到它被执行，这可能是原因所在。
单元测试和集成测试有两套独立的命令和配置，因为单元测试不需要像集成测试那样运行完整的 Screeps 服务器环境。

## 运行测试

标准的 `npm test` 命令将按顺序执行所有的单元测试和集成测试。这对于持续集成/持续部署（CI/CD）和发布前检查很有帮助，
但在活跃开发期间，最好只运行感兴趣的子集测试。

你可以使用 `npm run test-unit` 或者 `npm run test-integration` 来单独运行其中一种测试套件。
此外，你还可以向这些测试命令提供 Mocha 选项来进一步控制测试行为。例如，
下面的命令将仅执行描述中包含单词 `memory` 的集成测试：

```
npm run test-integration -- -g memory
```

注意初始的 `--` 之后的参数将直接传递给 `mocha`。

## 单元测试

你可以通过单元测试支持来测试具有简单运行时依赖的代码。由于单元测试的速度比集成测试快几个数量级，因此建议尽可能优先使用单元测试

## 集成测试

### 安装 Screeps Server Mockup

在开始使用集成测试之前，你必须将 [screeps-server-mockup](https://github.com/screepers/screeps-server-mockup) 添加到你的项目中。请查阅该项目的仓库以获取更多安装指导。

```bash
# 使用 yarn:
yarn add -D screeps-server-mockup
# 使用 npm
npm install --save-dev screeps-server-mockup
```

你还需要添加脚本来运行集成测试。

在 `package.json` 文件中，添加一个新的 `test-integration` 脚本，并将新的集成测试添加到主 `test` 脚本中。

```json
  "scripts": {
    "test": "npm run test-unit && npm run test-integration",
    "test-integration": "npm run build && mocha test/integration/**/*.ts",
  }
```

现在你可以使用 `test-integration` 脚本来运行集成测试，或者使用 `test` 脚本来同时运行单元和集成测试。

### 使用 Screeps Server Mockup 进行集成测试

集成测试适用于那些严重依赖完整游戏环境的代码。
集成测试完全代表了真实的游戏环境（实际上它们是在真实的 Screeps 服务器上运行的）。
这以性能损失和创建特定场景时的复杂设置为代价。

服务器测试支持通过 [screeps-server-mockup](https://github.com/screepers/screeps-server-mockup) 实现。 查阅该仓库以获取有关 API 的更多信息。

默认情况下，测试助手会创建一个带有 3x3 房间网格的“存根”世界，其中包含资源和控制器。
此外，它还会生成一个名为 "player" 的机器人，运行来自本仓库编译后的 main.js 文件

用户需要使用 screeps-server-mockup API 正确地设置前置条件。
重要的是，通过此 API 暴露的大多数方法都是异步的，因此使用它们时需要频繁使用 `await` 关键字来获取结果并确保执行顺序。
如果你发现某些前置条件似乎没有生效，或者你接收到的是 Promise 对象而不是预期的值，
那么你可能在某个 API 方法上遗漏了 `await`。

最后，请注意 screeps-server-mockup 以及由此扩展的仓库，在任何给定时间都捆绑了特定版本的 [screeps
服务器](https://github.com/screeps/screeps)。
有可能你的本地 package.json 文件，或者 screeps-server-mockup 包本身已过时，拉取了旧版本的 Screeps 服务器。
如果你注意到测试环境的行为与 MMO 服务器不同，请确保所有这些依赖项都正确更新至最新版本。
