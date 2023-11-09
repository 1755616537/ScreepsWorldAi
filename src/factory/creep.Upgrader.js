let pro = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) { // 升级状态&&能量不足的时候，变为采集者
			creep.memory.upgrading = false;
			creep.say('🔄 harvest');
		}
		if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) { // 非升级状态&&能量满的时候，变为升级状态
			creep.memory.upgrading = true;
			creep.say('⚡ upgrade');
		}

		if (creep.memory.upgrading) { // 升级状态，找到控制器并升级 + 可视化
			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller, {
					visualizePathStyle: {
						stroke: '#ffffff'
					}
				});
			}
		} else { // 采集状态 + 可视化
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[1], {
					visualizePathStyle: {
						stroke: '#ffaa00'
					}
				});
			}
		}
	}
};

global.roleUpgrader = pro;



// /**
//  * 升级者配置生成器
//  * source: 从指定矿中挖矿
//  * target: 将其转移到指定的 roomController 中
//  * 
//  * @param sourceId 要挖的矿 id
//  */
// module.exports = sourceId => ({
//     // 采集能量矿
//     source: creep => {
//         const source = Game.getObjectById(sourceId)
//         if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source)

//         // 自己身上的能量装满了，返回 true（切换至 target 阶段）
//         return creep.store.getFreeCapacity() <= 0
//     },
//     // 升级控制器
//     target: creep => {
//         const controller = creep.room.controller
//         if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)

//         // 自己身上的能量没有了，返回 true（切换至 source 阶段）
//         return creep.store[RESOURCE_ENERGY] <= 0
//     }
// })
