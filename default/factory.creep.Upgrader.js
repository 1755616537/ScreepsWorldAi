let pro = {

	/** @param {Creep} creep **/
	run: function(creep) {

		if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // 升级状态&&能量不足的时候，变为采集者
			creep.memory.work = false;
			creep.say('🔄 采集');
		}
		if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非升级状态&&能量满的时候，变为升级状态
			creep.memory.work = true;
			creep.say('⚡ 升级');
		}

		// 房间序号
		let roomSequence = factory.room.nameGetSequence(creep.room.name);
		let spawnName = factory.spawn.sequenceGetName(roomSequence);

		if (creep.memory.work) { // 升级状态，找到控制器并升级 + 可视化
			if (!creep.room.controller.sign) {
				// 对控制器签名
				if (creep.signController(creep.room.controller, "peaceful development.") ==
					ERR_NOT_IN_RANGE) {
					factory.creep.moveTo(creep, creep.room.controller);
				}
			} else {
				if (creep.room.controller.sign.username != globalData.username) {
					// 对控制器签名
					if (creep.signController(creep.room.controller, "peaceful development.") ==
						ERR_NOT_IN_RANGE) {
						factory.creep.moveTo(creep, creep.room.controller);
					}
				}else{
					// 升级
					if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
						factory.creep.moveTo(creep, creep.room.controller);
					}
				}
			}

		} else { // 采集状态 + 可视化
			const harvests = factory.creep.Harvest.ALL(roomSequence);
			if (harvests.length < 1) {
				// 采集死完后,自己去采集
				let target = creep.pos.findClosestByPath(FIND_SOURCES);
				if (target) {
					if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
						// 向目标移动
						factory.creep.moveTo(creep, target, 'Resource');
					}
				}
			} else {
				let target;

				let memoryControllerContainer;
				let on = false;
				try {
					memoryControllerContainer = Memory.spawn[spawnName].controller.container;
					on = true;
				} catch (e) {
					//TODO handle the exception
				}
				if (on && memoryControllerContainer && memoryControllerContainer.id) {
					target = Game.getObjectById(memoryControllerContainer.id);
					if (target.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
						target = null;
					}
				}

				if (!target) {
					target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_CONTAINER) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
							// return (structure.structureType == STRUCTURE_CONTAINER ||
							// 		structure.structureType == STRUCTURE_EXTENSION ||
							// 		(structure.structureType == STRUCTURE_SPAWN &&
							// 			structure.store.getUsedCapacity(RESOURCE_ENERGY) > 250) ||
							// 		structure.structureType == STRUCTURE_TOWER) &&
							// 	structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
						}
					});
				}
				if (!target) {
					// 找不到可搬运的地方,从基地搬运
					target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_SPAWN) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 200;
						}
					});
				}
				if (!target) {
					// 找不到可搬运的地方,从基地搬运
					target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_EXTENSION) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
						}
					});
				}
				if (!target) {
					// 采集死完后,自己去采集
					target = creep.pos.findClosestByPath(FIND_SOURCES);
					if (target) {
						if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
							// 向目标移动
							factory.creep.moveTo(creep, target, 'Resource');
						}
						return
					}
				}

				if (target) {
					// 从建筑(structure)中拿取资源
					if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						// 向目标移动
						factory.creep.moveTo(creep, target, 'Resource');
					}
				}
			}
		}
	},
	ALL: (...e) => {
		return all(...e);
	}
};

global.factory.creep.Upgrader = pro;

function all(spawn) {
	let returnData;

	if (spawn) {
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.upgrader && creep.memory
			.spawn == spawn));
	} else {
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.upgrader);
	}
	return returnData;
}



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