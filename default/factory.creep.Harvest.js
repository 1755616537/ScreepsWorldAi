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
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					// 返回该存储的剩余可用容量大于0的CONTAINER
					return (
							// structure.structureType == STRUCTURE_EXTENSION ||
							// structure.structureType == STRUCTURE_SPAWN ||
							// structure.structureType == STRUCTURE_TOWER ||
							structure.structureType == STRUCTURE_CONTAINER) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
			});
			if (targets.length > 0) {
				// _.find(targets, (val) => creep.pos.getRangeTo(val)<=3)
				let target = function(targets) {
					for (let i = 0; i < targets.length; i++) {
						let val = targets[i];
						// 获取到指定位置的线性范围。
						const range = creep.pos.getRangeTo(val);
						// 脚下的CONTAINER
						if (range <= 1) return val;
						// 扩大成周边范围
						if (range <= 3) return val;
					}
					// 周边找不到CONTAINER,默认第一个
					return targets[0];
				}(targets);
				// 将资源从该 creep 转移至其他对象
				if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					// 向目标移动
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