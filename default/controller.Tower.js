global.controller.Tower = {
	run: () => {
		var tower = Game.getObjectById('65533272618670f5499be7a9');
		if (tower) {
			// 维修
			let targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER) &&
						structure.hits < structure.hitsMax;
				}
			});
			// 可通行墙壁
			if (targets.length < 1) {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_RAMPART) &&
							structure.hits < structure.hitsMax;
					}
				});
			}
			// 路
			if (targets.length < 1) {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_ROAD) &&
							structure.hits < structure.hitsMax;
					}
				});
			}
			// 墙壁
			if (targets.length < 1) {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_WALL) &&
							structure.hits < structure.hitsMax;
					}
				});
			}
			if (targets.length < 1) {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => structure.hits < structure.hitsMax
				});
			}
			if (targets.length > 0) {
				tower.repair(targets[0]);
			}
			// 攻击
			var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
			if (closestHostile) {
				tower.attack(closestHostile);
			}
		}
	}
}