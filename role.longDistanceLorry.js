var role = {
    run: function (creep) {
        if (!creep.memory.working) {
            if (creep.room.name == creep.memory.target) {
                if (!creep.memory.resourceType) {
                    const mineralType = creep.room.find(FIND_MINERALS)[0].mineralType;
                    creep.memory.resourceType = mineralType
                } else {
                    const storage = creep.room.storage
                    if (creep.withdraw(storage, creep.memory.resourceType) == ERR_NOT_IN_RANGE) {
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