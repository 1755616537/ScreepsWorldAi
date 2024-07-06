var taskClaimer = {
    /**
    * 占领中立房间 - 任务模块
    * @param {string} num - 任务编号
    * @param {string} nameRoom - 需要占领的中立房间名
    * @param {string} nameSpawn - 孵化器名
    */
    run: function(num, nameRoom, nameSpawn) {

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

        //700能量
        var moduleClaimer = [CLAIM,MOVE,MOVE];

        //自动孵化
        var haveClaimer = false;
        for(var name in Game.creeps) {
            //寻找是否存在占领爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'claimer' + num){
                haveClaimer = true;
                //占领爬爬工作
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
                else if(creep.claimController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller);
                }
            }
        }
        for(var i=0; i<taskQueueSpawn[nameSpawn].length; i++) {
            //遍历孵化队列
            var role = taskQueueSpawn[nameSpawn][i].memory.memory.role;
            if(role == 'claimer' + num){
                haveClaimer = true;
            }
        }
        if(!haveClaimer){
            //如果不存在占领爬爬 -> 添加一个占领爬爬到孵化队列
            taskQueueSpawn[nameSpawn].push({
                module:moduleClaimer,
                name:'claimer' + num,
                memory:{memory: {role: 'claimer' + num}}
            });
        }
        
        return 0;
	}
};

module.exports = taskClaimer;