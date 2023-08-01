var roleBuilder = require('role.builder')

var role = {
    run: function (creep) {
        if (!creep.memory.working) {
            if (creep.room.name == creep.memory.home) {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER
                })
                if (creep.withdraw(container) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            if (creep.room.name == creep.memory.target) {
                roleBuilder.run(creep)
            } else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: '#0CFF00' } });
            }
        }
    }
};

module.exports = role;