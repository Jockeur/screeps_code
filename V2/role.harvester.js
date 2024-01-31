const { filter } = require("lodash");

var role = {
     /** @param {Creep} creep */
    run: function(creep) {
        if(creep.store.energy == creep.store.getCapacity(RESOURCE_ENERGY) && !creep.memory.working) {
            creep.memory.working = true;
        } else if (creep.store.energy == 0 && creep.memory.working) {
            creep.memory.working = false;
        }

        if (!creep.memory.working) {
            sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0])
            }
        } else {
            var structures = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN && s.store.energy < s.store.getCapacity(RESOURCE_ENERGY)});
            if(creep.transfer(structures, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(structures)
            }
        }
    }
};

module.exports = role;