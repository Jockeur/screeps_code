var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')

module.exports.loop = function() {

    for(let name in Memory.creeps) {
        if(Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    for(let name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role){
            case 'harvester': roleHarvester.run(creep); break;
            case 'upgrader': roleUpgrader.run(creep); break;
        }
    }

    var minHarvester = 3;
    var harvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');

    var minUpgrader = 3;
    var upgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

    if(harvesters < minHarvester) {
        Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, MOVE], 'harvester' + Game.time, {memory: {role: 'harvester', working: false}});
    } else if (upgraders < minUpgrader) {
        Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, MOVE], 'upgrader' + Game.time, {memory: {role: 'upgrader', working: false}});
    }

}