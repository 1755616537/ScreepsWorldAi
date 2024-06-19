// 联盟 初始化 房间
export default [
    {
        name: globalData.Alliance[0].username,
        run: function (_this, objectFun) {
            _.forEach(globalData.rooms, (room) => {
                objectFun.iniRoom(room.name);
            })
        }
    }
]