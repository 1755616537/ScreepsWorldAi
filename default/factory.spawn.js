global.factory.spawns = {
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
	}
}