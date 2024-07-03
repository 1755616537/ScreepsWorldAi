// 联盟 初始化 房间
export default [
    {
        name: '1755616537',
        run: function (_this, objectFun) {
            _.forEach(globalData.rooms, (room, roomName) => {
                objectFun.iniRoom(roomName);
            })
        }
    }
]