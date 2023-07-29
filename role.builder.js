roleUpgrader = require('role.upgrader');
var roleBuilder = {
    run: function(creep) {
        if(!creep.memory.working) {
            var source = creep.room.find(FIND_SOURCES);
            if(creep.harvest(source[1]) == ERR_NOT_IN_RANGE){
                creep.moveTo(source[1]);
            }
        } else {
            site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(creep.build(site) == ERR_NOT_IN_RANGE) {
                creep.moveTo(site);
            }
            if(site == undefined) {
                roleUpgrader.run(creep);
            }
        }
    }
};

module.exports = roleBuilder;