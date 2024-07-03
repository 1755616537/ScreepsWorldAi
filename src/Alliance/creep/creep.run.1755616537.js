export default function (_this, objectFun) {
    _.forEach(globalData.rooms, (room, roomName) => {
        // 临时添加
        if (roomName == 'W47S54' || roomName == 'W48S52' || roomName == 'W48S54') {
            return
        }

        const key = Object.keys(room.spawns)[0];
        console.log('基地名称', key)
        objectFun.spawnProduceCreep(key);
    })
}