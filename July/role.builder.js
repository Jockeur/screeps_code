roleUpgrader = require('role.upgrader');
roleLongDistanceRepairer = require('role.longDistanceRepairer');
var roleBuilder = {
    run: function(creep) {
        if(!creep.memory.working) {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_CONTAINER})
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        } else {
            site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(creep.build(site) == ERR_NOT_IN_RANGE) {
                creep.moveTo(site);
            }
            if(creep.memory.role == 'builder') {
                roleUpgrader.run(creep)
            } else {
                roleLongDistanceRepairer.run(creep)
            }
        }
    }
};

module.exports = roleBuilder;