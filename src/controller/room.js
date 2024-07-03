import factory_Secure from "../factory/Secure.js";
import factory_Tower from "../factory/Tower.js";

import factory_initialization, {iniglobalData} from "../initialization.js";
import factory_room from "../factory/room.js";

import factory_creep from "../factory/creep.js";

import factory_creep_Harvest from "../factory/creep/Harvest.js";
import factory_creep_Upgrader from "../factory/creep/Upgrader.js";
import factory_creep_Builder from "../factory/creep/Builder.js";
import factory_creep_Carrier from "../factory/creep/Carrier.js";
import factory_creep_Repairer from "../factory/creep/Repairer.js";
import factory_creep_Defender from "../factory/creep/Defender.js";
import factory_creep_TheHealer from "../factory/creep/TheHealer.js";
import factory_creep_Occupier from "../factory/creep/Occupier.js";

import factory_Build from "../factory/Build/Build.js";

import Alliance_run from '../Alliance/run.js'
import Alliance_room from '../Alliance/room/room.js'

// 控制器 房间
export default function () {
    _.forEach(Game.rooms, room => {
        let roomName = room.name;

        // 该房间中前一个 tick 发生的事件数组
        let eventLog = room.getEventLog();

        // 安全
        factory_Secure.run(roomName);

        // 跳过不是自己的房间
        if (globalData.rooms[roomName]) {
            // 塔
            factory_Tower.run(roomName);


            // 建造完成 邮件提示
            let buildEvents = _.filter(eventLog, {
                event: EVENT_BUILD
            });
            if (buildEvents.length > 0) {
                buildEvents.forEach(event => {
                    let target = Game.getObjectById(event.data.targetId);
                    if (target && target.progress && target.progressTotal) {
                        if (target.progress + event.data.amount >= target.progressTotal) {
                            clog('房间' + roomName, '建造完成', JSON.stringify(event));
                            Utils.notify(
                                `【${roomName}】房间,id【${event.data.targetId}】${event.data.structureType} x${event.data.x} y${event.data.y}【建造】【完成】`
                            );
                            if (event.data.structureType == STRUCTURE_SPAWN) {
                                // 更新数据
                                iniglobalData();
                            }
                        }
                    }
                });
            }
        }

        // 一个游戏对象被摧毁或是被消灭 邮件提示
        let objectDestroyedEvents = _.filter(eventLog, {
            event: EVENT_OBJECT_DESTROYED
        });
        if (objectDestroyedEvents.length > 0) {
            objectDestroyedEvents.forEach(event => {
                // 事件者ID
                let objectId = event.objectId;
                let initiate = Game.getObjectById(objectId);
                let username;
                if (initiate) {
                    try {
                        username = initiate.owner.username;
                    } catch (e) {
                        //TODO handle the exception
                    }
                }

                if (!globalData.rooms[roomName]) {
                    if (username && username == globalData.username) {
                        clog('别人房间' + roomName, '一个游戏对象被摧毁或是被消灭', JSON.stringify(event));
                    }
                } else {
                    clog('房间' + roomName, '一个游戏对象被摧毁或是被消灭', JSON.stringify(event));
                }

                if (event.data.type != 'creep') {
                    if (!globalData.rooms[roomName]) {
                        // Utils.notify(
                        //     `别人【${roomName}】房间,id【${event.objectId}】${event.data.type}【被摧毁或是被消灭】`
                        // );
                    } else {
                        Utils.notify(
                            `【${roomName}】房间,id【${event.objectId}】${event.data.type}【被摧毁或是被消灭】`
                        );
                    }

                } else {
                    if (!globalData.rooms[roomName]) {
                        if (username && username == globalData.username) {
                            Utils.notify(
                                `别人【${roomName}】房间,id【${event.objectId}】${event.data.type}【被摧毁或是被消灭】`
                            );
                        }
                    }
                }

            });
        }

        // 跳过不是自己的房间
        if (globalData.rooms[roomName]) {
            // 建筑（自动建造等）
            factory_Build.run(roomName);

            // 房间显示文本
            roomVisual(roomName);
        }

    });

    // 联盟 房间 入口
    Alliance_run(Alliance_room, this, {
        // CONTAINER+EXTENSION+STORAGE能量统计
        SetContainerExtensionStorageEnergyStat: SetContainerExtensionStorageEnergyStat,
        // 能量源区Container记录管理
        sourceContainer: sourceContainer,
        // 控制器Container记录管理
        controllerContainer: controllerContainer,
        // 采集建造CONTAINER记录管理
        harvestBuildCONTAINER: harvestBuildCONTAINER,

        // 临时外部房间,升级
        upgraderOuterRoom: upgraderOuterRoom,
        // 临时外部房间,建造
        builderOuterRoom: builderOuterRoom
    });


}


