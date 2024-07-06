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
var queueTask_W32N45 = {
    /**
    * 'W33N49'任务-任务队列模块
    */
    run: function() {

        var nameRoom = 'W32N45'; //房间名
        var tower1 = Game.getObjectById('65669ea95cc03cc91637801a'); //Tower1
        var tower2 = Game.getObjectById('656981a081bf2c9c866fefd7'); //Tower2
        var centralStore = Game.getObjectById('656805460ab2ca01273a7352'); //中央存储
        var extensions = Game.rooms[nameRoom].find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_EXTENSION
        }); //结构: extension
        var spawns = Game.rooms[nameRoom].find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_SPAWN
        }); //结构: spawn
        var upgradStore = Game.getObjectById('6566b803ee487445c3076843'); //升级控制器供货点
        var source1 = Game.rooms[nameRoom].find(FIND_SOURCES)[0]; //能量源1
        var source2 = Game.rooms[nameRoom].find(FIND_SOURCES)[1]; //能量源2
        var controller = Game.rooms[nameRoom].controller; //房间控制器
        var harvestStore1 = Game.getObjectById('6565ec127e880770e3a872e4'); //采集能量任务1 出货点
        var harvestStore2 = Game.getObjectById('6565f219c8de531a8d5414c8'); //采集能量任务2 出货点

        //200能量 - 单兵建设爬爬组件
        var moduleNewRoomBuilder = [WORK,CARRY,MOVE];

        //组件 - 基地调度运输爬爬(900能量)-容量600
        var moduleHomeCarrier = [
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];

        // var moduleHomeCarrier = [
        //     CARRY,CARRY,
        //     MOVE];

        //炮台自动维修与攻击1
        if(structureTower.run(tower1) != 0)
            reportWrongExit.run('任务炮台自动维修与攻击1');

        //炮台自动维修与攻击2
        if(structureTower.run(tower2) != 0)
            reportWrongExit.run('任务炮台自动维修与攻击2');

        //#3-2 资源调度任务2(矿点 -> 孵化储备、中央存储)
        var inStore2 = [harvestStore1, harvestStore2]; 
        var outStore2 = [...extensions, ...spawns, tower1, tower2, upgradStore, centralStore];
        if(taskHomeSchedul.run('3-2', 2, inStore2, outStore2, moduleHomeCarrier, false, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#3-2 资源调度任务2');

        //#3-3 采集能量任务1
        if(taskFixedHarvest.run('3-3', source1, {x:16,y:29}, {x:17,y:28}, 200, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#3-3 采集能量任务1');
        //#3-4 采集能量任务2
        if(taskFixedHarvest.run('3-4', source2, {x:12,y:44}, {x:13,y:44}, 200, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#3-4 采集能量任务2');

        //#3-5 升级控制器任务1
        if(taskUpgrade.run('3-5', controller, upgradStore, {x:9,y:13}, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#3-5 升级控制器任务1');
        //#3-6 升级控制器任务2
        if(taskUpgrade.run('3-6', controller, upgradStore, {x:11,y:13}, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#3-6 升级控制器任务2');
        // //#3-7 升级控制器任务3
        // if(taskUpgrade.run('3-7', controller, upgradStore, {x:10,y:12}, spawnName[nameRoom][0]) != 0)
        //     reportWrongExit.run('任务#3-7 升级控制器任务3');

        //#3-8 基地建设任务
        if(taskHomeBuilder.run('3-8', 0, centralStore, nameRoom, {x:16,y:29}, spawnName[nameRoom][0]) != 0)
        reportWrongExit.run('#3-8 基地建设任务');


        
        //#2-100 自动孵化任务1
        if(taskSpawn.run('3-100', spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#3-100 自动孵化任务1');
    
	}
};

module.exports = queueTask_W32N45;