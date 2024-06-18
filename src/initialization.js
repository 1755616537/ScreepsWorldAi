import factory_room from "./factory/room.js";

import Alliance_run from './Alliance/run.js'
import Alliance_initialization_room from './Alliance/initialization/room.js'
import Alliance_initialization_globalData from './Alliance/initialization/globalData.js'

export {iniglobalData}

export default function () {
    clog('【挂载拓展】【完成】 Time ' + Game.time)
    clog("【脚本加载】 Time " + Game.time + " , bucket " + Game.cpu.bucket);

    clog("【初始化】【开始】 Time " + Game.time);

    // 客户端汉化显示
    // Utils.cn();
    clog('【提示】: 手动汉化输入【Utils.cn();】');

    if (!Memory.rooms) {
        Memory.rooms = {
            source: {},
            controller: {}
        }
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
}

function iniRoom(roomName) {
    if (!Memory.rooms[roomName]) {
        Memory.rooms[roomName] = {}
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
    for (let key in Game.spawns) {
        if (Game.spawns.hasOwnProperty(key)) {
            username = Game.spawns[key].owner.username;
            break;
        }
    }
    clog('username', username)
    if (username) {
        globalData.username = username;
    }

    // 从联盟配置里把房间配置取出来
    const globalDataAlliance = _.find(globalData.Alliance, (value) => value.username == username);
    if (globalDataAlliance) {
        globalData.rooms = globalDataAlliance.rooms;
    }
    // clog('rooms', JSON.stringify(globalData.rooms))

    // 把当前全部基地名称获取成数组
    let rooms = [];
    _.forEach(Game.spawns, spawn => {
        let roomName = spawn.room.name;
        let roomsIndex = _.findIndex(rooms, (value) => value.name == roomName);
        if (roomsIndex == -1) {
            rooms.push({
                name: roomName,
                spawns: []
            });
            roomsIndex = rooms.length - 1;
        }

        if (!rooms[roomsIndex].spawns) rooms[roomsIndex].spawns = [];
        rooms[roomsIndex].spawns.push({
            name: spawn.name
        });
    });

    // 通过房间，把基地名称数组分类
    _.forEach(Game.rooms, room => {
        let roomName = room.name;
        const globalDataRoomIndex = _.findIndex(globalData.rooms, (value) => value.name == room.name);
        const roomsIndex = _.findIndex(rooms, (value) => value.name == roomName);
        let globalDataRoom = {};
        // console.log('roomsIndex', roomsIndex)
        // console.log('rooms[roomsIndex]', JSON.stringify(rooms[roomsIndex]))
        if (globalDataRoomIndex == -1) {
            globalDataRoom = {
                name: roomName,
                spawns: rooms[roomsIndex].spawns
            };
        } else {
            globalDataRoom = globalData.rooms[globalDataRoomIndex];
            // console.log('globalDataRoom', JSON.stringify(globalDataRoom))
            // 基地配置
            if (!globalDataRoom.spawns) globalDataRoom.spawns = [];
            // console.log('spawns1', JSON.stringify(globalDataRoom.spawns))
            let spawns = globalDataRoom.spawns;
            // 合并 过滤已存在
            // console.log('rooms[roomsIndex].spawns', JSON.stringify(rooms[roomsIndex].spawns))
            spawns = spawns.concat(rooms[roomsIndex].spawns);
            // console.log('spawns', JSON.stringify(spawns))
            spawns = Utils.uniqueObjectsByContent(spawns);
            globalDataRoom.spawns = spawns;
            // console.log('spawns2', JSON.stringify(spawns))
        }


        // 房间配置
        if (globalData.roomsAllAllocation.on) {
            // 合并 覆盖
            globalDataRoom = _.merge(globalDataRoom, globalData.roomsAllAllocation.content);
        } else {
            // console.log('globalDataRoom', JSON.stringify(globalDataRoom))
            // console.log('roomsAllAllocation', JSON.stringify(globalData.roomsAllAllocation.content))
            // 合并 过滤已存在
            globalDataRoom = Object.assign({}, globalData.roomsAllAllocation.content, globalDataRoom);
            // console.log('globalDataRoom', JSON.stringify(globalDataRoom))
        }
        if (globalDataRoomIndex == -1) {
            globalData.rooms.push(globalDataRoom);
        } else {
            // console.log('globalDataRoomIndex',globalDataRoomIndex)
            // console.log('globalData.rooms', JSON.stringify(globalData.rooms))
            globalData.rooms[globalDataRoomIndex] = globalDataRoom;
        }

    });

    // 把没有拥有的房间去掉，有时候会手动在配置加上房间信息，但实际没有拥有此房间就会报错
    let delArray = [];
    _.forEach(globalData.rooms, (value, index) => {
        // console.log(JSON.stringify(value), index,Game.rooms.length)
        let on = false;
        for (const i in Game.rooms) {
            // console.log('Game.rooms', Game.rooms[i].name, 'value.name', value.name)
            if (Game.rooms[i].name == value.name) {
                on = true
                break
            }
        }
        if (!on) {
            delArray.push(value.name)
        }
    });
    // console.log('delArray', JSON.stringify(delArray))
    for (let i = 0; i < delArray.length; i++) {
        let index = _.findIndex(globalData.rooms, (value) => value.name == delArray[i]);
        globalData.rooms.splice(index, 1);
    }
    // console.log('globalData.rooms', JSON.stringify(globalData.rooms))
    // console.log('Game.rooms', JSON.stringify(Game.rooms))

    // 联盟 初始化 全局数据 入口
    Alliance_run(Alliance_initialization_globalData, this, {});

}

// 能量源区块初始化
function iniSource(roomName) {
    if (!Memory.rooms[roomName].source) {
        Memory.rooms[roomName].source = {}
    }
}

// 控制器块初始化
function iniController(roomName) {
    if (!Memory.rooms[roomName].controller) {
        Memory.rooms[roomName].controller = {}
    }

    let room = factory_room.nameGet(roomName);
    let roomSequence = factory_room.nameGetSequence(roomName);

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
                    }
                }
            }
        }
    }

}
