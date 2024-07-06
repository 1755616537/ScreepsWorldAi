global.factory.spawn = {
    // 获取全部基地名称数组
    getNameAllArray: () => {
        return _.chain(globalData.rooms)
            .map('spawns') // 获取各房间的spawns数组
            .flatten() // 将嵌套的spawns数组扁平化为一个单一数组
            .map('name') // 映射每个spawn对象的name属性
            .value(); // 获取最终处理的结果数组
    },
    nameGet: (name) => {
        return Game.spawns[name];
    },
    sequenceGet: (sequence) => {
        return Game.spawns[factory.spawn.sequenceGetName(sequence)];
    },
    nameGetSequence: (name) => {
        let spawnNameAllArray = factory.spawn.getNameAllArray();
        let sequence = _.indexOf(spawnNameAllArray, name);
        if (sequence == -1) {
            return 1;
        }
        return sequence + 1;
    },
    sequenceGetName: (sequence) => {
        let spawnNameAllArray = factory.spawn.getNameAllArray();
        if (sequence > spawnNameAllArray.length || sequence < 1) {
            return spawnNameAllArray[0];
        }
        return spawnNameAllArray[sequence - 1];
    },
    // 基地序号获取房间序号
    sequenceGetRoomSequence: (sequence) => {
        let roomName = factory.spawn.sequenceGet(sequence).room.name;
        return factory.room.nameGetSequence(roomName);
    },
    // 基地名称获取房间名称
    nameGetRoomName: (name) => {
        return factory.spawn.nameGet(name).room.name;
    }
}