global.factory.room = {
	get: (sequence) => {
		switch (sequence) {
			case 1:
				return Game.rooms[globalData.room[0].name];
				break;
			case 2:
				return Game.rooms[globalData.room[1].name];
				break;
			case 3:
				return Game.rooms[globalData.room[2].name];
				break;
			default:
				return Game.rooms[globalData.room[0].name];
		}
	},
	nameGetSequence: (name) => {
		if (name == globalData.room[0].name) {
			return 1;
		} else if (name == globalData.room[1].name) {
			return 2;
		} else if (name == globalData.room[2].name) {
			return 3;
		}
		return 1;
	},
	sequenceGetName: (sequence) => {
		if (sequence == 1) {
			return globalData.room[0].name;
		} else if (sequence == 2) {
			return globalData.room[1].name;
		} else if (sequence == 3) {
			return globalData.room[2].name;
		}
		return globalData.room[0].name;
	}
}