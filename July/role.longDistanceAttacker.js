var roleLongDistanceAttacker = {
    
    run:function(creep) {
        if(creep.room.name == creep.memory.target) {
            var closestHostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            var closestHostileStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
            if(closestHostileCreep) {
                creep.attack(closestHostileCreep);
            } else if(closestHostileStructure) {
                creep.attack(closestHostileStructure);
            }
        } else {
            console.log('going to ' + creep.memory.target)
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#0CFF00'}});
        }
    }
}

module.exports = roleLongDistanceAttacker;