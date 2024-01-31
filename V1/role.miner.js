module.exports = {
    run: function (creep) {
        let source = Game.getObjectById(creep.memory.sourceId);
        let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];

        if (creep.pos.isEqualTo(container.pos)) {
            creep.harvest(source);
        }
        else {
            creep.moveTo(container);
        }
    }
};