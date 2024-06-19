export default function (_this, objectFun) {
    _.forEach(globalData.rooms, (room) => {
        objectFun.spawnProduceCreep(room.spawns[0].name);
    })
}