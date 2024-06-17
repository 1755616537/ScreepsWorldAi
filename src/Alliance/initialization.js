// 联盟 初始化
export default [
    {
        name: globalData.Alliance[0].username,
        run: function (_this, objectFun) {
            let roomName = globalData.rooms[0].name;

            objectFun.iniRoom(roomName);
        }
    }
]