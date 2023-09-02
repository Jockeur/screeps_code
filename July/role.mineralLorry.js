var role = {
    run: function(creep) {
        if(!creep.memory.working) {
            var container = creep.pos.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_GHODIUM_OXIDE] > 0});
            if(container){
                if(creep.withdraw(container, RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
        } else {
            const storage = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
            if(creep.transfer(storage, RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        }
    }
};