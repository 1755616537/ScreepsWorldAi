//var roleNewRoomBuilder = require('../role/role.newRoomBuilder'); //载入爬爬模块-攻击
import { roleNewRoomBuilder } from '../role/role.newRoomBuilder'; //载入爬爬模块-攻击
export const taskNewRoomBuild = {
    /**
    * 新基地建设 - 任务模块
    * @param {string} num - 任务编号
    * @param {number} count - 建设单兵爬爬数量
    * @param {string} nameRoom - 需要建设的房间名
    * @param {array<string>} moduleNewRoomBuilder - 建设单兵爬爬的组件
    * @param {number} ordinalSource - 开采此房间第几号能量
    * @param {string} nameSpawn - 孵化器名
    * @param {array<string>} pathCustom - 前往路径(可选)
    */
    run: function(num, count, nameRoom, moduleNewRoomBuilder, ordinalSource, nameSpawn, pathCustom) {
    
        //自动孵化
        var numAttacker = 0; //当前已有单兵建设爬爬的数量
        var existAttacker = [];
        for(var name in Game.creeps) {
            //寻找是否存在单兵建设爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'builder' + num){
                numAttacker ++; //遍历已存在的数量
                existAttacker.push(creep.name);
                //前往目的房间
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
                        else roleNewRoomBuilder.run(creep, nameRoom, ordinalSource);
                        break;
                    }
                    continue;
                }
                else if(!Game.rooms[nameRoom]){
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
                else roleNewRoomBuilder.run(creep, nameRoom, ordinalSource);
            }
        }
        for(var i=0; i<taskQueueSpawn[nameSpawn].length; i++) {
            //遍历孵化队列中的数量
            var role = taskQueueSpawn[nameSpawn][i].memory.memory.role;
            if(role == 'builder' + num){
                existAttacker.push(taskQueueSpawn[nameSpawn][i].name);
                numAttacker ++;
            }
        }
        if(numAttacker < count){
            for(var i=1; i<=count; i++){
                //寻找空余单兵建设爬爬编号
                var haveAttackerNum = false;
                for(var t=0; t<existAttacker.length; t++) {
                    if(existAttacker[t] == 'builder' + num + '_' + i){
                        haveAttackerNum = true;
                        break;
                    }
                }
                if(!haveAttackerNum){
                    //如果不存在当前编号的单兵建设爬爬 -> 添加一个当前编号的单兵建设爬爬到孵化队列
                    taskQueueSpawn[nameSpawn].push({
                        module:moduleNewRoomBuilder,
                        name:'builder' + num + '_' + i,
                        memory:{memory: {role: 'builder' + num}}
                    });
                }
            }
        }
        
        return 0;
	}
};

//module.exports = taskNewRoomBuild;