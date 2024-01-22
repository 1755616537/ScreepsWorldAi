var pro = {

	/** @param {Creep} creep **/
	run: function(creep) {
		// 房间序号
		let roomSequence = factory.room.nameGetSequence(creep.room.name);
		let spawnName = factory.spawn.sequenceGetName(roomSequence);

		// 没带carry部件或者满了，再采集能量会自动掉脚下，如果脚下有容器就会自动进容器
		// 脚下是否有CONTAINER，有就不移动
		let on = false;
		let targetPos = new RoomPosition(creep.pos.x, creep.pos.y, creep.room.name);
		let found = creep.room.lookForAt(LOOK_STRUCTURES, targetPos);
		if (found.length && found[0].structureType == STRUCTURE_CONTAINER && found[0].store.getFreeCapacity(
				RESOURCE_ENERGY) > 0) {
			on = true;
		}

		if (creep.store.getFreeCapacity() > 0 || on) { // 背包未满 采矿
			let sources = creep.room.find(FIND_SOURCES);
			// 默认去采集第一个source
			let source = sources.length > 0 ? sources[0] : null;

			// 自动分配矿区
			if (globalData.room[roomSequence - 1].AutomaticAssignHarvest) {
				// 没有分配到的Source

				// 根据9*9计算矿区地形分配数量 只计算一次缓存后固定
				// try {
				// 	if (!Memory.spawn[spawnName].source.list) {}
				// } catch (e) {
				// 	Memory.spawn[spawnName].source.list = {};
				// }
				if (!Memory.spawn[spawnName].source) {

					// 网上贡献的方法
					// let zb=creep.room.find(FIND_SOURCES).pos;
					// let dix=_.filter(creep.room.lookAtArea(LOOK_TERRAIN,zb.y-1,zb.x-1,zb.y+1,zb.x+1,1,(f)=>f.terrain=='plain' 8& creep.room.lookAt(f.pos)[0].structureType!-STRUCTURE_WALL).length)

					let memorySource = {};
					const terrain = new Room.Terrain(creep.room.name);
					let total = 0;
					for (let i = 0; i < sources.length; i++) {
						let val = sources[i];
						let num = 0;
						// 空地XY坐标列表
						let spaceXYList = [];
						let x_ini = x = val.pos.x - 1;
						let y = val.pos.y - 1;
						for (let i2 = 0; i2 < 3; i2++) {
							x = x_ini;
							for (let i3 = 0; i3 < 3; i3++) {
								if (terrain.get(x, y) != TERRAIN_MASK_WALL) {
									// console.log(x, y)
									let on = true;
									let targetPos = new RoomPosition(x, y, creep.room.name)
									// 人造墙壁
									let found = creep.room.lookForAt(LOOK_STRUCTURES, targetPos);
									// console.log(found, ' found[1] +', found[1], "+")
									if (found.length && found[0].structureType == STRUCTURE_WALL) {
										on = false;
									}
									// const look = creep.room.lookAt(targetPos);
									// look.forEach(function(lookObject) {
									// 	// 人造墙壁
									// 	if (lookObject.type != LOOK_STRUCTURES && lookObject[
									// 			LOOK_STRUCTURES][1] != '(constructedWall)') {
									// 		console.log(x, y)
									// 		on = true;
									// 	}
									// });
									if (on) {
										num++
										spaceXYList.push({
											x: x,
											y: y,
											// 如果存在CONTAINER记录允许运输列表
											list: [],
											// 当前坐标是否存在CONTAINER
											containerID: null
										})

										// 自动建造对应数量的CONTAINER
										if (globalData.room[roomSequence - 1].AutomaticAssignHarvestCONTAINER) {
											let on = true;
											// 已经存在有建筑了跳过
											if (found.length) {
												on = false;
												// console.log('found',found);

												// 已经存在CONTAINER就跳过
												// if (found[0].structureType != STRUCTURE_CONTAINER) {
												// 	on = false;
												// }
											}
											if (on) {
												// 指定位置创建一个新的 ConstructionSite
												let returnData = factory.room.get(roomSequence)
													.createConstructionSite(x, y, STRUCTURE_CONTAINER);
												if (returnData != OK) clog(x, y, '自动建造对应数量的CONTAINER ',
													returnData);
												// OK	0	这个操作已经成功纳入计划。
												// ERR_NOT_OWNER	-1	该房间被敌对玩家占领（claim）或预定（reserve）。
												// ERR_INVALID_TARGET	-7	T该建筑无法被放置在指定位置。
												// ERR_FULL	-8	你已经放置了太多建筑工地。其上限为 100。
												// ERR_INVALID_ARGS	-10	不正确的位置。
												// ERR_RCL_NOT_ENOUGH	-14	房间控制器级别不足。
											}
										}
									};
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
							harvestNum: num,
							// 空地XY坐标列表
							spaceXYList: spaceXYList
						};
					}
					Memory.spawn[spawnName].source = {
						list: memorySource,
						// 允许采集总数
						total: total
					};
					// 根据最大支持数量动态更新采集者数量
					if (globalData.creepConfigs.harvest.AutomaticAssignNum) {
						globalData.creepConfigs.harvest.number = total;
					}
				}

				let memorySource = Memory.spawn[spawnName].source.list;
				if (memorySource) {
					if (!creep.memory.harvestSourceID) {
						// 找出没有被分配完的矿区
						let memorySourceListNull = null;
						for (let val in memorySource) {
							if (memorySource[val].list.length < 1) {
								memorySourceListNull = val;
								break;
							}
						}
						for (let val in memorySource) {
							// 找到空闲矿区，优先分配给没有分配数量的矿区
							if (memorySourceListNull && val != memorySourceListNull) continue;
							if (memorySource[val].list.length < memorySource[val].harvestNum) {
								// 把creep ID记录到矿区
								memorySource[val].list.push(creep.name);
								// 把矿区ID记录到creep
								creep.memory.harvestSourceID = val;

								Memory.spawn[spawnName].source.list = memorySource;
								clog(creep.name, '已自动分配给矿区', val)
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

					if (source) {
						if (source.id != creep.memory.harvestSourceID) {
							// Throw.Error('creep ', creep.id, ' 找不到分配的矿ID ', creep.memory.harvestSourceID);
						}
					} else {
						// Throw.Error('creep ', creep.id, ' 找不到分配的矿ID ', creep.memory.harvestSourceID);
					}
				}

			}

			if (source) {
				// 采集能量
				if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
					factory.creep.moveTo(creep, source, 'Resource');
				}
			}
		} else {
			if (!Memory.spawn[spawnName].source.harvestBuildCONTAINERList) Memory.spawn[spawnName].source
				.harvestBuildCONTAINERList = {};
			let harvestBuildCONTAINERList = Memory.spawn[spawnName].source.harvestBuildCONTAINERList;
			// 脚下是否有CONTAINER没有建造完成,就优先建筑
			let targetPos = new RoomPosition(creep.pos.x, creep.pos.y, creep.room.name);
			let found = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, targetPos);
			if (found.length && found[0].structureType == STRUCTURE_CONTAINER) {
				harvestBuildCONTAINERList[creep.name] = true;
			} else {
				harvestBuildCONTAINERList[creep.name] = false;
				harvestBuildCONTAINERList = _.omit(harvestBuildCONTAINERList, creep.name);
			}
			Memory.spawn[spawnName].source.harvestBuildCONTAINERList = harvestBuildCONTAINERList;

			const harvests = factory.creep.Harvest.ALL(roomSequence);
			if (_.size(harvestBuildCONTAINERList) < harvests.length) {
				// 建造
				if (creep.build(found[0]) == ERR_NOT_IN_RANGE) {
					factory.creep.moveTo(creep, found[0]);
				}
				return
			}else{
				if(harvestBuildCONTAINERList[creep.name]){
					harvestBuildCONTAINERList[creep.name] = false;
					harvestBuildCONTAINERList = _.omit(harvestBuildCONTAINERList, creep.name);
					
					Memory.spawn[spawnName].source.harvestBuildCONTAINERList = harvestBuildCONTAINERList;
				}
			}

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
			let target = null;
			if (targets.length > 0) {
				// _.find(targets, (val) => creep.pos.getRangeTo(val)<=3)
				target = function(targets) {
					let val0range;
					for (let i = 0; i < targets.length; i++) {
						let val = targets[i];
						// 获取到指定位置的线性范围。
						const range = creep.pos.getRangeTo(val);
						// 先记录一下,避免后续重复消耗CPU
						if (i == 0) val0range = range;
						// 脚下的CONTAINER
						if (range <= 1) return val;
						// 扩大成周边范围
						if (range <= 3) return val;
					}
					// 周边找不到CONTAINER,默认第一个，如果范围大于就不前往
					return val0range < 5 ? targets[0] : null;
				}(targets);
			}
			if (!target) {
				// CONTAINER满了或者没有建  查找到该位置路径最短的对象
				target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (structure) => {
						// 返回该存储的剩余可用容量大于0的CONTAINER
						return (
								structure.structureType == STRUCTURE_EXTENSION ||
								// ||structure.structureType == STRUCTURE_TOWER
								structure.structureType == STRUCTURE_SPAWN) &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
					}
				});
			}
			if (!target) {
				// CONTAINER满了或者没有建  查找到该位置路径最短的对象
				target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (structure) => {
						// 返回该存储的剩余可用容量大于0的CONTAINER
						return (structure.structureType == STRUCTURE_CONTAINER) &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
					}
				});
			}
			if (target) {
				// 将资源从该 creep 转移至其他对象
				if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					factory.creep.moveTo(creep, target);
				}
			}
		}
	},
	ALL: (...e) => {
		return all(...e);
	}
};

global.factory.creep.Harvest = pro;

function all(spawn) {
	let returnData;

	if (spawn) {
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.harvest && creep.memory
			.spawn == spawn));
	} else {
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.harvest);
	}
	return returnData;
}