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
	// switch (spawn) {
	// 	case 1:
	// 		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.theHealer && creep.memory
	// 			.spawn == globalData.SpawnName1));
	// 		break;
	// 	case 2:
	// 		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.theHealer && creep.memory
	// 			.spawn == globalData.SpawnName2));
	// 		break;
	// 	case 3:
	// 		returnData = _.filter(Game.creeps, (creep) => (creep.memory.role == globalData.theHealer && creep.memory
	// 			.spawn == globalData.SpawnName3));
	// 		break;
	// 	default:
	// 		returnData = _.filter(Game.creeps, (creep) => creep.memory.role == globalData.theHealer);
	// }
	return returnData;
}