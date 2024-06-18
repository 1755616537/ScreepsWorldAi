var rolePicker = {
    /**
    * 捡起地上能量(拾荒者)-任务模块
    * @param {Creep} creep - 攻击爬爬
    * @param {string} nameRoom - 需要拾荒的房间名
    * @param {Structure} outStore - 存储容器对象
    * @param {{x:number, y:number}} waitPos - 待命的位置坐标
    */
    run: function(creep, nameRoom, outStore, waitPos) {

        if(creep.store.getUsedCapacity() == 0){
            //如果背包为空 -> 前往拾荒
            var resource = Game.rooms[nameRoom].find(FIND_DROPPED_RESOURCES, {
                filter: (resource) => resource.resourceType == RESOURCE_ENERGY
            });
            if(resource != null){
                if(creep.pickup(resource[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(resource[0]);
                }
            }
            else{
                if(creep.pos.x != waitPos.x || creep.pos.y != waitPos.y){
                    creep.moveTo(waitPos.x, waitPos.y);
                }
            }
        }
        else{
            //如果背包有能量 -> 前往装填
            if(creep.transfer(outStore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(outStore);
            }
        }
        
	}
};

module.exports = rolePicker;