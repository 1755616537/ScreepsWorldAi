
global.controller.creep = {
	run: () => {
		// creep自杀 释放内存 + 保证至少2个

		// 遍历所有 creep 并执行上文中拓展的 work 方法
		// Object.values(Game.creeps).forEach(creep => creep.work())

		for (let name in Memory.creeps) { // 释放内存
			if (!Game.creeps[name]) {
				delete Memory.creeps[name];
				console.log('清楚不存在的creep内存:', name);
			}
		}

		// _是lodash工具
		var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
		var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
		var builders = factory.creep.Builder.builderALL();
		//console.log('Harvesters: ' + harvesters.length);
		var controller_level = factory.spawns.get(1).room.controller.level; // 查看控制器等级
		//console.log('controller:' + factory.spawns.get(1).room.controller.level)


		if (factory.spawns.get(1).spawning) { // 孵化过程可视化
			var spawningCreep = Game.creeps[factory.spawns.get(1).spawning.name];
			factory.spawns.get(1).room.visual.text(
				'🛠️' + spawningCreep.memory.role,
				factory.spawns.get(1).pos.x + 1,
				factory.spawns.get(1).pos.y, {
					align: 'left',
					opacity: 0.8
				});
		} else {
			// harvester少于2的时候生产harvester
			if (harvesters.length < 2) {
				var newName = 'Harvester' + Game.time;
				console.log('生成新的 harvester: ' + newName);
				factory.spawns.get(1).spawnCreep([WORK, CARRY, MOVE], newName, {
					memory: {
						role: 'harvester'
					}
				}); // 指定relo属性
			}

			// harvester等于2的时候生产 upgrader
			if (harvesters.length >= 2 && upgraders.length < 2) {
				var newName = 'Upgrader' + Game.time;
				console.log('生成新的 upgrader: ' + newName);
				factory.spawns.get(1).spawnCreep([WORK, CARRY, MOVE], newName, {
					memory: {
						role: 'upgrader'
					}
				}); // 指定relo属性
			}

			// 生产builder
			if (controller_level >= 2 && builders.length < 2) {
				var nameBuilder = 'Builder' + Game.time;
				console.log('生成新的 builder:' + nameBuilder);
				factory.spawns.get(1).spawnCreep([WORK, CARRY, MOVE], nameBuilder, {
					memory: {
						role: 'builder'
					}
				});
			}
		}

		for (var name in Game.creeps) {
			var creep = Game.creeps[name];
			if (creep.memory.role == 'harvester') {
				factory.creep.roleHarvester.run(creep);
			}
			if (creep.memory.role == 'upgrader') {
				factory.creep.roleUpgrader.run(creep);
			}
			if (creep.memory.role == 'builder') {
				factory.creep.Builder.run(creep);
			}
		}
	}
}