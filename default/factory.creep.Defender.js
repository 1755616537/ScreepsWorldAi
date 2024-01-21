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
	
	if(spawn){
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.nearDefender && creep.memory
			.spawn == spawn));
	}else{
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.nearDefender);
	}
	return returnData;
}

function allFarDefender(spawn) {
	let returnData;
	
	if(spawn){
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.farDefender && creep.memory
			.spawn == spawn));
	}else{
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.farDefender);
	}
	return returnData;
}