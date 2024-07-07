翻译自官方文档：https://github.com/screepers/screeps-typescript-starter/blob/master/docs/in-depth/cookbook/environment-variables.md
# 环境变量

环境变量提供了一种更有效的方式来管理构建过程。它们还可以被用来定义“构建开关”——基于环境的变量，这些变量会在运行时被注入到脚本中。

## 设置环境变量

假设我们想要在上传到主分支时 `NODE_ENV` 设置为 `production` ，而在上传到模拟分支时设置为 `development` 。
首先，我们将在 `rollup.config.js` 中捕获这个环境变量并基于它来指定编译目标。

```javascript
// rollup.config.js

const isProduction = process.env.NODE_ENV === 'production'

// 根据是否是生产模式使用`screeps.json`中的`main`目标
const cfg = isProduction ? 'main' : 'sim';

export default {
  // ...
  plugins: [
    // ...
    screeps({
      config: require("./screeps")[cfg],
      // 如果`NODE_ENV`是`local`，执行预演运行
      dryRun: process.env.NODE_ENV === 'local'
    })
  ]
}
```

## 执行部署

然后，我们将在 `package.json` 中更改构建任务，以便在运行Rollup命令前传递环境变量。

```javascript
{
  "tasks": {
    "deploy-prod": "NODE_ENV=production rollup -c",
    "deploy-dev": "NODE_ENV=development rollup -c",
  }
}
```

注意：在Windows上，上述设置环境变量的方式可能不起作用。
为了提供一个跨平台的解决方案，你可以使 `cross-env`。

```bash
npm install --save-dev cross-env
```

```javascript
{
  "tasks": {
    "deploy-prod": "cross-env NODE_ENV=production rollup -c",
    "deploy-dev": "cross-env NODE_ENV=development rollup -c",
  }
}
```

现在尝试运行 `npm run deploy-dev` 或 `npm run deploy-prod` ，检查代码是否被正确地上传。

## 设置构建开关

你还可以设置部署依赖的变量（即“构建开关”），这些变量在构建时被注入到代码中，以允许进行更高级的优化，比如消除死代码。

为此，需要安装 `rollup-plugin-replace`。

```bash
# 使用npm
$ npm install --save-dev rollup-plugin-replace

# 使用yarn
$ yarn add --dev rollup-plugin-replace
```

然后在 `rollup.config.js` 中配置你想要的变量。

```javascript
// rollup.config.js
import replace from 'rollup-plugin-replace';

export default {
  plugins: [
    replace({
      // 如果代码是在生产模式下打包，则返回`true`
      PRODUCTION: JSON.stringify(isProduction),
      // 也可以使用这个来包含与部署相关的数据，例如
      // 构建的日期和时间，以及从git获取的最新提交ID
      __BUILD_TIME__: JSON.stringify(Date.now()),
      __REVISION__: JSON.stringify(require('git-rev-sync').short()),
    })
  ]
};
```

信息：通常，你需要确保 `rollup-plugin-replace` 在其他插件之前，这样我们可以确保Rollup正确替换了这些变量，而剩余的插件可以正确地应用任何优化（例如，消除死代码）。

警告：因为这些值会被作为字符串评估一次（用于查找和替换），并且作为表达式评估一次，所以它们需要被 `JSON.stringify`包裹。

由该插件设置的变量将在实际输出的JS代码中被替换。当编译代码时，Rollup会将变量名替换为提供的表达式或值的结果。

一旦设置完成，你就可以在代码中使用这些变量了。

```typescript
// 打印从git获取的最新提交ID
if (__REVISION__) {
  console.log(`Revision ID: ${__REVISION__}`)
}

export function loop() {
  if (!PRODUCTION) {
    // 只有在开发模式下才会被包含
    devLogger.log('loop started')
  }
}
```

### 注意事项

由于TypeScript不会识别你盲目传入代码中的这些变量，你仍然需要在类型定义文件（.d.ts）中声明它们。

```typescript
// file.d.ts

declare const __REVISION__: string;
declare const __BUILD_TIME__: string;
```

此外，不要使用太常见的名称，因为它会在整个代码中无警告地被替换。
一个好标准是让变量全部大写，并且周围用双下划线包围，这样它们就会显得突出（例如 `__REVISION__`）。

