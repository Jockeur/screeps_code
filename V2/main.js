var roleHarvester = require('role.harvester')

module.exports.loop = function() {

    for(let name in Game.creeps) {
        var creep = Game.creeps[name];
        switch(creep.memory.role){
            case 'harvester': roleHarvester.run(creep)
        }
    }

    var minHarvester = 3;
    var harvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester')

    if(harvesters < minHarvester) {
        Game.spawns.Spawn1.spawnCreep([WORK, WORK, CARRY, MOVE], 'harvester' + Game.time, {role: 'harvester', working: false});
    }

}