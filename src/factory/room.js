export default {
    nameGet: nameGet,
}

/**
 * @param name 房间名称
 * @param my 校验是否自己的房间
 */
function nameGet(name, my = false) {
    if (my) {
        if (!globalData.rooms[name]) {
            return null;
        }
    }
    return Game.rooms[name];
}