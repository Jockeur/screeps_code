var roleBuilder = require('role.builder');
var roleWallRepairer = {
    run: function (creep) {
        if (!creep.memory.working) {
            creep.getEnergy(true, false)
        } else {
            var walls = creep.room.find(FIND_STRUCTURES, (s) => s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL);
            var target = undefined;
            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001) {
                for (let wall of walls) {
                    if (wall.hits / wall.hitsMax < percentage) {
                        var target = wall;
                        break;
                    }
                }

                if (target != undefined) {
                    break;
                }
            }

            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                roleBuilder.run(creep);
            }
        }
    }
};
module.exports = roleWallRepairer;