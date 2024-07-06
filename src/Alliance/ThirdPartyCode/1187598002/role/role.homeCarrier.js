var roleHomeCarrier = {
    /**  
    * 基地运输-爬爬模块
    * @param {Creep} creep - 运输爬爬
    * @param {[Structure]} inStore - 存储容器列表(入)
    * @param {[Structure]} outStore - 存储容器列表(出)
    * @param {boolean} haveWork - 是否拥有工作组件(用于维修Road)
    */
    run: function(creep, inStore, outStore, haveWork) {

        if(creep.store.getUsedCapacity() == 0){
            //如果背包为空 -> 前往存储容器(入)(储量最大)
            var maxInStoreNum = 0;
            var maxInStore;
            for(var i=0; i<inStore.length; i++) {
                if(inStore[i].store[RESOURCE_ENERGY] > maxInStoreNum){
                    maxInStoreNum = inStore[i].store[RESOURCE_ENERGY];
                    maxInStore = inStore[i];
                }
                //查询矿物出货点是否需要收取
                if(inStore[i].store[RESOURCE_ENERGY] == 0 && inStore[i].store.getUsedCapacity() > 500 && inStore[i].structureType == STRUCTURE_CONTAINER){
                    maxInStoreNum = inStore[i].store.getUsedCapacity();
                    maxInStore = inStore[i];
                }
            }
            //前往储量最大的存储容器(入)并提取
            if(maxInStoreNum > 0){
                if(maxInStore.store[RESOURCE_ENERGY] == 0){
                    //如果是矿物出货点
                    for(var name in maxInStore.store){
                        if(creep.withdraw(maxInStore, name) == ERR_NOT_IN_RANGE){
                            creep.moveTo(maxInStore);
                            break;
                        }
                    }
                }
                else if(creep.withdraw(maxInStore, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(maxInStore);
                }
            }
        }
        else{
            //如果背包不为空 -> 前往装填
            if(haveWork && creep.store[RESOURCE_ENERGY] != 0){
                //如果有工作组件 -> 尝试维修
                var road = creep.room.find(FIND_STRUCTURES, {
                    filter: (road) => road.pos.x == creep.pos.x 
                    && road.pos.y == creep.pos.y 
                    && road.structureType == STRUCTURE_ROAD
                    && road.hits < road.hitsMax
                });
                if(road[0]){
                    creep.repair(road[0]);
                    return;
                }
            }
            for(var i=0; i<outStore.length; i++){
                //按顺序寻找不满的存储容器(出)
                if(creep.store[RESOURCE_ENERGY] == 0){
                    if(outStore[i].structureType != STRUCTURE_STORAGE){
                        //如果背包里装的是矿物 -> 直接存储到中央存储
                        continue;
                    }
                    else{
                        for(var name in creep.store){
                            if(creep.transfer(outStore[i], name) == ERR_NOT_IN_RANGE){
                                creep.moveTo(outStore[i]);
                                break;
                            }
                        }
                    }
                }
                if(outStore[i].structureType == STRUCTURE_TOWER){
                    //如果当前存储容器(出)是Tower -> 则空余大于500时前往装填
                    if(outStore[i].store.getFreeCapacity(RESOURCE_ENERGY) >= 500){
                        if(creep.transfer(outStore[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(outStore[i]);
                        }
                        break;
                    }
                    continue;
                }
                if(outStore[i].store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                    if(creep.transfer(outStore[i], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(outStore[i]);
                    }
                    break;
                }
            }
        }
        
	}
};

module.exports = roleHomeCarrier;