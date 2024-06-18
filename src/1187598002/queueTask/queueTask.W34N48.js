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
var queueTask_W34N48 = {
    /**
    * 'W34N48'任务-任务队列模块
    */
    run: function() {

        //当前房间变量
        var nameRoom = 'W34N48'; //房间名
        var tower1 = Game.getObjectById('6551d38442580f159cfdfb5f'); //Tower1
        var tower2 = Game.getObjectById('6558688845e09f6014b511c5'); //Tower2
        var centralStore = Game.getObjectById('6553e7654f26da05aea93b8d'); //中央存储
        var extensions = Game.rooms[nameRoom].find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_EXTENSION
        }); //结构: extension
        var spawns = Game.rooms[nameRoom].find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_SPAWN
        }); //结构: spawn
        var upgradStore = Game.getObjectById('6554b7380a66da3612f0ce55'); //升级控制器供货点
        var source1 = Game.rooms[nameRoom].find(FIND_SOURCES)[0]; //能量源1
        var source2 = Game.rooms[nameRoom].find(FIND_SOURCES)[1]; //能量源2
        var controller = Game.rooms[nameRoom].controller; //房间控制器
        var harvestStore1 = Game.getObjectById('65523df20f5f4145482c4661'); //采集能量任务1 出货点
        var harvestStore2 = Game.getObjectById('65522e7b3f35ad2a498ee406'); //采集能量任务2 出货点
        var mineral1 = Game.rooms[nameRoom].find(FIND_MINERALS)[0]; //矿床1
        var MineralStore1 = Game.getObjectById('655ec536502e256eaf250b8b'); //矿物采集任务1 出货点

        //其他房间变量(注：其他房间这只能用getObjectById，不能用find，否则当其没被侦察时，会报错)
        var nameRoomSource = 'W33N48'; //外矿房间名
        var source3 = Game.getObjectById('5bbcab259099fc012e632f6d'); //能量源3
        var source4 = Game.getObjectById('5bbcab259099fc012e632f6c'); //能量源4
        var harvestStore3 = Game.getObjectById('6565b753f34d3043f229cef2'); //采集能量任务3 出货点
        var harvestStore4 = Game.getObjectById('6565ccda34b7c40782ee63d7'); //采集能量任务4 出货点


        //组件 - 基地调度运输爬爬(900能量)-容量600
        var moduleHomeCarrier = [
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];

        //var moduleHomeCarrier = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE]; //出现问题时使用(没有调度爬爬补充孵化器能量)
        
        //组件 - 外矿'W33N48'运输爬爬组件(1700能量)-容量1050
        var moduleFarCarrier1 = [
            WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE];

        //组件 - 外矿'W33N48'防御爬爬组件(800能量)
        var moduleAttacker1 = [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,HEAL];
        
        //炮台自动维修与攻击1
        if(structureTower.run(tower1) != 0)
            reportWrongExit.run('任务炮台自动维修与攻击1');

        //炮台自动维修与攻击2
        if(structureTower.run(tower2) != 0)
            reportWrongExit.run('任务炮台自动维修与攻击2');

        //#1-1 资源调度任务1(中央存储 -> 各个结构)
        var inStore1 = [centralStore]; //中央存储结构Storage
        var outStore1 = [...spawns, ...extensions, tower1, tower2];
        if(inStore1[0].store.getUsedCapacity(RESOURCE_ENERGY) > 100000){
            //如果中央存储储量大于100000 -> 启用升级
            outStore1.push(upgradStore); //升级任务供货点
        }
        if(taskHomeSchedul.run('1-1', 2, inStore1, outStore1, moduleHomeCarrier, false, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#1-1 资源调度任务1(中央存储 -> 各个结构)');

        //#1-2 资源调度任务2(矿点 -> 孵化储备、中央存储)
        var inStore2 = [harvestStore1, harvestStore2, MineralStore1];
        var outStore2 = [...extensions, centralStore];
        if(taskHomeSchedul.run('1-2', 1, inStore2, outStore2, moduleHomeCarrier, false, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#1-2 资源调度任务2(矿点 -> 孵化储备、中央存储)');

        //#1-3 采集能量任务1
        if(taskHarvest.run('1-3', source1, {x:19,y:16}, {x:21,y:7}, {x:21,y:8}, {x:22,y:7}, 200, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#1-3 采集能量任务1');
        //#1-4 采集能量任务2
        if(taskHarvest.run('1-4', source2, {x:26,y:24}, {x:43,y:23}, {x:42,y:23}, {x:43,y:22}, 200, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#1-4 采集能量任务2');
        
        //#1-5 升级控制器任务1
        if(taskUpgrade.run('1-5', controller, upgradStore, {x:20,y:28}, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#1-5 升级控制器任务1');
        //#1-6 升级控制器任务2
        if(taskUpgrade.run('1-6', controller, upgradStore, {x:19,y:29}, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#1-6 升级控制器任务2');
        // //#1-7 升级控制器任务3
        // if(taskUpgrade.run('1-7', controller, upgradStore, {x:19,y:30}, spawnName[nameRoom][0]) != 0)
        //     reportWrongExit.run('任务#1-7 升级控制器任务3');
        
        //#1-8 基地建设任务1
        if(taskHomeBuilder.run('1-8', 0, centralStore, nameRoomSource, {x:24,y:26}, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#1-8 基地建设任务1');

        //#1-9 预定房间任务1'W33N48'(右侧房间)
        if(taskReserver.run('1-9', 1, nameRoomSource, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#1-9 预定房间任务1\'W33N48\'(右侧房间)');

        //#1-10 采集能量任务3(外矿'W33N48')
        if(taskFixedHarvest.run('1-10', source3, {x:3,y:30}, {x:2,y:30}, 400, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#1-10 采集能量任务3');
        //#1-11 采集能量任务4(外矿'W33N48')
        if(taskFixedHarvest.run('1-11', source4, {x:33,y:21}, {x:33,y:22}, 400, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#1-11 采集能量任务4');

        //#1-12 资源调度任务3(外矿'W33N48' -> 采集能量任务2(出货点))
        var inStore3 = [harvestStore3, harvestStore4]; //采集能量任务3 出货点, 采集能量任务4 出货点
        var outStore3 = [harvestStore2] //采集能量任务2(出货点)
        if(taskHomeSchedul.run('1-12', 2, inStore3, outStore3, moduleFarCarrier1, true, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('任务#1-12 资源调度任务3(外矿\'W33N48\' -> 采集能量任务2(收获点)');

        //#1-13 防御外矿1'W33N48'
        if(taskAttackInvader.run('1-13', 1, nameRoomSource, {x:40,y:31}, moduleAttacker1, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#1-13 防御外矿1\'W33N48\'');

        //#1-14 采集矿物1
        if(taskMineralHarvester.run('1-14', mineral1, {x:26,y:44}, spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#1-14 采集矿物1');

        //#1-100 自动孵化任务1
        if(taskSpawn.run('1-100', spawnName[nameRoom][0]) != 0)
            reportWrongExit.run('#1-100 自动孵化任务1');

	}
};

module.exports = queueTask_W34N48;