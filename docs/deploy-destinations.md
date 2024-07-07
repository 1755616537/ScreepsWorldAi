翻译自官方文档：https://github.com/screepers/screeps-typescript-starter/blob/master/docs/in-depth/deploy-destinations.md
# [.secret.json](../.secret.json) 部署密钥文件 

[.secret.json](../.secret.json) 文件是一个 JSON 格式的配置文件，它被细分为多个部署目标。默认情况下，我们已经为你预设了四个主要的部署目的地。
<br>
<br>
这些目的地主要包括：
1. 公共服务器 (main)：Screeps的主要游戏世界，玩家在此进行游戏互动。
2. 模拟器 (sim)：用于代码测试和调试的模拟环境。 
3. 挑战服务器 (season)：用于参与官方或社区组织的各种挑战活动。
4. 私人服务器 (pserver)：如果你拥有自己的私有Screeps服务器，可以在此部署代码。

在 [.secret.json](../.secret.json) 文件中，每个目的地都有其特定的配置，包括服务器的URL和必要的API令牌。API令牌对于验证你的身份至关重要，确保你的代码能够安全地部署到不同的服务器上。

要生成你的API令牌，请参阅 [此处](https://github.com/screepers/screeps-typescript-starter/blob/master/docs/getting-started/authenticating.md)，其中详细介绍了生成API令牌的步骤。请务必妥善保存你的API令牌，不要将其泄露给他人，以免造成账户安全风险。

```javascript
{
  // 将代码部署到 主世界
  "main": {
    "token": "YOUR_TOKEN",
    "protocol": "https",
    "hostname": "screeps.com",
    "port": 443,
    "path": "/",
    "branch": "main"
  },
  // 将代码部署到 模拟器
  "sim": {
    "token": "YOUR_TOKEN",
    "protocol": "https",
    "hostname": "screeps.com",
    "port": 443,
    "path": "/",
    "branch": "sim"
  },
  // 将代码部署到 季节性活动服务器
  "season": {
    "token": "YOUR_TOKEN",
    "protocol": "https",
    "hostname": "screeps.com",
    "port": 443,
    "path": "/season",
    "branch": "main"
  },
  // 将代码部署到 私有服务器
  "pserver": {
    "token": "YOUR_TOKEN",
    "protocol": "http",
    "hostname": "1.2.3.4",
    "port": 21025,
    "path": "/",
    "branch": "main"
  }
}
```

可以通过复制配置对象并进行必要的更改来创建多个目标环境。 使用 `--environment DEST:<dest>` 参数来指定上传的环境。

例如：
```bash
rollup -c --environment DEST:main
```
如果不指定目标环境，则只会进行编译和打包代码，而不会上传。
