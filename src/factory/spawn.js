export default {
    getNameAllArray: getNameAllArray,
    nameGet: nameGet,
    sequenceGet: sequenceGet,
    nameGetSequence: nameGetSequence,
    sequenceGetName: sequenceGetName,
    sequenceGetRoomSequence: sequenceGetRoomSequence,
    nameGetRoomName: nameGetRoomName
}

function getNameAllArray() {
    return _.chain(globalData.rooms)
        .map('spawns') // 获取各房间的spawns数组
        .flatten() // 将嵌套的spawns数组扁平化为一个单一数组
        .map('name') // 映射每个spawn对象的name属性
        .value(); // 获取最终处理的结果数组
}

function nameGet(name) {
    return Game.spawns[name];
}

function sequenceGet(sequence) {
    return Game.spawns[sequenceGetName(sequence)];
}

function nameGetSequence(name) {
    let spawnNameAllArray = getNameAllArray();
    let sequence = _.indexOf(spawnNameAllArray, name);
    if (sequence == -1) {
        return 1;
    }
    return sequence + 1;
}

function sequenceGetName(sequence) {
    let spawnNameAllArray = getNameAllArray();
    if (sequence > spawnNameAllArray.length || sequence < 1) {
        return spawnNameAllArray[0];
    }
    return spawnNameAllArray[sequence - 1];
}

// 基地序号获取房间序号
function sequenceGetRoomSequence(sequence) {
    let roomName = sequenceGet(sequence).room.name;
    return nameGetSequence(roomName);
}

// 基地名称获取房间名称
function nameGetRoomName(name) {
    return nameGet(name).room.name;
}
