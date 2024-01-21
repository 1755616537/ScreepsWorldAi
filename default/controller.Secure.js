global.controller.Secure = {
	run: () => {
		// 查找针对您的 creep 和建筑的所有敌对行动
		_.forEach(Game.rooms, room => {
			let eventLog = room.getEventLog();
			let attackEvents = _.filter(eventLog, {
				event: EVENT_ATTACK
			});
			attackEvents.forEach(event => {
				let target = Game.getObjectById(event.data.targetId);
				if (target && target.my) {
					clog(event);
				}
			});

			if (attackEvents.length > 0) {
				let on = false;
				if (room.name == globalData.roomName1 && globalData.room1AutomaticSecurity) {
					on = true;
				} else if (room.name == globalData.roomName2 && globalData.room2AutomaticSecurity) {
					on = true;
				} else if (room.name == globalData.roomName3 && globalData.room3AutomaticSecurity) {
					on = true;
				}
				if (on) {
					// 开启安全模式
					room.controller.activateSafeMode()
				}
			}

		});
	}
}