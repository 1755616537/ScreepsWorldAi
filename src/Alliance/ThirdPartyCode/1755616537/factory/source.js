export default {
    GetContainerLength: (roomName) => {
        // 获取能量源区ContainerLen数量
        let memorySource = Memory.rooms[roomName].source.list;
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