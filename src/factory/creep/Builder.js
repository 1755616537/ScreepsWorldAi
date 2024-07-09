import factory_creep from "../../factory/creep.js";

import factory_room from "../../factory/room.js";

import factory_creep_Harvest from "../../factory/creep/Harvest.js";

// 建造
export default {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // work && 背包为空
			creep.memory.work = false; // 变为 非work状态
			creep.say('🔄 收获');
		}
		if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非work状态 && 背包满(空余为0)
			creep.memory.work = true; // 变为 work状态
			creep.say('🚧 建造');
		}

		let roomName = creep.room.name;

		if (creep.memory.work) { // work状态的时候
			// 寻找建筑位
			// 路
			let targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_ROAD;
				}
			});
			// 墙壁
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_WALL;
					}
				});
			}
			// 小型储存能量
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_EXTENSION;
					}
				});
			}
			// 中型储存能量
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_CONTAINER;
					}
				});
			}
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			}

			if (targets.length > 0) { // targets.length > 0  || 建筑位 > 0
				// 建造
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					new factory_creep.Creep(creep).moveTo(targets[0]);
				}
			} else {
				// 不用建造了,先干其他
				let targets = creep.room.find(FIND_STRUCTURES, {
					filter: object => object.hits < object.hitsMax
				});
				targets.sort((a, b) => a.hits - b.hits);
				if (targets.length > 0) {
					// 维修
					if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
						new factory_creep.Creep(creep).moveTo(targets[0]);
					}
				}
				
				if (targets.length < 1) {
					// 升级
					if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
						new factory_creep.Creep(creep).moveTo(creep.room.controller);
					}
				}
			}
		} else { // 非work状态的时候， 到source旁边并采集
			const harvests = factory_creep_Harvest.ALL(roomName);
			if (harvests.length < 1) {
				// 采集死完后,自己去采集
				let target = creep.pos.findClosestByPath(FIND_SOURCES);
				if (target) {
					if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
						new factory_creep.Creep(creep).moveTo(target, 'Resource');
					}
				}

			} else {
				let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (structure) => {
						// 找出有储存能量的container搬运
						return (structure.structureType == STRUCTURE_CONTAINER) &&
							structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
						// return (structure.structureType == STRUCTURE_CONTAINER ||
						// 		structure.structureType == STRUCTURE_EXTENSION ||
						// 		(structure.structureType == STRUCTURE_SPAWN &&
						// 			structure.store.getUsedCapacity(RESOURCE_ENERGY) > 250) ||
						// 		structure.structureType == STRUCTURE_TOWER) &&
						// 	structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
					}
				});
				if (!target) {
					// 找不到可搬运的地方,从基地搬运
					target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_SPAWN) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 200;
						}
					});
				}
				if (!target) {
					// 找不到可搬运的地方,从基地搬运
					target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_EXTENSION) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
						}
					});
				}
				if (!target) {
					// 采集死完后,自己去采集
					target = creep.pos.findClosestByPath(FIND_SOURCES);
					if (target) {
						if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
							// 向目标移动
							new factory_creep.Creep(creep).moveTo(target, 'Resource');
						}
						return
					}
				}

				if (target) {
					// 从建筑(structure)中拿取资源
					if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						// 向目标移动
						new factory_creep.Creep(creep).moveTo(target, 'Resource');
					}
				}
			}
		}
	},
	ALL: (...e) => {
		return all(...e);
	}
};

function all(roomName) {
	let returnData;

	if (roomName) {
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.builder && creep.memory
			.roomName == roomName));
	} else {
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.builder);
	}
	return returnData;
}

/**
 * 临时外部房间,建造
 * @param roomName
 * @param pathArray
 */
export function builderOuterRoom(roomName, pathArray = []) {
	let room = factory_room.nameGet(roomName);

	let creepName = '';
	const builders = all(Object.keys(globalData.rooms)[0]);
	if (builders < 1) return;
	// 是否已存在
	_.forEach(builders, builder => {
		if (builder.memory.builderOuterRoom && builder.memory.builderOuterRoom == roomName) {
			creepName = builder.name;
			return false;
		}
	})
	// 找新的
	if (!creepName) {
		_.forEach(builders, builder => {
			if (!builder.memory.builderOuterRoom) {
				builder.memory.builderOuterRoom = roomName;
				creepName = builder.name;
				return false;
			}
		})
	}
	let creep = Game.creeps[creepName];

	// 按设定路径移动
	for (let i = 0; i < pathArray.length; i++) {
		let path = pathArray[i];
		if (creep.room.name == path.roomName) {
			new factory_creep.Creep(creep).moveTo(path.roomPosition);
			return;
		}
	}

	if (!room) {
		new factory_creep.Creep(creep).moveTo(new RoomPosition(43, 17, roomName));
	} else {
		if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // work && 背包为空
			creep.memory.work = false; // 变为 非work状态
			creep.say('🔄 收获');
		}
		if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非work状态 && 背包满(空余为0)
			creep.memory.work = true; // 变为 work状态
			creep.say('🚧 建造');
		}

		if (creep.memory.work) {
			let targets = room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length > 0) {
				// 建造
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					new factory_creep.Creep(creep).moveTo(targets[0]);
				}
			}
		} else {
			// 掉落的资源
			let targets = room.find(FIND_DROPPED_RESOURCES);
			if (targets.length > 0) {
				// 捡起一个物品 (如捡起一些能量)
				if (creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
					// 向目标移动
					new factory_creep.Creep(creep).moveTo(targets[0], 'Resource');
				}
			} else {
				targets = targets.concat(
					// 所有墓碑
					room.find(FIND_TOMBSTONES, {
						filter: (structure) => {
							return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
						}
					}),
					// 所有废墟
					room.find(FIND_RUINS, {
						filter: (structure) => {
							return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
						}
					}),
				);
				if (targets.length < 1) {
					let sources = creep.pos.findClosestByPath(FIND_SOURCES);
					// 采集能量
					if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
						new factory_creep.Creep(creep).moveTo(sources, 'Resource');
					}
					return;
				}
				if (targets.length < 1) {
					targets = factory_room.nameGet(roomName).find(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_CONTAINER) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
						}
					});
				}
				if (targets.length > 0) {
					// 从建筑(structure)中拿取资源
					if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						// 向目标移动
						new factory_creep.Creep(creep).moveTo(targets[0], 'Resource');
					}
				}
			}
		}
	}
}