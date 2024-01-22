var pro = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) { // building && 背包为空
			creep.memory.building = false; // 变为 非building状态
			creep.say('🔄 收获');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) { // 非building状态 && 背包满(空余为0)
			creep.memory.building = true; // 变为 building状态
			creep.say('🚧 建造');
		}

		if (creep.memory.building) { // building状态的时候
			// 寻找建筑位
			// 路
			let targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_ROAD;
				}
			});
			// 墙壁
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_WALL;
					}
				});
			}
			// 小型储存能量
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_EXTENSION;
					}
				});
			}
			// 中型储存能量
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_CONTAINER;
					}
				});
			}
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			}

			if (targets.length > 0) { // targets.length > 0  || 建筑位 > 0
				// 建造
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					factory.creep.moveTo(creep, targets[0]);
				}
			} else {
				// 修复受损建筑
				let targets = creep.room.find(FIND_STRUCTURES, {
					filter: object => object.hits < object.hitsMax
				});

				targets.sort((a, b) => a.hits - b.hits);

				if (targets.length > 0) {
					if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
						factory.creep.moveTo(creep, targets[0]);
					}
				}
			}
		} else { // 非building状态的时候， 到source旁边并采集
			const harvests = factory.creep.Harvest.ALL();
			if (harvests.length < 2) {
				// 采集死完后,自己去采集
				let target = creep.pos.findClosestByPath(FIND_SOURCES);
				if (target) {
					if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
						factory.creep.moveTo(creep, target, 'Resource');
					}
				}

			} else {
				let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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
				if (!target) {
					// 找不到可搬运的地方,从基地搬运
					target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_SPAWN ||
								structure.structureType == STRUCTURE_EXTENSION
							) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 200;
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

global.factory.creep.Builder = pro;

function all(spawn) {
	let returnData;

	if (spawn) {
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.builder && creep.memory
			.spawn == spawn));
	} else {
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.builder);
	}
	return returnData;
}