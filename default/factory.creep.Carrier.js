// 运输者

var pro = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.store.getFreeCapacity() > 0) { // 背包未满
			// 所有掉落的资源
			let targets = creep.room.find(FIND_DROPPED_RESOURCES);
			// const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
			// if(target)
			if (targets.length > 0) {
				// 捡起一个物品 (如捡起一些能量)
				if (creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
					// 向目标移动
					creep.moveTo(targets[0], {
						visualizePathStyle: {
							stroke: '#ffaa00'
						}
					});
				}
			} else {
				let targets = _.compact(
					// 所有建筑
					creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_CONTAINER) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
						}
					}),
					// 所有墓碑
					creep.room.find(FIND_TOMBSTONES),
					// 所有废墟
					// creep.room.find(FIND_RUINS)
				);

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

		} else {
			// 找出需要补充能量的建筑
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					// 找出需要储存能量的EXTENSION，SPAW，TOWERN
					return (structure.structureType == STRUCTURE_EXTENSION ||
							structure.structureType == STRUCTURE_SPAWN ||
							structure.structureType == STRUCTURE_TOWER) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
			});
			if (targets.length > 0) {
				// 将资源从该 creep 转移至其他对象
				if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					// 向目标移动
					creep.moveTo(targets[0], {
						visualizePathStyle: {
							stroke: '#ffffff'
						}
					});
				}
			}
		}
	},
	ALL: () => {
		return _.filter(Game.creeps, (creep) => creep.memory.role == globalData.carrier);
	}
};

global.factory.creep.Carrier = pro;