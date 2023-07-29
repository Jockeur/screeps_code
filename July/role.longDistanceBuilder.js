var roleBuilder = require('role.builder')

var role = {
    run: function(creep) {
        if(!creep.memory.working) {
            if(creep.room.name == creep.memory.home) {
                var source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            if(creep.room.name == creep.memory.target) {
                roleBuilder.run(creep)
            } else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#0CFF00'}});
            }
        }
    }
};

module.exports = role;