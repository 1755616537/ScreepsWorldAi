var roleAttackInvader = {
    /**  
    * 攻击侵略者-爬爬模块
    * @param {Creep} creep - 攻击爬爬
    * @param {string} nameRoom - 需要防御的房间名
    * @param {{x:number, y:number}} waitPos - 待命的位置坐标
    */
    run: function(creep, nameRoom, waitPos) {

        //寻找攻击目标
        var invader = Game.rooms[nameRoom].find(FIND_HOSTILE_CREEPS);
        if(invader.length == 0){
            invader = Game.rooms[nameRoom].find(FIND_HOSTILE_STRUCTURES);
        }
        var injuredCreeps = Game.rooms[nameRoom].find(FIND_MY_CREEPS, {
            filter: (injuredCreep) => injuredCreep.hits < injuredCreep.hitsMax
        });
        if(invader.length != 0){
            console.log(creep.name+'正在攻击' + nameRoom + invader[0]);
            if(creep.attack(invader[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(invader[0]);
            }
            return;
        }
        if(creep.hits < creep.hitsMax){
            if(creep.heal(creep) == 0)
                return;
        }
        else if(!injuredCreeps){
            if(creep.heal(injuredCreeps[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(injuredCreeps[0]);
            }
            return;
        }
        if(creep.room.name == nameRoom){
            if(creep.pos.x != waitPos.x || creep.pos.y != waitPos.y){
                creep.moveTo(waitPos.x, waitPos.y);
            }
        }
        else{
            creep.moveTo(Game.rooms[nameRoom].controller);
        }
        return;
	}
};

module.exports = roleAttackInvader;