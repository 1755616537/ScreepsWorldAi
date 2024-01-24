global.controller.Tower = {
	run: () => {
		_.forEach(Game.rooms, room => {
			const targets = room.find(FIND_MY_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_TOWER;
				}
			});
			if (targets.length) {
				_.forEach(targets, target => {
					work(target);
				});
			}
		})
	}
}

function work(tower) {
	// 攻击
	let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	if (closestHostile) {
		tower.attack(closestHostile);
		return
	}

	// 维修
	let targets = tower.room.find(FIND_STRUCTURES, {
		filter: (structure) => {
			return (structure.structureType == STRUCTURE_CONTAINER) &&
				structure.hits < structure.hitsMax;
		}
	});
	// 可通行墙壁
	if (targets.length < 1) {
		targets = tower.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_RAMPART) &&
					structure.hits < structure.hitsMax;
			}
		});
	}
	// 路
	if (targets.length < 1) {
		targets = tower.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_ROAD) &&
					structure.hits < structure.hitsMax;
			}
		});
	}
	// 墙壁
	if (targets.length < 1) {
		targets = tower.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_WALL) &&
					structure.hits < structure.hitsMax;
			}
		});
	}
	if (targets.length < 1) {
		targets = tower.room.find(FIND_STRUCTURES, {
			filter: (structure) => structure.hits < structure.hitsMax
		});
	}
	targets.sort((a, b) => a.hits - b.hits);
	if (targets.length > 0) {
		tower.repair(targets[0]);
	}

	if (targets.length < 1) {
		// 治疗
		let closestMYCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
			filter: function(object) {
				return object.hits < object.hitsMax;
			}
		});

		if (closestMYCreep) {
			// 治疗
			tower.heal(closestMYCreep);
			return;
		}
	}
}