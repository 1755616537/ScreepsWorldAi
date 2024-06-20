export default function (_this, objectFun) {
    _.forEach(globalData.rooms, (room) => {
        // 临时添加
        if (room.name != 'W47S54' && room.name != 'W48S52' && room.name != 'W48S54') {
            return
        }

        objectFun.spawnProduceCreep(room.spawns[0].name);
    })
}