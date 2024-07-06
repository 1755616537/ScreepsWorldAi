var taskReserver = {
    /**
    * 预定房间 - 任务模块
    * @param {string} num - 任务编号
    * @param {number} count - 预定爬爬数量
    * @param {string} nameRoom - 需要预定的房间名
    * @param {string} nameSpawn - 孵化器名
    * @param {array<string>} pathCustom - 前往路径(可选)
    * @param {bool} claim - 是否直接占领(可选)
    */
    run: function(num, count, nameRoom, nameSpawn, pathCustom, claim) {

        //错误检查
        var isScout = true; //是否已被侦察
        if(!Game.rooms[nameRoom]){
            isScout = false;
        }
        else if(!Game.rooms[nameRoom].controller){
            console.log('此房间或房间控制器已消失，任务#' + num + '执行错误');
            return 0;
        }

        //通过房间名获取控制器对象
        if(isScout){
            var controller = Game.rooms[nameRoom].controller;
        }

        //1300能量
        var moduleReserver = [CLAIM,CLAIM,MOVE,MOVE];

        //自动孵化
        var numReserver = 0; //当前已有预定爬爬的数量
        var existReserver = [];
        for(var name in Game.creeps) {
            //寻找是否存在预定爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'reserver' + num){
                numReserver ++; //遍历已存在的数量
                existReserver.push(creep.name);
                //预定爬爬工作
                if(pathCustom){
                    for(var i=0; i < pathCustom.length; i++){
                        if(i == pathCustom.length - 1 && creep.room.name != pathCustom[i]){
                            var path = Game.map.findRoute(creep.room, pathCustom[0]);
                            creep.moveTo(creep.room.find(path[0].exit)[0]); // 从第几个出口出
                        }
                        if(creep.room.name != pathCustom[i]) continue;
                        if(i != pathCustom.length - 1 && creep.room.name != nameRoom){
                            var path = Game.map.findRoute(creep.room, pathCustom[i+1]);
                            creep.moveTo(creep.room.find(path[0].exit)[0]); // 从第几个出口出
                        }
                        else if(creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(controller);
                        }
                        else if(creep.reserveController(controller) != 0){
                            creep.attackController(controller)
                        }
                        if(claim){
                            if(creep.claimController(controller) == ERR_INVALID_TARGET){
                                creep.attackController(controller)
                            } //直接占领该控制器
                        }
                        break;
                    }
                    continue;
                }
                if(!isScout){
                    //如果此房间未被侦察
                    var path = Game.map.findRoute(creep.room, nameRoom);
                    if(path == ERR_NO_PATH){
                        console.log('找不到前往' + nameRoom + '房间的路径，任务#' + num + '执行错误');
                        return;
                    }
                    else{
                        creep.moveTo(creep.room.find(path[0].exit)[0]); // 从第几个出口出
                    }
                }
                else if(creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller);
                }
            }
        }
        for(var i=0; i<taskQueueSpawn[nameSpawn].length; i++) {
            //遍历孵化队列中的数量
            var role = taskQueueSpawn[nameSpawn][i].memory.memory.role;
            if(role == 'reserver' + num){
                existReserver.push(taskQueueSpawn[nameSpawn][i].name);
                numReserver ++;
            }
        }
        if(numReserver < count){
            for(var i=1; i<=count; i++){
                //寻找空余预定爬爬编号
                var haveReserverNum = false;
                for(var t=0; t<existReserver.length; t++) {
                    if(existReserver[t] == 'reserver' + num + '_' + i){
                        haveReserverNum = true;
                        break;
                    }
                }
                if(!haveReserverNum){
                    //如果不存在当前编号的预定爬爬 -> 添加一个当前编号的预定爬爬到孵化队列
                    taskQueueSpawn[nameSpawn].push({
                        module:moduleReserver,
                        name:'reserver' + num + '_' + i,
                        memory:{memory: {role: 'reserver' + num}}
                    });
                }
            }
        }
        
        return 0;
	}
};

module.exports = taskReserver;