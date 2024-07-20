var roleAdventurer = {  
    /** @param {Creep} creep **/  
    run: function(creep) {  
        const sourceRoomName = 'E56N17';  
        const targetRoomName = 'E54N19';  
        const ruinPosition = new RoomPosition(28, 20, sourceRoomName);  
        // 初始化或更新状态  
        if (!creep.memory.state) {  
            creep.memory.state = 'COLLECT_FROM_RUIN'; // 开始时先去收集RUIN中的资源  
        }  
        switch (creep.memory.state) {  
            case 'COLLECT_FROM_RUIN':  
                if (creep.room.name !== sourceRoomName) {  
                    creep.moveTo(new RoomPosition(25, 25, sourceRoomName), { visualizePathStyle: { stroke: '#ffaa00' } });  
                    return;  
                }  
            
                // 检查是否到达RUIN位置  
                if (creep.pos.isEqualTo(ruinPosition)) {  
                    const ruin = creep.room.lookForAt(LOOK_STRUCTURES, ruinPosition).find(s => s.structureType === STRUCTURE_RUIN);
                    if (ruin && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {  
                        if (creep.withdraw(ruin, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {   
                            creep.moveTo(ruin, { visualizePathStyle: { stroke: '#ffffff' } });  
                        }  
                    } else if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {  
                        creep.memory.state = 'TRANSFER_TO_STORAGE';  
                    }  
                }  
                break;  

            case 'TRANSFER_TO_STORAGE':  
                if (creep.room.name !== targetRoomName) {  
                    creep.moveTo(new RoomPosition(25, 25, targetRoomName), { visualizePathStyle: { stroke: '#00aaff' } });  
                    return;  
                }  
                // 寻找最近的STORAGE并传输资源  
                const storage = creep.room.find(FIND_STRUCTURES, {  
                    filter: (structure) => {  
                        return (structure.structureType === STRUCTURE_STORAGE) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;  
                    }  
                })[0];  
                if (storage && creep.store[RESOURCE_ENERGY] > 0) {  
                    creep.transfer(storage, RESOURCE_ENERGY);  
                } else if (creep.store[RESOURCE_ENERGY] === 0) {  
                    creep.memory.state = 'COLLECT_FROM_RUIN';  
                }  
                break;  
        }  
    }  
};  

module.exports = roleAdventurer;