global.controller.creep = {
	run: () => {
		// creep自杀 释放内存 + 保证至少2个

		// 遍历所有 creep 并执行上文中拓展的 work 方法
		// Object.values(Game.creeps).forEach(creep => creep.work())
		
		// 清理内存
		factory.creep.CleanMemory();

		let harvests = factory.creep.Harvest.ALL();
		let upgraders = factory.creep.Upgrader.ALL();
		let builders = factory.creep.Builder.ALL();
		let carriers = factory.creep.Carrier.ALL();
		//console.log('Harvesters: ' + harvesters.length);
		const controller_level = factory.spawns.get(1).room.controller.level; // 查看控制器等级
		//console.log('controller:' + factory.spawns.get(1).room.controller.level)
		
		
		// 孵化过程可视化
		if (factory.spawns.get(1).spawning) { 
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
				console.log('生成新的 采集者: ' + newName);
				factory.spawns.get(1).spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
					memory: {
						role: globalData.harvest
					}
				});
			}

			// 生产 carrier
			if (harvests.length >= 2 &&carriers.length < 2) {
				let newName = globalData.carrier + Game.time;
				console.log('生成新的 运输者:' + newName);
				factory.spawns.get(1).spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
					memory: {
						role: globalData.carrier
					}
				});
			}

			// 生产 upgrader
			if (harvests.length >= 2 && upgraders.length < 2) {
				let newName = globalData.upgrader + Game.time;
				console.log('生成新的 升级者: ' + newName);
				factory.spawns.get(1).spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
					memory: {
						role: globalData.upgrader
					}
				});
			}

			// 生产 builder
			if (controller_level >= 2 && builders.length < 2) {
				let newName = globalData.builder + Game.time;
				console.log('生成新的 建造者:' + newName);
				factory.spawns.get(1).spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
					memory: {
						role: globalData.builder
					}
				});
			}


		}

		for (var name in Game.creeps) {
			var creep = Game.creeps[name];
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