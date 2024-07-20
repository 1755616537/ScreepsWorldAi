export default function (_this, objectFun) {
    _.forEach(globalData.rooms, (room, roomName) => {
        // CONTAINER+EXTENSION+STORAGE能量统计
        objectFun.SetContainerExtensionStorageEnergyStat(roomName);
        // 能量源区Container记录管理
        objectFun.sourceContainer(roomName);
        // 控制器Container记录管理
        objectFun.controllerContainer(roomName);
        // 采集建造CONTAINER记录管理
        objectFun.harvestBuildCONTAINER(roomName);
    })

    const roomName = Object.keys(globalData.rooms)[0];
    // console.log('房间名称', roomName)

    switch (roomName) {
        case 'W47S54':
            // let roomName2 = 'W48S54';
            // // 临时外部房间,升级
            // objectFun.upgraderOuterRoom(roomName2);
            // // 临时外部房间,建造
            // objectFun.builderOuterRoom(roomName2);

            // let roomName3 = 'E25N23';
            // // 临时外部房间,升级
            // objectFun.upgraderOuterRoom(roomName3,
            //     [
            //         {
            //             roomName: 'W47S54',
            //             roomPosition: new RoomPosition(1, 28, 'W46S54')
            //         },
            //         {
            //             roomName: 'W46S54',
            //             roomPosition: new RoomPosition(25, 48, 'W46S53')
            //         },
            //         {
            //             roomName: 'W46S53',
            //             roomPosition: new RoomPosition(48, 34, 'W47S53')
            //         }
            //     ]);
            // // 临时外部房间,建造
            // objectFun.builderOuterRoom(roomName3,
            //     [
            //         {
            //             roomName: 'W47S54',
            //             roomPosition: new RoomPosition(1, 28, 'W46S54')
            //         },
            //         {
            //             roomName: 'W46S54',
            //             roomPosition: new RoomPosition(17, 27, 'W46S54')
            //         },
            //         {
            //             roomName: 'W46S54',
            //             roomPosition: new RoomPosition(1, 21, 'W45S54')
            //         },
            //         {
            //             roomName: 'W45S54',
            //             roomPosition: new RoomPosition(18, 1, 'W45S55')
            //         },
            //         {
            //             roomName: 'W45S55',
            //             roomPosition: new RoomPosition(31, 7, 'W45S55')
            //         },
            //         {
            //             roomName: 'E25N25',
            //             roomPosition: new RoomPosition(3, 1, 'E25N24')
            //         },
            //         {
            //             roomName: 'E25N24',
            //             roomPosition: new RoomPosition(18, 1, 'E25N23')
            //         },
            //         {
            //             roomName: 'E25N23',
            //             roomPosition: new RoomPosition(39, 27, 'E25N23')
            //         }
            //     ]);
            break;
        case 'W2N2':
            let roomName2 = 'W2N1';
            // 临时外部房间,升级
            // objectFun.upgraderOuterRoom(roomName2);
            // 临时外部房间,建造
            objectFun.builderOuterRoom(roomName2);
            break;
        default:

    }
}