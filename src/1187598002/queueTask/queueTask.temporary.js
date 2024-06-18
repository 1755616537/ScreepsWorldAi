var reportWrongExit = require('../report/report.wrongExit'); //异常退出 - 报告模块
var structureTower = require('../structure/structure.tower'); //自动维修与攻击 - 结构模块
var taskSpawn = require('../task/task.spawn'); //队列孵化 - 任务模块
var taskHarvest = require('../task/task.harvest'); //采集能量(自带运输) - 任务模块
var taskUpgrade = require('../task/task.upgrade'); //升级控制器 - 任务模块
var taskHomeSchedul = require('../task/task.homeSchedul'); //基地能量调度 - 任务模块
var taskHomeBuilder = require('../task/task.homeBuild'); //基地建设 - 任务模块
var taskReserver = require('../task/task.reserver'); //预定房间 - 任务模块
var taskFixedHarvest = require('../task/task.fixedHarvest'); //定点采集能量(需要工作位置有建筑Container) - 任务模块
var taskClaimer = require('../task/task.claimer'); //占领中立房间 - 任务模块
var taskAttackInvader = require('../task/task.attackInvader'); //攻击侵略者 - 任务模块
var taskPicker = require('../task/task.picker'); //捡起地上能量(拾荒者) - 任务模块
var taskMineralHarvester = require('../task/task.mineralHarvester') //矿物采集 - 任务模块
var taskNewRoomBuild = require('../task/task.newRoomBuild') //新基地建设 - 任务模块
var queueTaskTemporary = {
    /**  
    * 临时任务-任务队列模块
    */
    run: function() {

        var nameRoomClainmer = 'W32N45';
        var nameRoomGAN = 'W31N45';
        var waitRoom1 = 'W31N46';
        var waitRoom2 = 'W30N45';
        var waitRoom3 = 'W32N43';
        var path1 = [
            'W33N48','W32N48','W32N47','W32N46','W31N46',
            'W31N45','W32N45','W31N43','W30N43','W30N44',
            'W30N45','W31N45'];
        var path2 = [
            'W33N48','W32N48','W32N47','W32N46','W31N46',
            'W30N46','W30N45','W30N44','W30N43','W31N43',
            'W32N43','W32N44','W32N45'];
        var path3 = [
            'W33N48','W32N48','W32N47','W32N46','W31N46',
            'W30N46','W30N45','W30N44','W30N43','W31N43',
            'W32N43','W32N44','W33N44','W33N45','W32N45']
        var waitPos1 = {x:3,y:25};
        var waitPos2 = {x:31,y:10};
        var waitPos3 = {x:34,y:46};

        //能量 - 防御爬爬组件
        var moduleAttacker1 = [
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK
        ];

        //2100能量 - 单兵建设爬爬组件
        var moduleNewRoomBuilder = [
            WORK,WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE
        ];

        // //#0-1 占领'W33N49'控制器任务
        // if(taskClaimer.run('0-1', 'W32N45', spawnName.W34N48[0]) != 0)
        //     taskClaimer.run('任务#0-1 占领房间任务1');

        // //#0-2 预定房间任务1
        // if(taskReserver.run('0-2', 1, nameRoomClainmer, spawnName.W34N48[0], path1, true) != 0)
        //     reportWrongExit.run('任务#0-2 预定房间任务1');

        // //#0-3 防御1
        // if(taskAttackInvader.run('0-3', 0, nameRoomClainmer, waitPos1, moduleAttacker1, spawnName.W34N48[0], path1) != 0)
        //     reportWrongExit.run('#0-3 防御1');

        //#0-4 防御2
        if(taskAttackInvader.run('0-4', 0, nameRoomClainmer, waitPos1, moduleAttacker1, spawnName.W34N48[0], path1) != 0)
            reportWrongExit.run('#0-4 防御2');

        //#0-5 防御3
        if(taskAttackInvader.run('0-5', 0, nameRoomClainmer, waitPos1, moduleAttacker1, spawnName.W33N49[0], path3) != 0)
            reportWrongExit.run('#0-5 防御3');

        //#0-6 新基地建设1
        if(taskNewRoomBuild.run('0-6', 0, nameRoomClainmer, moduleNewRoomBuilder, 0, spawnName.W33N49[0], path1) != 0)
            reportWrongExit.run('#0-6 新基地建设1');

        //#0-7 新基地建设2
        if(taskNewRoomBuild.run('0-7', 0, nameRoomClainmer, moduleNewRoomBuilder, 1, spawnName.W34N48[0], path3) != 0)
            reportWrongExit.run('#0-7 新基地建设2');

	}
};

module.exports = queueTaskTemporary;