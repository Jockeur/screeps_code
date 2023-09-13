var roleBuilder = require('role.builder')

var role = {
    run: function (creep) {
        if (!creep.memory.working) {
            if (creep.room.name == creep.memory.target) {
                var source = creep.room.find(FIND_SOURCES)[0]
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.target);
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