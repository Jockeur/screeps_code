var roles = {
    longDistanceHarvester: require('role.longDistanceHarvester'),
    wallRepairer: require('role.wallRepairer'),
    mineralLorry: require('role.mineralLorry'),
    localBuilder: require('role.localBuilder'),
    excavator: require('role.excavator'),
    harvester: require('role.harvester'),
    repairer: require('role.repairer'),
    upgrader: require('role.upgrader'),
    factorer: require('role.factorer'),
    builder: require('role.builder'),
    claimer: require('role.claimer'),
    dealer: require('role.dealer'),
    linker: require('role.linker'),
    miner: require('role.miner'),
    lorry: require('role.lorry'),
};

Creep.prototype.runRole =
    function () {
        roles[this.memory.role].run(this);
    };

Creep.prototype.getEnergy =
    function (useContainer, useLink, useSource) {
        /** @type {StructureContainer} */
        let container;
        let link;

        var moving = 0

        if(useLink) {
            link = this.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LINK && s.store.energy > 0 && Memory.rooms[this.room.name].structures.links[s.id].state == 'recieve'});
            if(link) {

                if(this.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(link);
                    moving = 1;
                }
            }
        }

        // if the Creep should look for containers
        if (useContainer && moving == 0) {
            // find closest container
            container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                    s.store[RESOURCE_ENERGY] > 0
            });
            // if one was found
            if (container) {
                // try to withdraw energy, if the container is not in range
                if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    this.moveTo(container);
                    moving = 1;
                }
            }
        }
        // if no container was found and the Creep should look for Sources
        if (container == undefined && useSource) {
            // find closest source
            var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

            // try to harvest energy, if the source is not in range
            if (this.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards it
                this.moveTo(source);
            }
        }
    };