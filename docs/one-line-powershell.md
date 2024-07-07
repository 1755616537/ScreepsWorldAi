翻译自官方文档：https://github.com/screepers/screeps-typescript-starter/blob/master/docs/in-depth/cookbook/one-line-powershell.md
# PowerShell快速设置Screeps TypeScript环境的一次性命令的指南

使用PowerShell快速设置Screeps TypeScript环境的一次性命令的指南。

**警告提示:** 自v3.0版本起，该方法不再有效，相关[问题](https://github.com/ChrisTaylorRocks/screeps-typescript-starter-setup/issues/1)正在追踪中 。

介绍:
[@ChrisTaylorRocks](https://github.com/ChrisTaylorRocks) 创建了一个PowerShell脚本，能够通过单一命令启动并运行Screeps的初学者工具包。 [去这里看看！](https://github.com/ChrisTaylorRocks/screeps-typescript-starter-setup)

## 使用方法

对于PowerShell版本小于5.0:

```text
PS> (new-object Net.WebClient).DownloadString('http://bit.ly/2z2QDJI') | iex; New-ScreepsTypeScriptSetup
```

对于PowerShell版本5.0及以上:

```text
PS> curl http://bit.ly/2z2QDJI | iex; New-ScreepsTypeScriptSetup
```

