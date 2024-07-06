global.factory.spawn = {
	get: (sequence) => {
		switch (sequence) {
			case 1:
				return Game.spawns[globalData.room[0].Spawn1Name];
				break;
			case 2:
				return Game.spawns[globalData.room[1].Spawn1Name];
				break;
			case 3:
				return Game.spawns[globalData.room[2].Spawn1Name];
				break;
			default:
				return Game.spawns[globalData.room[0].Spawn1Name];
		}
	},
	nameGetSequence: (name) => {
		if (name == globalData.room[0].Spawn1Name) {
			return 1;
		} else if (name == globalData.room[1].Spawn1Name) {
			return 2;
		} else if (name == globalData.room[2].Spawn1Name) {
			return 3;
		}
		return 1;
	},
	sequenceGetName: (sequence) => {
		if (sequence == 1) {
			return globalData.room[0].Spawn1Name;
		} else if (sequence == 2) {
			return globalData.room[1].Spawn1Name;
		} else if (sequence == 3) {
			return globalData.room[2].Spawn1Name;
		}
		return globalData.room[0].Spawn1Name;
	}
}