// `<script src="https://screeps-cn.gitee.io/screeps-chinese-pack-release/main.js" async defer></script>` 

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function() {

	for (var name in Game.rooms) {
		console.log('房间' + name + ' 有 ' + Game.rooms[name].energyAvailable + ' 能量');
	}

	//清除掉已经gg的creep
	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('清除掉已经gg的creepID:', name);
		}
	}

	//找出所有的采集者
	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
	console.log('采集者: ' + harvesters.length);
	//当数量小于2的时候，开始生产采集者
	if (harvesters.length < 2) {
		var newName = 'Harvester' + Game.time;
		console.log('生成采集者ID: ' + newName);
		Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, {
			memory: {
				role: 'harvester'
			}
		});
	}
	//正在孵化进行的处理
	if (Game.spawns['Spawn1'].spawning) {
		var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
		Game.spawns['Spawn1'].room.visual.text(
			'🛠️' + spawningCreep.memory.role,
			Game.spawns['Spawn1'].pos.x + 1,
			Game.spawns['Spawn1'].pos.y, {
				align: 'left',
				opacity: 0.8
			});
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