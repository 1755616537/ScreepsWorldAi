var roleSourceHarvester = require('../role/role.sourceHarvester'); //载入爬爬模块-定点采集能量
var roleHarvesterCarrier = require('../role/role.harvesterCarrier'); //载入爬爬模块-采集能量运输
var taskHarvest = {
    /**
    * 采集能量(自带运输) - 任务模块
    * @param {string} num - 任务编号
    * @param {Source} source - 能量源对象
    * @param {{x:number, y:number}} storePos - 存储容器位置
    * @param {{x:number, y:number}} workPos - 采集工作位置
    * @param {{x:number, y:number}} pickupPos - 捡起资源位置(在此位置捡起采集工作位置上的资源)
    * @param {{x:number, y:number}} waitPos - 等待位置(提前造好的爬爬将在此处待机)
    * @param {number} waitTick - 提前waitTick孵化等待采集爬爬
    * @param {string} nameSpawn - 孵化器名
    */
    run: function(num, source, storePos, workPos, pickupPos, waitPos, waitTick, nameSpawn) {

        //错误检查
        if(!source){
            console.log('source已消失，任务#' + num + '执行错误');
            return 0;
        }

        //650能量
        var moduleHarvester = [WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE];
        //600能量
        var moduleCarrier = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        var creepHarvester, creepCarrier; //声明采集爬爬变量和运输爬爬变量

        //自动孵化
        var haveWorkHarvester = false;
        var haveWaitHarvester = false;
        var creepWaitHarvester;
        var haveCarrier = false;
        for(var name in Game.creeps) {
            //寻找是否存在采集爬爬||等待采集爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester' + num){
                haveWorkHarvester = true;
                creepHarvester = creep;
            }
            if(creep.memory.role == 'harvester' + num + '_wait'){
                haveWaitHarvester = true;
                creepWaitHarvester = creep;
            }
            if(creep.memory.role == 'carrier' + num){
                haveCarrier = true;
                creepCarrier = creep;
            }
        }
        if(!haveWorkHarvester){
            //没有采集爬爬
            if(!haveWaitHarvester){
                //没有等待采集爬爬
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
            else{
                //有等待采集爬爬
                creepWaitHarvester.memory.role = 'harvester' + num;
                haveWaitHarvester = false;
            }
        }
        else if(creepHarvester.ticksToLive === waitTick){
            //如果采集爬爬快死亡了 -> 添加一个等待采集爬爬到孵化任务队列
            taskQueueSpawn[nameSpawn].push({
                module:moduleHarvester,
                name:'harvester'+ num + Game.time % 10000,
                memory:{memory: {role: 'harvester'+ num + '_wait'}}
            });
        }
        if(!haveCarrier) {
            //如果没有运输爬爬
            var haveQueueSpawn = false;
            for(var i=0; i<taskQueueSpawn[nameSpawn].length; i++) {
                //是否已在队列中存在
                var role = taskQueueSpawn[nameSpawn][i].memory.memory.role;
                if(role == 'carrier' + num){
                    haveQueueSpawn = true;
                }
            }
            if(!haveQueueSpawn){
                taskQueueSpawn[nameSpawn].push({
                    module:moduleCarrier,
                    name:'carrier' + num,
                    memory:{memory: {role: 'carrier' + num}}
                });
            }
        }

        //爬爬工作
        if(haveWorkHarvester){
            roleSourceHarvester.run(creepHarvester, source, workPos); //采集爬爬
        }
        if(haveWaitHarvester){
            if(creepWaitHarvester.pos.x != waitPos.x || creepWaitHarvester.pos.y != waitPos.y){
                creepWaitHarvester.moveTo(waitPos.x, waitPos.y);
            }
        } //等待采集爬爬
        if(haveCarrier){
            roleHarvesterCarrier.run(creepCarrier, storePos, workPos, pickupPos); //运输爬爬
        }
        
        return 0;
	}
};

module.exports = taskHarvest;