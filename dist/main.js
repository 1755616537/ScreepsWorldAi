'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

// 全局数据
commonjsGlobal.globalData = {
    // 总输出
    clog: true,
    // 【不用填写，会自动获取】自己的建筑拥有者姓名
    username: '',
    // 房间
    rooms: [{
        // 【可以不填写，会自动获取】房间名
        name: 'W47S54',
        // 【可以不填写，会自动获取】基地集合
        spawns: [{
            // 【可以不填写，会自动获取】基地名称
            name: 'Spawn1'
        }],
        // 【可以不填写，会自动获取】自动安全(受到攻击自动开启)
        AutomaticSecurity: true,
        // 【可以不填写，会自动获取】采集者自动分配矿区
        AutomaticAssignHarvest: true,
        // 【可以不填写，会自动获取】自动分配建设采集区的CONTAINER
        AutomaticAssignHarvestCONTAINER: true,
        // 【可以不填写，会自动获取】自动分配建设控制器区的CONTAINER
        AutomaticAssignControllerCONTAINER: true
    }
    ],
    // 全部房间配置
    roomsAllAllocation: {
        // 是否开启强制统一房间配置
        on: false,
        // 配置内容（当遇到房间配置没有单独配置时，自动使用以下为默认配置）
        content: {
            // 自动安全(受到攻击自动开启)
            AutomaticSecurity: true,
            // 采集者自动分配矿区
            AutomaticAssignHarvest: true,
            // 自动分配建设采集区的CONTAINER
            AutomaticAssignHarvestCONTAINER: true,
            // 自动分配建设控制器区的CONTAINER
            AutomaticAssignControllerCONTAINER: true
        }
    },
    // 角色配置
    creepConfigs: {
        // 采集者
        'harvest': {
            // 普通版（6*WORK已经是1对1能量源300秒采集3000的极限，多了会浪费,5*WORK勉强剩余450多能量）
            bodys: {
                list: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
                // 总能量数量（达到该植才允许生产,可以设比生产所需高点达到预留能量的效果,避免能量直接用完）
                totalEnergyRequired: 200
            },
            // 缩减版
            bodysMinus: {
                list: [WORK, CARRY, MOVE],
                totalEnergyRequired: 100
            },
            // 加强版（没带carry部件或者满了，再采集能量会自动掉脚下，如果脚下有容器就会自动进容器）
            bodysPlus: {
                list: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
                totalEnergyRequired: 300
            },
            // 总上限数量
            number: 2,
            // 自动分配数量（开启 AutomaticAssignHarvest可以根据最大支持数量动态更新采集者数量）
            AutomaticAssignNum: true,
            // 自动分配根据可用能量容量上限调整bodys
            AutomaticAssignBodysEnergyCapacityAvailable: true
        },
        // 升级者
        'upgrader': {
            bodys: {
                list: [WORK, WORK, WORK, WORK, CARRY, MOVE],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [WORK, CARRY, MOVE],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, MOVE, MOVE, MOVE
                ],
                totalEnergyRequired: 300
            },
            number: 2
        },
        // 建造者
        'builder': {
            bodys: {
                list: [WORK, WORK, CARRY, MOVE],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [WORK, CARRY, MOVE],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [WORK, WORK, WORK, CARRY, MOVE],
                totalEnergyRequired: 300
            },
            number: 1
        },
        // 运输者
        'carrier': {
            bodys: {
                list: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [WORK, CARRY, MOVE],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ],
                totalEnergyRequired: 300
            },
            number: 3,
            // 矿区CONTAINER是否1v1运送
            sourceContainer1v1: true
        },
        // 维修者
        'repairer': {
            bodys: {
                list: [WORK, WORK, CARRY, MOVE],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [WORK, CARRY, MOVE],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [WORK, WORK, WORK, CARRY, MOVE],
                totalEnergyRequired: 300
            },
            number: 1,
            // tower创建拥有能量的时候不生成维修者
            onTower: false
        },
        // 防御者-近战
        'nearDefender': {
            bodys: {
                list: [MOVE, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [MOVE, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [MOVE, ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                    TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH
                ],
                totalEnergyRequired: 300
            },
            number: 0
        },
        // 防御者-远战
        'farDefender': {
            bodys: {
                list: [MOVE, RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                    TOUGH, TOUGH
                ],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [MOVE, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                    TOUGH, TOUGH, TOUGH,
                    TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH
                ],
                totalEnergyRequired: 300
            },
            number: 0
        },
        // 治疗者
        'theHealer': {
            bodys: {
                list: [MOVE, HEAL, HEAL],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [MOVE, HEAL],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [MOVE, HEAL, HEAL, HEAL],
                totalEnergyRequired: 300
            },
            number: 0
        },
        // 占领者
        'occupier': {
            bodys: {
                list: [MOVE, CLAIM, CLAIM],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [MOVE, CLAIM],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [MOVE, CLAIM, CLAIM, CLAIM],
                totalEnergyRequired: 300
            },
            number: 0
        }
    },
    // 移动
    Move: {
        // 工作颜色
        WorkColor: '#ffaa00',
        // 获取资源颜色
        WorkResourceColor: '#ffff00',
    },
    // 采集者ID
    harvest: 'harvest',
    // 升级者ID
    upgrader: 'upgrader',
    // 建造者ID
    builder: 'builder',
    // 运输者ID
    carrier: 'carrier',
    // 维修者ID
    repairer: 'repairer',
    // 防御者近战ID
    nearDefender: 'nearDefender',
    // 防御者远战ID
    farDefender: 'farDefender',
    // 占领者ID
    occupier: 'occupier',
    // 治疗者ID
    theHealer: 'theHealer',
    // 角色部件配置
    creepComponentConfigs: {
        // 每 tick 减少 2 点疲惫值
        MOVE: 50,
        // 每 tick 从能量源采集 2 单位能量。
        // 每 tick 从矿区采集 1 单位矿物。
        // 每 tick 增加工地建设进度 5 点，花费 5 单位能量。
        // 每 tick 增加建筑 100 耐久度，花费 1 单位能量。
        // 每 tick 拆减建筑 50 点耐久，并返还 0.25 单位能量。
        // 每 tick 提高控制器升级进度 1 点，花费 1 单位能量。
        WORK: 100,
        // 携带最多 50 单位资源。
        CARRY: 50,
        // 对相邻的 creep 或建筑造成 30 点伤害。
        ATTACK: 80,
        // 单个目标时，每 tick 对 creep 或建筑造成 10 点伤害，范围为 3 格。
        // 多个目标时，每 tick 对范围内所有 creep 与建筑造成 1-4-10 点伤害，具体伤害取决于距离，范围为 3 格。
        RANGED_ATTACK: 150,
        // 治疗对象可为自己或其它 creep。自愈或治疗相邻 creep 时每 tick 恢复 12 点耐久，一定距离内远程治疗每 tick 恢复 4 点耐久。
        HEAL: 250,
        // 占领一个中立房间的控制器。
        // 每部件每 tick 使己方对中立房间控制器的预定时间增加 1 tick，或使其他玩家的预定时间减少 1 tick。
        // 每部件每 tick 使其他玩家控制器降级计数器加速 300 tick。
        // 注：拥有该部件的 creep 寿命只有 600 tick，且无法被 renew。
        CLAIM: 600,
        // 无附加效果，唯一作用是增加 creep 的最大耐久值。可被强化以承受更多伤害。
        TOUGH: 10,
    },
    structuresShape: {
        "spawn": "◎",
        "extension": "ⓔ",
        "link": "◈",
        "road": "•",
        "constructedWall": "▓",
        "rampart": "⊙",
        "storage": "▤",
        "tower": "🔫",
        "observer": "👀",
        "powerSpawn": "❂",
        "extractor": "☸",
        "terminal": "✡",
        "lab": "☢",
        "container": "□",
        "nuker": "▲",
        "factory": "☭"
    }
};

clog = function (...e) {
    if (globalData.clog) console.log(...e);
};
log = function (...e) {
    if (globalData.clog) console.log(JSON.stringify(e));
};

Array.prototype.flat = function () {
    return _.flatten(this)
};
// Array.prototype.reduce= function(func){return _.reduce(this,func)};
Array.prototype.zip = function (another) {
    return _.zip(this, another)
};
Array.prototype.contains = function (another) {
    return _.includes(this, another)
};
Array.prototype.take = function (n) {
    return _.take(this, n)
};
Array.prototype.head = function () {
    return _.head(this)
};
Array.prototype.last = function () {
    return _.last(this)
};
Array.prototype.without = function (...e) {
    return _.without(this, ...e)
};
Array.prototype.sum = function (...e) {
    return _.sum(this, ...e)
};
Array.prototype.toSet = function () {
    return new Set(this)
};
Array.prototype.toMap = function () {
    return this.reduce((map, entry) => {
        map[entry[0]] = entry[1];
        return map
    }, {})
};
Array.prototype.find = function (...e) {
    return _.find(this, ...e)
};
Array.prototype.maxBy = function (func) {
    return this.reduce((ori, another) => func(ori) >= func(another) ? ori : another, this[0])
};
Array.prototype.minBy = function (func) {
    return this.reduce((ori, another) => func(ori) < func(another) ? ori : another, this[0])
};
Array.prototype.log = function () {
    console.log(JSON.stringify(this));
    return this
};
Array.prototype.randomGet = function () {
    return this[Math.floor(this.length * Math.random())]
};

let base36 = Math.pow(36, 10);
randomId = () => _.padLeft(Math.ceil(Math.random() * base36).toString(36).toLocaleUpperCase(), 10, "0");

let posCodeNumberMap = {};
let posCodeCharMap = {};
// pos 转换 char 用的
(function () {
    let a = 'a'.charCodeAt(0);
    let A = 'A'.charCodeAt(0);
    for (let i = 0; i < 25; i++) {
        let b = String.fromCharCode(a + i);
        let j = 25 + i;
        let B = String.fromCharCode(A + i);
        posCodeNumberMap[i] = b;
        posCodeCharMap[b] = i;
        posCodeNumberMap[j] = B;
        posCodeCharMap[B] = j;
    }
}());


let pro = {
    randomGet(array) {
        return array[Math.floor(array.length * Math.random())]
    },
    getBodyEnergyNeed(body) {
        let need = 0;
        body.forEach(e => {
            if (BODYPART_COST[e]) need += BODYPART_COST[e];
        });
        return need;
    },
    /*
    let str = Utils.encodePosArray(Memory.rooms.W5N8.structMap.constructedWall.map(e=>{return {x:e[0],y:e[1]}}))
    log(str)
    let arrs = Utils.decodePosArray(str)
    log(arrs)
    log(Memory.rooms.W5N8.structMap.constructedWall.map(e=>{return {x:e[0],y:e[1]}}))
    */
    encodePosArray(posArray) {
        return posArray.map(e => posCodeNumberMap[e.x] + posCodeNumberMap[e.y]).reduce((a, b) => a + b, "")
    },
    decodePosArray(string) {
        let out = [];
        for (let i = 0; i < string.length; i += 2) {
            out.push({
                x: posCodeCharMap[string[i]],
                y: posCodeCharMap[string[i + 1]]
            });
        }
        return out;
    },
    hashCode(str) {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
        }
        return hash
    },
    //线性同余随机数
    rnd(seed) {
        return (seed * 9301 + 49297) % 233280; //为何使用这三个数?
    },
    randomInt(start, end) {
        if (end == undefined) {
            end = start;
            start = 0;
        }
        let range = end - start;
        return start + Math.floor(Math.random() * range)
    },


    cn: function screepsCN() {
        // 汉化

        clog("【客户端汉化显示加载】【开始】 Time " + Game.time);
        console.log(
            `<script src="https://screeps-cn.gitee.io/screeps-chinese-pack-release/main.js" async defer></script>`
        );
        clog("【客户端汉化显示加载】【完成】 Time " + Game.time);
    },
    notify(message, onTime = true, groupInterval = 0) {
        // screeps内置 邮件发送
        // 带重复,超时60秒,过滤功能
        // [例子: Utils.notify(`【${roomName}】房间,开启安全模式【成功】`);]

        if (!Memory.notifyList) Memory.notifyList = [];
        let time = Game.time;
        let notifyList = Memory.notifyList;
        let notifyList2 = [];
        let on = false;
        for (var i = 0; i < notifyList.length; i++) {
            if (notifyList[i].message == message) {
                on = true;
            }
            if (Game.time - notifyList[i].time <= 60) notifyList2.push(notifyList[i]);
        }
        if (on) return;
        notifyList2.push({
            message: message,
            time: time
        });
        Memory.notifyList = notifyList2;
        if (onTime) {
            Game.notify(`Time ${time} ${message}`, groupInterval);
        } else {
            Game.notify(message, groupInterval);
        }
    }
};


commonjsGlobal.Utils = pro;

/*
creep对穿+跨房间寻路+寻路缓存 
跑的比香港记者还快从你做起
应用此模块会导致creep.moveTo可选参数中这些项失效：reusePath、serializeMemory、noPathFinding、ignore、avoid、serialize
保留creep.moveTo中其他全部可选参数如visualizePathStyle、range、ignoreDestructibleStructures、ignoreCreeps、ignoreRoad等
新增creep.moveTo中可选参数ignoreSwamps，会无视swamp与road的移动力损耗差异，一律与plain相同处理，用于方便pc和眼，默认false
例：creep.moveTo(controller, {ignoreSwamps: true});
新增creep.moveTo中可选参数bypassHostileCreeps，被creep挡路时若此项为true则绕过别人的creep，默认为true，设为false用于近战攻击
例：creep.moveTo(controller, {bypassHostileCreeps: false});
新增creep.moveTo中可选参数bypassRange，被creep挡路准备绕路时的绕路半径，默认为5
例：creep.moveTo(controller, {bypassRange: 10});
新增creep.moveTo中可选参数noPathDelay，寻得的路是不完全路径时的再次寻路延迟，默认为10
例：creep.moveTo(controller, {noPathDelay: 5});
新增返回值ERR_INVALID_ARGS，表示range或者bypassRange类型错误

遇到己方creep自动进行对穿，遇到自己设置了不想被对穿的creep（或bypassHostileCreeps设为true时遇到他人creep）会自动绕过
会将新手墙和部署中的invaderCore处理为无法通过
会绕过非终点的portal，不影响creep.moveTo(portal)
不使用Memory及global，不会因此干扰外部代码
不会在Creep.prototype、PowerCreep.prototype上增加官方未有的键值，不会因此干扰外部代码
本模块不可用于sim，在sim会因为房间名格式不对返回ERR_INVALID_TARGET
模块参数见代码头部，模块接口见代码尾部
版本号规则：alpha test = 0.1.x，beta test = 0.9.x，publish >= 1.0.0

author: Scorpior
debug helpers: fangxm, czc
inspired by: Yuandiaodiaodiao
date: 2020/3/30
version: 0.9.4(beta test)

Usage:
module :main

require('超级移动优化');
module.exports.loop=function() {

    //your codes go here

}

changelog:
0.1.0:  maybe not runnable
0.1.1： still maybe not runnable，修了一些typo，完成正向移动，修改isObstacleStructure
0.1.2： maybe runnable，some bugs are fixed
0.1.3:  修正工地位置寻路错误，调整打印格式
0.1.4:  补充pc对穿，打印中增加cache hits统计
0.9.0:  启用自动清理缓存，保留ignoreCreeps参数，调整对穿顺序+增加在storage附近检查对穿，
        正确识别敌对rampart，正确查询带range路径，打印中增加对穿频率统计
0.9.1:  增加正常逻辑开销统计，修改cache搜索开销统计为cache miss开销统计，绕路bugfix，跨房检测bugfix，other bugfix
0.9.2:  修改缓存策略减少查找耗时增加命中率，增加核心区对穿次数统计，对穿bugfix，other bugfix
0.9.3： 取消路径反向复用避免偶发的复用非最优路径的情况，改进识别被新手墙封闭的房间，增加avoidRooms设置，
        增加远距离跨房寻路成功率，房间出口处对穿bug fix
0.9.4:  优化路径复用避免偶发的复用非最优路径的情况，删除运行时参数中neutralCostMatrixClearDelay，
        自动根据挡路建筑情况设置中立房间costMatrix过期时间，增加ob寻路（检查房间是否可走），
        提供deletePathInRoom接口（使用方式见下方ps），print()中增加平均每次查找缓存时检查的路径数量统计，
        findRoute遇到过道新手墙时bugfix，偏移路径bugfix
0.9.5： TODO：ignoreSwamp避开路，提供deletePathFromRoom、deletePathToRoom接口，增加自动visual，betterMove


ps:
1.默认ignoreCreeps为true，主动设置ignoreCreeps为false会在撞到creep时重新寻路
2.对于不想被对穿的creep（比如没有脚的中央搬运工）, 设置memory：
creep.memory.dontPullMe = true;
3.修路后希望手动更新房间内路径，可执行如下代码：
require('超级移动优化').deletePathInRoom(roomName);
4.战斗中遇到敌方pc不断产生新rampart挡路的情况，目前是撞上建筑物才重新寻路（原版moveTo撞上也继续撞），如果觉得需要手动提前激活重新寻路则联系我讨论
5.在控制台输入require('超级移动优化').print()获取性能信息，鼓励发给作者用于优化
*/
// 运行时参数 
let pathClearDelay = 5000;  // 清理相应时间内都未被再次使用的路径，同时清理死亡creep的缓存，设为undefined表示不清除缓存
let hostileCostMatrixClearDelay = 500; // 自动清理相应时间前创建的其他玩家房间的costMatrix
let coreLayoutRange = 3; // 核心布局半径，在离storage这个范围内频繁检查对穿（减少堵路的等待
let avoidRooms = ['E18S8', 'E19S9', 'E21S9', 'E24S8', 'E35N6', 'E25S9',
    'E19N2', 'E18N3', 'E29N5', 'E29N3', 'E28N8', 'E33N9', 'E34N8',
    'E37N6', 'E41N8', 'E39N11', 'E39N12', 'E39N13', 'E17S9'];      // 永不踏入这些房间
/** @type {{id:string, roomName:string, taskQueue:{path:MyPath, idx:number, roomName:string}[]}[]} */
let observers = ['5e3646219c6dc78024fd7097', '5e55e9b8673548d9468a2d3d', '5e36372d00fab883d281d95e'];  // 如果想用ob寻路，把ob的id放这里

/***************************************
 *  局部缓存
 */
/** @type {{ [time: number]:{path:MyPath, idx:number, roomName:string}[] }} */
let obTimer = {};   // 【未启用】用于登记ob调用，在相应的tick查看房间对象
let obTick = Game.time;
/** @type {Paths} */
let globalPathCache = {};     // 缓存path
/** @type {MoveTimer} */
let pathCacheTimer = {}; // 用于记录path被使用的时间，清理长期未被使用的path
/** @type {CreepPaths} */
let creepPathCache = {};    // 缓存每个creep使用path的情况
let creepMoveCache = {};    // 缓存每个creep最后一次移动的tick
let emptyCostMatrix = new PathFinder.CostMatrix;
/** @type {CMs} */
let costMatrixCache = {};    // true存ignoreDestructibleStructures==true的，false同理
/** @type {{ [time: number]:{roomName:string, avoids:string[]}[] }} */
let costMatrixCacheTimer = {}; // 用于记录costMatrix的创建时间，清理过期costMatrix
let autoClearTick = Game.time;  // 用于避免重复清理缓存

const obstacles = new Set(OBSTACLE_OBJECT_TYPES);
const originMove = Creep.prototype.move;
Creep.prototype.moveTo;
RoomPosition.prototype.findClosestByPath;

// 统计变量
let startTime;
let startCacheSearch;
let cacheHitCost = 0;
let cacheMissCost = 0;

/***************************************
 *  util functions
 */
let reg1 = /^([WE])([0-9]+)([NS])([0-9]+)$/;    // parse得到['E28N7','E','28','N','7']
/**
 *  统一到大地图坐标，平均单次开销0.00005
 * @param {RoomPosition} pos 
 */
function formalize(pos) {
    let splited = reg1.exec(pos.roomName);
    if (splited && splited.length == 5) {
        return { // 如果这里出现类型错误，那么意味着房间名字不是正确格式但通过了parse，小概率事件
            x: (splited[1] === 'W' ? -splited[2] : +splited[2] + 1) * 50 + pos.x,
            y: (splited[3] === 'N' ? -splited[4] : +splited[4] + 1) * 50 + pos.y
        }
    } // else 房间名字不是正确格式
    return {}
}

/**
 *  阉割版isEqualTo，提速
 * @param {RoomPosition} pos1 
 * @param {RoomPosition} pos2 
 */
function isEqual(pos1, pos2) {
    return pos1.x == pos2.x && pos1.y == pos2.y && pos1.roomName == pos2.roomName;
}

/**
 *  兼容房间边界
 *  参数具有x和y属性就行
 * @param {RoomPosition} pos1 
 * @param {RoomPosition} pos2 
 */
function isNear(pos1, pos2) {
    if (pos1.roomName == pos2.roomName) {    // undefined == undefined 也成立
        return -1 <= pos1.x - pos2.x && pos1.x - pos2.x <= 1 && -1 <= pos1.y - pos2.y && pos1.y - pos2.y <= 1;
    } else if (pos1.roomName && pos2.roomName) {    // 是完整的RoomPosition
        if (pos1.x + pos2.x != 49 && pos1.y + pos2.y != 49) return false;    // 肯定不是两个边界点, 0.00003 cpu
        // start
        let splited1 = reg1.exec(pos1.roomName);
        let splited2 = reg1.exec(pos2.roomName);
        if (splited1 && splited1.length == 5 && splited2 && splited2.length == 5) {
            // 统一到大地图坐标
            let formalizedEW = (splited1[1] === 'W' ? -splited1[2] : +splited1[2] + 1) * 50 + pos1.x - (splited2[1] === 'W' ? -splited2[2] : +splited2[2] + 1) * 50 - pos2.x;
            let formalizedNS = (splited1[3] === 'N' ? -splited1[4] : +splited1[4] + 1) * 50 + pos1.y - (splited2[3] === 'N' ? -splited2[4] : +splited2[4] + 1) * 50 - pos2.y;
            return -1 <= formalizedEW && formalizedEW <= 1 && -1 <= formalizedNS && formalizedNS <= 1;
        }
        // end - start = 0.00077 cpu
    }
    return false
}

/** 
* @param {RoomPosition} pos1 
* @param {RoomPosition} pos2 
*/
function inRange(pos1, pos2, range) {
    if (pos1.roomName == pos2.roomName) {
        return -range <= pos1.x - pos2.x && pos1.x - pos2.x <= range && -range <= pos1.y - pos2.y && pos1.y - pos2.y <= range;
    } else {
        pos1 = formalize(pos1);
        pos2 = formalize(pos2);
        return pos1.x && pos2.x && inRange(pos1, pos2);
    }
}

/**
 *  fromPos和toPos是pathFinder寻出的路径上的，只可能是同房相邻点或者跨房边界点
 * @param {RoomPosition} fromPos 
 * @param {RoomPosition} toPos 
 */
function getDirection(fromPos, toPos) {
    if (fromPos.roomName == toPos.roomName) {
        if (toPos.x > fromPos.x) {    // 下一步在右边
            if (toPos.y > fromPos.y) {    // 下一步在下面
                return BOTTOM_RIGHT;
            } else if (toPos.y == fromPos.y) { // 下一步在正右
                return RIGHT;
            }
            return TOP_RIGHT;   // 下一步在上面
        } else if (toPos.x == fromPos.x) { // 横向相等
            if (toPos.y > fromPos.y) {    // 下一步在下面
                return BOTTOM;
            } else if (toPos.y < fromPos.y) {
                return TOP;
            }
        } else {  // 下一步在左边
            if (toPos.y > fromPos.y) {    // 下一步在下面
                return BOTTOM_LEFT;
            } else if (toPos.y == fromPos.y) {
                return LEFT;
            }
            return TOP_LEFT;
        }
    } else {  // 房间边界点
        if (fromPos.x == 0 || fromPos.x == 49) {  // 左右相邻的房间，只需上下移动（左右边界会自动弹过去）
            if (toPos.y > fromPos.y) {   // 下一步在下面
                return BOTTOM;
            } else if (toPos.y < fromPos.y) { // 下一步在上
                return TOP
            } // else 正左正右
            return fromPos.x ? RIGHT : LEFT;
        } else if (fromPos.y == 0 || fromPos.y == 49) {    // 上下相邻的房间，只需左右移动（上下边界会自动弹过去）
            if (toPos.x > fromPos.x) {    // 下一步在右边
                return RIGHT;
            } else if (toPos.x < fromPos.x) {
                return LEFT;
            }// else 正上正下
            return fromPos.y ? BOTTOM : TOP;
        }
    }
}
let isHighWay = (roomName) => {
        // E0 || E10 || E1S0 || [E10S0|E1S10] || [E10S10] 比正则再除快
        return roomName[1] == 0 || roomName[2] == 0 || roomName[3] == 0 || roomName[4] == 0 || roomName[5] == 0;
    };

/**
 *  缓存的路径和当前moveTo参数相同
 * @param {MyPath} path 
 * @param {*} ops 
 */
function isSameOps(path, ops) {
    return path.ignoreRoads == !!ops.ignoreRoads &&
        path.ignoreSwamps == !!ops.ignoreSwamps &&
        path.ignoreStructures == !!ops.ignoreDestructibleStructures;
}

function hasActiveBodypart(body, type) {
    if (!body) {
        return true;
    }

    for (var i = body.length - 1; i >= 0; i--) {
        if (body[i].hits <= 0)
            break;
        if (body[i].type === type)
            return true;
    }

    return false;

}

function isClosedRampart(structure) {
    return structure.structureType == STRUCTURE_RAMPART && !structure.my && !structure.isPublic;
}

/**
 *  查看是否有挡路建筑
 * @param {Room} room
 * @param {RoomPosition} pos 
 * @param {boolean} ignoreStructures
 */
function isObstacleStructure(room, pos, ignoreStructures) {
    let consSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, pos);
    if (0 in consSite && consSite[0].my && obstacles.has(consSite[0].structureType)) {  // 工地会挡路
        return true;
    }
    for (let s of room.lookForAt(LOOK_STRUCTURES, pos)) {
        if (!s.hits || s.ticksToDeploy) {     // 是新手墙或者无敌中的invaderCore
            return true;
        } else if (!ignoreStructures && (obstacles.has(s.structureType) || isClosedRampart(s))) {
            return true
        }
    }
    return false;
    // let possibleStructures = room.lookForAt(LOOK_STRUCTURES, pos);  // room.lookForAt比pos.lookFor快
    // 万一有人把路修在extension上，导致需要每个建筑都判断，最多重叠3个建筑（rap+road+其他）
    // return obstacles.has(possibleStructures[0]) || obstacles.has(possibleStructures[1]) || obstacles.has(possibleStructures[2]);    // 条件判断平均每次0.00013cpu
}

/**
 *  登记ob需求
 * @param {MyPath} path 
 * @param {number} idx 
 */
function addObTask(path, idx) {
    let roomName = path.posArray[idx].roomName;
    //console.log('准备ob ' + roomName);
    for (let obData of observers) {
        if (Game.map.getRoomLinearDistance(obData.roomName, roomName) <= 10) {
            obData.taskQueue.push({ path: path, idx: idx, roomName: roomName });
            break;
        }
    }
}

/**
 *  尝试用ob检查路径
 */
function doObTask() {
    for (let obData of observers) { // 遍历所有ob
        let queue = obData.taskQueue;
        while (queue.length) {  // 没有task就pass
            let task = queue[queue.length - 1];
            let roomName = task.roomName;
            if (roomName in costMatrixCache) {  // 有过视野不用再ob
                if (!task.path.directionArray[task.idx]) {
                    //console.log(roomName + ' 有视野了无需ob');
                    checkRoom({ name: roomName }, task.path, task.idx - 1);
                }
                queue.pop();
                continue;
            }
            /** @type {StructureObserver} */
            let ob = Game.getObjectById(obData.id);
            if (ob) {
                //console.log('ob ' + roomName);
                ob.observeRoom(roomName);
                if (!(Game.time + 1 in obTimer)) {
                    obTimer[Game.time + 1] = [];
                }
                obTimer[Game.time + 1].push({ path: task.path, idx: task.idx, roomName: roomName });    // idx位置无direction
            } else {
                observers.splice(observers.indexOf(obData), 1);
            }
            break;
        }
    }
}

/**
 *  查看ob得到的房间
 */
function checkObResult() {
    for (let tick in obTimer) {
        if (tick < Game.time) {
            delete obTimer[tick];
            continue;   // 后面可能还有要检查的
        } else if (tick == Game.time) {
            for (let result of obTimer[tick]) {
                if (result.roomName in Game.rooms) {
                    //console.log('ob得到 ' + result.roomName);
                    checkRoom(Game.rooms[result.roomName], result.path, result.idx - 1);    // checkRoom要传有direction的idx
                }
            }
            delete obTimer[tick];
        } // else 没有要检查的
        break;  // 检查完了或者没有要检查的
    }
}

/**
 *  为房间保存costMatrix，ignoreDestructibleStructures这个参数的两种情况各需要一个costMatrix
 *  设置costMatrix缓存的过期时间
 * @param {Room} room 
 * @param {RoomPosition} pos
 */
function generateCostMatrix(room, pos) {
    let noStructureCostMat = new PathFinder.CostMatrix; // 不考虑可破坏的建筑，但是要考虑墙上资源点和无敌的3种建筑，可能还有其他不能走的？
    let structureCostMat = new PathFinder.CostMatrix;   // 在noStructrue的基础上加上所有不可行走的建筑
    let totalStructures = room.find(FIND_STRUCTURES);
    let 修路也没用的墙点 = [].concat(room.find(FIND_SOURCES), room.find(FIND_MINERALS), room.find(FIND_DEPOSITS));
    let x, y, noviceWall, deployingCore, centralPortal;
    let clearDelay = Infinity;
    for (let object of 修路也没用的墙点) {
        x = object.pos.x; y = object.pos.y;
        noStructureCostMat.set(x, y, 255);
    }
    if (room.controller && (room.controller.my || room.controller.safeMode)) {  // 自己的工地不能踩
        for (let consSite of room.find(FIND_CONSTRUCTION_SITES)) {
            if (obstacles.has(consSite.structureType)) {
                x = consSite.pos.x; y = consSite.pos.y;
                noStructureCostMat.set(x, y, 255);
                structureCostMat.set(x, y, 255);
            }
        }
    }
    for (let s of totalStructures) {
        if (s.structureType == STRUCTURE_INVADER_CORE) {  // 第1种可能无敌的建筑
            if (s.ticksToDeploy) {
                deployingCore = true;
                clearDelay = clearDelay > s.ticksToDeploy ? s.ticksToDeploy : clearDelay;
                noStructureCostMat.set(s.pos.x, s.pos.y, 255);
            }
            structureCostMat.set(s.pos.x, s.pos.y, 255);
        } else if (s.structureType == STRUCTURE_PORTAL) {  // 第2种无敌建筑
            if (!isHighWay(room.name)) {
                centralPortal = true;
                clearDelay = clearDelay > s.ticksToDecay ? s.ticksToDecay : clearDelay;
            }
            x = s.pos.x; y = s.pos.y;
            structureCostMat.set(x, y, 255);
            noStructureCostMat.set(x, y, 255);
        } else if (s.structureType == STRUCTURE_WALL) {    // 第3种可能无敌的建筑
            if (!s.hits) {
                noviceWall = true;
                noStructureCostMat.set(s.pos.x, s.pos.y, 255);
            }
            structureCostMat.set(s.pos.x, s.pos.y, 255);
        } else if (s.structureType == STRUCTURE_ROAD) {    // 路的移动力损耗是1，此处设置能寻到墙上的路
            x = s.pos.x; y = s.pos.y;
            if (noStructureCostMat.get(x, y) == 0) {  // 不是在3种无敌建筑或墙中资源上
                noStructureCostMat.set(x, y, 1);
                if (structureCostMat.get(x, y) == 0) {     // 不是在不可行走的建筑上
                    structureCostMat.set(x, y, 1);
                }
            }
        } else if (obstacles.has(s.structureType) || isClosedRampart(s)) {   // HELP：有没有遗漏其他应该设置 noStructureCostMat 的点
            structureCostMat.set(s.pos.x, s.pos.y, 255);
        }
    }

    costMatrixCache[room.name] = {
        roomName: room.name,
        true: noStructureCostMat,   // 对应 ignoreDestructibleStructures = true
        false: structureCostMat     // 对应 ignoreDestructibleStructures = false
    };

    let avoids = [];
    if (room.controller && room.controller.owner && !room.controller.my && hostileCostMatrixClearDelay) {  // 他人房间，删除costMat才能更新被拆的建筑位置
        if (!(Game.time + hostileCostMatrixClearDelay in costMatrixCacheTimer)) {
            costMatrixCacheTimer[Game.time + hostileCostMatrixClearDelay] = [];
        }
        costMatrixCacheTimer[Game.time + hostileCostMatrixClearDelay].push({
            roomName: room.name,
            avoids: avoids
        });   // 记录清理时间
    } else if (noviceWall || deployingCore || centralPortal) { // 如果遇到可能消失的挡路建筑，这3种情况下clearDelay才可能被赋值为非Infinity
        if (noviceWall) {    // 如果看见新手墙
            let neighbors = Game.map.describeExits(room.name);
            for (let direction in neighbors) {
                let status = Game.map.getRoomStatus(neighbors[direction]);
                if (status.status == 'closed') {
                    avoidRooms[neighbors[direction]] = 1;
                } else if (status.status != 'normal' && status.timestamp != null) {
                    let estimateTickToChange = (status.timestamp - new Date().getTime()) / 10000; // 10s per tick
                    clearDelay = clearDelay > estimateTickToChange ? Math.ceil(estimateTickToChange) : clearDelay;
                }
            }
            if (pos) {  // 如果知道自己的pos
                for (let direction in neighbors) {
                    if (!(neighbors[direction] in avoidRooms)) {
                        let exits = room.find(+direction);
                        if (PathFinder.search(pos, exits, { maxRooms: 1, roomCallback: () => noStructureCostMat }).incomplete) {    // 此路不通
                            avoidRooms[neighbors[direction]] = 1;
                            avoids.push(neighbors[direction]);
                        }
                    }
                }
            }
        }
        //console.log(room.name + ' costMat 设置清理 ' + clearDelay);
        if (!(Game.time + clearDelay in costMatrixCacheTimer)) {
            costMatrixCacheTimer[Game.time + clearDelay] = [];
        }
        costMatrixCacheTimer[Game.time + clearDelay].push({
            roomName: room.name,
            avoids: avoids  // 因新手墙导致的avoidRooms需要更新
        });   // 记录清理时间
    }
    //console.log('生成costMat ' + room.name);

}

/**
 *  把路径上有视野的位置的正向移动方向拿到，只有在找新路时调用，找新路时会把有视野房间都缓存进costMatrixCache
 * @param {MyPath} path 
 */
function generateDirectionArray(path) {
    let posArray = path.posArray;
    let directionArray = new Array(posArray.length);
    let incomplete = false;
    for (let idx = 1; idx in posArray; idx++) {
        if (posArray[idx - 1].roomName in costMatrixCache) {    // 有costMat，是准确路径，否则需要在有视野时checkRoom()
            directionArray[idx] = getDirection(posArray[idx - 1], posArray[idx]);
        } else if (!incomplete) {   // 记录第一个缺失准确路径的位置
            incomplete = idx;
        }
    }
    if (observers.length && incomplete) {
        addObTask(path, incomplete); // 这格没有direction
    }
    path.directionArray = directionArray;
}

/**
 *  第一次拿到该room视野，startIdx是新房中唯一有direction的位置
 * @param {Room} room 
 * @param {MyPath} path 
 * @param {number} startIdx 
 */
function checkRoom(room, path, startIdx) {
    if (!(room.name in costMatrixCache)) {
        generateCostMatrix(room, path.posArray[startIdx]);
    }
    let thisRoomName = room.name;
    /** @type {CostMatrix} */
    let costMat = costMatrixCache[thisRoomName][path.ignoreStructures];
    let posArray = path.posArray;
    let directionArray = path.directionArray;
    let i;
    for (i = startIdx; i + 1 in posArray && posArray[i].roomName == thisRoomName; i++) {
        if (costMat.get(posArray[i].x, posArray[i].y) == 255) {   // 路上有东西挡路
            return false;
        }
        directionArray[i + 1] = getDirection(posArray[i], posArray[i + 1]);
    }
    if (observers.length && i + 1 in posArray) {
        while (i + 1 in posArray) {
            if (!directionArray[i + 1]) {
                addObTask(path, i + 1);     // 这格没有direction
                break;
            }
            i += 1;
        }
    }
    return true;
}

/**
 *  尝试对穿，有2种不可穿情况
 * @param {Creep} creep 
 * @param {RoomPosition} pos  
 * @param {boolean} bypassHostileCreeps
 */
function trySwap(creep, pos, bypassHostileCreeps, ignoreCreeps) {     // ERR_NOT_FOUND开销0.00063，否则开销0.0066
    let obstacleCreeps = creep.room.lookForAt(LOOK_CREEPS, pos).concat(creep.room.lookForAt(LOOK_POWER_CREEPS, pos));
    if (obstacleCreeps.length) {
        if (!ignoreCreeps) {
            return ERR_INVALID_TARGET;
        }
        for (let c of obstacleCreeps) {
            if (c.my) {
                if (c.memory.dontPullMe) {    // 第1种不可穿情况：挡路的creep设置了不对穿
                    return ERR_INVALID_TARGET;
                }
                if (creepMoveCache[c.name] != Game.time && originMove.call(c, getDirection(pos, creep.pos)) == ERR_NO_BODYPART && creep.pull) {
                    creep.pull(c);
                    originMove.call(c, creep);
                }
            } else if (bypassHostileCreeps && (!c.room.controller || !c.room.controller.my || !c.room.controller.safeMode)) {  // 第二种不可穿情况：希望绕过敌对creep
                return ERR_INVALID_TARGET;
            }
        }
        return OK;    // 或者全部操作成功
    }
    return ERR_NOT_FOUND // 没有creep
}

let temporalAvoidFrom, temporalAvoidTo;
function routeCallback(nextRoomName, fromRoomName) {    // 避开avoidRooms设置了的
    if (nextRoomName in avoidRooms) {
        //console.log('Infinity at ' + nextRoomName);
        return Infinity;
    }
    return isHighWay(nextRoomName) ? 1 : 1.15;
}
function bypassRouteCallback(nextRoomName, fromRoomName) {
    if (fromRoomName == temporalAvoidFrom && nextRoomName == temporalAvoidTo) {
        //console.log(`Infinity from ${fromRoomName} to ${nextRoomName}`);
        return Infinity;
    }
    return routeCallback(nextRoomName);
}
/**
 *  遇到跨房寻路，先以房间为单位寻route，再寻精细的path
 * @param {string} fromRoomName 
 * @param {string} toRoomName 
 * @param {boolean} bypass
 */
function findRoute(fromRoomName, toRoomName, bypass) {  // TODO 以后跨shard寻路也放在这个函数里
    //console.log('findRoute', fromRoomName, toRoomName, bypass);
    return Game.map.findRoute(fromRoomName, toRoomName, { routeCallback: bypass ? bypassRouteCallback : routeCallback });
}

/**
 * @param {RoomPosition} pos
 * @param {Room} room 
 * @param {CostMatrix} costMat 
 */
function checkTemporalAvoidExit(pos, room, costMat) {    // 用于记录因creep堵路导致的房间出口临时封闭
    let neighbors = Game.map.describeExits(room.name);
    temporalAvoidFrom = temporalAvoidTo = '';   // 清空旧数据
    for (let direction in neighbors) {
        if (!(neighbors[direction] in avoidRooms)) {
            for (let direction in neighbors) {
                let exits = room.find(+direction);
                if (PathFinder.search(pos, exits, {
                    maxRooms: 1,
                    roomCallback: () => costMat
                }).incomplete) {    // 此路不通
                    temporalAvoidFrom = room.name;
                    temporalAvoidTo = neighbors[direction];
                }
            }
        }
    }
}
function routeReduce(temp, item) {
    temp[item.room] = 1;
    return temp;
}
function bypassHostile(creep) {
    return !creep.my || creep.memory.dontPullMe;
}
function bypassMy(creep) {
    return creep.my && creep.memory.dontPullMe;
}
let bypassRoomName, bypassCostMat, bypassIgnoreCondition, userCostCallback, costMat, route;
function bypassRoomCallback(roomName) {
    if (roomName in avoidRooms) {
        return false;
    }
    if (roomName == bypassRoomName) {     // 在findTemporalRoute函数里刚刚建立了costMatrix
        costMat = bypassCostMat;
    } else {
        costMat = roomName in costMatrixCache ? costMatrixCache[roomName][findPathIgnoreCondition] : emptyCostMatrix;
    }

    if (userCostCallback) {
        let resultCostMat = userCostCallback(roomName, roomName in costMatrixCache ? costMat.clone() : new PathFinder.CostMatrix);
        if (resultCostMat instanceof PathFinder.CostMatrix) {
            costMat = resultCostMat;
        }
    }
    return costMat;
}
function bypassRoomCallbackWithRoute(roomName) {
    if (roomName in route) {
        if (roomName == bypassRoomName) {     // 在findTemporalRoute函数里刚刚建立了costMatrix
            costMat = bypassCostMat;
        } else {
            costMat = roomName in costMatrixCache ? costMatrixCache[roomName][findPathIgnoreCondition] : emptyCostMatrix;
        }

        if (userCostCallback) {
            let resultCostMat = userCostCallback(roomName, roomName in costMatrixCache ? costMat.clone() : new PathFinder.CostMatrix);
            if (resultCostMat instanceof PathFinder.CostMatrix) {
                costMat = resultCostMat;
            }
        }
        return costMat;
    }
    return false;
}
/**
 *  影响参数：bypassHostileCreeps, ignoreRoads, ignoreDestructibleStructures, ignoreSwamps, costCallback, range, bypassRange
 *  及所有PathFinder参数：plainCost, SwampCost, masOps, maxRooms, maxCost, heuristicWeight
 * @param {Creep} creep 
 * @param {RoomPosition} toPos 
 * @param {MoveToOpts} ops 
 */
function findTemporalPath(creep, toPos, ops) {
    let nearbyCreeps;
    if (ops.ignoreCreeps) { // 有ignoreCreep，只绕过无法对穿的creep
        nearbyCreeps = creep.pos.findInRange(FIND_CREEPS, ops.bypassRange, {
            filter: ops.bypassHostileCreeps ? bypassHostile : bypassMy
        }).concat(creep.pos.findInRange(FIND_POWER_CREEPS, ops.bypassRange, {
            filter: ops.bypassHostileCreeps ? bypassHostile : bypassMy
        }));
    } else {    // 绕过所有creep
        nearbyCreeps = creep.pos.findInRange(FIND_CREEPS, ops.bypassRange).concat(
            creep.pos.findInRange(FIND_POWER_CREEPS, ops.bypassRange)
        );
    }
    if (!(creep.room.name in costMatrixCache)) { // 这个房间的costMatrix已经被删了
        generateCostMatrix(creep.room, creep.pos);
    }
    bypassIgnoreCondition = !!ops.ignoreDestructibleStructures;
    /** @type {CostMatrix} */
    bypassCostMat = costMatrixCache[creep.room.name][bypassIgnoreCondition].clone();
    for (let c of nearbyCreeps) {
        bypassCostMat.set(c.pos.x, c.pos.y, 255);
    }
    bypassRoomName = creep.room.name;
    userCostCallback = typeof ops.costCallback == 'function' ? ops.costCallback : undefined;

    /**@type {PathFinderOpts} */
    let PathFinderOpts = {
        maxRooms: ops.maxRooms,
        maxCost: ops.maxCost,
        heuristicWeight: ops.heuristicWeight || 1.2
    };
    if (ops.ignoreSwamps) {   // HELP 这里有没有什么不增加计算量的简短写法
        PathFinderOpts.plainCost = ops.plainCost;
        PathFinderOpts.swampCost = ops.swampCost || 1;
    } else if (ops.ignoreRoads) {
        PathFinderOpts.plainCost = ops.plainCost;
        PathFinderOpts.swampCost = ops.swampCost || 5;
    } else {
        PathFinderOpts.plainCost = ops.plainCost || 2;
        PathFinderOpts.swampCost = ops.swampCost || 10;
    }

    if (creep.pos.roomName != toPos.roomName) { // findRoute会导致非最优path的问题
        checkTemporalAvoidExit(creep.pos, creep.room, bypassCostMat);   // 因为creep挡路导致的无法通行的出口
        route = findRoute(creep.pos.roomName, toPos.roomName, true);
        if (route == ERR_NO_PATH) {
            return false;
        }
        PathFinderOpts.maxRooms = PathFinderOpts.maxRooms || route.length + 1;
        PathFinderOpts.maxOps = ops.maxOps || 2000 + route.length ** 2 * 100;  // 跨10room则有2000+10*10*100=12000
        route = route.reduce(routeReduce, { [creep.pos.roomName]: 1 });     // 因为 key in Object 比 Array.includes(value) 快，但不知道值不值得reduce
        PathFinderOpts.roomCallback = bypassRoomCallbackWithRoute;
    } else {
        PathFinderOpts.maxOps = ops.maxOps;
        PathFinderOpts.roomCallback = bypassRoomCallback;
    }

    let result = PathFinder.search(creep.pos, { pos: toPos, range: ops.range }, PathFinderOpts).path;
    if (result.length) {
        let creepCache = creepPathCache[creep.name];
        creepCache.path = {     // 弄个新的自己走，不修改公用的缓存路，只会用于正向走所以也不需要start属性，idx属性会在startRoute中设置
            end: formalize(result[result.length - 1]),
            posArray: result,
            ignoreStructures: !!ops.ignoreDestructibleStructures
        };
        generateDirectionArray(creepCache.path);
        return true;
    }
    return false;
}

let findPathIgnoreCondition;
/**
 * @param {{[roomName:string]:1}} temp 
 * @param {{room:string}} item 
 * @returns {{[roomName:string]:1}}
 */
function roomCallback(roomName) {
    if (roomName in avoidRooms) {
        return false;
    }

    costMat = roomName in costMatrixCache ? costMatrixCache[roomName][findPathIgnoreCondition] : emptyCostMatrix;
    if (userCostCallback) {
        let resultCostMat = userCostCallback(roomName, roomName in costMatrixCache ? costMat.clone() : new PathFinder.CostMatrix);
        if (resultCostMat instanceof PathFinder.CostMatrix) {
            costMat = resultCostMat;
        }
    }
    return costMat;
}
function roomCallbackWithRoute(roomName) {
    if (roomName in route) {
        costMat = roomName in costMatrixCache ? costMatrixCache[roomName][findPathIgnoreCondition] : emptyCostMatrix;
        //console.log('in route ' + roomName);
        if (userCostCallback) {
            let resultCostMat = userCostCallback(roomName, roomName in costMatrixCache ? costMat.clone() : new PathFinder.CostMatrix);
            if (resultCostMat instanceof PathFinder.CostMatrix) {
                costMat = resultCostMat;
            }
        }
        return costMat;
    }
    //console.log('out route ' + roomName);
    return false;   // 不在route上的不搜索
}
/**
 *  影响参数：ignoreRoads, ignoreDestructibleStructures, ignoreSwamps, costCallback, range
 *  及所有PathFinder参数：plainCost, SwampCost, masOps, maxRooms, maxCost, heuristicWeight
 * @param {RoomPosition} fromPos 
 * @param {RoomPosition} toPos 
 * @param {MoveToOpts} ops 
 */
function findPath(fromPos, toPos, ops) {

    if (!(fromPos.roomName in costMatrixCache) && fromPos.roomName in Game.rooms) {   // 有视野没costMatrix
        generateCostMatrix(Game.rooms[fromPos.roomName], fromPos);
    }

    findPathIgnoreCondition = !!ops.ignoreDestructibleStructures;
    userCostCallback = typeof ops.costCallback == 'function' ? ops.costCallback : undefined;

    /**@type {PathFinderOpts} */
    let PathFinderOpts = {
        maxRooms: ops.maxRooms,
        maxCost: ops.maxCost,
        heuristicWeight: ops.heuristicWeight || 1.2
    };
    if (ops.ignoreSwamps) {   // HELP 这里有没有什么不增加计算量的简短写法
        PathFinderOpts.plainCost = ops.plainCost;
        PathFinderOpts.swampCost = ops.swampCost || 1;
    } else if (ops.ignoreRoads) {
        PathFinderOpts.plainCost = ops.plainCost;
        PathFinderOpts.swampCost = ops.swampCost || 5;
    } else {
        PathFinderOpts.plainCost = ops.plainCost || 2;
        PathFinderOpts.swampCost = ops.swampCost || 10;
    }

    if (fromPos.roomName != toPos.roomName) {   // findRoute会导致非最优path的问题
        route = findRoute(fromPos.roomName, toPos.roomName);
        if (route == ERR_NO_PATH) {
            return { path: [] };
        }
        PathFinderOpts.maxOps = ops.maxOps || 2000 + route.length ** 2 * 100;  // 跨10room则有2000+10*10*50=7000
        PathFinderOpts.maxRooms = PathFinderOpts.maxRooms || route.length + 1;
        route = route.reduce(routeReduce, { [fromPos.roomName]: 1 });   // 因为 key in Object 比 Array.includes(value) 快，但不知道值不值得reduce
        //console.log(fromPos + ' using route ' + JSON.stringify(route));
        PathFinderOpts.roomCallback = roomCallbackWithRoute;
    } else {
        PathFinderOpts.maxOps = ops.maxOps;
        PathFinderOpts.roomCallback = roomCallback;
    }

    return PathFinder.search(fromPos, { pos: toPos, range: ops.range }, PathFinderOpts);
}

let combinedX, combinedY;
/**
 * @param {MyPath} newPath 
 */
function addPathIntoCache(newPath) {
    combinedX = newPath.start.x + newPath.start.y;
    combinedY = newPath.end.x + newPath.end.y;
    if (!(combinedX in globalPathCache)) {
        globalPathCache[combinedX] = {
            [combinedY]: []  // 数组里放不同ops的及其他start、end与此对称的
        };
    } else if (!(combinedY in globalPathCache[combinedX])) {
        globalPathCache[combinedX][combinedY] = [];      // 数组里放不同ops的及其他start、end与此对称的
    }
    globalPathCache[combinedX][combinedY].push(newPath);
}

function invalidate() {
    return 0;
}
/**
 * @param {MyPath} path 
 */
function deletePath(path) {
    if (path.start) {     // 有start属性的不是临时路
        let pathArray = globalPathCache[path.start.x + path.start.y][path.end.x + path.end.y];
        pathArray.splice(pathArray.indexOf(path), 1);
        path.posArray = path.posArray.map(invalidate);
    }
}

let minX, maxX, minY, maxY;
/**
 *  寻找房内缓存路径，起始位置两步限制避免复用非最优路径
 * @param {RoomPosition} formalFromPos 
 * @param {RoomPosition} formalToPos
 * @param {RoomPosition} fromPos
 * @param {CreepPaths} creepCache 
 * @param {MoveToOpts} ops 
 */
function findShortPathInCache(formalFromPos, formalToPos, fromPos, creepCache, ops) {     // ops.range设置越大找的越慢
    startCacheSearch = Game.cpu.getUsed();
    minX = formalFromPos.x + formalFromPos.y - 2;
    maxX = formalFromPos.x + formalFromPos.y + 2;
    minY = formalToPos.x + formalToPos.y - 1 - ops.range;
    maxY = formalToPos.x + formalToPos.y + 1 + ops.range;
    for (combinedX = minX; combinedX <= maxX; combinedX++) {
        if (combinedX in globalPathCache) {
            for (combinedY = minY; combinedY <= maxY; combinedY++) {
                if (combinedY in globalPathCache[combinedX]) {
                    for (let path of globalPathCache[combinedX][combinedY]) {     // 这个数组应该会很短
                        if (isNear(path.start, formalFromPos) && isNear(fromPos, path.posArray[1]) && inRange(path.end, formalToPos, ops.range) && isSameOps(path, ops)) {     // 找到路了
                            creepCache.path = path;
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

/**
 *  寻找跨房缓存路径，允许起始位置少量的误差
 * @param {RoomPosition} formalFromPos
 * @param {RoomPosition} formalToPos
 * @param {CreepPaths} creepCache
 * @param {MoveToOpts} ops
 */
function findLongPathInCache(formalFromPos, formalToPos, creepCache, ops) {     // ops.range设置越大找的越慢
    startCacheSearch = Game.cpu.getUsed();
    minX = formalFromPos.x + formalFromPos.y - 2;
    maxX = formalFromPos.x + formalFromPos.y + 2;
    minY = formalToPos.x + formalToPos.y - 1 - ops.range;
    maxY = formalToPos.x + formalToPos.y + 1 + ops.range;
    for (combinedX = minX; combinedX <= maxX; combinedX++) {
        if (combinedX in globalPathCache) {
            for (combinedY = minY; combinedY <= maxY; combinedY++) {
                if (combinedY in globalPathCache[combinedX]) {
                    for (let path of globalPathCache[combinedX][combinedY]) {     // 这个数组应该会很短
                        if (isNear(path.start, formalFromPos) && inRange(path.end, formalToPos, ops.range) && isSameOps(path, ops)) {     // 找到路了
                            creepCache.path = path;
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

let startRoomName, endRoomName;
/**
 *  起止点都在自己房间的路不清理
 * @param {CreepPaths['name']} creepCache 
 */
function setPathTimer(creepCache) {
    {
        let posArray = creepCache.path.posArray;
        startRoomName = posArray[0].roomName;
        endRoomName = posArray[posArray.length - 1].roomName;
        if (startRoomName != endRoomName || (startRoomName in Game.rooms && Game.rooms[startRoomName].controller && !Game.rooms[startRoomName].controller.my)) {    // 跨房路或者敌方房间路
            if (!(Game.time + pathClearDelay in pathCacheTimer)) {
                pathCacheTimer[Game.time + pathClearDelay] = [];
            }
            pathCacheTimer[Game.time + pathClearDelay].push(creepCache.path);
            creepCache.path.lastTime = Game.time;
        }
    }
}

/**@type {RoomPosition[]} */
let tempArray = [];
/**
 *  
 * @param {Creep} creep 
 * @param {RoomPosition} toPos 
 * @param {RoomPosition[]} posArray 
 * @param {number} startIdx 
 * @param {number} idxStep 
 * @param {PolyStyle} visualStyle 
 */
function showVisual(creep, toPos, posArray, startIdx, idxStep, visualStyle) {
    tempArray.length = 0;
    tempArray.push(creep.pos);
    let thisRoomName = creep.room.name;
    _.defaults(visualStyle, defaultVisualizePathStyle);
    for (let i = startIdx; i in posArray && posArray[i].roomName == thisRoomName; i += idxStep) {
        tempArray.push(posArray[i]);
    }
    if (toPos.roomName == thisRoomName) {
        tempArray.push(toPos);
    }
    creep.room.visual.poly(tempArray, visualStyle);
}

/**
 *  按缓存路径移动
 * @param {Creep} creep 
 * @param {PolyStyle} visualStyle 
 * @param {RoomPosition} toPos 
 */
function moveOneStep(creep, visualStyle, toPos) {
    let creepCache = creepPathCache[creep.name];
    if (visualStyle) {
        showVisual(creep, toPos, creepCache.path.posArray, creepCache.idx, 1, visualStyle);
    }
    if (creep.fatigue) {
        return ERR_TIRED;
    }
    creepCache.idx++;
    creepMoveCache[creep.name] = Game.time;
    Game.cpu.getUsed() - startTime;
    //creep.room.visual.circle(creepCache.path.posArray[creepCache.idx]);
    return originMove.call(creep, creepCache.path.directionArray[creepCache.idx]);
}

/**
 * 
 * @param {Creep} creep 
 * @param {{
        path: MyPath,
        dst: RoomPosition,
        idx: number
    }} pathCache 
 * @param {PolyStyle} visualStyle 
 * @param {RoomPosition} toPos 
 * @param {boolean} ignoreCreeps
 */
function startRoute(creep, pathCache, visualStyle, toPos, ignoreCreeps) {
    let posArray = pathCache.path.posArray;

    let idx = 0;
    while (idx in posArray && isNear(creep.pos, posArray[idx])) {
        idx += 1;
    }
    idx -= 1;
    pathCache.idx = idx;

    if (visualStyle) {
        showVisual(creep, toPos, posArray, idx, 1, visualStyle);
    }
    creepMoveCache[creep.name] = Game.time;

    let nextStep = posArray[idx];
    if (ignoreCreeps) {
        trySwap(creep, nextStep, false, true);
    }
    return originMove.call(creep, getDirection(creep.pos, posArray[idx]));
}

/**
 * @param {Function} fn 
 */
function wrapFn(fn, name) {
    return function () {
        startTime = Game.cpu.getUsed();     // 0.0015cpu
        if (obTick < Game.time) {
            obTick = Game.time;
            checkObResult();
            doObTask();
        }
        let code = fn.apply(this, arguments);
        Game.cpu.getUsed();
        return code;
    }
}

function clearUnused() {
    if (Game.time % pathClearDelay == 0) { // 随机清一次已死亡creep
        for (let name in creepPathCache) {
            if (!(name in Game.creeps)) {
                delete creepPathCache[name];
            }
        }
    }
    for (let time in pathCacheTimer) {
        if (time > Game.time) {
            break;
        }
        //console.log('clear path');
        for (let path of pathCacheTimer[time]) {
            if (path.lastTime == time - pathClearDelay) {
                deletePath(path);
            }
        }
        delete pathCacheTimer[time];
    }
    for (let time in costMatrixCacheTimer) {
        if (time > Game.time) {
            break;
        }
        //console.log('clear costMat');
        for (let data of costMatrixCacheTimer[time]) {
            delete costMatrixCache[data.roomName];
            for (let avoidRoomName of data.avoids) {
                delete avoidRooms[avoidRoomName];
            }
        }
        delete costMatrixCacheTimer[time];
    }
}

/***************************************
 *  功能实现
 */

const defaultVisualizePathStyle = { fill: 'transparent', stroke: '#fff', lineStyle: 'dashed', strokeWidth: .15, opacity: .1 };
/**@type {[MoveToOpts, RoomPosition, CreepPaths['1'], MyPath, number, RoomPosition[], boolean]}
*/
let [ops, toPos, creepCache, path, idx, posArray, found] = [];
/**
 *  把moveTo重写一遍
 * @param {Creep} this
 * @param {number | RoomObject} firstArg 
 * @param {number | MoveToOpts} secondArg 
 * @param {MoveToOpts} opts 
 */
function betterMoveTo(firstArg, secondArg, opts) {
    if (!this.my) {
        return ERR_NOT_OWNER;
    }

    if (this.spawning) {
        return ERR_BUSY;
    }

    if (typeof firstArg == 'object') {
        toPos = firstArg.pos || firstArg;
        ops = secondArg || {};
    } else {
        toPos = { x: firstArg, y: secondArg, roomName: this.room.name };
        ops = opts || {};
    }
    ops.bypassHostileCreeps = ops.bypassHostileCreeps === undefined || ops.bypassHostileCreeps;    // 设置默认值为true
    ops.ignoreCreeps = ops.ignoreCreeps === undefined || ops.ignoreCreeps;

    if (typeof toPos.x != "number" || typeof toPos.y != "number") {   // 房名无效或目的坐标不是数字，不合法
        //this.say('no tar');
        return ERR_INVALID_TARGET;
    } else if (inRange(this.pos, toPos, ops.range || 1)) {   // 已到达
        if (isEqual(toPos, this.pos) || ops.range) {  // 已到达
            return OK;
        } // else 走一步
        if (this.pos.roomName == toPos.roomName && ops.ignoreCreeps) {    // 同房间考虑一下对穿
            trySwap(this, toPos, false, true);
        }
        creepMoveCache[this.name] = Game.time;      // 用于防止自己移动后被误对穿
        Game.cpu.getUsed() - startTime;
        return originMove.call(this, getDirection(this.pos, toPos));
    }
    ops.range = ops.range || 1;

    if (!hasActiveBodypart(this.body, MOVE)) {
        return ERR_NO_BODYPART;
    }

    if (this.fatigue) {
        if (!ops.visualizePathStyle) {    // 不用画路又走不动，直接return
            return ERR_TIRED;
        } // else 要画路，画完再return
    }

    // HELP：感兴趣的帮我检查这里的核心逻辑orz
    creepCache = creepPathCache[this.name];
    if (creepCache) {  // 有缓存
        path = creepCache.path;
        idx = creepCache.idx;
        if (path && idx in path.posArray && path.ignoreStructures == !!ops.ignoreDestructibleStructures) {  // 缓存路条件相同
            posArray = path.posArray;
            if (isEqual(toPos, creepCache.dst) || inRange(posArray[posArray.length - 1], toPos, ops.range)) {   // 正向走，目的地没变
                if (isEqual(this.pos, posArray[idx])) {    // 正常
                    if ('storage' in this.room && inRange(this.room.storage.pos, this.pos, coreLayoutRange) && ops.ignoreCreeps) {
                        if (trySwap(this, posArray[idx + 1], false, true) == OK) ;
                    }
                    //this.say('正常');
                    return moveOneStep(this, ops.visualizePathStyle, toPos);
                } else if (idx + 1 in posArray && idx + 2 in posArray && isEqual(this.pos, posArray[idx + 1])) {  // 跨房了
                    creepCache.idx++;
                    if (!path.directionArray[idx + 2]) {  // 第一次见到该房则检查房间
                        if (checkRoom(this.room, path, creepCache.idx)) {   // 传creep所在位置的idx
                            //this.say('新房 可走');
                            //console.log(`${Game.time}: ${this.name} check room ${this.pos.roomName} OK`);
                            return moveOneStep(this, ops.visualizePathStyle, toPos);  // 路径正确，继续走
                        }   // else 检查中发现房间里有建筑挡路，重新寻路
                        //console.log(`${Game.time}: ${this.name} check room ${this.pos.roomName} failed`);
                        deletePath(path);
                    } else {
                        //this.say('这个房间见过了');
                        return moveOneStep(this, ops.visualizePathStyle, toPos);  // 路径正确，继续走
                    }
                } else if (isNear(this.pos, posArray[idx])) {  // 堵路了
                    let code = trySwap(this, posArray[idx], ops.bypassHostileCreeps, ops.ignoreCreeps);  // 检查挡路creep
                    if (code == OK) ; else if (code == ERR_INVALID_TARGET) {   // 是被设置了不可对穿的creep或者敌对creep挡路，临时绕路
                        ops.bypassRange = ops.bypassRange || 5; // 默认值
                        if (typeof ops.bypassRange != "number" || typeof ops.range != 'number') {
                            return ERR_INVALID_ARGS;
                        }
                        if (findTemporalPath(this, toPos, ops)) { // 有路，creepCache的内容会被这个函数更新
                            //this.say('开始绕路');
                            return startRoute(this, creepCache, ops.visualizePathStyle, toPos, ops.ignoreCreeps);
                        } else {  // 没路
                            //this.say('没路啦');
                            return ERR_NO_PATH;
                        }
                    } else if (code == ERR_NOT_FOUND && isObstacleStructure(this.room, posArray[idx], ops.ignoreDestructibleStructures)) {   // 发现出现新建筑物挡路，删除costMatrix和path缓存，重新寻路
                        //console.log(`${Game.time}: ${this.name} find obstacles at ${this.pos}`);
                        delete costMatrixCache[this.pos.roomName];
                        deletePath(path);
                    } // else 上tick移动失败但也不是建筑物和creep/pc挡路。有2个情况：1.下一格路本来是穿墙路并碰巧消失了；2.下一格是房间出口，有另一个creep抢路了然后它被传送到隔壁了。不处理第1个情况，按第2个情况对待。
                    //this.say('对穿' + getDirection(this.pos, posArray[idx]) + '-' + originMove.call(this, getDirection(this.pos, posArray[idx])));
                    if (ops.visualizePathStyle) {
                        showVisual(this, toPos, posArray, idx, 1, ops.visualizePathStyle);
                    }
                    creepMoveCache[this.name] = Game.time;
                    return originMove.call(this, getDirection(this.pos, posArray[idx]));  // 有可能是第一步就没走上路or通过略过moveTo的move操作偏离路线，直接call可兼容
                } else if (idx - 1 >= 0 && isNear(this.pos, posArray[idx - 1])) {  // 因为堵路而被自动传送反向跨房了
                    //this.say('偏离一格');
                    if (this.pos.roomName == posArray[idx - 1].roomName && ops.ignoreCreeps) {    // 不是跨房而是偏离，检查对穿
                        trySwap(this, posArray[idx - 1], false, true);
                    }
                    if (ops.visualizePathStyle) {
                        showVisual(this, toPos, posArray, idx, 1, ops.visualizePathStyle);
                    }
                    creepMoveCache[this.name] = Game.time;
                    return originMove.call(this, getDirection(this.pos, posArray[idx - 1]));    // 同理兼容略过moveTo的move
                } // else 彻底偏离，重新寻路
            } // else 目的地变了
        } // else 缓存中没路或者条件变了
    } // else 需要重新寻路，先找缓存路，找不到就寻路

    if (!creepCache) {    // 初始化cache
        creepCache = {
            dst: { x: NaN, y: NaN },
            path: undefined,
            idx: 0
        };
        creepPathCache[this.name] = creepCache;
    } else {
        creepCache.path = undefined;
    }

    if (typeof ops.range != 'number') {
        return ERR_INVALID_ARGS
    }

    found = this.pos.roomName == toPos.roomName ? findShortPathInCache(formalize(this.pos), formalize(toPos), this.pos, creepCache, ops) : findLongPathInCache(formalize(this.pos), formalize(toPos), creepCache, ops);
    if (found) ; else {  // 没找到缓存路

        if (autoClearTick < Game.time) {  // 自动清理
            autoClearTick = Game.time;
            clearUnused();
        }

        let result = findPath(this.pos, toPos, ops);
        if (!result.path.length || (result.incomplete && result.path.length == 1)) {     // 一步也动不了了
            //this.say('no path')
            return ERR_NO_PATH;
        }
        result = result.path;
        result.unshift(this.pos);

        //this.say('start new');
        let newPath = {
            start: formalize(result[0]),
            end: formalize(result[result.length - 1]),
            posArray: result,
            ignoreRoads: !!ops.ignoreRoads,
            ignoreStructures: !!ops.ignoreDestructibleStructures,
            ignoreSwamps: !!ops.ignoreSwamps
        };
        generateDirectionArray(newPath);
        addPathIntoCache(newPath);
        //console.log(this, this.pos, 'miss');
        creepCache.path = newPath;
    }

    creepCache.dst = toPos;
    setPathTimer(creepCache);

    found ? cacheHitCost += Game.cpu.getUsed() - startCacheSearch : cacheMissCost += Game.cpu.getUsed() - startCacheSearch;

    return startRoute(this, creepCache, ops.visualizePathStyle, toPos, ops.ignoreCreeps);
}

/***************************************
 *  初始化
 *  Creep.prototype.move()将在v0.9.x版本加入
 *  ob寻路、自动visual将在v0.9.x或v1.0.x版本加入
 *  RoomPosition.prototype.findClosestByPath()将在v1.1加入
 *  Creep.prototype.flee()、RoomPosition.prototype.findSquadPathTo()函数将在v1.1或v1.2加入
 *  checkSquadPath()有小概率会写
 */
avoidRooms = avoidRooms.reduce((temp, roomName) => {
    temp[roomName] = 1;
    return temp;
}, {});

observers = observers.reduce((temp, id) => {
    let ob = Game.getObjectById(id);
    if (ob && ob.observeRoom && ob.my) {
        temp.push({ id, roomName: ob.room.name, taskQueue: [] });
    }
    return temp;
}, []);

// Creep.prototype.move = wrapFn(config.changeMove? betterMove : originMove, 'move');
Creep.prototype.moveTo = wrapFn(betterMoveTo );

function factory_initialization () {
    clog('【挂载拓展】【完成】 Time ' + Game.time);
    clog("【脚本加载】 Time " + Game.time + " , bucket " + Game.cpu.bucket);

    clog("【初始化】【开始】 Time " + Game.time);

    // 客户端汉化显示
    // Utils.cn();
    clog('【提示】: 手动汉化输入【Utils.cn();】');

    if (!Memory.rooms) {
        Memory.rooms = {
            source: {},
            controller: {}
        };
    }

    for (let name in Game.creeps) {
        if (!Game.creeps[name].memory.id) Game.creeps[name].memory.id = Game.creeps[name].id;
    }

    // 全局数据初始化
    iniglobalData();

    let roomName = globalData.rooms[0].name;

    iniRoom(roomName);

    clog("【初始化】【结束】 Time " + Game.time);
}

function iniRoom(roomName) {
    if (!Memory.rooms[roomName]) {
        Memory.rooms[roomName] = {};
    }

    // 能量源区块初始化
    iniSource(roomName);

    // 控制器块初始化
    iniController(roomName);
}

// 全局数据初始化
function iniglobalData() {
    let username = '';
    if (Game.spawns.length > 0) username = Game.spawns[0].owner.username;
    if (username) {
        globalData.username = username;
    }

    let rooms = {};
    _.forEach(Game.spawns, spawn => {
        let roomName = spawn.room.name;
        if (!rooms[roomName].spawns) rooms[roomName].spawns = [];
        rooms[roomName].spawns.push({
            name: spawn.name
        });
    });

    _.forEach(Game.rooms, room => {
        const globalDataRoomIndex = _.findIndex(globalData.rooms, (value) => value.name === room.name);
        let globalDataRoom = {};
        if (globalDataRoomIndex == -1) {
            globalDataRoom = {
                name: room.name,
                spawns: rooms[roomName].spawns
            };
        } else {
            globalDataRoom = globalData.rooms[globalDataRoomIndex];

            // 基地配置
            if (!globalDataRoom.spawns) globalDataRoom.spawns = [];
            let spawns = globalDataRoom.spawns;
            // 合并 过滤已存在
            spawns = _.unionBy(spawns, rooms[roomName].spawns);
            globalDataRoom.spawns = spawns;
        }
        // 房间配置
        if (globalData.roomsAllAllocation.on) {
            // 合并 覆盖
            globalDataRoom = _.merge(globalDataRoom, globalData.roomsAllAllocation.content);
        } else {
            // 合并 过滤已存在
            globalDataRoom = _.mergeWith(globalDataRoom, globalData.roomsAllAllocation.content, function (objValue, srcValue) {
                // 如果目标对象中已经有这个键，则保留原值
                if (!_.isUndefined(objValue)) {
                    return objValue;
                }
            });
        }
        if (globalDataRoomIndex == -1) {
            globalData.rooms.push(globalDataRoom);
        } else {
            globalData.globalData.rooms[globalDataRoomIndex] = globalDataRoom;
        }


    });


}

// 能量源区块初始化
function iniSource(roomName) {
    if (!Memory.rooms[roomName].source) {
        Memory.rooms[roomName].source = {};
    }
}

// 控制器块初始化
function iniController(roomName) {
    if (!Memory.rooms[roomName].controller) {
        Memory.rooms[roomName].controller = {};
    }

    let room = factory.room.nameGet(roomName);
    let roomSequence = factory.room.nameGetSequence(roomName);

    // 自动分配建设控制器区的CONTAINER
    if (globalData.rooms[roomSequence - 1].AutomaticAssignControllerCONTAINER) {
        // 9*9范围自动生成CONTAINER
        let pos = room.controller.pos;
        let found = room.lookAtArea(pos.y - 1, pos.x - 1, pos.y + 1,
            pos.x + 1, true);
        // 筛选出平原和沼泽非墙壁
        let foundFilter = _.filter(found, (f) =>
            (f.terrain == 'plain' || f.terrain == 'swamp') &&
            (f.type == LOOK_STRUCTURES ? f.structure.structureType != STRUCTURE_WALL : true));
        if (foundFilter.length > 0) {
            // 是否已经存在CONTAINER或在建的CONTAINER
            let found2 = _.filter(found, (f) => f.type == LOOK_CONSTRUCTION_SITES || (f.type == LOOK_STRUCTURES && f
                .structure.structureType == STRUCTURE_CONTAINER));
            if (found2.length < 1) {
                let x = foundFilter[0].x;
                let y = foundFilter[0].y;
                // 指定位置创建一个新的 ConstructionSite
                let returnData = room.createConstructionSite(x, y, STRUCTURE_CONTAINER);
                if (returnData == OK) {
                    clog('自动建造对应数量的CONTAINER 房间', roomName, ' x', x, ' y', y, returnData);
                } else {
                    clog('自动建造对应数量的CONTAINER 房间', roomName, ' x', x, ' y', y, returnData);
                    Memory.rooms[roomName].controller = {
                        container: {
                            x: x,
                            y: y,
                            id: null,
                            // 运输者的ID列表
                            list: []
                        }
                    };
                }
            }
        }
    }

}

// -------------------------------初始化
global.factory = {};
global.controller = {};

factory_initialization();

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
    return assignTask();
};

/**
 * 控制器 任务
 */
function controller_task () {

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

        factory.creep.Harvest.ALL(roomName);
        factory.creep.Upgrader.ALL(roomName);
        factory.creep.Builder.ALL(roomName);
        factory.creep.Carrier.ALL(roomName);
        factory.creep.Repairer.ALL(roomName);
        factory.creep.Defender.ALLNearDefender(roomName);
        factory.creep.Defender.ALLFarDefender(roomName);
        factory.creep.TheHealer.ALL(roomName);
        factory.creep.Occupier.ALL(roomName);

        // 我方血少的CREEPS
        const myCreepHitsF = room.find(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.hits < object.hitsMax;
            }
        });
        myCreepHitsF.sort((a, b) => a.hits - b.hits);

        // 敌方CREEPS
        room.find(FIND_HOSTILE_CREEPS);

        // 所有掉落的资源
        room.find(FIND_DROPPED_RESOURCES);

        // 墓碑
        const tombstones = room.find(FIND_TOMBSTONES, {
            filter: (structure) => {
                return (structure.store.getUsedCapacity() > 0);
            }
        });
        tombstones.sort((a, b) => a.ticksToDecay - b.ticksToDecay);

        // 控制器升级
        room.controller;

        // 控制器CONTAINER能量供给运输

        // 能量源采集
        room.find(FIND_SOURCES);

        // 能量源CONTAINER能量搬运

        // 矿采集
        room.find(FIND_MINERALS);

        // 矿CONTAINER资源搬运


    });
}

var factory_Secure = {
    run: (roomName) => {
        let room = factory.room.nameGet(roomName);

        var hostiles = room.find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            // 统计分别有哪些用户
            let usernameList = [];
            _.forEach(hostiles, hostile => {
                usernameList.push(hostile.owner.username);
            });
            // 去重
            usernameList = _.uniq(usernameList);
            let usernameListString = '';
            _.forEach(usernameList, username => {
                usernameListString += '【' + username + '】';
            });
            Utils.notify(`发现用户${usernameListString}派CREEPS到【${roomName}】房间中`);
        }

        // 查找针对您的 creep 和建筑的所有敌对行动
        let eventLog = room.getEventLog();
        let attackEvents = _.filter(eventLog, {
            event: EVENT_ATTACK
        });
        let attackMy = false;
        let textAll = '';
        attackEvents.forEach(event => {
            // 事件者ID
            let objectId = event.objectId;
            // 造成的 hit 伤害量
            let damage = event.data.damage;
            // 目标对象ID
            let targetId = event.data.targetId;


            let target = Game.getObjectById(targetId);
            let structureType, x, y;
            if (target) {
                try {
                    x = target.pos.x;
                    y = target.pos.y;
                } catch (e) {
                    //TODO handle the exception
                }
                try {
                    structureType = target.structureType;
                } catch (e) {
                    //TODO handle the exception
                }
            }
            // console.log(JSON.stringify(Game.getObjectById('')))

            let initiate = Game.getObjectById(objectId);
            let username;
            if (initiate) {
                try {
                    username = initiate.owner.username;
                } catch (e) {
                    //TODO handle the exception
                }
            }

            if (target && target.my) {
                attackMy = true;
                clog('房间' + roomName, '正在受到伤害', JSON.stringify(event));

                let text = '【';
                // if (type) text += '类型' + type + ' ';
                if (structureType) text += 'structureType' + structureType + ' ';
                if (damage) text += '受到伤害量' + damage + ' ';
                if (x) text += 'x' + x + ' ';
                if (y) text += 'y' + y + ' ';
                if (username) text += '对方用户名称' + username + ' ';
                text += '】';
                textAll += text;

                if (!Memory.attackEventsList) Memory.attackEventsList = [];
                let time = Game.time;
                Memory.attackEventsList.push({
                    targetId: targetId,
                    time: time
                });
            }
        });

        let objectDestroyedMy = false;
        // 一个游戏对象被摧毁或是被消灭
        let objectDestroyedEvents = _.filter(eventLog, {
            event: EVENT_OBJECT_DESTROYED
        });
        if (objectDestroyedEvents.length > 0) {
            objectDestroyedEvents.forEach(event => {
                // 事件者ID
                let objectId = event.objectId;

                let time = Game.time;
                if (!Memory.attackEventsList) Memory.attackEventsList = [];
                let attackEventsList = Memory.attackEventsList;
                for (var i = 0; i < attackEventsList.length; i++) {
                    if (attackEventsList[i].targetId == objectId) {
                        if (time - attackEventsList[i].time <= 5 && event.data.type != 'creep') {
                            objectDestroyedMy = true;
                            break;
                        }
                    }
                }
                // 清理超时的记录
                let attackEventsList2 = [];
                for (var i = 0; i < attackEventsList.length; i++) {
                    if (time - attackEventsList[i].time <= 5) {
                        attackEventsList2.push(attackEventsList[i]);
                    }
                }
                Memory.attackEventsList = attackEventsList2;
            });
        }

        if (attackEvents.length > 0 && attackMy) {
            Utils.notify(`【${roomName}】房间,正在遭受攻击 ` + textAll);
        }

        if (objectDestroyedMy) {
            let on = false;
            if (room.name == globalData.rooms[0].name && globalData.rooms[0].AutomaticSecurity) {
                on = true;
            } else if (room.name == globalData.rooms[1].name && globalData.rooms[1]
                .AutomaticSecurity) {
                on = true;
            } else if (room.name == globalData.rooms[2].name && globalData.rooms[2]
                .AutomaticSecurity) {
                on = true;
            }
            if (on) {
                // 开启安全模式
                let returnData = room.controller.activateSafeMode();
                if (returnData == OK) {
                    Utils.notify(`【${roomName}】房间,开启安全模式【成功】`);
                } else if (returnData == ERR_BUSY) {
                    Utils.notify(`【${roomName}】房间,开启安全模式【失败】,已经有其他房间处于安全模式下了`);
                } else if (returnData == ERR_NOT_ENOUGH_RESOURCES) {
                    Utils.notify(`【${roomName}】房间,开启安全模式【失败】,没有足够的可用激活次数`);
                } else if (returnData == ERR_TIRED) {
                    Utils.notify(
                        `【${roomName}】房间,开启安全模式【失败】,上一个安全模式仍在冷却中，或者控制器正处于 upgradeBlocked 状态，或者控制器的降级计时器已经超过了 50% + 5000 tick 甚至更久`
                    );
                } else {
                    Utils.notify(`【${roomName}】房间,开启安全模式【失败】,未知原因${returnData}`);
                }
            }
        }
    }
};

var factory_Tower = {
    run: (roomName) => {
        let room = factory.room.nameGet(roomName);

        const targets = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER;
            }
        });
        if (targets.length) {
            const storages = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_STORAGE;
                }
            });
            let storageClosestTower;
            if (storages.length > 0) {
                storageClosestTower = storages[0].pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TOWER;
                    }
                });
            }
            _.forEach(targets, target => {
                if (storageClosestTower && storageClosestTower.id == target.id) {
                    work(target, 1);
                } else {
                    work(target);
                }

                // const source = Game.getObjectById('65b28bef2bc6bc6a1b1bbf53');
                // target.attack(source);
            });
        }
    }
};

function work(tower, type) {
    // 攻击 先攻击治疗
    let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: (structure) => {
            let on = false;
            let body = structure.body;
            for (var i = 0; i < body.length; i++) {
                if (body[i].type == HEAL) {
                    on = true;
                    break
                }
            }
            return on;
        }
    });
    if (!closestHostile) {
        closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    }
    if (closestHostile) {
        tower.attack(closestHostile);
        return
    }

    // 治疗
    let closestMYCreep = tower.room.find(FIND_MY_CREEPS, {
        filter: function (object) {
            return object.hits < object.hitsMax;
        }
    });

    closestMYCreep.sort((a, b) => a.hits - b.hits);

    if (closestMYCreep.length > 0) {
        // 治疗
        tower.heal(closestMYCreep[0]);
        return;
    }

    if (type == 1) {
        // 维修
        let targets = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.hits < structure.hitsMax;
            }
        });
        // 可通行墙壁
        if (targets.length < 1) {
            targets = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_RAMPART) &&
                        structure.hits < structure.hitsMax &&
                        structure.hits < 100 * 10000 * 1;
                }
            });
        }
        // 路
        if (targets.length < 1) {
            targets = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_ROAD) &&
                        structure.hits < structure.hitsMax;
                }
            });
        }
        // 墙壁
        if (targets.length < 1) {
            targets = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL) &&
                        structure.hits < structure.hitsMax &&
                        structure.hits < 100 * 10000 * 1;
                }
            });
        }
        if (targets.length < 1) {
            targets = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.hits < structure.hitsMax &&
                        structure.structureType != STRUCTURE_WALL &&
                        structure.structureType != STRUCTURE_RAMPART;
                }
            });
        }
        targets.sort((a, b) => a.hits - b.hits);
        if (targets.length > 0) {
            tower.repair(targets[0]);
        }
    }

}

var factory_room = {
    nameGet: (name) => {
        return Game.rooms[name];
    },
    sequenceGet: (sequence) => {
        return Game.rooms[factory.room.sequenceGetName(sequence)];
    },
    nameGetSequence: (name) => {
        let sequence = _.findIndex(globalData.rooms, (room) => room.name == name);
        if (sequence == -1) {
            return 1;
        }
        return sequence + 1;
    },
    sequenceGetName: (sequence) => {
        if (sequence > globalData.rooms.length || sequence < 1) {
            return globalData.rooms[0].name;
        }
        return globalData.rooms[sequence - 1].name;
    }
};

// 采集
var factory_creep_Harvest = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // work && 背包为空
        if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.work = false;
            creep.say('🔄 收获');
        }
        // 非work状态 && 背包满(空余为0)
        if (!creep.memory.work && creep.store.getFreeCapacity() == 0) {
            creep.memory.work = true;
            creep.say('🛒 存放');
        }

        let roomName = creep.room.name;
        let roomSequence = factory.room.nameGetSequence(roomName);

        // 没带carry部件或者满了，再采集能量会自动掉脚下，如果脚下有容器就会自动进容器
        // 脚下是否有CONTAINER，有就不移动
        let on = false;
        let targetPos = new RoomPosition(creep.pos.x, creep.pos.y, creep.room.name);
        let found = creep.room.lookForAt(LOOK_STRUCTURES, targetPos);
        if (found.length && found[0].structureType == STRUCTURE_CONTAINER && found[0].store.getFreeCapacity(
            RESOURCE_ENERGY) > 0) {
            on = true;
        }

        if (!creep.memory.work || on) {
            let sources = creep.room.find(FIND_SOURCES);
            // 默认去采集第一个source
            let source = sources.length > 0 ? sources[0] : null;

            // 自动分配能量源区
            if (globalData.rooms[roomSequence - 1].AutomaticAssignHarvest) {
                // 没有分配到的Source

                // 根据9*9计算能量源区地形分配数量 只计算一次缓存后固定
                // try {
                // 	if (!Memory.rooms[roomName].source.list) {}
                // } catch (e) {
                // 	Memory.rooms[roomName].source.list = {};
                // }
                if (!Memory.rooms[roomName].source ? true : !Memory.rooms[roomName].source.list) {

                    // 网上贡献的方法
                    // let zb=creep.room.find(FIND_SOURCES).pos;
                    // let dix=_.filter(creep.room.lookAtArea(LOOK_TERRAIN,zb.y-1,zb.x-1,zb.y+1,zb.x+1,1,(f)=>f.terrain=='plain' 8& creep.room.lookAt(f.pos)[0].structureType!-STRUCTURE_WALL).length)

                    let memorySource = {};
                    const terrain = new Room.Terrain(creep.room.name);
                    let total = 0;
                    for (let i = 0; i < sources.length; i++) {
                        let val = sources[i];
                        let num = 0;
                        // 空地XY坐标列表
                        let spaceXYList = [];
                        let x;
                        let x_ini = x = val.pos.x - 1;
                        let y = val.pos.y - 1;
                        for (let i2 = 0; i2 < 3; i2++) {
                            x = x_ini;
                            for (let i3 = 0; i3 < 3; i3++) {
                                if (terrain.get(x, y) != TERRAIN_MASK_WALL) {
                                    // console.log(x, y)
                                    let on = true;
                                    let targetPos = new RoomPosition(x, y, creep.room.name);
                                    // 人造墙壁
                                    let found = creep.room.lookForAt(LOOK_STRUCTURES, targetPos);
                                    // console.log(found, ' found[1] +', found[1], "+")
                                    if (found.length && found[0].structureType == STRUCTURE_WALL) {
                                        on = false;
                                    }
                                    // const look = creep.room.lookAt(targetPos);
                                    // look.forEach(function(lookObject) {
                                    // 	// 人造墙壁
                                    // 	if (lookObject.type != LOOK_STRUCTURES && lookObject[
                                    // 			LOOK_STRUCTURES][1] != '(constructedWall)') {
                                    // 		console.log(x, y)
                                    // 		on = true;
                                    // 	}
                                    // });
                                    if (on) {
                                        num++;
                                        spaceXYList.push({
                                            x: x,
                                            y: y,
                                            // 如果存在CONTAINER记录允许运输列表
                                            list: [],
                                            // 当前坐标是否存在CONTAINER
                                            containerID: null
                                        });

                                        // 自动建造对应数量的CONTAINER
                                        if (globalData.rooms[roomSequence - 1].AutomaticAssignHarvestCONTAINER) {
                                            let on = true;
                                            // 已经存在有建筑了跳过
                                            if (found.length) {
                                                on = false;
                                                // console.log('found',found);

                                                // 已经存在CONTAINER就跳过
                                                // if (found[0].structureType != STRUCTURE_CONTAINER) {
                                                // 	on = false;
                                                // }
                                            }
                                            if (on) {
                                                // 指定位置创建一个新的 ConstructionSite
                                                let returnData = factory.room.nameGet(roomName)
                                                    .createConstructionSite(x, y, STRUCTURE_CONTAINER);
                                                if (returnData == OK) {
                                                    clog('自动建造对应数量的CONTAINER 房间', roomName, ' x', x, ' y', y,
                                                        returnData);
                                                } else {
                                                    clog('自动建造对应数量的CONTAINER 房间', roomName, ' x', x, ' y', y,
                                                        returnData);
                                                }
                                                // OK	0	这个操作已经成功纳入计划。
                                                // ERR_NOT_OWNER	-1	该房间被敌对玩家占领（claim）或预定（reserve）。
                                                // ERR_INVALID_TARGET	-7	T该建筑无法被放置在指定位置。
                                                // ERR_FULL	-8	你已经放置了太多建筑工地。其上限为 100。
                                                // ERR_INVALID_ARGS	-10	不正确的位置。
                                                // ERR_RCL_NOT_ENOUGH	-14	房间控制器级别不足。
                                            }
                                        }
                                    }
                                }
                                x++;
                            }
                            y++;
                        }

                        total += num;
                        memorySource[val.id] = {
                            // 允许采集记录列表
                            list: [],
                            // 允许采集数量
                            harvestNum: num,
                            // 空地XY坐标列表
                            spaceXYList: spaceXYList
                        };
                    }
                    Memory.rooms[roomName].source = {
                        list: memorySource,
                        // 允许采集总数
                        total: total
                    };
                    // 根据最大支持数量动态更新采集者数量
                    if (globalData.creepConfigs.harvest.AutomaticAssignNum) {
                        globalData.creepConfigs.harvest.number = total;
                    }
                }

                let memorySource = Memory.rooms[roomName].source.list;
                if (memorySource) {
                    if (!creep.memory.harvestSourceID) {
                        // 找出没有被分配完的能量源区
                        let memorySourceListNull = null;
                        for (let val in memorySource) {
                            if (memorySource[val].list.length < 1) {
                                memorySourceListNull = val;
                                break;
                            }
                        }
                        for (let val in memorySource) {
                            // 找到空闲能量源区，优先分配给没有分配数量的能量源区
                            if (memorySourceListNull && val != memorySourceListNull) continue;
                            if (memorySource[val].list.length < memorySource[val].harvestNum) {
                                // 把creep ID记录到能量源区
                                memorySource[val].list.push(creep.name);
                                // 把能量源区ID记录到creep
                                creep.memory.harvestSourceID = val;

                                Memory.rooms[roomName].source.list = memorySource;
                                clog('房间', roomName, ' ', creep.name, '已自动分配给能量源区', val);
                                break;
                            }
                        }
                    }

                    // 找出已经分配的能量源区消息
                    for (let i = 0; i < sources.length; i++) {
                        if (sources[i].id == creep.memory.harvestSourceID) {
                            // 检查是否在能量源区记录中
                            let memorySourceList = memorySource[sources[i].id].list;
                            let on = false;
                            for (let i2 = 0; i2 < memorySourceList.length; i2++) {
                                if (memorySourceList[i2] == creep.name) {
                                    on = true;
                                    break
                                }
                            }
                            if (on) {
                                // 合法记录在能量源区
                                source = sources[i];
                            } else {
                                // 不合法,移除
                                creep.memory.harvestSourceID = null;
                            }
                            break
                        }
                    }

                    if (source) {
                        if (source.id != creep.memory.harvestSourceID) ;
                    }
                }

            }

            if (source) {
                // 采集能量
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    factory.creep.moveTo(creep, source, 'Resource');
                }
            }
        } else {
            // 至少留下一个运输到基地
            let harvestBuildCONTAINERList;
            let on = false;
            try {
                if (!Memory.rooms[roomName].source.harvestBuildCONTAINERList) Memory.rooms[roomName].source
                    .harvestBuildCONTAINERList = {};
                harvestBuildCONTAINERList = Memory.rooms[roomName].source.harvestBuildCONTAINERList;
                on = true;
            } catch (e) {
                //TODO handle the exception
            }
            if (on) {
                // 脚下是否有CONTAINER没有建造完成,就优先建筑
                let targetPos = new RoomPosition(creep.pos.x, creep.pos.y, creep.room.name);
                let found = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, targetPos);
                if (found.length && found[0].structureType == STRUCTURE_CONTAINER) {
                    harvestBuildCONTAINERList[creep.name] = true;
                } else {
                    harvestBuildCONTAINERList[creep.name] = false;
                    harvestBuildCONTAINERList = _.omit(harvestBuildCONTAINERList, creep.name);
                }
                Memory.rooms[roomName].source.harvestBuildCONTAINERList = harvestBuildCONTAINERList;
                const harvests = factory.creep.Harvest.ALL(roomName);
                if (_.size(harvestBuildCONTAINERList) < harvests.length) {
                    if (harvestBuildCONTAINERList[creep.name]) {
                        // 建造
                        if (creep.build(found[0]) == ERR_NOT_IN_RANGE) {
                            factory.creep.moveTo(creep, found[0]);
                        }
                        return
                    }
                } else {
                    if (harvestBuildCONTAINERList[creep.name]) {
                        harvestBuildCONTAINERList[creep.name] = false;
                        harvestBuildCONTAINERList = _.omit(harvestBuildCONTAINERList, creep.name);

                        Memory.rooms[roomName].source.harvestBuildCONTAINERList = harvestBuildCONTAINERList;
                    }
                }
            }


            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    // 返回该存储的剩余可用容量大于0的CONTAINER
                    return (
                            // structure.structureType == STRUCTURE_EXTENSION ||
                            // structure.structureType == STRUCTURE_SPAWN ||
                            // structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            let target = null;
            if (targets.length > 0) {
                // _.find(targets, (val) => creep.pos.getRangeTo(val)<=3)
                target = function (targets) {
                    let val0range;
                    for (let i = 0; i < targets.length; i++) {
                        let val = targets[i];
                        // 获取到指定位置的线性范围。
                        const range = creep.pos.getRangeTo(val);
                        // 先记录一下,避免后续重复消耗CPU
                        if (i == 0) val0range = range;
                        // 脚下的CONTAINER
                        if (range <= 1) return val;
                        // 扩大成周边范围
                        if (range <= 3) return val;
                    }
                    // 周边找不到CONTAINER,默认第一个，如果范围大于就不前往
                    return val0range < 5 ? targets[0] : null;
                }(targets);
            }
            if (!target) {
                // CONTAINER满了或者没有建  查找到该位置路径最短的对象
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        // 返回该存储的剩余可用容量大于0的CONTAINER
                        return (
                                structure.structureType == STRUCTURE_EXTENSION ||
                                // ||structure.structureType == STRUCTURE_TOWER
                                structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }
            if (!target) {
                // CONTAINER满了或者没有建  查找到该位置路径最短的对象
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        // 返回该存储的剩余可用容量大于0的CONTAINER
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            }
            if (target) {
                // 将资源从该 creep 转移至其他对象
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    factory.creep.moveTo(creep, target);
                }
            } else {
                // 储存能量都满了不用搬运能量,先干其他
                let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length > 0) {
                    // 建造
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        factory.creep.moveTo(creep, targets[0]);
                    }
                }
                if (targets.length < 1) {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: object => object.hits < object.hitsMax
                    });
                    targets.sort((a, b) => a.hits - b.hits);
                    if (targets.length > 0) {
                        // 维修
                        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                            factory.creep.moveTo(creep, targets[0]);
                        }
                    }
                }
                if (targets.length < 1) {
                    // 升级
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        factory.creep.moveTo(creep, creep.room.controller);
                    }
                }
            }
        }
    },
    ALL: (...e) => {
        return all$6(...e);
    }
};

function all$6(roomName) {
    let returnData;

    if (roomName) {
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.harvest && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.harvest);
    }
    return returnData;
}

// 升级
var factory_creep_Upgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // 升级状态&&能量不足的时候，变为采集者
            creep.memory.work = false;
            creep.say('🔄 采集');
        }
        if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非升级状态&&能量满的时候，变为升级状态
            creep.memory.work = true;
            creep.say('⚡ 升级');
        }

        let roomName = creep.room.name;

        if (creep.memory.work) { // 升级状态，找到控制器并升级 + 可视化
            if (!creep.room.controller.sign) {
                // 对控制器签名
                if (creep.signController(creep.room.controller, "peaceful development.") ==
                    ERR_NOT_IN_RANGE) {
                    factory.creep.moveTo(creep, creep.room.controller);
                }
            } else {
                if (creep.room.controller.sign.username != globalData.username) {
                    // 对控制器签名
                    if (creep.signController(creep.room.controller, "peaceful development.") ==
                        ERR_NOT_IN_RANGE) {
                        factory.creep.moveTo(creep, creep.room.controller);
                    }
                } else {
                    // 升级
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        factory.creep.moveTo(creep, creep.room.controller);
                    }
                }
            }

        } else { // 采集状态 + 可视化
            const harvests = factory.creep.Harvest.ALL(roomName);
            if (harvests.length < 1) {
                // 采集死完后,自己去采集
                let target = creep.pos.findClosestByPath(FIND_SOURCES);
                if (target) {
                    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        factory.creep.moveTo(creep, target, 'Resource');
                    }
                }
            } else {
                let target;

                let memoryControllerContainer;
                let on = false;
                try {
                    memoryControllerContainer = Memory.rooms[roomName].controller.container;
                    on = true;
                } catch (e) {
                    //TODO handle the exception
                }
                if (on && memoryControllerContainer && memoryControllerContainer.id) {
                    target = Game.getObjectById(memoryControllerContainer.id);
                    if (target.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                        target = null;
                    }
                }

                if (!target) {
                    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            // 找出有储存能量的container搬运
                            return (structure.structureType == STRUCTURE_CONTAINER) &&
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                            // return (structure.structureType == STRUCTURE_CONTAINER ||
                            // 		structure.structureType == STRUCTURE_EXTENSION ||
                            // 		(structure.structureType == STRUCTURE_SPAWN &&
                            // 			structure.store.getUsedCapacity(RESOURCE_ENERGY) > 250) ||
                            // 		structure.structureType == STRUCTURE_TOWER) &&
                            // 	structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                }
                if (!target) {
                    // 找不到可搬运的地方,从基地搬运
                    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            // 找出有储存能量的container搬运
                            return (structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 200;
                        }
                    });
                }
                if (!target) {
                    // 找不到可搬运的地方,从基地搬运
                    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            // 找出有储存能量的container搬运
                            return (structure.structureType == STRUCTURE_EXTENSION) &&
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                }
                if (!target) {
                    // 采集死完后,自己去采集
                    target = creep.pos.findClosestByPath(FIND_SOURCES);
                    if (target) {
                        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                            // 向目标移动
                            factory.creep.moveTo(creep, target, 'Resource');
                        }
                        return
                    }
                }

                if (target) {
                    // 从建筑(structure)中拿取资源
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        factory.creep.moveTo(creep, target, 'Resource');
                    }
                }
            }
        }
    },
    ALL: (...e) => {
        return all$5(...e);
    }
};

function all$5(roomName) {
    let returnData;

    if (roomName) {
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.upgrader && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.upgrader);
    }
    return returnData;
}


// /**
//  * 升级者配置生成器
//  * source: 从指定矿中挖矿
//  * target: 将其转移到指定的 roomController 中
//  *
//  * @param sourceId 要挖的矿 id
//  */
// module.exports = sourceId => ({
//     // 采集能量矿
//     source: creep => {
//         const source = Game.getObjectById(sourceId)
//         if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source)

//         // 自己身上的能量装满了，返回 true（切换至 target 阶段）
//         return creep.store.getFreeCapacity() <= 0
//     },
//     // 升级控制器
//     target: creep => {
//         const controller = creep.room.controller
//         if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) creep.moveTo(controller)

//         // 自己身上的能量没有了，返回 true（切换至 source 阶段）
//         return creep.store[RESOURCE_ENERGY] <= 0
//     }
// })

// 建造
var factory_creep_Builder = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // work && 背包为空
			creep.memory.work = false; // 变为 非work状态
			creep.say('🔄 收获');
		}
		if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非work状态 && 背包满(空余为0)
			creep.memory.work = true; // 变为 work状态
			creep.say('🚧 建造');
		}

		let roomName = creep.room.name;

		if (creep.memory.work) { // work状态的时候
			// 寻找建筑位
			// 路
			let targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_ROAD;
				}
			});
			// 墙壁
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_WALL;
					}
				});
			}
			// 小型储存能量
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_EXTENSION;
					}
				});
			}
			// 中型储存能量
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_CONTAINER;
					}
				});
			}
			if (targets.length < 1) {
				targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			}

			if (targets.length > 0) { // targets.length > 0  || 建筑位 > 0
				// 建造
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					factory.creep.moveTo(creep, targets[0]);
				}
			} else {
				// 不用建造了,先干其他
				let targets = creep.room.find(FIND_STRUCTURES, {
					filter: object => object.hits < object.hitsMax
				});
				targets.sort((a, b) => a.hits - b.hits);
				if (targets.length > 0) {
					// 维修
					if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
						factory.creep.moveTo(creep, targets[0]);
					}
				}
				
				if (targets.length < 1) {
					// 升级
					if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
						factory.creep.moveTo(creep, creep.room.controller);
					}
				}
			}
		} else { // 非work状态的时候， 到source旁边并采集
			const harvests = factory.creep.Harvest.ALL(roomName);
			if (harvests.length < 1) {
				// 采集死完后,自己去采集
				let target = creep.pos.findClosestByPath(FIND_SOURCES);
				if (target) {
					if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
						factory.creep.moveTo(creep, target, 'Resource');
					}
				}

			} else {
				let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (structure) => {
						// 找出有储存能量的container搬运
						return (structure.structureType == STRUCTURE_CONTAINER) &&
							structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
						// return (structure.structureType == STRUCTURE_CONTAINER ||
						// 		structure.structureType == STRUCTURE_EXTENSION ||
						// 		(structure.structureType == STRUCTURE_SPAWN &&
						// 			structure.store.getUsedCapacity(RESOURCE_ENERGY) > 250) ||
						// 		structure.structureType == STRUCTURE_TOWER) &&
						// 	structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
					}
				});
				if (!target) {
					// 找不到可搬运的地方,从基地搬运
					target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_SPAWN) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 200;
						}
					});
				}
				if (!target) {
					// 找不到可搬运的地方,从基地搬运
					target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
						filter: (structure) => {
							// 找出有储存能量的container搬运
							return (structure.structureType == STRUCTURE_EXTENSION) &&
								structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
						}
					});
				}
				if (!target) {
					// 采集死完后,自己去采集
					target = creep.pos.findClosestByPath(FIND_SOURCES);
					if (target) {
						if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
							// 向目标移动
							factory.creep.moveTo(creep, target, 'Resource');
						}
						return
					}
				}

				if (target) {
					// 从建筑(structure)中拿取资源
					if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						// 向目标移动
						factory.creep.moveTo(creep, target, 'Resource');
					}
				}
			}
		}
	},
	ALL: (...e) => {
		return all$4(...e);
	}
};

function all$4(roomName) {
	let returnData;

	if (roomName) {
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.builder && creep.memory
			.roomName == roomName));
	} else {
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.builder);
	}
	return returnData;
}

// 运输者
var factory_creep_Carrier = {

    /** @param {Creep} creep **/
    run: function (creep) {
        // work && 背包为空
        if (creep.memory.work && creep.store.getUsedCapacity() == 0) {
            creep.memory.work = false;
            creep.say('🔄 收获');
        }
        // 非work状态 && 背包满(空余为0)
        if (!creep.memory.work && creep.store.getFreeCapacity() == 0) {
            creep.memory.work = true;
            creep.say('🛒 存放');
        }

        // 房间序号
        let roomName = creep.room.name;

        if (!creep.memory.work) {
            // 所有掉落的资源
            let target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            // const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            // if(target)
            if (target) {
                // 捡起一个物品 (如捡起一些能量)
                if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    // 向目标移动
                    factory.creep.moveTo(creep, target, 'Resource');
                }
            } else {
                // 墓碑
                target = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                    filter: (structure) => {
                        return (structure.store.getUsedCapacity() > 0);
                    }
                });
                if (target) {
                    for (const resourceType in target.store) {
                        if (creep.withdraw(target, resourceType) == ERR_NOT_IN_RANGE) {
                            // 向目标移动
                            factory.creep.moveTo(creep, target, 'Resource');
                            break;
                        }
                    }
                    return;
                }

                let source = null;
                // 能量源区CONTAINER是否1v1运送
                if (globalData.creepConfigs.carrier.sourceContainer1v1 && Memory.rooms[roomName].source) {
                    let memorySource = Memory.rooms[roomName].source.list;
                    // source周边的空地是否存在CONTAINER
                    for (let val in memorySource) {
                        // 空地XY坐标列表
                        let spaceXYList = memorySource[val].spaceXYList;
                        for (let i = 0; i < spaceXYList.length; i++) {
                            let x = spaceXYList[i].x;
                            let y = spaceXYList[i].y;
                            let targetPos = new RoomPosition(x, y, creep.room.name);
                            // CONTAINER
                            let found = creep.room.lookForAt(LOOK_STRUCTURES, targetPos);
                            if (found.length && found[0].structureType == STRUCTURE_CONTAINER) {
                                spaceXYList[i].containerID = found[0].id;
                            } else {
                                // 如果不存在CONTAINER就清除CONTAINERID
                                spaceXYList[i].containerID = null;

                                // 是否有正在建造的CONSTRUCTION
                                let found = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, targetPos);
                                if (found.length && found[0].structureType != STRUCTURE_CONTAINER) {
                                    // 指定位置创建一个新的 ConstructionSite
                                    let returnData = factory.room.nameGet(roomName)
                                        .createConstructionSite(x, y, STRUCTURE_CONTAINER);
                                    if (returnData != OK) {
                                        clog('能量源区自动建造对应数量的CONTAINER 房间', roomName, ' x', x, ' y', y,
                                            returnData);
                                    } else {
                                        clog('能量源区自动建造对应数量的CONTAINER 房间', roomName, ' x', x, ' y', y,
                                            returnData);
                                    }
                                }
                            }
                        }
                        memorySource[val].spaceXYList = spaceXYList;
                    }

                    let TransportationTarget = creep.memory.TransportationTarget;
                    if (!TransportationTarget) {
                        // 找出没有被分配完的CONTAINER
                        let memoryContainerListNull = null;
                        for (let val in memorySource) {
                            let spaceXYList = memorySource[val].spaceXYList;
                            for (let i = 0; i < spaceXYList.length; i++) {
                                try {
                                    if (spaceXYList[i].list.length < 1) {
                                        memoryContainerListNull = i;
                                        ok = true;
                                        break;
                                    }
                                } catch (e) {
                                    //TODO handle the exception
                                    spaceXYList[i].list = [];
                                }
                            }
                        }
                        for (let val in memorySource) {
                            // 找到空闲CONTAINER，优先分配给没有分配数量的CONTAINER
                            let on = false;
                            let spaceXYList = memorySource[val].spaceXYList;
                            for (let i = 0; i < spaceXYList.length; i++) {
                                let containerID = spaceXYList[i].containerID;
                                if (memoryContainerListNull && containerID != spaceXYList[
                                    memoryContainerListNull].containerID) continue;
                                if (spaceXYList[i].list.length < 1) {
                                    // 把creep ID记录到能量源区CONTAINER
                                    spaceXYList[i].list.push(creep.name);
                                    // 把能量源区ID记录到creep
                                    creep.memory.TransportationTarget = {
                                        id: containerID,
                                        type: 'Source'
                                    };

                                    Memory.rooms[roomName].source.list[val].spaceXYList = spaceXYList;
                                    on = true;
                                    clog('房间', roomName, ' ', creep.name, '已自动分配给能量源区', val, "Container",
                                        spaceXYList[i].containerID);
                                    break;
                                }
                            }
                            if (on) break;
                        }
                    }

                    // 找出已经分配的能量源区消息
                    TransportationTarget = creep.memory.TransportationTarget;
                    if (TransportationTarget && TransportationTarget.type ==
                        'Source') {
                        let targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return structure.structureType == STRUCTURE_CONTAINER;
                            }
                        });
                        for (let i = 0; i < targets.length; i++) {
                            if (targets[i].id == TransportationTarget.id) {
                                // 检查是否在能量源区CONTAINER记录中
                                let on = false;
                                for (let val in memorySource) {
                                    let spaceXYList = memorySource[val].spaceXYList;
                                    for (let i2 = 0; i2 < spaceXYList.length; i2++) {
                                        for (let i3 = 0; i3 < spaceXYList[i2].list.length; i3++) {
                                            if (spaceXYList[i2].list[i3] == creep.name) {
                                                on = true;
                                                break
                                            }
                                        }
                                        if (on) break;
                                    }
                                    if (on) break;
                                }
                                if (on) {
                                    // 合法记录在能量源区CONTAINER
                                    source = targets[i];
                                } else {
                                    // 不合法,移除
                                    creep.memory.TransportationTarget = null;
                                }
                            }
                        }
                    }

                    if (source) {
                        if (TransportationTarget && source.id != TransportationTarget.id &&
                            TransportationTarget == 'Source') ;
                    }
                }

                if (!source) {
                    // 所有建筑 去除控制器Container
                    let memoryControllerContainer;
                    let on = false;
                    try {
                        memoryControllerContainer = Memory.rooms[roomName].controller.container;
                        on = true;
                    } catch (e) {

                    }
                    if (on && memoryControllerContainer && memoryControllerContainer.id) {
                        on = true;
                    } else {
                        on = false;
                    }
                    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            // 找出有储存能量的container搬运
                            return (structure.structureType == STRUCTURE_CONTAINER ||
                                    structure.structureType == STRUCTURE_STORAGE) &&
                                (on ? structure.id != memoryControllerContainer.id : true) &&
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100;
                        }
                    });
                    let targets = [];
                    if (target) {
                        targets.push(target);
                    }
                    targets = targets.concat(
                        // 所有废墟
                        creep.room.find(FIND_RUINS, {
                            filter: (structure) => {
                                return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                            }
                        }),
                    );
                    if (targets.length > 0) {
                        source = targets[0];
                    }
                }

                if (source) {
                    // 从建筑(structure)中拿取资源
                    if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        factory.creep.moveTo(creep, source, 'Resource');
                    }
                } else {
                    // 找不到可取资源的地方,先去存资源
                    transfer(creep);
                }
            }
        } else {
            // 背包满了,先去存资源
            transfer(creep);
        }
    },
    ALL: (...e) => {
        return all$3(...e);
    }
};

function all$3(roomName) {
    let returnData;

    if (roomName) {
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.carrier && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.carrier);
    }
    return returnData;
}

function transfer(creep) {
    let roomName = creep.room.name;

    // 给控制器CONTAINER,运输能量
    if (transferControllerContainer(creep)) return;
    // 给Tower,运输能量
    // if (transferTower(creep)) return;

    // 找出需要补充能量的建筑
    // let targets = creep.room.find(FIND_STRUCTURES, {
    // 	filter: (structure) => {
    // 		// 找出需要储存能量
    // 		return (structure.structureType == STRUCTURE_TOWER) &&
    // 			structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    // 	}
    // });
    // if (targets.length < 1) {

    // }
    let targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            // 找出需要储存能量
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if (targets.length < 1) {
        targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                // 找出需要储存能量
                return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > structure.store.getCapacity(
                        RESOURCE_ENERGY) / 3;
            }
        });
    }
    if (targets.length < 1) {
        targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                // 找出需要储存能量
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        // 去除能量源区的CONTAINER
        let targets2 = [];
        let memorySource = Memory.rooms[roomName].source.list;
        for (let i = 0; i < targets.length; i++) {
            let on = false;
            // 能量源区的CONTAINER
            for (let val in memorySource) {
                let spaceXYList = memorySource[val].spaceXYList;
                for (let i2 = 0; i2 < spaceXYList.length; i2++) {
                    if (spaceXYList[i2].x == targets[i].pos.x && spaceXYList[i2].y == targets[i].pos.y) {
                        // targets2.splice(i, 1);
                        on = true;
                        break;
                    }
                }
                if (on) break;
            }

            if (!on) {
                targets2.push(targets[i]);
            }
        }
        targets = targets2;

        // 如果剩余数量大于1，去除控制器区的CONTAINER
        if (targets.length > 1) {
            let targets2 = [];
            let memoryControllerContainer = Memory.rooms[roomName].controller.container;
            for (var i = 0; i < targets.length; i++) {
                // 控制器区的CONTAINER
                if (targets[i].pos.x == memoryControllerContainer.x && targets[i].pos.y == memoryControllerContainer
                    .y) ; else {
                    targets2.push(targets[i]);
                }
            }
            targets = targets2;
        } else {
            if (targets.length == 1) {
                // 当控制器Container储存能量低于总量30%才运送
                if (!(targets[0].store.getFreeCapacity(RESOURCE_ENERGY) > targets[0].store.getCapacity(
                    RESOURCE_ENERGY) / 3)) {
                    targets = [];
                }
            }
        }
    }
    if (targets.length < 1) {
        targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                // 找出需要储存能量
                return (structure.structureType == STRUCTURE_STORAGE) &&
                    structure.store.getFreeCapacity() > 0;
            }
        });
    }
    if (targets.length > 0) {
        let resourceGhodium = false;
        for (const resourceType in creep.carry) {
            // console.log(resourceType)
            if (resourceType != RESOURCE_ENERGY) {
                resourceGhodium = true;
                break;
            }
        }
        if (resourceGhodium) {
            let targets2 = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store.getFreeCapacity() > 0;
                }
            });
            if (targets2.length > 0) {
                let storage = targets2[0];
                // 将资源从该 creep 转移至其他对象
                for (const resourceType in creep.carry) {
                    if (creep.transfer(storage, resourceType) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        factory.creep.moveTo(creep, storage);
                        break;
                    }
                }
                return;
            }
        }
        // 将资源从该 creep 转移至其他对象
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            // 向目标移动
            factory.creep.moveTo(creep, targets[0]);
        }
    } else {
        // 储存能量都满了不用搬运能量,先干其他
        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length > 0) {
            // 建造
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                factory.creep.moveTo(creep, targets[0]);
            }
        }
        if (targets.length < 1) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            targets.sort((a, b) => a.hits - b.hits);
            if (targets.length > 0) {
                // 维修
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    factory.creep.moveTo(creep, targets[0]);
                }
            }
        }
        if (targets.length < 1) {
            // 升级
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                factory.creep.moveTo(creep, creep.room.controller);
            }
        }

    }
}

// 控制器Container
function transferControllerContainer(creep) {
    let roomName = creep.room.name;

    // 控制器旁是否有CONTAINER或在建的CONTAINER
    if (!creep.room.controller) return false;
    if (!creep.room.controller.pos) return false;
    let pos = creep.room.controller.pos;
    let found = creep.room.lookAtArea(pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1, true);
    let found2 = _.filter(found, (f) => f.type == LOOK_CONSTRUCTION_SITES || (f.type == LOOK_STRUCTURES && f
        .structure.structureType == STRUCTURE_CONTAINER));

    let memoryControllerContainer;
    let on = false;
    try {
        memoryControllerContainer = Memory.rooms[roomName].controller.container;
        if (!memoryControllerContainer.x || !memoryControllerContainer.y) Throw.Error(
            'Memory.rooms[' + roomName + '].controller.container不存在x或y');
        on = true;
    } catch (e) {
        if (!Memory.rooms[roomName].controller) Memory.rooms[roomName].controller = {};

        if (found2.length > 0) {
            let x = found2[0].x;
            let y = found2[0].y;
            Memory.rooms[roomName].controller = {
                container: {
                    x: x,
                    y: y,
                    id: null,
                    // 运输者的ID列表
                    list: []
                }
            };
        }
    }

    if (found2.length < 1 && on && memoryControllerContainer.x && memoryControllerContainer.y) {
        // 如果不存在CONTAINER就清除CONTAINERID
        Memory.rooms[roomName].controller.container.id = null;

        let x = memoryControllerContainer.x;
        let y = memoryControllerContainer.y;
        // 指定位置创建一个新的 ConstructionSite
        let returnData = creep.room.createConstructionSite(x, y, STRUCTURE_CONTAINER);
        if (returnData != OK) {
            clog('自动建造对应数量的CONTAINER 房间', roomName, ' x', x, ' y', y, returnData);
            Memory.rooms[roomName].controller = {
                container: {
                    x: x,
                    y: y,
                    id: null,
                    // 运输者的ID列表
                    list: []
                }
            };
        }
    }

    if (memoryControllerContainer && memoryControllerContainer.id) {
        let TransportationTarget = creep.memory.TransportationTarget;
        // 没有分配运输者,进行分配
        if (memoryControllerContainer.list.length < 1) {
            if (!TransportationTarget) {
                memoryControllerContainer.list.push(creep.name);
                creep.memory.TransportationTarget = {
                    id: memoryControllerContainer.id,
                    type: 'ControllerContainer'
                };
                clog('房间', roomName, ' ', creep.name, '已自动分配给控制器Container', memoryControllerContainer.id);
            }
        }

        // 运输能量
        if (TransportationTarget && TransportationTarget.id && TransportationTarget.id == memoryControllerContainer
            .id && TransportationTarget.type == 'ControllerContainer') {
            // 检查是否在控制器CONTAINER记录中
            let on = false;
            for (let i2 = 0; i2 < memoryControllerContainer.list.length; i2++) {
                if (creep.name == memoryControllerContainer.list[i2]) {
                    on = true;
                    break;
                }
            }
            if (on) {
                // 合法记录在控制器CONTAINER
                const source = Game.getObjectById(memoryControllerContainer.id);
                // 将资源从该 creep 转移至其他对象
                if (creep.transfer(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // 向目标移动
                    factory.creep.moveTo(creep, source);
                }
                return true;
            } else {
                // 不合法,移除
                creep.memory.TransportationTarget = null;
            }
        }
    } else {
        // 存在正在建造的CONTAINER,检测是否建造完成
        let x = Memory.rooms[roomName].controller.container.x;
        let y = Memory.rooms[roomName].controller.container.y;
        let targetPos = new RoomPosition(x, y, creep.room.name);
        // CONTAINER
        let found = creep.room.lookForAt(LOOK_STRUCTURES, targetPos);
        if (found.length && found[0].structureType == STRUCTURE_CONTAINER) {
            Memory.rooms[roomName].controller.container.id = found[0].id;
        }
    }
    return false;
}

// 维修者
var factory_creep_Repairer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // work && 背包为空
            creep.memory.work = false; // 变为 非work状态
            creep.say('🔄 收获');
        }
        if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非work状态 && 背包满(空余为0)
            creep.memory.work = true; // 变为 work状态
            creep.say('🚧 维修');
        }

        let roomName = creep.room.name;

        if (creep.memory.work) { // work状态的时候
            // 修复受损建筑 优先CONTAINER
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.hits < structure.hitsMax;
                }
            });
            // 可通行墙壁
            if (targets.length < 1) {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART) &&
                            structure.hits < structure.hitsMax;
                    }
                });
            }
            // 路
            if (targets.length < 1) {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD) &&
                            structure.hits < structure.hitsMax;
                    }
                });
            }
            // 墙壁
            if (targets.length < 1) {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL) &&
                            structure.hits < structure.hitsMax;
                    }
                });
            }
            if (targets.length < 1) {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });
            }

            targets.sort((a, b) => a.hits - b.hits);

            if (targets.length > 0) {
                // 维修
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    factory.creep.moveTo(creep, targets[0]);
                }
            } else {
                // 不用维修了,先干其他
                let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length > 0) {
                    // 建造
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        factory.creep.moveTo(creep, targets[0]);
                    }
                }
                if (targets.length < 1) {
                    // 升级
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        factory.creep.moveTo(creep, creep.room.controller);
                    }
                }
            }
        } else { // 非work状态的时候， 到source旁边并采集
            const harvests = factory.creep.Harvest.ALL(roomName);
            if (harvests.length < 1) {
                // 采集死完后,自己去采集
                let target = creep.pos.findClosestByPath(FIND_SOURCES);
                if (target) {
                    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        factory.creep.moveTo(creep, target, 'Resource');
                    }
                }
            } else {
                let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        // 找出有储存能量的container搬运
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                        // return (structure.structureType == STRUCTURE_CONTAINER ||
                        // 		structure.structureType == STRUCTURE_EXTENSION ||
                        // 		(structure.structureType == STRUCTURE_SPAWN &&
                        // 			structure.store.getUsedCapacity(RESOURCE_ENERGY) > 250) ||
                        // 		structure.structureType == STRUCTURE_TOWER) &&
                        // 	structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (!target) {
                    // 找不到可搬运的地方,从基地搬运
                    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            // 找出有储存能量的container搬运
                            return (structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 200;
                        }
                    });
                }
                if (!target) {
                    // 找不到可搬运的地方,从基地搬运
                    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            // 找出有储存能量的container搬运
                            return (structure.structureType == STRUCTURE_EXTENSION) &&
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                }
                if (!target) {
                    // 采集死完后,自己去采集
                    target = creep.pos.findClosestByPath(FIND_SOURCES);
                    if (target) {
                        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                            // 向目标移动
                            factory.creep.moveTo(creep, target, 'Resource');
                        }
                        return
                    }
                }

                if (target) {
                    // 从建筑(structure)中拿取资源
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        factory.creep.moveTo(creep, target, 'Resource');
                    }
                }
            }
        }
    },
    ALL: (...e) => {
        return all$2(...e);
    }
};

function all$2(roomName) {
    let returnData;

    if (roomName) {
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.repairer && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.repairer);
    }
    return returnData;
}

// 近战和远程
var factory_creep_Defender = {
    run: (creep) => {
        if (creep.memory.role == globalData.nearDefender) {
            nearDefenderRun(creep);
        } else if (creep.memory.role == globalData.farDefender) {
            farDefenderRun(creep);
        }
    },
    ALLNearDefender: (...e) => {
        return allNearDefender(...e);
    },
    ALLFarDefender: (...e) => {
        return allFarDefender(...e);
    }
};

function allNearDefender(roomName) {
    let returnData;

    if (roomName) {
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.nearDefender && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.nearDefender);
    }
    return returnData;
}

function allFarDefender(roomName) {
    let returnData;

    if (roomName) {
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.farDefender && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.farDefender);
    }
    return returnData;
}

function nearDefenderRun(creep) {
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
        // 使用近战攻击
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            factory.creep.moveTo(creep, target);
        }
    }

}

function farDefenderRun(creep) {
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
        // 远程攻击其他 creep 或者建筑
        if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
            factory.creep.moveTo(creep, target);
        }
    }

    // const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);

    // if (targets.length > 0) {
    // 	// 3 格范围内的所有敌方 creep 和建筑进行攻击
    // 	// creep.rangedMassAttack();

    // 	// 远程攻击其他 creep 或者建筑
    // 	if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE) {
    // 		factory.creep.moveTo(creep, targets[0]);
    // 	}
    // }

}

// 治疗
var factory_creep_TheHealer = {
    run: (creep) => {
        const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.hits < object.hitsMax;
            }
        });
        if (target) {
            // 治疗
            if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                factory.creep.moveTo(creep, target);
            }
        }

    },
    ALL: (...e) => {
        return all$1(...e);
    }
};

function all$1(roomName) {
    let returnData;

    if (roomName) {
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.theHealer && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.theHealer);
    }
    return returnData;
}

// 占领
var factory_creep_Occupier = {
    run: (creep, roomName) => {
        roomName = 'W47S53';
        // 需要拥有CLAIM部件
        // Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'ee1', { memory: {}})
        // {
        // let creep = Game.creeps['ee1'];
        // creep.moveTo(new RoomPosition(25, 25, 'W48S54'));
        // let creep = Game.creeps['ee1'];
        // let room = Game.rooms['W48S54'];
        // if (creep.signController(room.controller, "I'm going to claim this room in a few days.") ==
        // 	ERR_NOT_IN_RANGE) {
        // 	creep.moveTo(room.controller);
        // }

        // factory.creep.Occupy.run(Game.creeps['builder54894683'],'W48S54');

        // 如果指定需要占领房间名称,覆盖原来的
        if (roomName) {
            creep.memory.occupyRoomName = roomName;
        }
        // 获取需要占领房间名称
        let occupyRoomName = creep.memory.occupyRoomName;
        if (!occupyRoomName) {
            // 获取不到不再执行程序
            return;
        } else {
            roomName = occupyRoomName;
        }

        let room = Game.rooms[roomName];

        // 如果该房间不存在就先往房间走
        if (!room) {
            factory.creep.moveTo(creep, new RoomPosition(43, 17, roomName));
        } else {
            // 如果房间存在了就说明已经进入了该房间
            // 移动到房间的控制器并占领
            if (creep.claimController(room.controller) == ERR_NOT_IN_RANGE) {
                factory.creep.moveTo(creep, room.controller);
            }

            // 预定控制器
            // if (creep.reserveController(room.controller) == ERR_NOT_IN_RANGE) {
            // 	creep.moveTo(room.controller);
            // }

            // 对控制器签名
            // if (creep.signController(room.controller, "I'm going to claim this room in a few days.") ==
            if (creep.signController(room.controller, "peaceful development.") ==
                ERR_NOT_IN_RANGE) {
                factory.creep.moveTo(creep, room.controller);
            }

        }

        // factory.spawn.nameGet(spawnName).spawnCreep([WORK, CARRY, MOVE, CLAIM],
        // 	'Occupy1号', {
        // 		memory: {
        // 			role: '',
        // 			SpecialActions: {
        // 				code: 'Occupy',
        // 				mgs: 'W48S54'
        // 			},
        // 		}
        // 	});

        // 因为我们的 claimer 已经在房间里了
        // 所以我们可以正常的获取该房间的对象。
        // const target = Game.getObjectById('spawn工地的id')

        // 获取能量的逻辑
        // ...

        // 建造 spawn
        // if(target) {
        //     if(creep.build(target) == ERR_NOT_IN_RANGE) {
        //         // reusePath 代表缓存的距离，默认为 5
        //         creep.moveTo(target, { reusePath: 50 })
        //     }
        // }


    },
    ALL: (...e) => {
        return all(...e);
    }
};


function all(roomName) {
    let returnData;

    if (roomName) {
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.occupier && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.occupier);
    }
    return returnData;
}

// 控制器 房间
function controller_room () {
    _.forEach(Game.rooms, room => {
        let roomName = room.name;

        // 安全
        factory_Secure.run(roomName);
        // 塔
        factory_Tower.run(roomName);

        let eventLog = room.getEventLog();
        // 建造完成 邮件提示
        let buildEvents = _.filter(eventLog, {
            event: EVENT_BUILD
        });
        if (buildEvents.length > 0) {
            buildEvents.forEach(event => {
                let target = Game.getObjectById(event.data.targetId);
                if (target && target.progress && target.progressTotal) {
                    if (target.progress + event.data.amount >= target.progressTotal) {
                        clog('房间' + roomName, '建造完成', JSON.stringify(event));
                        Utils.notify(
                            `【${roomName}】房间,id【${event.data.targetId}】${event.data.structureType} x${event.data.x} y${event.data.y}【建造】【完成】`
                        );
                        if (event.data.structureType == STRUCTURE_SPAWN) {
                            // 更新数据
                            factory_initialization.iniglobalData();
                        }
                    }
                }
            });
        }

        // 一个游戏对象被摧毁或是被消灭 邮件提示
        let objectDestroyedEvents = _.filter(eventLog, {
            event: EVENT_OBJECT_DESTROYED
        });
        if (objectDestroyedEvents.length > 0) {
            objectDestroyedEvents.forEach(event => {
                clog('房间' + roomName, '一个游戏对象被摧毁或是被消灭', JSON.stringify(event));
                if (event.data.type != 'creep') {
                    Utils.notify(
                        `【${roomName}】房间,id【${event.objectId}】${event.data.type}【被摧毁或是被消灭】`
                    );
                }

            });
        }

        // 房间显示文本
        roomVisual(roomName);
    });

    let roomName = globalData.rooms[0].name;
    let roomName2 = globalData.rooms[1].name;

    // CONTAINER+EXTENSION+STORAGE能量统计
    containerExtensionStorageEnergyStat(roomName);

    // 能量源区Container记录管理
    sourceContainer(roomName);
    // 控制器Container记录管理
    controllerContainer(roomName);
    // 采集建造CONTAINER记录管理
    harvestBuildCONTAINER(roomName);

    // 临时外部房间,升级
    upgraderOuterRoom(roomName2);
    // 临时外部房间,建造
    // builderOuterRoom(roomName2);
}


// 房间显示文本
function roomVisual(roomName) {
    let room = factory_room.nameGet(roomName);

    const harvests = factory_creep_Harvest.ALL(roomName);
    const upgraders = factory_creep_Upgrader.ALL(roomName);
    const builders = factory_creep_Builder.ALL(roomName);
    const carriers = factory_creep_Carrier.ALL(roomName);
    const repairers = factory_creep_Repairer.ALL(roomName);
    const nearDefenders = factory_creep_Defender.ALLNearDefender(roomName);
    const farDefenders = factory_creep_Defender.ALLFarDefender(roomName);
    const theHealers = factory_creep_TheHealer.ALL(roomName);
    const occupiers = factory_creep_Occupier.ALL(roomName);

    // 查看控制器等级
    const controller_level = room.controller.level;

    room.visual.text('控制器等级:' + controller_level, 1, 1, {
        align: 'left',
    });

    room.visual.text('采集者:' + harvests.length, 1, 2, {
        align: 'left',
    });
    room.visual.text('升级者:' + upgraders.length, 1, 3, {
        align: 'left'
    });
    room.visual.text('建造者:' + builders.length, 1, 4, {
        align: 'left'
    });
    room.visual.text('运输者:' + carriers.length, 1, 5, {
        align: 'left'
    });
    room.visual.text('维修者:' + repairers.length, 1, 6, {
        align: 'left'
    });
    room.visual.text('近战者:' + nearDefenders.length, 1, 7, {
        align: 'left'
    });
    room.visual.text('远战者:' + farDefenders.length, 1, 8, {
        align: 'left'
    });
    room.visual.text('治疗者:' + theHealers.length, 1, 9, {
        align: 'left'
    });
    room.visual.text('占领者:' + occupiers.length, 1, 10, {
        align: 'left'
    });
}

// 能量源区Container记录管理
function sourceContainer(roomName) {
    let memorySource;
    let on = false;
    // 如果没有合法记录会不存在harvestSourceID,报错需要捕获
    try {
        memorySource = Memory.rooms[roomName].source.list;
        on = true;
    } catch (e) {
        //TODO handle the exception
    }
    // 检查是否在能量源区CONTAINER中记录creep是否还存活
    if (on && memorySource) {
        for (let val in memorySource) {
            let spaceXYList = memorySource[val].spaceXYList;
            for (let i = 0; i < spaceXYList.length; i++) {
                let spaceXYListList2 = [];
                for (let i2 = 0; i2 < spaceXYList[i].list.length; i2++) {
                    let on = false;
                    _.forEach(Game.creeps, (creep) => {
                        if (creep.name == spaceXYList[i].list[i2]) {
                            on = true;
                            return false;
                        }
                    });
                    if (on) {
                        let creepName = spaceXYList[i].list[i2];
                        let containerID = spaceXYList[i].containerID;
                        let TransportationTarget = Game.creeps[creepName].memory.TransportationTarget;
                        if (TransportationTarget) {
                            if (TransportationTarget.id == containerID && TransportationTarget.type == 'Source') {
                                spaceXYListList2.push(creepName);
                            } else {
                                Game.creeps[creepName].memory.TransportationTarget = null;
                            }
                        }
                    }
                }
                Memory.rooms[roomName].source.list[val].spaceXYList[i].list = spaceXYListList2;
            }
        }
    }
}

// 控制器Container记录管理
function controllerContainer(roomName) {
    let memoryControllerContainer;
    let on = false;
    try {
        memoryControllerContainer = Memory.rooms[roomName].controller.container;
        on = true;
    } catch (e) {
        //TODO handle the exception
    }
    if (on && memoryControllerContainer) {
        if (memoryControllerContainer.list && memoryControllerContainer.list.length > 0) {
            // 检查是否在控制器CONTAINER中记录creep是否还存活
            let memoryControllerContainerList2 = [];
            for (let i = 0; i < memoryControllerContainer.list.length; i++) {
                let on = false;
                _.forEach(Game.creeps, (creep) => {
                    if (creep.name == memoryControllerContainer.list[i]) {
                        on = true;
                        return false;
                    }
                });
                if (on) {
                    let creepName = memoryControllerContainer.list[i];
                    let containerID = memoryControllerContainer.id;
                    let TransportationTarget = Game.creeps[creepName].memory.TransportationTarget;
                    if (TransportationTarget) {
                        if (TransportationTarget.id == containerID && TransportationTarget.type ==
                            'ControllerContainer') {
                            memoryControllerContainerList2.push(creepName);
                        } else {
                            Game.creeps[creepName].memory.TransportationTarget = null;
                        }
                    }
                }
            }
            Memory.rooms[roomName].controller.container.list = memoryControllerContainerList2;
        }
    }
}

// 采集建造CONTAINER记录管理
function harvestBuildCONTAINER(roomName) {
    let harvestBuildCONTAINERList;
    let on = false;
    try {
        if (!Memory.rooms[roomName].source.harvestBuildCONTAINERList) Memory.rooms[roomName].source
            .harvestBuildCONTAINERList = {};
        harvestBuildCONTAINERList = Memory.rooms[roomName].source.harvestBuildCONTAINERList;
        on = true;
    } catch (e) {
        //TODO handle the exception
    }

    if (on && _.size(harvestBuildCONTAINERList) > 0) {
        // 检查是否记录中的creep是否还存活
        let harvestBuildCONTAINERList2 = {};
        for (let i in harvestBuildCONTAINERList) {
            let on = false;
            _.forEach(Game.creeps, (creep) => {
                if (creep.name == i) {
                    on = true;
                    return false;
                }
            });
            if (on) harvestBuildCONTAINERList2[i] = harvestBuildCONTAINERList[i];
        }
        Memory.rooms[roomName].source.harvestBuildCONTAINERList = harvestBuildCONTAINERList2;

    }
}

// CONTAINER+EXTENSION+STORAGE能量统计
function containerExtensionStorageEnergyStat(roomName) {
    let targets = factory_room.nameGet(roomName).find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_STORAGE) &&
                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    let total = 0;
    for (var i = 0; i < targets.length; i++) {
        let energy = targets[i].store[RESOURCE_ENERGY];
        total += parseInt(energy ? energy : 0);
    }
    if (parseInt(total) < 500) {
        clog('房间' + roomName, 'CONTAINER+EXTENSION+STORAGE能量' + total + '不足500');
        Utils.notify(
            `【${roomName}】房间【CONTAINER+EXTENSION+STORAGE能量${total}不足500】`
        );
    }
    Memory.rooms[roomName].containerExtensionStorageEnergyStat = total;
}

// 临时外部房间,升级
function upgraderOuterRoom(roomName) {
    let room = factory_room.nameGet(roomName);

    let creepName = '';
    const upgraders = factory_creep.Upgrader.ALL(1);
    if (upgraders < 1) return;
    // 是否已存在
    _.forEach(upgraders, upgrader => {
        if (upgrader.memory.upgraderOuterRoom) {
            creepName = upgrader.name;
            return false;
        }
    });
    // 找新的
    if (!creepName) {
        _.forEach(upgraders, upgrader => {
            if (!upgrader.memory.upgraderOuterRoom) {
                upgrader.memory.upgraderOuterRoom = roomName;
                creepName = upgrader.name;
                return false;
            }
        });
    }
    let creep = Game.creeps[creepName];

    if (!room) {
        factory_creep.moveTo(creep, new RoomPosition(43, 17, roomName));
    } else {
        if (creep.memory.work && creep.store[RESOURCE_ENERGY] == 0) { // 升级状态&&能量不足的时候，变为采集者
            creep.memory.work = false;
            creep.say('🔄 采集');
        }
        if (!creep.memory.work && creep.store.getFreeCapacity() == 0) { // 非升级状态&&能量满的时候，变为升级状态
            creep.memory.work = true;
            creep.say('⚡ 升级');
        }

        if (creep.memory.work) { // 升级状态，找到控制器并升级 + 可视化
            if (creep.upgradeController(room.controller) == ERR_NOT_IN_RANGE) {
                factory_creep.moveTo(creep, room.controller);
            }
        } else {
            // 掉落的资源
            let targets = room.find(FIND_DROPPED_RESOURCES);
            if (targets.length > 0) {
                // 捡起一个物品 (如捡起一些能量)
                if (creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
                    // 向目标移动
                    factory_creepmoveTo(creep, targets[0], 'Resource');
                }
            } else {
                targets = targets.concat(
                    // 所有墓碑
                    room.find(FIND_TOMBSTONES, {
                        filter: (structure) => {
                            return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                        }
                    }),
                    // 所有废墟
                    room.find(FIND_RUINS, {
                        filter: (structure) => {
                            return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                        }
                    }),
                );
                if (targets.length < 1) {
                    let sources = room.find(FIND_SOURCES);
                    // 采集能量
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        factory_creep.moveTo(creep, sources[0], 'Resource');
                    }
                    return;
                }
                if (targets.length < 1) {
                    targets = factory_room.nameGet(roomName).find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            // 找出有储存能量的container搬运
                            return (structure.structureType == STRUCTURE_CONTAINER) &&
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                }
                if (targets.length > 0) {
                    // 从建筑(structure)中拿取资源
                    if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        factory_creep.moveTo(creep, targets[0], 'Resource');
                    }
                }
            }

        }
    }
}

var factory_spawn = {
// 获取全部基地名称数组
    getNameAllArray: () => {
        return _.chain(globalData.rooms)
            .map('spawns') // 获取各房间的spawns数组
            .flatten() // 将嵌套的spawns数组扁平化为一个单一数组
            .map('name') // 映射每个spawn对象的name属性
            .value(); // 获取最终处理的结果数组
    },
    nameGet: (name) => {
        return Game.spawns[name];
    },
    sequenceGet: (sequence) => {
        return Game.spawns[factory.spawn.sequenceGetName(sequence)];
    },
    nameGetSequence: (name) => {
        let spawnNameAllArray = factory.spawn.getNameAllArray();
        let sequence = _.indexOf(spawnNameAllArray, name);
        if (sequence == -1) {
            return 1;
        }
        return sequence + 1;
    },
    sequenceGetName: (sequence) => {
        let spawnNameAllArray = factory.spawn.getNameAllArray();
        if (sequence > spawnNameAllArray.length || sequence < 1) {
            return spawnNameAllArray[0];
        }
        return spawnNameAllArray[sequence - 1];
    },
    // 基地序号获取房间序号
    sequenceGetRoomSequence: (sequence) => {
        let roomName = factory.spawn.sequenceGet(sequence).room.name;
        return factory.room.nameGetSequence(roomName);
    },
    // 基地名称获取房间名称
    nameGetRoomName: (name) => {
        return factory.spawn.nameGet(name).room.name;
    }
};

var factory_source = {
    GetContainerLength: (roomName) => {
        // 获取能量源区ContainerLen数量
        let memorySource = Memory.rooms[roomName].source.list;
        let len = 0;
        for (let val in memorySource) {
            let spaceXYList = memorySource[val].spaceXYList;
            for (let i = 0; i < spaceXYList.length; i++) {
                let containerID = spaceXYList[i].containerID;
                if (containerID) len++;
            }
        }
        return len;
    }
};

// ATTACK：最基础的攻击型身体部件，伤害和造价都很均衡，所以受到不少玩家的钟爱。它还有一个特性就是一旦被攻击就会自动反击。
// RANGED_ATTACK：范围型攻击部件，有rangedAttack（攻击三格内任一单位）和rangedMassAttack（攻击三格内所有单位）两种攻击模式。但是这个 part 的伤害要低于 ATTACK 并且造价更高。
// WORK：没错，WORK 部件也可以被用于进攻，主要的手段就是 dismantle 方法。它可以对建筑物造成大量伤害。但是 WORK 只能用于拆建筑物，对 creep 的攻击毫无还手之力。所以一般搭配其他种类的 creep 使用。
// CLAIM：可以使用attackController方法攻击指定控制器，借此来阻止对方房间进入安全模式。但是由于造价高且 TTL 短，所以一般只用于需要速战速决的进攻中。
// HEAL：治疗专用，可以使用 heal（近距离高效）和 rangedHeal（远距离低效）方法治疗指定 Creep。
// TOUGH：造价极低（只要10点能量），主要用来承担伤害，除了拥有正常的 100 生命值外没有什么用处。但是在经过 Boost 后 TOUGH 会成为战斗中最重要的身体部件之一，下文中我们会进行介绍。


