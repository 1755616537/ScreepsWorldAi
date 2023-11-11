global.controller.creep = {
	run: () => {
		// creep自杀 释放内存 + 保证至少2个

		// 遍历所有 creep 并执行上文中拓展的 work 方法
		// Object.values(Game.creeps).forEach(creep => creep.work())

		for (let name in Memory.creeps) { // 释放内存
			if (!Game.creeps[name]) {
				// 采集者
				if (Memory.creeps[name].role == globalData.harvest) {
					// 从矿区记录删除
					let harvestSourceID;
					let on = false;
					// 如果没有合法记录会不存在harvestSourceID,报错需要捕获
					try {
						harvestSourceID = Memory.creeps[name].harvestSourceID;
						on = true;
					} catch (e) {
						//TODO handle the exception
					}
					// 是否合法记录了
					if (on && harvestSourceID) {
						let memorySource = Memory.source;
						let memorySourceList = memorySource[harvestSourceID].list;
						for (let i = 0; i < memorySourceList.length; i++) {
							if (memorySourceList[i] == name) {
								memorySource[harvestSourceID].list.splice(i, 1);
								break
							}
						}
					}

				}

				delete Memory.creeps[name];
				console.log('清楚不存在的creep内存:', name);
			}
		}

		var harvests = factory.creep.Harvest.ALL();
		var upgraders = factory.creep.Upgrader.ALL();
		var builders = factory.creep.Builder.ALL();
		var carriers = factory.creep.Carrier.ALL();
		//console.log('Harvesters: ' + harvesters.length);
		var controller_level = factory.spawns.get(1).room.controller.level; // 查看控制器等级
		//console.log('controller:' + factory.spawns.get(1).room.controller.level)


		if (factory.spawns.get(1).spawning) { // 孵化过程可视化
			var spawningCreep = Game.creeps[factory.spawns.get(1).spawning.name];
			factory.spawns.get(1).room.visual.text(
				'孵化🛠️' + spawningCreep.memory.role,
				factory.spawns.get(1).pos.x + 1,
				factory.spawns.get(1).pos.y, {
					align: 'left',
					opacity: 0.8
				});
		} else {
			// harvester少于2的时候生产harvester
			if (harvests.length < 2) {
				var newName = globalData.harvest + Game.time;
				console.log('生成新的 采集者: ' + newName);
				factory.spawns.get(1).spawnCreep([WORK, CARRY, MOVE], newName, {
					memory: {
						role: globalData.harvest
					}
				}); // 指定relo属性
			}

			// 生产Carrier
			if (carriers.length < 2) {
				var nameBuilder = globalData.carrier + Game.time;
				console.log('生成新的 运输者:' + nameBuilder);
				factory.spawns.get(1).spawnCreep([WORK, CARRY, MOVE], nameBuilder, {
					memory: {
						role: globalData.carrier
					}
				});
			}

			// harvester等于2的时候生产 upgrader
			if (harvests.length >= 2 && upgraders.length < 2) {
				var newName = globalData.upgrader + Game.time;
				console.log('生成新的 升级者: ' + newName);
				factory.spawns.get(1).spawnCreep([WORK, CARRY, MOVE], newName, {
					memory: {
						role: globalData.upgrader
					}
				}); // 指定relo属性
			}

			// 生产builder
			if (controller_level >= 2 && builders.length < 2) {
				var nameBuilder = globalData.builder + Game.time;
				console.log('生成新的 建造者:' + nameBuilder);
				factory.spawns.get(1).spawnCreep([WORK, CARRY, MOVE], nameBuilder, {
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