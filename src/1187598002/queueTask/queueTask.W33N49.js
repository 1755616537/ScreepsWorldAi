var reportWrongExit = require('report.wrongExit'); //异常退出 - 报告模块
var structureTower = require('structure.tower'); //自动维修与攻击 - 结构模块
var taskSpawn = require('task.spawn'); //队列孵化 - 任务模块
var taskHarvest = require('task.harvest'); //采集能量(自带运输) - 任务模块
var taskUpgrade = require('task.upgrade'); //升级控制器 - 任务模块
var taskHomeSchedul = require('task.homeSchedul'); //基地能量调度 - 任务模块
var taskHomeBuilder = require('task.homeBuild'); //基地建设 - 任务模块
var taskReserver = require('task.reserver'); //预定房间 - 任务模块
var taskFixedHarvest = require('task.fixedHarvest'); //定点采集能量(需要工作位置有建筑Container) - 任务模块
var taskClaimer = require('task.claimer'); //占领中立房间 - 任务模块
var taskAttackInvader = require('task.attackInvader'); //攻击侵略者 - 任务模块
var taskPicker = require('task.picker'); //捡起地上能量(拾荒者) - 任务模块
var taskMineralHarvester = require('task.mineralHarvester') //矿物采集 - 任务模块
var taskNewRoomBuild = require('task.newRoomBuild') //新基地建设 - 任务模块
var queueTask_W33N49 = {
    /**
    * 'W33N49'任务-任务队列模块
    */
    run: function() {

        var nameRoom = 'W33N49'; //房间名
        var tower1 = Game.getObjectById('655af43db6e07706ffc41d0d'); //Tower1
        var tower2 = Game.getObjectById('6562eb38de70e00126e91822'); //Tower2
        var centralStore = Game.getObjectById('655c36cf5949dcad72f7fc02'); //中央存储
        var extensions = Game.rooms[nameRoom].find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_EXTENSION
        }); //结构: extension
        var spawns = Game.rooms[nameRoom].find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_SPAWN
        }); //结构: spawn
        var upgradStore = Game.getObjectById('6559f530a5680ded11625fe3'); //升级控制器供货点
        var source1 = Game.rooms[nameRoom].find(FIND_SOURCES)[0]; //能量源1
        var source2 = Game.rooms[nameRoom].find(FIND_SOURCES)[1]; //能量源2
        var controller = Game.rooms[nameRoom].controller; //房间控制器
        var harvestStore1 = Game.getObjectById('65598dd1556b3f437695e50d'); //采集能量任务1 出货点
        var harvestStore2 = Game.getObjectById('655999ccd4f876144515a2b3'); //采集能量任务2 出货点
        var mineral1 = Game.rooms[nameRoom].find(FIND_MINERALS)[0]; //矿床1
        var MineralStore1 = Game.getObjectById('6562f152bdef669eebbf0377'); //矿物采集任务1 出货点

        //组件 - 基地调度运输爬爬(600能量)-容量400
        var moduleHomeCarrier = [
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE];

        //炮台自动维修与攻击1
        if(structureTower.run(tower1) != 0)
            reportWrongExit.run('任务炮台自动维修与攻击1');

        //炮台自动维修与攻击2
        if(structureTower.run(tower2) != 0)
            reportWrongExit.run('任务炮台自动维修与攻击2');

        //#2-1 资源调度任务1(中央存储 -> 各个结构)
        var inStore1 = [centralStore];
        var outStore1 = [...spawns, ...extensions, tower1, tower2];
        if(inStore1[0].store.getUsedCapacity(RESOURCE_ENERGY) > 10000){
            //如果中央存储储量大于100000 -> 启用升级
            outStore1.push(upgradStore); //升级任务供货点
        }
        if(taskHomeSchedul.run('2-1', 2, inStore1, outStore1, moduleHomeCarrier, false, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#2-1 资源调度任务4');

        //#2-2 资源调度任务2(矿点 -> 孵化储备、中央存储)
        var inStore2 = [harvestStore1, harvestStore2, MineralStore1]; 
        var outStore2 = [...extensions, centralStore];
        if(taskHomeSchedul.run('2-2', 2, inStore2, outStore2, moduleHomeCarrier, false, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#2-2 资源调度任务2');

        //#2-3 采集能量任务1
        if(taskFixedHarvest.run('2-3', source1, {x:11,y:9}, {x:11,y:8}, 200, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#2-3 采集能量任务1');
        //#2-4 采集能量任务2
        if(taskFixedHarvest.run('2-4', source2, {x:26,y:13}, {x:25,y:13}, 200, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#2-4 采集能量任务2');

        //#2-5 升级控制器任务1
        if(taskUpgrade.run('2-5', controller, upgradStore, {x:10,y:19}, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#2-5 升级控制器任务1');
        //#2-6 升级控制器任务2
        if(taskUpgrade.run('2-6', controller, upgradStore, {x:10,y:20}, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#2-6 升级控制器任务2');

        //#2-7 基地建设任务
        if(taskHomeBuilder.run('2-7', 0, centralStore, nameRoom, {x:18,y:16}, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#2-7 基地建设任务');

        //#2-8 拾荒者
        if(taskPicker.run('2-8', 0, nameRoom, centralStore, {x:18,y:16}, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#2-8 拾荒者');

        //#2-9 采集矿物1
        if(taskMineralHarvester.run('2-9', mineral1, {x:25,y:21}, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#2-9 采集矿物1');

        //#2-100 自动孵化任务1
        if(taskSpawn.run('2-100', spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#2-100 自动孵化任务1');
    
	}
};

module.exports = queueTask_W33N49;