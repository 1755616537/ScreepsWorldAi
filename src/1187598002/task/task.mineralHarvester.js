var taskMineralHarvester = {
    /**
    * 矿物采集(需要工作位置有建筑Container) - 任务模块
    * @param {string} num - 任务编号
    * @param {Mineral} mineral - 矿物源对象(Mineral)
    * @param {{x:number, y:number}} workPos - 采集工作位置
    * @param {string} nameSpawn - 孵化器名
    */
    run: function(num, mineral, workPos, nameSpawn) {

        //错误检查
        if(!mineral){
            console.log('mineral已消失，任务#' + num + '执行错误');
            return 0;
        }

        //2000能量
        var moduleHarvester = [
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        var creepHarvester; //声明采集爬爬变量

        if(mineral.mineralAmount == 0){
            //资源已采集完
            return 0;
        }

        //自动孵化
        var haveWorkHarvester = false;
        for(var name in Game.creeps) {
            //寻找是否存在采集爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester' + num){
                haveWorkHarvester = true;
                creepHarvester = creep;
            }
        }
        if(!haveWorkHarvester){
            //没有采集爬爬
            var haveQueueSpawn = false;
            for(var i=0; i<taskQueueSpawn[nameSpawn].length; i++) {
                //是否已在队列中存在
                var role = taskQueueSpawn[nameSpawn][i].memory.memory.role;
                if(role == 'harvester' + num){
                    haveQueueSpawn = true;
                }
            }
            if(!haveQueueSpawn){
                taskQueueSpawn[nameSpawn].push({
                    module:moduleHarvester,
                    name:'harvester'+ num + Game.time % 10000,
                    memory:{memory: {role: 'harvester'+ num}}
                });
            }
        }

        //爬爬工作
        if(haveWorkHarvester){
            if(creepHarvester.room != mineral.room){
                //如果不在mineral所在房间 -> 前往mineral所在房间
                creepHarvester.moveTo(mineral);
            }
            else if(creepHarvester.pos.x != workPos.x || creepHarvester.pos.y != workPos.y){
                creepHarvester.moveTo(workPos.x, workPos.y); 
            }
            else{
                creepHarvester.harvest(mineral);
            }
        }

        return 0;
	}
};

module.exports = taskMineralHarvester;