// 自动建造
import factory_room from "./room.js";

export default {
    run: (roomName) => {
        let room = factory_room.nameGet(roomName, true);
        if (!room) return;
    }
}