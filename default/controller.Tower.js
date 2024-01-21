global.controller.Tower = {
	run: () => {
		var tower = Game.getObjectById('65533272618670f5499be7a9');
		if (tower) {
			// 攻击
			var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
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
			if (targets.length > 0) {
				tower.repair(targets[0]);
			}
		}
	}
}

function defendRoom(roomName) {
	var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
	if (hostiles.length > 0) {
		var username = hostiles[0].owner.username;
		Game.notify(`User ${username} spotted in room ${roomName}`);
		var towers = Game.rooms[roomName].find(
			FIND_MY_STRUCTURES, {
				filter: {
					structureType: STRUCTURE_TOWER
				}
			});
		towers.forEach(tower => tower.attack(hostiles[0]));
	}
}