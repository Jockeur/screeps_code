var roleBuilder = require('role.builder')

var role = {
    run: function (creep) {
        if (!creep.memory.working) {
            if (creep.room.name == creep.memory.target) {
                var source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];

                // try to harvest energy, if the source is not in range
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            if (creep.room.name == creep.memory.home) {
                var targets = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) =>
                    (s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_TOWER) && s.store.energy < s.store.getCapacity(RESOURCE_ENERGY)});
                if (targets) {
                    if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, { visualizePathStyle: { stroke: '#0CFF00' } });
                    }
                } else {
                    roleBuilder.run(creep);
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: '#0CFF00' } });
            }
        }
    }
};

module.exports = role;