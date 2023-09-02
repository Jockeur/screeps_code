var role = {
    run: function (creep) {
        const mineralType = creep.memory.mineralType

        if (creep.store[mineralType] == creep.store.getCapacity(mineralType) && !creep.memory.working) {
            creep.memory.working = true;
        } else if (creep.store[mineralType] == 0 && creep.memory.working) {
            creep.memory.working = false
        }

        if (!creep.memory.working) {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[mineralType] > 0 });
            if (container) {
                if (creep.withdraw(container, mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
        } else {
            const storage = creep.room.storage
            if (creep.transfer(storage, mineralType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        }
    }
};

module.exports = role;