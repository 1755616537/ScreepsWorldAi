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
	if (target) {
		// 使用近战攻击
		if (creep.attack(target) == ERR_NOT_IN_RANGE) {
			factory.creep.moveTo(creep, target);
		}
	}

}

function farDefenderRun(creep) {
	const targets = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
	if (targets.length > 0) {
		// 3 格范围内的所有敌方 creep 和建筑进行攻击
		// creep.rangedMassAttack();

		// 远程攻击其他 creep 或者建筑
		creep.rangedAttack(targets[0]);
	}

}