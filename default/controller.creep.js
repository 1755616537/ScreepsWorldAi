global.controller.creep = {
	run: () => {

		// 遍历所有 creep 并执行上文中拓展的 work 方法
		// Object.values(Game.creeps).forEach(creep => creep.work())

		// 清理内存
		factory.creep.CleanMemory();
		
		// 生产孵化Creep
		produceCreep(1);
		
		// 事件管理
		eventManagement();
		
		
	}
}

function addHarvest(harvests, controller_level = 4, spawnSequence) {
	// 生产 采集
	if (harvests.length < globalData.creepConfigs.harvest.number) {
		let returnData = factory.creep.addHarvest(harvests, controller_level, spawnSequence);
		// clog(returnData);
		return returnData;
	}
}

function addUpgrader(upgraders, controller_level, spawnSequence) {
	let spawnName = factory.spawn.sequenceGetName(spawnSequence);
	// 生产 升级
	if (upgraders.length < globalData.creepConfigs.upgrader.number) {
		let returnData;
		// 房间CONTAINER总能量在2000以下时,只会存在一个升级者
		if (upgraders.length > 0) {
			if (Memory.spawn[spawnName].containerEnergyStat > 2000) {
				returnData = factory.creep.addUpgrader(upgraders, controller_level, spawnSequence);
			}
		} else {
			returnData = factory.creep.addUpgrader(upgraders, controller_level, spawnSequence);
		}

		// clog(returnData);
		return returnData;
	}
}

function addBuilder(builders, controller_level, spawnSequence) {
	// 生产 建造 前提控制器2等级
	if (builders.length < globalData.creepConfigs.builder.number) { // && controller_level >= 2
		let returnData = factory.creep.addBuilder(builders, controller_level, spawnSequence)
		// clog(returnData);
		return returnData;
	}
}

function addCarrier(carriers, controller_level, spawnSequence) {
	// 生产 运输
	if (carriers.length < globalData.creepConfigs.carrier.number) {
		// 拥有CONTAINER才生产
		const builds = factory.spawn.get(spawnSequence).room.find(FIND_STRUCTURES, {
			filter: {
				structureType: STRUCTURE_CONTAINER
			}
		});
		if (builds.length > 0) {
			let returnData = factory.creep.addCarrier(carriers, controller_level, spawnSequence);
			// clog(returnData);
			return returnData;
		};
	}
}

function addRepairer(repairers, controller_level, spawnSequence) {
	// 生产 维修
	if (repairers.length < globalData.creepConfigs.repairer.number) {
		let returnData = factory.creep.addRepairer(repairers, controller_level, spawnSequence);
		// clog(returnData);
		return returnData;
	}
}

function addNearDefender(nearDefenders, controller_level, spawnSequence) {
	// 生产 防御者-近战
	if (nearDefenders.length < globalData.creepConfigs.nearDefender.number) {
		let returnData = factory.creep.addNearDefender(nearDefenders, controller_level, spawnSequence);
		// clog(returnData);
		return returnData;
	}
}

function addFarDefender(farDefenders, controller_level, spawnSequence) {
	// 生产 防御者-远战
	if (farDefenders.length < globalData.creepConfigs.farDefender.number) {
		let returnData = factory.creep.addFarDefender(farDefenders, controller_level, spawnSequence);
		// clog(returnData);
		return returnData;
	}
}

function addTheHealer(theHealers, controller_level, spawnSequence) {
	// 生产 治疗者
	if (theHealers.length < globalData.creepConfigs.theHealer.number) {
		let returnData = factory.creep.addTheHealer(theHealers, controller_level, spawnSequence);
		// clog(returnData);
		return returnData;
	}
}

function addOccupier(occupiers, controller_level, spawnSequence) {
	// 生产 占领者
	if (occupiers.length < globalData.creepConfigs.occupier.number) {
		let returnData = factory.creep.addOccupier(occupiers, controller_level, spawnSequence);
		// clog(returnData);
		return returnData;
	}
}

// 事件管理
function eventManagement(){
	for (let name in Game.creeps) {
		let creep = Game.creeps[name];
	
		// 特别行动
		let SpecialActions = creep.memory.SpecialActions;
		if (SpecialActions) {
			// 数据格式
			// SpecialActions:{
			// //代号
			// 	code:'',
			// //附加信息
			// 	mgs:''
			// }
			switch (SpecialActions.code) {
				case '':
					break;
				default:
			}
			continue;
		}
	
		if (creep.memory.role == globalData.harvest) {
			factory.creep.Harvest.run(creep);
		}
		if (creep.memory.role == globalData.upgrader) {
			if(!creep.memory.upgraderOuterRoom){
				factory.creep.Upgrader.run(creep);
			}
		}
		if (creep.memory.role == globalData.builder) {
			if(!creep.memory.builderOuterRoom){
				factory.creep.Builder.run(creep);
			}
		}
		if (creep.memory.role == globalData.carrier) {
			factory.creep.Carrier.run(creep);
		}
		if (creep.memory.role == globalData.repairer) {
			factory.creep.Repairer.run(creep);
		}
		if (creep.memory.role == globalData.nearDefender || creep.memory.role == globalData.farDefender) {
			factory.creep.Defender.run(creep);
		}
		if (creep.memory.role == globalData.theHealer) {
			factory.creep.TheHealer.run(creep);
		}
		if (creep.memory.role == globalData.occupier) {
			factory.creep.Occupier.run(creep);
		}
	}
}

