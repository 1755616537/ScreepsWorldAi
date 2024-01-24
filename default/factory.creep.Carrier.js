// 运输者

var pro = {

	/** @param {Creep} creep **/
	run: function(creep) {
		// work && 背包为空
		if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.work = false;
			creep.say('🔄 收获');
		}
		// 非work状态 && 背包满(空余为0)
		if (!creep.memory.work && creep.store.getFreeCapacity() == 0) {
			creep.memory.work = true;
			creep.say('🛒 存放');
		}

		// 房间序号
		let roomSequence = factory.room.nameGetSequence(creep.room.name);
		let spawnName = factory.spawn.sequenceGetName(roomSequence);
		let roomName = factory.room.sequenceGetName(roomSequence);

		if (!creep.memory.work) {
			// 所有掉落的资源
			let target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
			// const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
			// if(target)
			if (target) {
				// 捡起一个物品 (如捡起一些能量)
				if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
					// 向目标移动
					factory.creep.moveTo(creep, target, 'Resource');
				}
			} else {
				let source = null;
				// 能量源区CONTAINER是否1v1运送
				if (globalData.creepConfigs.carrier.sourceContainer1v1 && Memory.spawn[spawnName].source) {
					let memorySource = Memory.spawn[spawnName].source.list;
					// source周边的空地是否存在CONTAINER
					for (let val in memorySource) {
						// 空地XY坐标列表
						let spaceXYList = memorySource[val].spaceXYList;
						for (let i = 0; i < spaceXYList.length; i++) {
							let x = spaceXYList[i].x;
							let y = spaceXYList[i].y;
							let targetPos = new RoomPosition(x, y, creep.room.name)
							// CONTAINER
							let found = creep.room.lookForAt(LOOK_STRUCTURES, targetPos);
							if (found.length && found[0].structureType == STRUCTURE_CONTAINER) {
								spaceXYList[i].containerID = found[0].id;
							} else {
								// 如果不存在CONTAINER就清除CONTAINERID
								spaceXYList[i].containerID = null;

								// 是否有正在建造的CONSTRUCTION
								let found = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, targetPos);
								if (found.length && found[0].structureType != STRUCTURE_CONTAINER) {
									// 指定位置创建一个新的 ConstructionSite
									let returnData = factory.room.get(roomSequence)
										.createConstructionSite(x, y, STRUCTURE_CONTAINER);
									if (returnData != OK) {
										clog('能量源区自动建造对应数量的CONTAINER 房间', roomName, ' x', x, ' y', y,
											returnData);
									} else {
										clog('能量源区自动建造对应数量的CONTAINER 房间', roomName, ' x', x, ' y', y,
											returnData);
									}
								}
							}
						}
						memorySource[val].spaceXYList = spaceXYList;
					}

					let TransportationTarget = creep.memory.TransportationTarget;
					if (!TransportationTarget) {
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
									// 把creep ID记录到能量源区CONTAINER
									spaceXYList[i].list.push(creep.name);
									// 把能量源区ID记录到creep
									creep.memory.TransportationTarget = {
										id: containerID,
										type: 'Source'
									};

									Memory.spawn[spawnName].source.list[val].spaceXYList = spaceXYList;
									on = true;
									clog('房间', roomName, ' ', creep.name, '已自动分配给能量源区', val, "Container",
										spaceXYList[i].containerID)
									break;
								}
							}
							if (on) break;
						}
					}

					// 找出已经分配的能量源区消息
					TransportationTarget = creep.memory.TransportationTarget;
					if (TransportationTarget && TransportationTarget.type ==
						'Source') {
						let targets = creep.room.find(FIND_STRUCTURES, {
							filter: (structure) => {
								return structure.structureType == STRUCTURE_CONTAINER;
							}
						});
						for (let i = 0; i < targets.length; i++) {
							if (targets[i].id == TransportationTarget.id) {
								// 检查是否在能量源区CONTAINER记录中
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
									// 合法记录在能量源区CONTAINER
									source = targets[i];
								} else {
									// 不合法,移除
									creep.memory.TransportationTarget = null;
								}
							}
						}
					}

					if (source) {
						if (TransportationTarget && source.id != TransportationTarget.id &&
							TransportationTarget == 'Source') {
							// Throw.Error('creep ', creep.id, ' 找不到分配的能量源CONTAINERID ', creep.memory.TransportationTargetID);
						}
					} else {
						// Throw.Error('creep ', creep.id, ' 找不到分配的能量源CONTAINERID ', creep.memory.TransportationTargetID);
					}
				}

				if (!source) {
					// 所有建筑 去除控制器Container
					let memoryControllerContainer;
					let on = false;
					try {
						memoryControllerContainer = Memory.spawn[spawnName].controller.container;
						on = true;
					} catch (e) {

					}
					if (on && memoryControllerContainer && memoryControllerContainer.id) {
						on = true;
					} else {
						on = false;
					}
					let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_CONTAINER) &&
								(on ? structure.id != memoryControllerContainer.id : true) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100;
						}
					})
					let targets = [];
					if (target) {
						targets.push(target);
					}
					targets = targets.concat(
						// 所有墓碑
						creep.room.find(FIND_TOMBSTONES, {
							filter: (structure) => {
								return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
							}
						}),
						// 所有废墟
						creep.room.find(FIND_RUINS, {
							filter: (structure) => {
								return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
							}
						}),
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

	if (spawn) {
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.carrier && creep.memory
			.spawn == spawn));
	} else {
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.carrier);
	}
	return returnData;
}

