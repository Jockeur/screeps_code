module.exports = {
    run: function(creep) {
        const mineralType = creep.memory.mineralType
        const storage = creep.room.storage
        if (creep.store[mineralType] == creep.store.getCapacity(mineralType) && !creep.memory.working) {
            creep.memory.working = true;
        } else if (creep.store[mineralType] == 0 && creep.memory.working) {
            creep.memory.working = false
        }

        if(!creep.memory.working) {
            const labs = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LAB});
            var target
            for (let lab of labs) {
                var memory = Memory.rooms[creep.room.name].structures.labs[lab.id]
                if (memory.mineralType == mineralType) {
                    target = lab;
                    break;
                }
            }
            if(target && creep.withdraw(target, mineralType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            if(creep.transfer(storage, mineralType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        }
    }
}