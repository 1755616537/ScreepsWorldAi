var roleHomeBuilder = require('../role/role.homeBuilder.js'); //载入爬爬模块-基地基地建设
var taskHomeBuild = {
    /**
    * 基地建设 - 任务模块
    * @param {string} num - 任务编号
    * @param {number} count - 基地建设爬爬数量
    * @param {[Structure]} store - 供货容器对象
    * @param {string} nameRoom - 需要建设的房间名
    * @param {{x:number, y:number}} waitPos - 等待位置(没有建设任务时将在此处待机)
    * @param {string} nameSpawn - 孵化器名
    */
    run: function(num, count, store, nameRoom, waitPos, nameSpawn) {

        //错误检查
        if(!store){
            console.log('store已消失，任务#' + num + '执行错误');
            return 0;
        }
        if(!Game.rooms[nameRoom]){
            //如果此房间未被侦察
            var path = Game.map.findRoute(store.room, nameRoom);
            if(path == ERR_NO_PATH){
                console.log('找不到前往' + nameRoom + '房间的路径，任务#' + num + '执行错误');
            }
            else{
                console.log(nameRoom + '房间没有被侦察，任务#' + num + '执行错误');
            }
            return 0;
        }

        //1500能量
        // var moduleBuilder = [
        //     WORK,WORK,
        //     CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
        //     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
        // ];
        var moduleBuilder = [
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
        ];

        //自动孵化
        var numBuilder = 0; //当前已有基地建设爬爬的数量
        var existBuilder = [];
        for(var name in Game.creeps) {
            //寻找是否存在基地建设爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'builder' + num){
                numBuilder ++; //遍历已存在的数量
                existBuilder.push(creep.name);
                //建设爬爬工作
                roleHomeBuilder.run(creep, store, nameRoom, waitPos);
            }
        }
        for(var i=0; i<taskQueueSpawn[nameSpawn].length; i++) {
            //遍历孵化队列中的数量
            var role = taskQueueSpawn[nameSpawn][i].memory.memory.role;
            if(role == 'builder' + num){
                existBuilder.push(taskQueueSpawn[nameSpawn][i].name);
                numBuilder ++;
            }
        }
        if(numBuilder < count){
            for(var i=1; i<=count; i++){
                //寻找空余建设爬爬编号
                var haveBuilderNum = false;
                for(var t=0; t<existBuilder.length; t++) {
                    if(existBuilder[t] == 'builder' + num + '_' + i){
                        haveBuilderNum = true;
                        break;
                    }
                }
                if(!haveBuilderNum){
                    //如果不存在当前编号的建设爬爬->添加一个当前编号的建设爬爬到孵化队列
                    taskQueueSpawn[nameSpawn].push({
                        module:moduleBuilder,
                        name:'builder' + num + '_' + i,
                        memory:{memory: {role: 'builder' + num}}
                    });
                }
            }
        }
        
        return 0;
	}
};

module.exports = taskHomeBuild;