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
            creep.getEnergy(true, false, false);
        }
    }
};