module.exports = {
    run: function (creep) {
        let mineral = Game.getObjectById(creep.memory.mineralId);
        let container = mineral.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];

        if (creep.pos.isEqualTo(container.pos)) {
            creep.harvest(mineral);
        } else {
            creep.moveTo(container);
        }
    }
};