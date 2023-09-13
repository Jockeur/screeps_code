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
    miner: require('role.miner'),
    lorry: require('role.lorry')
};

Creep.prototype.runRole =
    function () {
        roles[this.memory.role].run(this);
    };

