// 代码中文解释
/// <reference types="@screepscn/types" />

// 缓存的种类
// 在介绍如何优化之前，我们先来看一下游戏中的缓存种类，已经有很多类似的文章了，所以我们这里只简单提一下：

// 持久化存储：游戏的Memory对象，只有这个地方能实现真正可靠的长时间存储。
// 半持久存储：js 的 Global对象，对象原型都属于半持久存储，这种存储会在游戏全局重置时被清除，一般存放允许丢失的数据。
// 非持久存储：直接定义在游戏对象（非原型）上的属性都属于非持久存储，例如Game.rooms.W1N1.myCustomProp = 123，这种存储只有本 tick 能访问到，用来存放 tick 内协同作业需要的数据。


// 拓展总入口
require("main_mount");

module.exports.loop = function() {
	controller.task.run();
}

// // 检查任务队列
// Spawn.prototype.work = function() { 
//     // 代码...
// }

// // 将生成任务推入队列
// Spawn.prototype.addTask = function(taskName) { 
//     // 代码...
// }

// // creep 生成主要实现
// Spawn.prototype.mainSpawn = function(taskName) { 
//     // 代码...
// }

// // 检查任务队列
// Spawn.prototype.work = function() { 
//     // 自己已经在生成了 / 内存里没有生成队列 / 生产队列为空 就啥都不干
//     if (this.spawning || !this.memory.spawnList || this.memory.spawnList.length == 0) return 
//     // 进行生成
//     const spawnSuccess = this.mainSpawn(this.memory.spawnList[0])
//     // 生成成功后移除任务
//     if (spawnSuccess) this.memory.spawnList.shift()
// }
// // 将生成任务推入队列
// Spawn.prototype.addTask = function(taskName) { 
//     // 任务加入队列
//     this.memory.spawnList.push(taskName)
//     return this.memory.spawnList.length
// }

// const creepConfigs = [
//     {
//         role: 'harvester',
//         bodys: [ WORK, CARRY, MOVE ],
//         number: 1
//     }, {
//         role: 'upgrader',
//         bodys: [ WORK, CARRY, MOVE ],
//         number: 1
//     },
//     // 更多角色 ...
// ]


// // 建设房间内的建筑工地
// Creep.prototype.buildStructure = function () {
//     const targets = this.room.find(FIND_CONSTRUCTION_SITES)
//     // 找到就去建造
//     if (targets.length > 0) {
//         if(this.build(targets[0]) == ERR_NOT_IN_RANGE) {
//             this.moveTo(targets[0])
//         }
//     }   
// }


// // 将拓展签入 Creep 原型
// module.exports = function () {
//     _.assign(Creep.prototype, creepExtension)
// }

// // 自定义的 Creep 的拓展
// const creepExtension = {
//     // 自定义敌人检测
//     checkEnemy() { 
//         // 代码实现...
//     },
//     // 填充所有 spawn 和 extension
//     fillSpawnEngry() { 
//         // 代码实现...
//     },
//     // 填充所有 tower
//     fillTower() {
//         // 代码实现...
//     },
//     // 其他更多自定义拓展
// }



