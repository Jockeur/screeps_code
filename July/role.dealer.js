module.exports = {
    run: function (creep) {
        const mineralType = creep.memory.mineralType;
        const target = creep.memory.target;
        var resource;
        switch (mineralType) {
            case RESOURCE_HYDROGEN: resource = RESOURCE_REDUCTANT; break;
            case RESOURCE_OXYGEN: resource = RESOURCE_OXIDANT; break;
            case RESOURCE_LEMERGIUM: resource = RESOURCE_LEMERGIUM_BAR; break;
        }

        if (creep.store[mineralType] == creep.store.getCapacity(mineralType) && !creep.memory.working) {
            creep.memory.working = true;
        } else if (creep.store[mineralType] == 0 && creep.memory.working) {
            creep.memory.working = false
        }

        if(creep.memory.working) {
            if(creep.transfer(creep.room.terminal, resource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal);
            }
        } else {
            
            const factory = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_FACTORY})[0];
            if(creep.withdraw(factory, resource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(factory);
            }
        }
    }
};