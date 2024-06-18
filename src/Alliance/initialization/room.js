// 联盟 初始化 房间
export default [
    {
        name: globalData.Alliance[0].username,
        run: function (_this, objectFun) {
            // console.log('globalData.rooms', JSON.stringify(globalData.rooms))
            let roomName = globalData.rooms[0].name;

            objectFun.iniRoom(roomName);

            // 因为程序更改，临时过度需要
            if (globalData.rooms[0].name == 'W47S54') {
                _.forEach(Game.creeps, creep => {
                    if (creep.memory.spawn && creep.memory.spawn == 1) {
                        creep.memory.roomName = 'W47S54'
                    }
                })
            }

        }
    }
]