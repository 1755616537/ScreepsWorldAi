/*
 被动指派任务-》小兵完成当前任务来领取新的任务-》优先级计算是否允许领取
 主动指派任务给空的小兵-》优先级
 优先级，计算距离，小兵类型，小兵属性
 建立一个有空小兵的列表，第一次运行初始化程序中，任务中心主动找出所有空闲小兵，然后根据优先级进行指派
 任务中心。第一步：建立任务，第二步：派发任务，第三步：执行任务
*/

/**
 * 挂载 请求任务
 */
Creep.prototype.requestTask = function () {
    return assignTask(this);
}

/**
 * 控制器 任务
 */
export default function () {

    // 建立任务
    addTask();

    // 派发任务
    // dispatchTasks();

    // 执行任务
    // performTasks();
}

// 请求指派任务
function assignTask(creep) {

}

// 建立添加任务
function addTask() {
    _.forEach(Game.rooms, room => {
        let roomName = room.name;

        const harvests = factory.creep.Harvest.ALL(roomName);
        const upgraders = factory.creep.Upgrader.ALL(roomName);
        const builders = factory.creep.Builder.ALL(roomName);
        const carriers = factory.creep.Carrier.ALL(roomName);
        const repairers = factory.creep.Repairer.ALL(roomName);
        const nearDefenders = factory.creep.Defender.ALLNearDefender(roomName);
        const farDefenders = factory.creep.Defender.ALLFarDefender(roomName);
        const theHealers = factory.creep.TheHealer.ALL(roomName);
        const occupiers = factory.creep.Occupier.ALL(roomName);

        // 我方血少的CREEPS
        const myCreepHitsF = room.find(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.hits < object.hitsMax;
            }
        });
        myCreepHitsF.sort((a, b) => a.hits - b.hits);

        // 敌方CREEPS
        const hostileCreep = room.find(FIND_HOSTILE_CREEPS);

        // 所有掉落的资源
        const droppedResources = room.find(FIND_DROPPED_RESOURCES);

        // 墓碑
        const tombstones = room.find(FIND_TOMBSTONES, {
            filter: (structure) => {
                return (structure.store.getUsedCapacity() > 0);
            }
        });
        tombstones.sort((a, b) => a.ticksToDecay - b.ticksToDecay);

        // 控制器升级
        let controller = room.controller;

        // 控制器CONTAINER能量供给运输

        // 能量源采集
        const sources = room.find(FIND_SOURCES);

        // 能量源CONTAINER能量搬运

        // 矿采集
        const minerals = room.find(FIND_MINERALS);

        // 矿CONTAINER资源搬运


    });
}

// 派发任务
function dispatchTasks() {
    // 寻找空闲Creep
    _.forEach(Game.creeps, creep => {
        let roomName = creep.room.name;

    });
}

// 执行任务
function performTasks() {
    // 正在执行任务队列
    let performList = [];
    try {
        performList = factory.task.perform.getALL();
    } catch (e) {
        //TODO handle the exception
    }

    for (let val in performList) {
        switch (val.type) {
            case globalData.havester:
                // 采集
                break;
            case globalData.upgrader:
                // 升级
                break;
            case globalData.builder:
                // 建造
                break;
            case globalData.carrier:
                // 运输
                break;
            case globalData.repairer:
                // 维修
                break;
            case globalData.defender:
                // 防御
                break;
            case globalData.attack:
                // 攻击
                break;
            case globalData.treat:
                // 治疗
                break;
            default:
                clog('无效任务', task);
        }
    }
}