function transfer(creep) {
	// 房间序号
	let roomSequence = factory.room.nameGetSequence(creep.room.name);
	let spawnName = factory.spawn.sequenceGetName(roomSequence);

	// 给控制器CONTAINER,运输能量
	if (transferControllerContainer(creep)) return;
	// 给Tower,运输能量
	// if (transferTower(creep)) return;

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
					structure.structureType == STRUCTURE_SPAWN) &&
				structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
		}
	});
	if (targets.length < 1) {
		targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				// 找出需要储存能量
				return (structure.structureType == STRUCTURE_TOWER) &&
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > structure.store.getCapacity(
						RESOURCE_ENERGY) / 3;
			}
		});
	}
	if (targets.length < 1) {
		targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				// 找出需要储存能量
				return (structure.structureType == STRUCTURE_CONTAINER) &&
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
			}
		});
		// 去除能量源区的CONTAINER
		let targets2 = [];
		let memorySource = Memory.spawn[spawnName].source.list;
		for (let i = 0; i < targets.length; i++) {
			let on = false;
			// 能量源区的CONTAINER
			for (let val in memorySource) {
				let spaceXYList = memorySource[val].spaceXYList;
				for (let i2 = 0; i2 < spaceXYList.length; i2++) {
					if (spaceXYList[i2].x == targets[i].pos.x && spaceXYList[i2].y == targets[i].pos.y) {
						// targets2.splice(i, 1);
						on = true;
						break;
					}
				}
				if (on) break;
			}

			if (!on) {
				targets2.push(targets[i])
			}
		}
		targets = targets2;

		// 如果剩余数量大于1，去除控制器区的CONTAINER
		if (targets.length > 1) {
			let targets2 = [];
			let memoryControllerContainer = Memory.spawn[spawnName].controller.container;
			for (var i = 0; i < targets.length; i++) {
				// 控制器区的CONTAINER
				if (targets[i].pos.x == memoryControllerContainer.x && targets[i].pos.y == memoryControllerContainer
					.y) {

				} else {
					targets2.push(targets[i])
				}
			}
			targets = targets2;
		}
	}
	if (targets.length > 0) {
		// 将资源从该 creep 转移至其他对象
		if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			// 向目标移动
			factory.creep.moveTo(creep, targets[0]);
		}
	} else {
		// 储存能量都满了不用搬运能量,先干其他
		let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
		if (targets.length > 0) {
			// 建造
			if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
				factory.creep.moveTo(creep, targets[0]);
			}
		}
		if (targets.length < 1) {
			targets = creep.room.find(FIND_STRUCTURES, {
				filter: object => object.hits < object.hitsMax
			});
			targets.sort((a, b) => a.hits - b.hits);
			if (targets.length > 0) {
				// 维修
				if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					factory.creep.moveTo(creep, targets[0]);
				}
			}
		}
		if (targets.length < 1) {
			// 升级
			if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				factory.creep.moveTo(creep, creep.room.controller);
			}
		}

	}
}

