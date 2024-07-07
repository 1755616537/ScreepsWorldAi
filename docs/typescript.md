翻译自官方文档：https://github.com/screepers/screeps-typescript-starter/blob/master/docs/in-depth/typescript.md
# TypeScript

TypeScript 是一种编程语言，它将 JavaScript 的熟悉性与静态类型的强大力量相结合，使其成为编写 Screeps 游戏代码的理想选择。

静态类型检查工具如 TypeScript 和 [Flow](https://flow.org/) 可以帮助在编译时检测类型错误，从而减少代码中的 bug 数量。
使用静态类型 [可以预防大约 15%](https://blog.acolyer.org/2017/09/19/to-type-or-not-to-type-quantifying-detectable-bugs-in-javascript/) 的代码提交中可能存在的 bug，
同时 TypeScript 还提供了诸如高级代码补全和智能重构等生产力增强功能。

要阅读更多关于TypeScript如何在Screeps中帮助您的信息，
可以阅读 [@bonzaiferroni](https://github.com/bonzaiferroni) 在 [Screeps World](https://screepsworld.com/2017/07/typescreeps-getting-started-with-ts-in-screeps/)上发表的文章。

本节为您提供TypeScript特定的提示和技巧，以充分利用生态系统。

## 严格模式（Strict Mode）

TypeScript 的 `--strict` 编译器标志在 TypeScript 2.3 版本中引入，激活了 TypeScript 的“严格模式”。
严格模式默认设置所有严格的类型检查设置为 `true`。

从 TypeScript 2.7 开始，受影响的选项包括:

* `--noImplicitAny`
* `--noImplicitThis`
* `--alwaysStrict`
* `--strictNullChecks`
* `--strictFunctionTypes`
* `--strictPropertyInitialization`

从第 2.0 版本的入门套件开始，我们已经在 `--strict` 文件中启用了 `tsconfig.json` 标志。
如果这导致编译时错误，你可以尝试将 `"strict"` 设置为 `false`，或者覆盖上述列出的一个或多个选项。

**For more info:** [https://blog.mariusschulz.com/2017/06/09/typescript-2-3-the-strict-compiler-option](https://blog.mariusschulz.com/2017/06/09/typescript-2-3-the-strict-compiler-option)

## ESLint

ESLint 检查 TypeScript 和 JavaScript 代码的可读性、可维护性和功能性错误，也可以强制执行编码风格标准。

这个项目通过 .eslintrc.js 文件提供 ESLint 规则，这些规则扩展了 ESLint 定义的推荐规则。

这个项目通过 `.eslintrc.js` 文件提供 ESLint 规则，这些规则扩展了 ESLint 定义的 [推荐规则](https://eslint.org/docs/rules/).

我们对这些规则进行了一些修改，我们认为这些修改对于一个合适的 Screeps 项目来说是必要的和/或相关的：

* 将 [guard-for-in](https://eslint.org/docs/rules/guard-for-in) 规则设置为 `off` 状态，因为它强制要求检查 `for ( ... in ...)` 循环中的对象成员是否来自类原型。
* 将 [no-console](https://eslint.org/docs/rules/no-console) 规则设置为 `off` 状态，以便允许使用 `console`。
* 将 [no-underscore-dangle](https://eslint.org/docs/rules/no-underscore-dangle) 设置为 `warn` 警告级别。

### 自定义ESLint配置

你也可以定制 `.eslintrc.js` 文件以匹配你的代码库的偏好，[如何操作](https://eslint.org/docs/user-guide/configuring/)，[完整可用规则](https://eslint.org/docs/rules/) 。

如果某些规则不适用于你代码的一部分（例如，一次性情况，如必须使用 `require()` 来包含模块），你可以使用标志让 ESLint 忽略这些规则: [https://eslint.org/docs/user-guide/configuring/rules#disabling-rules](https://eslint.org/docs/user-guide/configuring/rules#disabling-rules)

**更多关于 ESLint 的信息可以在其官方网站找到:** [https://eslint.org/](https://eslint.org/)

