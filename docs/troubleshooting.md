翻译自官方文档：https://github.com/screepers/screeps-typescript-starter/blob/master/docs/in-depth/troubleshooting.md
# 故障排除

本页面概述了在设置 TypeScript 入门项目时可能会遇到的一些常见问题，以及如何解决这些问题。

## 无法将代码上传到 Screeps 私人服务器

如果你遇到以下错误:

```text
(node:80116) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Cannot POST /api/auth/signin
```

请确保你的私人服务器上已安装了 [screepsmod-auth](https://github.com/ScreepsMods/screepsmod-auth) 模块，并且你在私人服务器上的账户设置了密码。

## 无法扩展类型接口 \(如 `Game`, `Memory`\)

更多信息可参考：https://github.com/screepers/typed-screeps/issues/27

确保你将对类型接口的任何扩展声明为环境声明 [_ambient declaration_](https://stackoverflow.com/a/40916055)，你可以通过以下两种方式之一来实现：

* 将它们放入一个 `*.d.ts` 文件中
* 在现有的 `.ts` 文件中 \(至少包含一个 `import` 或 `export` 语句\)，你可以使用 `declare global { interface CreepMemory { ... } }` 来达到相同的效果。

**更多信息可参考:** [https://github.com/screepers/typed-screeps/issues/27](https://github.com/screepers/typed-screeps/issues/27)

使用 declare global 语句，你可以在 TypeScript 中安全地扩展全局类型，而不影响编译后的 JavaScript 代码。
这通常用于添加自定义属性到全局对象，如 Game 或 Memory，这些对象在 Screeps 游戏中被广泛使用。
通过这种方式，你可以确保你的 TypeScript 代码在类型检查时能够识别这些额外的属性，从而避免类型错误。

