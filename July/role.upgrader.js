roleUpgrader = {
    run: function (creep) {
        if (creep.memory.working) {
            var controller = creep.room.controller;
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        } else {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_CONTAINER });
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
    }
};

module.exports = roleUpgrader;