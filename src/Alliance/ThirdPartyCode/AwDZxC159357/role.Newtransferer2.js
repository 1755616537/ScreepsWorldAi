var roleNewtransferer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        const sourceRoomName = 'E54N18';
        const targetRoomName = 'E54N19';

        // 初始化或更新状态  
        if (!creep.memory.state) {
            creep.memory.state = 'RETURN_TO_SOURCE';  // 假设开始时总是返回源房间  
        }

        // 根据当前状态执行操作  
        switch (creep.memory.state) {
            case 'RETURN_TO_SOURCE':
                if (creep.room.name !== sourceRoomName) {
                    creep.moveTo(new RoomPosition(25, 25, sourceRoomName), {visualizePathStyle: {stroke: '#ffaa00'}});
                    return;
                } else {
                    // 到达源房间后，开始寻找并收集能量 
                    const containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_CONTAINER &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                        }
                    });
                    const targetContainer = creep.pos.findClosestByPath(containers);
                    // 如果Creep不在Container旁边，则向Container移动
                    if (!creep.pos.isEqualTo(targetContainer.pos)) {
                        creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                    } else {
                        // 如果已经在Container旁边，则尝试采集
                        if (creep.withdraw(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            // 通常不会走到这里，因为已经在旁边了，但以防万一
                            creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) {
                        creep.memory.state = 'TRANSFER_ENERGY';
                    }
                }
                break;
            case 'TRANSFER_ENERGY':
                if (creep.room.name !== targetRoomName) {
                    // 这里可能需要一个具体的目标点或结构来移动到，这里假设直接移动到目标房间的中心
                    creep.moveTo(new RoomPosition(25, 25, targetRoomName), {visualizePathStyle: {stroke: '#00aaff'}});
                    return;
                }
                if (creep.room.name === targetRoomName) {
                    // 目标房间，寻找能量存储结构  
                    const targetContainers = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (
                                (structure.structureType === STRUCTURE_CONTAINER) &&
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) < structure.storeCapacity
                            );
                        }
                    });
                    if (targetContainers.length > 0 && creep.store[RESOURCE_ENERGY] > 0) {
                        const targetContainer = targetContainers[0];
                        if (creep.transfer(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    } else if (creep.store[RESOURCE_ENERGY] === 0) {
                        // 能量耗尽，返回源房间  
                        creep.memory.state = 'RETURN_TO_SOURCE';
                    }
                } else {
                    // 不在目标房间，返回源房间  
                    creep.moveTo(new RoomPosition(25, 25, sourceRoomName), {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.memory.state = 'RETURN_TO_SOURCE';
                    return;
                }
                break;
        }
    }
};
module.exports = roleNewtransferer;