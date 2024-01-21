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
				if (room.name == globalData.room[0].name && globalData.room[0].AutomaticSecurity) {
					on = true;
				} else if (room.name == globalData.room[1].name && globalData.room[1].AutomaticSecurity) {
					on = true;
				} else if (room.name == globalData.room[2].name && globalData.room[2].AutomaticSecurity) {
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