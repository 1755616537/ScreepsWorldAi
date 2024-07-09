var roleNewtransferer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        // 定义目标房间名  
        const sourceRoomName = 'E54N18';
        const targetRoomName = 'E54N19';

        if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // work && 背包为空
            creep.memory.work = false;
            creep.say('🔄 收获');
        }
        if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非work状态 && 背包满(空余为0)
            creep.memory.work = true;
            creep.say('🛒 储存');
        }

        let room = creep.room;

        if (creep.memory.work) {
            let target = Game.getObjectById('储存建筑id');
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            if (!Game.rooms[sourceRoomName] && room.name != sourceRoomName) {
                creep.moveTo(new RoomPosition(25, 25, sourceRoomName));
                return;
            }

            let sources = room.find(FIND_SOURCES);
            // 默认去采集第一个source
            let source = sources.length > 0 ? sources[0] : null;

            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }

        // 如果Creep在目标房间且背包为空，则返回源房间  
        if (creep.room.name === targetRoomName && creep.store[RESOURCE_ENERGY] === 0) {
            var target = creep.room.findExitTo(sourceRoomName);
            creep.moveTo(creep.pos.findClosestByPath(target));
            return;
        }

        // 如果Creep在源房间  
        if (creep.room.name === sourceRoomName) {

            const roomCenter = new RoomPosition(12, 6, sourceRoomName);

            // 如果Creep不在房间中心，则向中心移动
            if (!creep.pos.isEqualTo(roomCenter)) {
                creep.moveTo(roomCenter, {visualizePathStyle: {stroke: '#00ff00'}});
                // 返回以避免在移动时执行其他操作
            }


            // 寻找未满的Container  
            const containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });

            if (containers.length > 0) {
                // 选择一个Container进行采集  
                const targetContainer = containers[0];
                if (creep.withdraw(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                }

                // 当背包满时，前往目标房间  
                if (creep.store.getFreeCapacity() === 0) {
                    var target = creep.room.findExitTo(targetRoomName);
                    creep.moveTo(creep.pos.findClosestByPath(target));
                }
            }
        }

        // 如果Creep在目标房间  
        if (creep.room.name === targetRoomName && creep.store.getFreeCapacity() === 0) {
            // 这里可以添加逻辑来将能量转移到Extension, Tower, Spawn, Storage等结构中  
            // 示例：寻找一个需要能量的Extension  
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN ||
                            structure.structureType === STRUCTURE_TOWER || // 注意这里使用了 === 而不是 ==  
                            structure.structureType === STRUCTURE_STORAGE) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            // 对targets数组进行排序，根据structureType的优先级  
            targets.sort((a, b) => {
                if (a.structureType === STRUCTURE_EXTENSION) return -1;
                if (b.structureType === STRUCTURE_EXTENSION) return 1;
                if (a.structureType === STRUCTURE_SPAWN) return -1;
                if (b.structureType === STRUCTURE_SPAWN) return 1;
                if (a.structureType === STRUCTURE_TOWER) return -1;
                if (b.structureType === STRUCTURE_TOWER) return 1;
                // STORAGE 是最后的选择，所以不需要在这里特别处理  
                return 0; // 如果两个结构都不是上述类型，或者都是STORAGE，则保持原顺序  
            });
            // 现在targets数组已经按照EXTENSION, SPAWN, TOWER, STORAGE的顺序排序  
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleNewtransferer;