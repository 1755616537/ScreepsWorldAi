'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

// 全局数据
commonjsGlobal.globalData = {
    // 总输出
    clog: true,
    // 【不用填写，会自动获取】当前使用代码的用户名
    username: '',
    // 联盟信息
    Alliance: [
        {
            username: '1755616537',
            rooms: [
                {
                    name: 'W47S54',
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
                },
                {
                    name: 'W48S54'
                }
            ]
        },
        {
            username: 'Stars22',
            rooms: [
                {
                    name: 'W49S53'
                }
            ]
        }
    ],
    // 房间 【不用填写，会自动获取】
    rooms: [],
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


    // 以下内容不可更改--------------------------------------------------------------

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

var sourceMapGenerator = {};

var base64Vlq = {};

var base64$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
base64$1.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
base64$1.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = base64$1;

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
base64Vlq.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
base64Vlq.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var util$5 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

(function (exports) {
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	/**
	 * This is a helper function for getting values from parameter/options
	 * objects.
	 *
	 * @param args The object we are extracting values from
	 * @param name The name of the property we are getting.
	 * @param defaultValue An optional value to return if the property is missing
	 * from the object. If this is not specified and the property is missing, an
	 * error will be thrown.
	 */
	function getArg(aArgs, aName, aDefaultValue) {
	  if (aName in aArgs) {
	    return aArgs[aName];
	  } else if (arguments.length === 3) {
	    return aDefaultValue;
	  } else {
	    throw new Error('"' + aName + '" is a required argument.');
	  }
	}
	exports.getArg = getArg;

	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;

	function urlParse(aUrl) {
	  var match = aUrl.match(urlRegexp);
	  if (!match) {
	    return null;
	  }
	  return {
	    scheme: match[1],
	    auth: match[2],
	    host: match[3],
	    port: match[4],
	    path: match[5]
	  };
	}
	exports.urlParse = urlParse;

	function urlGenerate(aParsedUrl) {
	  var url = '';
	  if (aParsedUrl.scheme) {
	    url += aParsedUrl.scheme + ':';
	  }
	  url += '//';
	  if (aParsedUrl.auth) {
	    url += aParsedUrl.auth + '@';
	  }
	  if (aParsedUrl.host) {
	    url += aParsedUrl.host;
	  }
	  if (aParsedUrl.port) {
	    url += ":" + aParsedUrl.port;
	  }
	  if (aParsedUrl.path) {
	    url += aParsedUrl.path;
	  }
	  return url;
	}
	exports.urlGenerate = urlGenerate;

	/**
	 * Normalizes a path, or the path portion of a URL:
	 *
	 * - Replaces consecutive slashes with one slash.
	 * - Removes unnecessary '.' parts.
	 * - Removes unnecessary '<dir>/..' parts.
	 *
	 * Based on code in the Node.js 'path' core module.
	 *
	 * @param aPath The path or url to normalize.
	 */
	function normalize(aPath) {
	  var path = aPath;
	  var url = urlParse(aPath);
	  if (url) {
	    if (!url.path) {
	      return aPath;
	    }
	    path = url.path;
	  }
	  var isAbsolute = exports.isAbsolute(path);

	  var parts = path.split(/\/+/);
	  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
	    part = parts[i];
	    if (part === '.') {
	      parts.splice(i, 1);
	    } else if (part === '..') {
	      up++;
	    } else if (up > 0) {
	      if (part === '') {
	        // The first part is blank if the path is absolute. Trying to go
	        // above the root is a no-op. Therefore we can remove all '..' parts
	        // directly after the root.
	        parts.splice(i + 1, up);
	        up = 0;
	      } else {
	        parts.splice(i, 2);
	        up--;
	      }
	    }
	  }
	  path = parts.join('/');

	  if (path === '') {
	    path = isAbsolute ? '/' : '.';
	  }

	  if (url) {
	    url.path = path;
	    return urlGenerate(url);
	  }
	  return path;
	}
	exports.normalize = normalize;

	/**
	 * Joins two paths/URLs.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be joined with the root.
	 *
	 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	 *   first.
	 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	 *   is updated with the result and aRoot is returned. Otherwise the result
	 *   is returned.
	 *   - If aPath is absolute, the result is aPath.
	 *   - Otherwise the two paths are joined with a slash.
	 * - Joining for example 'http://' and 'www.example.com' is also supported.
	 */
	function join(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }
	  if (aPath === "") {
	    aPath = ".";
	  }
	  var aPathUrl = urlParse(aPath);
	  var aRootUrl = urlParse(aRoot);
	  if (aRootUrl) {
	    aRoot = aRootUrl.path || '/';
	  }

	  // `join(foo, '//www.example.org')`
	  if (aPathUrl && !aPathUrl.scheme) {
	    if (aRootUrl) {
	      aPathUrl.scheme = aRootUrl.scheme;
	    }
	    return urlGenerate(aPathUrl);
	  }

	  if (aPathUrl || aPath.match(dataUrlRegexp)) {
	    return aPath;
	  }

	  // `join('http://', 'www.example.com')`
	  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
	    aRootUrl.host = aPath;
	    return urlGenerate(aRootUrl);
	  }

	  var joined = aPath.charAt(0) === '/'
	    ? aPath
	    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

	  if (aRootUrl) {
	    aRootUrl.path = joined;
	    return urlGenerate(aRootUrl);
	  }
	  return joined;
	}
	exports.join = join;

	exports.isAbsolute = function (aPath) {
	  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
	};

	/**
	 * Make a path relative to a URL or another path.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be made relative to aRoot.
	 */
	function relative(aRoot, aPath) {
	  if (aRoot === "") {
	    aRoot = ".";
	  }

	  aRoot = aRoot.replace(/\/$/, '');

	  // It is possible for the path to be above the root. In this case, simply
	  // checking whether the root is a prefix of the path won't work. Instead, we
	  // need to remove components from the root one by one, until either we find
	  // a prefix that fits, or we run out of components to remove.
	  var level = 0;
	  while (aPath.indexOf(aRoot + '/') !== 0) {
	    var index = aRoot.lastIndexOf("/");
	    if (index < 0) {
	      return aPath;
	    }

	    // If the only part of the root that is left is the scheme (i.e. http://,
	    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
	    // have exhausted all components, so the path is not relative to the root.
	    aRoot = aRoot.slice(0, index);
	    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
	      return aPath;
	    }

	    ++level;
	  }

	  // Make sure we add a "../" for each component we removed from the root.
	  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;

	var supportsNullProto = (function () {
	  var obj = Object.create(null);
	  return !('__proto__' in obj);
	}());

	function identity (s) {
	  return s;
	}

	/**
	 * Because behavior goes wacky when you set `__proto__` on objects, we
	 * have to prefix all the strings in our set with an arbitrary character.
	 *
	 * See https://github.com/mozilla/source-map/pull/31 and
	 * https://github.com/mozilla/source-map/issues/30
	 *
	 * @param String aStr
	 */
	function toSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return '$' + aStr;
	  }

	  return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return aStr.slice(1);
	  }

	  return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
	  if (!s) {
	    return false;
	  }

	  var length = s.length;

	  if (length < 9 /* "__proto__".length */) {
	    return false;
	  }

	  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
	      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
	      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
	      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
	      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
	      s.charCodeAt(length - 9) !== 95  /* '_' */) {
	    return false;
	  }

	  for (var i = length - 10; i >= 0; i--) {
	    if (s.charCodeAt(i) !== 36 /* '$' */) {
	      return false;
	    }
	  }

	  return true;
	}

	/**
	 * Comparator between two mappings where the original positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same original source/line/column, but different generated
	 * line and column the same. Useful when searching for a mapping with a
	 * stubbed out mapping.
	 */
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	  var cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0 || onlyCompareOriginal) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;

	/**
	 * Comparator between two mappings with deflated source and name indices where
	 * the generated positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same generated line and column, but different
	 * source/name/original line and column the same. Useful when searching for a
	 * mapping with a stubbed out mapping.
	 */
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0 || onlyCompareGenerated) {
	    return cmp;
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

	function strcmp(aStr1, aStr2) {
	  if (aStr1 === aStr2) {
	    return 0;
	  }

	  if (aStr1 === null) {
	    return 1; // aStr2 !== null
	  }

	  if (aStr2 === null) {
	    return -1; // aStr1 !== null
	  }

	  if (aStr1 > aStr2) {
	    return 1;
	  }

	  return -1;
	}

	/**
	 * Comparator between two mappings with inflated source and name strings where
	 * the generated positions are compared.
	 */
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
	  var cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp;
	  }

	  return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

	/**
	 * Strip any JSON XSSI avoidance prefix from the string (as documented
	 * in the source maps specification), and then parse the string as
	 * JSON.
	 */
	function parseSourceMapInput(str) {
	  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
	}
	exports.parseSourceMapInput = parseSourceMapInput;

	/**
	 * Compute the URL of a source given the the source root, the source's
	 * URL, and the source map's URL.
	 */
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
	  sourceURL = sourceURL || '';

	  if (sourceRoot) {
	    // This follows what Chrome does.
	    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
	      sourceRoot += '/';
	    }
	    // The spec says:
	    //   Line 4: An optional source root, useful for relocating source
	    //   files on a server or removing repeated values in the
	    //   “sources” entry.  This value is prepended to the individual
	    //   entries in the “source” field.
	    sourceURL = sourceRoot + sourceURL;
	  }

	  // Historically, SourceMapConsumer did not take the sourceMapURL as
	  // a parameter.  This mode is still somewhat supported, which is why
	  // this code block is conditional.  However, it's preferable to pass
	  // the source map URL to SourceMapConsumer, so that this function
	  // can implement the source URL resolution algorithm as outlined in
	  // the spec.  This block is basically the equivalent of:
	  //    new URL(sourceURL, sourceMapURL).toString()
	  // ... except it avoids using URL, which wasn't available in the
	  // older releases of node still supported by this library.
	  //
	  // The spec says:
	  //   If the sources are not absolute URLs after prepending of the
	  //   “sourceRoot”, the sources are resolved relative to the
	  //   SourceMap (like resolving script src in a html document).
	  if (sourceMapURL) {
	    var parsed = urlParse(sourceMapURL);
	    if (!parsed) {
	      throw new Error("sourceMapURL could not be parsed");
	    }
	    if (parsed.path) {
	      // Strip the last path component, but keep the "/".
	      var index = parsed.path.lastIndexOf('/');
	      if (index >= 0) {
	        parsed.path = parsed.path.substring(0, index + 1);
	      }
	    }
	    sourceURL = join(urlGenerate(parsed), sourceURL);
	  }

	  return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL; 
} (util$5));

var arraySet = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$4 = util$5;
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet$2() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet$2.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet$2();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet$2.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet$2.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util$4.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet$2.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util$4.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet$2.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util$4.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet$2.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet$2.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

arraySet.ArraySet = ArraySet$2;

var mappingList = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$3 = util$5;

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util$3.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList$1() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList$1.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList$1.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList$1.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util$3.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

mappingList.MappingList = MappingList$1;

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ$1 = base64Vlq;
var util$2 = util$5;
var ArraySet$1 = arraySet.ArraySet;
var MappingList = mappingList.MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator$1(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util$2.getArg(aArgs, 'file', null);
  this._sourceRoot = util$2.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util$2.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet$1();
  this._names = new ArraySet$1();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator$1.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator$1.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator$1({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util$2.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util$2.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator$1.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util$2.getArg(aArgs, 'generated');
    var original = util$2.getArg(aArgs, 'original', null);
    var source = util$2.getArg(aArgs, 'source', null);
    var name = util$2.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator$1.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util$2.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util$2.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util$2.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator$1.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util$2.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet$1();
    var newNames = new ArraySet$1();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util$2.join(aSourceMapPath, mapping.source);
          }
          if (sourceRoot != null) {
            mapping.source = util$2.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util$2.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util$2.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator$1.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator$1.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = '';

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util$2.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ$1.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ$1.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ$1.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ$1.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ$1.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator$1.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util$2.relative(aSourceRoot, source);
      }
      var key = util$2.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator$1.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator$1.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

sourceMapGenerator.SourceMapGenerator = SourceMapGenerator$1;

var sourceMapConsumer = {};

var binarySearch$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

(function (exports) {
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;

	/**
	 * Recursive implementation of binary search.
	 *
	 * @param aLow Indices here and lower do not contain the needle.
	 * @param aHigh Indices here and higher do not contain the needle.
	 * @param aNeedle The element being searched for.
	 * @param aHaystack The non-empty array being searched.
	 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 */
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
	  // This function terminates when one of the following is true:
	  //
	  //   1. We find the exact element we are looking for.
	  //
	  //   2. We did not find the exact element, but we can return the index of
	  //      the next-closest element.
	  //
	  //   3. We did not find the exact element, and there is no next-closest
	  //      element than the one we are searching for, so we return -1.
	  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
	  var cmp = aCompare(aNeedle, aHaystack[mid], true);
	  if (cmp === 0) {
	    // Found the element we are looking for.
	    return mid;
	  }
	  else if (cmp > 0) {
	    // Our needle is greater than aHaystack[mid].
	    if (aHigh - mid > 1) {
	      // The element is in the upper half.
	      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
	    }

	    // The exact needle element was not found in this haystack. Determine if
	    // we are in termination case (3) or (2) and return the appropriate thing.
	    if (aBias == exports.LEAST_UPPER_BOUND) {
	      return aHigh < aHaystack.length ? aHigh : -1;
	    } else {
	      return mid;
	    }
	  }
	  else {
	    // Our needle is less than aHaystack[mid].
	    if (mid - aLow > 1) {
	      // The element is in the lower half.
	      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
	    }

	    // we are in termination case (3) or (2) and return the appropriate thing.
	    if (aBias == exports.LEAST_UPPER_BOUND) {
	      return mid;
	    } else {
	      return aLow < 0 ? -1 : aLow;
	    }
	  }
	}

	/**
	 * This is an implementation of binary search which will always try and return
	 * the index of the closest element if there is no exact hit. This is because
	 * mappings between original and generated line/col pairs are single points,
	 * and there is an implicit region between each of them, so a miss just means
	 * that you aren't on the very start of a region.
	 *
	 * @param aNeedle The element you are looking for.
	 * @param aHaystack The array that is being searched.
	 * @param aCompare A function which takes the needle and an element in the
	 *     array and returns -1, 0, or 1 depending on whether the needle is less
	 *     than, equal to, or greater than the element, respectively.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	 */
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
	  if (aHaystack.length === 0) {
	    return -1;
	  }

	  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
	                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
	  if (index < 0) {
	    return -1;
	  }

	  // We have found either the exact element, or the next-closest element than
	  // the one we are searching for. However, there may be more than one such
	  // element. Make sure we always return the smallest of these.
	  while (index - 1 >= 0) {
	    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
	      break;
	    }
	    --index;
	  }

	  return index;
	}; 
} (binarySearch$1));

var quickSort$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
quickSort$1.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util$1 = util$5;
var binarySearch = binarySearch$1;
var ArraySet = arraySet.ArraySet;
var base64VLQ = base64Vlq;
var quickSort = quickSort$1.quickSort;

function SourceMapConsumer$1(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer$1.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer$1.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer$1.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer$1.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer$1.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer$1.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer$1.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer$1.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer$1.GENERATED_ORDER = 1;
SourceMapConsumer$1.ORIGINAL_ORDER = 2;

SourceMapConsumer$1.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer$1.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer$1.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer$1.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer$1.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer$1.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util$1.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer$1.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util$1.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util$1.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util$1.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util$1.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util$1.getArg(mapping, 'generatedLine', null),
            column: util$1.getArg(mapping, 'generatedColumn', null),
            lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util$1.getArg(mapping, 'generatedLine', null),
            column: util$1.getArg(mapping, 'generatedColumn', null),
            lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

sourceMapConsumer.SourceMapConsumer = SourceMapConsumer$1;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  var version = util$1.getArg(sourceMap, 'version');
  var sources = util$1.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util$1.getArg(sourceMap, 'names', []);
  var sourceRoot = util$1.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util$1.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util$1.getArg(sourceMap, 'mappings');
  var file = util$1.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util$1.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util$1.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util$1.isAbsolute(sourceRoot) && util$1.isAbsolute(source)
        ? util$1.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util$1.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer$1;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util$1.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util$1.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util$1.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util$1.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util$1.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util$1.getArg(aArgs, 'line'),
      generatedColumn: util$1.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util$1.compareByGeneratedPositionsDeflated,
      util$1.getArg(aArgs, 'bias', SourceMapConsumer$1.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util$1.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util$1.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util$1.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util$1.getArg(mapping, 'originalLine', null),
          column: util$1.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util$1.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util$1.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util$1.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util$1.getArg(aArgs, 'line'),
      originalColumn: util$1.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util$1.compareByOriginalPositions,
      util$1.getArg(aArgs, 'bias', SourceMapConsumer$1.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util$1.getArg(mapping, 'generatedLine', null),
          column: util$1.getArg(mapping, 'generatedColumn', null),
          lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util$1.parseSourceMapInput(aSourceMap);
  }

  var version = util$1.getArg(sourceMap, 'version');
  var sections = util$1.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util$1.getArg(s, 'offset');
    var offsetLine = util$1.getArg(offset, 'line');
    var offsetColumn = util$1.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer$1(util$1.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer$1;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util$1.getArg(aArgs, 'line'),
      generatedColumn: util$1.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util$1.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util$1.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util$1.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util$1.compareByOriginalPositions);
  };

sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = sourceMapGenerator.SourceMapGenerator;
var util = util$5;

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex] || '';
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || '';
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
var SourceMapConsumer = sourceMapConsumer.SourceMapConsumer;

/**
 * 校正异常的堆栈信息
 * 
 * 由于 rollup 会打包所有代码到一个文件，所以异常的调用栈定位和源码的位置是不同的
 * 本模块就是用来将异常的调用栈映射至源代码位置
 * 
 * @see https://github.com/screepers/screeps-typescript-starter/blob/master/src/utils/ErrorMapper.ts
 */


// 缓存 SourceMap
let consumer = null;

// 第一次报错时创建 sourceMap
const getConsumer = function () {
    if (consumer == null) consumer = new SourceMapConsumer(require("main.js.map"));
    return consumer
};

// 缓存映射关系以提高性能
const cache = {};

/**
 * 使用源映射生成堆栈跟踪，并生成原始标志位
 * 警告 - global 重置之后的首次调用会产生很高的 cpu 消耗 (> 30 CPU)
 * 之后的每次调用会产生较低的 cpu 消耗 (~ 0.1 CPU / 次)
 *
 * @param {Error | string} error 错误或原始追踪栈
 * @returns {string} 映射之后的源代码追踪栈
 */
const sourceMappedStackTrace = function (error) {
    const stack = error instanceof Error ? error.stack : error;
    // 有缓存直接用
    if (cache.hasOwnProperty(stack)) return cache[stack]

    const re = /^\s+at\s+(.+?\s+)?\(?([0-z._\-\\\/]+):(\d+):(\d+)\)?$/gm;
    let match;
    let outStack = error.toString();
    console.log("ErrorMapper -> sourceMappedStackTrace -> outStack", outStack);

    while ((match = re.exec(stack))) {
        // 解析完成
        if (match[2] !== "main") break
        
        // 获取追踪定位
        const pos = getConsumer().originalPositionFor({
            column: parseInt(match[4], 10),
            line: parseInt(match[3], 10)
        });

        // 无法定位
        if (!pos.line) break
        
        // 解析追踪栈
        if (pos.name) outStack += `\n    at ${pos.name} (${pos.source}:${pos.line}:${pos.column})`;
        else {
            // 源文件没找到对应文件名，采用原始追踪名
            if (match[1]) outStack += `\n    at ${match[1]} (${pos.source}:${pos.line}:${pos.column})`;
            // 源文件没找到对应文件名并且原始追踪栈里也没有，直接省略
            else outStack += `\n    at ${pos.source}:${pos.line}:${pos.column}`;
        }
    }

    cache[stack] = outStack;
    return outStack
};

/**
 * 错误追踪包装器
 * 用于把报错信息通过 source-map 解析成源代码的错误位置
 * 和原本 wrapLoop 的区别是，wrapLoop 会返回一个新函数，而这个会直接执行
 * 
 * @param next 玩家代码
 */
const errorMapper = function (next) {
    return () => {
        try {
            // 执行玩家代码
            next();
        }
        catch (e) {
            if (e instanceof Error) {
                // 渲染报错调用栈，沙盒模式用不了这个
                const errorMessage = Game.rooms.sim ?
                    `沙盒模式无法使用 source-map - 显示原始追踪栈<br>${_.escape(e.stack)}` :
                    `${_.escape(sourceMappedStackTrace(e))}`;
                
                console.log(`<text style="color:#ef9a9a">${errorMessage}</text>`);
            }
            // 处理不了，直接抛出
            else throw e
        }
    }
};

var factory_room$1 = {
    nameGet: nameGet$1,
    sequenceGet: sequenceGet$1,
    nameGetSequence: nameGetSequence$1,
    sequenceGetName: sequenceGetName$1
};

function nameGet$1(name) {
    return Game.rooms[name];
}

function sequenceGet$1(sequence) {
    return Game.rooms[sequenceGetName$1(sequence)];
}

function nameGetSequence$1(name) {
    let sequence = _.findIndex(globalData.rooms, (room) => room.name == name);
    if (sequence == -1) {
        return 1;
    }
    return sequence + 1;
}

