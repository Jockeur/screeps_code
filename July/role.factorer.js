module.exports = {
    run: function (creep) {

        const mineralType = creep.memory.mineralType;

        if (creep.store[mineralType] == creep.store.getCapacity(mineralType) && !creep.memory.working) {
            creep.memory.working = true;
        } else if (creep.store[mineralType] == 0 && creep.memory.working) {
            creep.memory.working = false
        }

        if (!creep.memory.working) {
            var storage = creep.room.find(storage);
            if(creep.withdraw(storage, mineralType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        } else {
            var factory = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_FACTORY})[0];
            if(creep.transfer(factory, mineralType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(factory);
            }
        }
    }
}