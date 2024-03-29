module.exports = {
    run: function(creep) {
        if(creep.memory.working) {
            const link = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LINK && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0});
            if(creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link);
            }
        } else {
            creep.getEnergy(true, false, false);
        }
    }
}