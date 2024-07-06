var roleHomeCarrier = require('../role/role.homeCarrier.js'); //载入爬爬模块-基地运输
var taskHomeSchedul = {
    /**
    * 基地能量调度 - 任务模块
    * @param {string} num - 任务编号
    * @param {number} count - 基地运输爬爬数量
    * @param {[Structure]} inStore - 存储容器列表(入)
    * @param {[Structure]} outStore - 存储容器列表(出)
    * @param {array<string>} moduleCarrier - 运输爬爬的组件
    * @param {boolean} haveWork - 是否拥有工作组件(用于维修Road)
    * @param {string} nameSpawn - 孵化器名
    */
    run: function(num, count, inStore, outStore, moduleCarrier, haveWork, nameSpawn) {

        //错误检查
        for(var i=0; i<inStore.length; i++) {
            if(!inStore[i]){
                console.log('inStore已消失，任务#' + num + '执行错误');
                return 0;
            }
        }
        for(var i=0; i<outStore.length; i++) {
            if(!outStore[i]){
                console.log('outStore已消失，任务#' + num + '执行错误');
                return 0;
            }
        }

        //自动孵化
        var numCarrier = 0; //当前已有基地运输爬爬的数量
        var existCarrier = [];
        for(var name in Game.creeps) {
            //寻找是否存在基地运输爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'carrier' + num){
                numCarrier ++; //遍历已存在的数量
                existCarrier.push(creep.name);
                //运输爬爬工作
                roleHomeCarrier.run(creep, inStore, outStore, haveWork);
            }
        }
        for(var i=0; i<taskQueueSpawn[nameSpawn].length; i++) {
            //遍历孵化队列中的数量
            var role = taskQueueSpawn[nameSpawn][i].memory.memory.role;
            if(role == 'carrier' + num){
                existCarrier.push(taskQueueSpawn[nameSpawn][i].name);
                numCarrier ++;
            }
        }
        if(numCarrier < count){
            for(var i=1; i<=count; i++){
                //寻找空余运输爬爬编号
                var haveCarrierNum = false;
                for(var t=0; t<existCarrier.length; t++) {
                    if(existCarrier[t] == 'carrier' + num + '_' + i){
                        haveCarrierNum = true;
                        break;
                    }
                }
                if(!haveCarrierNum){
                    //如果不存在当前编号的运输爬爬 -> 添加一个当前编号的运输爬爬到孵化队列
                    taskQueueSpawn[nameSpawn].unshift({
                        module:moduleCarrier,
                        name:'carrier' + num + '_' + i,
                        memory:{memory: {role: 'carrier' + num}}
                    });
                }
            }
        }
        
        return 0;
	}
};

module.exports = taskHomeSchedul;