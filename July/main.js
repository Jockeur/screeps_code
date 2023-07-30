require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');
var roleBuilder = require('role.builder');
var roleLorry = require('role.lorry');
var roleWallRepairer = require('role.wallRepairer');
var roleLongDistanceBuilder = require('role.longDistanceBuilder');
var roleLongDistanceAttacker = require('role.longDistanceAttacker');
var roleLongDistanceHarvester = require('role.longDistanceHarvester');

var HOME = 'E17N5';

module.exports.loop = function () {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    for (let spawnName in Game.spawns) {
        var spawn = Game.spawns[spawnName];

        var creepInRoom = spawn.room.find(FIND_MY_CREEPS);

        var harvesters = _.sum(creepInRoom, (c) => c.memory.role == 'harvester');
        var maxHarvesters = spawn.memory.maxHarvesters;

        var upgraders = _.sum(creepInRoom, (c) => c.memory.role == 'upgrader');
        var maxUpgraders = spawn.memory.maxUpgraders;

        var repairers = _.sum(creepInRoom, (c) => c.memory.role == 'repairer');
        var maxRepairers = spawn.memory.maxRepairers;

        var builders = _.sum(creepInRoom, (c) => c.memory.role == 'builder');
        var maxBuilders = spawn.memory.maxBuilders;

        var longDistanceHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceHarvester');
        var maxLongDistanceHarvesters = spawn.memory.maxLongDistanceHarvesters;

        var longDistanceBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceBuilder');
        var maxLongDistanceBuilders = spawn.memory.maxLongDistanceBuilders;

        var longDistanceAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceAttackers');
        var maxLongDistanceAttackers = spawn.memory.maxLongDistanceAttackers;

        var wallRepairers = _.sum(creepInRoom, (c) => c.memory.role == 'wallRepairer');
        var maxWallRepairers = spawn.memory.maxWallRepairers;

        var lorries = _.sum(creepInRoom, (c) => c.memory.role == 'lorry');
        var maxLorries = spawn.memory.maxLorries;

        var miners = _.sum(creepInRoom, (c) => c.memory.role == 'miner');

        var energy = spawn.room.energyCapacityAvailable;

        if (harvesters == 0 && (miners == 0 || lorries == 0)) {
            // if there are still miners left
            if (miners > 0) {
                // create a lorry
                spawn.createLorry(spawn.room.energyAvailable);
            }
            // if there is no miner left
            else {
                // create a harvester because it can work on its own
                spawn.spawnCustomCreep(spawn.room.energyAvailable, 'harvester', 'harvester');
            }
        }
        // if no backup creep is required
        else {
            // check if all sources have miners
            let sources = spawn.room.find(FIND_SOURCES);
            // iterate over all sources
            for (let source of sources) {
                // if the source has no miner
                if (!_.some(creepInRoom, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
                    // check whether or not the source has a container
                    let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    });
                    // if there is a container next to the source
                    if (containers.length > 0) {
                        // spawn a miner
                        spawn.spawnMiner(source.id);
                        break;
                    }
                }
            }
        }

        if (harvesters < maxHarvesters) {
            var newName = 'Harvester' + Game.time;
            spawn.spawnCustomCreep(energy, newName, 'harvester');
        } else if (lorries < maxLorries) {
            var newName = 'Lorry' + Game.time;
            spawn.spawnLorry(energy, newName)
        } else if (upgraders < maxUpgraders) {
            var newName = 'Upgrader' + Game.time;
            spawn.spawnCustomCreep(energy, newName, 'upgrader');
        } else if (builders < maxBuilders) {
            var newName = 'Builder' + Game.time;
            spawn.spawnCustomCreep(energy, newName, 'builder');
        } else if (repairers < maxRepairers) {
            var newName = 'Repairer' + Game.time;
            spawn.spawnCustomCreep(energy, newName, 'repairer');
        } else if(longDistanceAttackers < maxLongDistanceAttackers){
            var newName = 'LDA' + Game.time;
            spawn.spawnAttacker(energy, 5, newName, 'longDistanceAttacker', 'E16N5');
        } else if (longDistanceHarvesters < maxLongDistanceHarvesters) {
            var newName = 'LDH' + Game.time;
            spawn.spawnLongDistanceCreep(energy, newName, 4, spawn.room.name, 'E17N6', 0, 'longDistanceHarvester');
        } else if(longDistanceBuilders < maxLongDistanceBuilders){
            var newName = 'LDB' + Game.time;
            spawn.spawnLongDistanceCreep(energy, newName, 4, spawn.room.name, 'E17N6', 0, 'longDistanceBuilder');
        } else if (wallRepairers < maxWallRepairers) {
            var newName = 'WallRepairer' + Game.time;
            spawn.spawnCustomCreep(energy, newName, 'wallRepairer')
        }
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.store.energy == 0 && creep.memory.working) {
            creep.memory.working = false;
        }

        if (creep.store.energy == creep.store.getCapacity(RESOURCE_ENERGY) && !creep.memory.working) {
            creep.memory.working = true;
        }

        switch (creep.memory.role) {
            case 'builder': roleBuilder.run(creep); break;
            case 'lorry': roleLorry.run(creep); break;
            case 'upgrader': roleUpgrader.run(creep); break;
            case 'repairer': roleRepairer.run(creep); break;
            case 'harvester': roleHarvester.run(creep); break;
            case 'wallRepairer': roleWallRepairer.run(creep); break;
            case 'longDistanceBuilder': roleLongDistanceBuilder.run(creep); break;
            case 'longDistanceAttacker': roleLongDistanceAttacker.run(creep); break;
            case 'longDistanceHarvester': roleLongDistanceHarvester.run(creep); break;
        }
    }

    var towers = Game.rooms[HOME].find(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_TOWER });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            tower.attack(target);
        }

        var heal = tower.pos.findClosestByPath(FIND_MY_CREEPS, { filter: (c) => c.hits < c.hitsMax });
        if (!target && heal) {
            tower.heal(heal);
        }
    }
}