export default {
    nameGet: nameGet,
    sequenceGet: sequenceGet,
    nameGetSequence: nameGetSequence,
    sequenceGetName: sequenceGetName
}

/**
 * @param name 房间名称
 * @param my 校验是否自己的房间
 */
function nameGet(name, my = false) {
    if (my) {
        const globalDataRoomIndex = _.findIndex(globalData.rooms, (value) => value.name == name);
        if (globalDataRoomIndex == -1) {
            return null;
        }
    }
    return Game.rooms[name];
}

/**
 * @param name 房间名称
 * @param my 校验是否自己的房间
 */
function sequenceGet(sequence, my = false) {
    let name = sequenceGetName(sequence);
    if (my) {
        const globalDataRoomIndex = _.findIndex(globalData.rooms, (value) => value.name == name);
        if (globalDataRoomIndex == -1) {
            return null;
        }
    }
    return Game.rooms[name];
}

function nameGetSequence(name) {
    let sequence = _.findIndex(globalData.rooms, (room) => room.name == name)
    if (sequence == -1) {
        return 1;
    }
    return sequence + 1;
}

function sequenceGetName(sequence) {
    if (sequence > globalData.rooms.length || sequence < 1) {
        return globalData.rooms[0].name;
    }
    return globalData.rooms[sequence - 1].name;
}
