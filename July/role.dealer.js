module.exports = {
    run: function (creep) {
        const mineralType = creep.memory.mineralType;
        const target = creep.memory.target

        if (creep.store[mineralType] == creep.store.getCapacity(mineralType) && !creep.memory.working) {
            creep.memory.working = true;
        } else if (creep.store[mineralType] == 0 && creep.memory.working) {
            creep.memory.working = false
        }

        if(creep.memory.working) {
            if(creep.transfer(mineralType, creep.room.terminal) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal);
            }
        } else {
            var resource;
            const factory = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_FACTORY})[0];
            switch (mineralType) {
                case RESOURCE_HYDROGEN: resource = RESOURCE_REDUCTANT;
                case RESOURCE_OXIGEN: resource = RESOURCE_OXIDANT;
                case RESOURCE_LEMERGIUM: resource = RESOURCE_LEMERGIUM_BAR;
            }
            if(creep.withdraw(resource, factory) == ERR_NOT_IN_RANGE) {
                creep.moveTo(factory);
            }
        }
    }
};