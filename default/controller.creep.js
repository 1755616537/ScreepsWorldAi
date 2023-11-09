global.controller.creep = {
	run() {

		// 遍历所有 creep 并执行上文中拓展的 work 方法
		// Object.values(Game.creeps).forEach(creep => creep.work())

		for (var name in Memory.creeps) { // 释放内存
			if (!Game.creeps[name]) {
				delete Memory.creeps[name];
				console.log('Clearing non-existing creep memory:', name);
			}
		}

		// _是lodash工具
		var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
		var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
		var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
		//console.log('Harvesters: ' + harvesters.length);
		var controller_level = Game.spawns['Spawn1'].room.controller.level; // 查看控制器等级
		//console.log('controller:' + Game.spawns['Spawn1'].room.controller.level)


		if (Game.spawns['Spawn1'].spawning) { // 孵化过程可视化
			var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
			Game.spawns['Spawn1'].room.visual.text(
				'🛠️' + spawningCreep.memory.role,
				Game.spawns['Spawn1'].pos.x + 1,
				Game.spawns['Spawn1'].pos.y, {
					align: 'left',
					opacity: 0.8
				});
		} else {
			// harvester少于2的时候生产harvester
			if (harvesters.length < 2) {
				var newName = 'Harvester' + Game.time;
				console.log('Spawning new harvester: ' + newName);
				Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
					memory: {
						role: 'harvester'
					}
				}); // 指定relo属性
			}

			// harvester等于2的时候生产 upgrader
			if (harvesters.length >= 2 && upgraders.length < 2) {
				var newName = 'Upgrader' + Game.time;
				console.log('Spawning new upgrader: ' + newName);
				Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
					memory: {
						role: 'upgrader'
					}
				}); // 指定relo属性
			}

			// 生产builder
			if (controller_level >= 2 && builders.length < 2) {
				var nameBuilder = 'Builder' + Game.time;
				console.log('Spawing new builder:' + nameBuilder);
				Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], nameBuilder, {
					memory: {
						role: 'builder'
					}
				});
			}
		}

		for (var name in Game.creeps) {
			var creep = Game.creeps[name];
			if (creep.memory.role == 'harvester') {
				roleHarvester.run(creep);
			}
			if (creep.memory.role == 'upgrader') {
				roleUpgrader.run(creep);
			}
			if (creep.memory.role == 'builder') {
				roleBuilder.run(creep);
			}
		}
	}
}