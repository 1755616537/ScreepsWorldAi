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
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES); // 寻找建筑位
			if (targets.length) { // targets.length > 0  || 建筑位 > 0
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {
						visualizePathStyle: {
							stroke: '#ffffff'
						}
					}); // 绘制路径
				}
			} else {
				// 修复受损建筑
				let targets = creep.room.find(FIND_STRUCTURES, {
					filter: object => object.hits < object.hitsMax
				});

				targets.sort((a, b) => a.hits - b.hits);

				if (targets.length > 0) {
					if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0], {
							visualizePathStyle: {
								stroke: '#ffffff'
							}
						});
					}
				}
			}
		} else { // 非building状态的时候， 到source旁边并采集
			let targets;
			const harvests = factory.creep.Harvest.ALL();
			if (harvests.length > 1) {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						// 找出有储存能量的container搬运
						return (structure.structureType == STRUCTURE_CONTAINER ||
								structure.structureType == STRUCTURE_EXTENSION ||
								structure.structureType == STRUCTURE_SPAWN ||
								structure.structureType == STRUCTURE_TOWER) &&
							structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
					}
				});
			} else {
				// 采集死完后,自己去采集
				targets = creep.room.find(FIND_SOURCES);
			}

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
	},
	ALL: () => {
		return _.filter(Game.creeps, (creep) => creep.memory.role == globalData.builder);
	}
};

global.factory.creep.Builder = pro;