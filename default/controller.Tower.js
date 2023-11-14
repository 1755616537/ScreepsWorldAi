global.controller.Tower = {
	run: () => {
		var tower = Game.getObjectById('65533272618670f5499be7a9');
		if (tower) {
			// 维修
			var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) => structure.hits < structure.hitsMax
			});
			if (closestDamagedStructure) {
				tower.repair(closestDamagedStructure);
			}
			// 攻击
			var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
			if (closestHostile) {
				tower.attack(closestHostile);
			}
		}
	}
}