var roleBuilder = require('role.builder')

var role = {
    run: function (creep) {
        if (!creep.memory.working) {
            if (creep.room.name == creep.memory.target) {
                creep.getEnergy(false, true)
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