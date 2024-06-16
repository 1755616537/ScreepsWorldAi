export default {
    run: () => {
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
        _iniglobalData();

        let roomName = globalData.rooms[0].name;

        iniRoom(roomName);

        clog("【初始化】【结束】 Time " + Game.time);
    },
    iniglobalData: (...e) => {
        return _iniglobalData(...e);
    }
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
function _iniglobalData() {
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
        Memory.rooms[roomName].source = {}
    }
}

// 控制器块初始化
function iniController(roomName) {
    if (!Memory.rooms[roomName].controller) {
        Memory.rooms[roomName].controller = {}
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
                    }
                }
            }
        }
    }

}
