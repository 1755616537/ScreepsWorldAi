global.factory.creep.TheHealer = {
	run: (creep) => {
		const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
		    filter: function(object) {
		        return object.hits < object.hitsMax;
		    }
		});
		if(target) {
			// 治疗
		    if(creep.heal(target) == ERR_NOT_IN_RANGE) {
		        factory.creep.moveTo(creep, target);
		    }
		}

	},
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