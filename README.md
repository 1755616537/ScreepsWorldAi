# ScreepsWorldAi
ScreepsWorld游戏代码<br>

<br>

## 说明
* <mark>必要（数据、函数）：（避免冲突，导致程序无法正常运行）</mark>
> 1. 保留（[Memory.rooms]()）房间数据。执行初始化（[initialization](./src/Alliance/initialization)）会占用<br>
> 2. 保留（[global.globalData]()）全局变量
> 2. 保留（[global.Factory_]()）工厂
> 3. 保留（[global.Controller_]()）控制器
> 4. 保留（[global.Task_]()）任务
> 5. 保留（[global.ChainedFun_]()）链式Function
> 6. 保留（[global.clog]()）输出信息
> 7. 保留（[global.log]()）输出信息
> 8. 保留（[global.Utils]()）工具
> 9. 保留（[global.RES_COLOR_MAP]()）资源显示 helper_roomResource
> 10. 保留（[global.RES_TREE]()）资源显示 helper_roomResource
> 11. 保留（[global.roomResSvg]()）资源显示 helper_roomResource
> 12. 保留（[global.roomResEcharts]()）资源显示 helper_roomResource
* 提示
> 1. 全局变量：
     初始化（[globalData.js](./src/globalData.js)）
     定义类型（[GlobalData.ts](./src/globals/GlobalData.ts)）
> 2. （[global.XXX]()）类型找不到，定义文件（[globals.d.ts](./src/globals.d.ts)）
> 3. （[creep.memory.XXX]()）类型找不到，定义文件（[index.d.ts](./src/index.d.ts)）

* 汉化（控制器输入）

方法1:
```
`<script src="https://screeps-cn.gitee.io/screeps-chinese-pack-release/main.js" async defer></script>`
```
方法2:
```
Utils.cn();
```

<br>

## 构建项目
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

