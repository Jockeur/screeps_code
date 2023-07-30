var roleLongDistanceAttacker = {
    
    run:function(creep) {
        console.log('ok')
        if(creep.room.name == creep.memory.target) {
            console.log(creep.room.target)
            var closestHostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            var closestHostileStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
            if(closestHostileCreep) {
                creep.attack(closestHostileCreep);
            } else if(closestHostileStructure) {
                creep.attack(closestHostileStructure);
            }
        } else {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#0CFF00'}});
        }
    }
}

module.exports = roleLongDistanceAttacker;