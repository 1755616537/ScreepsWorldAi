// 占领
export default {
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
                factory.creep.moveTo(creep, room.controller)
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
}


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