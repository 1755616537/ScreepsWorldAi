var taskUpgrade = {
    /**  
    * 升级控制器 - 任务模块
    * @param {string} num - 任务编号
    * @param {StructureController} controller - 控制器对象
    * @param {StructureContainer} container - 存储单元对象
    * @param {{x:number, y:number}} workPos - 工作位置
    * @param {string} nameSpawn - 孵化器名
    */
    run: function(num, controller, container, workPos, nameSpawn) {

        //错误检查
        if(!controller){
            console.log('controller已消失，任务#' + num + '执行错误');
            return 0;
        }
        if(!container){
            console.log('container已消失，任务#' + num + '执行错误');
            return 0;
        }

        //1300能量
        var moduleUpgrader = [
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        //650能量
        // var moduleUpgrader = [
        //     WORK,WORK,WORK,WORK,
        //     CARRY,CARRY,
        //     MOVE,MOVE,MOVE];
        var haveUpgrader = false;
        
        for(var name in Game.creeps) {
            //寻找升级爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'upgrader' + num){
                haveUpgrader = true;
                if(creep.room != controller.room){
                    //如果不在控制器所在房间 -> 前往控制器所在房间
                    creep.moveTo(controller);
                }
                else if(creep.pos.x != workPos.x || creep.pos.y != workPos.y){
                    creep.moveTo(workPos.x, workPos.y);
                }
                else{
                    if(creep.store.getUsedCapacity() == 0){
                        //能量不足 -> 提取能量
                        creep.withdraw(container, RESOURCE_ENERGY);
                    }
                    else{
                        //能量充足 -> 开始升级
                        creep.upgradeController(controller);
                    }
                }
            }
        }
        if(!haveUpgrader){
            //如果没有升级爬爬
            var haveQueueSpawn = false;
            for(var i=0; i<taskQueueSpawn[nameSpawn].length; i++) {
                //是否已在队列中存在
                var role = taskQueueSpawn[nameSpawn][i].memory.memory.role;
                if(role == 'upgrader' + num){
                    haveQueueSpawn = true;
                }
            }
            if(!haveQueueSpawn){
                taskQueueSpawn[nameSpawn].push({
                    module:moduleUpgrader,
                    name:'upgrader'+ num,
                    memory:{memory: {role: 'upgrader'+ num}}
                });
            }
            
        }
        
        return 0;
	}
};

module.exports = taskUpgrade;