var role = {
    run: function (creep) {
        const mineralType = creep.memory.mineralType
        const target = creep.memory.target

        if (creep.store[mineralType] == creep.store.getCapacity(mineralType) && !creep.memory.working) {
            creep.memory.working = true;
        } else if (creep.store[mineralType] == 0 && creep.memory.working) {
            creep.memory.working = false
        }

        if (!creep.memory.working) {
            if (target == creep.room.storage) {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[mineralType] > 0 });
                if (container) {
                    if (creep.withdraw(container, mineralType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
            } else {
                if(creep.withdraw(creep.room.storage, mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
        } else {
            target = Game.getObjectById(target.id);
            if (creep.transfer(target, mineralType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = role;