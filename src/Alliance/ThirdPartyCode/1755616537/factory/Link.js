import factory_room from "../factory/room.js";

export default {
    run: (roomName) => {
        let room = factory_room.nameGet(roomName, true);
        if (!room) return;

        const targets = room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK) &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if (targets.length) {
            const storages = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_STORAGE;
                }
            });
            let storageClosestLink;
            if (storages.length > 0) {
                storageClosestLink = storages[0].pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_LINK;
                    }
                });
            }

            _.forEach(targets, target => {
                if (storageClosestLink && storageClosestLink.id != target.id) {
                    // target.transferEnergy(linkTo);
                }
            });
        }

    }
}