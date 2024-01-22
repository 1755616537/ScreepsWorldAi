global.controller.room = {
	run: () => {

		sourceContainer(1);
		controllerContainer(1);
		harvestBuildCONTAINER(1);
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
		let on = false;
		for (let val in memorySource) {
			let spaceXYList = memorySource[val].spaceXYList;
			for (let i = 0; i < spaceXYList.length; i++) {
				let spaceXYListList2 = [];
				for (let i2 = 0; i2 < spaceXYList[i].list.length; i2++) {
					_.forEach(Game.creeps, (creep) => {
						if (creep.name == spaceXYList[i].list[i2]) {
							on = true;
							return false;
						}
					})
					if (on) spaceXYListList2.push(spaceXYList[i].list[i2]);
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
				if (on) memoryControllerContainerList2.push(memoryControllerContainer.list[i]);
			}
			Memory.spawn[spawnName].controller.container.list = memoryControllerContainerList2;
		}
	}
}

// 采集建造CONTAINER记录管理
function harvestBuildCONTAINER(roomSequence) {
	let spawnName = factory.spawn.sequenceGetName(roomSequence);

	if (!Memory.spawn[spawnName].source.harvestBuildCONTAINERList) Memory.spawn[spawnName].source
		.harvestBuildCONTAINERList = {};
	let harvestBuildCONTAINERList = Memory.spawn[spawnName].source.harvestBuildCONTAINERList;
	if (_.size(harvestBuildCONTAINERList) > 0) {
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