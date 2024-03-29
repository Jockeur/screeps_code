require('prototype.spawn');
require('prototype.creeps');
require('prototype.towers');
require('prototype.factory');
require('prototype.terminal');
require('prototype.link');

var HOME;

module.exports.loop = function () {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    for (let spawnName in Game.spawns) {
        var spawn = Game.spawns[spawnName];

        HOME = spawn.room.name;

        roomMem = Memory.rooms[HOME]

        for(let id in roomMem.structures.links) {
            if(!Game.getObjectById(id)) {
                delete Memory.rooms[HOME].structures.links.id;
            }
        }

        spawn.spawnCreepsIfNecessary();

        var roomMineralType = spawn.room.find(FIND_MINERALS)[0].mineralType;

        var factory = spawn.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_FACTORY})[0];

        const links = spawn.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LINK});
        const labs = spawn.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_LAB});

        for (link of links){
            const id = link.id
            const memory = Memory.rooms[HOME].structures.links[id];
            if(memory && memory.state == 'send'){
                link.transfer()
            } else if(!memory) {
                Memory.rooms[HOME].structures.links[id] = {pos: link.pos, state: '', targets: []};
                console.log('added link ' + id + ' to room ' + HOME);
            }
        }

        for (lab of labs) {
            const id = lab.id
            const memory = Memory.rooms[HOME].structures.labs[id];
            if(memory && memory.state == 'reacting') {
                const targets = memory.targets
                lab0 = Game.getObjectById(targets[0]);
                lab1 = Game.getObjectById(targets[1]);
                lab.runReaction(lab0, lab1);
            } else if(!memory) {
                Memory.rooms[HOME].structures.labs[id] = {state: '', targets: []};
                console.log('added lab ' + id + ' to room ' + HOME);
            }
        }

        if(factory) {
            factory.compact(roomMineralType)
        }

        if(spawn.room.terminal && Game.time % 10 == 0) { 
            spawn.room.terminal.sell(roomMineralType);
        }
    }

    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for (let tower of towers) {
        tower.defend();
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.store.energy == 0 && creep.memory.working) {
            creep.memory.working = false;
        }

        if (creep.store.energy == creep.store.getCapacity(RESOURCE_ENERGY) && !creep.memory.working) {
            creep.memory.working = true;
        }

        creep.runRole();
    }

}