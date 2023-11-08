var roleBuilder = {

	/** @param {Creep} creep **/
	run: function(creep) {
		//当为建造，但没有能量的时候，身份切换为采集
		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
			reep.say('😃下班了！好耶！');
		}
		//当不为建造，但有能量的时候，身份切换为建造
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say('🚧 build');
			creep.say('😟上班了！呜呜呜');
		}
		//当为创建的时候
		if (creep.memory.building) {
			//查询所有的创建工地
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				//当有工地创建的时候，则移动建造，visualizePathStyle（可以标识路径）
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {
						visualizePathStyle: {
							stroke: '#ffffff'
						}
					});
				}
			}
		} else {
			//否则执行采集任务
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0], {
					visualizePathStyle: {
						stroke: '#ffaa00'
					}
				});
			}
		}
	}
};

module.exports = roleBuilder;