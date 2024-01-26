global.controller.room = {
	run: () => {

		_.forEach(Game.rooms, room => {
			// 房间序号
			let roomSequence = factory.room.nameGetSequence(room.name);
			let roomName = room.name;
			let spawnName = factory.spawn.sequenceGetName(roomSequence);

			// 安全
			factory.Secure.run(roomSequence);
			// 塔
			factory.Tower.run(roomSequence);

			let eventLog = room.getEventLog();
			// 建造完成 邮件提示
			let buildEvents = _.filter(eventLog, {
				event: EVENT_BUILD
			});
			if (buildEvents.length > 0) {
				buildEvents.forEach(event => {
					let target = Game.getObjectById(event.data.targetId);
					if (target && target.progress && target.progressTotal) {
						if (target.progress + event.data.amount >= target.progressTotal) {
							clog('房间' + roomName, '建造完成', JSON.stringify(event));
							Utils.notify(
								`【${roomName}】房间,id【${event.data.targetId}】${event.data.structureType} x${event.data.x} y${event.data.y}【建造】【完成】`
							);
						}
					}
				});
			}

			// 一个游戏对象被摧毁或是被消灭 邮件提示
			let objectDestroyedEvents = _.filter(eventLog, {
				event: EVENT_OBJECT_DESTROYED
			});
			if (objectDestroyedEvents.length > 0) {
				objectDestroyedEvents.forEach(event => {
					clog('房间' + roomName, '一个游戏对象被摧毁或是被消灭', JSON.stringify(event));
					if (event.data.type != 'creep') {
						Utils.notify(
							`【${roomName}】房间,id【${event.objectId}】${event.data.type}【被摧毁或是被消灭】`
						);
					}

				});
			}

			// 建筑（自动建造等）
			factory.Build.run(roomSequence);

			// 房间显示文本
			roomVisual(roomSequence);

			// CONTAINER+EXTENSION+STORAGE能量统计
			containerExtensionStorageEnergyStat(roomSequence);
		});

		// 能量源区Container记录管理
		sourceContainer(1);
		// 控制器Container记录管理
		controllerContainer(1);
		// 采集建造CONTAINER记录管理
		harvestBuildCONTAINER(1);

		// 临时外部房间,升级
		upgraderOuterRoom(2);
		// 临时外部房间,建造
		// builderOuterRoom(2);
	}
}

// 房间显示文本
function roomVisual(roomSequence) {
	let room = factory.room.get(roomSequence);

	const harvests = factory.creep.Harvest.ALL(roomSequence);
	const upgraders = factory.creep.Upgrader.ALL(roomSequence);
	const builders = factory.creep.Builder.ALL(roomSequence);
	const carriers = factory.creep.Carrier.ALL(roomSequence);
	const repairers = factory.creep.Repairer.ALL(roomSequence);
	const nearDefenders = factory.creep.Defender.ALLNearDefender(roomSequence);
	const farDefenders = factory.creep.Defender.ALLFarDefender(roomSequence);
	const theHealers = factory.creep.TheHealer.ALL(roomSequence);
	const occupiers = factory.creep.Occupier.ALL(roomSequence);

	// 查看控制器等级
	const controller_level = factory.spawn.get(roomSequence).room.controller.level;

	room.visual.text('控制器等级:' + controller_level, 1, 1, {
		align: 'left',
	});

	room.visual.text('采集者:' + harvests.length, 1, 2, {
		align: 'left',
	});
	room.visual.text('升级者:' + upgraders.length, 1, 3, {
		align: 'left'
	});
	room.visual.text('建造者:' + builders.length, 1, 4, {
		align: 'left'
	});
	room.visual.text('运输者:' + carriers.length, 1, 5, {
		align: 'left'
	});
	room.visual.text('维修者:' + repairers.length, 1, 6, {
		align: 'left'
	});
	room.visual.text('近战者:' + nearDefenders.length, 1, 7, {
		align: 'left'
	});
	room.visual.text('远战者:' + farDefenders.length, 1, 8, {
		align: 'left'
	});
	room.visual.text('治疗者:' + theHealers.length, 1, 9, {
		align: 'left'
	});
	room.visual.text('占领者:' + occupiers.length, 1, 10, {
		align: 'left'
	});
}

