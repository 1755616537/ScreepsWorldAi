var rolePicker = require('../role/role.picker.js'); //载入爬爬模块-拾荒
var taskPicker = {
    /**
    * 捡起地上能量(拾荒者) - 任务模块
    * @param {string} num - 任务编号
    * @param {number} count - 拾荒爬爬数量
    * @param {string} nameRoom - 需要拾荒的房间名
    * @param {Structure} outStore - 存储容器对象
    * @param {{x:number, y:number}} waitPos - 待命的位置坐标
    * @param {string} nameSpawn - 孵化器名
    */
    run: function(num, count, nameRoom, outStore, waitPos, nameSpawn) {
        
        //错误检查
        if(!Game.rooms[nameRoom]){
            console.log('此房间没有被侦察，任务#' + num + '执行错误');
            return 0;
        }
        else if(!Game.rooms[nameRoom].controller){
            console.log('此房间或房间控制器已消失，任务#' + num + '执行错误');
            return 0;
        }

        //600能量
        var modulePicker = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];

        //自动孵化
        var numPicker = 0; //当前已有拾荒爬爬的数量
        var existPicker = [];
        for(var name in Game.creeps) {
            //寻找是否存在拾荒爬爬
            var creep = Game.creeps[name];
            if(creep.memory.role == 'picker' + num){
                numPicker ++; //遍历已存在的数量
                existPicker.push(creep.name);
                //拾荒爬爬工作
                rolePicker.run(creep, nameRoom, outStore, waitPos);
            }
        }
        for(var i=0; i<taskQueueSpawn[nameSpawn].length; i++) {
            //遍历孵化队列中的数量
            var role = taskQueueSpawn[nameSpawn][i].memory.memory.role;
            if(role == 'picker' + num){
                existPicker.push(taskQueueSpawn[nameSpawn][i].name);
                numPicker ++;
            }
        }
        if(numPicker < count){
            for(var i=1; i<=count; i++){
                //寻找空余拾荒爬爬编号
                var havePickerNum = false;
                for(var t=0; t<existPicker.length; t++) {
                    if(existPicker[t] == 'picker' + num + '_' + i){
                        havePickerNum = true;
                        break;
                    }
                }
                if(!havePickerNum){
                    //如果不存在当前编号的拾荒爬爬 -> 添加一个当前编号的拾荒爬爬到孵化队列
                    taskQueueSpawn[nameSpawn].push({
                        module:modulePicker,
                        name:'picker' + num + '_' + i,
                        memory:{memory: {role: 'picker' + num}}
                    });
                }
            }
        }
        
        return 0;
	}
};

module.exports = taskPicker;