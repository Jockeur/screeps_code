module.exports = function () {
    StructureSpawn.prototype.spawnCustomCreep =
        function (energy, name, roleName) {
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
            return this.spawnCreep(body, name, { memory: { role: roleName, working: false } });
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
            return this.createCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined,
                { role: 'miner', sourceId: sourceId });
        };

    StructureSpawn.prototype.spawnExcavator =
        function (mineralId) {
            return this.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], undefined,
                { role: 'excavator', mineralId: mineralId });
        };


    StructureSpawn.prototype.spawnLorry =
        function (energy, newName, role, mineralType) {
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
                return this.spawnCreep(body, newName, { memory: { role: role, working: false } });
            } else {
                return this.spawnCreep(body, newName, { memory: { role: role, working: false, mineralType: mineralType } });
            }
        };

    StructureSpawn.prototype.spawnClaimer =
        function (target) {
            var body = [CLAIM, MOVE, MOVE, MOVE];
            return this.spawnCreep(body, 'Claimer' + Game.time, { memory: { role: 'claimer', target: target } });
        }
};