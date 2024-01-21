global.factory.spawn = {
	get: (sequence) => {
		switch (sequence) {
			case 1:
				return Game.spawns[globalData.room[0].SpawnName];
				break;
			case 2:
				return Game.spawns[globalData.room[1].SpawnName];
				break;
			case 3:
				return Game.spawns[globalData.room[2].SpawnName];
				break;
			default:
				return Game.spawns[globalData.room[0].SpawnName];
		}
	},
	nameGetSequence: (name) => {
		if (name == globalData.room[0].SpawnName) {
			return 1;
		} else if (name == globalData.room[1].SpawnName) {
			return 2;
		} else if (name == globalData.room[2].SpawnName) {
			return 3;
		}
		return 1;
	}
}