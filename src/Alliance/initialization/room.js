// 联盟 初始化 房间
export default [
    {
        name: '1755616537',
        run: function (_this, objectFun) {
            _.forEach(globalData.rooms, (room, roomName) => {
                objectFun.iniRoom(roomName);
            })

            // 临时命令执行
            // console.log(Game.creeps['carrier63253954'].memory.SpecialActions={
            //     code:'carrier3', msg:{
            //         x:21,
            //         y:31,
            //         roomName:'W48S52'
            //     }
            // })
            // console.log(Game.rooms['W48S54'].terminal.send(RESOURCE_ENERGY, 100000, 'W49S54'))
        }
    }
]