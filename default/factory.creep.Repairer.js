// 维修者

var pro = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) { // building && 背包为空
			creep.memory.building = false; // 变为 非building状态
			creep.say('🔄 收获');
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) { // 非building状态 && 背包满(空余为0)
			creep.memory.building = true; // 变为 building状态
			creep.say('🚧 维修');
		}

		if (creep.memory.building) { // building状态的时候
			// 修复受损建筑 优先CONTAINER
			let targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER) &&
						structure.hits < structure.hitsMax;
				}
			});
			// 可通行墙壁
			if (targets.length < 1) {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_RAMPART) &&
							structure.hits < structure.hitsMax;
					}
				});
			}
			// 路
			if (targets.length < 1) {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_ROAD) &&
							structure.hits < structure.hitsMax;
					}
				});
			}
			// 墙壁
			if (targets.length < 1) {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_WALL) &&
							structure.hits < structure.hitsMax;
					}
				});
			}
			if (targets.length < 1) {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: object => object.hits < object.hitsMax
				});
			}

			targets.sort((a, b) => a.hits - b.hits);

			if (targets.length > 0) {
				if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					factory.creep.moveTo(creep, targets[0]);
				}
			}
		} else { // 非building状态的时候， 到source旁边并采集
			const harvests = factory.creep.Harvest.ALL();
			if (harvests.length < 2) {
				// 采集死完后,自己去采集
				let target = creep.pos.findClosestByPath(FIND_SOURCES);
				if (target) {
					if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
						// 向目标移动
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

global.factory.creep.Repairer = pro;

function all(spawn) {
	let returnData;
	
	if(spawn){
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.repairer && creep.memory
			.spawn == spawn));
	}else{
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.repairer);
	}
	return returnData;
}