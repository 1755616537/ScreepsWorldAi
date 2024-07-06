var structureTower = {
    /**  
    * 自动维修与攻击 - 结构模块
    * @param {StructureTower} tower - 炮台对象
    */
    run: function(tower) {
        
        //错误检查
        if(!tower){
            console.log('tower被消失，模块执行错误');
            return;
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS); //寻找敌人
        var injuredCreeps = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (injuredCreep) => injuredCreep.hits < injuredCreep.hitsMax
        }); //寻找受伤的 creep
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != 'constructedWall'
        }); //寻找破损的结构(除了墙'constructedWall')
        
        if(closestHostile) {
            //如果存在 -> 攻击
            console.log('正在攻击' + closestHostile.name + closestHostile.pos);
            tower.attack(closestHostile);
        }
        else if(injuredCreeps){
            //如果存在 -> 治疗
            console.log('正在治疗' + injuredCreeps.name);
            tower.heal(injuredCreeps);
        }
        else{
            //维修
            if(!closestDamagedStructure){
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < 1000 && structure.structureType == 'constructedWall'
                }); //寻找破损的墙(小于1k耐久)
            }
            if(closestDamagedStructure) {
                //如果存在 -> 维修
                //console.log('正在维修' + closestDamagedStructure.structureType + closestDamagedStructure.pos);
                tower.repair(closestDamagedStructure);
            }
        }
        return 0;
	}
}

module.exports = structureTower;