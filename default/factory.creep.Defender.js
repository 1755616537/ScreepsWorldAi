global.factory.creep.Defender = {
	run: (creep) => {},
	ALLNearDefender: (...e) => {
		return allNearDefender(...e);
	},
	ALLFarDefender: (...e) => {
		return allFarDefender(...e);
	}
}

function allNearDefender() {
	return _.filter(Game.creeps, (creep) => creep.memory.role == globalData.nearDefender);
}
function allFarDefender() {
	return _.filter(Game.creeps, (creep) => creep.memory.role == globalData.farDefender);
}