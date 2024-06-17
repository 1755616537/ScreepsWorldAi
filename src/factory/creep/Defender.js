import factory_creep from "../factory/creep.js";

// 近战和远程
export default {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.role == globalData.nearDefender) {
            nearDefenderRun(creep);
        } else if (creep.memory.role == globalData.farDefender) {
            farDefenderRun(creep);
        }
    },
    ALLNearDefender: (...e) => {
        return allNearDefender(...e);
    },
    ALLFarDefender: (...e) => {
        return allFarDefender(...e);
    }
}

function allNearDefender(roomName) {
    let returnData;

    if (roomName) {
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.nearDefender && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.nearDefender);
    }
    return returnData;
}

function allFarDefender(roomName) {
    let returnData;

    if (roomName) {
        returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.farDefender && creep.memory
            .roomName == roomName));
    } else {
        returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.farDefender);
    }
    return returnData;
}

function nearDefenderRun(creep) {
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
        // 使用近战攻击
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            factory_creep.moveTo(creep, target);
        }
    }

}

function farDefenderRun(creep) {
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
        // 远程攻击其他 creep 或者建筑
        if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
            factory_creep.moveTo(creep, target);
        }
    }

    // const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);

    // if (targets.length > 0) {
    // 	// 3 格范围内的所有敌方 creep 和建筑进行攻击
    // 	// creep.rangedMassAttack();

    // 	// 远程攻击其他 creep 或者建筑
    // 	if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE) {
    // 		factory_creep.moveTo(creep, targets[0]);
    // 	}
    // }

}