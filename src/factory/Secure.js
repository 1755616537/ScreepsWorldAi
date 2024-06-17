import factory_spawn from "../factory/spawn.js";
import factory_room from "../factory/room.js";

export default {
    run: (roomName) => {
        let room = factory_room.nameGet(roomName);

        var hostiles = room.find(FIND_HOSTILE_CREEPS);
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
            Utils.notify(`发现用户${usernameListString}派CREEPS到【${roomName}】房间中`);
        }

        // 查找针对您的 creep 和建筑的所有敌对行动
        let eventLog = room.getEventLog();
        let attackEvents = _.filter(eventLog, {
            event: EVENT_ATTACK
        });
        let attackMy = false;
        let textAll = '';
        attackEvents.forEach(event => {
            // 事件者ID
            let objectId = event.objectId;
            // 造成的 hit 伤害量
            let damage = event.data.damage;
            // 目标对象ID
            let targetId = event.data.targetId;


            let target = Game.getObjectById(targetId);
            let structureType, x, y;
            if (target) {
                try {
                    x = target.pos.x;
                    y = target.pos.y;
                } catch (e) {
                    //TODO handle the exception
                }
                try {
                    structureType = target.structureType;
                } catch (e) {
                    //TODO handle the exception
                }
            }
            // console.log(JSON.stringify(Game.getObjectById('')))

            let initiate = Game.getObjectById(objectId);
            let username;
            if (initiate) {
                try {
                    username = initiate.owner.username;
                } catch (e) {
                    //TODO handle the exception
                }
            }

            if (target && target.my) {
                attackMy = true;
                clog('房间' + roomName, '正在受到伤害', JSON.stringify(event));

                let text = '【';
                // if (type) text += '类型' + type + ' ';
                if (structureType) text += 'structureType' + structureType + ' ';
                if (damage) text += '受到伤害量' + damage + ' ';
                if (x) text += 'x' + x + ' ';
                if (y) text += 'y' + y + ' ';
                if (username) text += '对方用户名称' + username + ' ';
                text += '】';
                textAll += text;

                if (!Memory.attackEventsList) Memory.attackEventsList = [];
                let time = Game.time;
                Memory.attackEventsList.push({
                    targetId: targetId,
                    time: time
                })
            }
        });

        let objectDestroyedMy = false;
        // 一个游戏对象被摧毁或是被消灭
        let objectDestroyedEvents = _.filter(eventLog, {
            event: EVENT_OBJECT_DESTROYED
        });
        if (objectDestroyedEvents.length > 0) {
            objectDestroyedEvents.forEach(event => {
                // 事件者ID
                let objectId = event.objectId;

                let time = Game.time;
                if (!Memory.attackEventsList) Memory.attackEventsList = [];
                let attackEventsList = Memory.attackEventsList;
                for (var i = 0; i < attackEventsList.length; i++) {
                    if (attackEventsList[i].targetId == objectId) {
                        if (time - attackEventsList[i].time <= 5 && event.data.type != 'creep') {
                            objectDestroyedMy = true;
                            break;
                        }
                    }
                }
                // 清理超时的记录
                let attackEventsList2 = [];
                for (var i = 0; i < attackEventsList.length; i++) {
                    if (time - attackEventsList[i].time <= 5) {
                        attackEventsList2.push(attackEventsList[i]);
                    }
                }
                Memory.attackEventsList = attackEventsList2;
            });
        }

        if (attackEvents.length > 0 && attackMy) {
            Utils.notify(`【${roomName}】房间,正在遭受攻击 ` + textAll);
        }

        if (objectDestroyedMy) {
            let on = false;
            if (room.name == globalData.rooms[0].name && globalData.rooms[0].AutomaticSecurity) {
                on = true;
            } else if (room.name == globalData.rooms[1].name && globalData.rooms[1]
                .AutomaticSecurity) {
                on = true;
            } else if (room.name == globalData.rooms[2].name && globalData.rooms[2]
                .AutomaticSecurity) {
                on = true;
            }
            if (on) {
                // 开启安全模式
                let returnData = room.controller.activateSafeMode();
                if (returnData == OK) {
                    Utils.notify(`【${roomName}】房间,开启安全模式【成功】`);
                } else if (returnData == ERR_BUSY) {
                    Utils.notify(`【${roomName}】房间,开启安全模式【失败】,已经有其他房间处于安全模式下了`);
                } else if (returnData == ERR_NOT_ENOUGH_RESOURCES) {
                    Utils.notify(`【${roomName}】房间,开启安全模式【失败】,没有足够的可用激活次数`);
                } else if (returnData == ERR_TIRED) {
                    Utils.notify(
                        `【${roomName}】房间,开启安全模式【失败】,上一个安全模式仍在冷却中，或者控制器正处于 upgradeBlocked 状态，或者控制器的降级计时器已经超过了 50% + 5000 tick 甚至更久`
                    );
                } else {
                    Utils.notify(`【${roomName}】房间,开启安全模式【失败】,未知原因${returnData}`);
                }
            }
        }
    }
}