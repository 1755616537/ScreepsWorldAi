global.controller.Secure = {
	run: () => {

		_.forEach(Game.rooms, room => {
			// 房间序号
			let roomSequence = factory.room.nameGetSequence(room.name);
			let spawnName = factory.spawn.sequenceGetName(roomSequence);

			var hostiles = factory.room.get(roomSequence).find(FIND_HOSTILE_CREEPS);
			if (hostiles.length > 0) {
				// 统计分别有哪些用户
				let usernameList = [];
				_.forEach(hostiles, hostile => {
					usernameList.push(hostile.owner.username);
				});
				// 去重
				usernameList = _.uniq(usernameList);
				let usernameListString = '';
				_.forEach(usernameList, username => {
					usernameListString += '【' + username + '】';
				});
				Game.notify(`发现用户${usernameListString}派CREEPS到【${spawnName}】房间中`);
			}

			// 查找针对您的 creep 和建筑的所有敌对行动
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
			// objectId 自己ID
			// data.targetId - 目标对象 ID

			if (attackEvents.length > 0) {
				Game.notify(`【${spawnName}】房间,正在遭受攻击`);

				let on = false;
				if (room.name == globalData.room[0].name && globalData.room[0].AutomaticSecurity) {
					on = true;
				} else if (room.name == globalData.room[1].name && globalData.room[1]
					.AutomaticSecurity) {
					on = true;
				} else if (room.name == globalData.room[2].name && globalData.room[2]
					.AutomaticSecurity) {
					on = true;
				}
				if (on) {
					// 开启安全模式
					let returnData = room.controller.activateSafeMode();
					if (returnData == OK) {
						Game.notify(`【${spawnName}】房间,开启安全模式【成功】`);
					} else if (returnData == ERR_BUSY) {
						Game.notify(`【${spawnName}】房间,开启安全模式【失败】,已经有其他房间处于安全模式下了`);
					} else if (returnData == ERR_NOT_ENOUGH_RESOURCES) {
						Game.notify(`【${spawnName}】房间,开启安全模式【失败】,没有足够的可用激活次数`);
					} else if (returnData == ERR_TIRED) {
						Game.notify(
							`【${spawnName}】房间,开启安全模式【失败】,上一个安全模式仍在冷却中，或者控制器正处于 upgradeBlocked 状态，或者控制器的降级计时器已经超过了 50% + 5000 tick 甚至更久`
						);
					} else {
						Game.notify(`【${spawnName}】房间,开启安全模式【失败】,未知原因${returnData}`);
					}
				}
			}

		});
	}
}