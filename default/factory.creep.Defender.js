global.factory.creep.Defender = {
	run: (creep) => {
		if (creep.memory.role == globalData.nearDefender) {
			nearDefenderRun(creep);
		} else if (creep.memory.role == globalData.farDefender) {
			farDefenderRun(creep);
		}
	},
	ALLNearDefender: (...e) => {
		return allNearDefender(...e);
	},
	ALLFarDefender: (...e) => {
		return allFarDefender(...e);
	}
}

function allNearDefender(spawn) {
	let returnData;

	if (spawn) {
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.nearDefender && creep.memory
			.spawn == spawn));
	} else {
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.nearDefender);
	}
	return returnData;
}

function allFarDefender(spawn) {
	let returnData;

	if (spawn) {
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.farDefender && creep.memory
			.spawn == spawn));
	} else {
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.farDefender);
	}
	return returnData;
}

function nearDefenderRun(creep) {
	const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	if(target) {
	    if(creep.attack(target) == ERR_NOT_IN_RANGE) {
	        creep.moveTo(target);
	    }
	}

}

function farDefenderRun(creep) {

}