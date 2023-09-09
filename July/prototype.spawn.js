var listOfRoles = ['harvester', 'lorry', 'claimer', 'upgrader', 'repairer', 'builder', 'wallRepairer', 'miner', 'excavator', 'mineralLorry'];

StructureSpawn.prototype.spawnCreepsIfNecessary =
    function () {
        /** @type {Room} */
        let room = this.room;
        // find all creeps in room
        /** @type {Array.<Creep>} */
        let creepsInRoom = room.find(FIND_MY_CREEPS);

        // count the number of creeps alive for each role in this room
        // _.sum will count the number of properties in Game.creeps filtered by the
        //  arrow function, which checks for the creep being a specific role
        /** @type {Object.<string, number>} */
        let numberOfCreeps = {};
        for (let role of listOfRoles) {
            numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
        }
        let maxEnergy = room.energyCapacityAvailable;
        let name = undefined;

        // if no harvesters are left AND either no miners or no lorries are left
        //  create a backup creep
        if (numberOfCreeps['harvester'] == 0 && (numberOfCreeps['miner'] == 0 || numberOfCreeps['lorry'] == 0)) {
            // if there are still miners
            if (numberOfCreeps['miner'] > 0) {
                name = this.spawnLorry(this.room.energyAvailable, 'lorry' + Game.time, 'lorry');
            }
            // if there is no miner
            else {
                // create a harvester because it can work on its own
                name = this.spawnCustomCreep(room.energyAvailable, 'harvester');
            }

            if (numberOfCreeps['excavator'] > 0) {
                name = spawn.spawnLorry(spawn.room.energyAvailable, 'mineralLorry' + Game.time, 'mineralLorry', spawn.room.find(FIND_MINERALS)[0].mineralType, creep.room.storage);
            }
        }
        // if no backup creep is required
        else {
            // check if all sources have miners
            let sources = room.find(FIND_SOURCES);
            // iterate over all sources
            for (let source of sources) {
                // if the source has no miner
                if (!_.some(creepsInRoom, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
                    // check whether or not the source has a container
                    /** @type {Array.StructureContainer} */
                    let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    });
                    // if there is a container next to the source
                    if (containers.length > 0) {
                        // spawn a miner
                        name = this.spawnMiner(source.id);
                        break;
                    }
                }
            }
        }

        // if none of the above caused a spawn command check for other roles
        if (name == undefined) {
            for (let role of listOfRoles) {
                // check for claim order
                if (role == 'claimer' && this.memory.claimRoom != undefined) {
                    // try to spawn a claimer
                    name = this.spawnClaimer(this.memory.claimRoom);
                    // if that worked
                    if (name != undefined && _.isString(name)) {
                        // delete the claim order
                        delete this.memory.claimRoom;
                    }
                }
                // if no claim order was found, check other roles
                else if (numberOfCreeps[role] < this.memory.minCreeps[role]) {
                    if (role == 'lorry') {
                        name = this.spawnLorry(this.room.energyAvailable, 'lorry' + Game.time, 'lorry');
                    }
                    else {
                        name = this.spawnCustomCreep(maxEnergy, role);
                    }
                    break;
                }
            }
        }

        // if none of the above caused a spawn command check for LongDistanceHarvesters
        /** @type {Object.<string, number>} */
        let numberOfLongDistanceHarvesters = {};
        if (name == undefined) {
            // count the number of long distance harvesters globally
            for (let roomName in this.memory.minLongDistanceHarvesters) {
                numberOfLongDistanceHarvesters[roomName] = _.sum(Game.creeps, (c) =>
                    c.memory.role == 'longDistanceHarvester' && c.memory.target == roomName)

                if (numberOfLongDistanceHarvesters[roomName] < this.memory.minLongDistanceHarvesters[roomName]) {
                    name = this.spawnLongDistanceCreep(maxEnergy, 2, room.name, roomName, 0, 'longDistanceHarvester');
                }
            }
        }

        // print name to console if spawning was a success
        if (name != undefined && _.isString(name)) {
            console.log(this.name + " spawned new creep: " + name + " (" + Game.creeps[name].memory.role + ")");
            for (let role of listOfRoles) {
                console.log(role + ": " + numberOfCreeps[role]);
            }
            for (let roomName in numberOfLongDistanceHarvesters) {
                console.log("LongDistanceHarvester" + roomName + ": " + numberOfLongDistanceHarvesters[roomName]);
            }
        }
    };

StructureSpawn.prototype.spawnCustomCreep =
    function (energy, roleName) {
        var numberOfParts = Math.floor(energy / 200);

        numberOfParts > 5 ? numberOfParts = 5 : numberOfParts = numberOfParts;

        var body = [];
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }
        return this.spawnCreep(body, roleName + Game.time, { memory: { role: roleName, working: false } });
    };

StructureSpawn.prototype.spawnLongDistanceCreep =
    function (energy, name, nbWorkParts, home, target, sourceIndex, role) {
        var body = [];
        for (let i = 0; i < nbWorkParts; i++) {
            body.push(WORK);
        }
        energy -= 150 * nbWorkParts;
        var nbParts = Math.floor(energy / 100)
        nbParts <= 10 ? nbParts = nbParts : nbParts = 10;

        for (let i = 0; i < nbParts; i++) {
            body.push(CARRY);
        }

        for (let i = 0; i < nbParts + nbWorkParts; i++) {
            body.push(MOVE);
        }

        return this.spawnCreep(body, name, {
            memory:
            {
                role: role,
                home: home,
                target: target,
                working: false,
                sourceIndex: sourceIndex
            }
        })
    };

StructureSpawn.prototype.spawnAttacker =
    function (energy, nbAttackParts, name, role, target) {
        var body = [];

        for (let i = 0; i < nbAttackParts; i++) {
            body.push(TOUGH);
            body.push(RANGED_ATTACK);
            body.push(TOUGH);
            body.push(ATTACK);
        }

        var nbMoveParts = Math.floor((energy - nbAttackParts * 250) / 50)
        for (let i = 0; i < nbMoveParts; i++) {
            body.push(MOVE);
        }

        return this.spawnCreep(body, name, {
            memory:
            {
                role: role,
                target: target
            }
        });
    };

StructureSpawn.prototype.spawnMiner =
    function (sourceId) {
        return this.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], 'miner' + Game.time,
            {memory: { role: 'miner', sourceId: sourceId }});
    };

StructureSpawn.prototype.spawnExcavator =
    function (mineralId) {
        return this.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined,
            { role: 'excavator', mineralId: mineralId });
    };


StructureSpawn.prototype.spawnLorry =
    function (energy, newName, role, mineralType, target) {
        // create a body with twice as many CARRY as MOVE parts
        var numberOfParts = Math.floor(energy / 150);

        numberOfParts > 5 ? numberOfParts = 5 : numberOfParts = numberOfParts

        var body = [];
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }

        // create creep with the created body and the role 'lorry'
        if (mineralType == undefined) {
            return this.spawnCreep(body, newName, { memory: { working: false, role: role } });
        } else {
            return this.spawnCreep(body, newName, { memory: { role: role, working: false, mineralType: mineralType, target: target } });
        }
    };

StructureSpawn.prototype.spawnClaimer =
    function (target) {
        var body = [CLAIM, MOVE, MOVE, MOVE];
        return this.spawnCreep(body, 'Claimer' + Game.time, { memory: { role: 'claimer', target: target } });
    }