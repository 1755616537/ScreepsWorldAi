/**
// 代码中文解释
/// <reference types="@screepscn/types" />

// 拓展总入口 只执行一次
require("main_mount")();

// 主程序入口 每次tips都执行一次
module.exports.loop = function() {
	// 任务调度启动
	controller.task.run();
	// 房间管理
	controller.room.run();
	// creep管理
	controller.creep.run();

	// clog('本次tips使用 CPU 时间总量 ',Game.cpu.getUsed())
}

// 中文API
// https://screeps-cn.github.io/api/#
// 英文API
// https://docs.screeps.com/api/#
// lodash
// https://www.lodashjs.com/

// 房间 W25N6  W42S57 W48S54 W47S54
// https://screeps.com/a/#!/room/shard3/W47S54

// 缓存的种类
// 持久化存储：游戏的Memory对象，只有这个地方能实现真正可靠的长时间存储。
// 半持久存储：js 的 Global对象，对象原型都属于半持久存储，这种存储会在游戏全局重置时被清除，一般存放允许丢失的数据。
// 非持久存储：直接定义在游戏对象（非原型）上的属性都属于非持久存储，例如Game.rooms.W1N1.myCustomProp = 123，这种存储只有本 tick 能访问到，用来存放 tick 内协同作业需要的数据。

// 待完成程序:
// .废弃（可能会缺失部件导致程序错误，能量消费不是最优解）.多一种角色管理系统，不区分兵种，先统一分配后固定站岗，缺少了补上，1对1搬运
// .统一任务调度机制
// .creep阵型，攻击拉扯
// .自动铺路，能量源，控制器。方案1：两点最近距离（PathFinder.search）.方案2：走得次数多的地方铺路
// .createConstructionSite自动布局EXTENSION建筑 控制器等级3布局TOWER
// .外能量源采集（根据给定的房间名列出所有可用的出口Game.map.describeExits）
// .每个STORAGE搭配一个运输者。如果存在STORAGE并且搭配有运输者，其他运输者才可以把能量放到STORAGE
// .spawn是否停止获取能量，先用于生产
// .可以选择根据room总能量上限energyCapacityAvailable动态调整配置，energyAvailable来判断是否可以生产
// .TOWER逻辑顺序攻击，维修，治疗，运输者是否1v1运送能量或者1vN运送能量
// .安全模式，发现敌人安全模式开启，在外creep返回墙内.计算危险区域(Terrain静态地形)，当开启安全模式，creep不得移动到危险区域，除了攻击者除外
// .矿床Mineral，稀有资源储备Deposit。自动9*9内建CONTAINER(允许在路road上面建)，限制就1个CONTAINER
// .限制每个能量源就1个CONTAINER
// .BUG.把自动建CONTAINER允许在路road和可穿透墙rampart上面建
// .设置限制TOWER维修rampart到1M就不维修
// .采集者，升级者，会根据区域9*9哪里有CONTAINER或正在建造的CONTAINER坐标上面站着，如果已经站有一个，不做此限制
// 生产creep时，在memory上记录属于的spawn和room。（一个room可能会有多个spawn）.BUG.把通过spawnName获取roomSequence,通过roomSequence获取spawnName代码更改
// .BUG.在获取roomSequence时判断roomName是否存在配置中，如果不存在抛出异常
// .多个spawn同时生产creep时，用类型名称+时间+spawn名称+_.uniqueId（harvest_564563_spawn1_100）
// .任务调派运输资源查看creep的store剩余可储存的数量在判断是否需要多名一起运输
// .renewCreep增加目标 creep 的剩余生存时间
// .核弹原爆点FIND_NUKES,邮件提示并且房间文本显示（发射此核弹的房间名launchRoomName+着落倒计时timeToLand）
// .核弹的爆炸范围是以落点为中心的 5 * 5 的正方形区域。建设防御核弹建筑布局
// .自动统计计算出每个区域的范围，已不可通行的建筑为划分。计算危险区域（临近传送区域的区域）
// .利用远程传输建筑实现房间里能量平衡
// .警报模式。当房间出现敌人，计算敌人数量，携带部件，危险程度。通过危险程度启动应当程序（优先启动能量平衡，防御治疗兵种生成）


// 完成程序:
// .(废弃(改完出现错误)[此名称是 Game.creeps 对象中指向该 creep 对象的哈希键]).把小兵ID放到memory里面，不在使用小兵名称作为唯一ID值判断，改为小兵ID
// .每个运输者可以配置是否固定能量源区运输,属于的在自由选择
// .采集如果脚下有CONTAINER，挖完就放进CONTAINER（没带carry部件或者满了，再采集能量会自动掉脚下，如果脚下有容器就会自动进容器了）
// .在升级控制器的9*9空位其中一个上放置一个CONTAINER（并且检测是否在控制器7*7范围内），多个升级小兵共享一个CONTAINER
// .受到攻击掉血开启安全模式(getEventLog),Tower开启优先攻击模式
// .采集者，在能量源区脚下的CONTAINER未建成，先采集能量了自己建，在运输到需要运输的地方。至少留下一个运输到基地，不自己建
// .运输者，（取，放）状态切换，去取CONTAINER能量后可以选择去捡能量也可以去放
// .运输者一对一搬运，把搬运目标地址写在运输者缓存里面，不在重复循环消耗CPU，new一个RoomPosition
// .把每种小兵的取用能量加上状态,取满在用,用完在取
// .当控制器区存在有能量的CONTAINER,从控制器区存的CONTAINER取能量
// .BUG.能量源区CONTAINER记录信息,控制器CONTAINER记录信息,在creep死亡后,没有正常删除信息,导致无法加入新creeps记录
// .Game.notify邮件提示配置开关添加,统一入口使用，限制一分钟内有相同信息不重复发送
// .在room受到攻击，记录受到攻击对象的id和时间，在摧毁时查询记录是否在固定时间内（5）受到攻击，才开启安全模式
// .在一分钟内受到攻击，并且我方建筑物被摧毁，才开启控制器安全模式
// .离STORAGE最近的TOWER，才会消耗能量补充墙壁

 */


