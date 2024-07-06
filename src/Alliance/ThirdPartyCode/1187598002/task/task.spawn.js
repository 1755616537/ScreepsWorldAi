export const taskSpawn = {
    /**  
    * 队列孵化 - 任务模块
    * @param {string} num - 任务编号
    * @param {string} nameSpawn - 孵化器名
    */
    run: function(num, nameSpawn) {

        //错误检查
        if(!Game.spawns[nameSpawn]){
            console.log('spawn已消失，任务#' + num + '执行错误');
            return 0;
        }

        if(taskQueueSpawn[nameSpawn].length != 0){
            //如果孵化任务队列不为空 -> 打印队列
            for(var i=0; i<taskQueueSpawn[nameSpawn].length; i++){
                console.log('孵化器 "'+nameSpawn +'" 队列'+i+' -'+
                    '  name:'+taskQueueSpawn[nameSpawn][i].name+
                    '  role:'+taskQueueSpawn[nameSpawn][i].memory.memory.role);
            }
            //尝试孵化
            if(Game.spawns[nameSpawn].spawnCreep(
                taskQueueSpawn[nameSpawn][0].module,
                taskQueueSpawn[nameSpawn][0].name, 
                taskQueueSpawn[nameSpawn][0].memory) == 0){
                //如果孵化成功 -> 打印、出列
                console.log(nameSpawn + ': Spawning new creep: ' + taskQueueSpawn[nameSpawn][0].name);
                taskQueueSpawn[nameSpawn].shift(); //删除队首元素
            }
            else if(Game.spawns[nameSpawn].spawnCreep(
                taskQueueSpawn[nameSpawn][0].module,
                taskQueueSpawn[nameSpawn][0].name, 
                taskQueueSpawn[nameSpawn][0].memory) == -3){
                //如果重名 -> 跳过此孵化任务
                console.log('此处重名，孵化已跳过' + taskQueueSpawn[nameSpawn][0].name);
                Game.notify('孵化失败，原因重名，详情：' +
                    '\nname: ' + taskQueueSpawn[nameSpawn][0].name +
                    '\nrole: ' + taskQueueSpawn[nameSpawn][0].memory.memory.role);
                taskQueueSpawn[nameSpawn].shift(); //删除队首元素
            }
        }
        
        return 0;
	}
};

//module.exports = taskSpawn;