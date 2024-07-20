import factory_creep from "../../factory/creep.js";

import factory_room from "../../factory/room.js";

import factory_creep_Harvest from "../../factory/creeps/Harvest.js";

// 升级
export default {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // 升级状态&&能量不足的时候，变为采集者
            creep.memory.work = false;
            creep.say('🔄 采集');
        }
        if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非升级状态&&能量满的时候，变为升级状态
            creep.memory.work = true;
            creep.say('⚡ 升级');
        }

        let roomName = creep.room.name;

        if (creep.memory.work) { // 升级状态，找到控制器并升级 + 可视化
            if (!creep.room.controller.sign) {
                // 对控制器签名
                if (creep.signController(creep.room.controller, "peaceful development.") ==
                    ERR_NOT_IN_RANGE) {
                    new factory_creep.Creep(creep).moveTo(creep.room.controller);
                }
            } else {
                if (creep.room.controller.sign.username != globalData.username) {
                    // 对控制器签名
                    if (creep.signController(creep.room.controller, "peaceful development.") ==
                        ERR_NOT_IN_RANGE) {
                        new factory_creep.Creep(creep).moveTo(creep.room.controller);
                    }
                } else {
                    // 升级
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        new factory_creep.Creep(creep).moveTo(creep.room.controller);
                    }
                }
            }

        } else { // 采集状态 + 可视化
            const harvests = factory_creep_Harvest.ALL(roomName);
            if (harvests.length < 1) {
                // 采集死完后,自己去采集
                let target = creep.pos.findClosestByPath(FIND_SOURCES);
                if (target) {
                    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        new factory_creep.Creep(creep).moveTo(target, 'Resource');
                    }
                }
            } else {
                let target;

                let memoryControllerContainer;
                let on = false;
                try {
                    memoryControllerContainer = Memory.rooms[roomName].controller.container;
                    on = true;
                } catch (e) {
                    //TODO handle the exception
                }
                if (on && memoryControllerContainer && memoryControllerContainer.id) {
                    target = Game.getObjectById(memoryControllerContainer.id);
                    if (target.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                        target = null;
                    }
                }

                if (!target) {
                    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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
                }
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
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.upgrader && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.upgrader);
    }
    return returnData;
}


// /**
//  * 升级者配置生成器
//  * source: 从指定矿中挖矿
//  * target: 将其转移到指定的 roomController 中
//  *
//  * @param sourceId 要挖的矿 id
//  */
// module.exports = sourceId => ({
//     // 采集能量矿
//     source: creep => {
//         const source = Game.getObjectById(sourceId)
//         if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source)

//         // 自己身上的能量装满了，返回 true（切换至 target 阶段）
//         return creep.store.getFreeCapacity() <= 0
//     },
//     // 升级控制器
//     target: creep => {
//         const controller = creep.room.controller
//         if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)

//         // 自己身上的能量没有了，返回 true（切换至 source 阶段）
//         return creep.store[RESOURCE_ENERGY] <= 0
//     }
// })


/**
 * 临时外部房间,升级
 * @param roomName
 * @param pathArray
 */
export function upgraderOuterRoom(roomName, pathArray = []) {
    let room = factory_room.nameGet(roomName);

    let creepName = '';
    const upgraders = all(Object.keys(globalData.rooms)[0]);
    if (upgraders < 1) return;
    // 是否已存在
    _.forEach(upgraders, upgrader => {
        if (upgrader.memory.upgraderOuterRoom && upgrader.memory.upgraderOuterRoom == roomName) {
            creepName = upgrader.name;
            return false;
        }
    })
    // 找新的
    if (!creepName) {
        _.forEach(upgraders, upgrader => {
            if (!upgrader.memory.upgraderOuterRoom) {
                upgrader.memory.upgraderOuterRoom = roomName;
                creepName = upgrader.name;
                return false;
            }
        })
    }
    let creep = Game.creeps[creepName];

    // 按设定路径移动
    for (let i = 0; i < pathArray.length; i++) {
        let path = pathArray[i];
        // 一次性移动
        if (path.roomName == path.roomPosition.roomName) {
            if (!creep.memory.pathList) creep.memory.pathList = [];
            let findIndex = _.findIndex(creep.memory.pathList, (a) => a == path.roomName)
            if (findIndex == -1) {
                if (!creep.pos.isEqualTo(path.roomPosition)) {
                    new factory_creep.Creep(creep).moveTo(path.roomPosition);
                    return;
                } else {
                    creep.memory.pathList.push(path.roomName);
                }
            }
            continue
        }
        // 按顺序移动
        if (creep.room.name == path.roomName) {
            new factory_creep.Creep(creep).moveTo(path.roomPosition);
            return;
        }
    }

    if (!room) {
        new factory_creep.Creep(creep).moveTo(new RoomPosition(43, 17, roomName));
    } else {
        if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // 升级状态&&能量不足的时候，变为采集者
            creep.memory.work = false;
            creep.say('🔄 采集');
        }
        if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非升级状态&&能量满的时候，变为升级状态
            creep.memory.work = true;
            creep.say('⚡ 升级');
        }

        if (creep.memory.work) { // 升级状态，找到控制器并升级 + 可视化
            if (creep.upgradeController(room.controller) == ERR_NOT_IN_RANGE) {
                new factory_creep.Creep(creep).moveTo(room.controller);
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