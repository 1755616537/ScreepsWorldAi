var roleNewbuilder = {  
    /**  
     * @param {Creep} creep - The creep to run logic for.  
     */  
    run: function(creep) {  
        // 初始化或更新creep的记忆中的房间名  
        if (!creep.memory.TargetRoomName) {  
            creep.memory.TargetRoomName = 'E56N13';  
        }  
        if (!creep.memory.SourceRoomName) {  
            creep.memory.SourceRoomName = 'E56N13';  
        }  
  
        const targetRoomName = creep.memory.TargetRoomName;  
        const sourceRoomName = creep.memory.SourceRoomName;  
  
        // 判断creep是否应该在源房间或目标房间  
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {  
            // 如果背包满了，前往目标房间  
            if (creep.room.name !== targetRoomName) {  
                creep.moveTo(new RoomPosition(25, 25, targetRoomName), { visualizePathStyle: { stroke: '#ff0000' } });  
            } else {  
                // 在目标房间进行建筑或升级  
                const targets = creep.room.find(FIND_CONSTRUCTION_SITES);  
                if (targets.length > 0) {  
                    if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {  
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });  
                    }  
                } else {  
                    const controller = creep.room.controller;  
                    if (controller && controller.my && controller.level < 8) {  
                        if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {  
                            creep.moveTo(controller, { visualizePathStyle: { stroke: '#00ff00' } });  
                        }  
                    }  
                }  
            }  
        } else {  
            // 如果背包未满，前往源房间采集  
            if (creep.room.name !== sourceRoomName) {  
                creep.moveTo(new RoomPosition(25, 25, sourceRoomName), { visualizePathStyle: { stroke: '#0000ff' } });  
            } else {  
                // 在源房间采集能量  
                const sources = creep.room.find(FIND_SOURCES);  
                if (sources.length > 0) {  
                    const source = creep.pos.findClosestByPath(sources);  
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {  
                        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });  
                    }  
                }  
            }  
        }  
    }  
};  
  
module.exports = roleNewbuilder;