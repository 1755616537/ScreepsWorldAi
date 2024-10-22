import factory_creep from "../Alliance/ThirdPartyCode/1755616537/factory/creep.js";
import factory_spawn from "../Alliance/ThirdPartyCode/1755616537/factory/spawn.js";
import factory_room from "../Alliance/ThirdPartyCode/1755616537/factory/room.js";

import factory_creep_Harvest from "../Alliance/ThirdPartyCode/1755616537/factory/creeps/Harvest.js";
import factory_creep_Upgrader from "../Alliance/ThirdPartyCode/1755616537/factory/creeps/Upgrader.js";
import factory_creep_Builder from "../Alliance/ThirdPartyCode/1755616537/factory/creeps/Builder.js";
import factory_creep_Carrier from "../Alliance/ThirdPartyCode/1755616537/factory/creeps/Carrier.js";
import factory_creep_Repairer from "../Alliance/ThirdPartyCode/1755616537/factory/creeps/Repairer.js";
import factory_creep_Defender from "../Alliance/ThirdPartyCode/1755616537/factory/creeps/Defender.js";
import factory_creep_TheHealer from "../Alliance/ThirdPartyCode/1755616537/factory/creeps/TheHealer.js";
import factory_creep_Occupier from "../Alliance/ThirdPartyCode/1755616537/factory/creeps/Occupier.js";

import Alliance_run from '../Alliance/run.js'
import Alliance_creep from '../Alliance/creep/creep.js'

// 控制器 creep
export default function () {

    if (!globalData.creeps) globalData.creeps = {};
    // Object.values(Game.creeps).forEach(creep => {
    //     let findIndex = _.findIndex(globalData.creeps, globalDataCreep => creep.name == globalDataCreep.name);
    //     if (findIndex == -1) {
    //         globalData.creeps[creep.name] = {
    //             name: creep.name
    //         };
    //     } else {
    //         delete globalData.creeps[creep.name];
    //     }
    // })

    // 遍历所有 creep 并执行上文中拓展的 work 方法
    // Object.values(Game.creeps).forEach(creep => creep.work())

    // 清理内存
    factory_creep.CleanMemory();

    // 联盟 房间 入口
    Alliance_run(Alliance_creep, this, {
        // spawn生产孵化Creep
        spawnProduceCreep: spawnProduceCreep
    });

    // 事件管理
    eventManagement();

}


