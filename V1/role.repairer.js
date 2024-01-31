var roleHarvester = require('role.harvester');

var roleRepairer = {
    run: function (creep) {
        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART
            });

            if (structure) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                roleHarvester.run(creep);
            }
        }
        else {
            creep.getEnergy(true, false, true)
        }
    }
};
module.exports = roleRepairer;