// 能量源区Container记录管理
function sourceContainer(roomSequence) {
	let spawnName = factory.spawn.sequenceGetName(roomSequence);

	let memorySource;
	let on = false;
	// 如果没有合法记录会不存在harvestSourceID,报错需要捕获
	try {
		memorySource = Memory.spawn[spawnName].source.list;
		on = true;
	} catch (e) {
		//TODO handle the exception
	}
	// 检查是否在能量源区CONTAINER中记录creep是否还存活
	if (on && memorySource) {
		for (let val in memorySource) {
			let spaceXYList = memorySource[val].spaceXYList;
			for (let i = 0; i < spaceXYList.length; i++) {
				let spaceXYListList2 = [];
				for (let i2 = 0; i2 < spaceXYList[i].list.length; i2++) {
					let on = false;
					_.forEach(Game.creeps, (creep) => {
						if (creep.name == spaceXYList[i].list[i2]) {
							on = true;
							return false;
						}
					})
					if (on) {
						let creepName = spaceXYList[i].list[i2];
						let containerID = spaceXYList[i].containerID;
						let TransportationTarget = Game.creeps[creepName].memory.TransportationTarget;
						if (TransportationTarget) {
							if (TransportationTarget.id == containerID && TransportationTarget.type == 'Source') {
								spaceXYListList2.push(creepName);
							} else {
								Game.creeps[creepName].memory.TransportationTarget = null;
							}
						}
					}
				}
				Memory.spawn[spawnName].source.list[val].spaceXYList[i].list = spaceXYListList2;
			}
		}
	}
}

// 控制器Container记录管理
function controllerContainer(roomSequence) {
	let spawnName = factory.spawn.sequenceGetName(roomSequence);

	let memoryControllerContainer;
	let on = false;
	try {
		memoryControllerContainer = Memory.spawn[spawnName].controller.container;
		on = true;
	} catch (e) {
		//TODO handle the exception
	}
	if (on && memoryControllerContainer) {
		if (memoryControllerContainer.list && memoryControllerContainer.list.length > 0) {
			// 检查是否在控制器CONTAINER中记录creep是否还存活
			let memoryControllerContainerList2 = [];
			for (let i = 0; i < memoryControllerContainer.list.length; i++) {
				let on = false;
				_.forEach(Game.creeps, (creep) => {
					if (creep.name == memoryControllerContainer.list[i]) {
						on = true;
						return false;
					}
				})
				if (on) {
					let creepName = memoryControllerContainer.list[i];
					let containerID = memoryControllerContainer.id;
					let TransportationTarget = Game.creeps[creepName].memory.TransportationTarget;
					if (TransportationTarget) {
						if (TransportationTarget.id == containerID && TransportationTarget.type ==
							'ControllerContainer') {
							memoryControllerContainerList2.push(creepName);
						} else {
							Game.creeps[creepName].memory.TransportationTarget = null;
						}
					}
				}
			}
			Memory.spawn[spawnName].controller.container.list = memoryControllerContainerList2;
		}
	}
}

// 采集建造CONTAINER记录管理
function harvestBuildCONTAINER(roomSequence) {
	let spawnName = factory.spawn.sequenceGetName(roomSequence);

	let harvestBuildCONTAINERList;
	let on = false;
	try {
		if (!Memory.spawn[spawnName].source.harvestBuildCONTAINERList) Memory.spawn[spawnName].source
			.harvestBuildCONTAINERList = {};
		harvestBuildCONTAINERList = Memory.spawn[spawnName].source.harvestBuildCONTAINERList;
		on = true;
	} catch (e) {
		//TODO handle the exception
	}

	if (on && _.size(harvestBuildCONTAINERList) > 0) {
		// 检查是否记录中的creep是否还存活
		let harvestBuildCONTAINERList2 = {};
		for (i in harvestBuildCONTAINERList) {
			let on = false;
			_.forEach(Game.creeps, (creep) => {
				if (creep.name == i) {
					on = true;
					return false;
				}
			})
			if (on) harvestBuildCONTAINERList2[i] = harvestBuildCONTAINERList[i];
		}
		Memory.spawn[spawnName].source.harvestBuildCONTAINERList = harvestBuildCONTAINERList2;

	}
}

// CONTAINER+EXTENSION+STORAGE能量统计
function containerExtensionStorageEnergyStat(roomSequence) {
	let roomName = factory.room.sequenceGetName(roomSequence);
	let spawnName = factory.spawn.sequenceGetName(roomSequence);
	let targets = factory.room.get(roomSequence).find(FIND_STRUCTURES, {
		filter: (structure) => {
			return (structure.structureType == STRUCTURE_CONTAINER ||
					structure.structureType == STRUCTURE_EXTENSION ||
					structure.structureType == STRUCTURE_STORAGE) &&
				structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
		}
	});
	let targetsStore = [];
	for (var i = 0; i < targets.length; i++) {
		targetsStore.push(targets[i].store[RESOURCE_ENERGY]);
	}
	let total = _.sum(targetsStore);
	if (parseInt(total) < 500) {
		clog('房间' + roomName, 'CONTAINER+EXTENSION+STORAGE能量' + total + '不足500');
		Utils.notify(
			`【${roomName}】房间【CONTAINER+EXTENSION+STORAGE能量${total}不足500】`
		);
	}
	Memory.spawn[spawnName].containerExtensionStorageEnergyStat = total;
}

