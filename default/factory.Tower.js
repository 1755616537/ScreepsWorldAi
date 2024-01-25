global.factory.Tower = {
	run: (roomSequence) => {
		let spawnName = factory.spawn.sequenceGetName(roomSequence);

		let room = factory.room.get(roomSequence);

		const targets = room.find(FIND_MY_STRUCTURES, {
			filter: (structure) => {
				return structure.structureType == STRUCTURE_TOWER;
			}
		});
		if (targets.length) {
			_.forEach(targets, target => {
				// work(target);
				const source = Game.getObjectById('65b28bef2bc6a1b1bbf53');
				target.attack(source);
			});
		}
	}
}

function work(tower) {
	// 攻击
	let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	if (closestHostile) {
		tower.attack(closestHostile);
		return
	}

	// 治疗
	let closestMYCreep = tower.room.find(FIND_MY_CREEPS, {
		filter: function(object) {
			return object.hits < object.hitsMax;
		}
	});

	closestMYCreep.sort((a, b) => a.hits - b.hits);

	if (closestMYCreep.length > 0) {
		// 治疗
		tower.heal(closestMYCreep[0]);
		return;
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
					structure.hits < structure.hitsMax &&
					structure.hits < 100 * 10000;
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
					structure.hits < structure.hitsMax &&
					structure.hits < 100 * 10000;
			}
		});
	}
	if (targets.length < 1) {
		targets = tower.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return structure.hits < structure.hitsMax &&
					structure.structureType != STRUCTURE_WALL &&
					structure.structureType != STRUCTURE_RAMPART;
			}
		});
	}
	targets.sort((a, b) => a.hits - b.hits);
	if (targets.length > 0) {
		tower.repair(targets[0]);
	}
}