// 房间显示文本
function roomVisual(roomName) {
    let room = factory_room.nameGet(roomName, true);
    if (!room) return;

    const harvests = factory_creep_Harvest.ALL(roomName);
    const upgraders = factory_creep_Upgrader.ALL(roomName);
    const builders = factory_creep_Builder.ALL(roomName);
    const carriers = factory_creep_Carrier.ALL(roomName);
    const repairers = factory_creep_Repairer.ALL(roomName);
    const nearDefenders = factory_creep_Defender.ALLNearDefender(roomName);
    const farDefenders = factory_creep_Defender.ALLFarDefender(roomName);
    const theHealers = factory_creep_TheHealer.ALL(roomName);
    const occupiers = factory_creep_Occupier.ALL(roomName);

    // 查看控制器等级
    const controller_level = room.controller.level;

    room.visual.text('控制器等级:' + controller_level, 1, 1, {
        align: 'left',
    });

    room.visual.text('采集者:' + harvests.length, 1, 2, {
        align: 'left',
    });
    room.visual.text('升级者:' + upgraders.length, 1, 3, {
        align: 'left'
    });
    room.visual.text('建造者:' + builders.length, 1, 4, {
        align: 'left'
    });
    room.visual.text('运输者:' + carriers.length, 1, 5, {
        align: 'left'
    });
    room.visual.text('维修者:' + repairers.length, 1, 6, {
        align: 'left'
    });
    room.visual.text('近战者:' + nearDefenders.length, 1, 7, {
        align: 'left'
    });
    room.visual.text('远战者:' + farDefenders.length, 1, 8, {
        align: 'left'
    });
    room.visual.text('治疗者:' + theHealers.length, 1, 9, {
        align: 'left'
    });
    room.visual.text('占领者:' + occupiers.length, 1, 10, {
        align: 'left'
    });
}

// 能量源区Container记录管理
function sourceContainer(roomName) {
    let memorySource;
    let on = false;
    // 如果没有合法记录会不存在harvestSourceID,报错需要捕获
    try {
        memorySource = Memory.rooms[roomName].source.list;
        on = true;
    } catch (e) {
        //TODO handle the exception
    }
    // 检查是否在能量源区CONTAINER中记录creep是否还存活
    if (on && memorySource) {
        for (let val in memorySource) {
            let spaceXYList = memorySource[val].spaceXYList;
            for (let i = 0; i < spaceXYList.length; i++) {
                let spaceXYListList2 = [];
                for (let i2 = 0; i2 < spaceXYList[i].list.length; i2++) {
                    let on = false;
                    _.forEach(Game.creeps, (creep) => {
                        if (creep.name == spaceXYList[i].list[i2]) {
                            on = true;
                            return false;
                        }
                    })
                    if (on) {
                        let creepName = spaceXYList[i].list[i2];
                        let containerID = spaceXYList[i].containerID;
                        let TransportationTarget = Game.creeps[creepName].memory.TransportationTarget;
                        if (TransportationTarget) {
                            if (TransportationTarget.id == containerID && TransportationTarget.type == 'Source') {
                                spaceXYListList2.push(creepName);
                            } else {
                                Game.creeps[creepName].memory.TransportationTarget = null;
                            }
                        }
                    }
                }
                Memory.rooms[roomName].source.list[val].spaceXYList[i].list = spaceXYListList2;
            }
        }
    }
}

// 控制器Container记录管理
function controllerContainer(roomName) {
    let memoryControllerContainer;
    let on = false;
    try {
        memoryControllerContainer = Memory.rooms[roomName].controller.container;
        on = true;
    } catch (e) {
        //TODO handle the exception
    }
    if (on && memoryControllerContainer) {
        if (memoryControllerContainer.list && memoryControllerContainer.list.length > 0) {
            // 检查是否在控制器CONTAINER中记录creep是否还存活
            let memoryControllerContainerList2 = [];
            for (let i = 0; i < memoryControllerContainer.list.length; i++) {
                let on = false;
                _.forEach(Game.creeps, (creep) => {
                    if (creep.name == memoryControllerContainer.list[i]) {
                        on = true;
                        return false;
                    }
                })
                if (on) {
                    let creepName = memoryControllerContainer.list[i];
                    let containerID = memoryControllerContainer.id;
                    let TransportationTarget = Game.creeps[creepName].memory.TransportationTarget;
                    if (TransportationTarget) {
                        if (TransportationTarget.id == containerID && TransportationTarget.type ==
                            'ControllerContainer') {
                            memoryControllerContainerList2.push(creepName);
                        } else {
                            Game.creeps[creepName].memory.TransportationTarget = null;
                        }
                    }
                }
            }
            Memory.rooms[roomName].controller.container.list = memoryControllerContainerList2;
        }
    }
}

