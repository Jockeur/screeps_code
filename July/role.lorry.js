var roleHarvester = require('role.harvester');

module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working) {
            roleHarvester.run(creep);
        }
        // if creep is supposed to get energy
        else {
            // find closest container
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store.energy > 0
            });
            closestResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if (container && creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            } else if (closestResource && creep.pickup(closestResource)) {
                creep.moveTo(closestResource);
            }
        }
    }
};