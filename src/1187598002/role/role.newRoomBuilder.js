export const roleNewRoomBuilder = {
    /**  
    * 建设单兵-爬爬模块
    * @param {Creep} creep - 攻击爬爬
    * @param {string} nameRoom - 需要防御的房间名
    * @param {number} ordinalSource - 开采此房间第几号能量
    */
    run: function(creep, nameRoom, ordinalSource) {

        var sources = creep.room.find(FIND_SOURCES);
        var resures = creep.room.find(FIND_DROPPED_RESOURCES);
        var store = Game.rooms[nameRoom].find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
        var buildings = Game.rooms[nameRoom].find(FIND_CONSTRUCTION_SITES);
        var controller = Game.rooms[nameRoom].controller;

        var sourceNum  = 0;
        for(var i = 0; i < resures.length; i++) sourceNum += resures[i].amount;
        for(var i = 0; i < store.length; i++) sourceNum += store[i].store.getUsedCapacity;

        if(creep.memory.action == null){
            if(creep.store.getUsedCapacity() == 0){
                if(sourceNum > 0){
                    creep.say('withdraw');
                    creep.memory.action = 'withdraw';
                }
                else{
                    creep.say('harvest');
                    creep.memory.action = 'harvest';
                }
            }
            else if(buildings.length > 0){
                creep.say('build');
                creep.memory.action = 'build';
            }
            else{
                creep.say('upgrade');
                creep.memory.action = 'upgrade';
            }
        }
        if(creep.memory.action == 'withdraw'){
            if(sourceNum == 0 || creep.store.getFreeCapacity() == 0) creep.memory.action = null;
            for(var i = 0; i < store.length; i++){
                if(store[i].store.getUsedCapacity == 0) continue;
                if(creep.withdraw(store[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(store[i]);
                }
            }
            for(var i = 0; i < resures.length; i++){
                if(resures[i].amount == 0) continue;
                if(creep.pickup(resures[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resures[0]);
                }
            }
        }
        if(creep.memory.action == 'harvest'){
            if(creep.harvest(sources[ordinalSource]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[ordinalSource]);
            }
            if(creep.store.getFreeCapacity() == 0){
                creep.memory.action = null;
            }
        }
        if(creep.memory.action == 'build'){
            if(creep.build(buildings[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(buildings[0]);
            }
            if(creep.store.getUsedCapacity() == 0 || buildings.length == 0){
                creep.memory.action = null;
            }
        }
        if(creep.memory.action == 'upgrade'){
            if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
            else if(creep.upgradeController(controller) != 0){
                creep.memory.action = null;
            }
        }
        return;
	}
};

//module.exports = roleNewRoomBuilder;