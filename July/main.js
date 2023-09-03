require('prototype.spawn')();
const roleHarvester = require('role.harvester');
const roleExcavator = require('role.excavator');
const roleUpgrader = require('role.upgrader');
const roleRepairer = require('role.repairer');
const roleBuilder = require('role.builder');
const roleClaimer = require('role.claimer');
const roleLorry = require('role.lorry');
const roleMiner = require('role.miner');
const roleMineralLorry = require('role.mineralLorry');
const roleLocalBuilder = require('role.localBuilder');
const roleWallRepairer = require('role.wallRepairer');
const roleLongDistanceBuilder = require('role.longDistanceBuilder');
const roleLongDistanceAttacker = require('role.longDistanceAttacker');
const roleLongDistanceHarvester = require('role.longDistanceHarvester');

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

        var creepInRoom = spawn.room.find(FIND_MY_CREEPS);

        var harvesters = _.sum(creepInRoom, (c) => c.memory.role == 'harvester');
        var maxHarvesters = spawn.memory.maxHarvesters;

        var upgraders = _.sum(creepInRoom, (c) => c.memory.role == 'upgrader');
        var maxUpgraders = spawn.memory.maxUpgraders;

        var repairers = _.sum(creepInRoom, (c) => c.memory.role == 'repairer');
        var maxRepairers = spawn.memory.maxRepairers;

        var builders = _.sum(creepInRoom, (c) => c.memory.role == 'builder');
        var maxBuilders = spawn.memory.maxBuilders;

        var localBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'localBuilder');
        var maxLocalBuilders = spawn.memory.maxLocalBuilders;

        var longDistanceHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceHarvester');
        var maxLongDistanceHarvesters = spawn.memory.maxLongDistanceHarvesters;

        var longDistanceBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceBuilder');
        var maxLongDistanceBuilders = spawn.memory.maxLongDistanceBuilders;

        var longDistanceAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceAttacker');
        var maxLongDistanceAttackers = spawn.memory.maxLongDistanceAttackers;

        var wallRepairers = _.sum(creepInRoom, (c) => c.memory.role == 'wallRepairer');
        var maxWallRepairers = spawn.memory.maxWallRepairers;

        var lorries = _.sum(creepInRoom, (c) => c.memory.role == 'lorry');
        var maxLorries = spawn.memory.maxLorries;

        var mineralLorries = _.sum(creepInRoom, (c) => c.memory.role == 'mineralLorry');
        var maxMineralLorries = spawn.memory.maxMineralLorries;

        var miners = _.sum(creepInRoom, (c) => c.memory.role == 'miner');
        var excavators = _.sum(creepInRoom, (c) => c.memory.role == 'excavator')

        var energy = spawn.room.energyCapacityAvailable;

        if (harvesters == 0 && (miners == 0 || lorries == 0 || mineralLorries == 0)) {
            // if there are still miners left
            if (miners > 0) {
                // create a lorry
                spawn.spawnLorry(spawn.room.energyAvailable, 'lorry', 'lorry');
            }
            // if there is no miner left
            else {
                // create a harvester because it can work on its own
                spawn.spawnCustomCreep(spawn.room.energyAvailable, 'harvester' + Game.time, 'harvester');
            }

            if (excavators > 0) {
                spawn.spawnLorry(spawn.room.energyAvailable, 'mineralLorry', spawn.room.find(FIND_MINERALS)[0].mineralType);
            }
        }
        // if no backup creep is required
        else {
            // check if all sources and minerals have miners
            let sources = spawn.room.find(FIND_SOURCES);
            let minerals = spawn.room.find(FIND_MINERALS);
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

            for (let mineral of minerals) {
                if (!_.some(creepInRoom, c => c.memory.role == 'excavator' && c.memory.mineralId == mineral.id)) {
                    let containers = mineral.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    });
                    // if there is a container next to the source
                    if (containers.length > 0) {
                        // spawn a miner
                        spawn.spawnExcavator(mineral.id);
                    }
                }
            }

        }

        if (spawn.memory.claimRoom != undefined) {
            if (spawn.spawnClaimer(spawn.memory.claimRoom) == 0) {
                delete spawn.memory.claimRoom;
            }
        }

        if (harvesters < maxHarvesters) {
            var newName = 'Harvester' + Game.time;
            spawn.spawnCustomCreep(energy, newName, 'harvester');
        } else if (lorries < maxLorries) {
            var newName = 'Lorry' + Game.time;
            spawn.spawnLorry(energy, newName, 'lorry')
        } else if (upgraders < maxUpgraders) {
            var newName = 'Upgrader' + Game.time;
            spawn.spawnCustomCreep(energy, newName, 'upgrader');
        } else if (localBuilders < maxLocalBuilders) {
            var newName = 'localBuilder' + Game.time;
            spawn.spawnLongDistanceCreep(energy, newName, 5, spawn.room.name, 'E18N5', 0, 'localBuilder')
        } else if (mineralLorries < maxMineralLorries) {
            var newName = 'mineralLorry' + Game.time;
            spawn.spawnLorry(energy, newName, 'mineralLorry');
        } else if (builders < maxBuilders) {
            var newName = 'Builder' + Game.time;
            spawn.spawnCustomCreep(energy, newName, 'builder');
        } else if (repairers < maxRepairers) {
            var newName = 'Repairer' + Game.time;
            spawn.spawnCustomCreep(energy, newName, 'repairer');
        } else if (wallRepairers < maxWallRepairers) {
            var newName = 'WallRepairer' + Game.time;
            spawn.spawnCustomCreep(energy, newName, 'wallRepairer')
        } else if (longDistanceAttackers < maxLongDistanceAttackers) {
            var newName = 'LDA' + Game.time;
            spawn.spawnAttacker(energy, 5, newName, 'longDistanceAttacker', 'E18N5');
        } else if (longDistanceHarvesters < maxLongDistanceHarvesters) {
            var newName = 'LDH' + Game.time;
            spawn.spawnLongDistanceCreep(energy, newName, 4, spawn.room.name, 'E17N6', 0, 'longDistanceHarvester');
        } else if (longDistanceBuilders < maxLongDistanceBuilders) {
            var newName = 'LDB' + Game.time;
            spawn.spawnLongDistanceCreep(energy, newName, 4, spawn.room.name, 'E18N5', 0, 'longDistanceBuilder');
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

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.store.energy == 0 && creep.memory.working) {
            creep.memory.working = false;
        }

        if (creep.store.energy == creep.store.getCapacity(RESOURCE_ENERGY) && !creep.memory.working) {
            creep.memory.working = true;
        }

        switch (creep.memory.role) {
            case 'miner': roleMiner.run(creep); break;
            case 'lorry': roleLorry.run(creep); break;
            case 'builder': roleBuilder.run(creep); break;
            case 'claimer': roleClaimer.run(creep); break;
            case 'upgrader': roleUpgrader.run(creep); break;
            case 'repairer': roleRepairer.run(creep); break;
            case 'excavator': roleExcavator.run(creep); break;
            case 'harvester': roleHarvester.run(creep); break;
            case 'mineralLorry': roleMineralLorry.run(creep); break;
            case 'localBuilder': roleLocalBuilder.run(creep); break;
            case 'wallRepairer': roleWallRepairer.run(creep); break;
            case 'longDistanceBuilder': roleLongDistanceBuilder.run(creep); break;
            case 'longDistanceAttacker': roleLongDistanceAttacker.run(creep); break;
            case 'longDistanceHarvester': roleLongDistanceHarvester.run(creep); break;
        }
    }

}