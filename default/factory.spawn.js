global.factory.spawns = {
	get: (sequence) => {
		switch (sequence) {
			case 1:
				return Game.spawns[globalData.SpawnName1];
				break;
			case 2:
				return Game.spawns[globalData.SpawnName2];
				break;
			case 3:
				return Game.spawns[globalData.SpawnName3];
				break;
			default:
				return Game.spawns[globalData.SpawnName1];
		}
	}
}