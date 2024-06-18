var roleHarvesterCarrier = {
    /**  
    * 采集能量运输-爬爬模块
    * @param {Creep} creep - 运输爬爬
    * @param {{x:number, y:number}} storePos - 存储容器位置
    * @param {{x:number, y:number}} workPos - 采集工作位置
    * @param {{x:number, y:number}} pickupPos - 捡起资源位置(在此位置捡起采集工作位置上的资源)
    */
    run: function(creep, storePos, workPos, pickupPos) {

        if(creep.store.getUsedCapacity() == 0){
            //如果背包为空 -> 前往采集点拾荒
            if(creep.pos.x != pickupPos.x || creep.pos.y != pickupPos.y) {
                //如果没到达拾荒点 -> 移到拾荒点
                creep.moveTo(pickupPos.x, pickupPos.y);
            }
            else{
                //到达指定位置 -> 开始拾荒
                var resource = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (resource) => resource.pos.x == workPos.x 
                    && resource.pos.y == workPos.y 
                    && resource.resourceType == RESOURCE_ENERGY
                });
                if(resource != null){
                    creep.pickup(resource[0]);
                }
            }
        }
        else{
            if(creep.pos.x != storePos.x || creep.pos.y != storePos.y) {
                //如果没到达存储容器位置 -> 移到存储容器位置
                creep.moveTo(storePos.x, storePos.y);
            }
            else{
                //到达指定位置 -> 开始扔资源
                creep.drop(RESOURCE_ENERGY);
            }
        }
        
	}
};

module.exports = roleHarvesterCarrier;