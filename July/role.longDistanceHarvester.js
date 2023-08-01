module.exports = {
    run: function(creep) {
        if(creep.memory.working) {
            if(creep.room.name == creep.memory.home) {
                var target = creep.pos.findClosestBypath(FIND_STRUCTURES, {filter: (s) => (
                    s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_EXTENSION
                    || s.structureType == STRUCTURE_TOWER
                    ) && s.energy < s.energyCapacity
                });
                
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByPath(exit));
            }
        } else {
            if(creep.room.name == creep.memory.target) {
                var source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByPath(exit));
            }
        }
    }
};