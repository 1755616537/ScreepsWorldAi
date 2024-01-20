global.initialization = {
	run: () => {
		clog('挂载拓展')
		clog("脚本加载 Time " + Game.time + " , bucket " + Game.cpu.bucket);

		// 客户端汉化显示
		Utils.cn();

		// 矿区块初始化

		// 控制器块初始化
		// 9*9范围自动生成CONTAINER
		let room = Game.rooms[globalData.roomName1];
		let pos = room.controller.pos;
		let found = _.filter(room.lookAtArea(pos.y - 1, pos.x - 1, pos.y + 1,
				pos.x + 1, true), (f) =>
			(f.terrain == 'plain' || f.terrain == 'swamp') &&
			room.lookAt(f.pos)[0].structureType != STRUCTURE_WALL);
		if (found.length > 1) {
			// 是否已经存在CONTAINER
			if (_.filter(found, (f) => room.lookAt(f.pos)[0].structureType == STRUCTURE_CONTAINER).length < 1) {
				let x = found[0].x;
				let y = found[0].y;
				// 指定位置创建一个新的 ConstructionSite
				let returnData = Game.rooms[globalData.roomName1]
					.createConstructionSite(x, y, STRUCTURE_CONTAINER);
				if (returnData != OK) clog(x, y, '自动建造对应数量的CONTAINER ',
					returnData);
			}
		}

	},
}