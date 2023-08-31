var role = {
    run: function(creep) { 
        if(creep.room.name != creep.memory.target) {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByPath(exit))
        } else {
            creep.claimController(creep.room.controller);
        }
    }
}

module.exports = role;