// 生产孵化Creep
function produceCreep(spawnSequence = 1) {
	let spawnName = factory.spawn.sequenceGetName(spawnSequence);

	const harvests = factory.creep.Harvest.ALL(spawnSequence);
	const upgraders = factory.creep.Upgrader.ALL(spawnSequence);
	const builders = factory.creep.Builder.ALL(spawnSequence);
	const carriers = factory.creep.Carrier.ALL(spawnSequence);
	const repairers = factory.creep.Repairer.ALL(spawnSequence);
	const nearDefenders = factory.creep.Defender.ALLNearDefender(spawnSequence);
	const farDefenders = factory.creep.Defender.ALLFarDefender(spawnSequence);
	const theHealers = factory.creep.TheHealer.ALL(spawnSequence);
	const occupiers = factory.creep.Occupier.ALL(spawnSequence);

	// 查看控制器等级
	const controller_level = factory.spawn.get(spawnSequence).room.controller.level;

	// 能量源区
	let sources = factory.room.get(spawnSequence).find(FIND_SOURCES);

	// 母巢 (spawn) 是否正在孵化一个新的 creep
	if (factory.spawn.get(spawnSequence).spawning) {
		// 孵化，过程可视化
		let spawningCreep = Game.creeps[factory.spawn.get(spawnSequence).spawning.name];
		factory.spawn.get(spawnSequence).room.visual.text(
			'孵化🛠️' + spawningCreep.memory.role,
			factory.spawn.get(spawnSequence).pos.x + 1,
			factory.spawn.get(spawnSequence).pos.y, {
				align: 'left',
				opacity: 0.8
			});
	} else {
		// 生产 采集
		// 动态更新采集者数量
		try {
			if (globalData.creepConfigs.harvest.AutomaticAssignNum && Memory.spawn[spawnName].source.total && globalData
				.creepConfigs.harvest.number != Memory.spawn[spawnName].source.total) globalData
				.creepConfigs.harvest.number = Memory.spawn[spawnName].source.total;
		} catch (e) {
			//TODO handle the exception
		}


		let towers = factory.spawn.get(spawnSequence).room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				// 找出需要储存能量
				return (structure.structureType == STRUCTURE_TOWER) &&
					structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100;
			}
		});

		// 优先级顺序生产 每种保持最低1个
		let priority;
		// 采集最低和能量源区一样的数量
		if ((harvests.length < 1 && globalData.creepConfigs.harvest.number >= 1) || (harvests.length < sources.length &&
				globalData.creepConfigs.harvest.number >= sources.length)) {
			priority = 'harvest';
		} else if (upgraders.length < 1 && globalData.creepConfigs.upgrader.number >= 1) {
			priority = 'upgrader';
		} else if (builders.length < 1 && globalData.creepConfigs.builder.number >= 1) {
			priority = 'builder';
		} else if (repairers.length < 1 && globalData.creepConfigs.repairer.number >= 1 && (!globalData.creepConfigs
				.repairer.onTower || (globalData
					.creepConfigs.repairer.onTower && towers.length <
					1))) {
			priority = 'repairer';
		} else if (carriers.length < 1 && globalData.creepConfigs.carrier.number >= 1) {
			// 注释掉是因为 拥有CONTAINER才生产 会卡住优先顺序，不进行默认生成
			// priority = 'carrier';
		} else if (nearDefenders.length < 1 && globalData.creepConfigs.nearDefender.number >= 1) {
			priority = 'nearDefender';
		} else if (theHealers.length < 1 && globalData.creepConfigs.theHealer.number >= 1) {
			priority = 'theHealer';
		} else if (occupiers.length < 1 && globalData.creepConfigs.occupier.number >= 1 && factory.spawn.get(
				spawnSequence).room.energyCapacityAvailable >= 650) {
			priority = 'occupier';
		}
		if (priority) {
			switch (priority) {
				case 'harvest':
					addHarvest(harvests, controller_level, spawnSequence);
					break;
				case 'upgrader':
					addUpgrader(upgraders, controller_level, spawnSequence);
					break;
				case 'builder':
					addBuilder(builders, controller_level, spawnSequence);
					break;
				case 'carrier':
					addCarrier(carriers, controller_level, spawnSequence);
					break;
				case 'repairer':
					addRepairer(repairers, controller_level, spawnSequence);
					break;
				case 'nearDefender':
					addNearDefender(nearDefenders, controller_level, spawnSequence);
					break;
				case 'farDefender':
					addFarDefender(farDefenders, controller_level, spawnSequence);
					break;
				case 'theHealer':
					addTheHealer(theHealers, controller_level, spawnSequence);
					break;
				case 'occupier':
					addOccupier(occupiers, controller_level, spawnSequence);
					break;
				default:
			}
		} else {
			// 默认顺序生产
			if (addHarvest(harvests, controller_level, spawnSequence) != OK) {
				if (addCarrier(carriers, controller_level, spawnSequence) != OK) {
					if (addBuilder(builders, controller_level, spawnSequence) != OK) {
						if (addRepairer(repairers, controller_level, spawnSequence) != OK) {
							if (addUpgrader(upgraders, controller_level, spawnSequence) != OK) {
								if (addNearDefender(upgraders, controller_level, spawnSequence) != OK) {
									if (addFarDefender(upgraders, controller_level, spawnSequence) != OK) {
										if (addTheHealer(upgraders, controller_level, spawnSequence) != OK) {
											if (addOccupier(upgraders, controller_level, spawnSequence) != OK) {}
										}
									}
								}
							}
						}
					}
				}
			}

		}
	}
}