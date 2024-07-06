module.exports = {

	run: function(creep) {

		/* 如果爬虫处于建筑状态且负载的能量为0的时候*/

		/* && 且 左右两边都为真时即为真，一假即假*/

		if (creep.memory.building && creep.carry.energy == 0) {

			/* 将爬虫设置为非建筑状态，并说出🔄 harvest*/

			creep.memory.building = false;

			creep.say('🔄 harvest');

		}

		/* 如果爬虫不处于建筑状态且爬虫能量满载的时候*/

		if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {

			/* 将爬虫设置为建筑状态，并说出🔄 harvest*/

			creep.memory.building = true;

			creep.say('🚧 build');

		}

		/* 如果爬虫处于建筑状态*/

		if (creep.memory.building) {

			/* 获取当前爬虫房间内的待建设的建筑数组。（没有编程基础的同学可以理解为一个有序的列表）*/

			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

			/* targets.length 获取数组的长度*/

			/* 写给无编程基础的同学，if语句的括号内是布尔型变量。但是括号内如果是0则代表假。*/

			/* 如果有等待的需要建造的建筑（无法理解可以改为if（targets.length > 0）*/

			if (targets.length) {

				/* 建造建筑列表里的第一个，如果不在范围内*/

				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {

					/* 向该建筑移动，并用颜色#ffffff标记路线*/

					creep.moveTo(targets[0], {
						visualizePathStyle: {
							stroke: '#ffffff'
						}
					});

				}

			}

		}

		/* 否则去采集资源 */
		else {

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