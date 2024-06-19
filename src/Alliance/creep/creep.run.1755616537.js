export default function (_this, objectFun) {
    objectFun.spawnProduceCreep(globalData.rooms[0].spawns[0].name);
    return
    _.forEach(globalData.rooms, (room) => {
        objectFun.spawnProduceCreep(room.spawns[0].name);
    })
}