// havester 	采矿者 	开采能量 	carry 是否到达上限 	存入指定的结构
// upgrader 	升级者 	取出能量 	carry 是否到达上限 	升级房间控制器
// builder 	建造者 	取出能量 	carry 是否到达上限 	建造结构
// carrier 	运输者 	取出能量 	carry 是否到达上限 	存入指定的结构
// repairer 	维修者 	取出能量 	carry 是否到达上限 	修复受损的结构
// defender 	防御者 	驻守指定区域 	房间内是否有入侵者 	攻击入侵者

var pro = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) { // 背包未满 采矿
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, { //找出需要补充能量的建筑
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || 
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) { // 需要维护的建筑数目 > 0
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

global.factory.creep.roleHarvester = pro;