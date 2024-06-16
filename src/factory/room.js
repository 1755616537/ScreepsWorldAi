export default {
    nameGet: (name) => {
        return Game.rooms[name];
    },
        sequenceGet: (sequence) => {
        return Game.rooms[factory.room.sequenceGetName(sequence)];
    },
        nameGetSequence: (name) => {
        let sequence = _.findIndex(globalData.rooms, (room) => room.name == name)
        if (sequence == -1) {
            return 1;
        }
        return sequence + 1;
    },
        sequenceGetName: (sequence) => {
        if (sequence > globalData.rooms.length || sequence < 1) {
            return globalData.rooms[0].name;
        }
        return globalData.rooms[sequence - 1].name;
    }
}