* 例子1:
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
* 例子2:
```
{
  "main": {
    "email": "{{游戏邮箱}}",
    "password": "{{游戏密码}}",
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

## [./src](./src) 文件结构
[Alliance](./src/Alliance)：联盟相关<br>
[controller](./src/controller)：控制器 <br>
[factory](./src/factory)：工厂（模块） <br>
[modules](./src/modules)：错误捕捉 <br>
[utils](./src/utils)：工具（第三方模块 或 公共代码） <br>
[额外](./额外)：杂类（设计模式，说明，等） <br>
[globals](./globals)：定义（[global.XXX]()）的数据类型 <br>
[globalData](./src/globalData.js)：全局数据 <br>
[main](./src/main.js)：主程序入口 <br>
[main_mount](./src/main_mount.js)：拓展总入口（只执行一次） <br>
[initialization](./src/initialization.js)：初始化入口（只执行一次）<br>

## [./src/Alliance](./src/Alliance) 文件结构
[ThirdPartyCode](./src/Alliance/ThirdPartyCode)：联盟第三方代码<br>
[main](./src/Alliance/main)：main入口<br>
[initialization](./src/Alliance/initialization)：初始化入口<br>
[room](./src/Alliance/room)：room控制器入口<br>
[creep](./src/Alliance/creep)：creep控制器入口<br>

## [./](./) 文件结构
[.secret.json](./.secret.json)：配置文件【编译后处理】<br>
[fetchData.js](./fetchData.js)：配置文件【编译后依赖下载数据文件】<br>
[rollup.config.mjs](./rollup.config.mjs)：配置文件【rollup】<br>
[tsconfig.json](./tsconfig.json)：配置文件【typescript】<br>

## 其他说明
中文API<br>
https://screeps-cn.github.io/api/#<br>
英文API<br>
https://docs.screeps.com/api/#<br>
lodash<br>
https://www.lodashjs.com/<br>

* 缓存的种类
> 1. 持久化存储：游戏的Memory对象，只有这个地方能实现真正可靠的长时间存储。
> 2. 半持久存储：js 的 Global对象，对象原型都属于半持久存储，这种存储会在游戏全局重置时被清除，一般存放允许丢失的数据。
> 3. 非持久存储：直接定义在游戏对象（非原型）上的属性都属于非持久存储，例如Game.rooms.W1N1.myCustomProp = 123，这种存储只有本 tick 能访问到，用来存放 tick 内协同作业需要的数据。

* 设计方案参考
  <br>
https://github.com/lc150303/The-design-of-OverDom/tree/master/doc

## 完成进度
> * ~~废弃（可能会缺失部件导致程序错误，能量消费不是最优解）.多一种角色管理系统，不区分兵种，先统一分配后固定站岗，缺少了补上，1对1搬运~~ 
> * 统一任务调度机制 
> * creep阵型，攻击拉扯 
> * 自动铺路，能量源，控制器。方案1：两点最近距离（PathFinder.search）.方案2：走得次数多的地方铺路 
> * createConstructionSite自动布局EXTENSION建筑 控制器等级3布局TOWER 
> * 外能量源采集（根据给定的房间名列出所有可用的出口Game.map.describeExits） 
> * 每个STORAGE搭配一个运输者。如果存在STORAGE并且搭配有运输者，其他运输者才可以把能量放到STORAGE 
> * spawn是否停止获取能量，先用于生产
> * 可以选择根据room总能量上限energyCapacityAvailable动态调整配置，energyAvailable来判断是否可以生产
> * TOWER逻辑顺序攻击，维修，治疗，运输者是否1v1运送能量或者1vN运送能量
> * 安全模式，发现敌人安全模式开启，在外creep返回墙内.计算危险区域(Terrain静态地形)，当开启安全模式，creep不得移动到危险区域，除了攻击者除外
> * 矿床Mineral，稀有资源储备Deposit。自动9*9内建CONTAINER(允许在路road上面建)，限制就1个CONTAINER
> * 限制每个能量源就1个CONTAINER
> * BUG.把自动建CONTAINER允许在路road和可穿透墙rampart上面建
> * 设置限制TOWER维修rampart到1M就不维修
> * 采集者，升级者，会根据区域9*9哪里有CONTAINER或正在建造的CONTAINER坐标上面站着，如果已经站有一个，不做此限制
> * 生产creep时，在memory上记录属于的spawn和room。（一个room可能会有多个spawn）.BUG.把通过spawnName获取roomSequence,通过roomSequence获取spawnName代码更改
> * BUG.在获取roomSequence时判断roomName是否存在配置中，如果不存在抛出异常
> * 多个spawn同时生产creep时，用类型名称+时间+spawn名称+_.uniqueId（harvest_564563_spawn1_100）
> * 任务调派运输资源查看creep的store剩余可储存的数量在判断是否需要多名一起运输
> * renewCreep增加目标 creep 的剩余生存时间
> * 核弹原爆点FIND_NUKES,邮件提示并且房间文本显示（发射此核弹的房间名launchRoomName+着落倒计时timeToLand）
> * 核弹的爆炸范围是以落点为中心的 5 * 5 的正方形区域。建设防御核弹建筑布局
> * 自动统计计算出每个区域的范围，已不可通行的建筑为划分。计算危险区域（临近传送区域的区域）
> * 利用远程传输建筑实现房间里能量平衡
> * 警报模式。当房间出现敌人，计算敌人数量，携带部件，危险程度。通过危险程度启动应当程序（优先启动能量平衡，防御治疗兵种生成）
> * 能量源区每只建一个CONTAINER，只分配一个采集者，采集者自动移动到CONTAINER上方
> * - [x] ~~(废弃(改完出现错误)[此名称是 Game.creeps 对象中指向该 creep 对象的哈希键]).把小兵ID放到memory里面，不在使用小兵名称作为唯一ID值判断，改为小兵ID~~
> * - [x] 每个运输者可以配置是否固定能量源区运输,属于的在自由选择
> * - [x] 采集如果脚下有CONTAINER，挖完就放进CONTAINER（没带carry部件或者满了，再采集能量会自动掉脚下，如果脚下有容器就会自动进容器了）
> * - [x] 在升级控制器的9*9空位其中一个上放置一个CONTAINER（并且检测是否在控制器7*7范围内），多个升级小兵共享一个CONTAINER
> * - [x] 受到攻击掉血开启安全模式(getEventLog),Tower开启优先攻击模式
> * - [x] 采集者，在能量源区脚下的CONTAINER未建成，先采集能量了自己建，在运输到需要运输的地方。至少留下一个运输到基地，不自己建
> * - [x] 运输者，（取，放）状态切换，去取CONTAINER能量后可以选择去捡能量也可以去放
> * - [x] 运输者一对一搬运，把搬运目标地址写在运输者缓存里面，不在重复循环消耗CPU，new一个RoomPosition
> * - [x] 把每种小兵的取用能量加上状态,取满在用,用完在取
> * - [x] 当控制器区存在有能量的CONTAINER,从控制器区存的CONTAINER取能量
> * - [x] BUG.能量源区CONTAINER记录信息,控制器CONTAINER记录信息,在creep死亡后,没有正常删除信息,导致无法加入新creeps记录
> * - [x] Game.notify邮件提示配置开关添加,统一入口使用，限制一分钟内有相同信息不重复发送
> * - [x] 在room受到攻击，记录受到攻击对象的id和时间，在摧毁时查询记录是否在固定时间内（5）受到攻击，才开启安全模式
> * - [x] 在一分钟内受到攻击，并且我方建筑物被摧毁，才开启控制器安全模式
> * - [x] 离STORAGE最近的TOWER，才会消耗能量补充墙壁