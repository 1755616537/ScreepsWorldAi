global.controller.creep = {
	run: () => {

		// 遍历所有 creep 并执行上文中拓展的 work 方法
		// Object.values(Game.creeps).forEach(creep => creep.work())

		// 清理内存
		factory.creep.CleanMemory();

		// 单独spawn管理
		spawn(1);

		// 事件管理
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
				factory.creep.Upgrader.run(creep);
			}
			if (creep.memory.role == globalData.builder) {
				factory.creep.Builder.run(creep);
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
			if (creep.memory.role == globalData.occupier) {
				factory.creep.Occupier.run(creep);
			}
		}
	}
}

function addHarvest(harvests, controller_level = 4, spawn) {
	// 生产 采集
	if (harvests.length < globalData.creepConfigs.harvest.number) {
		let returnData = factory.creep.addHarvest(harvests, controller_level, spawn);
		// clog(returnData);
		return returnData;
	}
}

function addUpgrader(upgraders, controller_level, spawn) {
	// 生产 升级
	if (upgraders.length < globalData.creepConfigs.upgrader.number) {
		let returnData = factory.creep.addUpgrader(upgraders, controller_level, spawn);
		// clog(returnData);
		return returnData;
	}
}

function addBuilder(builders, controller_level, spawn) {
	// 生产 建造 前提控制器2等级
	if (builders.length < globalData.creepConfigs.builder.number) { // && controller_level >= 2
		let returnData = factory.creep.addBuilder(builders, controller_level, spawn)
		// clog(returnData);
		return returnData;
	}
}

function addCarrier(carriers, controller_level, spawn) {
	// 生产 运输
	if (carriers.length < globalData.creepConfigs.carrier.number) {
		// 拥有CONTAINER才生产
		const builds = factory.spawns.get(spawn).room.find(FIND_STRUCTURES, {
			filter: {
				structureType: STRUCTURE_CONTAINER
			}
		});
		if (builds.length > 0) {
			let returnData = factory.creep.addCarrier(carriers, controller_level, spawn);
			// clog(returnData);
			return returnData;
		};
	}
}

function addRepairer(repairers, controller_level, spawn) {
	// 生产 维修
	if (repairers.length < globalData.creepConfigs.repairer.number) {
		let returnData = factory.creep.addRepairer(repairers, controller_level, spawn);
		// clog(returnData);
		return returnData;
	}
}


function spawn(spawn = 1) {
	const harvests = factory.creep.Harvest.ALL(spawn);
	const upgraders = factory.creep.Upgrader.ALL(spawn);
	const builders = factory.creep.Builder.ALL(spawn);
	const carriers = factory.creep.Carrier.ALL(spawn);
	const repairers = factory.creep.Repairer.ALL(spawn);

	// 查看控制器等级
	const controller_level = factory.spawns.get(spawn).room.controller.level;

	// 母巢 (spawn) 是否正在孵化一个新的 creep
	if (factory.spawns.get(spawn).spawning) {
		// 孵化，过程可视化
		let spawningCreep = Game.creeps[factory.spawns.get(spawn).spawning.name];
		factory.spawns.get(spawn).room.visual.text(
			'孵化🛠️' + spawningCreep.memory.role,
			factory.spawns.get(spawn).pos.x + 1,
			factory.spawns.get(spawn).pos.y, {
				align: 'left',
				opacity: 0.8
			});
	} else {
		// 生产 采集
		// 动态更新采集者数量
		try {
			if (globalData.creepConfigs.harvest.AutomaticAssignNum && Memory.source.total && globalData
				.creepConfigs.harvest.number != Memory.source.total) globalData
				.creepConfigs.harvest.number = Memory.source.total;
		} catch (e) {
			//TODO handle the exception
		}


		let towers = factory.spawns.get(spawn).room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				// 找出需要储存能量
				return (structure.structureType == STRUCTURE_TOWER) &&
					structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100;
			}
		});

		// 最少采集2个
		if (harvests.length >= 2) {
			// 优先级顺序生产 每种保持最低1个
			let priority;
			if (upgraders.length < 1 && globalData.creepConfigs.upgrader.number >= 1) {
				priority = 'upgrader';
			} else if (builders.length < 1 && globalData.creepConfigs.builder.number >= 1) {
				priority = 'builder';
			} else if (repairers.length < 1 && globalData.creepConfigs.repairer.number >= 1 && (!globalData.creepConfigs.repairer.onTower || (globalData
					.creepConfigs.repairer.onTower && towers.length <
					1))) {
				priority = 'repairer';
			} else if (carriers.length < 1 && globalData.creepConfigs.carrier.number >= 1) {
				// 注释掉是因为 拥有CONTAINER才生产 会卡住优先顺序，不进行默认生成
				// priority = 'carrier';
			}
			if (priority) {
				switch (priority) {
					case 'upgrader':
						addUpgrader(upgraders, controller_level, spawn);
						break;
					case 'builder':
						addBuilder(builders, controller_level, spawn);
						break;
					case 'carrier':
						addCarrier(carriers, controller_level, spawn);
						break;
					case 'repairer':
						addRepairer(repairers, controller_level, spawn);
						break;
					default:
				}
			} else {
				// 默认顺序生产
				if (addHarvest(harvests, controller_level, spawn) != OK) {
					if (addCarrier(carriers, controller_level, spawn) != OK) {
						if (addBuilder(builders, controller_level, spawn) != OK) {
							if (addRepairer(repairers, controller_level, spawn) != OK) {
								if (addUpgrader(upgraders, controller_level, spawn) != OK) {}
							}
						}
					}
				}

			}
		} else {
			addHarvest(harvests, controller_level, spawn);
		}
	}
}