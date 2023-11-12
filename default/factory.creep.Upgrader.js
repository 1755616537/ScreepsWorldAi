let pro = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) { // 升级状态&&能量不足的时候，变为采集者
			creep.memory.upgrading = false;
			creep.say('🔄 采集');
		}
		if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) { // 非升级状态&&能量满的时候，变为升级状态
			creep.memory.upgrading = true;
			creep.say('⚡ 升级');
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
			const harvests = factory.creep.Harvest.ALL();
			if (harvests.length < 1) {
				// 采集死完后,自己去采集
				let targets = creep.room.find(FIND_SOURCES);
				if (creep.harvest(targets[0]) == ERR_NOT_IN_RANGE) {
					// 向目标移动
					creep.moveTo(targets[0], {
						visualizePathStyle: {
							stroke: '#ffaa00'
						}
					});
				}
			} else {
				let targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						// 找出有储存能量的container搬运
						return (structure.structureType == STRUCTURE_CONTAINER ||
								structure.structureType == STRUCTURE_EXTENSION ||
								structure.structureType == STRUCTURE_SPAWN ||
								structure.structureType == STRUCTURE_TOWER) &&
							structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
					}
				});
				
				if (targets.length > 0) {
					// 从建筑(structure)中拿取资源
					if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						// 向目标移动
						creep.moveTo(targets[0], {
							visualizePathStyle: {
								stroke: '#ffaa00'
							}
						});
					}
				}
			}
		}
	},
	ALL: () => {
		return _.filter(Game.creeps, (creep) => creep.memory.role == globalData.upgrader);
	}
};

global.factory.creep.Upgrader = pro;



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