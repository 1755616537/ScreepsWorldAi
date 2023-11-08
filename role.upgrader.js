var roleUpgrader = {
 
    /** @param {Creep} creep **/
    run: function(creep) {
        //采集和采集者的功能是一样的
        if(creep.store[RESOURCE_ENERGY] == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else if(creep.store[RESOURCE_ENERGY] < 50){
            if(creep.harvest(sources[1]) != OK) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        //有能量的时候去移动升级控制器
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};
 
module.exports = roleUpgrader;