var roleSourceHarvester = require('../role/role.sourceHarvester.js'); //载入爬爬模块-定点采集能量
var taskFixedHarvest = {
    /**
    * 定点采集能量(需要工作位置有建筑Container) - 任务模块
    * @param {string} num - 任务编号
    * @param {Source} source - 能量源对象
    * @param {{x:number, y:number}} workPos - 采集工作位置
    * @param {{x:number, y:number}} waitPos - 等待位置(提前造好的爬爬将在此处待机)
    * @param {number} waitTick - 提前waitTick孵化等待采集爬爬
    * @param {string} nameSpawn - 孵化器名
    */
    run: function(num, source, workPos, waitPos, waitTick, nameSpawn) {

        //错误检查
        if(!source){
            console.log('source已消失，任务#' + num + '执行错误');
            return 0;
        }

        //850能量
        var moduleHarvester = [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE];
        //var moduleHarvester = [WORK,WORK,MOVE];
        var creepHarvester; //声明采集爬爬变量

        //自动孵化
        var haveWorkHarvester = false;
        var haveWaitHarvester = false;
        var creepWaitHarvester;
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

        //爬爬工作
        if(haveWorkHarvester){
            roleSourceHarvester.run(creepHarvester, source, workPos); //采集爬爬
        }
        if(haveWaitHarvester){
            if(creepWaitHarvester.room != source.room){
                //如果不在source所在房间 -> 前往source所在房间
                creepWaitHarvester.moveTo(source);
            }
            else if(creepWaitHarvester.pos.x != waitPos.x || creepWaitHarvester.pos.y != waitPos.y){
                creepWaitHarvester.moveTo(waitPos.x, waitPos.y); 
            }
        } //等待采集爬爬

        return 0;
	}
};

module.exports = taskFixedHarvest;