// 临时外部房间,升级
function upgraderOuterRoom(roomSequence) {
	let spawnName = factory.spawn.sequenceGetName(roomSequence);
	let room = factory.room.get(roomSequence);


	let creepName = '';
	const upgraders = factory.creep.Upgrader.ALL(1);
	if (upgraders < 1) return;
	// 是否已存在
	_.forEach(upgraders, upgrader => {
		if (upgrader.memory.upgraderOuterRoom) {
			creepName = upgrader.name;
			return false;
		}
	})
	// 找新的
	if (!creepName) {
		_.forEach(upgraders, upgrader => {
			if (!upgrader.memory.upgraderOuterRoom) {
				upgrader.memory.upgraderOuterRoom = roomSequence;
				creepName = upgrader.name;
				return false;
			}
		})
	}
	let creep = Game.creeps[creepName];

	if (!room) {
		factory.creep.moveTo(creep, new RoomPosition(43, 17, roomName));
	} else {
		if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // 升级状态&&能量不足的时候，变为采集者
			creep.memory.work = false;
			creep.say('🔄 采集');
		}
		if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非升级状态&&能量满的时候，变为升级状态
			creep.memory.work = true;
			creep.say('⚡ 升级');
		}

		if (creep.memory.work) { // 升级状态，找到控制器并升级 + 可视化
			if (creep.upgradeController(room.controller) == ERR_NOT_IN_RANGE) {
				factory.creep.moveTo(creep, room.controller);
			}
		} else {
			// 掉落的资源
			let targets = room.find(FIND_DROPPED_RESOURCES);
			if (targets.length > 0) {
				// 捡起一个物品 (如捡起一些能量)
				if (creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
					// 向目标移动
					factory.creep.moveTo(creep, targets[0], 'Resource');
				}
			} else {
				targets = targets.concat(
					// 所有墓碑
					room.find(FIND_TOMBSTONES, {
						filter: (structure) => {
							return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
						}
					}),
					// 所有废墟
					room.find(FIND_RUINS, {
						filter: (structure) => {
							return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
						}
					}),
				);
				if (targets.length < 1) {
					let sources = room.find(FIND_SOURCES);
					// 采集能量
					if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
						factory.creep.moveTo(creep, sources[0], 'Resource');
					}
					return;
				}
				if (targets.length < 1) {
					targets = factory.room.get(1).find(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_CONTAINER) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
						}
					});
				}
				if (targets.length > 0) {
					// 从建筑(structure)中拿取资源
					if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						// 向目标移动
						factory.creep.moveTo(creep, targets[0], 'Resource');
					}
				}
			}

		}
	}
}

// 临时外部房间,建造
function builderOuterRoom(roomSequence) {
	let spawnName = factory.spawn.sequenceGetName(roomSequence);
	let room = factory.room.get(roomSequence);


	let creepName = '';
	const builders = factory.creep.Builder.ALL(1);
	if (builders < 1) return;
	// 是否已存在
	_.forEach(builders, builder => {
		if (builder.memory.builderOuterRoom) {
			creepName = builder.name;
			return false;
		}
	})
	// 找新的
	if (!creepName) {
		_.forEach(builders, builder => {
			if (!builder.memory.builderOuterRoom) {
				builder.memory.builderOuterRoom = roomSequence;
				creepName = builder.name;
				return false;
			}
		})
	}
	let creep = Game.creeps[creepName];

	if (!room) {
		factory.creep.moveTo(creep, new RoomPosition(43, 17, roomName));
	} else {
		if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // work && 背包为空
			creep.memory.work = false; // 变为 非work状态
			creep.say('🔄 收获');
		}
		if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非work状态 && 背包满(空余为0)
			creep.memory.work = true; // 变为 work状态
			creep.say('🚧 建造');
		}

		if (creep.memory.work) {
			let targets = room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length > 0) {
				// 建造
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					factory.creep.moveTo(creep, targets[0]);
				}
			}
		} else {
			// 掉落的资源
			let targets = room.find(FIND_DROPPED_RESOURCES);
			if (targets.length > 0) {
				// 捡起一个物品 (如捡起一些能量)
				if (creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
					// 向目标移动
					factory.creep.moveTo(creep, targets[0], 'Resource');
				}
			} else {
				targets = targets.concat(
					// 所有墓碑
					room.find(FIND_TOMBSTONES, {
						filter: (structure) => {
							return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
						}
					}),
					// 所有废墟
					room.find(FIND_RUINS, {
						filter: (structure) => {
							return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
						}
					}),
				);
				if (targets.length < 1) {
					let sources = room.find(FIND_SOURCES);
					// 采集能量
					if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
						factory.creep.moveTo(creep, sources[0], 'Resource');
					}
					return;
				}
				if (targets.length < 1) {
					targets = factory.room.get(1).find(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_CONTAINER) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
						}
					});
				}
				if (targets.length > 0) {
					// 从建筑(structure)中拿取资源
					if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						// 向目标移动
						factory.creep.moveTo(creep, targets[0], 'Resource');
					}
				}
			}
		}
	}
}