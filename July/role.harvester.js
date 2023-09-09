var roleBuilder = require('role.builder');
roleHarvester = {
    run: function (creep) {
        if (!creep.memory.working) {
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) =>
                    (s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity
            });
            var terminal = creep.room.terminal;
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else if (terminal.store.energy < 10000) {
                if (creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(terminal);
                }
            } else {
                const factory = creep.room.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_FACTORY});
                if(creep.transfer(factory, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(factory);
                }
            }
        }
    }
};

module.exports = roleHarvester;