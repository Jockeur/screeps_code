var role = {
    run: function (creep) {
        var mineralType = creep.memory.resourceType

        if (creep.store[mineralType] == creep.store.getCapacity(mineralType) && !creep.memory.working) {
            creep.memory.working = true;
        } else if (creep.store[mineralType] == 0 && creep.memory.working) {
            creep.memory.working = false
        }

        if (!creep.memory.working) {
            if (creep.room.name == creep.memory.target) {
                if (!mineralType) {
                    mineralType = creep.room.find(FIND_MINERALS)[0].mineralType;
                } else {
                    const storage = creep.room.storage
                    if (creep.withdraw(storage, mineralType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage);
                    }
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            if (creep.room.name == creep.memory.home) {
                if (creep.tranfer(creep.room.storage, resourceType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: '#0CFF00' } });
            }
        }
    }
};

module.exports = role;