function addHarvest(harvests, controller_level = 4, spawnName) {
    // 生产 限制 采集
    if (harvests.length < globalData.creepConfigs.harvest.number) {
        let returnData = factory_creep.addHarvest(harvests, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

function addUpgrader(upgraders, controller_level, spawnName) {
    // 生产 限制 升级
    let roomName = factory_spawn.nameGetRoomName(spawnName);
    if (upgraders.length < globalData.creepConfigs.upgrader.number) {
        let returnData;
        // 房间CONTAINER总能量在2000以下时,只会存在一个升级者
        if (upgraders.length > 0) {
            if (Memory.rooms[roomName].containerExtensionStorageEnergyStat > 2000) {
                returnData = factory_creep.addUpgrader(upgraders, controller_level, spawnName);
            }
        } else {
            returnData = factory_creep.addUpgrader(upgraders, controller_level, spawnName);
        }

        // clog(returnData);
        return returnData;
    }
}

function addBuilder(builders, controller_level, spawnName) {
    // 生产 限制 建造 前提控制器2等级
    if (builders.length < globalData.creepConfigs.builder.number) { // && controller_level >= 2
        let returnData = factory_creep.addBuilder(builders, controller_level, spawnName)
        // clog(returnData);
        return returnData;
    }
}

function addCarrier(carriers, controller_level, spawnName) {
    // 生产 限制 运输
    if (carriers.length < globalData.creepConfigs.carrier.number) {
        // 拥有CONTAINER才生产
        const builds = factory_spawn.nameGet(spawnName).room.find(FIND_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_CONTAINER
            }
        });
        if (builds.length > 0) {
            let returnData = factory_creep.addCarrier(carriers, controller_level, spawnName);
            // clog(returnData);
            return returnData;
        }
    }
}

function addRepairer(repairers, controller_level, spawnName) {
    // 生产 限制 维修
    if (repairers.length < globalData.creepConfigs.repairer.number) {
        let returnData = factory_creep.addRepairer(repairers, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

function addNearDefender(nearDefenders, controller_level, spawnName) {
    // 生产 限制 防御者-近战
    if (nearDefenders.length < globalData.creepConfigs.nearDefender.number) {
        let returnData = factory_creep.addNearDefender(nearDefenders, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

function addFarDefender(farDefenders, controller_level, spawnName) {
    // 生产 限制 防御者-远战
    if (farDefenders.length < globalData.creepConfigs.farDefender.number) {
        let returnData = factory_creep.addFarDefender(farDefenders, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

function addTheHealer(theHealers, controller_level, spawnName) {
    // 生产 限制 治疗者
    if (theHealers.length < globalData.creepConfigs.theHealer.number) {
        let returnData = factory_creep.addTheHealer(theHealers, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

function addOccupier(occupiers, controller_level, spawnName) {
    // 生产 限制 占领者
    if (occupiers.length < globalData.creepConfigs.occupier.number) {
        let returnData = factory_creep.addOccupier(occupiers, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

// 事件管理
function eventManagement() {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        // 特别行动
        let SpecialActions = creep.memory.SpecialActions;
        if (SpecialActions) {
            // 数据格式
            // SpecialActions:{
            // //代号
            // 	code:'',
            // //附加信息 任何类型，没有指定字符串对象等
            // 	msg:
            // }
            let code;
            let msg;
            try {
                code = SpecialActions.code;
                msg = SpecialActions.msg;
            } catch (e) {

            }
            /**
             Game.creeps['repairer8981'].memory.SpecialActions={
             code:'move', msg:{
             x:20,
             y:2,
             roomName:'W2N1'
             }
             }
             */
            if (code) {
                switch (code) {
                    case 'move':
                        if (creep.pos.x == msg.x && creep.pos.y == msg.y && creep.pos.roomName == msg.roomName) {
                            creep.memory.SpecialActions = undefined;
                            break;
                        }
                        new factory_creep.Creep(creep).moveTo(new RoomPosition(msg.x, msg.y, msg.roomName));
                        break;
                    case globalData.harvest: {
                        let roomPosition = new RoomPosition(msg.x, msg.y, msg.roomName)
                        if (creep.room.name != msg.roomName) {
                            new factory_creep.Creep(creep).moveTo(roomPosition);
                            break
                        }
                        let lookForAt = creep.room.lookForAt(LOOK_MINERALS, roomPosition)
                        if (lookForAt.length > 0) {
                            if (creep.harvest(lookForAt[0]) == ERR_NOT_IN_RANGE) {
                                new factory_creep.Creep(creep).moveTo(lookForAt[0]);
                            }
                        }
                    }
                        break;
                    case globalData.upgrader: {
                        let roomPosition = new RoomPosition(msg.x, msg.y, msg.roomName)
                        if (creep.room.name != msg.roomName) {
                            new factory_creep.Creep(creep).moveTo(roomPosition);
                            break
                        }
                        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            new factory_creep.Creep(creep).moveTo(creep.room.controller);
                        }
                    }
                        break;
                    case globalData.builder: {
                        let roomPosition = new RoomPosition(msg.x, msg.y, msg.roomName)
                        if (creep.room.name != msg.roomName) {
                            new factory_creep.Creep(creep).moveTo(roomPosition);
                            break
                        }
                        let lookForAt = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, roomPosition)
                        if (lookForAt.length > 0) {
                            const lookTo = lookForAt[0].pos.findInRange(FIND_MY_STRUCTURES, 1,
                                {filter: {structureType: STRUCTURE_CONTROLLER}});

                            if (creep.build(lookForAt[0]) == ERR_NOT_IN_RANGE) {
                                new factory_creep.Creep(creep).moveTo(lookForAt[0]);
                            }
                        }
                    }
                        break;
                    case globalData.carrier: {
                        let roomPosition = new RoomPosition(msg.x, msg.y, msg.roomName)
                        if (creep.room.name != msg.roomName) {
                            new factory_creep.Creep(creep).moveTo(roomPosition);
                            break
                        }
                        let lookForAt = creep.room.lookForAt(LOOK_RESOURCES, roomPosition)
                        if (lookForAt.length > 0) {
                            for (const resourceType in lookForAt[0].store) {
                                if (creep.withdraw(lookForAt[0], resourceType) == ERR_NOT_IN_RANGE) {
                                    // 向目标移动
                                    new factory_creep.Creep(creep).moveTo(lookForAt[0]);
                                    break;
                                }
                            }
                        }
                    }
                        break;
                    case globalData.carrier + '2': {
                        let roomPosition = new RoomPosition(msg.x, msg.y, msg.roomName)
                        if (creep.room.name != msg.roomName) {
                            new factory_creep.Creep(creep).moveTo(roomPosition);
                            break
                        }
                        let lookForAt = creep.room.lookForAt(LOOK_RESOURCES, roomPosition)
                        if (lookForAt.length > 0) {
                            for (const resourceType in lookForAt[0].store) {
                                if (resourceType != RESOURCE_ENERGY) continue;
                                if (creep.withdraw(lookForAt[0], resourceType) == ERR_NOT_IN_RANGE) {
                                    // 向目标移动
                                    new factory_creep.Creep(creep).moveTo(lookForAt[0]);
                                    break;
                                }
                            }
                        }
                    }
                        break;
                    case globalData.carrier + '3': {
                        let roomPosition = new RoomPosition(msg.x, msg.y, msg.roomName)
                        if (creep.room.name != msg.roomName) {
                            new factory_creep.Creep(creep).moveTo(roomPosition);
                            break
                        }

                        // work && 背包为空
                        if (creep.memory.work && creep.store.getUsedCapacity() == 0) {
                            creep.memory.work = false;
                            creep.say('🔄 收获');
                        }
                        // 非work状态 && 背包满(空余为0)
                        if (!creep.memory.work && creep.store.getFreeCapacity() == 0) {
                            creep.memory.work = true;
                            creep.say('🛒 存放');
                        }


                        if (!creep.memory.work) {
                            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: (structure) => {
                                    // 找出有储存能量的container搬运
                                    return (structure.structureType == STRUCTURE_CONTAINER ||
                                            structure.structureType == STRUCTURE_STORAGE) &&
                                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100;
                                }
                            })
                            if (target){
                                // 从建筑(structure)中拿取资源
                                if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    // 向目标移动
                                    new factory_creep.Creep(creep).moveTo(target, 'Resource');
                                }
                            }
                        }else {
                            let lookForAt = creep.room.lookForAt(LOOK_STRUCTURES, roomPosition)
                            if (lookForAt.length > 0) {
                                // 将资源从该 creep 转移至其他对象
                                for (const resourceType in creep.carry) {
                                    if (creep.transfer(lookForAt[0], resourceType) == ERR_NOT_IN_RANGE) {
                                        // 向目标移动
                                        new factory_creep.Creep(creep).moveTo(lookForAt[0]);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                        break;
                    case globalData.repairer: {
                        let roomPosition = new RoomPosition(msg.x, msg.y, msg.roomName)
                        if (creep.room.name != msg.roomName) {
                            new factory_creep.Creep(creep).moveTo(roomPosition);
                            break
                        }
                        let lookForAt = creep.room.lookForAt(LOOK_STRUCTURES, roomPosition)
                        if (lookForAt.length > 0) {
                            if (creep.repair(lookForAt[0]) == ERR_NOT_IN_RANGE) {
                                new factory_creep.Creep(creep).moveTo(lookForAt[0]);
                            }
                        }
                    }
                        break;
                    default:
                }
                continue;
            }
        }

        if (creep.memory.role == globalData.harvest) {
            factory_creep_Harvest.run(creep);
        }
        if (creep.memory.role == globalData.upgrader) {
            if (!creep.memory.upgraderOuterRoom) {
                factory_creep_Upgrader.run(creep);
            }
        }
        if (creep.memory.role == globalData.builder) {
            if (!creep.memory.builderOuterRoom) {
                factory_creep_Builder.run(creep);
            }
        }
        if (creep.memory.role == globalData.carrier) {
            factory_creep_Carrier.run(creep);
        }
        if (creep.memory.role == globalData.repairer) {
            factory_creep_Repairer.run(creep);
        }
        if (creep.memory.role == globalData.nearDefender || creep.memory.role == globalData.farDefender) {
            factory_creep_Defender.run(creep);
        }
        if (creep.memory.role == globalData.theHealer) {
            factory_creep_TheHealer.run(creep);
        }
        if (creep.memory.role == globalData.occupier) {
            factory_creep_Occupier.run(creep);
        }
    }
}

// spawn生产孵化Creep
function spawnProduceCreep(spawnName) {
    let roomName = factory_spawn.nameGetRoomName(spawnName);

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
    const controller_level = factory_room.nameGet(roomName).controller.level;

    // 能量源区
    let sources = factory_room.nameGet(roomName).find(FIND_SOURCES);

    // 母巢 (spawn) 是否正在孵化一个新的 creep
    if (factory_spawn.nameGet(spawnName).spawning) {
        // 孵化，过程可视化
        let spawningCreep = Game.creeps[factory_spawn.nameGet(spawnName).spawning.name];
        factory_room.nameGet(roomName).visual.text(
            '孵化🛠️' + spawningCreep.memory.role,
            factory_spawn.nameGet(spawnName).pos.x + 1,
            factory_spawn.nameGet(spawnName).pos.y, {
                align: 'left',
                opacity: 0.8
            });
    } else {
        // 生产 采集
        // 动态更新采集者数量
        try {
            if (globalData.creepConfigs.harvest.AutomaticAssignNum && Memory.rooms[roomName].source.total && globalData
                .creepConfigs.harvest.number != Memory.rooms[roomName].source.total) globalData
                .creepConfigs.harvest.number = Memory.rooms[roomName].source.total;
        } catch (e) {
            //TODO handle the exception
        }


        let towers = factory_room.nameGet(roomName).find(FIND_STRUCTURES, {
            filter: (structure) => {
                // 找出需要储存能量
                return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100;
            }
        });

        // 优先级顺序生产 每种保持最低1个
        let priority;
        // 采集最低和能量源区一样的数量
        if ((harvests.length < 1 && globalData.creepConfigs.harvest.number >= 1) || (harvests.length < sources.length &&
            globalData.creepConfigs.harvest.number >= sources.length)) {
            priority = 'harvest';
        } else if (upgraders.length < 1 && globalData.creepConfigs.upgrader.number >= 1) {
            priority = 'upgrader';
        } else if (builders.length < 1 && globalData.creepConfigs.builder.number >= 1) {
            priority = 'builder';
        } else if (repairers.length < 1 && globalData.creepConfigs.repairer.number >= 1 && (!globalData.creepConfigs
            .repairer.onTower || (globalData
                .creepConfigs.repairer.onTower && towers.length <
            1))) {
            priority = 'repairer';
        } else if (carriers.length < 1 && globalData.creepConfigs.carrier.number >= 1) {
            // 注释掉是因为 拥有CONTAINER才生产 会卡住优先顺序，不进行默认生成
            // priority = 'carrier';
        } else if (nearDefenders.length < 1 && globalData.creepConfigs.nearDefender.number >= 1) {
            priority = 'nearDefender';
        } else if (farDefenders.length < 1 && globalData.creepConfigs.farDefender.number >= 1) {
            priority = 'farDefender';
        } else if (theHealers.length < 1 && globalData.creepConfigs.theHealer.number >= 1) {
            priority = 'theHealer';
        } else if (occupiers.length < 1 && globalData.creepConfigs.occupier.number >= 1 && factory_room.nameGet(roomName).energyCapacityAvailable >= 650) {
            priority = 'occupier';
        }
        if (priority) {
            switch (priority) {
                case 'harvest':
                    addHarvest(harvests, controller_level, spawnName);
                    break;
                case 'upgrader':
                    addUpgrader(upgraders, controller_level, spawnName);
                    break;
                case 'builder':
                    addBuilder(builders, controller_level, spawnName);
                    break;
                case 'carrier':
                    addCarrier(carriers, controller_level, spawnName);
                    break;
                case 'repairer':
                    addRepairer(repairers, controller_level, spawnName);
                    break;
                case 'nearDefender':
                    addNearDefender(nearDefenders, controller_level, spawnName);
                    break;
                case 'farDefender':
                    addFarDefender(farDefenders, controller_level, spawnName);
                    break;
                case 'theHealer':
                    addTheHealer(theHealers, controller_level, spawnName);
                    break;
                case 'occupier':
                    addOccupier(occupiers, controller_level, spawnName);
                    break;
                default:
            }
        } else {
            // 默认顺序生产
            if (addHarvest(harvests, controller_level, spawnName) != OK) {
                if (addCarrier(carriers, controller_level, spawnName) != OK) {
                    if (addBuilder(builders, controller_level, spawnName) != OK) {
                        if (addRepairer(repairers, controller_level, spawnName) != OK) {
                            if (addUpgrader(upgraders, controller_level, spawnName) != OK) {
                                if (addNearDefender(upgraders, controller_level, spawnName) != OK) {
                                    if (addFarDefender(upgraders, controller_level, spawnName) != OK) {
                                        if (addTheHealer(upgraders, controller_level, spawnName) != OK) {
                                            if (addOccupier(upgraders, controller_level, spawnName) != OK) {
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}