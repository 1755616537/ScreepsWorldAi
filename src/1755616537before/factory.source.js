global.factory.source = {
	GetContainerLength: (spawnSequence) => {
		let spawnName = factory.spawn.sequenceGetName(spawnSequence);
		
		// 获取能量源区ContainerLen数量
		let memorySource = Memory.spawn[spawnName].source.list;
		let len = 0;
		for (let val in memorySource) {
			let spaceXYList = memorySource[val].spaceXYList;
			for (let i = 0; i < spaceXYList.length; i++) {
				let containerID = spaceXYList[i].containerID
				if (containerID) len++;
			}
		}
		return len;
	}
}