// 采集建造CONTAINER记录管理
function harvestBuildCONTAINER(roomName) {
    let harvestBuildCONTAINERList;
    let on = false;
    try {
        if (!Memory.rooms[roomName].source.harvestBuildCONTAINERList) Memory.rooms[roomName].source
            .harvestBuildCONTAINERList = {};
        harvestBuildCONTAINERList = Memory.rooms[roomName].source.harvestBuildCONTAINERList;
        on = true;
    } catch (e) {
        //TODO handle the exception
    }

    if (on && _.size(harvestBuildCONTAINERList) > 0) {
        // 检查是否记录中的creep是否还存活
        let harvestBuildCONTAINERList2 = {};
        for (let i in harvestBuildCONTAINERList) {
            let on = false;
            _.forEach(Game.creeps, (creep) => {
                if (creep.name == i) {
                    on = true;
                    return false;
                }
            })
            if (on) harvestBuildCONTAINERList2[i] = harvestBuildCONTAINERList[i];
        }
        Memory.rooms[roomName].source.harvestBuildCONTAINERList = harvestBuildCONTAINERList2;

    }
}

// CONTAINER+EXTENSION+STORAGE能量统计
function SetContainerExtensionStorageEnergyStat(roomName) {
    let targets = factory_room.nameGet(roomName).find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_STORAGE) &&
                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    let targetsStore = [];
    let total = 0;
    for (var i = 0; i < targets.length; i++) {
        let energy = targets[i].store[RESOURCE_ENERGY];
        total += parseInt(energy ? energy : 0);
        targetsStore.push(energy);
    }
    // 只有房间中所有 spawn 和 extension 中的可用能量总额大于500,才检测预警
    let energyAvailable = factory_room.nameGet(roomName).energyAvailable;
    if (energyAvailable >= 500 && parseInt(total) < 500) {
        clog('房间' + roomName, 'CONTAINER+EXTENSION+STORAGE能量' + total + '不足500');
        Utils.notify(
            `【${roomName}】房间【CONTAINER+EXTENSION+STORAGE能量${total}不足500】`
        );
    }
    Memory.rooms[roomName].containerExtensionStorageEnergyStat = total;
}

// 临时外部房间,升级
function upgraderOuterRoom(roomName, pathArray = []) {
    let room = factory_room.nameGet(roomName);

    let creepName = '';
    const upgraders = factory_creep_Upgrader.ALL(Object.keys(globalData.rooms)[0]);
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
        if (creep.room.name == path.roomName) {
            factory_creep.moveTo(creep, path.roomPosition);
            return;
        }
    }

    if (!room) {
        factory_creep.moveTo(creep, new RoomPosition(43, 17, roomName));
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
                factory_creep.moveTo(creep, room.controller);
            }
        } else {
            // 掉落的资源
            let targets = room.find(FIND_DROPPED_RESOURCES);
            if (targets.length > 0) {
                // 捡起一个物品 (如捡起一些能量)
                if (creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
                    // 向目标移动
                    factory_creep.moveTo(creep, targets[0], 'Resource');
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
                        factory_creep.moveTo(creep, sources, 'Resource');
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
                        factory_creep.moveTo(creep, targets[0], 'Resource');
                    }
                }
            }

        }
    }
}

// 临时外部房间,建造
function builderOuterRoom(roomName, pathArray = []) {
    let room = factory_room.nameGet(roomName);

    let creepName = '';
    const builders = factory_creep_Builder.ALL(Object.keys(globalData.rooms)[0]);
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
            factory_creep.moveTo(creep, path.roomPosition);
            return;
        }
    }

    if (!room) {
        factory_creep.moveTo(creep, new RoomPosition(43, 17, roomName));
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
                    factory_creep.moveTo(creep, targets[0]);
                }
            }
        } else {
            // 掉落的资源
            let targets = room.find(FIND_DROPPED_RESOURCES);
            if (targets.length > 0) {
                // 捡起一个物品 (如捡起一些能量)
                if (creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
                    // 向目标移动
                    factory_creep.moveTo(creep, targets[0], 'Resource');
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
                        factory_creep.moveTo(creep, sources, 'Resource');
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
                        factory_creep.moveTo(creep, targets[0], 'Resource');
                    }
                }
            }
        }
    }
}