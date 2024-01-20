global.factory.creep.Defender = {
	run: (creep) => {},
	ALLNearDefender: (...e) => {
		return allNearDefender(...e);
	},
	ALLFarDefender: (...e) => {
		return allFarDefender(...e);
	}
}

function allNearDefender(spawn) {
	let returnData;
	switch (spawn) {
		case 1:
			returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.nearDefender && creep.memory
				.spawn == globalData.SpawnName1));
			break;
		case 2:
			returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.nearDefender && creep.memory
				.spawn == globalData.SpawnName2));
			break;
		case 3:
			returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.nearDefender && creep.memory
				.spawn == globalData.SpawnName3));
			break;
		default:
			returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.nearDefender);
	}
	return returnData;
}

function allFarDefender(spawn) {
	let returnData;
	switch (spawn) {
		case 1:
			returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.farDefender && creep.memory
				.spawn == globalData.SpawnName1));
			break;
		case 2:
			returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.farDefender && creep.memory
				.spawn == globalData.SpawnName2));
			break;
		case 3:
			returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.farDefender && creep.memory
				.spawn == globalData.SpawnName3));
			break;
		default:
			returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.farDefender);
	}
	return returnData;
}