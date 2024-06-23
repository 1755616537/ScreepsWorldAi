import factory_room from "../factory/room.js";

export default {
    run: (roomName) => {
        let room = factory_room.nameGet(roomName, true);
        if (!room) return;

        const targets = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER;
            }
        });
        if (targets.length) {
            const storages = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_STORAGE;
                }
            });
            let storageClosestTower;
            if (storages.length > 0) {
                storageClosestTower = storages[0].pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_TOWER;
                    }
                });
            } else {
                const spawns = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_SPAWN;
                    }
                });
                if (spawns.length > 0) {
                    storageClosestTower = spawns[0].pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_TOWER;
                        }
                    });
                }
            }
            _.forEach(targets, target => {
                if (storageClosestTower && storageClosestTower.id == target.id) {
                    work(target, 1);
                } else {
                    work(target);
                }

                // const source = Game.getObjectById('65b28bef2bc6bc6a1b1bbf53');
                // target.attack(source);
            });
        }
    }
}

function work(tower, type) {
    // 攻击 先攻击治疗
    let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: (structure) => {
            // 白名单过滤
            for (let i = 0; i < globalData.WhitelistUsername.length; i++) {
                let username = globalData.WhitelistUsername[i];
                if (structure.owner.username == username) {
                    return false;
                }
            }

            let on = false;
            let body = structure.body;
            for (let i = 0; i < body.length; i++) {
                if (body[i].type == HEAL) {
                    on = true;
                    break
                }
            }
            return on;
        }
    });
    if (!closestHostile) {
        closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (structure) => {
                // 白名单过滤
                for (let i = 0; i < globalData.WhitelistUsername.length; i++) {
                    let username = globalData.WhitelistUsername[i];
                    if (structure.owner.username == username) {
                        return false;
                    }
                }
                return true;
            }
        });
    }
    if (closestHostile) {
        tower.attack(closestHostile);
        return
    }

    // 治疗
    let closestMYCreep = tower.room.find(FIND_MY_CREEPS, {
        filter: function (object) {
            return object.hits < object.hitsMax;
        }
    });

    closestMYCreep.sort((a, b) => a.hits - b.hits);

    if (closestMYCreep.length > 0) {
        // 治疗
        tower.heal(closestMYCreep[0]);
        return;
    }

    if (type == 1) {
        // 维修
        let targets = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.hits < structure.hitsMax;
            }
        });
        // 可通行墙壁
        if (targets.length < 1) {
            targets = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_RAMPART) &&
                        structure.hits < structure.hitsMax &&
                        structure.hits < 100 * 10000 * 1;
                }
            });
        }
        // 路
        if (targets.length < 1) {
            targets = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_ROAD) &&
                        structure.hits < structure.hitsMax;
                }
            });
        }
        // 墙壁
        if (targets.length < 1) {
            targets = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL) &&
                        structure.hits < structure.hitsMax &&
                        structure.hits < 100 * 10000 * 1;
                }
            });
        }
        if (targets.length < 1) {
            targets = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.hits < structure.hitsMax &&
                        structure.structureType != STRUCTURE_WALL &&
                        structure.structureType != STRUCTURE_RAMPART;
                }
            });
        }
        targets.sort((a, b) => a.hits - b.hits);
        if (targets.length > 0) {
            tower.repair(targets[0]);
        }
    } else {

    }

}