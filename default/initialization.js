global.initialization = {
	run: () => {
		clog('挂载拓展')
		clog("脚本加载 Time " + Game.time + " , bucket " + Game.cpu.bucket);

		// 客户端汉化显示
		// Utils.cn();
		clog('汉化 Utils.cn();');

		// 矿区块初始化

		// 控制器块初始化
		controllerPiece(1);
	},
}

// 控制器块初始化
function controllerPiece(spawn = 1) {
	let room;
	switch (spawn) {
		case 1:
			room = Game.rooms[globalData.roomName1];
			break;
		case 2:
			room = Game.rooms[globalData.roomName2];
			break;
		case 3:
			room = Game.rooms[globalData.roomName3];
			break;
		default:
			room = Game.rooms[globalData.roomName1];
	}
	// 9*9范围自动生成CONTAINER
	let pos = room.controller.pos;
	let found = room.lookAtArea(pos.y - 1, pos.x - 1, pos.y + 1,
		pos.x + 1, true);
		console.log(found)
	// 筛选出平原和沼泽非墙壁
	let foundFilter = _.filter(found, (f) =>
		(f.terrain == 'plain' || f.terrain == 'swamp') &&
		room.lookAt(f.pos)[0].structureType != STRUCTURE_WALL);
	if (foundFilter.length > 1) {
		// 是否已经存在CONTAINER或在建的CONTAINER
		let found2 = _.filter(found, (f) => f.type == LOOK_CONSTRUCTION_SITES || (f.type == LOOK_STRUCTURES && f
			.structure.structureType == STRUCTURE_CONTAINER));
		if (found2.length < 1) {
			let x = foundFilter[0].x;
			let y = foundFilter[0].y;
			// 指定位置创建一个新的 ConstructionSite
			let returnData = Game.rooms[globalData.roomName1]
				.createConstructionSite(x, y, STRUCTURE_CONTAINER);
			if (returnData != OK) clog(x, y, '自动建造对应数量的CONTAINER ',
				returnData);
		}
	}
}