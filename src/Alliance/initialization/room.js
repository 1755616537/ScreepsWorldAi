// 联盟 初始化 房间
export default [
    {
        name: '1755616537',
        run: function (_this, objectFun) {
            _.forEach(globalData.rooms, (room, roomName) => {
                objectFun.iniRoom(roomName);
            })

            临时命令执行()
        }
    }
]

function 临时命令执行(){
    try {
        // 搬运能量('harvester1', 25, 25, 'W48S54')
        // 终端发送能量('W48S54', 'W49S54', 100000)
    }catch (e) {

    }
}


function 搬运能量(爬爬名,需要搬运的建筑x坐标,需要搬运的建筑y坐标,需要搬运的房间名){
    console.log(Game.creeps[爬爬名].memory.SpecialActions={
        code:'carrier3', msg:{
            x:需要搬运的建筑x坐标,
            y:需要搬运的建筑y坐标,
            roomName:需要搬运的房间名
        }
    })
}

function 终端发送能量(需要发送的房间名,需要接收的房间名,数量){
    console.log(Game.rooms[需要发送的房间名].terminal.send(RESOURCE_ENERGY, 数量, 需要接收的房间名))
}