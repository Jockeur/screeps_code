var roleLongDistanceAttacker = {

    run: function (creep) {
        if (creep.room.name == creep.memory.target) {
            var closestHostileCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            var closestHostileStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
            if (closestHostileCreep) {
                if (creep.rangedAttack(closestHostileCreep) == ERR_NOT_IN_RANGE || creep.attack(closestHostileCreep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostileCreep)
                }
            } else if (closestHostileStructure) {
                if (creep.rangedAttack(closestHostileStructure) == ERR_NOT_IN_RANGE || creep.attack(closestHostileStructure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostileStructure);
                }
            }
        } else {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: '#0CFF00' } });
        }
    }
}

module.exports = roleLongDistanceAttacker;