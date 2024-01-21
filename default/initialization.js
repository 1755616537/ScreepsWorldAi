global.initialization = {
	run: () => {
		clog('挂载拓展')
		clog("脚本加载 Time " + Game.time + " , bucket " + Game.cpu.bucket);

		// 客户端汉化显示
		// Utils.cn();
		clog('汉化 Utils.cn();');

		if (!Memory.spawn) {
			Memory.spawn = {}
		}

		// 矿区块初始化

		// 控制器块初始化
		controllerPiece(1);
	},
}

// 控制器块初始化
function controllerPiece(spawnSequence = 1) {
	let spawnName = factory.spawn.sequenceGetName(spawnSequence);
	if (!Memory.spawn[spawnName]) {
		Memory.spawn[spawnName] = {
			controller: {}
		}
	}

	let room = factory.room.get(spawnSequence);
	
	// 自动分配建设控制器区的CONTAINER
	if (globalData.room[spawnSequence - 1].AutomaticAssignControllerCONTAINER) {
		// 9*9范围自动生成CONTAINER
		let pos = room.controller.pos;
		let found = room.lookAtArea(pos.y - 1, pos.x - 1, pos.y + 1,
			pos.x + 1, true);
		// 筛选出平原和沼泽非墙壁
		let foundFilter = _.filter(found, (f) =>
			(f.terrain == 'plain' || f.terrain == 'swamp') &&
			(f.type == LOOK_STRUCTURES && f.structure.structureType != STRUCTURE_WALL));

		if (foundFilter.length > 0) {
			// 是否已经存在CONTAINER或在建的CONTAINER
			let found2 = _.filter(found, (f) => f.type == LOOK_CONSTRUCTION_SITES || (f.type == LOOK_STRUCTURES && f
				.structure.structureType == STRUCTURE_CONTAINER));
			if (found2.length < 1) {
				let x = foundFilter[0].x;
				let y = foundFilter[0].y;
				// 指定位置创建一个新的 ConstructionSite
				let returnData = room.createConstructionSite(x, y, STRUCTURE_CONTAINER);
				if (returnData != OK) {
					clog(x, y, '自动建造对应数量的CONTAINER ', returnData);
					Memory.spawn[spawnName].controller = {
						container: {
							x: x,
							y: y,
							id: null,
							// 运输者的ID列表
							list: []
						}
					}
				}
			}
		}
	}

}