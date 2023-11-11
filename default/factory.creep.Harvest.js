var pro = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.store.getFreeCapacity() > 0) { // 背包未满 采矿
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], {
					visualizePathStyle: {
						stroke: '#ffaa00'
					}
				});
			}
		} else {
			var targets = creep.room.find(FIND_STRUCTURES, { //找出需要补充能量的建筑
				filter: (structure) => {
					return (
							// structure.structureType == STRUCTURE_EXTENSION ||
							// structure.structureType == STRUCTURE_SPAWN ||
							// structure.structureType == STRUCTURE_TOWER ||
							structure.structureType == STRUCTURE_CONTAINER) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
			});
			if (targets.length > 0) { // 需要维护的建筑数目 > 0
				let target = () => {
					for (let val in targets) {
						const range = creep.pos.getRangeTo(val);
						if (range <= 3) return val;
					}
				}

				if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target, {
						visualizePathStyle: {
							stroke: '#ffffff'
						}
					});
				}
			}
		}
	},
	ALL: () => {
		return _.filter(Game.creeps, (creep) => creep.memory.role == globalData.harvest);
	}
};

global.factory.creep.Harvest = pro;