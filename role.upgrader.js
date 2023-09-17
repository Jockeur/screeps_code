roleUpgrader = {
    run: function (creep) {
        if (creep.memory.working) {
            var controller = creep.room.controller;
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        } else {
            creep.getEnergy(true, false);
        }
    }
};

module.exports = roleUpgrader;