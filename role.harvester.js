var roleBuilder = require('role.builder');
roleHarvester = {
    run: function (creep) {
        if (!creep.memory.working) {
            creep.getEnergy(false, true)
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
            } else if (terminal && terminal.store.energy < 10000) {
                if (creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(terminal);
                }
            } else {
                const factory = creep.room.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_FACTORY && s.store.energy < 10000})[0];
                if(factory && creep.transfer(factory, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(factory);
                }
            }
        }
    }
};

module.exports = roleHarvester;