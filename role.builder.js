roleUpgrader = require('role.upgrader');
roleLongDistanceRepairer = require('role.longDistanceRepairer');
var roleBuilder = {
    run: function (creep) {
        if (!creep.memory.working) {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store.energy > 0 })
            if (container) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            } else {
                var source = creep.room.find(FIND_SOURCES)[0];
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
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