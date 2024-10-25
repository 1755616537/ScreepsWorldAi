// 为你的代码提供远处房间的视野。
export default function (roomName,roomName2) {
    return globalData.rooms[roomName].objectData.observers.observeRoom(roomName2);
}