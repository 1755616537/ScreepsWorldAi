# ScreepsWorldAi
ScreepsWorld游戏代码

# 说明
<span style="color:red;">必要数据：</span>
执行初始化initialization会占用Memory.rooms。避免冲突，导致程序无法运行。<br>
<span style="color: yellow;">提示1.</span>
全局变量：
初始化[globalData.js](./src/globalData.js)
定义类型[GlobalData.ts](./src/globals/GlobalData.ts)
<br>
<span style="color: yellow;">提示2.</span>
global.XXX类型找不到定义[globals.d.ts](./src/globals.d.ts)
<br>
<span style="color: yellow;">提示3.</span>
creep.memory.XXX类型找不到定义[index.d.ts](./src/index.d.ts)

### 构建项目
`npm run build`
编译最终文件<br>
`npm run push`&nbsp;&nbsp;
编译最终文件并根据（[.secret.json](./.secret.json)）上传到服务器。（适合线上服务器）<br>
`npm run local`
编译最终文件并根据（[.secret.json](./.secret.json)）复制到指定目录。（适合本地服务器）<br>

## ./src 文件结构
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
[initialization](./src/initialization.js)：初始化入口（只执行一次）

## ./src/Alliance 文件结构
[ThirdPartyCode](./src/Alliance/ThirdPartyCode)：联盟第三方代码<br>
[main](./src/Alliance/main)：main入口<br>
[initialization](./src/Alliance/initialization)：初始化入口<br>
[room](./src/Alliance/room)：room控制器入口<br>
[creep](./src/Alliance/creep)：creep控制器入口<br>

## ./ 文件结构
[.secret.json](./.secret.json)：配置文件【编译后处理】<br>
[fetchData.js](./fetchData.js)：配置文件【编译后依赖下载数据文件】<br>
[rollup.config.mjs](./rollup.config.mjs)：配置文件【rollup】<br>
[tsconfig.json](./tsconfig.json)：配置文件【typescript】<br>
