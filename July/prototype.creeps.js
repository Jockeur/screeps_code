var roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    wallRepairer: require('role.wallRepairer'),
    longDistanceHarvester: require('role.longDistanceHarvester'),
    claimer: require('role.claimer'),
    miner: require('role.miner'),
    dealer: require('role.dealer'),
    excavator: require('role.excavator'),
    mineralLorry: require('role.mineralLorry'),
    lorry: require('role.lorry')
};

Creep.prototype.runRole =
    function () {
        roles[this.memory.role].run(this);
    };

