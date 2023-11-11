global.controller.creep = {
	run: () => {
		// creep自杀 释放内存 + 保证至少2个

		// 遍历所有 creep 并执行上文中拓展的 work 方法
		// Object.values(Game.creeps).forEach(creep => creep.work())

		// 清理内存
		factory.creep.CleanMemory();

		const harvests = factory.creep.Harvest.ALL();
		const upgraders = factory.creep.Upgrader.ALL();
		const builders = factory.creep.Builder.ALL();
		const carriers = factory.creep.Carrier.ALL();
		//console.log('Harvesters: ' + harvesters.length);
		const controller_level = factory.spawns.get(1).room.controller.level; // 查看控制器等级
		//console.log('controller:' + factory.spawns.get(1).room.controller.level)


		// 母巢 (spawn) 是否正在孵化一个新的 creep
		if (factory.spawns.get(1).spawning) {
			// 孵化，过程可视化
			let spawningCreep = Game.creeps[factory.spawns.get(1).spawning.name];
			factory.spawns.get(1).room.visual.text(
				'孵化🛠️' + spawningCreep.memory.role,
				factory.spawns.get(1).pos.x + 1,
				factory.spawns.get(1).pos.y, {
					align: 'left',
					opacity: 0.8
				});
		} else {
			// 生产 harvester
			if (harvests.length < 2) {
				let newName = globalData.harvest + Game.time;
				let returnData = factory.spawns.get(1).spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
					memory: {
						role: globalData.harvest
					}
				});
				if (returnData == OK) {
					console.log('生成新的 采集者: ' + newName);
				}
			}

			// 生产 carrier
			if (harvests.length >= 2 && carriers.length < 2) {
				let newName = globalData.carrier + Game.time;
				let returnData = factory.spawns.get(1).spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
					memory: {
						role: globalData.carrier
					}
				});
				if (returnData == OK) {
					console.log('生成新的 运输者:' + newName);
				}
			}

			// 生产 upgrader
			if (harvests.length >= 2 && upgraders.length < 2) {
				let newName = globalData.upgrader + Game.time;
				let returnData = factory.spawns.get(1).spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
					memory: {
						role: globalData.upgrader
					}
				});
				if (returnData == OK) {
					console.log('生成新的 升级者: ' + newName);
				}
			}

			// 生产 builder
			if (controller_level >= 2 && builders.length < 2) {
				let newName = globalData.builder + Game.time;
				let returnData = factory.spawns.get(1).spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
					memory: {
						role: globalData.builder
					}
				});
				if (returnData == OK) {
					console.log('生成新的 建造者:' + newName);
				}
			}
		}

		// 事件管理
		for (let name in Game.creeps) {
			let creep = Game.creeps[name];
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
		}
	}
}