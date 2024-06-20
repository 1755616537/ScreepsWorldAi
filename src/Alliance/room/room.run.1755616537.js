export default function (_this, objectFun) {
    let roomName = globalData.rooms[0].name;

    switch (roomName) {
        case 'W47S54':
            _.forEach(globalData.rooms, (room) => {
                let roomName = room.name;
                // CONTAINER+EXTENSION+STORAGE能量统计
                objectFun.SetContainerExtensionStorageEnergyStat(roomName);
                // 能量源区Container记录管理
                objectFun.sourceContainer(roomName);
                // 控制器Container记录管理
                objectFun.controllerContainer(roomName);
                // 采集建造CONTAINER记录管理
                objectFun.harvestBuildCONTAINER(roomName);
            })

            let roomName2 = 'W48S54';
            // 临时外部房间,升级
            objectFun.upgraderOuterRoom(roomName2);
            // 临时外部房间,建造
            objectFun.builderOuterRoom(roomName2);

            // let roomName3 = 'W48S52';
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
            //             roomPosition: new RoomPosition(25, 48, 'W46S53')
            //         },
            //         {
            //             roomName: 'W46S53',
            //             roomPosition: new RoomPosition(48, 34, 'W47S53')
            //         }
            //     ]);
            break;
        default:
            // CONTAINER+EXTENSION+STORAGE能量统计
            objectFun.SetContainerExtensionStorageEnergyStat(roomName);

            // 能量源区Container记录管理
            objectFun.sourceContainer(roomName);
            // 控制器Container记录管理
            objectFun.controllerContainer(roomName);
            // 采集建造CONTAINER记录管理
            objectFun.harvestBuildCONTAINER(roomName);
    }
}