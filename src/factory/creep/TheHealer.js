import factory_creep from "../../factory/creep.js";

// 治疗
export default {

    /** @param {Creep} creep **/
    run: function (creep) {
        const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.hits < object.hitsMax;
            }
        });
        if (target) {
            // 治疗
            if (creep.heal(target) == ERR_NOT_IN_RANGE) {
                new factory_creep.Creep(creep).moveTo(target);
            }
        }

    },
    ALL: (...e) => {
        return all(...e);
    }
}

function all(roomName) {
    let returnData;

    if (roomName) {
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.theHealer && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.theHealer);
    }
    return returnData;
}