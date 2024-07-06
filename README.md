# ScreepsWorldAi
***
ScreepsWorld游戏代码

<br>

## 说明
***
* 必要数据：
> 1. 执行初始化（[initialization](./src/Alliance/initialization)）会占用（[Memory.rooms]()）。避免冲突，导致程序无法运行。<br>
* 提示
> 1. 全局变量：
     初始化（[globalData.js](./src/globalData.js)）
     定义类型（[GlobalData.ts](./src/globals/GlobalData.ts)）
> 2. （[global.XXX]()）类型找不到，定义文件（[globals.d.ts](./src/globals.d.ts)）
> 3. （[creep.memory.XXX]()）类型找不到，定义文件（[index.d.ts](./src/index.d.ts)）

<br>

## 构建项目
***
> `npm run build`
编译最终文件<br>
> `npm run push`&nbsp;&nbsp;
编译最终文件并根据（[.secret.json](./.secret.json)）上传到服务器。（适合线上服务器）<br>
> `npm run local`
编译最终文件并根据（[.secret.json](./.secret.json)）复制到指定目录。（适合本地服务器）<br>
<br>

* 提示 <br>
（首次Git获取仓库时，文件（[.secret.json](./.secret.json)）是不存在的。此文件属于隐私密钥，请勿上传到Git）
> 当（[./](./)）目录下没有（[.secret.json](./.secret.json)）文件时，可以从目录（[./额外](./额外)）下，
复制（[Tocken例子.secret.json](./额外/Tocken例子.secret.json)）改名（[.secret.json](./.secret.json)），
配置内容修改成，游戏中的Tocken（[main.token]()），本地游戏代码目录路径（[local.copyPath]()）。

* 例子:
```
{
	"main": {
		"token": "{{游戏API token}}",
		"protocol": "https",
		"hostname": "screeps.com",
		"port": 443,
		"path": "/",
		"branch": "default"
	},
	"local": {
		"copyPath": "C:/Users/{{管理员名}}/AppData/Local/Screeps/scripts/screeps.com/default"
	}
}
```

<br>

## ./src 文件结构
***
[Alliance](./src/Alliance)：联盟相关<br>
[controller](./src/controller)：控制器 <br>
[factory](./src/factory)：工厂（模块） <br>
[modules](./src/modules)：错误捕捉 <br>
[utils](./src/utils)：工具（第三方模块 或 公共代码） <br>
[额外](./额外)：杂类（设计模式，说明，等） <br>
[globals](./globals)：定义global.XXX的数据类型 <br>
[globalData](./src/globalData.js)：全局数据 <br>
[main](./src/main.js)：主程序入口 <br>
[main_mount](./src/main_mount.js)：拓展总入口（只执行一次） <br>
[initialization](./src/initialization.js)：初始化入口（只执行一次）<br>

## ./src/Alliance 文件结构
***
[ThirdPartyCode](./src/Alliance/ThirdPartyCode)：联盟第三方代码<br>
[main](./src/Alliance/main)：main入口<br>
[initialization](./src/Alliance/initialization)：初始化入口<br>
[room](./src/Alliance/room)：room控制器入口<br>
[creep](./src/Alliance/creep)：creep控制器入口<br>

## ./ 文件结构
***
[.secret.json](./.secret.json)：配置文件【编译后处理】<br>
[fetchData.js](./fetchData.js)：配置文件【编译后依赖下载数据文件】<br>
[rollup.config.mjs](./rollup.config.mjs)：配置文件【rollup】<br>
[tsconfig.json](./tsconfig.json)：配置文件【typescript】<br>
