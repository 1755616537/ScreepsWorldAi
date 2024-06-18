import factory_creep from "../factory/creep.js";
import factory_spawn from "../factory/spawn.js";
import factory_room from "../factory/room.js";

import factory_creep_Harvest from "../factory/creep/Harvest.js";
import factory_creep_Upgrader from "../factory/creep/Upgrader.js";
import factory_creep_Builder from "../factory/creep/Builder.js";
import factory_creep_Carrier from "../factory/creep/Carrier.js";
import factory_creep_Repairer from "../factory/creep/Repairer.js";
import factory_creep_Defender from "../factory/creep/Defender.js";
import factory_creep_TheHealer from "../factory/creep/TheHealer.js";
import factory_creep_Occupier from "../factory/creep/Occupier.js";

import Alliance_run from '../Alliance/run.js'
import Alliance_creep from '../Alliance/creep/creep.js'

// 控制器 creep
export default function () {

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
        ;
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
            // 	mgs:
            // }
            let code;
            let mgs;
            try {
                code = SpecialActions.code;
                mgs = SpecialActions.mgs;
            } catch (e) {

            }
            /**
            Game.creeps['repairer8981'].memory.SpecialActions={
                code:'move', mgs:{
                    x:20,
                    y:2,
                    roomName:'W2N1'
                }
            }
             */
            if (code) {
                switch (code) {
                    case 'move':
                        factory_creep.moveTo(creep, new RoomPosition(mgs.x, mgs.y, mgs.roomName));
                        break;
                    case globalData.harvest:
                    {
                        let roomPosition = new RoomPosition(mgs.x, mgs.y, mgs.roomName)
                        if (creep.harvest(roomPosition) == ERR_NOT_IN_RANGE) {
                            factory_creep.moveTo(creep, roomPosition);
                        }
                    }
                        break;
                    case globalData.upgrader:
                    {
                        let roomPosition = new RoomPosition(mgs.x, mgs.y, mgs.roomName)
                        if (creep.upgradeController(roomPosition) == ERR_NOT_IN_RANGE) {
                            factory_creep.moveTo(creep, roomPosition);
                        }
                    }
                        break;
                    case globalData.builder:
                    {
                        let roomPosition = new RoomPosition(mgs.x, mgs.y, mgs.roomName)
                        if (creep.build(roomPosition) == ERR_NOT_IN_RANGE) {
                            factory_creep.moveTo(creep, roomPosition);
                        }
                    }
                        break;
                    case globalData.carrier:
                    {
                        let roomPosition = new RoomPosition(mgs.x, mgs.y, mgs.roomName)
                        if (creep.withdraw(roomPosition) == ERR_NOT_IN_RANGE) {
                            factory_creep.moveTo(creep, roomPosition);
                        }
                    }
                        break;
                    case globalData.repairer:
                    {
                        let roomPosition = new RoomPosition(mgs.x, mgs.y, mgs.roomName)
                        if (creep.repair(roomPosition) == ERR_NOT_IN_RANGE) {
                            factory_creep.moveTo(creep, roomPosition);
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