function sequenceGetName$1(sequence) {
    if (sequence > globalData.rooms.length || sequence < 1) {
        return globalData.rooms[0].name;
    }
    return globalData.rooms[sequence - 1].name;
}

// 联盟 统一入口
function Alliance_run (DataArr, _this, objectFun) {
    _.forEach(DataArr, i => {
        if (i.name == globalData.username) {
            i.run(_this, objectFun);
        }
    });
}

// 联盟 初始化 房间
var Alliance_initialization_room = [
    {
        name: globalData.Alliance[0].username,
        run: function (_this, objectFun) {
            let roomName = globalData.rooms[0].name;

            objectFun.iniRoom(roomName);
        }
    }
];

// 联盟 初始化 全局数据
var Alliance_initialization_globalData = [
    {
        name: globalData.Alliance[0].username,
        run: function (_this, objectFun) {

        }
    }
];

function factory_initialization () {
    return errorMapper(() => {
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

        // 联盟 初始化 房间 入口
        Alliance_run(Alliance_initialization_room, this, {
            iniRoom: iniRoom
        });

        clog("【初始化】【结束】 Time " + Game.time);
    })
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
    // 获取当前使用代码的游戏用户名
    let username = '';
    if (Game.spawns.length > 0) username = Game.spawns[0].owner.username;
    if (username) {
        globalData.username = username;
    }

    // 从联盟配置里把房间配置取出来
    const globalDataAlliance = _.find(globalData.Alliance, (value) => value.username == username);
    if (globalDataAlliance) {
        globalData.rooms = globalDataAlliance.rooms;
    }

    // 把当前全部基地名称获取成数组
    let rooms = {};
    _.forEach(Game.spawns, spawn => {
        let roomName = spawn.room.name;
        if (!rooms[roomName].spawns) rooms[roomName].spawns = [];
        rooms[roomName].spawns.push({
            name: spawn.name
        });
    });

    // 通过房间，把基地名称数组分类
    _.forEach(Game.rooms, room => {
        let roomName = room.name;
        const globalDataRoomIndex = _.findIndex(globalData.rooms, (value) => value.name == room.name);
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

    // 联盟 初始化 全局数据 入口
    Alliance_run(Alliance_initialization_globalData, this, {});

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

    let room = factory_room$1.nameGet(roomName);
    let roomSequence = factory_room$1.nameGetSequence(roomName);

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

var factory_spawn = {
    getNameAllArray: getNameAllArray,
    nameGet: nameGet,
    sequenceGet: sequenceGet,
    nameGetSequence: nameGetSequence,
    sequenceGetName: sequenceGetName,
    sequenceGetRoomSequence: sequenceGetRoomSequence,
    nameGetRoomName: nameGetRoomName
};

function getNameAllArray() {
    return _.chain(globalData.rooms)
        .map('spawns') // 获取各房间的spawns数组
        .flatten() // 将嵌套的spawns数组扁平化为一个单一数组
        .map('name') // 映射每个spawn对象的name属性
        .value(); // 获取最终处理的结果数组
}

function nameGet(name) {
    return Game.spawns[name];
}

function sequenceGet(sequence) {
    return Game.spawns[sequenceGetName(sequence)];
}

function nameGetSequence(name) {
    let spawnNameAllArray = getNameAllArray();
    let sequence = _.indexOf(spawnNameAllArray, name);
    if (sequence == -1) {
        return 1;
    }
    return sequence + 1;
}

function sequenceGetName(sequence) {
    let spawnNameAllArray = getNameAllArray();
    if (sequence > spawnNameAllArray.length || sequence < 1) {
        return spawnNameAllArray[0];
    }
    return spawnNameAllArray[sequence - 1];
}

// 基地序号获取房间序号
function sequenceGetRoomSequence(sequence) {
    let roomName = sequenceGet(sequence).room.name;
    return nameGetSequence(roomName);
}

// 基地名称获取房间名称
function nameGetRoomName(name) {
    return nameGet(name).room.name;
}

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
        let roomName = factory_room$1.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.harvest + Game.time;

        if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.harvest.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.harvest.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if ( /*Object.keys(Game.creeps).length < 1 ||*/ harvests) {
            // 当总creep数量小于2时,使用缩减版进行快速发展（注意：当建筑只剩基地时最高能量300）
            if (harvests.length < 1) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.harvest
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.harvest.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (harvests.length > 2 && controller_level >= 4) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.harvest
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
        let roomName = factory_room$1.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.carrier + Game.time;
        if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.carrier.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.carrier.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (carriers) {
            if (carriers.length < 1) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.carrier
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
                    if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.carrier
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
        let roomName = factory_room$1.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.upgrader + Game.time;
        if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.upgrader.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.upgrader.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (upgraders) {
            if (upgraders.length < 1) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.upgrader
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.upgrader.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (upgraders.length > 2 && controller_level >= 4) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.upgrader
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
        let roomName = factory_room$1.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.builder + Game.time;
        if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.builder.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.builder.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (builders) {
            if (builders.length < 1) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.builder
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.builder.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (builders.length > 2 && controller_level >= 4) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.builder
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
        let roomName = factory_room$1.sequenceGetName(roomSequence);
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
        if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.repairer.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.repairer.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (repairers) {
            if (repairers.length < 1) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.repairer
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.repairer.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (repairers.length > 2 && controller_level >= 4) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.repairer
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
        let roomName = factory_room$1.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.nearDefender + Game.time;
        if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.nearDefender.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.nearDefender.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (nearDefenders) {
            if (nearDefenders.length < 1) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.nearDefender
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.nearDefender.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (nearDefenders.length > 2 && controller_level >= 4) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.nearDefender
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
        let roomName = factory_room$1.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.farDefender + Game.time;
        if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.farDefender.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.farDefender.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (farDefenders) {
            if (farDefenders.length < 1) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.farDefender
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.farDefender.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (farDefenders.length > 2 && controller_level >= 4) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.farDefender
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
        let roomName = factory_room$1.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.occupier + Game.time;
        if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.occupier.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.occupier.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (occupiers) {
            if (occupiers.length < 1) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.occupier
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.occupier.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (occupiers.length > 2 && controller_level >= 4) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.occupier
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
        let roomName = factory_room$1.sequenceGetName(roomSequence);
        let bodys;
        let newName = globalData.theHealer + Game.time;
        if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.theHealer.bodys
            .totalEnergyRequired) {
            bodys = globalData.creepConfigs.theHealer.bodys.list;
        } else {
            return '房间总能量数量未达到限制，无法生产';
        }
        if (theHealers) {
            if (theHealers.length < 1) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.theHealer
                    .bodysMinus
                    .totalEnergyRequired) {
                    bodys = globalData.creepConfigs.theHealer.bodysMinus.list;
                } else {
                    return 'Minus 房间总能量数量未达到限制，无法生产';
                }
            }
            if (theHealers.length > 2 && controller_level >= 4) {
                if (factory_room$1.nameGet(roomName).energyAvailable >= globalData.creepConfigs.theHealer
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
        let roomSequence = factory_room.nameGetSequence(roomName);

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
                                                let returnData = factory_room.nameGet(roomName)
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
                    factory_creep$1.moveTo(creep, source, 'Resource');
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
                const harvests = factory_creep$1.Harvest.ALL(roomName);
                if (_.size(harvestBuildCONTAINERList) < harvests.length) {
                    if (harvestBuildCONTAINERList[creep.name]) {
                        // 建造
                        if (creep.build(found[0]) == ERR_NOT_IN_RANGE) {
                            factory_creep$1.moveTo(creep, found[0]);
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
                    factory_creep$1.moveTo(creep, target);
                }
            } else {
                // 储存能量都满了不用搬运能量,先干其他
                let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length > 0) {
                    // 建造
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        factory_creep$1.moveTo(creep, targets[0]);
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
                            factory_creep$1.moveTo(creep, targets[0]);
                        }
                    }
                }
                if (targets.length < 1) {
                    // 升级
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        factory_creep$1.moveTo(creep, creep.room.controller);
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
                    factory_creep$1.moveTo(creep, creep.room.controller);
                }
            } else {
                if (creep.room.controller.sign.username != globalData.username) {
                    // 对控制器签名
                    if (creep.signController(creep.room.controller, "peaceful development.") ==
                        ERR_NOT_IN_RANGE) {
                        factory_creep$1.moveTo(creep, creep.room.controller);
                    }
                } else {
                    // 升级
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        factory_creep$1.moveTo(creep, creep.room.controller);
                    }
                }
            }

        } else { // 采集状态 + 可视化
            const harvests = factory_creep$1.Harvest.ALL(roomName);
            if (harvests.length < 1) {
                // 采集死完后,自己去采集
                let target = creep.pos.findClosestByPath(FIND_SOURCES);
                if (target) {
                    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        factory_creep$1.moveTo(creep, target, 'Resource');
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
                            factory_creep$1.moveTo(creep, target, 'Resource');
                        }
                        return
                    }
                }

                if (target) {
                    // 从建筑(structure)中拿取资源
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        factory_creep$1.moveTo(creep, target, 'Resource');
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
					factory_creep$1.moveTo(creep, targets[0]);
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
						factory_creep$1.moveTo(creep, targets[0]);
					}
				}
				
				if (targets.length < 1) {
					// 升级
					if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
						factory_creep$1.moveTo(creep, creep.room.controller);
					}
				}
			}
		} else { // 非work状态的时候， 到source旁边并采集
			const harvests = factory_creep$1.Harvest.ALL(roomName);
			if (harvests.length < 1) {
				// 采集死完后,自己去采集
				let target = creep.pos.findClosestByPath(FIND_SOURCES);
				if (target) {
					if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
						factory_creep$1.moveTo(creep, target, 'Resource');
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
							factory_creep$1.moveTo(creep, target, 'Resource');
						}
						return
					}
				}

				if (target) {
					// 从建筑(structure)中拿取资源
					if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						// 向目标移动
						factory_creep$1.moveTo(creep, target, 'Resource');
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
                    factory_creep$1.moveTo(creep, target, 'Resource');
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
                            factory_creep$1.moveTo(creep, target, 'Resource');
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
                                    let returnData = factory_room$1.nameGet(roomName)
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
                            let on = false;
                            for (let i = 0; i < spaceXYList.length; i++) {
                                try {
                                    if (spaceXYList[i].list.length < 1) {
                                        memoryContainerListNull = i;
                                        on = true;
                                        break;
                                    }
                                } catch (e) {
                                    //TODO handle the exception
                                    spaceXYList[i].list = [];
                                }
                            }
                            if (on) break;
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
                        factory_creep$1.moveTo(creep, source, 'Resource');
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
                        factory_creep$1.moveTo(creep, storage);
                        break;
                    }
                }
                return;
            }
        }
        // 将资源从该 creep 转移至其他对象
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            // 向目标移动
            factory_creep$1.moveTo(creep, targets[0]);
        }
    } else {
        // 储存能量都满了不用搬运能量,先干其他
        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length > 0) {
            // 建造
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                factory_creep$1.moveTo(creep, targets[0]);
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
                    factory_creep$1.moveTo(creep, targets[0]);
                }
            }
        }
        if (targets.length < 1) {
            // 升级
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                factory_creep$1.moveTo(creep, creep.room.controller);
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
                    factory_creep$1.moveTo(creep, source);
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
                    factory_creep$1.moveTo(creep, targets[0]);
                }
            } else {
                // 不用维修了,先干其他
                let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length > 0) {
                    // 建造
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        factory_creep$1.moveTo(creep, targets[0]);
                    }
                }
                if (targets.length < 1) {
                    // 升级
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        factory_creep$1.moveTo(creep, creep.room.controller);
                    }
                }
            }
        } else { // 非work状态的时候， 到source旁边并采集
            const harvests = factory_creep$1.Harvest.ALL(roomName);
            if (harvests.length < 1) {
                // 采集死完后,自己去采集
                let target = creep.pos.findClosestByPath(FIND_SOURCES);
                if (target) {
                    if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        factory_creep$1.moveTo(creep, target, 'Resource');
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
                            factory_creep$1.moveTo(creep, target, 'Resource');
                        }
                        return
                    }
                }

                if (target) {
                    // 从建筑(structure)中拿取资源
                    if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        // 向目标移动
                        factory_creep$1.moveTo(creep, target, 'Resource');
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

    /** @param {Creep} creep **/
    run: function (creep) {
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
            factory_creep$1.moveTo(creep, target);
        }
    }

}