// 控制器Container
function transferControllerContainer(creep) {
	// 房间序号
	let roomSequence = factory.room.nameGetSequence(creep.room.name);
	let spawnName = factory.spawn.sequenceGetName(roomSequence);
	let roomName = factory.room.sequenceGetName(roomSequence);

	// 控制器旁是否有CONTAINER或在建的CONTAINER
	let pos = creep.room.controller.pos;
	let found = creep.room.lookAtArea(pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1, true);
	let found2 = _.filter(found, (f) => f.type == LOOK_CONSTRUCTION_SITES || (f.type == LOOK_STRUCTURES && f
		.structure.structureType == STRUCTURE_CONTAINER));

	let memoryControllerContainer;
	let on = false;
	try {
		memoryControllerContainer = Memory.spawn[spawnName].controller.container;
		if (!memoryControllerContainer.x || !memoryControllerContainer.y) Throw.Error(
			'Memory.spawn[' + spawnName + '].controller.container不存在x或y');
		on = true;
	} catch (e) {
		if (!Memory.spawn[spawnName].controller) Memory.spawn[spawnName].controller = {};

		if (found2.length > 0) {
			let x = found2[0].x;
			let y = found2[0].y;
			Memory.spawn[spawnName].controller = {
				container: {
					x: x,
					y: y,
					id: null,
					// 运输者的ID列表
					list: []
				}
			}
		}
	}

	if (found2.length < 1 && on && memoryControllerContainer.x && memoryControllerContainer.y) {
		// 如果不存在CONTAINER就清除CONTAINERID
		Memory.spawn[spawnName].controller.container.id = null;

		let x = memoryControllerContainer.x;
		let y = memoryControllerContainer.y;
		// 指定位置创建一个新的 ConstructionSite
		let returnData = creep.room.createConstructionSite(x, y, STRUCTURE_CONTAINER);
		if (returnData != OK) {
			clog('自动建造对应数量的CONTAINER 房间', roomName, ' x', x, ' y', y, returnData);
			Memory.spawn[spawnName].controller = {
				container: {
					x: x,
					y: y,
					id: null,
					// 运输者的ID列表
					list: []
				}
			}
		}
	}

	if (memoryControllerContainer && memoryControllerContainer.id) {
		let TransportationTarget = creep.memory.TransportationTarget;
		// 没有分配运输者,进行分配
		if (memoryControllerContainer.list.length < 1) {
			if (!TransportationTarget) {
				memoryControllerContainer.list.push(creep.name);
				creep.memory.TransportationTarget = {
					id: memoryControllerContainer.id,
					type: 'ControllerContainer'
				};
				clog('房间', roomName, ' ', creep.name, '已自动分配给控制器Container', memoryControllerContainer.id);
			}
		}

		// 运输能量
		if (TransportationTarget && TransportationTarget.id && TransportationTarget.id == memoryControllerContainer
			.id && TransportationTarget.type == 'ControllerContainer') {
			// 检查是否在控制器CONTAINER记录中
			let on = false;
			for (let i2 = 0; i2 < memoryControllerContainer.list.length; i2++) {
				if (creep.name == memoryControllerContainer.list[i2]) {
					on = true;
					break;
				}
			}
			if (on) {
				// 合法记录在控制器CONTAINER
				const source = Game.getObjectById(memoryControllerContainer.id);
				// 将资源从该 creep 转移至其他对象
				if (creep.transfer(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					// 向目标移动
					factory.creep.moveTo(creep, source);
				}
				return true;
			} else {
				// 不合法,移除
				creep.memory.TransportationTarget = null;
			}
		}
	} else {
		// 存在正在建造的CONTAINER,检测是否建造完成
		let x = Memory.spawn[spawnName].controller.container.x;
		let y = Memory.spawn[spawnName].controller.container.y;
		let targetPos = new RoomPosition(x, y, creep.room.name)
		// CONTAINER
		let found = creep.room.lookForAt(LOOK_STRUCTURES, targetPos);
		if (found.length && found[0].structureType == STRUCTURE_CONTAINER) {
			Memory.spawn[spawnName].controller.container.id = found[0].id;
		}
	}
	return false;
}

function transferTower(creep) {
	// 房间序号
	let roomSequence = factory.room.nameGetSequence(creep.room.name);
	let spawnName = factory.spawn.sequenceGetName(roomSequence);
	let roomName = factory.room.sequenceGetName(spawnSequence);

	let memoryTower;
	let on = false;
	try {
		memoryTower = Memory.spawn[spawnName].Tower;
		on = true;
	} catch (e) {
		if (!Memory.spawn[spawnName].Tower) Memory.spawn[spawnName].Tower = {};
	}

	let memoryTowerList;
	on = false;
	try {
		memoryTowerList = Memory.spawn[spawnName].Tower.list;
		on = true;
	} catch (e) {
		if (!Memory.spawn[spawnName].Tower.list) Memory.spawn[spawnName].Tower.list = [];
	}

	let memoryTowerCarryList;
	on = false;
	try {
		memoryTowerList = Memory.spawn[spawnName].Tower.carryList;
		on = true;
	} catch (e) {
		if (!Memory.spawn[spawnName].Tower.carryList) Memory.spawn[spawnName].Tower.carryList = [];
	}

	if (on && memoryTower) {
		let TransportationTarget = creep.memory.TransportationTarget;
		// 没有分配运输者,进行分配
		if (memoryTower.list.length < 1) {
			if (!TransportationTarget) {
				memoryTower.list.push(creep.name);
				creep.memory.TransportationTarget = {
					id: memoryTower.id,
					type: 'Tower'
				};
				clog('房间', roomName, ' ', creep.name, '已自动分配给Tower', memoryTower.id);
			}
		}

		// 运输能量
		if (TransportationTarget && TransportationTarget.id && TransportationTarget.id == memoryTower
			.id && TransportationTarget.type == 'Tower') {
			// 检查是否在Tower记录中
			let on = false;
			for (let i2 = 0; i2 < memoryTower.list.length; i2++) {
				if (creep.name == memoryTower.list[i2]) {
					on = true;
					break;
				}
			}
			if (on) {
				// 合法记录
				const source = Game.getObjectById(memoryTower.id);
				// 将资源从该 creep 转移至其他对象
				if (creep.transfer(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					// 向目标移动
					factory.creep.moveTo(creep, source);
				}
				return true;
			} else {
				// 不合法,移除
				creep.memory.TransportationTarget = null;
			}
		}
	} else {
		// 存在正在建造的CONTAINER,检测是否建造完成
		let x = Memory.spawn[spawnName].controller.container.x;
		let y = Memory.spawn[spawnName].controller.container.y;
		let targetPos = new RoomPosition(x, y, creep.room.name)
		// CONTAINER
		let found = creep.room.lookForAt(LOOK_STRUCTURES, targetPos);
		if (found.length && found[0].structureType == STRUCTURE_CONTAINER) {
			Memory.spawn[spawnName].controller.container.id = found[0].id;
		}
	}
	return false;
}