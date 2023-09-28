module.exports = {
    run: function(creep) {
        const mineralType = creep.memory.mineralType
        const storage = creep.room.storage
        if (creep.store[mineralType] == creep.store.getCapacity(mineralType) && !creep.memory.working) {
            creep.memory.working = true;
        } else if (creep.store[mineralType] == 0 && creep.memory.working) {
            creep.memory.working = false
        }

        if(creep.memory.working) {
            if(creep.withdraw(storage, mineralType)) {
                creep.moveTo(storage);
            }
        } else {
            const labs = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LAB});
            let target;
            for (let lab of labs) {
                var memory = memory.rooms[creep.room.name].structures.labs[lab.id]
                if(memory.state == 'sending' && memory.materialType == materialType) {
                    target = Game.findObjectById(lab.id);
                    break;
                }       
            }
            if(target && creep.transfer(target, mineralType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
}