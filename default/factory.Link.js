global.factory.Link = {
	run: (roomName) => {
		let room = factory.room.nameGet(roomName);

		const targets = room.find(FIND_MY_STRUCTURES, {
			filter: (structure) => {
				return structure.structureType == STRUCTURE_LINK;
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
				if (storageClosestLink && storageClosestLink.id == target.id) {
					// target.transferEnergy(linkTo);
				}
			});
		}

	}
}