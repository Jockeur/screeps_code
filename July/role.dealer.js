module.exports = {
    run: function (creep) {
        const mineralType = creep.memory.mineralType;
        const target = creep.memory.target

        if (creep.store[mineralType] == creep.store.getCapacity(mineralType) && !creep.memory.working) {
            creep.memory.working = true;
        } else if (creep.store[mineralType] == 0 && creep.memory.working) {
            creep.memory.working = false
        }
    }
};