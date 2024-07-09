var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        function findContainerNearSource(source, range) {
            if (!source) return null;
            return source.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER) &&
                        (structure.pos.getRangeTo(source.pos) <= range);
                }
            })[0]; // 返回找到的第一个container
        }

        var source = creep.room.find(FIND_SOURCES);
        var range = 1;
        var container = findContainerNearSource(source[creep.memory.workLoc], range);

        if (container) {
            // 如果找到了container，判断 creep 是否已经在 container 旁边  
            if (!creep.pos.isEqualTo(container.pos)) {
                creep.moveTo(container.pos);
            }else{
                // creep 已经在 container 旁边，执行收集资源的操作
                creep.harvest(source[Memory.creeps[creep.name].workLoc]);
            }
        }
    }
}
module.exports = roleHarvester;
//只挖不运