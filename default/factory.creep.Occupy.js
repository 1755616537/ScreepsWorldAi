global.factory.creep.Occupy={
	run:(creep,room)=>{
		// factory.creep.Occupy.run(Game.creeps['builder54893119'],Game.rooms['W48S54']);
		
		// 如果该房间不存在就先往房间走
		if (!room) {
		    creep.moveTo(new RoomPosition(10, 39, 'W48S54'))
		}else {
		    // 如果房间存在了就说明已经进入了该房间
		    // 移动到房间的控制器并占领
		    if (creep.claimController(room.controller) == ERR_NOT_IN_RANGE) {
		        creep.moveTo(room.controller)
		    }
		}
		
		// 因为我们的 claimer 已经在房间里了
		// 所以我们可以正常的获取该房间的对象。
		const target = Game.getObjectById('spawn工地的id')
		
		// 获取能量的逻辑
		// ...
		
		// 建造 spawn
		if(target) {
		    if(creep.build(target) == ERR_NOT_IN_RANGE) {
		        // reusePath 代表缓存的距离，默认为 5
		        creep.moveTo(target, { reusePath: 50 })
		    }
		}



	}
}