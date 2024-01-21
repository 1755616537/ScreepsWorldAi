global.factory.creep.TheHealer = {
	run: (creep) => {},
	ALL: (...e) => {
		return all(...e);
	}
}

function all(spawn) {
	let returnData;
	
	if(spawn){
		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.theHealer && creep.memory
			.spawn == spawn));
	}else{
		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.theHealer);
	}
	return returnData;
}