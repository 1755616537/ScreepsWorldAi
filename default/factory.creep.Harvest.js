var pro = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.store.getFreeCapacity() > 0) { // 背包未满 采矿
			let sources = creep.room.find(FIND_SOURCES);
			let source = sources.length > 0 ? sources[0] : {};

			// 自动分配矿区
			if (globalData.AutomaticAssign) {
				// 没有分配到的Source
				if (!creep.memory.harvestSourceID) {
					// 根据9*9计算矿区地形分配数量 只计算一次缓存后固定
					try {
						if (!Memory.source) {}
					} catch (e) {
						Memory.source = {};
					}
					if (!Memory.source) {
						let memorySource = {};
						const terrain = new Room.Terrain(globalData.roomName1);
						for (let i = 0; i < sources.length; i++) {
							let val = sources[i];
							let num = 0;
							let x_ini = val.pos.x - 1;
							let x = x_ini;
							let y = val.pos.y - 1;
							for (let i = 0; i < 3; i++) {
								x = x_ini;
								for (let i2 = 0; i2 < 3; i2++) {
									if (terrain.get(x, y) != TERRAIN_MASK_WALL) {
										num++;
									}
									x++;
								}
								y++;
							}
							
							memorySource[val.id] = {
								// 允许采集记录列表
								list: [],
								// 允许采集数量
								harvestNum: num
							};
						}
						Memory.source = memorySource;
					}

					// 找出没有被分配完的矿区
					let memorySource = Memory.source;
					for (let val in memorySource) {
						// 找到空闲矿区
						if (memorySource[val].list.length < memorySource[val].num) {
							// 把creep ID记录到矿区
							memorySource[val].list.push(creep.memory.role);
							// 把矿区ID记录到creep
							creep.memory.harvestSourceID = val;
							break;
						}
					}
				}

				for (let i = 0; i < sources.length; i++) {
					if (sources[i].id == creep.memory.harvestSourceID) {
						source = sources[i];
						break
					}
				}
				if (source.id != creep.memory.harvestSourceID) {
					Throw.Error('creep ', creep.id, ' 找不到分配的矿ID ', creep.memory.harvestSourceID);
				}
			}

			// 采集能量
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				// 向目标移动
				creep.moveTo(source, {
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
	ALL: (...e) => {
		return all(...e);
	}
};

global.factory.creep.Harvest = pro;

function all() {
	return _.filter(Game.creeps, (creep) => creep.memory.role == globalData.harvest);
}