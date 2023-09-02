roleUpgrader = {
    run: function (creep) {
        if (creep.memory.working) {
            var controller = creep.room.controller;
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        } else {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store.energy > 0});
            var resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if (container) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            } else if (resource) {
                creep.pickup(resource) == ERR_NOT_IN_RANGE ? creep.moveTo(resource) : creep.pickup(resource)
            } else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source)
                }
            }
        }
    }
};

module.exports = roleUpgrader;