var roleLongDistanceAttacker = {
    
    run:function(creep) {
        var closestHostile= creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
        var closestCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            creep.attack(closestHostile);
        } else if(closestCreep){
            creep.
        }
    }
}

module.exports = {

};