function farDefenderRun(creep) {
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
        // 远程攻击其他 creep 或者建筑
        if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
            factory_creep$1.moveTo(creep, target);
        }
    }

    // const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);

    // if (targets.length > 0) {
    // 	// 3 格范围内的所有敌方 creep 和建筑进行攻击
    // 	// creep.rangedMassAttack();

    // 	// 远程攻击其他 creep 或者建筑
    // 	if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE) {
    // 		factory_creep.moveTo(creep, targets[0]);
    // 	}
    // }

}

// 治疗
var factory_creep_TheHealer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.hits < object.hitsMax;
            }
        });
        if (target) {
            // 治疗
            if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                factory_creep$1.moveTo(creep, target);
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

    /** @param {Creep} creep **/
    run: function (creep, roomName) {
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

        // factory_creep.Occupy.run(Game.creeps['builder54894683'],'W48S54');

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
            factory_creep$1.moveTo(creep, new RoomPosition(43, 17, roomName));
        } else {
            // 如果房间存在了就说明已经进入了该房间
            // 移动到房间的控制器并占领
            if (creep.claimController(room.controller) == ERR_NOT_IN_RANGE) {
                factory_creep$1.moveTo(creep, room.controller);
            }

            // 预定控制器
            // if (creep.reserveController(room.controller) == ERR_NOT_IN_RANGE) {
            // 	creep.moveTo(room.controller);
            // }

            // 对控制器签名
            // if (creep.signController(room.controller, "I'm going to claim this room in a few days.") ==
            if (creep.signController(room.controller, "peaceful development.") ==
                ERR_NOT_IN_RANGE) {
                factory_creep$1.moveTo(creep, room.controller);
            }

        }

        // factory_spawn.nameGet(spawnName).spawnCreep([WORK, CARRY, MOVE, CLAIM],
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

/*
 被动指派任务-》小兵完成当前任务来领取新的任务-》优先级计算是否允许领取
 主动指派任务给空的小兵-》优先级
 优先级，计算距离，小兵类型，小兵属性
 建立一个有空小兵的列表，第一次运行初始化程序中，任务中心主动找出所有空闲小兵，然后根据优先级进行指派
 任务中心。第一步：建立任务，第二步：派发任务
 下面各种执行任务（塔，爬爬等）
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

        factory_creep_Harvest.ALL(roomName);
        factory_creep_Upgrader.ALL(roomName);
        factory_creep_Builder.ALL(roomName);
        factory_creep_Carrier.ALL(roomName);
        factory_creep_Repairer.ALL(roomName);
        factory_creep_Defender.ALLNearDefender(roomName);
        factory_creep_Defender.ALLFarDefender(roomName);
        factory_creep_TheHealer.ALL(roomName);
        factory_creep_Occupier.ALL(roomName);

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
        let room = factory_room$1.nameGet(roomName);

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
        let room = factory_room$1.nameGet(roomName);

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
    let room = factory_room$1.nameGet(roomName);

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
    let targets = factory_room$1.nameGet(roomName).find(FIND_STRUCTURES, {
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
    let room = factory_room$1.nameGet(roomName);

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
                    targets = factory_room$1.nameGet(roomName).find(FIND_STRUCTURES, {
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
    const controller_level = factory_room$1.nameGet(roomName).controller.level;

    // 能量源区
    let sources = factory_room$1.nameGet(roomName).find(FIND_SOURCES);

    // 母巢 (spawn) 是否正在孵化一个新的 creep
    if (factory_spawn.nameGet(spawnName).spawning) {
        // 孵化，过程可视化
        let spawningCreep = Game.creeps[factory_spawn.nameGet(spawnName).spawning.name];
        factory_room$1.nameGet(roomName).visual.text(
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


        let towers = factory_room$1.nameGet(roomName).find(FIND_STRUCTURES, {
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
        } else if (occupiers.length < 1 && globalData.creepConfigs.occupier.number >= 1 && factory_room$1.nameGet(roomName).energyCapacityAvailable >= 650) {
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

function run_1755616537 (_this, objectFun) {
    // 任务调度启动
    controller_task();
    // 房间管理
    controller_room();
    // creep管理
    controller_creep();
}

// 联盟 amin
var Alliance_main = [
    {
        name: globalData.Alliance[0].username,
        run: function (_this, objectFun) {
            run_1755616537();
        }
    },
    {
        name: globalData.Alliance[1].username,
        run: function (_this, objectFun) {
        }
    }
];

// 代码中文解释
/// <reference types="@screepscn/types" />


const loop = errorMapper(() => {
    // 联盟 amin 入口
    Alliance_run(Alliance_main, undefined, {});
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
.废弃（可能会缺失部件导致程序错误，能量消费不是最优解）.多一种角色管理系统，不区分兵种，先统一分配后固定站岗，缺少了补上，1对1搬运
.统一任务调度机制
.creep阵型，攻击拉扯
.自动铺路，能量源，控制器。方案1：两点最近距离（PathFinder.search）.方案2：走得次数多的地方铺路
.createConstructionSite自动布局EXTENSION建筑 控制器等级3布局TOWER
.外能量源采集（根据给定的房间名列出所有可用的出口Game.map.describeExits）
.每个STORAGE搭配一个运输者。如果存在STORAGE并且搭配有运输者，其他运输者才可以把能量放到STORAGE
.spawn是否停止获取能量，先用于生产
.可以选择根据room总能量上限energyCapacityAvailable动态调整配置，energyAvailable来判断是否可以生产
.TOWER逻辑顺序攻击，维修，治疗，运输者是否1v1运送能量或者1vN运送能量
.安全模式，发现敌人安全模式开启，在外creep返回墙内.计算危险区域(Terrain静态地形)，当开启安全模式，creep不得移动到危险区域，除了攻击者除外
.矿床Mineral，稀有资源储备Deposit。自动9*9内建CONTAINER(允许在路road上面建)，限制就1个CONTAINER
.限制每个能量源就1个CONTAINER
.BUG.把自动建CONTAINER允许在路road和可穿透墙rampart上面建
.设置限制TOWER维修rampart到1M就不维修
.采集者，升级者，会根据区域9*9哪里有CONTAINER或正在建造的CONTAINER坐标上面站着，如果已经站有一个，不做此限制
生产creep时，在memory上记录属于的spawn和room。（一个room可能会有多个spawn）.BUG.把通过spawnName获取roomSequence,通过roomSequence获取spawnName代码更改
.BUG.在获取roomSequence时判断roomName是否存在配置中，如果不存在抛出异常
.多个spawn同时生产creep时，用类型名称+时间+spawn名称+_.uniqueId（harvest_564563_spawn1_100）
.任务调派运输资源查看creep的store剩余可储存的数量在判断是否需要多名一起运输
.renewCreep增加目标 creep 的剩余生存时间
.核弹原爆点FIND_NUKES,邮件提示并且房间文本显示（发射此核弹的房间名launchRoomName+着落倒计时timeToLand）
.核弹的爆炸范围是以落点为中心的 5 * 5 的正方形区域。建设防御核弹建筑布局
.自动统计计算出每个区域的范围，已不可通行的建筑为划分。计算危险区域（临近传送区域的区域）
.利用远程传输建筑实现房间里能量平衡
.警报模式。当房间出现敌人，计算敌人数量，携带部件，危险程度。通过危险程度启动应当程序（优先启动能量平衡，防御治疗兵种生成）

完成程序:
.(废弃(改完出现错误)[此名称是 Game.creeps 对象中指向该 creep 对象的哈希键]).把小兵ID放到memory里面，不在使用小兵名称作为唯一ID值判断，改为小兵ID
.每个运输者可以配置是否固定能量源区运输,属于的在自由选择
.采集如果脚下有CONTAINER，挖完就放进CONTAINER（没带carry部件或者满了，再采集能量会自动掉脚下，如果脚下有容器就会自动进容器了）
.在升级控制器的9*9空位其中一个上放置一个CONTAINER（并且检测是否在控制器7*7范围内），多个升级小兵共享一个CONTAINER
.受到攻击掉血开启安全模式(getEventLog),Tower开启优先攻击模式
.采集者，在能量源区脚下的CONTAINER未建成，先采集能量了自己建，在运输到需要运输的地方。至少留下一个运输到基地，不自己建
.运输者，（取，放）状态切换，去取CONTAINER能量后可以选择去捡能量也可以去放
.运输者一对一搬运，把搬运目标地址写在运输者缓存里面，不在重复循环消耗CPU，new一个RoomPosition
.把每种小兵的取用能量加上状态,取满在用,用完在取
.当控制器区存在有能量的CONTAINER,从控制器区存的CONTAINER取能量
.BUG.能量源区CONTAINER记录信息,控制器CONTAINER记录信息,在creep死亡后,没有正常删除信息,导致无法加入新creeps记录
.Game.notify邮件提示配置开关添加,统一入口使用，限制一分钟内有相同信息不重复发送
.在room受到攻击，记录受到攻击对象的id和时间，在摧毁时查询记录是否在固定时间内（5）受到攻击，才开启安全模式
.在一分钟内受到攻击，并且我方建筑物被摧毁，才开启控制器安全模式
.离STORAGE最近的TOWER，才会消耗能量补充墙壁
 */

exports.loop = loop;
//# sourceMappingURL=main.js.map
