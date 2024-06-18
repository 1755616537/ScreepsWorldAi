var roleSourceHarvester = {
    /** 
    * 定点采集能量-爬爬模块
    * @param {Creep} creep - 采集爬爬
    * @param {Source} source - 能量源对象
    * @param {{x:number, y:number}} workPos - 工作位置
    */
    run: function(creep, source, workPos) {
        
        if(creep.room != source.room){
            //如果不在source所在房间 -> 前往source所在房间
            creep.moveTo(source);
        }
        else if(creep.pos.x != workPos.x || creep.pos.y != workPos.y) {
            //如果没到达采集点 -> 移到采集点
            creep.moveTo(workPos.x, workPos.y);
        }
        else{
            ////到达指定位置 -> 开始工作
            var container = creep.room.find(FIND_STRUCTURES, {
                filter: (container) => container.pos.x == workPos.x 
                && container.pos.y == workPos.y 
                && container.structureType == STRUCTURE_CONTAINER
            });
            if(container[0] == null){
                //如果工作位置没有Container -> 直接采集
                creep.harvest(source);
            }
            else{
                if(container[0].hits < container[0].hitsMax){
                    //如果Container需要维修 -> 维修
                    if(creep.repair(container[0]) == ERR_NOT_ENOUGH_RESOURCES){
                        //如果能量不够 -> 继续采集
                        creep.harvest(source);
                    }
                }
                else{
                    //如果Container不需要维修 -> 采集
                    creep.harvest(source);
                }
            }
        }

	}
};

module.exports = roleSourceHarvester;