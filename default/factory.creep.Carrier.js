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
					factory.creep.moveTo(creep, targets[0], 'Resource');
				}
			} else {
				let source = null;
				// 矿区CONTAINER是否1v1运送
				if (globalData.creepConfigs.carrier.sourceContainer1v1 && Memory.source) {
					let memorySource = Memory.source.list;
					// source周边的空地是否存在CONTAINER
					for (let val in memorySource) {
						// 空地XY坐标列表
						let spaceXYList = memorySource[val].spaceXYList;
						for (let i = 0; i < spaceXYList.length; i++) {
							let x = spaceXYList[i].x;
							let y = spaceXYList[i].y;
							let targetPos = new RoomPosition(x, y, globalData.roomName1)
							// CONTAINER
							let found = creep.room.lookForAt(LOOK_STRUCTURES, targetPos);
							if (found.length && found[0].structureType == STRUCTURE_CONTAINER) {
								spaceXYList[i].containerID = found[0].id;
							} else {
								// 如果不存在CONTAINER就清除CONTAINERID
								spaceXYList[i].containerID = null;
							}
						}
						memorySource[val].spaceXYList = spaceXYList;
					}

					if (!creep.memory.carrierSourceID) {
						// 找出没有被分配完的CONTAINER
						let memoryContainerListNull = null;
						for (let val in memorySource) {
							let spaceXYList = memorySource[val].spaceXYList;
							let on = false;
							for (let i = 0; i < spaceXYList.length; i++) {
								try {
									if (spaceXYList[i].list.length < 1) {
										memoryContainerListNull = i;
										ok = true;
										break;
									}
								} catch (e) {
									//TODO handle the exception
									spaceXYList[i].list = []
								}
							}
							if (on) break;
						}
						for (let val in memorySource) {
							// 找到空闲CONTAINER，优先分配给没有分配数量的CONTAINER
							let on = false;
							let spaceXYList = memorySource[val].spaceXYList;
							for (let i = 0; i < spaceXYList.length; i++) {
								let containerID = spaceXYList[i].containerID
								if (memoryContainerListNull && containerID != spaceXYList[
										memoryContainerListNull].containerID) continue;
								if (spaceXYList[i].list.length < 1) {
									// 把creep ID记录到矿区CONTAINER
									spaceXYList[i].list.push(creep.name);
									// 把矿区ID记录到creep
									creep.memory.carrierSourceID = containerID;

									Memory.source.list[val].spaceXYList = spaceXYList;
									on = true;
									break;
								}
							}
							if (on) break;
						}
					}

					// 找出已经分配的矿区消息
					let targets = creep.room.find(FIND_STRUCTURES, {
						filter: (structure) => {
							return structure.structureType == STRUCTURE_CONTAINER;
						}
					});
					for (let i = 0; i < targets.length; i++) {
						if (targets[i].id == creep.memory.carrierSourceID) {
							// 检查是否在矿区CONTAINER记录中
							let on = false;
							for (let val in memorySource) {
								let spaceXYList = memorySource[val].spaceXYList;
								for (let i2 = 0; i2 < spaceXYList.length; i2++) {
									for (let i3 = 0; i3 < spaceXYList[i2].list.length; i3++) {
										if (spaceXYList[i2].list[i3] == creep.name) {
											on = true;
											break
										}
									}
									if (on) break;
								}
								if (on) break;
							}
							if (on) {
								// 合法记录在矿区CONTAINER
								source = targets[i];
							} else {
								// 不合法,移除
								creep.memory.carrierSourceID = null;
							}
						}
					}
					if (source) {
						if (source.id != creep.memory.carrierSourceID) {
							// Throw.Error('creep ', creep.id, ' 找不到分配的矿CONTAINERID ', creep.memory.carrierSourceID);
						}
					} else {
						// Throw.Error('creep ', creep.id, ' 找不到分配的矿CONTAINERID ', creep.memory.carrierSourceID);
					}
				}

				if (!source) {
					let targets = _.compact(
						// 所有建筑
						creep.room.find(FIND_STRUCTURES, {
							filter: (structure) => {
								// 找出有储存能量的container搬运
								return (structure.structureType == STRUCTURE_CONTAINER) &&
									structure.store.getUsedCapacity(RESOURCE_ENERGY) > 200;
							}
						}),
						// 所有墓碑
						creep.room.find(FIND_TOMBSTONES),
						// 所有废墟
						creep.room.find(FIND_RUINS)
					);
					if (targets.length > 0) {
						source = targets[0];
					}
				}

				if (source) {
					// 从建筑(structure)中拿取资源
					if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						// 向目标移动
						factory.creep.moveTo(creep, source, 'Resource');
					}
				} else {
					// 找不到可取资源的地方,先去存资源
					transfer(creep);
				}
			}
		} else {
			// 背包满了,先去存资源
			transfer(creep);
		}
	},
	ALL: (...e) => {
		return all(...e);
	}
};

global.factory.creep.Carrier = pro;

function all(spawn) {
	let returnData;
	
	if(spawn){
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.carrier && creep.memory
			.spawn == spawn));
	}else{
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.carrier);
	}
	// switch (spawn) {
	// 	case 1:
	// 		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.carrier && creep.memory
	// 			.spawn == globalData.SpawnName1));
	// 		break;
	// 	case 2:
	// 		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.carrier && creep.memory
	// 			.spawn == globalData.SpawnName2));
	// 		break;
	// 	case 3:
	// 		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.carrier && creep.memory
	// 			.spawn == globalData.SpawnName3));
	// 		break;
	// 	default:
	// 		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.carrier);
	// }
	return returnData;
}

function transfer(creep) {
	// 找出需要补充能量的建筑
	// let targets = creep.room.find(FIND_STRUCTURES, {
	// 	filter: (structure) => {
	// 		// 找出需要储存能量
	// 		return (structure.structureType == STRUCTURE_TOWER) &&
	// 			structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
	// 	}
	// });
	// if (targets.length < 1) {

	// }
	let targets = creep.room.find(FIND_STRUCTURES, {
		filter: (structure) => {
			// 找出需要储存能量
			return (structure.structureType == STRUCTURE_EXTENSION ||
					structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_TOWER) &&
				structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
		}
	});
	if (targets.length < 1) {
		targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				// 找出需要储存能量
				return (structure.structureType == STRUCTURE_CONTAINER) &&
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
			}
		});
		// 去除矿区的CONTAINER
		let targets2 = targets;
		for (let i = 0; i < targets2.length; i++) {
			let memorySource = Memory.source.list;
			let on = false;
			for (let val in memorySource) {
				let spaceXYList = memorySource[val].spaceXYList;
				for (let i2 = 0; i2 < spaceXYList.length; i2++) {
					if (spaceXYList[i2].x == targets2[i].pos.x && spaceXYList[i2].y == targets2[i].pos.y) {
						targets2.splice(i, 1);
						on = true;
						break;
					}
				}
				if (on) break;
			}
		}
		targets = targets2;
	}
	if (targets.length > 0) {
		// 将资源从该 creep 转移至其他对象
		if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			// 向目标移动
			factory.creep.moveTo(creep, targets[0]);
		}
	}
}