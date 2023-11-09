global.factory.spawns = {
	get: (sequence) => {
		switch (sequence) {
			case 1:
				Game.spawns[pathData.SpawnName1];
				break;
			case 2:
				Game.spawns[pathData.SpawnName2];
				break;
			case 3:
				Game.spawns[pathData.SpawnName3];
				break;
			default:
				Game.spawns[pathData.SpawnName1];
		}
	}
}