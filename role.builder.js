roleUpgrader = require('role.upgrader');
roleLongDistanceRepairer = require('role.longDistanceRepairer');
var roleBuilder = {
    run: function (creep) {
        if (!creep.memory.working) {
            creep.getEnergy(true, false);
        } else {
            site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (creep.build(site) == ERR_NOT_IN_RANGE) {
                creep.moveTo(site);
            }
            if (!site) {
                if (creep.memory.role == 'builder') {
                    roleUpgrader.run(creep)
                } else {
                    roleLongDistanceRepairer.run(creep)
                }
            }
        }
    }
};

module.exports = roleBuilder;