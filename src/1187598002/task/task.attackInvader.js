var roleAttackInvader = require('../role/role.attackInvader'); //载入爬爬模块-攻击
var taskAttackInvader = {
    /**
    * 攻击侵略者 - 任务模块
    * @param {string} num - 任务编号
    * @param {number} count - 攻击侵略者爬爬数量
    * @param {string} nameRoom - 需要防御的房间名
    * @param {{x:number, y:number}} waitPos - 待命的位置坐标
    * @param {array<string>} moduleAttacker - 运输爬爬的组件
    * @param {string} nameSpawn - 孵化器名
    * @param {array<string>} pathCustom - 前往路径(可选)
    */
    run: function(num, count, nameRoom, waitPos, moduleAttacker, nameSpawn, pathCustom) {
        
        //错误检查
        var isScout = true; //是否已被侦察
        if(!Game.rooms[nameRoom]){
            isScout = false;
        }

        //自动孵化
        var numAttacker = 0; //当前已有攻击爬爬的数量
        var existAttacker = [];
        for(var name in Game.creeps) {
            //寻找是否存在攻击爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'attacker' + num){
                numAttacker ++; //遍历已存在的数量
                existAttacker.push(creep.name);
                //攻击爬爬工作
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
                        else roleAttackInvader.run(creep, creep.room.name, waitPos);
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
                else roleAttackInvader.run(creep, nameRoom, waitPos);
            }
        }
        for(var i=0; i<taskQueueSpawn[nameSpawn].length; i++) {
            //遍历孵化队列中的数量
            var role = taskQueueSpawn[nameSpawn][i].memory.memory.role;
            if(role == 'attacker' + num){
                existAttacker.push(taskQueueSpawn[nameSpawn][i].name);
                numAttacker ++;
            }
        }
        if(numAttacker < count){
            for(var i=1; i<=count; i++){
                //寻找空余攻击爬爬编号
                var haveAttackerNum = false;
                for(var t=0; t<existAttacker.length; t++) {
                    if(existAttacker[t] == 'attacker' + num + '_' + i){
                        haveAttackerNum = true;
                        break;
                    }
                }
                if(!haveAttackerNum){
                    //如果不存在当前编号的攻击爬爬 -> 添加一个当前编号的攻击爬爬到孵化队列
                    taskQueueSpawn[nameSpawn].push({
                        module:moduleAttacker,
                        name:'attacker' + num + '_' + i,
                        memory:{memory: {role: 'attacker' + num}}
                    });
                }
            }
        }
        
        return 0;
	}
};

module.exports = taskAttackInvader;