var pro = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.store.getFreeCapacity() > 0) { // 背包未满 采矿
			let sources = creep.room.find(FIND_SOURCES);
			// 默认去采集第一个source
			let source = sources.length > 0 ? sources[0] : {};

			// 自动分配矿区
			if (globalData.AutomaticAssignHarvest) {
				// 没有分配到的Source

				// 根据9*9计算矿区地形分配数量 只计算一次缓存后固定
				// try {
				// 	if (!Memory.source.list) {}
				// } catch (e) {
				// 	Memory.source.list = {};
				// }
				if (!Memory.source) {
					let memorySource = {};
					const terrain = new Room.Terrain(globalData.roomName1);
					let total = 0;
					for (let i = 0; i < sources.length; i++) {
						let val = sources[i];
						let num = 0;
						let x_ini = x = val.pos.x - 1;
						let y = val.pos.y - 1;
						for (let i2 = 0; i2 < 3; i2++) {
							x = x_ini;
							for (let i3 = 0; i3 < 3; i3++) {
								if (terrain.get(x, y) != TERRAIN_MASK_WALL) {
									// console.log(x, y)
									let on = true;
									let target = new RoomPosition(x, y, globalData.roomName1)
									// 人造墙壁
									const found = creep.room.lookForAt(LOOK_STRUCTURES, target);
									// console.log(found, ' found[1] +', found[1], "+")
									if (found.length && found[0].structureType == STRUCTURE_WALL) {
										on = false;
									}
									// const look = creep.room.lookAt(target);
									// look.forEach(function(lookObject) {
									// 	// 人造墙壁
									// 	if (lookObject.type != LOOK_STRUCTURES && lookObject[
									// 			LOOK_STRUCTURES][1] != '(constructedWall)') {
									// 		console.log(x, y)
									// 		on = true;
									// 	}
									// });
									if (on) num++;
								}
								x++;
							}
							y++;
						}

						total += num;
						memorySource[val.id] = {
							// 允许采集记录列表
							list: [],
							// 允许采集数量
							harvestNum: num
						};
					}
					Memory.source = {
						list: memorySource,
						// 允许采集总数
						total: total
					};
					// 根据最大支持数量动态更新采集者数量
					if (globalData.creepConfigs.harvest.AutomaticAssignNum) {
						globalData.creepConfigs.harvest.number = total;
					}
				}

				let memorySource = Memory.source.list;

				if (!creep.memory.harvestSourceID) {
					// 找出没有被分配完的矿区
					for (let val in memorySource) {
						// 找到空闲矿区
						if (memorySource[val].list.length < memorySource[val].harvestNum) {
							// 把creep ID记录到矿区
							memorySource[val].list.push(creep.name);
							// 把矿区ID记录到creep
							creep.memory.harvestSourceID = val;

							Memory.source.list = memorySource;
							break;
						}
					}
				}

				// 找出已经分配的矿区消息
				for (let i = 0; i < sources.length; i++) {
					if (sources[i].id == creep.memory.harvestSourceID) {
						// 检查是否在矿区记录中
						let memorySourceList = memorySource[sources[i].id].list;
						let on = false;
						for (let i2 = 0; i2 < memorySourceList.length; i2++) {
							if (memorySourceList[i2] == creep.name) {
								on = true;
								break
							}
						}
						if (on) {
							// 合法记录在矿区
							source = sources[i];
						} else {
							// 不合法,移除
							creep.memory.harvestSourceID = null;
						}
						break
					}
				}
				if (source.id != creep.memory.harvestSourceID) {
					// Throw.Error('creep ', creep.name, ' 找不到分配的矿ID ', creep.memory.harvestSourceID);
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
			} else {
				// CONTAINER满了或者没有建
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						// 返回该存储的剩余可用容量大于0的CONTAINER
						return (
								structure.structureType == STRUCTURE_EXTENSION ||
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