import { exportStats } from '../modules/exportStats.js'; //人工任务队列-系统模块
//var systemInitialize = {
export const systemInitialize = {
    /**  
    * 初始化 - 系统模块
    */
    run: function() {

        //exportStats();

        //打印CPU资源桶剩余量、拥有的Pixel数量
        console.log('CPU资源桶剩余: ' + Game.cpu.bucket + '    Pixel: ' + Game.resources[PIXEL]);

        //从CPU资源桶取出10000CPU生成1pixel
        if(Game.cpu.generatePixel() == 0){
            console.log('成功生成 1 Pixel');
        }

        //打印房间能量数据
        for(var name in spawnName) {
            console.log('房间 "'+name+'" 拥有 '+Game.rooms[name].energyAvailable+'/'+Game.rooms[name].energyCapacityAvailable+' 能量');
        }

        //清除无效creep内存
        for(var name in Memory.creeps) {
           if(!Game.creeps[name]) {
               delete Memory.creeps[name];
               //console.log('Clearing non-existing creep memory:', name);
            }
        }
        
	}
};

//module.exports = systemInitialize;

//export const systemInitialize = systemInitialize;