var factory_creep$1 = {
    moveTo: (creep, target, type = '') => {
        let visualizePathStyle = {};
        switch (type) {
            case 'Resource':
                visualizePathStyle = {
                    // 填充颜色
                    fill: '',
                    // 线条颜色
                    stroke: globalData.Move.WorkResourceColor,
                    // undefined (实线)，dashed (虚线) 或者 dotted (点线)
                    lineStyle: 'dashed',
                    // 线条宽度
                    strokeWidth: .1,
                    // 透明度
                    opacity: .5
                };
                break;
            default:
                visualizePathStyle = {
                    // 填充颜色
                    fill: '',
                    // 线条颜色
                    stroke: globalData.Move.WorkColor,
                    // undefined (实线)，dashed (虚线) 或者 dotted (点线)
                    lineStyle: 'dashed',
                    // 线条宽度
                    strokeWidth: .1,
                    // 透明度
                    opacity: .5
                };
        }
        creep.moveTo(target, {
            visualizePathStyle: visualizePathStyle
        });
    },
    CleanMemory: () => {
        // 清理内存

        for (let name in Memory.creeps) { // 释放内存
            if (!Game.creeps[name]) {
                // 房间名称
                let roomName = Memory.creeps[name].roomName;

                // 采集者
                if (Memory.creeps[name].role == globalData.harvest) {
                    // 从能量源区记录删除
                    let harvestSourceID, memorySource, memorySourceList;
                    let on = false;
                    // 如果没有合法记录会不存在harvestSourceID,报错需要捕获
                    try {
                        harvestSourceID = Memory.creeps[name].harvestSourceID;
                        memorySource = Memory.rooms[roomName].source.list;
                        memorySourceList = memorySource[harvestSourceID].list;
                        on = true;
                    } catch (e) {
                        //TODO handle the exception
                    }
                    // 是否合法记录了
                    if (on && harvestSourceID && memorySource && memorySourceList) {
                        for (let i = 0; i < memorySourceList.length; i++) {
                            if (memorySourceList[i] == name) {
                                memorySource[harvestSourceID].list.splice(i, 1);
                                Memory.rooms[roomName].source.list = memorySource;
                                break
                            }
                        }
                    }

                    // 从采集建造CONTAINER记录删除
                    let harvestBuildCONTAINERList;
                    on = false;
                    try {
                        if (!Memory.rooms[roomName].source.harvestBuildCONTAINERList) Memory.rooms[roomName]
                            .source
                            .harvestBuildCONTAINERList = {};
                        harvestBuildCONTAINERList = Memory.rooms[roomName].source.harvestBuildCONTAINERList;
                        on = true;
                    } catch (e) {
                        //TODO handle the exception
                    }

                    if (on && _.size(harvestBuildCONTAINERList) > 0) {
                        let on = false;
                        for (let i in harvestBuildCONTAINERList) {
                            if (name == i) {
                                on = true;
                                return false;
                            }
                        }
                        if (on) {
                            harvestBuildCONTAINERList[name] = false;
                            harvestBuildCONTAINERList = _.omit(harvestBuildCONTAINERList, name);

                            Memory.rooms[roomName].source.harvestBuildCONTAINERList =
                                harvestBuildCONTAINERList;
                        }
                    }
                }

                // 运输者
                if (Memory.creeps[name].role == globalData.carrier) {
                    {
                        // 从能量源区记录删除
                        let TransportationTargetID, memorySource;
                        let on = false;
                        // 如果没有合法记录会不存在harvestSourceID,报错需要捕获
                        try {
                            TransportationTargetID = Memory.creeps[name].TransportationTargetID;
                            memorySource = Memory.rooms[roomName].source.list;
                            on = true;
                        } catch (e) {
                            //TODO handle the exception
                        }
                        // 是否合法记录了
                        if (on && TransportationTargetID && memorySource) {
                            let on = false;
                            for (let val in memorySource) {
                                let spaceXYList = memorySource[val].spaceXYList;
                                for (let i = 0; i < spaceXYList.length; i++) {
                                    let containerID = spaceXYList[i].containerID;
                                    if (TransportationTargetID == containerID) {
                                        let i2 = 0;
                                        for (; i2 < spaceXYList[i].list.length; i2++) {
                                            if (spaceXYList[i].list[i2] == name) {
                                                on = true;
                                                break
                                            }
                                        }
                                        if (on) {
                                            spaceXYList[i].list.splice(i2, 1);
                                            Memory.rooms[roomName].source.list[val].spaceXYList[i].list =
                                                spaceXYList[i].list;
                                            break;
                                        }
                                    }
                                }
                                if (on) break;
                            }
                        }
                    }

                    {
                        // 从控制器区记录删除
                        // let TransportationTargetID;
                        let memoryControllerContainerList;
                        let on = false;
                        try {
                            // TransportationTargetID = Memory.creeps[name].TransportationTargetID;
                            memoryControllerContainerList = Memory.rooms[roomName].controller.container.list;
                            on = true;
                        } catch (e) {
                            //TODO handle the exception
                        }
                        // 是否合法记录了
                        if (on && memoryControllerContainerList) {
                            let on = false;
                            let i = 0;
                            for (; i < memoryControllerContainerList.length; i++) {
                                if (memoryControllerContainerList[i] == name) {
                                    on = true;
                                    break;
                                }
                            }
                            if (on) {
                                memoryControllerContainerList.splice(i, 1);
                                Memory.rooms[roomName].controller.container.list =
                                    memoryControllerContainerList;
                            }
                        }
                    }
                }

                delete Memory.creeps[name];
                clog('清楚不存在的creep内存:', name);
            }
        }


        // {
        // 	// 能量源区Container
        // 	// 再次扫描,记录列表里面的creep是否还还活,把已经死亡的去除
        // 	let TransportationTargetID, memorySource;
        // 	let on = false;
        // 	// 如果没有合法记录会不存在harvestSourceID,报错需要捕获
        // 	try {
        // 		TransportationTargetID = Memory.creeps[name].TransportationTargetID;
        // 		memorySource = Memory.rooms[roomName].source.list;
        // 		on = true;
        // 	} catch (e) {
        // 		//TODO handle the exception
        // 	}
        // 	if (on && TransportationTargetID) {
        // 		for (let val in memorySource) {
        // 			let spaceXYList = memorySource[val].spaceXYList;
        // 			for (let i = 0; i < spaceXYList.length; i++) {
        // 				let containerID = spaceXYList[i].containerID
        // 				if (TransportationTargetID == containerID) {
        // 					let i2 = 0;
        // 					let spaceXYListList2 = [];
        // 					for (; i2 < spaceXYList[i].list.length; i2++) {
        // 						for (let name in Memory.creeps) {
        // 							if (name == spaceXYList[i].list[i2]) {
        // 								spaceXYListList2.push(name);
        // 								break;
        // 							}
        // 						}
        // 					}
        // 					Memory.rooms[roomName].source.list[val].spaceXYList[i].list = spaceXYListList2;
        // 				}
        // 			}
        // 		}
        // 	}
        // }

        // {
        // 	// 控制器区Container
        // 	// 再次扫描,记录列表里面的creep是否还还活,把已经死亡的去除
        // 	let memoryControllerContainerList;
        // 	let on = false;
        // 	try {
        // 		memoryControllerContainerList = Memory.rooms[roomName].controller.container.list;
        // 		on = true;
        // 	} catch (e) {
        // 		//TODO handle the exception
        // 	}
        // 	if (on && memoryControllerContainerList) {
        // 		let memoryControllerContainerList2 = [];
        // 		for (var i = 0; i < memoryControllerContainerList.length; i++) {
        // 			let on = false;
        // 			for (let name in Memory.creeps) {
        // 				if (name == memoryControllerContainerList[i]) {
        // 					on = true;
        // 					break;
        // 				}
        // 			}
        // 			if (on) {
        // 				memoryControllerContainerList2.push(memoryControllerContainerList[i]);
        // 			}
        // 		}
        // 		Memory.rooms[roomName].controller.container.list = memoryControllerContainerList2;
        // 	}
        // }

    },
    addHarvest: (harvests, controller_level = 4, spawnName) => {
        let spawnSequence = factory_spawn.nameGetSequence(spawnName);
        let roomSequence = factory_spawn.sequenceGetRoomSequence(spawnSequence);
        let roomName = factory_room.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.harvest + Game.time;

        if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.harvest.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.harvest.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if ( /*Object.keys(Game.creeps).length < 1 ||*/ harvests) {
            // 当总creep数量小于2时,使用缩减版进行快速发展（注意：当建筑只剩基地时最高能量300）
            if (harvests.length < 1) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.harvest
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.harvest.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (harvests.length > 2 && controller_level >= 4) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.harvest
                    .bodysPlus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.harvest.bodysPlus.list;
                } else {
                    return 'Plus 房间总能量数量未达到限制，无法生产';
                }
            }
        }
        let returnData = factory_spawn.nameGet(spawnName).spawnCreep(bodys,
            newName, {
                memory: {
                    role: globalData.harvest,
                    roomName: roomName,
                    spawnName: spawnName
                }
            });
        if (returnData == OK) {
            Game.creeps[newName].memory.id = Game.creeps[newName].id;
            clog('生成新的 采集者: ' + newName);
        }
        return returnData
    },
    addCarrier: (carriers, controller_level = 4, spawnName) => {
        let spawnSequence = factory_spawn.nameGetSequence(spawnName);
        let roomSequence = factory_spawn.sequenceGetRoomSequence(spawnSequence);
        let roomName = factory_room.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.carrier + Game.time;
        if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.carrier.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.carrier.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (carriers) {
            if (carriers.length < 1) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.carrier
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.carrier.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (carriers.length > 2 && controller_level >= 4) {
                if (globalData.creepConfigs.carrier.sourceContainer1v1 && carriers.length >= factory_source
                    .GetContainerLength(roomSequence) + 1) {
                    if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.carrier
                        .bodysPlus
                        .totalEnergyRequired) {
                        bodys = globalData.creepConfigs.carrier.bodysPlus.list;
                    } else {
                        return 'Plus 房间总能量数量未达到限制，无法生产';
                    }
                }
            }
        }
        let returnData = factory_spawn.nameGet(spawnName).spawnCreep(bodys,
            newName, {
                memory: {
                    role: globalData.carrier,
                    task: dataStructure_task,
                    target: dataStructure_target,
                    roomName: roomName,
                    spawnName: spawnName
                }
            });
        if (returnData == OK) {
            Game.creeps[newName].memory.id = Game.creeps[newName].id;
            clog('生成新的 运输者: ' + newName);
        }
        return returnData
    },
    addUpgrader: (upgraders, controller_level = 4, spawnName) => {
        let spawnSequence = factory_spawn.nameGetSequence(spawnName);
        let roomSequence = factory_spawn.sequenceGetRoomSequence(spawnSequence);
        let roomName = factory_room.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.upgrader + Game.time;
        if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.upgrader.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.upgrader.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (upgraders) {
            if (upgraders.length < 1) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.upgrader
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.upgrader.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (upgraders.length > 2 && controller_level >= 4) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.upgrader
                    .bodysPlus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.upgrader.bodysPlus.list;
                } else {
                    return 'Plus 房间总能量数量未达到限制，无法生产';
                }
            }
        }
        let returnData = factory_spawn.nameGet(spawnName).spawnCreep(bodys,
            newName, {
                memory: {
                    role: globalData.upgrader,
                    roomName: roomName,
                    spawnName: spawnName
                }
            });
        if (returnData == OK) {
            Game.creeps[newName].memory.id = Game.creeps[newName].id;
            clog('生成新的 升级者: ' + newName);
        }
        return returnData
    },
    addBuilder: (builders, controller_level = 4, spawnName) => {
        let spawnSequence = factory_spawn.nameGetSequence(spawnName);
        let roomSequence = factory_spawn.sequenceGetRoomSequence(spawnSequence);
        let roomName = factory_room.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.builder + Game.time;
        if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.builder.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.builder.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (builders) {
            if (builders.length < 1) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.builder
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.builder.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (builders.length > 2 && controller_level >= 4) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.builder
                    .bodysPlus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.builder.bodysPlus.list;
                } else {
                    return 'Plus 房间总能量数量未达到限制，无法生产';
                }
            }
        }
        let returnData = factory_spawn.nameGet(spawnName).spawnCreep(bodys,
            newName, {
                memory: {
                    role: globalData.builder,
                    roomName: roomName,
                }
            });
        if (returnData == OK) {
            Game.creeps[newName].memory.id = Game.creeps[newName].id;
            clog('生成新的 建造者:' + newName);
        }
        return returnData
    },
    addRepairer: (repairers, controller_level = 4, spawnName) => {
        let spawnSequence = factory_spawn.nameGetSequence(spawnName);
        let roomSequence = factory_spawn.sequenceGetRoomSequence(spawnSequence);
        let roomName = factory_room.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.repairer + Game.time;
        let targets = factory_spawn.nameGet(spawnName).room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                // 找出需要储存能量
                return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100;
            }
        });
        if (targets.length > 0 && globalData.creepConfigs.repairer.onTower) {
            return '存在TOWER能量大于100以上,不需要维修者';
        }
        if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.repairer.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.repairer.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (repairers) {
            if (repairers.length < 1) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.repairer
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.repairer.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (repairers.length > 2 && controller_level >= 4) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.repairer
                    .bodysPlus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.repairer.bodysPlus.list;
                } else {
                    return 'Plus 房间总能量数量未达到限制，无法生产';
                }
            }
        }
        let returnData = factory_spawn.nameGet(spawnName).spawnCreep(bodys,
            newName, {
                memory: {
                    role: globalData.repairer,
                    roomName: roomName,
                    spawnName: spawnName
                }
            });
        if (returnData == OK) {
            Game.creeps[newName].memory.id = Game.creeps[newName].id;
            clog('生成新的 维修者:' + newName);
        }
        return returnData
    },
    addNearDefender: (nearDefenders, controller_level = 4, spawnName) => {
        let spawnSequence = factory_spawn.nameGetSequence(spawnName);
        let roomSequence = factory_spawn.sequenceGetRoomSequence(spawnSequence);
        let roomName = factory_room.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.nearDefender + Game.time;
        if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.nearDefender.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.nearDefender.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (nearDefenders) {
            if (nearDefenders.length < 1) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.nearDefender
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.nearDefender.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (nearDefenders.length > 2 && controller_level >= 4) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.nearDefender
                    .bodysPlus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.nearDefender.bodysPlus.list;
                } else {
                    return 'Plus 房间总能量数量未达到限制，无法生产';
                }
            }
        }
        let returnData = factory_spawn.nameGet(spawnName).spawnCreep(bodys,
            newName, {
                memory: {
                    role: globalData.nearDefender,
                    roomName: roomName,
                    spawnName: spawnName
                }
            });
        if (returnData == OK) {
            Game.creeps[newName].memory.id = Game.creeps[newName].id;
            clog('生成新的 防御者-近战:' + newName);
        }
        return returnData
    },
    addFarDefender: (farDefenders, controller_level = 4, spawnName) => {
        let spawnSequence = factory_spawn.nameGetSequence(spawnName);
        let roomSequence = factory_spawn.sequenceGetRoomSequence(spawnSequence);
        let roomName = factory_room.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.farDefender + Game.time;
        if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.farDefender.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.farDefender.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (farDefenders) {
            if (farDefenders.length < 1) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.farDefender
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.farDefender.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (farDefenders.length > 2 && controller_level >= 4) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.farDefender
                    .bodysPlus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.farDefender.bodysPlus.list;
                } else {
                    return 'Plus 房间总能量数量未达到限制，无法生产';
                }
            }
        }
        let returnData = factory_spawn.nameGet(spawnName).spawnCreep(bodys,
            newName, {
                memory: {
                    role: globalData.farDefender,
                    roomName: roomName,
                    spawnName: spawnName
                }
            });
        if (returnData == OK) {
            Game.creeps[newName].memory.id = Game.creeps[newName].id;
            clog('生成新的 防御者-远战:' + newName);
        }
        return returnData
    },
    addOccupier: (occupiers, controller_level = 4, spawnName) => {
        let spawnSequence = factory_spawn.nameGetSequence(spawnName);
        let roomSequence = factory_spawn.sequenceGetRoomSequence(spawnSequence);
        let roomName = factory_room.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.occupier + Game.time;
        if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.occupier.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.occupier.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (occupiers) {
            if (occupiers.length < 1) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.occupier
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.occupier.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (occupiers.length > 2 && controller_level >= 4) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.occupier
                    .bodysPlus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.occupier.bodysPlus.list;
                } else {
                    return 'Plus 房间总能量数量未达到限制，无法生产';
                }
            }
        }
        let returnData = factory_spawn.nameGet(spawnName).spawnCreep(bodys,
            newName, {
                memory: {
                    role: globalData.occupier,
                    roomName: roomName,
                    spawnName: spawnName
                }
            });
        if (returnData == OK) {
            Game.creeps[newName].memory.id = Game.creeps[newName].id;
            clog('生成新的 占领者:' + newName);
        }
        return returnData
    },
    addTheHealer: (theHealers, controller_level = 4, spawnName) => {
        let spawnSequence = factory_spawn.nameGetSequence(spawnName);
        let roomSequence = factory_spawn.sequenceGetRoomSequence(spawnSequence);
        let roomName = factory_room.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.theHealer + Game.time;
        if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.theHealer.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.theHealer.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (theHealers) {
            if (theHealers.length < 1) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.theHealer
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.theHealer.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (theHealers.length > 2 && controller_level >= 4) {
                if (factory_room.nameGet(roomName).energyAvailable >= globalData.creepConfigs.theHealer
                    .bodysPlus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.theHealer.bodysPlus.list;
                } else {
                    return 'Plus 房间总能量数量未达到限制，无法生产';
                }
            }
        }
        let returnData = factory_spawn.nameGet(spawnName).spawnCreep(bodys,
            newName, {
                memory: {
                    role: globalData.theHealer,
                    roomName: roomName,
                    spawnName: spawnName
                }
            });
        if (returnData == OK) {
            Game.creeps[newName].memory.id = Game.creeps[newName].id;
            clog('生成新的 治疗者:' + newName);
        }
        return returnData
    },
    ComponentEnergyCalculation: (creepComponent = []) => {
        // 部件能量计算
        let total = 0;
        for (let i = 0; i < creepComponent.length; i++) {
            switch (creepComponent[i]) {
                case MOVE:
                    total += globalData.creepComponentConfigs.MOVE;
                    break;
                case WORK:
                    total += globalData.creepComponentConfigs.WORK;
                    break;
                case CARRY:
                    total += globalData.creepComponentConfigs.CARRY;
                    break;
                case ATTACK:
                    total += globalData.creepComponentConfigs.ATTACK;
                    break;
                case RANGED_ATTACK:
                    total += globalData.creepComponentConfigs.RANGED_ATTACK;
                    break;
                case HEAL:
                    total += globalData.creepComponentConfigs.HEAL;
                    break;
                case CLAIM:
                    total += globalData.creepComponentConfigs.CLAIM;
                    break;
                case TOUGH:
                    total += globalData.creepComponentConfigs.TOUGH;
                    break;
                default:
                    Throw.Error('ComponentEnergyCalculation', ' 无效 ', creepComponent[i]);
            }
        }
        return total;
    }
};

// creep 监控状态检查
Creep.prototype.isHealthy = function () {
    if (this.ticksToLive <= 10) return false
    else return true
};

// 控制器 creep
function controller_creep () {

    // 遍历所有 creep 并执行上文中拓展的 work 方法
    // Object.values(Game.creeps).forEach(creep => creep.work())

    // 清理内存
    factory_creep$1.CleanMemory();

    // spawn生产孵化Creep
    spawnProduceCreep(globalData.rooms[0].spawns[0].name);

    // 事件管理
    eventManagement();

}


function addHarvest(harvests, controller_level = 4, spawnName) {
    // 生产 限制 采集
    if (harvests.length < globalData.creepConfigs.harvest.number) {
        let returnData = factory_creep$1.addHarvest(harvests, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

function addUpgrader(upgraders, controller_level, spawnName) {
    // 生产 限制 升级
    let roomName = factory_spawn.nameGetRoomName(spawnName);
    if (upgraders.length < globalData.creepConfigs.upgrader.number) {
        let returnData;
        // 房间CONTAINER总能量在2000以下时,只会存在一个升级者
        if (upgraders.length > 0) {
            if (Memory.rooms[roomName].containerExtensionStorageEnergyStat > 2000) {
                returnData = factory_creep$1.addUpgrader(upgraders, controller_level, spawnName);
            }
        } else {
            returnData = factory_creep$1.addUpgrader(upgraders, controller_level, spawnName);
        }

        // clog(returnData);
        return returnData;
    }
}

function addBuilder(builders, controller_level, spawnName) {
    // 生产 限制 建造 前提控制器2等级
    if (builders.length < globalData.creepConfigs.builder.number) { // && controller_level >= 2
        let returnData = factory_creep$1.addBuilder(builders, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

function addCarrier(carriers, controller_level, spawnName) {
    // 生产 限制 运输
    if (carriers.length < globalData.creepConfigs.carrier.number) {
        // 拥有CONTAINER才生产
        const builds = factory_spawn.nameGet(spawnName).room.find(FIND_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_CONTAINER
            }
        });
        if (builds.length > 0) {
            let returnData = factory_creep$1.addCarrier(carriers, controller_level, spawnName);
            // clog(returnData);
            return returnData;
        }
    }
}

function addRepairer(repairers, controller_level, spawnName) {
    // 生产 限制 维修
    if (repairers.length < globalData.creepConfigs.repairer.number) {
        let returnData = factory_creep$1.addRepairer(repairers, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

function addNearDefender(nearDefenders, controller_level, spawnName) {
    // 生产 限制 防御者-近战
    if (nearDefenders.length < globalData.creepConfigs.nearDefender.number) {
        let returnData = factory_creep$1.addNearDefender(nearDefenders, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

function addFarDefender(farDefenders, controller_level, spawnName) {
    // 生产 限制 防御者-远战
    if (farDefenders.length < globalData.creepConfigs.farDefender.number) {
        let returnData = factory_creep$1.addFarDefender(farDefenders, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

function addTheHealer(theHealers, controller_level, spawnName) {
    // 生产 限制 治疗者
    if (theHealers.length < globalData.creepConfigs.theHealer.number) {
        let returnData = factory_creep$1.addTheHealer(theHealers, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

function addOccupier(occupiers, controller_level, spawnName) {
    // 生产 限制 占领者
    if (occupiers.length < globalData.creepConfigs.occupier.number) {
        let returnData = factory_creep$1.addOccupier(occupiers, controller_level, spawnName);
        // clog(returnData);
        return returnData;
    }
}

// 事件管理
function eventManagement() {
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        // 特别行动
        let SpecialActions = creep.memory.SpecialActions;
        if (SpecialActions) {
            // 数据格式
            // SpecialActions:{
            // //代号
            // 	code:'',
            // //附加信息
            // 	mgs:''
            // }
            switch (SpecialActions.code) {
                            }
            continue;
        }

        if (creep.memory.role == globalData.harvest) {
            factory_creep_Harvest.run(creep);
        }
        if (creep.memory.role == globalData.upgrader) {
            if (!creep.memory.upgraderOuterRoom) {
                factory_creep_Upgrader.run(creep);
            }
        }
        if (creep.memory.role == globalData.builder) {
            if (!creep.memory.builderOuterRoom) {
                factory_creep_Builder.run(creep);
            }
        }
        if (creep.memory.role == globalData.carrier) {
            factory_creep_Carrier.run(creep);
        }
        if (creep.memory.role == globalData.repairer) {
            factory_creep_Repairer.run(creep);
        }
        if (creep.memory.role == globalData.nearDefender || creep.memory.role == globalData.farDefender) {
            factory_creep_Defender.run(creep);
        }
        if (creep.memory.role == globalData.theHealer) {
            factory_creep_TheHealer.run(creep);
        }
        if (creep.memory.role == globalData.occupier) {
            factory_creep_Occupier.run(creep);
        }
    }
}

// spawn生产孵化Creep
function spawnProduceCreep(spawnName) {
    let roomName = factory_spawn.nameGetRoomName(spawnName);

    const harvests = factory_creep_Harvest.ALL(roomName);
    const upgraders = factory_creep_Upgrader.ALL(roomName);
    const builders = factory_creep_Builder.ALL(roomName);
    const carriers = factory_creep_Carrier.ALL(roomName);
    const repairers = factory_creep_Repairer.ALL(roomName);
    const nearDefenders = factory_creep_Defender.ALLNearDefender(roomName);
    const farDefenders = factory_creep_Defender.ALLFarDefender(roomName);
    const theHealers = factory_creep_TheHealer.ALL(roomName);
    const occupiers = factory_creep_Occupier.ALL(roomName);

    // 查看控制器等级
    const controller_level = factory_room.nameGet(roomName).controller.level;

    // 能量源区
    let sources = factory_room.nameGet(roomName).find(FIND_SOURCES);

    // 母巢 (spawn) 是否正在孵化一个新的 creep
    if (factory_spawn.nameGet(spawnName).spawning) {
        // 孵化，过程可视化
        let spawningCreep = Game.creeps[factory_spawn.nameGet(spawnName).spawning.name];
        factory_room.nameGet(roomName).visual.text(
            '孵化🛠️' + spawningCreep.memory.role,
            factory_spawn.nameGet(spawnName).pos.x + 1,
            factory_spawn.nameGet(spawnName).pos.y, {
                align: 'left',
                opacity: 0.8
            });
    } else {
        // 生产 采集
        // 动态更新采集者数量
        try {
            if (globalData.creepConfigs.harvest.AutomaticAssignNum && Memory.rooms[roomName].source.total && globalData
                .creepConfigs.harvest.number != Memory.rooms[roomName].source.total) globalData
                .creepConfigs.harvest.number = Memory.rooms[roomName].source.total;
        } catch (e) {
            //TODO handle the exception
        }


        let towers = factory_room.nameGet(roomName).find(FIND_STRUCTURES, {
            filter: (structure) => {
                // 找出需要储存能量
                return (structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100;
            }
        });

        // 优先级顺序生产 每种保持最低1个
        let priority;
        // 采集最低和能量源区一样的数量
        if ((harvests.length < 1 && globalData.creepConfigs.harvest.number >= 1) || (harvests.length < sources.length &&
            globalData.creepConfigs.harvest.number >= sources.length)) {
            priority = 'harvest';
        } else if (upgraders.length < 1 && globalData.creepConfigs.upgrader.number >= 1) {
            priority = 'upgrader';
        } else if (builders.length < 1 && globalData.creepConfigs.builder.number >= 1) {
            priority = 'builder';
        } else if (repairers.length < 1 && globalData.creepConfigs.repairer.number >= 1 && (!globalData.creepConfigs
            .repairer.onTower || (globalData
                .creepConfigs.repairer.onTower && towers.length <
            1))) {
            priority = 'repairer';
        } else if (carriers.length < 1 && globalData.creepConfigs.carrier.number >= 1) ; else if (nearDefenders.length < 1 && globalData.creepConfigs.nearDefender.number >= 1) {
            priority = 'nearDefender';
        } else if (farDefenders.length < 1 && globalData.creepConfigs.farDefender.number >= 1) {
            priority = 'farDefender';
        } else if (theHealers.length < 1 && globalData.creepConfigs.theHealer.number >= 1) {
            priority = 'theHealer';
        } else if (occupiers.length < 1 && globalData.creepConfigs.occupier.number >= 1 && factory_room.nameGet(roomName).energyCapacityAvailable >= 650) {
            priority = 'occupier';
        }
        if (priority) {
            switch (priority) {
                case 'harvest':
                    addHarvest(harvests, controller_level, spawnName);
                    break;
                case 'upgrader':
                    addUpgrader(upgraders, controller_level, spawnName);
                    break;
                case 'builder':
                    addBuilder(builders, controller_level, spawnName);
                    break;
                case 'carrier':
                    addCarrier(carriers, controller_level, spawnName);
                    break;
                case 'repairer':
                    addRepairer(repairers, controller_level, spawnName);
                    break;
                case 'nearDefender':
                    addNearDefender(nearDefenders, controller_level, spawnName);
                    break;
                case 'farDefender':
                    addFarDefender(farDefenders, controller_level, spawnName);
                    break;
                case 'theHealer':
                    addTheHealer(theHealers, controller_level, spawnName);
                    break;
                case 'occupier':
                    addOccupier(occupiers, controller_level, spawnName);
                    break;
            }
        } else {
            // 默认顺序生产
            if (addHarvest(harvests, controller_level, spawnName) != OK) {
                if (addCarrier(carriers, controller_level, spawnName) != OK) {
                    if (addBuilder(builders, controller_level, spawnName) != OK) {
                        if (addRepairer(repairers, controller_level, spawnName) != OK) {
                            if (addUpgrader(upgraders, controller_level, spawnName) != OK) {
                                if (addNearDefender(upgraders, controller_level, spawnName) != OK) {
                                    if (addFarDefender(upgraders, controller_level, spawnName) != OK) {
                                        if (addTheHealer(upgraders, controller_level, spawnName) != OK) {
                                            if (addOccupier(upgraders, controller_level, spawnName) != OK) ;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}

// 代码中文解释
/// <reference types="@screepscn/types" />


const loop = errorMapper(() => {
    if (globalData.username == '1755616537') ; else if (globalData.username == 'Stars22') {
dsd;
    }

    // 任务调度启动
    controller_task();
    // 房间管理
    controller_room();
    // creep管理
    controller_creep();

    // clog('本次tips使用 CPU 时间总量 ',Game.cpu.getUsed())
});

// 中文API
// https://screeps-cn.github.io/api/#
// 英文API
// https://docs.screeps.com/api/#
// lodash
// https://www.lodashjs.com/

// 房间 W25N6  W42S57 W48S54 W47S54
// https://screeps.com/a/#!/room/shard3/W47S54

// 缓存的种类
// 持久化存储：游戏的Memory对象，只有这个地方能实现真正可靠的长时间存储。
// 半持久存储：js 的 Global对象，对象原型都属于半持久存储，这种存储会在游戏全局重置时被清除，一般存放允许丢失的数据。
// 非持久存储：直接定义在游戏对象（非原型）上的属性都属于非持久存储，例如Game.rooms.W1N1.myCustomProp = 123，这种存储只有本 tick 能访问到，用来存放 tick 内协同作业需要的数据。

// 设计方案参考
// https://github.com/lc150303/The-design-of-OverDom/tree/master/doc

/*
待完成程序:

完成程序:
 */

exports.loop = loop;
//# sourceMappingURL=main.js.map
