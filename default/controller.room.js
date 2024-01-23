global.controller.room = {
	run: () => {

		_.forEach(Game.rooms, room => {
			// 房间序号
			let roomSequence = factory.room.nameGetSequence(room.name);
			let spawnName = factory.spawn.sequenceGetName(roomSequence);

			let eventLog = room.getEventLog();
			let buildEvents = _.filter(eventLog, {
				event: EVENT_BUILD
			});
			if (buildEvents.length > 0) {
				buildEvents.forEach(event => {
					// console.log(JSON.stringify(event))
					let target = Game.getObjectById(event.data.targetId);
					if (target.progress && target.progressTotal) {
						console.log(target.progress, ' ', target.progressTotal)
						if (target.progress == target.progressTotal) {
							Game.notify(
								`【${spawnName}】房间,${event.data.structureType} x${event.data.x} y${event.data.y}【建造】【完成】`
							);
						}
					}
				});
			}
		});


		sourceContainer(1);
		controllerContainer(1);
		harvestBuildCONTAINER(1);
		containerEnergyStat(1);
	}
}

// 矿区Container记录管理
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
	// 检查是否在矿区CONTAINER中记录creep是否还存活
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

// CONTAINER能量统计
function containerEnergyStat(roomSequence) {
	let spawnName = factory.spawn.sequenceGetName(roomSequence);
	let targets = factory.room.get(roomSequence).find(FIND_STRUCTURES, {
		filter: (structure) => {
			return (structure.structureType == STRUCTURE_CONTAINER) &&
				structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
		}
	});
	let targetsStore = [];
	for (var i = 0; i < targets.length; i++) {
		targetsStore.push(targets[i].store[RESOURCE_ENERGY]);
	}
	const total = _.sum(targetsStore);
	Memory.spawn[spawnName].containerEnergyStat = total;
}